import React from 'react';

const StatCard = ({ title, value, icon, color, type, totalCount, completedCount }) => {
  const colorMap = {
    cyan: 'bg-cyan-500',
    green: 'bg-violet-500',
    purple: 'bg-violet-500',
    orange: 'bg-orange-500',
    indigo: 'bg-violet-600',
    emerald: 'bg-violet-600',
  };

  const accentColor = colorMap[color] || 'bg-violet-500';

  // Extract numeric value for visualizations
  const numericValue = typeof value === 'string' ? parseInt(value) || 0 : value;

  // Different visual representations based on card type
  const renderVisualization = () => {
    switch (type) {
      case 'tracks':
        // Progress bar showing completed vs total tasks
        const tracksPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-900 uppercase tracking-widest">
              <span>Completed</span>
              <span className="text-violet-600">{completedCount}/{totalCount}</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-violet-500 to-violet-600 transition-all duration-1000 ease-out"
                style={{ width: `${tracksPercentage}%` }}
              />
            </div>
          </div>
        );

      case 'progress':
        // Segmented progress showing pending tasks
        const maxSegments = 10;
        const filledSegments = Math.min(numericValue, maxSegments);
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-900 uppercase tracking-widest">
              <span>Active Tasks</span>
              <span className="text-amber-600">{numericValue}</span>
            </div>
            <div className="flex gap-1">
              {[...Array(maxSegments)].map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all duration-500 ${i < filledSegments
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                    : 'bg-slate-100'
                    }`}
                  style={{
                    transitionDelay: `${i * 50}ms`,
                  }}
                />
              ))}
            </div>
          </div>
        );

      case 'hours':
        // Gradient fill showing study hours accumulation
        const maxHours = 50; // Maximum expected hours for visualization
        const hoursPercentage = Math.min((numericValue / maxHours) * 100, 100);
        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-900 uppercase tracking-widest">
              <span>Study Time</span>
              <span className="text-orange-600">{numericValue}h logged</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 transition-all duration-1000 ease-out"
                style={{ width: `${hoursPercentage}%` }}
              />
            </div>
          </div>
        );

      case 'efficiency':
        // Circular progress showing efficiency percentage
        const percentage = parseInt(value) || 0;
        const radius = 18;
        const circumference = 2 * Math.PI * radius;
        const strokeDashoffset = circumference - (percentage / 100) * circumference;

        return (
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-900 uppercase tracking-widest">
              <span>Completion Rate</span>
              <span className={`${percentage >= 70 ? 'text-violet-600' : percentage >= 40 ? 'text-amber-600' : 'text-slate-900'}`}>
                {percentage}%
              </span>
            </div>
            <div className="flex items-center gap-3">
              <svg className="w-14 h-14 -rotate-90 flex-shrink-0">
                {/* Background circle */}
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  stroke="#e2e8f0"
                  strokeWidth="5"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="28"
                  cy="28"
                  r={radius}
                  stroke={percentage >= 70 ? '#8b5cf6' : percentage >= 40 ? '#f59e0b' : '#94a3b8'}
                  strokeWidth="5"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ease-out ${percentage >= 70
                    ? 'bg-gradient-to-r from-violet-400 to-violet-600'
                    : percentage >= 40
                      ? 'bg-gradient-to-r from-amber-400 to-orange-500'
                      : 'bg-gradient-to-r from-slate-300 to-slate-400'
                    }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        );

      default:
        // Default progress bar
        return (
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className={`h-full ${accentColor} w-2/3 group-hover:w-full transition-all duration-1000`} />
          </div>
        );
    }
  };

  return (
    <div className="premium-card group hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between h-52 border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800">
      <div className="flex justify-between items-start">
        <div className="space-y-4">
          <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
            {title}
          </p>
          <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors leading-none">
            {value}
          </h3>
        </div>
        <div className="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-3xl flex items-center justify-center text-4xl group-hover:scale-110 group-hover:bg-violet-600 group-hover:dark:bg-violet-500 group-hover:text-white transition-all duration-500 shadow-sm">
          {icon}
        </div>
      </div>

      <div className="mt-auto">
        {renderVisualization()}
      </div>
    </div>
  );
};

export default StatCard;
