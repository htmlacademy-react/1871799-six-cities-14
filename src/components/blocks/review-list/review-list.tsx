import { TComment, TReviews } from '../../../types/types';
import { ReviewItem } from '../../ui/review-item';

export function ReviewList ({reviews}:{reviews:TReviews}):JSX.Element {
  return (
    <ul className="reviews__list">
      { reviews.map((review:TComment) => (
        <ReviewItem comment={review} key={review.id} />
      ))}
    </ul>
  );
}
