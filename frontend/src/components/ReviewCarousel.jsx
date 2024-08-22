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
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
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
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
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
      <svg
        key={index}
        className={`w-4 h-4 md:w-5 md:h-5 ${index < rating ? 'text-[#FFC0CB]' : 'text-[#708090]'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  // Display a message if there are no reviews to show
  if (reviews.length === 0) {
    return <div className="text-center text-gray-500">No reviews available.</div>;
  }

  return (
    <div className="relative max-w-6xl mx-auto bg-[#FFFDD0] p-4 md:p-8 rounded-lg shadow-lg">
      {/* Container for the review cards with animation handling */}
      <div className={`flex flex-col md:flex-row gap-4 md:gap-6 transition-opacity duration-500 ${isAnimating ? 'opacity-0' : 'opacity-100'}`}>
        {/* Render 1 review card on mobile, 3 on larger screens */}
        {[0, 1, 2].map((offset) => {
          // Calculate the index of the review to display, wrapping around if necessary
          const reviewIndex = (currentIndex + offset) % reviews.length;
          const review = reviews[reviewIndex];
          return (
            <div key={reviewIndex} className={`flex-1 bg-white rounded-lg p-4 md:p-6 shadow-md transition-transform duration-300 hover:scale-105 ${offset !== 0 ? 'hidden md:block' : ''}`}>
              {/* Reviewer's profile image */}
              <img
                src={review.image}
                alt={review.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto mb-3 md:mb-4 border-4 border-[#FFC0CB]"
              />
              {/* Star rating visualization */}
              <div className="flex justify-center mb-2 md:mb-3">
                {renderStars(review.rating)}
              </div>
              {/* The text content of the review */}
              <p className="text-center text-[#708090] text-sm md:text-lg italic mb-3 md:mb-4 line-clamp-3">{review.text}</p>
              {/* The name of the reviewer */}
              <p className="text-center font-semibold text-[#2F4F4F] text-sm md:text-base">{review.name}</p>
            </div>
          );
        })}
      </div>
      {/* Navigation buttons for moving through reviews */}
      <button
        onClick={prevReviews}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 md:-translate-x-6 bg-[#708090] text-white rounded-full p-2 md:p-3 shadow-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition-colors duration-200"
        aria-label="Previous reviews"
      >
        <FaChevronLeft className="text-lg md:text-xl" />
      </button>
      <button
        onClick={nextReviews}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 md:translate-x-6 bg-[#708090] text-white rounded-full p-2 md:p-3 shadow-md hover:bg-[#FFC0CB] hover:text-[#2F4F4F] transition-colors duration-200"
        aria-label="Next reviews"
      >
        <FaChevronRight className="text-lg md:text-xl" />
      </button>
    </div>
  );
};

export default ReviewCarousel;
