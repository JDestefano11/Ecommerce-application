import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { assets } from '../assets/frontend_assets/assets';

const ReviewCarousel = ({ reviews }) => {
  // State to keep track of the current index in the reviews array
  // This determines which reviews are currently visible
  const [currentIndex, setCurrentIndex] = useState(0);

  // State to manage the animation when transitioning between reviews
  // This prevents rapid clicking and ensures smooth transitions
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to move to the next set of reviews
  // It updates the currentIndex and triggers a brief animation
  const nextReviews = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      // Circular array navigation: wrap around to the start if we reach the end
      setCurrentIndex((prev) => (prev + 3) % reviews.length);
      // Reset animation state after transition completes
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Function to move to the previous set of reviews
  // Similar to nextReviews, but moves backwards through the array
  const prevReviews = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      // Circular array navigation: wrap around to the end if we're at the start
      setCurrentIndex((prev) => (prev - 3 + reviews.length) % reviews.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  // Reset the currentIndex when the reviews array changes
  // This ensures we start from the beginning if new reviews are added
  useEffect(() => {
    setCurrentIndex(0);
  }, [reviews]);

  // Function to render star ratings
  // Creates an array of star images based on the rating value
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <img
        key={index}
        src={index < rating ? assets.star_icon : assets.star_dull_icon}
        alt=""
        className="w-3.5"
      />
    ));
  };

  // Display a message if there are no reviews to show
  if (reviews.length === 0) {
    return <div className="text-center text-gray-500">No reviews available.</div>;
  }

  return (
    <div className="relative max-w-6xl mx-auto">
      {/* Container for the review cards with animation handling */}
      <div className={`flex gap-4 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {/* Render 3 review cards at a time */}
        {[0, 1, 2].map((offset) => {
          // Calculate the index of the review to display, wrapping around if necessary
          const reviewIndex = (currentIndex + offset) % reviews.length;
          const review = reviews[reviewIndex];
          return (
            <div key={reviewIndex} className="flex-1 bg-white shadow-lg rounded-lg p-6">
              {/* Reviewer's profile image */}
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-gray-200"
              />
              {/* Star rating visualization */}
              <div className="flex justify-center mb-2">
                {renderStars(review.rating)}
              </div>
              {/* The text content of the review */}
              <p className="text-center text-lg italic mb-4">{review.text}</p>
              {/* The name of the reviewer */}
              <p className="text-center font-semibold">{review.name}</p>
            </div>
          );
        })}
      </div>
      {/* Navigation buttons for moving through reviews */}
      <button
        onClick={prevReviews}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
        aria-label="Previous reviews"
      >
        <FaChevronLeft className="text-gray-600" />
      </button>
      <button
        onClick={nextReviews}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors duration-200"
        aria-label="Next reviews"
      >
        <FaChevronRight className="text-gray-600" />
      </button>
    </div>
  );
};

export default ReviewCarousel;
