import React from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ChevronDown, ChevronUp, Info } from "lucide-react";

interface Step5HowYouWorkProps {
  onNext: (data: any) => void;
  onBack: (data?: any) => void;
  initialData?: any;
  certificationStatus?: string;
  affiliations?: string[];
}

export function Step5HowYouWork({
  onNext,
  onBack,
  initialData,
  certificationStatus,
  affiliations,
}: Step5HowYouWorkProps) {
  const [conversationFlow, setConversationFlow] =
    React.useState(initialData?.conversationFlow || initialData?.generalDescription || "");
  const [keyMoments, setKeyMoments] = React.useState(
    initialData?.keyMoments || initialData?.sessionLogic || "",
  );
  const [showGuidance, setShowGuidance] = React.useState(false);

  // Helper to get current form data
  const getCurrentData = () => ({
    conversationFlow,
    keyMoments,
  });

  const handleNext = () => {
    onNext(getCurrentData());
  };

  // Save data when going back
  const handleBack = () => {
    onBack(getCurrentData());
  };

  // Check if user has ICF or EMCC affiliation
  const hasICFOrEMCC = affiliations?.some(
    (aff) => aff === "ICF" || aff === "EMCC",
  );
  const affiliationType = affiliations?.includes("ICF")
    ? "ICF"
    : affiliations?.includes("EMCC")
      ? "EMCC"
      : "";

  const flowCharCount = conversationFlow.length;
  const momentsCharCount = keyMoments.length;

  const isFlowInRange =
    flowCharCount >= 200 && flowCharCount <= 800;
  const isMomentsInRange =
    momentsCharCount >= 200 && momentsCharCount <= 800;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">
            How You Work in Practice
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Describe your typical way of guiding coaching
            conversations.
          </p>
        </div>

        <div className="space-y-6">
          {/* БЛОК 1: Conversation Flow */}
          <Card>
            <div className="mb-4">
              <h3 className="text-lg text-slate-900 dark:text-slate-100 mb-3">
                Your Conversation Flow
              </h3>
              
              {/* Info box */}
              <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg flex gap-2">
                <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-indigo-900 dark:text-indigo-100">
                    This is a high-level description of how you typically hold a coaching conversation.
                    There is no need to formalize or standardize your approach.
                  </p>
                </div>
              </div>

              <label className="block text-slate-700 dark:text-slate-300 mb-2">
                How do you usually guide a coaching conversation?{" "}
                <span className="text-slate-500 dark:text-slate-400 text-sm">
                  (in your own words)
                </span>
              </label>
            </div>

            <textarea
              value={conversationFlow}
              onChange={(e) =>
                setConversationFlow(e.target.value)
              }
              placeholder="You can describe your mindset, principles, or overall flow — even if it feels intuitive or adaptive…"
              rows={6}
              maxLength={800}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-sm ${
                  flowCharCount === 0
                    ? "text-slate-500 dark:text-slate-400"
                    : flowCharCount < 200
                      ? "text-amber-600 dark:text-amber-400"
                      : isFlowInRange
                        ? "text-green-600 dark:text-green-400"
                        : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {flowCharCount === 0 && "Optional"}
                {flowCharCount > 0 &&
                  flowCharCount < 200 &&
                  "Recommended: at least 200 characters"}
                {isFlowInRange && "✓ Good detail"}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {flowCharCount} / 800 characters
              </span>
            </div>
          </Card>

          {/* БЛОК 2: Key Moments */}
          <Card>
            <div className="mb-4">
              <h3 className="text-lg text-slate-900 dark:text-slate-100 mb-3">
                Key Moments & Turning Points
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                How your avatar should recognize and respond to important moments
              </p>
              
              {/* Info box */}
              <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg flex gap-2">
                <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-indigo-900 dark:text-indigo-100 mb-2">
                    Every coach has an internal logic — even when the session feels fluid or intuitive.
                    This helps your avatar recognize where it is in the conversation and how to respond appropriately.
                  </p>
                  <p className="text-sm text-indigo-900 dark:text-indigo-100">
                    You don't need to name frameworks or stages.
                    Describe this as you would explain it to another coach or supervisor.
                  </p>
                </div>
              </div>

              <label className="block text-slate-700 dark:text-slate-300 mb-2">
                What key phases or turning points would you notice in your own sessions?
              </label>
            </div>

            <textarea
              value={keyMoments}
              onChange={(e) => setKeyMoments(e.target.value)}
              placeholder="For example, how you help clarify goals, explore meaning, notice progress, or support awareness…"
              rows={6}
              maxLength={800}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-sm ${
                  momentsCharCount === 0
                    ? "text-slate-500 dark:text-slate-400"
                    : momentsCharCount < 200
                      ? "text-amber-600 dark:text-amber-400"
                      : isMomentsInRange
                        ? "text-green-600 dark:text-green-400"
                        : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {momentsCharCount === 0 && "Optional"}
                {momentsCharCount > 0 &&
                  momentsCharCount < 200 &&
                  "Recommended: at least 200 characters"}
                {isMomentsInRange && "✓ Good detail"}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {momentsCharCount} / 800 characters
              </span>
            </div>

            {/* Example */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 font-medium">
                Example:
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed italic">
                I usually begin by helping the client articulate what they want to focus on and why it matters to them.
                My questions here are open and clarifying.
                <br/><br/>
                As the session unfolds, I ask questions that help the client notice patterns, assumptions, or emotional responses.
                <br/><br/>
                Toward the end, my questions become more integrative — helping the client name insights, markers of progress, or what they want to take forward.
              </p>
            </div>
          </Card>

          {/* Certification-based guidance (conditional) */}
          {hasICFOrEMCC && (
            <Card className="bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800">
              <div className="mb-3">
                <h4 className="text-slate-900 dark:text-slate-100">
                  Certification-based guidance{" "}
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    (if applicable)
                  </span>
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-2">
                  Based on your {affiliationType} affiliation,
                  we've included common coaching principles as
                  reference.
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  You can edit or remove anything that doesn't
                  fit your approach.
                </p>
              </div>

              <button
                onClick={() => setShowGuidance(!showGuidance)}
                className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
              >
                {showGuidance ? (
                  <>
                    <ChevronUp className="w-4 h-4" />
                    <span className="text-sm">
                      Hide suggested principles
                    </span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" />
                    <span className="text-sm">
                      See suggested principles
                    </span>
                  </>
                )}
              </button>

              {showGuidance && (
                <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-indigo-200 dark:border-indigo-700">
                  <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                    <li>
                      Trust the client's agenda and
                      resourcefulness
                    </li>
                    <li>
                      Ask powerful questions rather than give
                      advice
                    </li>
                    <li>
                      Create awareness through reflection and
                      exploration
                    </li>
                    <li>
                      Hold space for the client's process
                      without rushing
                    </li>
                    <li>
                      Maintain confidentiality and ethical
                      boundaries
                    </li>
                    <li>
                      Support accountability to client-defined
                      goals
                    </li>
                  </ul>
                </div>
              )}
            </Card>
          )}
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
