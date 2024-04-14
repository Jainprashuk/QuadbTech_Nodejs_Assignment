import React, { useState, useEffect } from "react";

function Data() {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/dbtickers")
      .then((response) => response.json())
      .then((data) => {
        setTickers(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const diff = (ticker) => {
    let diff = ticker.sell - ticker.buy;
    let ans = (diff * 100) / ticker.buy;
    // ans=-0.1434
    return ans.toFixed(2);
  };

  const Savings = (ticker) => {
    let diff = ticker.sell - ticker.buy;
    let ans = diff * ticker.volume;
    // ans=-0.1434
    return ans.toFixed(2);
  };

  const formatCurrency = (value) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter.format(value);
  };

  return (
    <>
      <div className="grid text-gray-500  mx-auto grid-cols-1 gap-1 px-6 mt-3 sm:px-5 lg:mt-4 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-3 xl:mx-12 items-center justify-center">
        <p className="text-center font-bold">#</p>
        <p className="text-center font-bold">Platform</p>
        <p className="text-center font-bold">Last Traded Price</p>
        <p className="text-center font-bold">Buy And Sell Price</p>
        <p className="text-center font-bold">Difference</p>
        <p className="text-center font-bold">Savings</p>
      </div>

      <ul>
        {tickers.slice(0,10).map((ticker, index) => (
          <li key={ticker.id}>
            <div className="grid bg-gray-600 p-2 text-gray-100 rounded-md mx-auto grid-cols-1 gap-1 px-6 mt-3 sm:px-0 lg:mt-4 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-3 xl:mx-12 items-center justify-center">
              <p className="text-center font-bold">{index + 1}</p>
              <p className="text-center font-bold">{ticker.name}</p>
              <p className="text-center font-bold">
                {formatCurrency(ticker.last)}
              </p>
              <p className="text-center font-bold">
                {formatCurrency(ticker.buy)} / {formatCurrency(ticker.sell)}
              </p>
              <p className="text-center font-bold flex justify-center align-middle gap-3">
                {diff(ticker) > 0 ? (
                <>
                  <span className="text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                    
                  </span>
                  <span>
                    {diff(ticker)} %
                  </span>
                  </>
                ) : (
                    <>
                  <span className="text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    
                  </span>
                  <span>
                    {diff(ticker)} %
                  </span>
                  </>
                )}
              </p>
              <p className="text-center font-bold flex justify-center align-middle gap-2">
                {Savings(ticker) > 0 ? (
                    <>
                  <span className="text-green-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-up-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                    </svg>
                    
                  </span>
                  <span>
                  {formatCurrency(Savings(ticker))}
                  </span>
                  </>
                ) : (
                    <>
                  <span className="text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-caret-down-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                    
                  </span>
                  <span>
                    {formatCurrency(Savings(ticker))}
                  </span>
                  </>
                )}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Data;