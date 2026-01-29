import React from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  Shield,
  AlertTriangle,
  X,
  Plus,
  ChevronDown,
  ChevronUp,
  Info,
} from "lucide-react";

interface Step6BoundariesProps {
  onNext: (data: any) => void;
  onBack: (data?: any) => void;
  initialData?: any;
  certificationStatus?: string;
  affiliations?: string[];
}

const commonTopics = [
  "Goal clarity",
  "Accountability",
  "Leadership challenges",
  "Career transitions",
  "Work-life balance",
  "Clinical mental health",
  "Legal issues",
  "Medical decisions",
  "Acute crisis",
  "Financial advice",
];

export function Step6Boundaries({
  onNext,
  onBack,
  initialData,
  certificationStatus,
  affiliations,
}: Step6BoundariesProps) {
  const [topicsAllowed, setTopicsAllowed] = React.useState<
    string[]
  >(
    initialData?.topicsAllowed || initialData?.allowedTopics || [
      "Goal clarity",
      "Accountability",
      "Leadership challenges",
    ],
  );
  const [topicsBlocked, setTopicsBlocked] = React.useState<
    string[]
  >(
    initialData?.topicsBlocked || initialData?.blockedTopics || [
      "Clinical mental health",
      "Legal issues",
      "Medical decisions",
    ],
  );
  const [crisisResponse, setCrisisResponse] = React.useState(
    initialData?.crisisResponse ||
      "I hear that you're going through something very difficult. What you're describing goes beyond what I can support with as a coach. I strongly encourage you to reach out to [crisis hotline / mental health professional / trusted support]. Would you like me to share resources?",
  );
  const [outOfScopeResponse, setOutOfScopeResponse] =
    React.useState(
      initialData?.outOfScopeResponse ||
        "This sounds like it might need expertise beyond coaching — such as [legal / medical / financial] guidance. I can help you explore how you're thinking about this decision, but I can't advise on the specific matter. Would you like to talk about what support might be helpful?",
    );
  const [customTopic, setCustomTopic] = React.useState("");
  const [customBlockedTopic, setCustomBlockedTopic] =
    React.useState("");
  const [showDefaultBoundaries, setShowDefaultBoundaries] =
    React.useState(false);

  // Helper to get current form data
  const getCurrentData = () => ({
    topicsAllowed,
    topicsBlocked,
    crisisResponse,
    outOfScopeResponse,
  });

  const toggleTopic = (
    topic: string,
    list: "allowed" | "blocked",
  ) => {
    if (list === "allowed") {
      if (topicsAllowed.includes(topic)) {
        setTopicsAllowed(
          topicsAllowed.filter((t) => t !== topic),
        );
      } else {
        setTopicsAllowed([...topicsAllowed, topic]);
        setTopicsBlocked(
          topicsBlocked.filter((t) => t !== topic),
        );
      }
    } else {
      if (topicsBlocked.includes(topic)) {
        setTopicsBlocked(
          topicsBlocked.filter((t) => t !== topic),
        );
      } else {
        setTopicsBlocked([...topicsBlocked, topic]);
        setTopicsAllowed(
          topicsAllowed.filter((t) => t !== topic),
        );
      }
    }
  };

  const addCustomTopic = () => {
    if (customTopic.trim()) {
      setTopicsAllowed([...topicsAllowed, customTopic.trim()]);
      setCustomTopic("");
    }
  };

  const addCustomBlockedTopic = () => {
    if (customBlockedTopic.trim()) {
      setTopicsBlocked([
        ...topicsBlocked,
        customBlockedTopic.trim(),
      ]);
      setCustomBlockedTopic("");
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">
            Professional Boundaries
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Define what your mentor avatar can and cannot engage
            with.
          </p>
        </div>

        {/* Pre-filled based on certification (conditional) */}
        {hasICFOrEMCC && (
          <Card className="bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 mb-6">
            <div className="mb-3">
              <h4 className="text-slate-900 dark:text-slate-100 mb-2">
                Pre-filled based on your certification
              </h4>
              <p className="text-sm text-slate-700 dark:text-slate-300">
                We've added common boundaries from{" "}
                {affiliationType} ethics as a starting point.
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                You can edit, add, or remove anything.
              </p>
            </div>

            <button
              onClick={() =>
                setShowDefaultBoundaries(!showDefaultBoundaries)
              }
              className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              {showDefaultBoundaries ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Hide what's included by default
                  </span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    See what's included by default
                  </span>
                </>
              )}
            </button>

            {showDefaultBoundaries && (
              <div className="mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-indigo-200 dark:border-indigo-700">
                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  <strong>Default examples:</strong>
                </p>
                <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside">
                  <li>
                    No medical, legal, or financial advice
                  </li>
                  <li>No therapy or clinical treatment</li>
                  <li>
                    Redirection for crisis or suicidal ideation
                  </li>
                  <li>
                    Confidentiality and data privacy standards
                  </li>
                </ul>
              </div>
            )}
          </Card>
        )}

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Topics your avatar handles well */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-100">
                    Topics your avatar handles well
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Your professional coaching focus.
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                The avatar reflects your expertise and engages clients only on the topics you define here.
              </p>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 italic">
                Examples: goal clarity, accountability,
                leadership challenges, career transitions,
                work-life balance
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {topicsAllowed.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      toggleTopic(topic, "allowed")
                    }
                    className="px-3 py-1.5 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full flex items-center gap-2 hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                  >
                    {topic}
                    <X className="w-4 h-4" />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Add from common topics:
                </p>
                <div className="flex flex-wrap gap-2">
                  {commonTopics
                    .filter(
                      (t) =>
                        !topicsAllowed.includes(t) &&
                        !topicsBlocked.includes(t),
                    )
                    .map((topic, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          toggleTopic(topic, "allowed")
                        }
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                      >
                        + {topic}
                      </button>
                    ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add custom topic..."
                    value={customTopic}
                    onChange={(e) =>
                      setCustomTopic(e.target.value)
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" && addCustomTopic()
                    }
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Button onClick={addCustomTopic} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Why this matters */}
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <div className="flex gap-3">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-slate-900 dark:text-slate-100 mb-2">
                    Why this matters
                  </h4>
                  <p className="text-slate-700 dark:text-slate-300">
                    Clear boundaries protect both you and your
                    clients, and ensure the avatar stays aligned
                    with professional standards.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Topics requiring redirection */}
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <div>
                  <h4 className="text-slate-900 dark:text-slate-100">
                    Topics requiring redirection
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    When should your avatar suggest other
                    professional support?
                  </p>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 italic">
                Examples: clinical mental health concerns, legal
                issues, medical decisions, acute crisis
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {topicsBlocked.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      toggleTopic(topic, "blocked")
                    }
                    className="px-3 py-1.5 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full flex items-center gap-2 hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                  >
                    {topic}
                    <X className="w-4 h-4" />
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                  Add from common topics:
                </p>
                <div className="flex flex-wrap gap-2">
                  {commonTopics
                    .filter(
                      (t) =>
                        !topicsAllowed.includes(t) &&
                        !topicsBlocked.includes(t),
                    )
                    .map((topic, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          toggleTopic(topic, "blocked")
                        }
                        className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
                      >
                        + {topic}
                      </button>
                    ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add custom blocked topic..."
                    value={customBlockedTopic}
                    onChange={(e) =>
                      setCustomBlockedTopic(e.target.value)
                    }
                    onKeyPress={(e) =>
                      e.key === "Enter" &&
                      addCustomBlockedTopic()
                    }
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <Button
                    onClick={addCustomBlockedTopic}
                    size="sm"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Out-of-scope response — sample text */}
            <Card>
              <div className="mb-4">
                <h4 className="text-slate-900 dark:text-slate-100 mb-2">
                  Out-of-scope response — sample text{" "}
                  <span className="text-slate-500 dark:text-slate-400 text-sm">
                    (editable)
                  </span>
                </h4>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  When a topic is outside your avatar's role:
                </p>
              </div>

              <textarea
                value={outOfScopeResponse}
                onChange={(e) =>
                  setOutOfScopeResponse(e.target.value)
                }
                rows={6}
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              />
            </Card>
          </div>
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
