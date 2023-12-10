import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { NearPlaces } from '../../blocks/near-places/near-places';
import MemorizedHeader from '../../layout/header/header';
import MemorizedPremium from '../../ui/premium';
import { AuthorizationStatus, MAX_IMAGE_COUNT, MAX_NEAR_PLACES_COUNT, MAX_VISIBLE_REVIEWS, RequestStatus } from '../../../const';
import { addPluralEnging, capitalize, conversionToPercentage } from '../../../utils/common';
import { ReviewForm } from '../../blocks/review-form/review-form';
import { ReviewList } from '../../blocks/review-list/review-list';
import { UserStatus } from '../../ui/user-status';
import { Map } from '../../blocks/map/map';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { ButtonFavorites } from '../../ui/button-favorites';
import { fetchNearPlaces, fetchOffer, fetchReviews } from '../../../store/api-action';
import Loader from '../../blocks/loader/loader';
import { PageError } from '../page-error/page-error';
import { dropOffer } from '../../../store/action';


export function PageOffer(): JSX.Element {
  const { id } = useParams<{id: string}>();
  const dispatch = useAppDispatch();

  const fetchingStatus = useAppSelector((state) => state.offerFetchingStatus);

  useEffect(() => {
    if (id) {
      dispatch(fetchOffer(id));
      dispatch(fetchNearPlaces(id));
      dispatch(fetchReviews(id));
    }

    return () => {
      dispatch(dropOffer());
    };
  }, [id, dispatch]);

  const offer = useAppSelector((state)=> state.offer);
  const nearbyOffers = useAppSelector((state) => state.nearPlaces).slice(0, MAX_NEAR_PLACES_COUNT);
  const reviewsCount = useAppSelector((state) => state.reviews).length;
  const reviews = useAppSelector((state) => state.reviews);
  const sortedReviews = reviews.toSorted((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const reviewList = sortedReviews.slice(0, MAX_VISIBLE_REVIEWS);
  const status = useAppSelector((state) => state.authorizationStatus);

  useEffect(()=>{
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  },[id]);

  if (!offer) {
    if (fetchingStatus === RequestStatus.Pending) {
      return (
        <div className="page">
          <Loader />
        </div>
      );
    }
    return (
      <PageError />
    );
  }

  const {images, title, isPremium, rating, type, bedrooms, maxAdults, price, goods, host, description} = offer;

  return (
    <div className="page">
      <Helmet>
        <title>6 Cities: Offer Page</title>
      </Helmet>
      <MemorizedHeader />
      <main className="page__main page__main--offer">
        {fetchingStatus === RequestStatus.Success && (
          <section className="offer">
            <div className="offer__gallery-container container">
              <div className="offer__gallery">
                {images.slice(0, MAX_IMAGE_COUNT).map((image) => (
                  <div className="offer__image-wrapper" key={uuidv4()}>
                    <img className="offer__image" src={image} alt="Photo studio" />
                  </div>
                ))}
              </div>
            </div>
            <div className="offer__container container">
              <div className="offer__wrapper">
                {isPremium && <MemorizedPremium block = 'offer__mark'/>}
                <div className="offer__name-wrapper">
                  <h1 className="offer__name">
                    {title}
                  </h1>
                  <ButtonFavorites offer = {offer} block = 'offer' />
                </div>
                <div className="offer__rating rating">
                  <div className="offer__stars rating__stars">
                    <span style={{width: conversionToPercentage(rating)}} ></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="offer__rating-value rating__value">{rating}</span>
                </div>
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {capitalize(type)}
                  </li>
                  <li className="offer__feature offer__feature--bedrooms">
                    {bedrooms} Bedroom{addPluralEnging(bedrooms)}
                  </li>
                  <li className="offer__feature offer__feature--adults">
                    Max {maxAdults} adult{addPluralEnging(maxAdults)}
                  </li>
                </ul>
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {goods.map((good): JSX.Element => (
                      <li className="offer__inside-item" key={uuidv4()}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="offer__host">
                  <h2 className="offer__host-title">Meet the host</h2>
                  <div className="offer__host-user user">
                    <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
                      <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                    </div>
                    <span className="offer__user-name">
                      {host.name}
                    </span>
                    <UserStatus pro = {host.isPro} />
                  </div>
                  <div className="offer__description">
                    <p className="offer__text"> {description} </p>
                  </div>
                </div>
                <section className="offer__reviews reviews">
                  <h2 className="reviews__title">Review{addPluralEnging(reviewsCount)} &middot; <span className="reviews__amount">{reviewsCount}</span></h2>
                  <ReviewList reviews={reviewList} />
                  {status === AuthorizationStatus.Auth && id ? <ReviewForm id = {id} /> : ''}
                </section>
              </div>
            </div>
            <Map block="offer" offers={nearbyOffers} specialOfferId={id} specialOffer={offer} location={offer.city.location}/>
          </section>
        )}
        <div className="container">
          <NearPlaces nearPlaces = {nearbyOffers} />
        </div>
      </main>
    </div>
  );
}
