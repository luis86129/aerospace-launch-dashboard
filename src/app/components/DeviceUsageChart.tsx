import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { internetUsageByAge } from "../data/internetUsageData";

export function DeviceUsageChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Uso por Dispositivo según Edad</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={internetUsageByAge}>
          <CartesianGrid key="devices-grid" strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            key="devices-x-axis"
            dataKey="ageGroup" 
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            key="devices-y-axis"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
            label={{ value: 'Usuarios (%)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
          />
          <Tooltip 
            key="devices-tooltip"
            contentStyle={{ 
              backgroundColor: 'white', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            formatter={(value: number) => `${value}%`}
          />
          <Legend 
            key="devices-legend"
            wrapperStyle={{ paddingTop: '20px' }}
          />
          <Bar key="mobile-bars" dataKey="mobileUsers" fill="#10b981" name="Móvil" radius={[8, 8, 0, 0]} />
          <Bar key="desktop-bars" dataKey="desktopUsers" fill="#f59e0b" name="Escritorio" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
