import { useState } from "react";
import { Button } from "../ui/Button";
import { Zap, Shield, Users, Play, LayoutDashboard } from "lucide-react";
import { AvatarPreviewModal } from "../ui/AvatarPreviewModal";

interface Step0WelcomeProps {
  onStart: () => void;
  onSeeExample: () => void;
  onSkipToDashboard?: () => void;
  hasAvatar?: boolean; // Whether user already has avatar data
}

export function Step0Welcome({
  onStart,
  onSeeExample,
  onSkipToDashboard,
  hasAvatar = false,
}: Step0WelcomeProps) {
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Welcome Back Banner for returning users */}
        {hasAvatar && onSkipToDashboard && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-700/50 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Вітаємо знову! 👋
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  У вас вже є створений аватар. Перейдіть до Dashboard для керування.
                </p>
              </div>
              <Button
                onClick={onSkipToDashboard}
                size="lg"
                className="bg-green-600 hover:bg-green-700 px-6 py-3 flex items-center gap-2 whitespace-nowrap"
              >
                <LayoutDashboard className="w-5 h-5" />
                Перейти до Dashboard
              </Button>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Coach Avatar Builder
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Create your AI-powered coach avatar in just 10
            minutes. Share your expertise, automate coaching
            conversations, and scale your impact.
          </p>
        </div>

        {/* Feature Highlight */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-10 shadow-xl border border-slate-200 dark:border-slate-700 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-3 text-center">
            Create your Coach Avatar in 10 minutes
          </h2>
          <p className="text-center text-slate-600 dark:text-slate-400 mb-10">
            We'll guide you through 9 simple steps. No technical
            knowledge required.
          </p>

          {/* Three Pillars */}
          <div className="grid sm:grid-cols-3 gap-8 mb-10">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-lg">
                10-Minute Setup
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Quick and simple process. Get your avatar live
                fast.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-lg">
                Your Voice, Scaled
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Train the AI on your content, methodology, and
                tone.
              </p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-lg">
                Safe & Controlled
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Set boundaries, topics, and ethical guidelines.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Button
              onClick={() => setShowPreviewModal(true)}
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg w-full sm:w-auto"
            >
              See Example Avatar
            </Button>
            <Button
              onClick={onStart}
              size="lg"
              className="px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto"
            >
              {hasAvatar ? 'Редагувати аватар' : 'Start Building →'}
            </Button>
          </div>

          {/* Video Link */}
          <div className="text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
            >
              <Play className="w-4 h-4" />
              <span className="font-medium">
                Watch: How this works (30 seconds)
              </span>
            </a>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center mb-8">
          <p className="text-slate-500 dark:text-slate-400">
            Trusted by 10,000+ coaches, consultants, and
            educators worldwide
          </p>
        </div>

        {/* Footer Links */}
        <div className="text-center space-x-4 text-sm">
          <a
            href="#"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Docs
          </a>
          <span className="text-slate-300 dark:text-slate-600">
            ·
          </span>
          <a
            href="#"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Privacy
          </a>
          <span className="text-slate-300 dark:text-slate-600">
            ·
          </span>
          <a
            href="#"
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 transition-colors"
          >
            Terms of Service
          </a>
          {onSkipToDashboard && (
            <>
              <span className="text-slate-300 dark:text-slate-600">
                ·
              </span>
              <button
                onClick={onSkipToDashboard}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 transition-colors font-medium"
              >
                Dashboard
              </button>
            </>
          )}
        </div>
      </div>

      {/* Avatar Preview Modal */}
      <AvatarPreviewModal
        isOpen={showPreviewModal}
        onClose={() => setShowPreviewModal(false)}
        onStartBuild={() => {
          setShowPreviewModal(false);
          onStart();
        }}
      />
    </div>
  );
}
