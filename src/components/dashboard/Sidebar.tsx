import {
  Home,
  MessageSquare,
  GraduationCap,
  Upload,
  BookOpen,
  Share2,
  Settings as SettingsIcon,
  Sparkles,
  LogOut,
} from 'lucide-react';
import { DashboardView } from '../Dashboard';
import { Avatar } from '../../lib/supabase';

interface SidebarProps {
  currentView: DashboardView;
  onNavigate: (view: DashboardView) => void;
  onSignOut?: () => void;
  avatar?: Avatar | null;
  userEmail?: string | null;
}

export function Sidebar({ currentView, onNavigate, onSignOut, avatar, userEmail }: SidebarProps) {
  const menuItems = [
    { id: 'home' as DashboardView, label: 'Dashboard', icon: Home },
    { id: 'chat' as DashboardView, label: 'AI Chat', icon: MessageSquare },
    { id: 'training' as DashboardView, label: 'Training', icon: GraduationCap },
    { id: 'content' as DashboardView, label: 'Content Upload', icon: Upload },
    { id: 'knowledge' as DashboardView, label: 'Knowledge Base', icon: BookOpen },
    { id: 'integrations' as DashboardView, label: 'Integrations', icon: Share2 },
    { id: 'settings' as DashboardView, label: 'Account', icon: SettingsIcon },
  ];

  // Get initials from avatar name or email
  const getInitials = () => {
    if (avatar?.avatar_name) {
      return avatar.avatar_name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (userEmail) {
      return userEmail[0].toUpperCase();
    }
    return 'U';
  };

  // Get display name
  const getDisplayName = () => {
    if (avatar?.avatar_name) {
      return avatar.avatar_name;
    }
    if (userEmail) {
      return userEmail.split('@')[0];
    }
    return 'User';
  };

  // Get subtitle (headline or email)
  const getSubtitle = () => {
    if (avatar?.professional_headline) {
      // Truncate long headlines
      const headline = avatar.professional_headline;
      return headline.length > 25 ? headline.slice(0, 25) + '...' : headline;
    }
    return userEmail || 'Coach';
  };

  return (
    <div className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg text-gray-900 dark:text-white">Anantata Avatar</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">AI Coach Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left
                    ${
                      isActive
                        ? 'bg-green-600 text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile & Sign Out */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {/* User Profile Button */}
        <button
          onClick={() => onNavigate('settings')}
          className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
        >
          {/* Avatar Photo or Initials */}
          {avatar?.avatar_photo_url ? (
            <img
              src={avatar.avatar_photo_url}
              alt={avatar.avatar_name || 'Avatar'}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">{getInitials()}</span>
            </div>
          )}
          
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {getDisplayName()}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {getSubtitle()}
            </p>
          </div>
        </button>

        {/* Sign Out Button */}
        {onSignOut && (
          <button
            onClick={onSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 mt-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm font-medium">Sign Out</span>
          </button>
        )}
      </div>
    </div>
  );
}
