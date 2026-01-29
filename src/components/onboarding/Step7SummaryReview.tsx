import React from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ChatPreview } from "../ui/ChatPreview";
import {
  CheckCircle,
  Edit2,
  User,
  MessageSquare,
  Heart,
  Target,
  Shield,
  Upload,
  AlertCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface Step7SummaryReviewProps {
  onNext: () => void;
  onBack: () => void;
  onEdit: (step: number) => void;
  onGoToDashboard: () => void;
  data: any;
}

export function Step7SummaryReview({
  onNext,
  onBack,
  onEdit,
  onGoToDashboard,
  data,
}: Step7SummaryReviewProps) {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hi! I'm your mentor avatar. I'm here to help you with business strategy, leadership development, and career transitions. How can I assist you today?",
    },
  ]);
  const [expandedSections, setExpandedSections] =
    React.useState<Set<string>>(new Set());
  const [comparisonMode, setComparisonMode] = React.useState<
    "trained" | "comparison"
  >("trained");

  // Calculate completeness for each section
  const calculateSectionScore = (
    sectionKey: string,
  ): number => {
    switch (sectionKey) {
      case "basicIdentity":
        const profileItems = [
          data.personalInfo?.fullName,
          data.personalInfo?.headline,
          data.personalInfo?.certificationStatus,
        ].filter(Boolean).length;
        return Math.round((profileItems / 3) * 100);

      case "toneOfVoice":
        const hasCommunicationStyle =
          data.tone?.communicationStyle &&
          data.tone.communicationStyle.length >= 200;
        return hasCommunicationStyle
          ? 100
          : data.tone?.communicationStyle
            ? 50
            : 0;

      case "coachingApproach":
        const hasApproach =
          data.coachingApproach?.coachingApproach &&
          data.coachingApproach.coachingApproach.length >= 200;
        return hasApproach
          ? 100
          : data.coachingApproach?.coachingApproach
            ? 50
            : 0;

      case "howYouWork":
        const hasFlow =
          data.howYouWork?.conversationFlow &&
          data.howYouWork.conversationFlow.length >= 300;
        const hasMoments =
          data.howYouWork?.keyMoments &&
          data.howYouWork.keyMoments.length >= 300;
        const flowScore = hasFlow
          ? 50
          : data.howYouWork?.conversationFlow
            ? 25
            : 0;
        const momentsScore = hasMoments
          ? 50
          : data.howYouWork?.keyMoments
            ? 25
            : 0;
        return flowScore + momentsScore;

      case "boundaries":
        const allowedCount =
          data.boundaries?.allowedTopics?.length || 0;
        const blockedCount =
          data.boundaries?.blockedTopics?.length || 0;
        const hasCrisis = !!data.boundaries?.crisisResponse;

        const allowedScore =
          allowedCount >= 3
            ? 33
            : Math.round((allowedCount / 3) * 33);
        const blockedScore =
          blockedCount >= 2
            ? 34
            : Math.round((blockedCount / 2) * 34);
        const crisisScore = hasCrisis ? 33 : 0;

        return allowedScore + blockedScore + crisisScore;

      case "trainingMaterials":
        const fileCount = data.sources?.textFiles?.length || 0;
        const videoCount =
          data.sources?.videoFiles?.length || 0;
        const linkCount = data.sources?.webLinks?.length || 0;

        const fileScore = fileCount >= 1 ? 33 : 0;
        const videoScore = videoCount >= 1 ? 33 : 0;
        const linkScore = linkCount >= 1 ? 34 : 0;

        return fileScore + videoScore + linkScore;

      default:
        return 0;
    }
  };

  const sections = [
    {
      key: "basicIdentity",
      icon: <User className="w-5 h-5" />,
      title: "Basic Identity",
      description: "Name, headline, certification",
      step: 1,
      score: calculateSectionScore("basicIdentity"),
    },
    {
      key: "toneOfVoice",
      icon: <MessageSquare className="w-5 h-5" />,
      title: "Tone of Voice",
      description: "Your communication style defined",
      step: 2,
      score: calculateSectionScore("toneOfVoice"),
    },
    {
      key: "coachingApproach",
      icon: <Heart className="w-5 h-5" />,
      title: "Your Coaching Approach",
      description: "Consider adding more about your values",
      step: 3,
      score: calculateSectionScore("coachingApproach"),
    },
    {
      key: "howYouWork",
      icon: <Target className="w-5 h-5" />,
      title: "How You Work",
      description: "Conversation structure and key moments",
      step: 4,
      score: calculateSectionScore("howYouWork"),
    },
    {
      key: "boundaries",
      icon: <Shield className="w-5 h-5" />,
      title: "Professional Boundaries",
      description: "Topics and crisis responses set",
      step: 5,
      score: calculateSectionScore("boundaries"),
    },
    {
      key: "trainingMaterials",
      icon: <Upload className="w-5 h-5" />,
      title: "Training Materials",
      description:
        "You can add materials anytime from your dashboard",
      step: 6,
      score: calculateSectionScore("trainingMaterials"),
      optional: true,
    },
  ];

  const overallScore = Math.round(
    sections.reduce((sum, section) => sum + section.score, 0) /
      sections.length,
  );

  const toggleSection = (key: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(key)) {
      newExpanded.delete(key);
    } else {
      newExpanded.add(key);
    }
    setExpandedSections(newExpanded);
  };

  const handleSendMessage = (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
    };

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content:
        comparisonMode === "trained"
          ? "That's a great question. Based on your methodology and experience, I'd recommend starting by identifying your top 3 priorities and delegating the rest. This aligns with the framework you outlined in your leadership materials."
          : "I can help with that. A common approach would be to set clear boundaries and communicate them to your team. Work-life balance is important for long-term productivity.",
    };

    setMessages([...messages, userMessage, assistantMessage]);
  };

  const resetChat = () => {
    setMessages([
      {
        id: "1",
        role: "assistant",
        content:
          "Hi! I'm your mentor avatar. I'm here to help you with business strategy, leadership development, and career transitions. How can I assist you today?",
      },
    ]);
  };

  const samplePrompts = [
    "I feel stuck with my goals",
    "Help me reflect on my last week",
    "I need clarity before making a decision",
    "I'm struggling with work-life balance",
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">
            Your Mentor Avatar — Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Review what you've created and try a live chat
            preview.
          </p>
        </div>

        {/* Overall Completeness - Compact Cards */}
        <Card className="mb-8 bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950 border-indigo-200 dark:border-indigo-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-slate-900 dark:text-slate-100">
              Overall completeness
            </h3>
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {overallScore}%
            </div>
          </div>

          {/* Overall Progress Bar */}
          <div className="w-full h-3 bg-white dark:bg-slate-800 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-violet-600 transition-all"
              style={{ width: `${overallScore}%` }}
            />
          </div>

          {/* Compact Section Cards - 6 in a grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {sections.map((section) => {
              const isComplete = section.score >= 80;
              const isIncomplete =
                section.score < 80 && !section.optional;

              return (
                <div
                  key={section.key}
                  className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        isComplete
                          ? "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400"
                          : isIncomplete
                            ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        section.icon
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-slate-700 dark:text-slate-300">
                        {section.score}%
                      </span>
                    </div>
                  </div>
                  <h4 className="text-slate-900 dark:text-slate-100 font-medium mb-1 text-sm">
                    {section.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3">
                    {isComplete && (
                      <span className="text-xs text-green-600 dark:text-green-400">
                        Complete
                      </span>
                    )}
                    {isIncomplete && (
                      <span className="text-xs text-yellow-600 dark:text-yellow-400 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        Incomplete
                      </span>
                    )}
                    {section.optional && !isComplete && (
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        Optional
                      </span>
                    )}
                    <Button
                      onClick={() => onEdit(section.step)}
                      variant="ghost"
                      size="sm"
                      className="ml-auto h-7 px-2 text-xs"
                    >
                      <Edit2 className="w-3 h-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Your Mentor Avatar — live preview */}
        <div className="mb-8">
          <h3 className="text-slate-900 dark:text-slate-100 mb-4">
            Your Mentor Avatar — live preview
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Try a short chat to see how your avatar responds.
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left: Chat Interface */}
            <div>
              {/* Mode Toggle */}
              <div className="mb-4 flex gap-2 p-1 bg-slate-200 dark:bg-slate-800 rounded-lg">
                <button
                  onClick={() => {
                    setComparisonMode("trained");
                    resetChat();
                  }}
                  className={`flex-1 px-4 py-2.5 rounded-md transition-all ${
                    comparisonMode === "trained"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  <Sparkles className="w-5 h-5 inline-block mr-2" />
                  Your Avatar
                </button>
                <button
                  onClick={() => {
                    setComparisonMode("comparison");
                    resetChat();
                  }}
                  className={`flex-1 px-4 py-2.5 rounded-md transition-all ${
                    comparisonMode === "comparison"
                      ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-sm"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  Generic Model
                </button>
              </div>

              <ChatPreview
                messages={messages}
                onSendMessage={handleSendMessage}
                placeholder="Ask your avatar anything..."
                showBadge={comparisonMode === "trained"}
                avatarUrl={data.personalInfo?.selectedAvatarUrl || data.personalInfo?.avatarPhotoUrl}
                avatarName={data.personalInfo?.avatarName || "Your Mentor Avatar"}
              />

              {/* Reset Button */}
              <div className="mt-4 text-center">
                <button
                  onClick={resetChat}
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  <RefreshCw className="w-4 h-4" />
                  Reset conversation
                </button>
              </div>
            </div>

            {/* Right: Sample Prompts */}
            <div>
              <Card>
                <h4 className="text-slate-900 dark:text-slate-100 mb-4">
                  Try these sample questions
                </h4>
                <div className="space-y-2">
                  {samplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSendMessage(prompt)}
                      className="w-full text-left p-3 bg-slate-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-lg transition-all"
                    >
                      <p className="text-slate-700 dark:text-slate-300">
                        "{prompt}"
                      </p>
                    </button>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Suggestions to improve */}
        {overallScore < 100 && (
          <Card className="mb-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <h4 className="text-slate-900 dark:text-slate-100 mb-4">
              Suggestions to improve
            </h4>
            <ul className="space-y-2 text-slate-700 dark:text-slate-300 text-sm">
              {sections.find(
                (s) => s.key === "trainingMaterials",
              )?.score === 0 && (
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    <strong>Add training materials</strong> to
                    help your avatar use your specific language
                    and examples
                  </span>
                </li>
              )}
              {sections.find(
                (s) => s.key === "coachingApproach",
              )?.score < 100 && (
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    <strong>
                      Expand your coaching approach
                    </strong>{" "}
                    to give the avatar more context about your
                    values
                  </span>
                </li>
              )}
              {sections.find((s) => s.key === "howYouWork")
                ?.score < 100 && (
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    <strong>Test more prompts</strong> to see
                    how the avatar handles different situations
                  </span>
                </li>
              )}
              {!data.personalInfo?.photo && (
                <li className="flex gap-3">
                  <span>•</span>
                  <span>
                    <strong>Add a profile photo</strong> to make
                    your avatar more personable
                  </span>
                </li>
              )}
            </ul>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex gap-4">
          <Button onClick={onBack} variant="outline">
            Back
          </Button>
          <Button onClick={onGoToDashboard} variant="primary" className="flex-1">
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}