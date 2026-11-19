import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { internetUsageByAge } from "../data/internetUsageData";

export function UsageBarChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Porcentaje de Uso de Internet por Grupo de Edad</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={internetUsageByAge}>
          <CartesianGrid key="usage-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            key="usage-x-axis"
            dataKey="ageGroup" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            key="usage-y-axis"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Porcentaje (%)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
          />
          <Tooltip 
            key="usage-tooltip"
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value: number) => [`${value}%`, 'Uso']}
          />
          <Legend 
            key="usage-legend"
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={() => 'Porcentaje de Uso'}
          />
          <Bar key="usage-bars" dataKey="usagePercentage" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
