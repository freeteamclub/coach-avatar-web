import React from "react";
import { Button } from "../ui/Button";

interface Step0PreviewProps {
  onStart: () => void;
  onBack: () => void;
}

export function Step0Preview({
  onStart,
  onBack,
}: Step0PreviewProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">
            Preview the process (before onboarding)
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            See what you'll build in the next few steps.
          </p>
        </div>

        {/* What you'll do — step by step */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200 dark:border-slate-700 mb-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6 text-center">
            What you'll do — step by step
          </h3>

          <div className="space-y-4 mb-6">
            {/* Step 1 */}
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-6 items-start">
              <div className="flex items-start gap-3 mb-2 sm:mb-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  1
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    Basic Identity
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    name, role, certification context.
                  </p>
                </div>
              </div>
              <div className="ml-9 sm:ml-0 sm:flex sm:items-center sm:min-w-[280px]">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 sm:bg-indigo-50 sm:dark:bg-indigo-900/30 sm:px-4 sm:py-3 sm:rounded-lg sm:border sm:border-indigo-200 sm:dark:border-indigo-700">
                  → Why: This helps align tone defaults.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-6 items-start">
              <div className="flex items-start gap-3 mb-2 sm:mb-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  2
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    Tone of Voice
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    how your avatar communicates.
                  </p>
                </div>
              </div>
              <div className="ml-9 sm:ml-0 sm:flex sm:items-center sm:min-w-[280px]">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 sm:bg-indigo-50 sm:dark:bg-indigo-900/30 sm:px-4 sm:py-3 sm:rounded-lg sm:border sm:border-indigo-200 sm:dark:border-indigo-700">
                  → Why: This ensures responses feel like you,
                  not a generic bot.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-6 items-start">
              <div className="flex items-start gap-3 mb-2 sm:mb-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  3
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    Your Coaching Approach
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    values, principles.
                  </p>
                </div>
              </div>
              <div className="ml-9 sm:ml-0 sm:flex sm:items-center sm:min-w-[280px]">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 sm:bg-indigo-50 sm:dark:bg-indigo-900/30 sm:px-4 sm:py-3 sm:rounded-lg sm:border sm:border-indigo-200 sm:dark:border-indigo-700">
                  → Why: This helps the avatar reflect your
                  unique coaching presence.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-6 items-start">
              <div className="flex items-start gap-3 mb-2 sm:mb-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  4
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    How You Work
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    your typical work process.
                  </p>
                </div>
              </div>
              <div className="ml-9 sm:ml-0 sm:flex sm:items-center sm:min-w-[280px]">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 sm:bg-indigo-50 sm:dark:bg-indigo-900/30 sm:px-4 sm:py-3 sm:rounded-lg sm:border sm:border-indigo-200 sm:dark:border-indigo-700">
                  → Why: This teaches the avatar to handle
                  sessions the way you would.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-6 items-start">
              <div className="flex items-start gap-3 mb-2 sm:mb-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  5
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    Professional Boundaries
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    ethical and practical limits.
                  </p>
                </div>
              </div>
              <div className="ml-9 sm:ml-0 sm:flex sm:items-center sm:min-w-[280px]">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 sm:bg-indigo-50 sm:dark:bg-indigo-900/30 sm:px-4 sm:py-3 sm:rounded-lg sm:border sm:border-indigo-200 sm:dark:border-indigo-700">
                  → Why: This keeps interactions safe and
                  aligned with your standards.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-6 items-start">
              <div className="flex items-start gap-3 mb-2 sm:mb-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  6
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    Training Materials
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    add links or files (optional)
                  </p>
                </div>
              </div>
              <div className="ml-9 sm:ml-0 sm:flex sm:items-center sm:min-w-[280px]">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 sm:bg-indigo-50 sm:dark:bg-indigo-900/30 sm:px-4 sm:py-3 sm:rounded-lg sm:border sm:border-indigo-200 sm:dark:border-indigo-700">
                  → Why: This helps the avatar use your specific
                  language and examples.
                </p>
              </div>
            </div>

            {/* Step 7 */}
            <div className="flex flex-col sm:grid sm:grid-cols-[1fr_auto] sm:gap-6 items-start">
              <div className="flex items-start gap-3 mb-2 sm:mb-0">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  7
                </span>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    Avatar Overview
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    a live chat preview.
                  </p>
                </div>
              </div>
              <div className="ml-9 sm:ml-0 sm:flex sm:items-center sm:min-w-[280px]">
                <p className="text-sm text-indigo-700 dark:text-indigo-300 sm:bg-indigo-50 sm:dark:bg-indigo-900/30 sm:px-4 sm:py-3 sm:rounded-lg sm:border sm:border-indigo-200 sm:dark:border-indigo-700">
                  → Why: See how everything comes together
                  before you publish.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2 text-center">
              Where your avatar lives
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 text-center">
              After setup, your mentor avatar can be published
              and connected to WhatsApp, Zoom, your website, or
              internal workflows from your dashboard.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-row gap-3 justify-center mb-8">
          <Button onClick={onBack} variant="outline" size="lg">
            ← Back to Intro
          </Button>
          <Button onClick={onStart} variant="primary" size="lg">
            Start Building →
          </Button>
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
        </div>
      </div>
    </div>
  );
}