import React from "react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  className = "",
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex justify-between items-center">
        <span className="text-slate-600 dark:text-slate-400">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-indigo-600 dark:text-indigo-400">
          {Math.round(progress)}% complete
        </span>
      </div>
      <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

export function StepIndicator({
  currentStep,
  totalSteps,
  className = "",
}: StepIndicatorProps) {
  const steps = [
    "Basic Identity",
    "Tone of Voice",
    "Coaching Approach",
    "How You Work",
    "Boundaries",
    "Training Materials",
    "Avatar Overview",
  ];

  const currentStepName = steps[currentStep - 1] || "";

  return (
    <div className={`${className}`}>
      {/* Mobile: Compact version */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-col">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
              {currentStepName}
            </span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-600 to-emerald-600 transition-all duration-500"
            style={{
              width: `${(currentStep / totalSteps) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Desktop: Full step indicator */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-600 dark:text-slate-400">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <React.Fragment key={index}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`
                      w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200
                      ${isCompleted ? "bg-green-600 text-white" : ""}
                      ${isActive ? "bg-green-600 text-white ring-4 ring-green-100 dark:ring-green-900" : ""}
                      ${!isActive && !isCompleted ? "bg-slate-200 dark:bg-slate-700 text-slate-500" : ""}
                    `}
                  >
                    {isCompleted ? "✓" : stepNumber}
                  </div>
                  <span
                    className={`text-xs whitespace-nowrap ${isActive ? "text-slate-900 dark:text-slate-100" : "text-slate-500"}`}
                  >
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 ${isCompleted ? "bg-green-600" : "bg-slate-200 dark:bg-slate-700"}`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}