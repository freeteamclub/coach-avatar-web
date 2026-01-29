import React from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

interface Step4CoachingApproachProps {
  onNext: (data: any) => void;
  onBack: (data?: any) => void;
  initialData?: any;
}

export function Step4CoachingApproach({
  onNext,
  onBack,
  initialData,
}: Step4CoachingApproachProps) {
  const [coachingApproach, setCoachingApproach] =
    React.useState(initialData?.approach || initialData?.coachingApproach || "");
  const [showExamples, setShowExamples] = React.useState(false);

  // Helper to get current form data
  const getCurrentData = () => ({
    approach: coachingApproach,
  });

  const handleNext = () => {
    onNext(getCurrentData());
  };

  // Save data when going back
  const handleBack = () => {
    onBack(getCurrentData());
  };

  const characterCount = coachingApproach.length;
  const isWithinRange =
    characterCount >= 500 && characterCount <= 1000;
  const isMinimumMet = characterCount >= 500;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">
            Your Coaching Approach & Values
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            This section helps your avatar reflect your unique
            presence and values — not just generic coaching
            language.
          </p>
        </div>

        <div className="space-y-6">
          {/* Main text field */}
          <Card>
            <div className="mb-4">
              <label className="block text-slate-700 dark:text-slate-300 mb-2">
                Describe your approach to working with clients{" "}
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  (optional)
                </span>
              </label>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                You might include:
              </p>
              <ul className="text-sm text-slate-500 dark:text-slate-400 mb-4 space-y-1 list-disc list-inside">
                <li>What matters most in how you work</li>
                <li>Your guiding principles or values</li>
                <li>What clients can expect from your style</li>
                <li>
                  How you create the coaching relationship
                </li>
              </ul>
            </div>

            <textarea
              value={coachingApproach}
              onChange={(e) =>
                setCoachingApproach(e.target.value)
              }
              placeholder="Describe your coaching approach and values here..."
              rows={8}
              maxLength={1000}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-sm ${
                  characterCount === 0
                    ? "text-slate-500 dark:text-slate-400"
                    : !isMinimumMet
                      ? "text-amber-600 dark:text-amber-400"
                      : isWithinRange
                        ? "text-green-600 dark:text-green-400"
                        : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {characterCount === 0 && "Optional field"}
                {characterCount > 0 &&
                  !isMinimumMet &&
                  "Recommended: at least 500 characters"}
                {isMinimumMet &&
                  isWithinRange &&
                  "✓ Good detail"}
                {isMinimumMet &&
                  !isWithinRange &&
                  "You can add more"}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {characterCount} / 1000 characters
              </span>
            </div>
          </Card>

          {/* Examples section */}
          <Card>
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="w-full flex items-center justify-between text-left"
            >
              <h4 className="text-slate-900 dark:text-slate-100">
                Examples for inspiration{" "}
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  (ICF-neutral)
                </span>
              </h4>
              {showExamples ? (
                <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
              )}
            </button>

            {showExamples && (
              <div className="mt-4 space-y-4">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    "I believe in trusting the client's agenda
                    and inner wisdom. I create space for
                    reflection rather than rushing to solutions.
                    My role is to ask powerful questions and
                    hold clients accountable to what matters
                    most to them."
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    "I work from a strengths-based perspective,
                    focusing on what's already working. I'm
                    direct and action-oriented, but always in
                    service of the client's goals, not my own
                    ideas."
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                  <p className="text-slate-700 dark:text-slate-300 italic">
                    "I blend mindfulness with practical
                    goal-setting. Sessions feel grounded and
                    structured, but there's always room for what
                    emerges in the moment."
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleNext} variant="primary" className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
