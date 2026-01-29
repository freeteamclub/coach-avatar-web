import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./dashboard/Sidebar";
import { DashboardHome } from "./dashboard/DashboardHome";
import { AIChatInterface } from "./dashboard/AIChatInterface";
import { TrainingSection } from "./dashboard/TrainingSection";
import { ContentUpload } from "./dashboard/ContentUpload";
import { KnowledgeBase } from "./dashboard/KnowledgeBase";
import { Integrations } from "./dashboard/Integrations";
import { Settings } from "./dashboard/Settings";
import { useAvatar } from "../lib/useAvatar";

export type DashboardView =
  | "home"
  | "chat"
  | "training"
  | "content"
  | "knowledge"
  | "integrations"
  | "settings";

// Map URL paths to views
const pathToView: { [key: string]: DashboardView } = {
  "/dashboard": "home",
  "/dashboard/home": "home",
  "/dashboard/chat": "chat",
  "/dashboard/training": "training",
  "/dashboard/content": "content",
  "/dashboard/knowledge": "knowledge",
  "/dashboard/integrations": "integrations",
  "/dashboard/settings": "settings",
};

// Map views to URL paths
const viewToPath: { [key in DashboardView]: string } = {
  home: "/dashboard",
  chat: "/dashboard/chat",
  training: "/dashboard/training",
  content: "/dashboard/content",
  knowledge: "/dashboard/knowledge",
  integrations: "/dashboard/integrations",
  settings: "/dashboard/settings",
};

interface DashboardProps {
  initialView?: DashboardView;
  onSignOut?: () => void;
  userEmail?: string | null;
}

export function Dashboard({
  initialView = "home",
  onSignOut,
  userEmail,
}: DashboardProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Get avatar data from Supabase
  const { avatar, loading: avatarLoading, updateAvatar } = useAvatar();

  // Determine current view from URL
  const currentView: DashboardView = pathToView[location.pathname] || initialView;

  // Navigate to a view (updates URL)
  const handleNavigate = (view: DashboardView) => {
    navigate(viewToPath[view]);
    setIsMobileMenuOpen(false);
  };

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <DashboardHome onNavigate={handleNavigate} avatar={avatar} />;
      case "chat":
        return <AIChatInterface avatar={avatar} />;
      case "training":
        return <TrainingSection avatar={avatar} updateAvatar={updateAvatar} />;
      case "content":
        return <ContentUpload avatarId={avatar?.id} />;
      case "knowledge":
        return <KnowledgeBase avatarId={avatar?.id} />;
      case "integrations":
        return <Integrations avatarId={avatar?.id} />;
      case "settings":
        return <Settings avatar={avatar} userEmail={userEmail} />;
      default:
        return <DashboardHome onNavigate={handleNavigate} avatar={avatar} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-900 dark:text-white" />
        ) : (
          <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed lg:static inset-y-0 left-0 z-40
        transform lg:transform-none transition-transform duration-300
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          onSignOut={onSignOut}
          avatar={avatar}
          userEmail={userEmail}
        />
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">{renderView()}</div>
    </div>
  );
}
