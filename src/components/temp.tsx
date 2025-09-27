import { useState, useRef, useEffect, useCallback } from "react";

export const PopulationGraphTemp = () => {
  // Your actual data
  const data = [
    { ageGroup: "65+", male: "95.45%", female: "4.55%" },
    { ageGroup: "55-64", male: "72.41%", female: "27.59%" },
    { ageGroup: "45-54", male: "67.10%", female: "32.90%" },
    { ageGroup: "35-44", male: "55.34%", female: "44.66%" },
    { ageGroup: "25-34", male: "51.44%", female: "48.56%" },
    { ageGroup: "15-24", male: "58.12%", female: "41.88%" },
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

  // Helper function to convert "xx.xx%" string to number
  const toNumber = (str) => parseFloat(str);

  // Tooltip state and handlers remain unchanged

  return (
    <div className="w-full bg-white">
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
        <div className="flex justify-between mb-4 sm:mb-6 px-8 sm:px-16 md:px-24">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-blue-600">
            Male
          </h2>
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-red-700">
            Female
          </h2>
        </div>

        <div className="relative bg-white border-2 border-gray-300 overflow-hidden">
          <div className="flex flex-col relative z-10">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-b border-gray-400 "
              >
                {/* Male side */}
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
                    style={{ width: `${toNumber(item.male)}%` }}
                  ></div>
                </div>

                {/* Age group label */}
                <div className="w-16 sm:w-20 md:w-24 flex justify-center items-center text-xs sm:text-sm md:text-base font-bold border-l-2 border-r-2 border-gray-600 bg-gray-100 py-1 sm:py-2 relative z-20">
                  {item.ageGroup}
                </div>

                {/* Female side */}
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
                    style={{ width: `${toNumber(item.female)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="text-center mt-4 sm:mt-6">
          <span className="text-base sm:text-lg md:text-xl font-bold text-gray-700">
            Population Percentage
          </span>
        </div> */}
      </div>
    </div>
  );
};
