import React from "react";
import { Card } from "./ui/Card";
import { ArrowDown, ArrowRight, GitBranch } from "lucide-react";

export function FlowchartDiagram() {
  const steps = [
    {
      id: 0,
      title: "Welcome Screen",
      description: "Introduction & value proposition",
      decision: false,
    },
    {
      id: 1,
      title: "Personal Info",
      description: "Name, headline, photo + LinkedIn autofill",
      decision: false,
    },
    {
      id: 2,
      title: "Select Avatar Type",
      description: "Choose mentor category",
      decision: true,
      options: [
        "Business",
        "Career",
        "Wellness",
        "Content",
        "Custom",
      ],
    },
    {
      id: 3,
      title: "Upload Sources",
      description: "Text, video, or links",
      decision: true,
      options: ["Text Documents", "Video/Audio", "Web Links"],
    },
    {
      id: 4,
      title: "Tone Calibration",
      description: "Sliders + sample selection",
      decision: false,
    },
    {
      id: 5,
      title: "Knowledge Calibration",
      description: "5 questions to train patterns",
      decision: false,
    },
    {
      id: 6,
      title: "Boundaries & Safety",
      description: "Topics & crisis response",
      decision: false,
    },
    {
      id: 7,
      title: "Summary Review",
      description: "Overview with edit options",
      decision: false,
    },
    {
      id: 8,
      title: "Avatar Preview",
      description: "Interactive chat test",
      decision: true,
      options: ["Refine", "Publish"],
    },
    {
      id: 9,
      title: "Publish",
      description: "Export options & integration",
      decision: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">
            Onboarding Flow Diagram
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Complete user journey from welcome to published
            avatar
          </p>
        </div>

        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="space-y-6">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    {step.id}
                  </div>

                  {/* Step Card */}
                  <Card className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="text-slate-900 dark:text-slate-100 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          {step.description}
                        </p>
                      </div>
                      {step.decision && (
                        <div className="ml-4 px-3 py-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 rounded-full flex items-center gap-2">
                          <GitBranch className="w-4 h-4" />
                          Decision Point
                        </div>
                      )}
                    </div>

                    {/* Decision Options */}
                    {step.decision && step.options && (
                      <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <p className="text-slate-600 dark:text-slate-400 mb-2">
                          Options:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {step.options.map(
                            (option, optIndex) => (
                              <span
                                key={optIndex}
                                className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                              >
                                {option}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </Card>
                </div>

                {/* Arrow */}
                {index < steps.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="w-8 h-8 text-indigo-400" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden space-y-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <Card>
                <div className="flex items-start gap-4 mb-3">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    {step.id}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-slate-900 dark:text-slate-100 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400">
                      {step.description}
                    </p>
                  </div>
                </div>

                {step.decision && (
                  <div className="ml-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300 rounded-full mb-2">
                      <GitBranch className="w-4 h-4" />
                      Decision Point
                    </div>
                    {step.options && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {step.options.map(
                          (option, optIndex) => (
                            <span
                              key={optIndex}
                              className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full"
                            >
                              {option}
                            </span>
                          ),
                        )}
                      </div>
                    )}
                  </div>
                )}
              </Card>

              {index < steps.length - 1 && (
                <div className="flex justify-center">
                  <ArrowDown className="w-6 h-6 text-indigo-400" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Legend */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <h4 className="text-slate-900 dark:text-slate-100 mb-4">
            Flow Characteristics
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h5 className="text-slate-900 dark:text-slate-100 mb-2">
                Total Steps: 10
              </h5>
              <p className="text-slate-600 dark:text-slate-400">
                From welcome to publish
              </p>
            </div>
            <div>
              <h5 className="text-slate-900 dark:text-slate-100 mb-2">
                Est. Time: 10 min
              </h5>
              <p className="text-slate-600 dark:text-slate-400">
                Quick and efficient setup
              </p>
            </div>
            <div>
              <h5 className="text-slate-900 dark:text-slate-100 mb-2">
                Decision Points: 3
              </h5>
              <p className="text-slate-600 dark:text-slate-400">
                Personalized paths
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}