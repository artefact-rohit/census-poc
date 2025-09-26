import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export const PopulationGraph = () => {
  // Data with absolute values for both sides
  const data = [
    { ageGroup: "85+", male: 6.3, female: 0.4 },
    { ageGroup: "80-84", male: 0.5, female: 0.6 },
    { ageGroup: "75-79", male: 0.8, female: 0.9 },
    { ageGroup: "70-74", male: 1.1, female: 1.2 },
    { ageGroup: "65-69", male: 1.4, female: 1.4 },
    { ageGroup: "60-64", male: 1.7, female: 1.6 },
    { ageGroup: "55-59", male: 1.9, female: 1.8 },
    { ageGroup: "50-54", male: 2.1, female: 2.0 },
    { ageGroup: "45-49", male: 2.3, female: 2.2 },
    { ageGroup: "40-44", male: 2.5, female: 2.4 },
    { ageGroup: "35-39", male: 2.8, female: 2.7 },
    { ageGroup: "30-34", male: 3.2, female: 3.0 },
    { ageGroup: "25-29", male: 3.5, female: 3.3 },
    { ageGroup: "20-24", male: 3.8, female: 3.6 },
    { ageGroup: "15-19", male: 4.2, female: 4.0 },
    { ageGroup: "10-14", male: 4.8, female: 4.6 },
    { ageGroup: "5-9", male: 5.2, female: 5.0 },
    { ageGroup: "0-4", male: 5.8, female: 5.5 },
  ];

  // Custom component for male bars (going left)
  const MaleBar = (props) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const barWidth = (payload.male / 8) * (width / 2); // Scale to half chart width
    const barX = x + width / 2 - barWidth; // Position from center going left

    return (
      <rect
        x={barX}
        y={y}
        width={barWidth}
        height={height}
        fill="#5A9BD4"
        stroke="#2E5A87"
        strokeWidth={0.5}
      />
    );
  };

  // Custom component for female bars (going right)
  const FemaleBar = (props) => {
    const { payload, x, y, width, height } = props;
    if (!payload) return null;

    const barWidth = (payload.female / 8) * (width / 2); // Scale to half chart width
    const barX = x + width / 2; // Start from center going right

    return (
      <rect
        x={barX}
        y={y}
        width={barWidth}
        height={height}
        fill="#C85450"
        stroke="#8B2F2F"
        strokeWidth={0.5}
      />
    );
  };

  return (
    <div className="w-full min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          1960
        </h1>

        {/* Gender Labels */}
        <div className="flex justify-between mb-4 px-16">
          <h2 className="text-xl font-semibold text-blue-600">Male</h2>
          <h2 className="text-xl font-semibold text-red-700">Female</h2>
        </div>

        {/* Manual Chart Implementation */}
        <div className="relative bg-white border">
          <div className="flex flex-col">
            {/* Chart Header with numbers */}
            <div className="flex justify-between items-center px-20 py-2 text-sm text-gray-600">
              <div className="flex space-x-8">
                <span>8</span>
                <span>7</span>
                <span>6</span>
                <span>5</span>
                <span>4</span>
                <span>3</span>
                <span>2</span>
                <span>1</span>
              </div>
              <span className="font-semibold">0</span>
              <div className="flex space-x-8">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8</span>
              </div>
            </div>

            {/* Chart Rows */}
            {data.map((item, index) => (
              <div
                key={index}
                className="flex items-center border-b border-gray-200 h-8"
              >
                {/* Male side */}
                <div className="flex-1 flex justify-end items-center pr-1 relative">
                  <div
                    className="bg-blue-500 border border-blue-700 h-6"
                    style={{
                      width: `${(item.male / 8) * 100}%`,
                      maxWidth: "100%",
                    }}
                  />
                </div>

                {/* Center line and age label */}
                <div className="w-20 flex justify-center items-center text-xs font-medium border-l-2 border-gray-400">
                  {item.ageGroup}
                </div>

                {/* Female side */}
                <div className="flex-1 flex justify-start items-center pl-1">
                  <div
                    className="bg-red-500 border border-red-700 h-6"
                    style={{
                      width: `${(item.female / 8) * 100}%`,
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
            Percentage of Population
          </span>
        </div>
      </div>
    </div>
  );
};
