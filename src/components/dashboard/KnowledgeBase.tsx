import { useState } from 'react';
import { FileText, File, Video, Link as LinkIcon, Search, Plus, Trash2, Download, Eye, FolderOpen, Loader2 } from 'lucide-react';
import { useTrainingMaterials, TrainingMaterial } from '../../lib/useTrainingMaterials';

interface KnowledgeBaseProps {
  avatarId?: string | null;
}

export function KnowledgeBase({ avatarId }: KnowledgeBaseProps) {
  const { materials, loading, removeMaterial } = useTrainingMaterials(avatarId || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Calculate counts dynamically
  const getCounts = () => {
    return {
      all: materials.length,
      documents: materials.filter(item => item.type === 'document').length,
      videos: materials.filter(item => item.type === 'video').length,
      links: materials.filter(item => item.type === 'link').length,
    };
  };

  const counts = getCounts();

  const categories = [
    { id: 'all', label: 'Усі матеріали', count: counts.all },
    { id: 'documents', label: 'Документи', count: counts.documents },
    { id: 'videos', label: 'Відео', count: counts.videos },
    { id: 'links', label: 'Посилання', count: counts.links },
  ];

  const getIcon = (type: TrainingMaterial['type']) => {
    switch (type) {
      case 'document':
        return <File className="w-5 h-5 text-blue-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'link':
        return <LinkIcon className="w-5 h-5 text-green-600" />;
    }
  };

  const filteredItems =
    selectedCategory === 'all'
      ? materials
      : materials.filter((item) => item.type === selectedCategory.slice(0, -1)); // Remove 's' from category id

  const searchedItems = searchQuery
    ? filteredItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredItems;

  const handleDelete = async (id: string) => {
    if (id) {
      await removeMaterial(id);
    }
  };

  // Calculate total size
  const totalSize = materials.reduce((acc, item) => {
    if (item.size) {
      const match = item.size.match(/^([\d.]+)/);
      if (match) {
        const num = parseFloat(match[1]);
        // Convert to MB for consistency
        if (item.size.includes('KB')) {
          return acc + num / 1024;
        } else if (item.size.includes('MB')) {
          return acc + num;
        } else if (item.size.includes('GB')) {
          return acc + num * 1024;
        }
      }
    }
    return acc;
  }, 0);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center h-full">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Завантаження матеріалів...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl mb-2 text-gray-900 dark:text-white">База знань</h1>
        <p className="text-gray-600 dark:text-gray-400">Керуйте матеріалами та ресурсами для тренування аватара</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
            <h3 className="mb-4 text-gray-900 dark:text-white">Категорії</h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors text-left ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-sm">{category.label}</span>
                  <span className={`text-xs ${selectedCategory === category.id ? 'text-green-100' : 'text-gray-500 dark:text-gray-400'}`}>
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Додавайте матеріали через<br />"Завантаження контенту"
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Пошук в базі знань..."
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Empty State or Items Grid */}
          {searchedItems.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
              <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                {materials.length === 0 ? 'База знань порожня' : 'Нічого не знайдено'}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {materials.length === 0 
                  ? 'Додайте матеріали для тренування вашого аватара'
                  : 'Спробуйте змінити пошуковий запит або категорію'
                }
              </p>
              {materials.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Перейдіть до "Завантаження контенту" щоб додати матеріали
                </p>
              )}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {searchedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                      {getIcon(item.type)}
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        >
                          <Eye className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </a>
                      )}
                      <button 
                        onClick={() => handleDelete(item.id!)}
                        className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>

                  <h3 className="mb-2 line-clamp-2 text-gray-900 dark:text-white">{item.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 capitalize">
                    {item.type === 'document' ? 'Документ' : item.type === 'video' ? 'Відео' : 'Посилання'}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    <span>{item.created_at ? new Date(item.created_at).toLocaleDateString('uk-UA') : 'Сьогодні'}</span>
                    {item.size && (
                      <>
                        <span>•</span>
                        <span>{item.size}</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 text-center">
              <p className="text-2xl mb-1 text-gray-900 dark:text-white">{counts.all}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Всього матеріалів</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 text-center">
              <p className="text-2xl mb-1 text-gray-900 dark:text-white">{counts.documents}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Документів</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 text-center">
              <p className="text-2xl mb-1 text-gray-900 dark:text-white">{counts.videos}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Відео</p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-4 text-center">
              <p className="text-2xl mb-1 text-gray-900 dark:text-white">{totalSize > 0 ? `${totalSize.toFixed(1)} MB` : '0 MB'}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">Загальний розмір</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
