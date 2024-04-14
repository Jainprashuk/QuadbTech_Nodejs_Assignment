import React from "react";

function Stats() {
  return (
    <section class="py-2  sm:py-3 lg:py-6">
      <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="text-center">
          <h4 class="text-md font-medium text-gray-400">Best Price To Trade</h4>
        </div>

        <div class="grid grid-cols-1 gap-1  px-6 mt-3 sm:px-0 lg:mt-4 sm:grid-cols-2 lg:grid-cols-6 xl:gap-x-3">
          <div class="overflow-hidden   rounded-lg">
            <div class="px-4 py-6">
              <div class="ml-4">
                <h4 class="text-4xl  font-bold text-center text-cyan-500">
                  0.1 %
                </h4>
                <p class="mt-1.5 text-lg font-medium text-center leading-tight text-gray-500">
                  5 Min
                </p>
              </div>
            </div>
          </div>

          <div class="overflow-hidden   rounded-lg">
            <div class="px-4 py-6">
              <h4 class="text-4xl font-bold text-center text-cyan-500">
                0.9 %
              </h4>
              <p class="mt-1.5 text-lg text-center font-medium leading-tight text-gray-500">
                1 Hour
              </p>
            </div>
          </div>

          <div class=" col-span-2   rounded-lg">
            <div class="px-4 py-6">
              <div class="ml-4">
                
                <h4 class="text-6xl font-bold  text-center text-gray-50">₹ 26,56,110</h4>
                
              </div>
            </div>
          </div>

          <div class="overflow-hidden   rounded-lg">
            <div class="px-4 py-6">
              
                <div class="ml-4">
                  <h4 class="text-4xl font-bold text-center text-cyan-500">2.73%</h4>
                  <p class="mt-1.5 text-lg font-medium text-center leading-tight text-gray-500">
                    1 Day
                  </p>
                </div>
              
            </div>
          </div>

          <div class="overflow-hidden   rounded-lg">
            <div class="px-4 py-6">
              
                <div class="ml-4">
                  <h4 class="text-4xl font-bold text-center text-cyan-500">7.51%</h4>
                  <p class="mt-1.5 text-lg font-medium text-center leading-tight text-gray-500">
                    7 Days
                  </p>
                </div>
              
            </div>
          </div>
        </div>
        <p class="mt-1.5 text-lg text-gray-400 text-center font-sm leading-tight text-gray-500">
                  Average BTC/INR net price including Commision
                </p>
      </div>
    </section>
  );
}

export default Stats;
