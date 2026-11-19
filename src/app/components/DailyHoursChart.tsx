import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { internetUsageByAge } from "../data/internetUsageData";

export function DailyHoursChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Horas Diarias Promedio de Uso</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={internetUsageByAge}>
          <CartesianGrid key="hours-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            key="hours-x-axis"
            dataKey="ageGroup" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            key="hours-y-axis"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Horas', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
          />
          <Tooltip 
            key="hours-tooltip"
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value: number) => [`${value} hrs`, 'Tiempo Promedio']}
          />
          <Legend 
            key="hours-legend"
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={() => 'Horas Diarias'}
          />
          <Line 
            key="hours-line"
            type="monotone" 
            dataKey="dailyHours" 
            stroke="#06b6d4" 
            strokeWidth={3}
            dot={{ fill: '#06b6d4', r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
