import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
} from "recharts";

export const BarGraph = () => {
  const patternData = {
    items: [
      { pattern: "< 15k", value: 484 },
      { pattern: "15-30k", value: 3091 },
      { pattern: "30-45k", value: 5038 },
      { pattern: "45-60k", value: 2536 },
      { pattern: "60-75k", value: 1260 },
      { pattern: "75-100k", value: 1074 },
      { pattern: "100k+", value: 404 },
    ],
  };
  return (
    <div className="mt-8 ">
      <ResponsiveContainer width="100%" height={270}>
        <BarChart
          data={patternData?.items ?? []}
          margin={{ top: 20, right: 20, bottom: -20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="category"
            dataKey="pattern"
            stroke="#475569"
            fontSize={10}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis
            type="number"
            stroke="#475569"
            fontSize={11}
            tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
          />
          <RechartsTooltip
            contentStyle={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            formatter={(value) => [Number(value).toLocaleString(), "Wage"]}
            labelFormatter={(label) => `Pattern: ${label}`}
          />
          <Bar
            dataKey={"value"}
            fill="#09175f"
            name={"Amount Saved"}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
      <div className="text-center sm:text-lg md:text-xl font-bold text-gray-700">
        <span className="text-base">Wage Distribution</span>
      </div>
    </div>
  );
};
