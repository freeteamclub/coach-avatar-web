import React from "react";
import { Card } from "./ui/Card";
import {
  User,
  Target,
  Upload,
  Sliders,
  Brain,
  Shield,
  CheckCircle,
  Sparkles,
  Rocket,
} from "lucide-react";

interface StepNavigatorProps {
  currentStep: number;
  onNavigate: (step: number) => void;
  onboardingData: any;
  className?: string;
}

export function StepNavigator({
  currentStep,
  onNavigate,
  onboardingData,
  className = "",
}: StepNavigatorProps) {
  const steps = [
    {
      number: 1,
      title: "Personal Info",
      icon: <User className="w-5 h-5" />,
      completed: !!onboardingData.personalInfo,
    },
    {
      number: 2,
      title: "Avatar Type",
      icon: <Target className="w-5 h-5" />,
      completed: !!onboardingData.avatarType,
    },
    {
      number: 3,
      title: "Upload Sources",
      icon: <Upload className="w-5 h-5" />,
      completed: !!onboardingData.sources,
    },
    {
      number: 4,
      title: "Tone",
      icon: <Sliders className="w-5 h-5" />,
      completed: !!onboardingData.tone,
    },
    {
      number: 5,
      title: "Knowledge",
      icon: <Brain className="w-5 h-5" />,
      completed: !!onboardingData.knowledge,
    },
    {
      number: 6,
      title: "Boundaries",
      icon: <Shield className="w-5 h-5" />,
      completed: !!onboardingData.boundaries,
    },
    {
      number: 7,
      title: "Review",
      icon: <CheckCircle className="w-5 h-5" />,
      completed: currentStep >= 7,
    },
    {
      number: 8,
      title: "Preview",
      icon: <Sparkles className="w-5 h-5" />,
      completed: currentStep >= 8,
    },
    {
      number: 9,
      title: "Publish",
      icon: <Rocket className="w-5 h-5" />,
      completed: currentStep >= 9,
    },
  ];

  return (
    <Card className={`${className}`}>
      <h4 className="text-slate-900 dark:text-slate-100 mb-4">
        Mentor Avatar Builder
      </h4>

      <div className="space-y-2">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => onNavigate(step.number)}
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg transition-all
              ${
                currentStep === step.number
                  ? "bg-indigo-100 dark:bg-indigo-900 border-2 border-indigo-500"
                  : "hover:bg-slate-100 dark:hover:bg-slate-800 border-2 border-transparent"
              }
            `}
          >
            <div
              className={`
              flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0
              ${
                step.completed
                  ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-400"
              }
            `}
            >
              {step.completed ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                step.icon
              )}
            </div>

            <div className="flex-1 text-left">
              <p
                className={`
                ${
                  currentStep === step.number
                    ? "text-slate-900 dark:text-slate-100"
                    : "text-slate-700 dark:text-slate-300"
                }
              `}
              >
                {step.title}
              </p>
            </div>

            {currentStep === step.number && (
              <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
            )}
          </button>
        ))}
      </div>
    </Card>
  );
}