import React from "react";
import { HashRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StepIndicator } from "./components/ui/ProgressBar";
import { StepNavigator } from "./components/StepNavigator";
import { Dashboard } from "./components/Dashboard";
import { Step0Welcome } from "./components/onboarding/Step0Welcome";
import { Step0Preview } from "./components/onboarding/Step0Preview";
import { Step1PersonalInfo } from "./components/onboarding/Step1PersonalInfo";
import { Step3UploadSources } from "./components/onboarding/Step3UploadSources";
import { Step4ToneCalibration } from "./components/onboarding/Step4ToneCalibration";
import { Step4CoachingApproach } from "./components/onboarding/Step4CoachingApproach";
import { Step5HowYouWork } from "./components/onboarding/Step5HowYouWork";
import { Step6Boundaries } from "./components/onboarding/Step6Boundaries";
import { Step7SummaryReview } from "./components/onboarding/Step7SummaryReview";
import { FlowchartDiagram } from "./components/FlowchartDiagram";
import { AuthProvider, useAuth } from "./lib/AuthContext";
import { AuthPage } from "./components/auth/AuthPage";
import { useAvatar } from "./lib/useAvatar";

// Map step numbers to route paths
const stepRoutes = [
  "/",           // 0 - Welcome
  "/preview",    // 1 - Preview
  "/step/1",     // 2 - Personal Info
  "/step/2",     // 3 - Tone
  "/step/3",     // 4 - Coaching Approach
  "/step/4",     // 5 - How You Work
  "/step/5",     // 6 - Boundaries
  "/step/6",     // 7 - Upload Sources
  "/step/7",     // 8 - Summary Review
];

// Map routes to step numbers
const routeToStep: { [key: string]: number } = {
  "/": 0,
  "/preview": 1,
  "/step/1": 2,
  "/step/2": 3,
  "/step/3": 4,
  "/step/4": 5,
  "/step/5": 6,
  "/step/6": 7,
  "/step/7": 8,
  "/dashboard": -1, // Special case for dashboard
};

