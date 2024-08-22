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
      <div className="relative max-w-6xl mx-auto bg-[#FFFDD0] p-8 rounded-lg shadow-lg">
        {/* Container for the review cards with animation handling */}
        <div className={`flex gap-6 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
          {/* Render 3 review cards at a time */}
          {[0, 1, 2].map((offset) => {
            // Calculate the index of the review to display, wrapping around if necessary
            const reviewIndex = (currentIndex + offset) % reviews.length;
            const review = reviews[reviewIndex];
            return (
              <div key={reviewIndex} className="flex-1 bg-white rounded-lg p-6 shadow-md transition-transform duration-300 hover:scale-105">
                {/* Reviewer's profile image */}
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-[#FFC0CB]"
                />
                {/* Star rating visualization */}
                <div className="flex justify-center mb-3">
                  {renderStars(review.rating)}
                </div>
                {/* The text content of the review */}
                <p className="text-center text-[#708090] text-lg italic mb-4 line-clamp-3">{review.text}</p>
                {/* The name of the reviewer */}
                <p className="text-center font-semibold text-[#2F4F4F]">{review.name}</p>
              </div>
            );
          })}
        </div>
        {/* Navigation buttons for moving through reviews */}
        <button
          onClick={prevReviews}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-6 bg-[#708090] text-white rounded-full p-3 shadow-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition-colors duration-200"
          aria-label="Previous reviews"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <button
          onClick={nextReviews}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-6 bg-[#708090] text-white rounded-full p-3 shadow-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition-colors duration-200"
          aria-label="Next reviews"
        >
          <FaChevronRight className="text-xl" />
        </button>
      </div>
    );
};

export default ReviewCarousel;
