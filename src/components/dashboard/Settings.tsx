import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, CreditCard, Bell, Lock, Trash2, Save, Upload, X, AlertTriangle } from 'lucide-react';
import { Avatar } from '../../lib/supabase';
import { useAvatar } from '../../lib/useAvatar';
import { useStorage } from '../../lib/useStorage';

interface SettingsProps {
  avatar?: Avatar | null;
  userEmail?: string | null;
}

export function Settings({ avatar: initialAvatar, userEmail }: SettingsProps) {
  const navigate = useNavigate();
  const { avatar, updateAvatar, deleteAvatar } = useAvatar();
  const { uploadAvatar, deleteFile, uploading } = useStorage();
  
  const [activeTab, setActiveTab] = useState<'profile' | 'billing' | 'notifications' | 'account'>('profile');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Profile fields - initialize from avatar data
  const [avatarName, setAvatarName] = useState('');
  const [headline, setHeadline] = useState('');
  const [avatarPhotoUrl, setAvatarPhotoUrl] = useState<string | null>(null);
  const [certificationStatus, setCertificationStatus] = useState('not-certified');
  const [affiliations, setAffiliations] = useState<string[]>([]);
  const [otherAffiliation, setOtherAffiliation] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [instagram, setInstagram] = useState('');
  const [website, setWebsite] = useState('');
  const [otherProfile, setOtherProfile] = useState('');

  // Load avatar data into form
  useEffect(() => {
    if (avatar) {
      setAvatarName(avatar.avatar_name || '');
      setHeadline(avatar.professional_headline || '');
      setAvatarPhotoUrl(avatar.avatar_photo_url || null);
      setCertificationStatus(avatar.certification_status || 'not-certified');
      setAffiliations(avatar.professional_affiliation || []);
      setLinkedIn(avatar.social_linkedin || '');
      setInstagram(avatar.social_instagram || '');
      setWebsite(avatar.social_website || '');
      setOtherProfile(avatar.social_other || '');
    }
  }, [avatar]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await uploadAvatar(file);
    
    // FIXED: Check result.url instead of result directly
    if (result.url) {
      setAvatarPhotoUrl(result.url);
      // Save to database immediately
      await updateAvatar({ avatar_photo_url: result.url });
      setMessage({ type: 'success', text: 'Фото завантажено!' });
    } else if (result.error) {
      setMessage({ type: 'error', text: result.error });
    }
    
    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRemovePhoto = async () => {
    if (avatarPhotoUrl && avatar) {
      // Extract path from URL for deletion
      const urlParts = avatarPhotoUrl.split('/storage/v1/object/public/avatars/');
      if (urlParts[1]) {
        await deleteFile(urlParts[1]);
      }
      
      setAvatarPhotoUrl(null);
      await updateAvatar({ avatar_photo_url: null });
      setMessage({ type: 'success', text: 'Фото видалено!' });
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    setMessage(null);

    try {
      const success = await updateAvatar({
        avatar_name: avatarName,
        professional_headline: headline,
        certification_status: certificationStatus,
        professional_affiliation: affiliations,
        social_linkedin: linkedIn,
        social_instagram: instagram,
        social_website: website,
        social_other: otherProfile,
      });

      if (success) {
        setMessage({ type: 'success', text: 'Профіль збережено!' });
      } else {
        setMessage({ type: 'error', text: 'Помилка збереження' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Помилка збереження' });
    } finally {
      setSaving(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleDeleteAvatar = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setMessage({ type: 'error', text: 'Введіть DELETE для підтвердження' });
      return;
    }

    setDeleting(true);
    setMessage(null);

    try {
      const success = await deleteAvatar();
      
      if (success) {
        setShowDeleteModal(false);
        // Redirect to home after deletion
        navigate('/');
      } else {
        setMessage({ type: 'error', text: 'Помилка видалення аватара' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Помилка видалення аватара' });
    } finally {
      setDeleting(false);
    }
  };

  const handleAffiliationToggle = (affiliation: string) => {
    if (affiliations.includes(affiliation)) {
      setAffiliations(affiliations.filter(a => a !== affiliation));
    } else {
      setAffiliations([...affiliations, affiliation]);
    }
  };

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Success/Error Message */}
      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
          {message.text}
        </div>
      )}

      {/* Avatar Image */}
      <div>
        <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Фото аватара</h3>
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            {avatarPhotoUrl ? (
              <img 
                src={avatarPhotoUrl} 
                alt="Avatar" 
                className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">
                  {avatarName?.[0]?.toUpperCase() || 'A'}
                </span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              Завантажте професійне фото для вашого аватара. Воно буде показуватись користувачам.
            </p>
            <label className={`inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              <Upload className="w-4 h-4" />
              {uploading ? 'Завантаження...' : avatarPhotoUrl ? 'Змінити фото' : 'Завантажити фото'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
            {avatarPhotoUrl && (
              <button
                onClick={handleRemovePhoto}
                className="ml-3 text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
              >
                Видалити
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Базова інформація</h3>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Ім'я аватара
              </label>
              <input
                type="text"
                value={avatarName}
                onChange={(e) => setAvatarName(e.target.value)}
                placeholder="Наприклад: Coach Pavlo, Dr. Maria"
                className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-400"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
              <input
                type="email"
                value={userEmail || ''}
                disabled
                className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
              Професійний заголовок
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Наприклад: Executive Coach for Tech Leaders"
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-400"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Статус сертифікації
              </label>
              <div className="space-y-2">
                {[
                  { value: 'not-certified', label: 'Не сертифікований' },
                  { value: 'in-process', label: 'В процесі сертифікації' },
                  { value: 'certified', label: 'Сертифікований коуч' },
                ].map((option) => (
                  <label key={option.value} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <input
                      type="radio"
                      name="certification"
                      value={option.value}
                      checked={certificationStatus === option.value}
                      onChange={(e) => setCertificationStatus(e.target.value)}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {(certificationStatus === 'certified' || certificationStatus === 'in-process') && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Професійна афіліація
                </label>
                <div className="space-y-2">
                  {['ICF', 'EMCC', 'Other'].map((aff) => (
                    <label key={aff} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <input
                        type="checkbox"
                        checked={affiliations.includes(aff)}
                        onChange={() => handleAffiliationToggle(aff)}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">{aff}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Соціальні профілі (опціонально)</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">LinkedIn</label>
            <input
              type="url"
              value={linkedIn}
              onChange={(e) => setLinkedIn(e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Instagram</label>
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="https://instagram.com/yourprofile"
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Вебсайт</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://yourwebsite.com"
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Інше</label>
            <input
              type="url"
              value={otherProfile}
              onChange={(e) => setOtherProfile(e.target.value)}
              placeholder="https://yourprofile.com"
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleSaveProfile}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
      >
        <Save className="w-4 h-4" />
        {saving ? 'Збереження...' : 'Зберегти зміни'}
      </button>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl border border-green-200 dark:border-green-700/50 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg mb-1 text-gray-900 dark:text-white">Безкоштовний план</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">MVP версія для тестування</p>
          </div>
          <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm">Активний</span>
        </div>
        <div className="flex items-baseline gap-1 mb-4">
          <span className="text-3xl text-gray-900 dark:text-white">$0</span>
          <span className="text-gray-600 dark:text-gray-300">/місяць</span>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Преміум плани будуть доступні пізніше
        </p>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <p className="text-gray-500 dark:text-gray-400">
        Налаштування сповіщень будуть доступні в майбутніх версіях.
      </p>
    </div>
  );

  const renderAccount = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg mb-4 text-gray-900 dark:text-white">Інформація акаунту</h3>
        <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
              <p className="text-gray-900 dark:text-white">{userEmail || 'Не вказано'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg mb-4 text-red-600 dark:text-red-400">Небезпечна зона</h3>
        <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/30 rounded-lg p-6">
          <h4 className="mb-2 text-gray-900 dark:text-white">Видалити аватар</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Назавжди видалити ваш аватар та всі пов'язані дані. Цю дію неможливо скасувати.
          </p>
          <button 
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Видалити аватар
          </button>
        </div>
      </div>
    </div>
  );

  // Delete confirmation modal
  const renderDeleteModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Видалити аватар?</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Ця дія незворотна</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            Буде видалено:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mb-4">
            <li>• Всі налаштування аватара</li>
            <li>• Тренувальні матеріали (посилання, документи, відео)</li>
            <li>• Історія чатів</li>
            <li>• Фото профілю</li>
          </ul>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Для підтвердження введіть <strong>DELETE</strong>:
          </p>
          <input
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder="DELETE"
            className="w-full mt-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-900 dark:text-white"
          />
        </div>

        {message && message.type === 'error' && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg text-sm">
            {message.text}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => {
              setShowDeleteModal(false);
              setDeleteConfirmText('');
              setMessage(null);
            }}
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Скасувати
          </button>
          <button
            onClick={handleDeleteAvatar}
            disabled={deleting || deleteConfirmText !== 'DELETE'}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {deleting ? 'Видалення...' : 'Видалити назавжди'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl mb-2 text-gray-900 dark:text-white">Налаштування акаунту</h1>
          <p className="text-gray-600 dark:text-gray-400">Керуйте профілем та налаштуваннями аватара</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sticky top-4">
              <nav className="space-y-1">
                {[
                  { id: 'profile' as const, label: 'Профіль', icon: User },
                  { id: 'billing' as const, label: 'Білінг', icon: CreditCard },
                  { id: 'notifications' as const, label: 'Сповіщення', icon: Bell },
                  { id: 'account' as const, label: 'Безпека', icon: Lock },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                        activeTab === tab.id
                          ? 'bg-green-600 text-white'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 lg:p-8">
              {activeTab === 'profile' && renderProfile()}
              {activeTab === 'billing' && renderBilling()}
              {activeTab === 'notifications' && renderNotifications()}
              {activeTab === 'account' && renderAccount()}
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && renderDeleteModal()}
    </div>
  );
}
