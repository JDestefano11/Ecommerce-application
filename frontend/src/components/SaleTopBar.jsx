import React, { useState, useEffect } from 'react';

const SaleTopBar = () => {
  // State for current message index
  const [currentMessage, setCurrentMessage] = useState(0);

  // State for countdown timer, initialized from localStorage or set to countdown till midnight
  const [countdown, setCountdown] = useState(() => {
    const savedCountdown = localStorage.getItem('saleCountdown');
    const lastUpdated = parseInt(localStorage.getItem('lastUpdated'), 10);
    if (savedCountdown && lastUpdated) {
      // Calculate time left based on saved countdown and last update time
      const timeLeft = parseInt(savedCountdown, 10) - Math.floor((Date.now() - lastUpdated) / 1000);
      // Return timeLeft if positive, otherwise reset to time remaining till midnight
      return timeLeft > 0 ? timeLeft : calculateTimeTillMidnight();
    }
    return calculateTimeTillMidnight(); // Time till midnight in seconds
  });

  // Function to format the countdown timer into hours, minutes, and seconds
  const formatCountdown = () => {
    const hours = Math.floor(countdown / 3600); // Convert seconds to hours
    const minutes = Math.floor((countdown % 3600) / 60); // Convert remaining seconds to minutes
    const seconds = countdown % 60; // Remaining seconds
    // Return a span element with the formatted time and custom styling
    return (
      <span className="inline-flex items-center bg-[#FFFDD0] text-[#FFC0CB] px-2 py-1 rounded-md ml-2">
        <span className="font-mono">{hours.toString().padStart(2, '0')}</span>
        <span className="mx-1">:</span>
        <span className="font-mono">{minutes.toString().padStart(2, '0')}</span>
        <span className="mx-1">:</span>
        <span className="font-mono">{seconds.toString().padStart(2, '0')}</span>
      </span>
    );
  };

  // Array of messages to display in the top bar
  const messages = [
    "Hurry! Offer ends soon!",
    <>20% off on orders over $300! Ends in {formatCountdown()}</>
  ];

  useEffect(() => {
    // Interval to switch between messages every 5 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 5000);

    // Interval to update the countdown timer every second
    const countdownInterval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          const newCountdown = calculateTimeTillMidnight();
          localStorage.setItem('saleCountdown', newCountdown.toString());
          localStorage.setItem('lastUpdated', Date.now().toString());
          return newCountdown;
        } else {
          localStorage.setItem('saleCountdown', (prevCountdown - 1).toString());
          localStorage.setItem('lastUpdated', Date.now().toString());
          return prevCountdown - 1;
        }
      });
    }, 1000);

    // Cleanup function to clear intervals when component unmounts
    return () => {
      clearInterval(messageInterval);
      clearInterval(countdownInterval);
    };
  }, []);

  // Calculate the time remaining until midnight
  const calculateTimeTillMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight of the next day
    return Math.floor((midnight - now) / 1000); // Time in seconds
  };

  // Render the top bar with the current message
  return (
    <div className="bg-[#FFC0CB] text-[#2F4F4F] py-2 text-center font-bold">
      {messages[currentMessage]}
    </div>
  );
};

export default SaleTopBar;
