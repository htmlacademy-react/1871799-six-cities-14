import { TComment } from '../../types/types';
import { getDate, getDateTime, conversionToPercentage } from '../../utils/common';

type TReviewsProps = {
  comment: TComment;
}

export function ReviewItem({comment}:TReviewsProps): JSX.Element {
  const ratingUser = conversionToPercentage(comment.rating);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={comment.user.avatarUrl} width={54} height={54} alt="Reviews avatar" />
        </div>
        <span className="reviews__user-name">
          {comment.user.name}
        </span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingUser }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {comment.comment}
        </p>
        <time className="reviews__time" dateTime={getDateTime(comment.date)}>{getDate(comment.date)}</time>
      </div>
    </li>
  );
}
