import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { TOfferForOffers } from '../../types/types';
import { useNavigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { addFavorite, deleteFavorite } from '../../store/api-action';

type TButtomProps = {
  offer:TOfferForOffers;
  block: string;
}

export function ButtonFavorites({offer, block}: TButtomProps): JSX.Element {
  const isActive = offer.isFavorite;
  const id = offer.id;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isAuthorized = useAppSelector((state)=> state.authorizationStatus);
  const handleFavoriteButton = (): void => {
    if (isAuthorized === AuthorizationStatus.NoAuth) {
      navigate(AppRoute.Login);
      return;
    }
    if(isActive) {
      dispatch(deleteFavorite(id));
    } else {
      dispatch(addFavorite(id)
      );
    }
  };

  return (
    <button onClick={handleFavoriteButton} className={`${block}__bookmark-button ${offer.isFavorite ? `${block}__bookmark-button--active` : ''} button`} type="button">
      <svg className={`${block}__bookmark-icon`} width={18} height={19}>
        <use xlinkHref="#icon-bookmark" />
      </svg>
      <span className="visually-hidden"> Bookmarks </span>
    </button>
  );
}
