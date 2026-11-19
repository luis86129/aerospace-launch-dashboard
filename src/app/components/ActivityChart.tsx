import { activityTypes } from "../data/internetUsageData";

export function ActivityChart() {
  const maxPercentage = Math.max(...activityTypes.map(a => a.percentage));
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">Actividades Más Realizadas en Internet</h3>
      <div className="space-y-4">
        {activityTypes.map((activity, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-700">{activity.activity}</span>
              <span className="text-sm font-semibold text-gray-900">{activity.percentage}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${activity.percentage}%`,
                  backgroundColor: `hsl(${260 - (index * 30)}, 70%, 60%)`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
