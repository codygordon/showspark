import React from 'react'

const Review = ({ review }) => (
  <div className="venue-review">
    <span>Review by {review.name} on {review.datePlayed}</span>
    {review.playAgain &&
      <div>
        <i className="fa fa-flip-horizontal fa-thumbs-o-up" aria-hidden="true" />
        <span>would play here again</span>
      </div>
    }
    {!review.playAgain &&
      <div>
        <i className="fa fa-flip-horizontal fa-thumbs-o-down" aria-hidden="true" />
        <span>would <u>not</u> play here again</span>
      </div>
    }
    <div>{review.qualitative}</div>
  </div>
)

const reviewComps = []

for (let i = 0; i < 10; i += 1) {
  reviewComps.push(<Review key={i} review={i} />)
}

const ReviewStats = ({ againPct, reviewsNum }) => {
  let statsClass = 'venue-review-stats'
  if (againPct > 75) statsClass += ' good'
  if (againPct <= 75) statsClass += ' good-okay'
  if (againPct <= 60) statsClass += ' okay'
  if (againPct <= 40) statsClass += ' okay-bad'
  if (againPct <= 25) statsClass += ' bad'

  let statsIconClass = 'fa fa-flip-horizontal'
  if (againPct > 50) statsIconClass += ' fa-thumbs-o-up'
  else statsIconClass += ' fa-thumbs-o-down'

  return (
    <div className={statsClass}>
      <i className={statsIconClass} aria-hidden="true" />
      <span className="venue-review-stats-content">
        <strong>{againPct}%</strong> of <strong><u>{reviewsNum}</u></strong> artists&nbsp;
      <div>would play here again</div>
      </span>
    </div>
  )
}

const FirstReviewButton = () => (
  <button className="button venue-review-button first">
    Be the First to Leave a Review!
  </button>
)

const ReviewButton = () => (
  <button className="button venue-review-button">Leave a Review</button>
)

const Reviews = ({ venue }) => {
  if (venue.reviews && venue.reviews.length === 0) {
    return (
      <div className="venue-reviews">
        <div className="venue-no-reviews-text">
          <em>There aren&#39;t any reviews of this venue yet...</em>
        </div>
        <FirstReviewButton />
      </div>
    )
  } else if (venue.reviews && venue.reviews.length > 0) {
    return (
      <div className="venue-reviews">
        <ReviewStats
          againPct={venue.reviewsAgainPct}
          reviewsNum={venue.reviews.length}
        />
        <ReviewButton />
        {venue.reviews.map(review => (
          <Review review={review} key={`review-${review.date}`} />
        ))}
      </div>
    )
  }
  return null
}

export default Reviews
