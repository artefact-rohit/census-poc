import { useState } from "react";

export const PopulationGraph = () => {
  // Use screenshot data, scale based on highest value (3027).
  const data = [
    { ageGroup: "15-24", male: 440, female: 317 },
    { ageGroup: "25-34", male: 2311, female: 2182 },
    { ageGroup: "35-44", male: 3027, female: 2443 },
    { ageGroup: "45-54", male: 1721, female: 844 },
    { ageGroup: "55-64", male: 420, female: 160 },
    { ageGroup: "65+", male: 21, female: 1 },
  ];

  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: null,
  });

  const max = 3027; // Highest value for scaling

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

      <div className="max-w-5xl mx-auto">
        {/* Title */}
        {/* <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Population Pyramid (Actual Data)
        </h1> */}

        {/* Gender Labels */}
        <div className="flex justify-between mb-4 px-16">
          <h2 className="text-xl font-semibold text-blue-600">Male</h2>
          <h2 className="text-xl font-semibold text-red-700">Female</h2>
        </div>

        <div className="relative bg-white border">
          <div className="flex flex-col">
            {/* Chart Header with numbers (optional, can adapt to your scaling) */}
            <div className="flex justify-between items-center px-20 py-2 text-sm text-gray-600">
              {/* Left numbers */}
              <div className="flex space-x-8">
                <span>{max}</span>
                <span>{Math.round(max * 0.8)}</span>
                <span>{Math.round(max * 0.6)}</span>
                <span>{Math.round(max * 0.4)}</span>
                <span>{Math.round(max * 0.2)}</span>
              </div>
              <span className="font-semibold">0</span>
              {/* Right numbers */}
              <div className="flex space-x-8">
                <span>{Math.round(max * 0.2)}</span>
                <span>{Math.round(max * 0.4)}</span>
                <span>{Math.round(max * 0.6)}</span>
                <span>{Math.round(max * 0.8)}</span>
                <span>{max}</span>
              </div>
            </div>

            {/* Chart Rows */}
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-b border-gray-200 h-8"
              >
                {/* Male side */}
                <div
                  className="flex-1 flex justify-end items-center pr-1 relative"
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
                    className="bg-blue-500 border border-blue-700 h-6"
                    style={{
                      width: `${(item.male / max) * 100}%`,
                      maxWidth: "100%",
                    }}
                  />
                </div>
                {/* Center line and age label */}
                <div className="w-20 flex justify-center items-center text-xs font-medium border-l-2 border-gray-400">
                  {item.ageGroup}
                </div>
                {/* Female side */}
                <div
                  className="flex-1 flex justify-start items-center pl-1"
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
                    className="bg-red-500 border border-red-700 h-6"
                    style={{
                      width: `${(item.female / max) * 100}%`,
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* Y-axis label */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 -rotate-90">
            <span className="text-base font-semibold text-gray-700">Age</span>
          </div>
        </div>
        {/* X-axis label */}
        <div className="text-center mt-4">
          <span className="text-base font-semibold text-gray-700">
            Population Count (Age)
          </span>
        </div>
      </div>
    </div>
  );
};
