import React, { useState } from "react";

// Datasets for both years
const datasets = [
  {
    year: "2020",
    data: [
      { ageGroup: "65+", male: "0.15%", female: "0.01%" },
      { ageGroup: "55-64", male: "3.02%", female: "1.15%" },
      { ageGroup: "45-54", male: "12.39%", female: "6.08%" },
      { ageGroup: "35-44", male: "21.80%", female: "17.59%" },
      { ageGroup: "25-34", male: "16.64%", female: "15.71%" },
      { ageGroup: "15-24", male: "3.17%", female: "2.28%" },
    ],
    colorMale: "bg-blue-500",
    colorFemale: "bg-red-500",
    borderMale: "border-blue-700",
    borderFemale: "border-red-700",
  },
  {
    year: "2025",
    data: [
      { ageGroup: "65+", male: "0.16%", female: "0.02%" },
      { ageGroup: "55-64", male: "3.21%", female: "1.36%" },
      { ageGroup: "45-54", male: "13.40%", female: "6.40%" },
      { ageGroup: "35-44", male: "22.15%", female: "18.50%" },
      { ageGroup: "25-34", male: "17.25%", female: "16.11%" },
      { ageGroup: "15-24", male: "3.45%", female: "2.35%" },
    ],
    colorMale: "bg-blue-300",
    colorFemale: "bg-pink-400",
    borderMale: "border-blue-400",
    borderFemale: "border-pink-400",
  },
];

// Age groups - extracted from data
const ageGroups = ["65+", "55-64", "45-54", "35-44", "25-34", "15-24"];

const toNumber = (str) => parseFloat(str);

export const PopulationGraph = () => {
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    value: null,
    year: null,
    gender: null,
    ageGroup: null,
  });

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded shadow-md">
      <div className="text-center font-bold text-gray-700 mb-4">
        Qatari Employees In Private Sector Distribution By Age and Gender
      </div>
      <div className="my-2">
        {ageGroups.map((group, groupIdx) => (
          <div
            key={group}
            className="flex py-1 items-center border-b border-gray-200 "
          >
            {/* Male: Vertical bars */}
            <div className="flex-1 flex flex-col justify-center items-end space-y-1  pr-2">
              {datasets.map((ds, dsIdx) => {
                const d = ds.data[groupIdx];
                return (
                  <div
                    key={ds.year}
                    className={`${ds.colorMale} ${ds.borderMale} h-4 rounded transition-all duration-150`}
                    style={{
                      width: `${toNumber(d.male)}%`,
                    }}
                    onMouseEnter={(e) =>
                      setTooltip({
                        visible: true,
                        x: e.clientX,
                        y: e.clientY,
                        value: d.male,
                        year: ds.year,
                        gender: "Male",
                        ageGroup: group,
                      })
                    }
                    onMouseLeave={() =>
                      setTooltip({
                        visible: false,
                        x: 0,
                        y: 0,
                        value: null,
                        year: null,
                        gender: null,
                        ageGroup: null,
                      })
                    }
                    title={`${ds.year} Male: ${d.male}`}
                  />
                );
              })}
              {/* <span className="text-xs text-blue-600 pt-1">Male</span> */}
            </div>

            {/* Age group label */}
            <div className="w-20 flex justify-center items-center text-xs font-bold border-l-2 border-r-2 border-gray-600 bg-gray-100 py-1">
              {group}
            </div>

            {/* Female: Vertical bars */}
            <div className="flex-1 flex flex-col justify-center items-start space-y-1 pl-2">
              {datasets.map((ds, dsIdx) => {
                const d = ds.data[groupIdx];
                return (
                  <div
                    key={ds.year}
                    className={`${ds.colorFemale} ${ds.borderFemale} h-4 rounded transition-all duration-150`}
                    style={{
                      width: `${toNumber(d.female)}%`,
                    }}
                    onMouseEnter={(e) =>
                      setTooltip({
                        visible: true,
                        x: e.clientX,
                        y: e.clientY,
                        value: d.female,
                        year: ds.year,
                        gender: "Female",
                        ageGroup: group,
                      })
                    }
                    onMouseLeave={() =>
                      setTooltip({
                        visible: false,
                        x: 0,
                        y: 0,
                        value: null,
                        year: null,
                        gender: null,
                        ageGroup: null,
                      })
                    }
                    title={`${ds.year} Female: ${d.female}`}
                  />
                );
              })}
              {/* <span className="text-xs text-red-600 pt-1">Female</span> */}
            </div>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="mt-5 flex gap-4">
        {datasets.map((ds) => (
          <div className="flex items-center gap-2" key={ds.year}>
            <span
              className={`w-6 h-4 rounded ${ds.colorMale} mx-1 border ${ds.borderMale} inline-block`}
            />
            <span className="text-xs">{ds.year} Male</span>
            <span
              className={`w-6 h-4 rounded ${ds.colorFemale} mx-1 border ${ds.borderFemale} inline-block`}
            />
            <span className="text-xs">{ds.year} Female</span>
          </div>
        ))}
      </div>
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          style={{
            position: "fixed",
            top: tooltip.y + 14,
            left: tooltip.x + 16,
            background: "rgba(0,0,0,0.75)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            pointerEvents: "none",
            fontSize: 14,
            zIndex: 1000,
            minWidth: "110px",
          }}
        >
          <div>
            <span>
              {tooltip.year} {tooltip.gender}
            </span>
          </div>
          <div>Age Group: {tooltip.ageGroup}</div>
          <div>{`Value: ${tooltip.value}`}</div>
        </div>
      )}
    </div>
  );
};
