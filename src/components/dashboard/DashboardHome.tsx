import {
  MessageSquare,
  TrendingUp,
  Users,
  Clock,
  ArrowRight,
  Video,
  FileText,
  CheckCircle,
} from 'lucide-react';
import { DashboardView } from '../Dashboard';
import { Avatar } from '../../lib/supabase';

interface DashboardHomeProps {
  onNavigate: (view: DashboardView) => void;
  avatar?: Avatar | null;
}

export function DashboardHome({ onNavigate, avatar }: DashboardHomeProps) {
  // Get display name for greeting
  const displayName = avatar?.avatar_name || 'Coach';

  const stats = [
    { label: 'Всього розмов', value: '0', icon: MessageSquare, change: 'Новий' },
    { label: 'Активні користувачі', value: '0', icon: Users, change: 'Новий' },
    { label: 'Сер. тривалість сесії', value: '—', icon: Clock, change: '—' },
    { label: 'Рейтинг задоволеності', value: '—', icon: TrendingUp, change: '—' },
  ];

  const quickActions = [
    {
      title: 'Завантажити контент',
      description: 'Додайте відео або документи для покращення аватара',
      icon: Video,
      action: () => onNavigate('content'),
      color: 'blue',
    },
    {
      title: 'Додати Q&A тренування',
      description: 'Тренуйте аватар новими питаннями',
      icon: FileText,
      action: () => onNavigate('training'),
      color: 'purple',
    },
    {
      title: 'Тестувати аватар',
      description: 'Поспілкуйтесь з AI коучем для перевірки',
      icon: MessageSquare,
      action: () => onNavigate('chat'),
      color: 'green',
    },
  ];

  // Calculate completion status
  const completionStatus = {
    basicInfo: !!(avatar?.avatar_name && avatar?.professional_headline),
    toneSettings: !!(avatar?.tone_warmth !== 50 || avatar?.communication_style),
    boundaries: !!(avatar?.topics_allowed?.length || avatar?.topics_blocked?.length),
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl mb-2 text-gray-900 dark:text-white">
          Вітаємо, {displayName}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ось що відбувається з вашим AI коучем сьогодні
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">{stat.change}</span>
              </div>
              <p className="text-2xl lg:text-3xl mb-1 text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl text-gray-900 dark:text-white">Швидкі дії</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 text-left hover:shadow-lg transition-all hover:border-green-500 group"
                >
                  <div
                    className={`w-12 h-12 bg-${action.color}-600/20 rounded-lg flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 text-${action.color}-400`} />
                  </div>
                  <h3 className="mb-2 text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400">{action.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{action.description}</p>
                  <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                    Почати <ArrowRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Avatar Setup Status */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-700/50 p-6">
            <h3 className="mb-4 text-gray-900 dark:text-white">Статус налаштування аватара</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 ${completionStatus.basicInfo ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Базова інформація</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {completionStatus.basicInfo ? '✓ Завершено' : 'Не завершено'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 ${completionStatus.toneSettings ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Налаштування тону</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {completionStatus.toneSettings ? '✓ Завершено' : 'Не завершено'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CheckCircle className={`w-5 h-5 ${completionStatus.boundaries ? 'text-green-600 dark:text-green-400' : 'text-gray-400'}`} />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Межі та обмеження</span>
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {completionStatus.boundaries ? '✓ Завершено' : 'Не завершено'}
                </span>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-400">Прогрес</span>
                <span className="text-gray-900 dark:text-white">{avatar?.completion_percentage || 0}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${avatar?.completion_percentage || 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Preview Card */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl text-gray-900 dark:text-white">Ваш аватар</h2>
            <button
              onClick={() => onNavigate('settings')}
              className="text-sm text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
            >
              Редагувати
            </button>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            {/* Avatar Photo */}
            <div className="text-center mb-4">
              {avatar?.avatar_photo_url ? (
                <img 
                  src={avatar.avatar_photo_url} 
                  alt={avatar.avatar_name || 'Avatar'}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-3"
                />
              ) : (
                <div className="w-24 h-24 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl font-bold text-white">
                    {avatar?.avatar_name?.[0]?.toUpperCase() || 'A'}
                  </span>
                </div>
              )}
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                {avatar?.avatar_name || 'Ваш аватар'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {avatar?.professional_headline || 'AI Coaching Assistant'}
              </p>
            </div>

            {/* Quick stats */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Статус</span>
                <span className={`${avatar?.is_published ? 'text-green-600' : 'text-yellow-600'}`}>
                  {avatar?.is_published ? 'Опубліковано' : 'Чернетка'}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Сертифікація</span>
                <span className="text-gray-900 dark:text-white">
                  {avatar?.certification_status === 'certified' ? 'Сертифікований' : 
                   avatar?.certification_status === 'in-process' ? 'В процесі' : 'Не сертифікований'}
                </span>
              </div>
            </div>

            {/* Test button */}
            <button
              onClick={() => onNavigate('chat')}
              className="w-full mt-4 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              Тестувати чат
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
