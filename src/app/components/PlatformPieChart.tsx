import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { platformDistribution } from "../data/internetUsageData";

export function PlatformPieChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Distribución por Plataforma</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            key="platform-pie"
            data={platformDistribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {platformDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            key="platform-tooltip"
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value: number) => `${value}%`}
          />
          <Legend key="platform-legend" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
