import { useState, useRef, useEffect, useCallback } from "react";

export const PopulationGraphTemp = () => {
  // Your actual data
  const data = [
    { ageGroup: "65+", male: 21, female: 1 },
    { ageGroup: "55-64", male: 420, female: 160 },
    { ageGroup: "45-54", male: 1721, female: 844 },
    { ageGroup: "35-44", male: 3027, female: 2443 },
    { ageGroup: "25-34", male: 2311, female: 2182 },
    { ageGroup: "15-24", male: 440, female: 317 },
  ];

  // Set max scale to 3000 (6 units of 500 each)
  const maxScale = 3000;

  // Calculate percentage for scaling (each 500 = ~16.67% of chart width)
  const getPercentage = (value) => (value / maxScale) * 100;

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: null,
  });

  return (
    <div className="w-full  bg-white ">
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y + 10,
            left: tooltip.x + 10,
            background: "rgba(0,0,0,0.75)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            pointerEvents: "none",
            fontSize: 14,
            zIndex: 1000,
          }}
        >
          {`Count: ${tooltip.value}`}
        </div>
      )}
      <div className="max-w-7xl mx-auto">
        {/* Gender Labels */}
        <div className="flex justify-between mb-4 sm:mb-6 px-8 sm:px-16 md:px-24">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
            Male
          </h2>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-700">
            Female
          </h2>
        </div>

        {/* Scale indicators with 3 intervals: 1000, 2000, 3000 */}
        {/* <div className="flex items-center mb-4 text-sm text-gray-600 font-medium">
          <div className="flex-1 flex justify-between px-4">
            <span>3000</span>
            <span>2000</span>
            <span>1000</span>
          </div>

          <div className="w-16 sm:w-20 md:w-24 text-center">
            <span className="font-bold text-base">0</span>
          </div>

          <div className="flex-1 flex justify-between px-4">
            <span>1000</span>
            <span>2000</span>
            <span>3000</span>
          </div>
        </div> */}

        {/* Chart */}
        <div className="relative bg-white border-2 border-gray-300 overflow-hidden">
          <div className="flex flex-col relative z-10">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-b border-gray-400 "
              >
                {/* Male side (left) */}
                <div
                  className="flex-1 flex justify-end items-center pr-0 relative"
                  onMouseEnter={(e) =>
                    setTooltip({
                      visible: true,
                      x: e.clientX,
                      y: e.clientY,
                      value: item.male,
                    })
                  }
                  onMouseLeave={() =>
                    setTooltip({ visible: false, x: 0, y: 0, value: null })
                  }
                >
                  <div
                    className="bg-blue-500 border-r border-blue-700 h-6 sm:h-7 md:h-8 flex items-center justify-start pl-1 sm:pl-2 relative"
                    style={{
                      width: `${(item.male / 3000) * 100}%`,
                      // minWidth: item.male > 0 ? "25px" : "0px",
                    }}
                  >
                    {/* <span className="text-white font-semibold text-xs sm:text-sm">
                      {item.male}
                    </span> */}
                  </div>
                </div>

                {/* Center line and age label */}
                <div className="w-16 sm:w-20 md:w-24 flex justify-center items-center text-xs sm:text-sm md:text-base font-bold border-l-2 border-r-2 border-gray-600 bg-gray-100 py-1 sm:py-2 relative z-20">
                  {item.ageGroup}
                </div>

                {/* Female side (right) */}
                <div
                  className="flex-1 flex justify-start items-center pl-0"
                  onMouseEnter={(e) =>
                    setTooltip({
                      visible: true,
                      x: e.clientX,
                      y: e.clientY,
                      value: item.female,
                    })
                  }
                  onMouseLeave={() =>
                    setTooltip({ visible: false, x: 0, y: 0, value: null })
                  }
                >
                  <div
                    className="bg-red-500 border-l border-red-700 h-6 sm:h-7 md:h-8 flex items-center justify-end pr-1 sm:pr-2"
                    style={{
                      width: `${(item.female / 3000) * 100}%`,
                      // minWidth: item.female > 0 ? "25px" : "0px",
                    }}
                  >
                    {/* <span className="text-white font-semibold text-xs sm:text-sm">
                      {item.female}
                    </span> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Y-axis label */}
          {/* <div className="absolute left-1 sm:left-2 top-1/2 transform -translate-y-1/2 -rotate-90 z-30">
            <span className="text-sm sm:text-base md:text-lg font-bold text-gray-700">
              Age Range
            </span>
          </div> */}
        </div>

        {/* X-axis label */}
        <div className="text-center mt-4 sm:mt-6">
          <span className="text-base sm:text-lg md:text-xl font-bold text-gray-700">
            Population Count
          </span>
        </div>
      </div>
    </div>
  );
};
