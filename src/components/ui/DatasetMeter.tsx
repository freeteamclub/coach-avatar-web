import React from "react";
import { CheckCircle, AlertCircle, Circle } from "lucide-react";

interface DatasetItem {
  label: string;
  completed: boolean;
  optional?: boolean;
}

interface DatasetMeterProps {
  items: DatasetItem[];
  className?: string;
}

export function DatasetMeter({
  items,
  className = "",
}: DatasetMeterProps) {
  // Calculate completion based on ALL items (not just required ones)
  const completedCount = items.filter(
    (item) => item.completed,
  ).length;
  const totalCount = items.length;
  const completionPercentage =
    totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const getStatusColor = () => {
    if (completionPercentage === 100) return "text-green-600";
    if (completionPercentage >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getStatusMessage = () => {
    if (completionPercentage === 100)
      return "Ready to publish!";
    if (completionPercentage >= 60)
      return "Good start! Add more for better results";
    return "Add more content for a complete avatar";
  };

  return (
    <div
      className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 lg:p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-3 lg:mb-4">
        <h4 className="text-slate-900 dark:text-slate-100 text-sm lg:text-base">
          Dataset Completeness
        </h4>
        <span
          className={`${getStatusColor()} text-lg lg:text-xl font-semibold`}
        >
          {Math.round(completionPercentage)}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 lg:h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-3 lg:mb-4">
        <div
          className={`h-full transition-all duration-500 ${
            completionPercentage === 100
              ? "bg-green-500"
              : completionPercentage >= 60
                ? "bg-yellow-500"
                : "bg-orange-500"
          }`}
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      {/* Status Message */}
      <p
        className={`mb-3 lg:mb-4 ${getStatusColor()} text-xs lg:text-sm`}
      >
        {getStatusMessage()}
      </p>

      {/* Items Checklist */}
      <div className="space-y-2 lg:space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 lg:gap-3"
          >
            {item.completed ? (
              <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-green-500 flex-shrink-0" />
            ) : (
              <Circle className="w-4 h-4 lg:w-5 lg:h-5 text-slate-300 dark:text-slate-600 flex-shrink-0" />
            )}
            <span
              className={`text-xs lg:text-sm ${item.completed ? "text-slate-600 dark:text-slate-400 line-through" : "text-slate-900 dark:text-slate-100"}`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}