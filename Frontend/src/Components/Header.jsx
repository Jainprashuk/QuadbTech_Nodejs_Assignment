import React, { useState, useEffect } from "react";
import "../App.css"; // Import CSS file for styling

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const [seconds, setSeconds] = useState(30); // State for timer countdown (initial value 30 seconds)

  useEffect(() => {
    // Timer countdown effect using setInterval
    const timer = setInterval(() => {
      if (seconds > 0) {
        // Update seconds count every second
        setSeconds((prevSeconds) => prevSeconds - 1);

        // Perform backend reload when 7 seconds are remaining
        if (seconds === 7) {
          fetch('http://localhost:3000/api/top10tickers') // Fetch data from backend API
            .catch(error => {
              console.error('Error during backend reload:', error);
              // Handle fetch error if needed
            });
        }
      } else {
        // Clear timer interval when countdown reaches 0
        clearInterval(timer);

        // Refresh the frontend page after timer expires
        window.location.reload(); // This will reload the page
        setSeconds(30); // Reset timer value if needed after page reload
      }
    }, 1000); // Run the timer countdown every 1000ms (1 second)

    return () => clearInterval(timer); // Cleanup function to clear interval on component unmount
  }, [seconds]); // Trigger effect when 'seconds' state changes

  return (
    <div className="block mx-auto md:flex md:justify-between p-6 items-center text-center">
      {/* Header content */}
      <h1 className="HODLINFO text-cyan-500 text-4xl font-bold">HODLINFO</h1>

      {/* Dropdown and buttons section */}
      <div className="flex justify-center md:flex-row gap-4 items-center mt-4 md:mt-0">
        {/* Dropdown button for currency selection */}
        <button
          id="dropdownHoverButton"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
          className="text-white bg-gray-600 hover:bg-gray-800 font-medium rounded-xl text-sm px-5 py-2.5 text-center flex gap-1 items-center"
          type="button"
        >
          <p>INR</p>
          {/* Caret down icon for dropdown */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </button>

        {/* Button for Bitcoin (BTC) */}
        <button
          id="dropdownHoverButton"
          onMouseEnter={toggleDropdown}
          onMouseLeave={toggleDropdown}
          className="text-white bg-gray-600 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex gap-1 items-center"
          type="button"
        >
          <p>BTC</p>
          {/* Caret down icon for dropdown */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-down-fill"
            viewBox="0 0 16 16"
          >
            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
          </svg>
        </button>

        {/* Button for 'Buy BTC' */}
        <button
          id="dropdownHoverButton"
          className="text-white bg-gray-600 hover:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
          type="button"
        >
          Buy BTC
        </button>
      </div>

      {/* Countdown timer and additional buttons */}
      <div className="flex justify-center md:flex-row items-center gap-5 mt-4 md:mt-0">
        {/* Display countdown timer */}
        <p className="rounded-full px-3 border-2 border-cyan-500 text-cyan-500 text-center my-auto py-1">
          {seconds}
        </p>

        {/* Button to connect to Telegram */}
        <button className="flex justify-center items-center rounded-xl gap-3 text-gray-50 bg-cyan-500 py-2 px-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-telegram my-auto"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09" />
          </svg>
          <p className="my-auto text-sm font-medium">Connect Telegram</p>
        </button>

        {/* Toggle switch with custom styles */}
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" checked />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-cyan-500 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-500"></div>
        </label>
      </div>
    </div>
  );
}

export default Header;
