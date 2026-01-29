import React from "react";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import {
  FileText,
  Video,
  Link,
  Info,
  Plus,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useStorage } from "../../lib/useStorage";
import { useTrainingMaterials, TrainingMaterial } from "../../lib/useTrainingMaterials";

interface UploadedFile {
  id?: string;
  name: string;
  size: string;
  url?: string;
  path?: string;
  status: 'uploading' | 'success' | 'error';
  error?: string;
}

interface Step3UploadSourcesProps {
  onNext: (data: any) => void;
  onBack: (data?: any) => void;
  initialData?: any;
  avatarId?: string | null;
}

// URL validation function
const isValidUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};

export function Step3UploadSources({
  onNext,
  onBack,
  initialData,
  avatarId,
}: Step3UploadSourcesProps) {
  const { uploadDocument, uploadVideo, deleteFile } = useStorage();
  const { 
    materials, 
    loading: materialsLoading, 
    addMaterial, 
    removeMaterial 
  } = useTrainingMaterials(avatarId || null);
  
  const [activeTab, setActiveTab] = React.useState<
    "links" | "docs" | "videos"
  >("links");
  const [uploadingFiles, setUploadingFiles] = React.useState<UploadedFile[]>([]);
  const [newLink, setNewLink] = React.useState("");
  const [linkError, setLinkError] = React.useState("");
  const [isUploading, setIsUploading] = React.useState(false);

  // Derive files from materials
  const textFiles: UploadedFile[] = materials
    .filter(m => m.type === 'document')
    .map(m => ({
      id: m.id,
      name: m.name,
      size: m.size || '',
      url: m.url,
      path: m.path,
      status: 'success' as const,
    }));

  const videoFiles: UploadedFile[] = materials
    .filter(m => m.type === 'video')
    .map(m => ({
      id: m.id,
      name: m.name,
      size: m.size || '',
      url: m.url,
      path: m.path,
      status: 'success' as const,
    }));

  const webLinks = materials
    .filter(m => m.type === 'link')
    .map(m => ({ id: m.id, url: m.name }));

  // Helper to get current form data
  const getCurrentData = () => ({
    textFiles: textFiles.filter(f => f.status === 'success'),
    videoFiles: videoFiles.filter(f => f.status === 'success'),
    webLinks: webLinks.map(l => l.url),
  });

  const handleTextUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const fileSize = `${(file.size / 1024).toFixed(1)} KB`;
      
      // Add file with uploading status
      const tempFile: UploadedFile = {
        name: file.name,
        size: fileSize,
        status: 'uploading',
      };
      setUploadingFiles(prev => [...prev, tempFile]);

      // Upload to Supabase Storage
      const result = await uploadDocument(file);

      if (result.error) {
        // Update uploading status to error
        setUploadingFiles(prev => prev.map(f => 
          f.name === file.name && f.status === 'uploading'
            ? { ...f, status: 'error' as const, error: result.error }
            : f
        ));
      } else {
        // Save to training_materials table
        await addMaterial({
          type: 'document',
          name: file.name,
          url: result.url,
          path: result.path,
          size: fileSize,
        });
        
        // Remove from uploading list
        setUploadingFiles(prev => prev.filter(f => 
          !(f.name === file.name && f.status === 'uploading')
        ));
      }
    }

    setIsUploading(false);
    e.target.value = '';
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const fileSize = `${(file.size / 1024 / 1024).toFixed(1)} MB`;
      
      // Add file with uploading status
      const tempFile: UploadedFile = {
        name: file.name,
        size: fileSize,
        status: 'uploading',
      };
      setUploadingFiles(prev => [...prev, tempFile]);

      // Upload to Supabase Storage
      const result = await uploadVideo(file);

      if (result.error) {
        setUploadingFiles(prev => prev.map(f => 
          f.name === file.name && f.status === 'uploading'
            ? { ...f, status: 'error' as const, error: result.error }
            : f
        ));
      } else {
        // Save to training_materials table
        await addMaterial({
          type: 'video',
          name: file.name,
          url: result.url,
          path: result.path,
          size: fileSize,
        });
        
        // Remove from uploading list
        setUploadingFiles(prev => prev.filter(f => 
          !(f.name === file.name && f.status === 'uploading')
        ));
      }
    }

    setIsUploading(false);
    e.target.value = '';
  };

  const handleRemoveTextFile = async (index: number) => {
    const file = textFiles[index];
    if (file.id) {
      // Delete from Supabase Storage
      if (file.path) {
        await deleteFile(file.path);
      }
      // Delete from training_materials table
      await removeMaterial(file.id);
    }
  };

  const handleRemoveVideoFile = async (index: number) => {
    const file = videoFiles[index];
    if (file.id) {
      if (file.path) {
        await deleteFile(file.path);
      }
      await removeMaterial(file.id);
    }
  };

  const handleAddWebLink = async () => {
    const trimmedLink = newLink.trim();
    
    // Clear previous error
    setLinkError("");
    
    if (!trimmedLink) {
      return;
    }
    
    // Validate URL
    if (!isValidUrl(trimmedLink)) {
      setLinkError("Please enter a valid URL (e.g., https://example.com)");
      return;
    }
    
    // Check for duplicates
    if (webLinks.some(link => link.url === trimmedLink)) {
      setLinkError("This link has already been added");
      return;
    }
    
    await addMaterial({
      type: 'link',
      name: trimmedLink,
    });
    setNewLink("");
    setLinkError("");
  };

  const handleLinkInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewLink(e.target.value);
    // Clear error when user starts typing
    if (linkError) {
      setLinkError("");
    }
  };

  const handleRemoveWebLink = async (index: number) => {
    const link = webLinks[index];
    if (link.id) {
      await removeMaterial(link.id);
    }
  };

  const handleNext = () => {
    onNext(getCurrentData());
  };

  const handleBack = () => {
    onBack(getCurrentData());
  };

  const handleSkip = () => {
    onNext({ textFiles: [], videoFiles: [], webLinks: [] });
  };

  // Calculate progress
  const linksProgress = webLinks.length > 0 ? 100 : 0;
  const docsProgress = textFiles.length > 0 ? 100 : 0;
  const videosProgress = videoFiles.length > 0 ? 100 : 0;

  const renderFileStatus = (file: UploadedFile) => {
    switch (file.status) {
      case 'uploading':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  // Combine saved files with uploading files for display
  const displayTextFiles = [...textFiles, ...uploadingFiles.filter(f => f.name.match(/\.(pdf|doc|docx|txt)$/i))];
  const displayVideoFiles = [...videoFiles, ...uploadingFiles.filter(f => f.name.match(/\.(mp4|mov|avi|webm)$/i))];

  if (materialsLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-2" />
          <p className="text-slate-600 dark:text-slate-400">Завантаження матеріалів...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">
            Training Materials{" "}
            <span className="text-slate-400">
              (optional — you can skip this step)
            </span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            You can add materials now — or come back anytime
            from your dashboard.
          </p>
        </div>

        {/* Why this matters */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 mb-6">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-slate-900 dark:text-slate-100 mb-2">
                Why this matters
              </h4>
              <p className="text-slate-700 dark:text-slate-300 mb-3">
                Materials train your avatar to use your specific
                language, examples, and frameworks.
              </p>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-sm">
                <li>• Blog posts or articles you've written</li>
                <li>• Recorded talks or workshop videos</li>
                <li>
                  • Client handouts, guides, or worksheets
                </li>
                <li>
                  • Frameworks or models you use regularly
                </li>
                <li>• Case studies or anonymized examples</li>
              </ul>
              <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm">
                <strong>Not required now</strong> — you can add
                materials anytime from your dashboard.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left: Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs - FIXED: replaced bg-gradient-primary with stable colors */}
            <div className="flex gap-3">
              <button
                onClick={() => setActiveTab("links")}
                className={`flex-1 px-6 py-4 rounded-xl text-base font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === "links"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                <Link className="w-5 h-5" />
                <span>Links</span>
              </button>
              <button
                onClick={() => setActiveTab("docs")}
                className={`flex-1 px-6 py-4 rounded-xl text-base font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === "docs"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Documents</span>
              </button>
              <button
                onClick={() => setActiveTab("videos")}
                className={`flex-1 px-6 py-4 rounded-xl text-base font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === "videos"
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
                }`}
              >
                <Video className="w-5 h-5" />
                <span>Videos</span>
              </button>
            </div>

            {/* Tab Content */}
            {activeTab === "links" && (
              <div className="space-y-4">
                <Card>
                  <h4 className="text-slate-900 dark:text-slate-100 mb-2">
                    Add links{" "}
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      (recommended first)
                    </span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Paste URLs to articles, videos, LinkedIn
                    posts, or public resources.
                  </p>

                  <div className="flex gap-2 mb-2">
                    <input
                      type="url"
                      placeholder="https://..."
                      value={newLink}
                      onChange={handleLinkInputChange}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleAddWebLink()
                      }
                      className={`flex-1 px-4 py-2.5 bg-white dark:bg-slate-800 border-2 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                        linkError 
                          ? "border-red-400 dark:border-red-500" 
                          : "border-slate-200 dark:border-slate-700"
                      }`}
                    />
                    <Button onClick={handleAddWebLink}>
                      <Plus className="w-4 h-4 mr-2" />
                      Add link
                    </Button>
                  </div>
                  
                  {/* URL validation error message */}
                  {linkError && (
                    <div className="flex items-center gap-2 mb-4 text-red-600 dark:text-red-400">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{linkError}</span>
                    </div>
                  )}

                  <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400 italic mb-1">
                      Examples:
                    </p>
                    <ul className="text-sm text-slate-500 dark:text-slate-400 space-y-0.5">
                      <li>• YouTube talk: https://youtube.com/watch?v=...</li>
                      <li>• Blog post: https://medium.com/@yourname/...</li>
                      <li>• LinkedIn article: https://linkedin.com/pulse/...</li>
                    </ul>
                  </div>

                  {webLinks.length > 0 && (
                    <div className="space-y-2">
                      {webLinks.map((link, index) => (
                        <div
                          key={link.id || index}
                          className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <Link className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          <span className="flex-1 text-slate-900 dark:text-slate-100 truncate text-sm">
                            {link.url}
                          </span>
                          <button
                            onClick={() => handleRemoveWebLink(index)}
                            className="text-red-600 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === "docs" && (
              <div>
                <Card>
                  <h4 className="text-slate-900 dark:text-slate-100 mb-2">
                    Upload documents{" "}
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      (optional)
                    </span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    PDFs, Word docs, guides, or frameworks.
                  </p>

                  {/* Upload Area */}
                  <label
                    htmlFor="doc-upload"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                      isUploading 
                        ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' 
                        : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-2" />
                        <p className="text-slate-600 dark:text-slate-400">Uploading...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <FileText className="w-10 h-10 text-slate-400 mb-2" />
                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                          Drag & drop or click to browse
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          Supported: PDF, DOCX, TXT (max 50MB)
                        </p>
                      </div>
                    )}
                    <input
                      id="doc-upload"
                      type="file"
                      accept=".pdf,.doc,.docx,.txt"
                      multiple
                      onChange={handleTextUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>

                  {/* Uploaded Files List */}
                  {displayTextFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {displayTextFiles.map((file, index) => (
                        <div
                          key={file.id || `uploading-${index}`}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            file.status === 'error' 
                              ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800' 
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {renderFileStatus(file)}
                          <FileText className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-900 dark:text-slate-100 truncate text-sm">
                              {file.name}
                            </p>
                            {file.error && (
                              <p className="text-xs text-red-600 dark:text-red-400">{file.error}</p>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {file.size}
                          </span>
                          <button
                            onClick={() => handleRemoveTextFile(index)}
                            className="text-red-600 hover:text-red-700 p-1"
                            disabled={file.status === 'uploading'}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {activeTab === "videos" && (
              <div>
                <Card>
                  <h4 className="text-slate-900 dark:text-slate-100 mb-2">
                    Upload videos{" "}
                    <span className="text-slate-500 dark:text-slate-400 text-sm">
                      (optional)
                    </span>
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    Recorded sessions, workshops, or talks.
                  </p>

                  {/* Upload Area */}
                  <label
                    htmlFor="video-upload"
                    className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                      isUploading 
                        ? 'border-blue-400 bg-blue-50 dark:bg-blue-950' 
                        : 'border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-2" />
                        <p className="text-slate-600 dark:text-slate-400">Uploading...</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Video className="w-10 h-10 text-slate-400 mb-2" />
                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                          Drag & drop or click to browse
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                          Supported: MP4, MOV, AVI, WebM (max 50MB)
                        </p>
                      </div>
                    )}
                    <input
                      id="video-upload"
                      type="file"
                      accept=".mp4,.mov,.avi,.webm"
                      multiple
                      onChange={handleVideoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </label>

                  {/* Uploaded Files List */}
                  {displayVideoFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {displayVideoFiles.map((file, index) => (
                        <div
                          key={file.id || `uploading-${index}`}
                          className={`flex items-center gap-3 p-3 rounded-lg border ${
                            file.status === 'error' 
                              ? 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800' 
                              : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700'
                          }`}
                        >
                          {renderFileStatus(file)}
                          <Video className="w-5 h-5 text-slate-400 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-slate-900 dark:text-slate-100 truncate text-sm">
                              {file.name}
                            </p>
                            {file.error && (
                              <p className="text-xs text-red-600 dark:text-red-400">{file.error}</p>
                            )}
                          </div>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {file.size}
                          </span>
                          <button
                            onClick={() => handleRemoveVideoFile(index)}
                            className="text-red-600 hover:text-red-700 p-1"
                            disabled={file.status === 'uploading'}
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>

          {/* Right: What you've added so far */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card>
              <h4 className="text-slate-900 dark:text-slate-100 mb-4">
                What you've added so far
              </h4>

              <div className="space-y-4">
                {/* Links progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Link className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        Links
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {webLinks.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
                      style={{ width: `${linksProgress}%` }}
                    />
                  </div>
                </div>

                {/* Docs progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        Documents
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {textFiles.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
                      style={{ width: `${docsProgress}%` }}
                    />
                  </div>
                </div>

                {/* Videos progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        Videos
                      </span>
                    </div>
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {videoFiles.length}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
                      style={{ width: `${videosProgress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                  Files are uploaded to secure cloud storage and saved automatically
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Button onClick={handleBack} variant="outline">
            Back
          </Button>
          <Button onClick={handleNext} disabled={isUploading} variant="primary" className="flex-1">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
