import React from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { ToneSliderGroup } from "../ui/ToneSlider";
import { Info, Plus, Trash2 } from "lucide-react";

interface Step4ToneCalibrationProps {
  onNext: (data: any) => void;
  onBack: (data?: any) => void;
  onAutoSave?: (data: any) => void;
  initialData?: any;
}

export function Step4ToneCalibration({
  onNext,
  onBack,
  onAutoSave,
  initialData,
}: Step4ToneCalibrationProps) {
  const [communicationStyle, setCommunicationStyle] =
    React.useState(initialData?.communicationStyle || "");
  const [warmth, setWarmth] = React.useState(
    initialData?.warmth || 50,
  );
  const [formality, setFormality] = React.useState(
    initialData?.formality || 50,
  );
  const [playfulness, setPlayfulness] = React.useState(
    initialData?.playfulness || 50,
  );
  const [empathy, setEmpathy] = React.useState(
    initialData?.empathy || 50,
  );

  // Greeting messages state
  const [mainGreeting, setMainGreeting] = React.useState(
    initialData?.mainGreeting || "Hello! It's good to connect with you. I'm here to help you explore your thoughts and find clarity. What would you like to focus on in our conversation today?"
  );
  const [greetingVariations, setGreetingVariations] = React.useState<string[]>(
    initialData?.greetingVariations || []
  );
  const [currentVariation, setCurrentVariation] = React.useState("");

  // Track if initial data has been loaded (for auto-save)
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Update state when initialData changes (e.g., after loading from Supabase)
  React.useEffect(() => {
    if (initialData) {
      setCommunicationStyle(initialData.communicationStyle || "");
      setWarmth(initialData.warmth ?? 50);
      setFormality(initialData.formality ?? 50);
      setPlayfulness(initialData.playfulness ?? 50);
      setEmpathy(initialData.empathy ?? 50);
      setMainGreeting(initialData.mainGreeting || "Hello! It's good to connect with you. I'm here to help you explore your thoughts and find clarity. What would you like to focus on in our conversation today?");
      setGreetingVariations(initialData.greetingVariations || []);
    }
  }, [initialData]);

  // Helper to get current form data
  const getCurrentData = () => ({
    communicationStyle,
    warmth,
    formality,
    playfulness,
    empathy,
    mainGreeting,
    greetingVariations,
  });

  // Auto-save with debounce (1 second delay)
  React.useEffect(() => {
    // Skip auto-save on initial load
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    if (!onAutoSave) return;

    const timeoutId = setTimeout(() => {
      onAutoSave(getCurrentData());
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [warmth, formality, playfulness, empathy, communicationStyle, mainGreeting, greetingVariations, onAutoSave, isInitialized]);

  const addGreetingVariation = () => {
    if (currentVariation.trim()) {
      setGreetingVariations([...greetingVariations, currentVariation.trim()]);
      setCurrentVariation("");
    }
  };

  const removeGreetingVariation = (index: number) => {
    setGreetingVariations(greetingVariations.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    onNext(getCurrentData());
  };

  // Save data when going back
  const handleBack = () => {
    onBack(getCurrentData());
  };

  const sliders = [
    {
      leftLabel: "Warm & Friendly",
      rightLabel: "Direct & Concise",
      value: warmth,
      onChange: setWarmth,
    },
    {
      leftLabel: "Casual",
      rightLabel: "Formal",
      value: formality,
      onChange: setFormality,
    },
    {
      leftLabel: "Playful",
      rightLabel: "Serious",
      value: playfulness,
      onChange: setPlayfulness,
    },
    {
      leftLabel: "Empathic",
      rightLabel: "Analytical",
      value: empathy,
      onChange: setEmpathy,
    },
  ];

  const characterCount = communicationStyle.length;
  const isWithinRange =
    characterCount >= 200 && characterCount <= 500;
  const isMinimumMet = characterCount >= 200;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
            <div>
              <h2 className="text-slate-900 dark:text-slate-100 mb-2">
                Tone of Voice & Interaction Style
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Describe how your mentor avatar should sound and
                interact with clients.
              </p>
            </div>
            <div className="sm:text-right sm:mt-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                Adjust these to refine how the avatar responds.
                <br />
                Changes are reflected in the preview below.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Fine-tune with sliders */}
          <Card>
            <h4 className="text-slate-900 dark:text-slate-100 mb-6">
              Fine-tune with sliders{" "}
              <span className="text-slate-500 dark:text-slate-400 text-sm">
                (optional)
              </span>
            </h4>
            <ToneSliderGroup sliders={sliders} />
          </Card>

          {/* Your communication style */}
          <Card>
            <div className="mb-4">
              <label className="block text-slate-700 dark:text-slate-300 mb-2">
                Your communication style{" "}
                <span className="text-indigo-600 dark:text-indigo-400 text-sm">
                  (recommended — this is your most important
                  input)
                </span>
              </label>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                Describe your tone in your own words.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 italic">
                Examples:
                <br />
                • "Calm, supportive, reflective — I rarely give
                direct advice"
                <br />
                • "Warm but structured, I ask clear questions"
                <br />• "Empathic and curious, I trust the
                client's process"
              </p>
            </div>

            <textarea
              value={communicationStyle}
              onChange={(e) =>
                setCommunicationStyle(e.target.value)
              }
              placeholder="Describe your communication style here..."
              rows={6}
              maxLength={500}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-sm ${
                  !isMinimumMet
                    ? "text-amber-600 dark:text-amber-400"
                    : isWithinRange
                      ? "text-green-600 dark:text-green-400"
                      : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {!isMinimumMet &&
                  "Recommended: at least 200 characters"}
                {isMinimumMet &&
                  isWithinRange &&
                  "✓ Good length"}
                {isMinimumMet &&
                  !isWithinRange &&
                  "You can add more detail"}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {characterCount} / 500 characters
              </span>
            </div>
          </Card>

          {/* Live preview */}
          <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950 dark:to-violet-950 border-indigo-200 dark:border-indigo-800">
            <h4 className="text-slate-900 dark:text-slate-100 mb-4">
              Custom Intro Message
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              This is how your avatar will greet clients in their first conversation.
            </p>

            <textarea
              value={mainGreeting}
              onChange={(e) => setMainGreeting(e.target.value)}
              placeholder="Enter the main greeting message here..."
              rows={4}
              maxLength={500}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />

            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Your avatar's first greeting to clients
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {mainGreeting.length} / 500 characters
              </span>
            </div>

            <div className="mt-6">
              <h5 className="text-slate-900 dark:text-slate-100 mb-2">
                Greeting Variations <span className="text-slate-500 dark:text-slate-400 text-sm">(optional)</span>
              </h5>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Add alternative greetings to add variety. Your avatar will randomly choose from these.
              </p>
              
              <div className="flex gap-2 mb-2">
                <textarea
                  value={currentVariation}
                  onChange={(e) => setCurrentVariation(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.shiftKey === false) {
                      e.preventDefault();
                      addGreetingVariation();
                    }
                  }}
                  placeholder="Enter an alternative greeting..."
                  rows={2}
                  maxLength={500}
                  className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border-2 border-indigo-200 dark:border-indigo-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                <button
                  type="button"
                  onClick={addGreetingVariation}
                  disabled={!currentVariation.trim()}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed self-start"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex justify-end mb-3">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {currentVariation.length} / 500 characters
                </span>
              </div>

              {greetingVariations.length > 0 && (
                <div className="space-y-2">
                  {greetingVariations.map((variation, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-700 rounded-lg"
                    >
                      <p className="flex-1 text-sm text-slate-700 dark:text-slate-300">
                        {variation}
                      </p>
                      <button
                        type="button"
                        onClick={() => removeGreetingVariation(index)}
                        className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-4 flex gap-2 items-start">
              <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-900 dark:text-indigo-100">
                <em>
                  Your avatar will use these greetings to start conversations, adapting to each unique context.
                </em>
              </p>
            </div>
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
