import React from 'react'

const Review = ({ review }) => (
  <div className="venue-review">
    <span>REVIEW BY XXX</span>
    <span> on 4/1/2017</span>
  </div>
)

const ReviewButton = () => (
  <button className="venue-review-button">Leave a Review</button>
)

const Reviews = ({ reviews }) => (
  <div className="venue-reviews-container">
    <ReviewButton />
    {reviews.map(review => (
      <Review review={review} key={`review-${review._id}`} />
    ))}
  </div>
)

export default Reviews
