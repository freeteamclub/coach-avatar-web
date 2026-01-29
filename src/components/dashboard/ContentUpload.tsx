import { useState, useRef } from "react";
import {
  Upload,
  Video,
  File,
  Trash2,
  Play,
  FileText,
  Tag,
  Check,
  Link as LinkIcon,
  Plus,
  X,
  FolderOpen,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useTrainingMaterials } from "../../lib/useTrainingMaterials";
import { useStorage } from "../../lib/useStorage";

interface ContentUploadProps {
  avatarId?: string | null;
}

export function ContentUpload({ avatarId }: ContentUploadProps) {
  const { materials, loading, addMaterial, removeMaterial } = useTrainingMaterials(avatarId || null);
  const { uploadDocument, uploadVideo, deleteFile } = useStorage();
  
  const [selectedContent, setSelectedContent] = useState<string | null>("upload-files-tab");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<{name: string; progress: string}[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Handle file selection
  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;
    
    if (!avatarId) {
      setError('Помилка: avatarId не знайдено. Спробуйте оновити сторінку.');
      console.error('ContentUpload: avatarId is missing!');
      return;
    }

    setError(null);
    setIsUploading(true);

    for (const file of Array.from(files)) {
      const isVideo = file.type.startsWith('video/');
      const fileSize = formatFileSize(file.size);
      
      // Show uploading state
      setUploadingFiles(prev => [...prev, { name: file.name, progress: 'uploading' }]);

      // Upload to Supabase Storage
      const result = isVideo 
        ? await uploadVideo(file)
        : await uploadDocument(file);

      if (!result.error) {
        // Save to training_materials table
        await addMaterial({
          type: isVideo ? 'video' : 'document',
          name: file.name,
          url: result.url,
          path: result.path,
          size: fileSize,
        });
      }

      // Remove from uploading list
      setUploadingFiles(prev => prev.filter(f => f.name !== file.name));
    }

    setIsUploading(false);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDeleteContent = async (id: string, path?: string) => {
    if (path) {
      await deleteFile(path);
    }
    await removeMaterial(id);
    if (selectedContent === id) {
      setSelectedContent("upload-files-tab");
    }
  };

  const handleAddLink = async (url: string, type: 'link' | 'video') => {
    if (!url.trim()) return;
    
    if (!avatarId) {
      setError('Помилка: avatarId не знайдено. Спробуйте оновити сторінку.');
      console.error('ContentUpload: avatarId is missing!');
      return;
    }
    
    setError(null);
    await addMaterial({
      type: type === 'video' ? 'video' : 'link',
      name: url.trim(),
    });
  };

  // Filter materials by type
  const documents = materials.filter(m => m.type === 'document');
  const videos = materials.filter(m => m.type === 'video');
  const links = materials.filter(m => m.type === 'link');

  const selectedItem = materials.find((m) => m.id === selectedContent);

  // Empty state component
  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center py-12">
      <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-600 mx-auto mb-2" />
          <p className="text-gray-600 dark:text-gray-400">Завантаження матеріалів...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-gray-900">
      {/* Error Banner */}
      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="ml-2 font-bold">×</button>
        </div>
      )}
      
      {/* Content List */}
      <div className="w-full lg:w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl lg:text-2xl mb-4 text-gray-900 dark:text-white">
            Завантаження контенту
          </h2>

          {/* Upload Action Buttons */}
          <div className="space-y-2">
            <button
              onClick={() => setSelectedContent("upload-files-tab")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                selectedContent === "upload-files-tab"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              <Upload className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Завантажити файли</p>
                <p className={`text-xs ${selectedContent === "upload-files-tab" ? "text-green-100" : "text-gray-500 dark:text-gray-400"}`}>
                  Документи та відео
                </p>
              </div>
            </button>

            <button
              onClick={() => setSelectedContent("upload-links-tab")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                selectedContent === "upload-links-tab"
                  ? "bg-green-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              <LinkIcon className="w-5 h-5 flex-shrink-0" />
              <div className="flex-1 text-left">
                <p className="text-sm font-medium">Додати посилання</p>
                <p className={`text-xs ${selectedContent === "upload-links-tab" ? "text-green-100" : "text-gray-500 dark:text-gray-400"}`}>
                  Веб та відео посилання
                </p>
              </div>
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Show empty state if no content */}
          {materials.length === 0 ? (
            <div className="p-6">
              <EmptyState
                title="Ще немає контенту"
                description="Завантажте файли або додайте посилання"
              />
            </div>
          ) : (
            /* All Uploaded Content List */
            materials.map((content) => {
              let icon, bgColor, displayName, displaySize;

              if (content.type === "video") {
                icon = <Video className="w-5 h-5 text-purple-600" />;
                bgColor = "bg-purple-100";
                displayName = content.name;
                displaySize = content.size;
              } else if (content.type === "document") {
                icon = <File className="w-5 h-5 text-blue-600" />;
                bgColor = "bg-blue-100";
                displayName = content.name;
                displaySize = content.size;
              } else if (content.type === "link") {
                icon = <LinkIcon className="w-5 h-5 text-green-600" />;
                bgColor = "bg-green-100";
                displayName = content.name;
                displaySize = null;
              }

              return (
                <button
                  key={content.id}
                  onClick={() => setSelectedContent(content.id!)}
                  className={`w-full p-4 border-b border-gray-200 dark:border-gray-700 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    selectedContent === content.id
                      ? "bg-gray-100 dark:bg-gray-700 border-l-4 border-l-green-600"
                      : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${bgColor}`}>
                      {icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm mb-1 line-clamp-2 text-gray-900 dark:text-white">
                        {displayName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        {displaySize && (
                          <>
                            <span>{displaySize}</span>
                            <span>•</span>
                          </>
                        )}
                        <span>{content.created_at ? new Date(content.created_at).toLocaleDateString('uk') : 'щойно'}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-block px-2 py-1 rounded text-xs bg-green-100 text-green-700">
                          ✓ Готово
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Content Detail Panel */}
      <div className="flex-1 overflow-auto">
        {selectedContent === "upload-files-tab" ? (
          <div className="p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl mb-2 text-gray-900 dark:text-white">
                Завантажити файли
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Завантажте документи та відео для тренування аватара
              </p>

              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Upload className="w-5 h-5 text-green-600" />
                  Перетягніть файли сюди
                </h3>
                
                {/* Drag & Drop Zone */}
                <div 
                  className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors cursor-pointer ${
                    isDragging 
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20" 
                      : isUploading
                        ? "border-blue-400 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-green-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-16 h-16 mx-auto mb-4 text-blue-500 animate-spin" />
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        Завантаження...
                      </p>
                    </>
                  ) : (
                    <>
                      <Upload className={`w-16 h-16 mx-auto mb-4 ${isDragging ? "text-green-500" : "text-gray-400 dark:text-gray-500"}`} />
                      <p className="mb-2 text-gray-700 dark:text-gray-300">
                        {isDragging ? "Відпустіть файли тут" : "Перетягніть файли сюди або натисніть для вибору"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Підтримувані формати: MP4, MOV, PDF, DOCX (Макс. 500MB)
                      </p>
                    </>
                  )}
                  
                  {/* Hidden file input */}
                  <input 
                    ref={fileInputRef}
                    type="file" 
                    className="hidden" 
                    id="file-upload-inline" 
                    multiple 
                    accept=".mp4,.mov,.pdf,.docx,.doc,.txt,.pptx"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    disabled={isUploading}
                  />
                  
                  {!isUploading && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                      className="inline-block px-6 py-3 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700"
                    >
                      Вибрати файли
                    </button>
                  )}
                </div>

                {/* Uploading Files */}
                {uploadingFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadingFiles.map((file, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                        <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                        <span className="text-xs text-blue-600">Завантаження...</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Uploaded Files List */}
                {[...documents, ...videos].length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                      Завантажені файли ({documents.length + videos.length})
                    </h4>
                    <div className="space-y-2">
                      {[...documents, ...videos].map((file) => (
                        <div
                          key={file.id}
                          className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {file.type === "video" ? (
                            <Video className="w-4 h-4 text-purple-600 flex-shrink-0" />
                          ) : (
                            <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm truncate text-gray-900 dark:text-white">
                              {file.name}
                            </p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                {file.size}
                              </p>
                              <span className="text-xs text-green-600">✓ Готово</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleDeleteContent(file.id!, file.path)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                          >
                            <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : selectedContent === "upload-links-tab" ? (
          <div className="p-4 lg:p-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl mb-2 text-gray-900 dark:text-white">
                Додати посилання
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Додайте веб-посилання та відео для тренування аватара
              </p>

              {/* Web Links Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <h3 className="text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <LinkIcon className="w-5 h-5 text-green-600" />
                  Веб-посилання
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Додайте посилання на блоги, статті або ваш вебсайт
                </p>
                
                {links.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {links.map((link) => (
                      <div
                        key={link.id}
                        className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <LinkIcon className="w-4 h-4 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                        <span className="flex-1 text-sm truncate text-gray-700 dark:text-gray-300">
                          {link.name}
                        </span>
                        <button
                          onClick={() => handleDeleteContent(link.id!)}
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                        >
                          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        handleAddLink(e.currentTarget.value, 'link');
                        e.currentTarget.value = "";
                      }
                    }}
                    id="web-link-input"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('web-link-input') as HTMLInputElement;
                      if (input.value.trim()) {
                        handleAddLink(input.value, 'link');
                        input.value = "";
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Додати
                  </button>
                </div>
              </div>

              {/* Video Links Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                  <Video className="w-5 h-5 text-purple-600" />
                  Відео посилання
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Додайте посилання на YouTube, Vimeo або інші відео
                </p>
                
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://youtube.com/..."
                    className="flex-1 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    onKeyPress={(e) => {
                      if (e.key === "Enter" && e.currentTarget.value.trim()) {
                        handleAddLink(e.currentTarget.value, 'video');
                        e.currentTarget.value = "";
                      }
                    }}
                    id="video-link-input"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('video-link-input') as HTMLInputElement;
                      if (input.value.trim()) {
                        handleAddLink(input.value, 'video');
                        input.value = "";
                      }
                    }}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Додати
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : selectedItem ? (
          <div className="p-4 lg:p-8">
            <div className="max-w-4xl">
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {selectedItem.type === "video" ? (
                      <Video className="w-6 h-6 text-purple-600" />
                    ) : selectedItem.type === "link" ? (
                      <LinkIcon className="w-6 h-6 text-green-600" />
                    ) : (
                      <File className="w-6 h-6 text-blue-600" />
                    )}
                    <h2 className="text-2xl lg:text-3xl break-all text-gray-900 dark:text-white">
                      {selectedItem.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    {selectedItem.size && (
                      <>
                        <span>{selectedItem.size}</span>
                        <span>•</span>
                      </>
                    )}
                    <span>{selectedItem.created_at ? new Date(selectedItem.created_at).toLocaleDateString('uk') : 'щойно'}</span>
                    <span>•</span>
                    <span className="text-green-500">✓ Готово</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteContent(selectedItem.id!, selectedItem.path)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-red-600" />
                </button>
              </div>

              {selectedItem.type === "link" && (
                <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg mb-3 text-gray-900 dark:text-white">URL посилання</h3>
                  <a
                    href={selectedItem.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline break-all"
                  >
                    {selectedItem.name}
                  </a>
                </div>
              )}

              {selectedItem.url && selectedItem.type !== "link" && (
                <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg mb-3 text-gray-900 dark:text-white">Файл</h3>
                  <a
                    href={selectedItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 underline"
                  >
                    Відкрити файл
                  </a>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-4 lg:p-8 flex items-center justify-center h-full">
            <EmptyState
              title="Виберіть контент"
              description="Оберіть файл або посилання зі списку зліва"
            />
          </div>
        )}
      </div>
    </div>
  );
}