function AppContent() {
  const { user, loading: authLoading, signOut } = useAuth();
  const { avatar, loading: avatarLoading, createAvatar, updateAvatar } = useAvatar();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [showFlowchart, setShowFlowchart] = React.useState(false);
  const [showNavigator, setShowNavigator] = React.useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(true);
  const [onboardingData, setOnboardingData] = React.useState<any>({});
  const [dashboardInitialView, setDashboardInitialView] = React.useState<"home" | "integrations">("home");
  const [savingStatus, setSavingStatus] = React.useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [initialCheckDone, setInitialCheckDone] = React.useState(false);

  // Get current step from URL
  const currentPath = location.pathname;
  const currentStep = routeToStep[currentPath] ?? 0;
  const showDashboard = currentPath.startsWith("/dashboard");

  // Check if user has completed avatar - if so, go to Dashboard automatically
  React.useEffect(() => {
    if (!avatarLoading && avatar && !initialCheckDone) {
      // User has avatar with name filled - they've completed onboarding before
      if (avatar.avatar_name && avatar.avatar_name.trim() !== '') {
        // Redirect to dashboard if NOT already on dashboard
        if (!currentPath.startsWith("/dashboard")) {
          navigate("/dashboard", { replace: true });
        }
      }
      setInitialCheckDone(true);
    } else if (!avatarLoading && !avatar && !initialCheckDone) {
      setInitialCheckDone(true);
    }
  }, [avatar, avatarLoading, initialCheckDone, currentPath, navigate]);

  // Create avatar on first login (only if doesn't exist)
  React.useEffect(() => {
    if (user && !avatarLoading && !avatar && initialCheckDone) {
      createAvatar();
    }
  }, [user, avatarLoading, avatar, initialCheckDone]);

  // Load avatar data into onboardingData when avatar is fetched
  React.useEffect(() => {
    if (avatar) {
      setOnboardingData({
        personalInfo: {
          avatarName: avatar.avatar_name || '',
          professionalHeadline: avatar.professional_headline || '',
          avatarPhotoUrl: avatar.avatar_photo_url || '',
          avatarPhoto1: avatar.avatar_photo_1 || null,
          avatarPhoto2: avatar.avatar_photo_2 || null,
          avatarPhoto3: avatar.avatar_photo_3 || null,
          generatedAvatar1: avatar.generated_avatar_1 || null,
          generatedAvatar2: avatar.generated_avatar_2 || null,
          generatedAvatar3: avatar.generated_avatar_3 || null,
          selectedAvatarUrl: avatar.selected_avatar_url || null,
          certificationStatus: avatar.certification_status || '',
          affiliations: avatar.professional_affiliation || [],
          socialLinkedin: avatar.social_linkedin || '',
          socialInstagram: avatar.social_instagram || '',
          socialWebsite: avatar.social_website || '',
          socialOther: avatar.social_other || '',
        },
        tone: {
          warmth: avatar.tone_warmth ?? 50,
          formality: avatar.tone_formality ?? 50,
          playfulness: avatar.tone_playfulness ?? 50,
          empathy: avatar.tone_empathy ?? 50,
          communicationStyle: avatar.communication_style || '',
        },
        coachingApproach: {
          approach: avatar.coaching_approach || '',
        },
        howYouWork: {
          conversationFlow: avatar.conversation_flow || '',
          keyMoments: avatar.key_moments || '',
        },
        boundaries: {
          topicsAllowed: avatar.topics_allowed || [],
          topicsBlocked: avatar.topics_blocked || [],
          crisisResponse: avatar.crisis_response || '',
          outOfScopeResponse: avatar.out_of_scope_response || '',
        },
      });
    }
  }, [avatar]);

  React.useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    };
    updateTheme(darkModeMediaQuery);
    darkModeMediaQuery.addEventListener("change", updateTheme);
    return () => darkModeMediaQuery.removeEventListener("change", updateTheme);
  }, []);

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPath]);

  // Show loading spinner while checking auth
  if (authLoading || (user && avatarLoading) || (user && !initialCheckDone)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Завантаження...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not logged in
  if (!user) {
    return <AuthPage />;
  }

  // Check if user has avatar data (for showing "Go to Dashboard" on welcome screen)
  const hasAvatarData = avatar?.avatar_name && avatar.avatar_name.trim() !== '';

  // Save data to Supabase
  const saveToSupabase = async (stepKey: string, stepData: any) => {
    if (!avatar) return;

    setSavingStatus('saving');

    let updateData: any = {};

    switch (stepKey) {
      case 'personalInfo':
        updateData = {
          avatar_name: stepData.avatarName,
          professional_headline: stepData.professionalHeadline,
          avatar_photo_url: stepData.avatarPhotoUrl || stepData.selectedAvatarUrl || stepData.avatarPhoto1,
          avatar_photo_1: stepData.avatarPhoto1,
          avatar_photo_2: stepData.avatarPhoto2,
          avatar_photo_3: stepData.avatarPhoto3,
          generated_avatar_1: stepData.generatedAvatar1,
          generated_avatar_2: stepData.generatedAvatar2,
          generated_avatar_3: stepData.generatedAvatar3,
          selected_avatar_url: stepData.selectedAvatarUrl,
          certification_status: stepData.certificationStatus,
          professional_affiliation: stepData.affiliations,
          social_linkedin: stepData.socialLinkedin,
          social_instagram: stepData.socialInstagram,
          social_website: stepData.socialWebsite,
          social_other: stepData.socialOther,
        };
        break;
      case 'tone':
        updateData = {
          tone_warmth: stepData.warmth,
          tone_formality: stepData.formality,
          tone_playfulness: stepData.playfulness,
          tone_empathy: stepData.empathy,
          communication_style: stepData.communicationStyle,
        };
        break;
      case 'coachingApproach':
        updateData = {
          coaching_approach: stepData.approach,
        };
        break;
      case 'howYouWork':
        updateData = {
          conversation_flow: stepData.conversationFlow,
          key_moments: stepData.keyMoments,
        };
        break;
      case 'boundaries':
        updateData = {
          topics_allowed: stepData.topicsAllowed,
          topics_blocked: stepData.topicsBlocked,
          crisis_response: stepData.crisisResponse,
          out_of_scope_response: stepData.outOfScopeResponse,
        };
        break;
    }

    const success = await updateAvatar(updateData);
    setSavingStatus(success ? 'saved' : 'error');

    // Reset status after 2 seconds
    setTimeout(() => setSavingStatus('idle'), 2000);
  };

  const getStepKey = (step: number): string => {
    const keys = [
      "welcome",
      "preview",
      "personalInfo",
      "tone",
      "coachingApproach",
      "howYouWork",
      "boundaries",
      "sources",
      "review",
    ];
    return keys[step] || "unknown";
  };

  // Auto-save handler (doesn't navigate, just saves)
  const handleAutoSave = async (stepKey: string, stepData: any) => {
    // Update local state
    setOnboardingData((prev: any) => ({
      ...prev,
      [stepKey]: stepData,
    }));

    // Save to Supabase
    await saveToSupabase(stepKey, stepData);
  };

  const handleNext = async (stepData?: any) => {
    if (stepData) {
      const stepKey = getStepKey(currentStep);
      
      // Update local state
      setOnboardingData((prev: any) => ({
        ...prev,
        [stepKey]: stepData,
      }));

      // Save to Supabase
      await saveToSupabase(stepKey, stepData);
    }
    
    // Navigate to next step
    const nextStep = currentStep + 1;
    if (nextStep < stepRoutes.length) {
      navigate(stepRoutes[nextStep]);
    }
  };

  // FIXED: handleBack now also saves data
  const handleBack = async (stepData?: any) => {
    if (stepData) {
      const stepKey = getStepKey(currentStep);
      
      // Update local state
      setOnboardingData((prev: any) => ({
        ...prev,
        [stepKey]: stepData,
      }));

      // Save to Supabase
      await saveToSupabase(stepKey, stepData);
    }
    
    // Navigate to previous step
    if (currentStep > 0) {
      navigate(stepRoutes[currentStep - 1]);
    }
  };

  const handleEdit = (step: number) => {
    navigate(stepRoutes[step + 1]);
  };

  const handleNavigateToStep = (step: number) => {
    if (step >= 0 && step < stepRoutes.length) {
      navigate(stepRoutes[step]);
    }
  };

  const goToDashboard = (view: "home" | "integrations" = "home") => {
    setDashboardInitialView(view);
    navigate("/dashboard");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step0Welcome
            onStart={() => navigate("/preview")}
            onSeeExample={() => goToDashboard()}
            onSkipToDashboard={() => goToDashboard()}
            hasAvatar={hasAvatarData}
          />
        );
      case 1:
        return (
          <Step0Preview
            onStart={() => navigate("/step/1")}
            onBack={() => navigate("/")}
          />
        );
      case 2:
        return (
          <Step1PersonalInfo
            onNext={handleNext}
            onBack={handleBack}
            onAutoSave={(data) => handleAutoSave('personalInfo', data)}
            initialData={onboardingData.personalInfo}
          />
        );
      case 3:
        return (
          <Step4ToneCalibration
            onNext={handleNext}
            onBack={handleBack}
            onAutoSave={(data) => handleAutoSave('tone', data)}
            initialData={onboardingData.tone}
          />
        );
      case 4:
        return (
          <Step4CoachingApproach
            onNext={handleNext}
            onBack={handleBack}
            onAutoSave={(data) => handleAutoSave('coachingApproach', data)}
            initialData={onboardingData.coachingApproach}
          />
        );
      case 5:
        return (
          <Step5HowYouWork
            onNext={handleNext}
            onBack={handleBack}
            onAutoSave={(data) => handleAutoSave('howYouWork', data)}
            initialData={onboardingData.howYouWork}
            certificationStatus={
              onboardingData.personalInfo?.certificationStatus
            }
            affiliations={
              onboardingData.personalInfo?.affiliations
            }
          />
        );
      case 6:
        return (
          <Step6Boundaries
            onNext={handleNext}
            onBack={handleBack}
            onAutoSave={(data) => handleAutoSave('boundaries', data)}
            initialData={onboardingData.boundaries}
            certificationStatus={
              onboardingData.personalInfo?.certificationStatus
            }
            affiliations={
              onboardingData.personalInfo?.affiliations
            }
          />
        );
      case 7:
        return (
          <Step3UploadSources
            onNext={handleNext}
            onBack={handleBack}
            initialData={onboardingData.sources}
            avatarId={avatar?.id}
          />
        );
      case 8:
        return (
          <Step7SummaryReview
            onNext={handleNext}
            onBack={handleBack}
            onEdit={(step) => {
              handleEdit(step);
              setShowNavigator(true);
            }}
            onGoToDashboard={() => goToDashboard("integrations")}
            data={onboardingData}
          />
        );
      default:
        return (
          <Step0Welcome
            onStart={() => navigate("/preview")}
            onSeeExample={() => goToDashboard()}
            hasAvatar={hasAvatarData}
          />
        );
    }
  };

  if (showFlowchart) {
    return (
      <div>
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => setShowFlowchart(false)}
              className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300"
            >
              ← Back to Onboarding
            </button>
          </div>
        </div>
        <div className="pt-20">
          <FlowchartDiagram />
        </div>
      </div>
    );
  }

  if (showDashboard) {
    return <Dashboard initialView={dashboardInitialView} onSignOut={signOut} userEmail={user.email} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* User Info Bar */}
      <div className="fixed top-0 right-0 z-50 p-4">
        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 rounded-lg shadow-md px-4 py-2">
          {/* Saving Status Indicator */}
          {savingStatus === 'saving' && (
            <span className="text-xs text-blue-600 flex items-center gap-1">
              <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Saving...
            </span>
          )}
          {savingStatus === 'saved' && (
            <span className="text-xs text-green-600">✓ Saved</span>
          )}
          {savingStatus === 'error' && (
            <span className="text-xs text-red-600">Error saving</span>
          )}
          
          <span className="text-sm text-gray-600 dark:text-gray-300">{user.email}</span>
          <button
            onClick={signOut}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Fixed Header with Progress */}
      {currentStep > 1 && currentStep < 9 && (
        <div className="fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-2">
            <StepIndicator
              currentStep={currentStep - 1}
              totalSteps={7}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={currentStep > 1 && currentStep < 9 ? "pt-20" : ""}>
        {showNavigator && currentStep >= 2 && currentStep <= 8 ? (
          <div className="min-h-screen bg-slate-50 dark:bg-slate-900 relative">
            {/* Collapsible Sidebar */}
            <div
              className={`
                fixed left-0 top-20 bottom-0 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 
                transition-all duration-300 ease-in-out z-40
                ${sidebarCollapsed ? "w-0" : "w-80"}
              `}
            >
              <div
                className={`p-6 ${sidebarCollapsed ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
              >
                <StepNavigator
                  currentStep={currentStep}
                  onNavigate={handleNavigateToStep}
                  onboardingData={onboardingData}
                />
              </div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="fixed left-0 top-1/2 -translate-y-1/2 z-50 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-r-lg p-2 shadow-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300"
              style={{ left: sidebarCollapsed ? "0" : "320px" }}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <ChevronLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </button>

            {/* Main Content Area */}
            <div
              className={`
                transition-all duration-300 ease-in-out py-12 px-6
                ${sidebarCollapsed ? "ml-0" : "ml-80"}
              `}
            >
              <div className="max-w-4xl mx-auto">
                {renderStep()}
              </div>
            </div>
          </div>
        ) : (
          renderStep()
        )}
      </div>

      {/* Footer */}
      {currentStep > 0 && currentStep < 9 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 py-3 px-6">
          <div className="max-w-5xl mx-auto text-center text-slate-500 dark:text-slate-400">
            Need help? Check our{" "}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">
              documentation
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<AppContent />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
