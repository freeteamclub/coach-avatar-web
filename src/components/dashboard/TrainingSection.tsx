import { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Search, Check, Loader2, FolderOpen } from 'lucide-react';
import { ToneSliderGroup } from '../ui/ToneSlider';
import { Avatar } from '../../lib/supabase';

interface TypicalFlow {
  id: string;
  title: string;
  description: string;
  content: string;
}

interface TrainingSectionProps {
  avatar: Avatar | null;
  updateAvatar: (data: Partial<Avatar>) => Promise<boolean>;
}

export function TrainingSection({ avatar, updateAvatar }: TrainingSectionProps) {
  const [activeTab, setActiveTab] = useState<'approach' | 'how-you-work' | 'boundaries' | 'frameworks' | 'tone'>('approach');
  const [showAddModal, setShowAddModal] = useState(false);

  // Coaching Approach state - load from avatar
  const [coachingApproach, setCoachingApproach] = useState('');

  // How You Work state - load from avatar
  const [conversationFlow, setConversationFlow] = useState('');
  const [keyMoments, setKeyMoments] = useState('');

  // Typical Flows state
  const [typicalFlows, setTypicalFlows] = useState<TypicalFlow[]>([]);
  const [newFlowTitle, setNewFlowTitle] = useState('');
  const [newFlowDescription, setNewFlowDescription] = useState('');
  const [newFlowContent, setNewFlowContent] = useState('');

  // Auto-save state
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Boundaries state - load from avatar
  const [allowedTopics, setAllowedTopics] = useState<string[]>([]);
  const [blockedTopics, setBlockedTopics] = useState<string[]>([]);
  const [crisisText, setCrisisText] = useState('');
  const [outOfScopeResponse, setOutOfScopeResponse] = useState('');

  // Tone Calibration state - load from avatar
  const [warmth, setWarmth] = useState(50);
  const [formality, setFormality] = useState(50);
  const [playfulness, setPlayfulness] = useState(50);
  const [empathy, setEmpathy] = useState(50);
  const [communicationStyle, setCommunicationStyle] = useState('');

  // Frameworks
  const [frameworks, setFrameworks] = useState<{id: string; title: string; description: string; items: number}[]>([]);

  // Load data from avatar when it changes
  useEffect(() => {
    if (avatar) {
      setCoachingApproach(avatar.coaching_approach || '');
      setConversationFlow(avatar.conversation_flow || '');
      setKeyMoments(avatar.key_moments || '');
      setAllowedTopics(avatar.topics_allowed || []);
      setBlockedTopics(avatar.topics_blocked || []);
      setCrisisText(avatar.crisis_response || '');
      setOutOfScopeResponse(avatar.out_of_scope_response || '');
      setWarmth(avatar.tone_warmth || 50);
      setFormality(avatar.tone_formality || 50);
      setPlayfulness(avatar.tone_playfulness || 50);
      setEmpathy(avatar.tone_empathy || 50);
      setCommunicationStyle(avatar.communication_style || '');
    }
  }, [avatar]);

  // Auto-save function
  const autoSave = async (field: string, value: any) => {
    if (!avatar) return;
    
    setSaveStatus('saving');
    
    const success = await updateAvatar({ [field]: value });
    
    if (success) {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } else {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  // Debounced save for text fields
  const debouncedSave = (field: string, value: any) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    saveTimeoutRef.current = setTimeout(() => {
      autoSave(field, value);
    }, 1500);
  };

  // Handlers with auto-save
  const handleCoachingApproachChange = (value: string) => {
    setCoachingApproach(value);
    debouncedSave('coaching_approach', value);
  };

  const handleConversationFlowChange = (value: string) => {
    setConversationFlow(value);
    debouncedSave('conversation_flow', value);
  };

  const handleKeyMomentsChange = (value: string) => {
    setKeyMoments(value);
    debouncedSave('key_moments', value);
  };

  const handleCrisisTextChange = (value: string) => {
    setCrisisText(value);
    debouncedSave('crisis_response', value);
  };

  const handleOutOfScopeChange = (value: string) => {
    setOutOfScopeResponse(value);
    debouncedSave('out_of_scope_response', value);
  };

  const handleCommunicationStyleChange = (value: string) => {
    setCommunicationStyle(value);
    debouncedSave('communication_style', value);
  };

  // Topic handlers with immediate save
  const addAllowedTopic = (topic: string) => {
    const newTopics = [...allowedTopics, topic];
    setAllowedTopics(newTopics);
    autoSave('topics_allowed', newTopics);
  };

  const removeAllowedTopic = (topic: string) => {
    const newTopics = allowedTopics.filter(t => t !== topic);
    setAllowedTopics(newTopics);
    autoSave('topics_allowed', newTopics);
  };

  const addBlockedTopic = (topic: string) => {
    const newTopics = [...blockedTopics, topic];
    setBlockedTopics(newTopics);
    autoSave('topics_blocked', newTopics);
  };

  const removeBlockedTopic = (topic: string) => {
    const newTopics = blockedTopics.filter(t => t !== topic);
    setBlockedTopics(newTopics);
    autoSave('topics_blocked', newTopics);
  };

  // Tone slider handlers
  const handleToneChange = (field: string, value: number, setter: (v: number) => void) => {
    setter(value);
    debouncedSave(field, value);
  };

  const renderFrameworks = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-gray-900 dark:text-white">Ваші фреймворки</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Plus className="w-4 h-4" />
          Додати фреймворк
        </button>
      </div>

      {frameworks.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
          <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Ще немає фреймворків
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Додайте коучингові фреймворки, які використовуєте у роботі
          </p>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="w-4 h-4" />
            Додати перший фреймворк
          </button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {frameworks.map((framework) => (
            <div
              key={framework.id}
              className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <h3 className="mb-2 text-gray-900 dark:text-white">{framework.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{framework.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">{framework.items} елементів</span>
                <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300">Переглянути →</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderTone = () => {
    const toneSliders = [
      {
        leftLabel: 'Теплий та дружній',
        rightLabel: 'Прямий та лаконічний',
        value: warmth,
        onChange: (v: number) => handleToneChange('tone_warmth', v, setWarmth),
      },
      {
        leftLabel: 'Неформальний',
        rightLabel: 'Формальний',
        value: formality,
        onChange: (v: number) => handleToneChange('tone_formality', v, setFormality),
      },
      {
        leftLabel: 'Грайливий',
        rightLabel: 'Серйозний',
        value: playfulness,
        onChange: (v: number) => handleToneChange('tone_playfulness', v, setPlayfulness),
      },
      {
        leftLabel: 'Емпатичний',
        rightLabel: 'Аналітичний',
        value: empathy,
        onChange: (v: number) => handleToneChange('tone_empathy', v, setEmpathy),
      },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg mb-2 text-gray-900 dark:text-white">Калібрування тону</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Налаштуйте як ваш аватар спілкується з користувачами
          </p>
        </div>

        {/* Communication Style Text Field */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Ваш стиль комунікації{' '}
              <span className="text-green-600 dark:text-green-400 text-sm">(рекомендовано)</span>
            </label>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Опишіть ваш тон своїми словами.
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">
              Приклади:<br />
              • "Спокійний, підтримуючий, рефлексивний — рідко даю прямі поради"<br />
              • "Теплий але структурований, ставлю чіткі запитання"<br />
              • "Емпатичний та допитливий, довіряю процесу клієнта"
            </p>
          </div>
          
          <textarea
            value={communicationStyle}
            onChange={(e) => handleCommunicationStyleChange(e.target.value)}
            placeholder="Опишіть ваш стиль комунікації тут..."
            rows={6}
            maxLength={500}
            className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none text-gray-900 dark:text-white"
          />
          
          <div className="flex justify-between items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span>Опишіть як ви звучите та взаємодієте</span>
            <span>{communicationStyle.length} / 500 символів</span>
          </div>
        </div>

        {/* Sliders */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h4 className="text-gray-900 dark:text-white mb-6">
            Налаштування слайдерами{' '}
            <span className="text-slate-500 dark:text-slate-400 text-sm">(опціонально)</span>
          </h4>
          <ToneSliderGroup sliders={toneSliders} />
        </div>

        {/* Save Status */}
        <div className="flex items-center gap-2">
          {saveStatus === 'saving' && (
            <span className="text-sm text-blue-600 flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Збереження...
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-sm text-green-600 flex items-center gap-2">
              <Check className="w-4 h-4" />
              Збережено!
            </span>
          )}
          {saveStatus === 'error' && (
            <span className="text-sm text-red-600">Помилка збереження</span>
          )}
        </div>
      </div>
    );
  };

  // Save Status Indicator Component
  const SaveStatusIndicator = () => (
    <div className="h-6">
      {saveStatus === 'saving' && (
        <span className="text-sm text-blue-600 flex items-center gap-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Збереження...
        </span>
      )}
      {saveStatus === 'saved' && (
        <span className="text-sm text-green-600 flex items-center gap-2">
          <Check className="w-4 h-4" />
          Збережено!
        </span>
      )}
      {saveStatus === 'error' && (
        <span className="text-sm text-red-600">Помилка збереження</span>
      )}
    </div>
  );

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl mb-2 text-gray-900 dark:text-white">Тренування</h1>
        <p className="text-gray-600 dark:text-gray-400">Налаштуйте знання та поведінку вашого AI коуча</p>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          <button
            onClick={() => setActiveTab('approach')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'approach'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Підхід до коучингу
          </button>
          <button
            onClick={() => setActiveTab('how-you-work')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'how-you-work'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Як ви працюєте
          </button>
          <button
            onClick={() => setActiveTab('boundaries')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'boundaries'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Межі
          </button>
          <button
            onClick={() => setActiveTab('frameworks')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'frameworks'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Фреймворки
          </button>
          <button
            onClick={() => setActiveTab('tone')}
            className={`px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
              activeTab === 'tone'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Калібрування тону
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'approach' && (
          <div className="space-y-4">
            <div>
              <h3 className="text-lg mb-2 text-gray-900 dark:text-white">Ваш підхід та цінності коучингу</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Опишіть вашу унікальну філософію коучингу та що найважливіше у вашій роботі з клієнтами.
              </p>
            </div>
            <textarea
              value={coachingApproach}
              onChange={(e) => handleCoachingApproachChange(e.target.value)}
              placeholder="Наприклад: Я вірю що коучинг — це допомога клієнтам знаходити власні відповіді, а не давати поради. Мій підхід зосереджений на активному слуханні, потужних запитаннях та створенні безпечного простору для рефлексії..."
              rows={8}
              maxLength={1000}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>Поділіться вашими керівними принципами та стилем коучингу</span>
              <span>{coachingApproach.length} / 1000 символів</span>
            </div>
            <SaveStatusIndicator />
          </div>
        )}

        {activeTab === 'how-you-work' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg mb-2 text-gray-900 dark:text-white">Як ви ведете коучингову розмову?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Опишіть ваш типовий підхід — немає єдиної "правильної" структури.
              </p>
            </div>
            <textarea
              value={conversationFlow}
              onChange={(e) => handleConversationFlowChange(e.target.value)}
              placeholder="Наприклад: Зазвичай починаю з перевірки прогресу з моменту нашої останньої сесії, потім досліджую на чому клієнт хоче зосередитись сьогодні..."
              rows={6}
              maxLength={600}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Ваша типова структура розмови</span>
              <span>{conversationFlow.length} / 600 символів</span>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg mb-2 text-gray-900 dark:text-white">На які ключові моменти ви звертаєте увагу?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Опишіть сигнали, патерни або моменти, що направляють ваш коучинг.
              </p>
            </div>
            <textarea
              value={keyMoments}
              onChange={(e) => handleKeyMomentsChange(e.target.value)}
              placeholder="Наприклад: Звертаю особливу увагу на моменти, коли клієнти мають прориви або показують опір. Це часто сигнали глибших інсайтів..."
              rows={6}
              maxLength={600}
              className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>Ключові сигнали та патерни</span>
              <span>{keyMoments.length} / 600 символів</span>
            </div>

            {/* Typical Flows */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg mb-1 text-gray-900 dark:text-white">Типові підходи та сценарії</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Додайте приклади типових ситуацій та як ви їх вирішуєте
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Додати сценарій
                </button>
              </div>

              {typicalFlows.length === 0 ? (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
                  <p className="text-gray-500 dark:text-gray-400">
                    Ще немає доданих сценаріїв. Натисніть "Додати сценарій" щоб почати.
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {typicalFlows.map((flow) => (
                    <div key={flow.id} className="space-y-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg text-gray-900 dark:text-white">{flow.title}</h3>
                        <button
                          onClick={() => setTypicalFlows(typicalFlows.filter(f => f.id !== flow.id))}
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{flow.description}</p>
                      <textarea
                        value={flow.content}
                        onChange={(e) => {
                          const updated = typicalFlows.map((f) =>
                            f.id === flow.id ? { ...f, content: e.target.value } : f
                          );
                          setTypicalFlows(updated);
                        }}
                        rows={6}
                        maxLength={600}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                      />
                      <div className="flex justify-end text-sm text-gray-500">
                        <span>{flow.content.length} / 600 символів</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <SaveStatusIndicator />
          </div>
        )}

        {activeTab === 'boundaries' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Теми з якими ви працюєте</h3>
              {allowedTopics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {allowedTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
                    >
                      {topic}
                      <button 
                        onClick={() => removeAllowedTopic(topic)}
                        className="hover:text-green-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Додайте тему (напр. Кар'єрний розвиток)..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      addAllowedTopic(e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button 
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    if (input.value.trim()) {
                      addAllowedTopic(input.value.trim());
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Додати
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Теми з якими ви НЕ працюєте</h3>
              {blockedTopics.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {blockedTopics.map((topic, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                    >
                      {topic}
                      <button 
                        onClick={() => removeBlockedTopic(topic)}
                        className="hover:text-red-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Додайте тему (напр. Медичні поради)..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      addBlockedTopic(e.currentTarget.value.trim());
                      e.currentTarget.value = '';
                    }
                  }}
                />
                <button 
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                    if (input.value.trim()) {
                      addBlockedTopic(input.value.trim());
                      input.value = '';
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Додати
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg mb-2 text-gray-900 dark:text-white">Відповідь на кризову ситуацію</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Що має сказати ваш аватар коли хтось ділиться кризовою ситуацією?
              </p>
              <textarea
                value={crisisText}
                onChange={(e) => handleCrisisTextChange(e.target.value)}
                rows={4}
                placeholder="Наприклад: Якщо ви переживаєте кризу психічного здоров'я, будь ласка, зверніться до служби екстреної допомоги або на лінію довіри..."
                className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg mb-2 text-gray-900 dark:text-white">Відповідь на теми поза компетенцією</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Що має сказати ваш аватар на теми поза коучингом?
              </p>
              <textarea
                value={outOfScopeResponse}
                onChange={(e) => handleOutOfScopeChange(e.target.value)}
                rows={4}
                placeholder="Наприклад: Це здається питанням, яке потребує експертизи поза коучингом — юридичної, медичної або фінансової. Я можу допомогти дослідити як ви думаєте про це рішення..."
                className="w-full px-4 py-3 bg-white dark:bg-slate-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white"
              />
            </div>

            <SaveStatusIndicator />
          </div>
        )}
        
        {activeTab === 'frameworks' && renderFrameworks()}
        {activeTab === 'tone' && renderTone()}
      </div>

      {/* Add Flow Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl text-gray-900 dark:text-white">Додати типовий сценарій</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Опишіть типову ситуацію та як ви її вирішуєте
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Ситуація / Питання</label>
                <input
                  type="text"
                  value={newFlowTitle}
                  onChange={(e) => setNewFlowTitle(e.target.value)}
                  placeholder="Напр. Коли клієнт відчуває себе застряглим..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Короткий опис</label>
                <input
                  type="text"
                  value={newFlowDescription}
                  onChange={(e) => setNewFlowDescription(e.target.value)}
                  placeholder="Напр. Опишіть сигнали, патерни або моменти..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">Ваш підхід / Відповідь</label>
                <textarea
                  value={newFlowContent}
                  onChange={(e) => setNewFlowContent(e.target.value)}
                  rows={8}
                  maxLength={600}
                  placeholder="Опишіть як ви зазвичай вирішуєте цю ситуацію..."
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="flex justify-end text-xs text-gray-500 mt-1">
                  {newFlowContent.length} / 600 символів
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewFlowTitle('');
                  setNewFlowDescription('');
                  setNewFlowContent('');
                }}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                Скасувати
              </button>
              <button 
                onClick={() => {
                  if (newFlowTitle.trim() && newFlowContent.trim()) {
                    const newFlow: TypicalFlow = {
                      id: Date.now().toString(),
                      title: newFlowTitle,
                      description: newFlowDescription,
                      content: newFlowContent,
                    };
                    setTypicalFlows([...typicalFlows, newFlow]);
                    setShowAddModal(false);
                    setNewFlowTitle('');
                    setNewFlowDescription('');
                    setNewFlowContent('');
                  }
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!newFlowTitle.trim() || !newFlowContent.trim()}
              >
                Додати сценарій
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
