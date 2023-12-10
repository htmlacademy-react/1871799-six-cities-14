import React, { FormEvent, useEffect, useState } from 'react';

import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH, RequestStatus } from '../../../const';
import { TOffer } from '../../../types/types';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { postReviews } from '../../../store/api-action';
import { dropReviewSendingStatus } from '../../../store/action';
import { Rating } from '../rating/rating';

type TReviewsProps = {
  id: TOffer['id'];
};

export function ReviewForm({ id }: TReviewsProps) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const dispatch = useAppDispatch();
  const sendingStatus = useAppSelector((state)=> state.reviewsSendingStatus);

  const isSending = sendingStatus === RequestStatus.Pending;
  useEffect(()=>{
    if (sendingStatus === RequestStatus.Success) {
      dispatch(dropReviewSendingStatus());
      setComment('');
      setRating(0);
    }
  }, [sendingStatus, dispatch]);

  const isSubmitDisabled =
    comment.length < MIN_COMMENT_LENGTH ||
    comment.length > MAX_COMMENT_LENGTH ||
    rating === 0;


  const handleFieldChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(
      postReviews({
        comment,
        rating,
        id,
      })
    );
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleFormSubmit}>
      {sendingStatus === RequestStatus.Error && (
        <p>Failed to post review. Please try again! </p>
      )}
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <Rating value={rating} onChange={setRating} />

      <textarea
        onChange={handleFieldChange}
        value={comment}
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        disabled={isSending}
      />
      <div className="reviews__button-wrapper">
        {isSending}

        <p className="reviews__help">
         To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
       with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitDisabled || isSending}
        >
          {isSending ? 'Sending...' : 'Submit'}

        </button>
      </div>
    </form>
  );
}
