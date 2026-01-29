import { useState } from 'react';
import { Code, Link as LinkIcon, Globe, Copy, Check, Facebook, Twitter, Linkedin, Sparkles, AlertCircle } from 'lucide-react';

interface IntegrationsProps {
  avatarId?: string;
}

export function Integrations({ avatarId }: IntegrationsProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Use real avatar ID or placeholder
  const displayId = avatarId || 'YOUR_AVATAR_ID';
  const hasRealId = !!avatarId;

  const embedCode = `<script src="https://coachavatar.anantata.ai/embed.js"></script>
<div id="coach-avatar" data-id="${displayId}"></div>`;

  const directLink = `https://coachavatar.anantata.ai/chat/${displayId}`;
  
  const apiKey = hasRealId ? `ca_${displayId.substring(0, 8)}...` : 'Буде згенеровано після публікації';

  const iframeCode = `<iframe 
  src="https://coachavatar.anantata.ai/embed/${displayId}" 
  width="100%" 
  height="600" 
  frameborder="0"
></iframe>`;

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(type);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl mb-2 text-gray-900 dark:text-white">Інтеграції</h1>
        <p className="text-gray-600 dark:text-gray-400">Вбудуйте вашого AI коуча та поділіться з аудиторією</p>
      </div>

      {/* Notice Banner - show only if no avatar ID */}
      {!hasRealId && (
        <div className="mb-6 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Примітка:</strong> Коди для інтеграції будуть згенеровані після створення вашого аватара.
            </p>
          </div>
        </div>
      )}

      {/* Success Banner - show when avatar ID exists */}
      {hasRealId && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 flex items-start gap-3">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-green-800 dark:text-green-200">
              <strong>Готово!</strong> Ваш Avatar ID: <code className="bg-green-100 dark:bg-green-800 px-2 py-0.5 rounded text-xs font-mono">{avatarId}</code>
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl space-y-6">
        {/* Direct Link & Social Sharing */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          {/* Direct Chat Link */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
              <LinkIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-2 text-gray-900 dark:text-white">Пряме посилання на чат</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Поділіться цим посиланням щоб будь-хто міг спілкуватися з вашим AI коучем
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={directLink}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-lg text-sm"
                />
                <button
                  onClick={() => handleCopy(directLink, 'link')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {copiedItem === 'link' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Скопійовано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Копіювати
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

          {/* Social Sharing */}
          <div>
            {/* Preview Card */}
            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex-shrink-0"></div>
                <div>
                  <h4 className="mb-1 text-gray-900 dark:text-white">Спілкуйтесь з моїм AI Коучем</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                    Отримайте персоналізовані коучингові поради 24/7 від мого AI аватара
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">coachavatar.anantata.ai</p>
                </div>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                <Twitter className="w-4 h-4" />
                Поділитись в X
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                <Linkedin className="w-4 h-4" />
                Поділитись в LinkedIn
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Facebook className="w-4 h-4" />
                Поділитись в Facebook
              </button>
            </div>
          </div>
        </div>

        {/* Popular Integrations - Messengers & Platforms */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Популярні інтеграції</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Підключіть вашого аватара до месенджерів та платформ
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 rounded-xl transition-all text-center group">
              <div className="mb-3 text-4xl">💬</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">Telegram</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Скоро</p>
            </button>
            <button className="p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 rounded-xl transition-all text-center group">
              <div className="mb-3 text-4xl">📱</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">WhatsApp</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Скоро</p>
            </button>
            <button className="p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 rounded-xl transition-all text-center group">
              <div className="mb-3 text-4xl">💼</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">Slack</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Скоро</p>
            </button>
            <button className="p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 rounded-xl transition-all text-center group">
              <div className="mb-3 text-4xl">📝</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">Notion</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Скоро</p>
            </button>
            <button className="p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 rounded-xl transition-all text-center group">
              <div className="mb-3 text-4xl">🎨</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">Webflow</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Скоро</p>
            </button>
            <button className="p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-500 rounded-xl transition-all text-center group">
              <div className="mb-3 text-4xl">⚡</div>
              <p className="text-gray-700 dark:text-gray-300 font-medium group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">Framer</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Скоро</p>
            </button>
          </div>
        </div>

        {/* Website Embed - Widget + Customization */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Chat Widget Section */}
          <div className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                <Code className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg mb-2 text-gray-900 dark:text-white">Чат-віджет (Рекомендовано)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Додайте плаваючий чат-віджет на будь-яку сторінку вашого сайту
                </p>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-3 overflow-x-auto">
                  <pre className="text-xs">{embedCode}</pre>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => handleCopy(embedCode, 'widget')}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedItem === 'widget' ? (
                      <>
                        <Check className="w-4 h-4" />
                        Скопійовано!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Копіювати код
                      </>
                    )}
                  </button>
                  <button className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    Документація
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Customization Section */}
          <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Налаштування віджета</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Налаштуйте зовнішній вигляд та поведінку чат-віджета
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Позиція віджета</label>
                <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm">
                  <option>Справа знизу</option>
                  <option>Зліва знизу</option>
                  <option>Справа зверху</option>
                  <option>Зліва зверху</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Основний колір</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    defaultValue="#16a34a"
                    className="w-12 h-10 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    defaultValue="#16a34a"
                    className="flex-1 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Привітання</label>
                <input
                  type="text"
                  defaultValue="Привіт! Чим можу допомогти?"
                  className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm"
                />
              </div>
              <div>
                <label className="block text-sm mb-2 text-gray-700 dark:text-gray-300">Розмір віджета</label>
                <select className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white rounded-lg text-sm">
                  <option>Малий</option>
                  <option>Середній</option>
                  <option>Великий</option>
                </select>
              </div>
            </div>
            <button className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Зберегти налаштування
            </button>
          </div>
        </div>

        {/* iFrame Embed */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-2 text-gray-900 dark:text-white">iFrame вбудовування</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Вбудуйте повний чат-інтерфейс як iframe на вашу сторінку
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-3 overflow-x-auto">
                <pre className="text-xs">{iframeCode}</pre>
              </div>
              <button
                onClick={() => handleCopy(iframeCode, 'iframe')}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                {copiedItem === 'iframe' ? (
                  <>
                    <Check className="w-4 h-4" />
                    Скопійовано!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Копіювати iFrame код
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* API Key */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg mb-2 text-gray-900 dark:text-white">API ключ</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Використовуйте цей ключ для інтеграції аватара через API
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={apiKey}
                  readOnly
                  className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400 rounded-lg text-sm font-mono"
                />
                <button
                  onClick={() => hasRealId && handleCopy(apiKey, 'api')}
                  disabled={!hasRealId}
                  className={`px-6 py-2 rounded-lg flex items-center justify-center gap-2 whitespace-nowrap ${hasRealId ? 'bg-green-600 text-white hover:bg-green-700 transition-colors' : 'bg-gray-400 text-white cursor-not-allowed'}`}
                >
                  {copiedItem === 'api' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Скопійовано!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Копіювати
                    </>
                  )}
                </button>
              </div>
              <div className="mt-3 flex items-start gap-2 text-sm text-amber-600 dark:text-amber-400">
                <span className="flex-shrink-0">⚠️</span>
                <span>Зберігайте цей ключ в безпеці. Не публікуйте його.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
