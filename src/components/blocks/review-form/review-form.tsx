import { ChangeEvent, Fragment, useState } from 'react';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../../const';
import { useAppDispatch } from '../../../hooks/hooks';
import { postReviews } from '../../../store/api-action';
import { TOffer } from '../../../types/types';


const ratingMap = {
  '5': 'perfect',
  '4': 'good',
  '3': 'not bad',
  '2': 'badly',
  '1': 'terribly'
};

type TReviewsProps = {
  offerId: TOffer['id'];
}

export function ReviewForm({offerId}: TReviewsProps) {
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const isValid =
    comment.length >= MIN_COMMENT_LENGTH &&
    comment.length <= MAX_COMMENT_LENGTH &&
    rating !== '';
  const dispatch = useAppDispatch();

  function handleTextareaChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    setComment(evt.target.value);
  }

  function handleInputChange(evt: ChangeEvent<HTMLInputElement>) {
    setRating(evt.target.value);
  }

  function handleSubmit (evt: ChangeEvent<HTMLFormElement>) {
    evt.preventDefault();
    const ratingComment = Number(rating);
    dispatch(postReviews(
      { comment,
        offerId,
        rating: +ratingComment }
    ));
    setRating('');
    setComment('');
    evt.target.reset();

  }

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {Object.entries(ratingMap)
          .reverse()
          .map(([score, title])=>(
            <Fragment key={score}>
              <input className="form__rating-input visually-hidden" name="rating" value={score} id={`${score}-stars`} type="radio" checked={rating === score} onChange={handleInputChange} />
              <label htmlFor={`${score}-stars`} className="reviews__rating-label form__rating-label" title={title}>
                <svg className="form__star-image" width={37} height={33}>
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          ))}
      </div>
      <textarea className="reviews__textarea form__textarea" id="review" name="review" placeholder="Tell how was your stay, what you like and what can be improved" value={comment} onChange={handleTextareaChange}/>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled={!isValid}>Submit</button>
      </div>
    </form>
  );
}
