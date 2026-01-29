import React from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Info, Upload, User, Plus, X, Loader2, Camera, Sparkles, Check, RefreshCw } from "lucide-react";
import { Card } from "../ui/Card";
import { useStorage } from "../../lib/useStorage";

interface Step1PersonalInfoProps {
  onNext: (data: any) => void;
  onBack: (data?: any) => void;
  onAutoSave?: (data: any) => void;
  initialData?: any;
}

export function Step1PersonalInfo({
  onNext,
  onBack,
  onAutoSave,
  initialData,
}: Step1PersonalInfoProps) {
  const { uploadAvatar, uploading, deleteFile } = useStorage();
  
  const [avatarName, setAvatarName] = React.useState(
    initialData?.avatarName || "",
  );
  const [headline, setHeadline] = React.useState(
    initialData?.professionalHeadline || initialData?.headline || "",
  );
  const [certificationStatus, setCertificationStatus] =
    React.useState(
      initialData?.certificationStatus || "not-certified",
    );
  const [affiliations, setAffiliations] = React.useState<
    string[]
  >(initialData?.affiliations || []);
  const [otherAffiliation, setOtherAffiliation] =
    React.useState(initialData?.otherAffiliation || "");
  const [linkedIn, setLinkedIn] = React.useState(
    initialData?.socialLinkedin || initialData?.linkedIn || "",
  );
  const [instagram, setInstagram] = React.useState(
    initialData?.socialInstagram || initialData?.instagram || "",
  );
  const [website, setWebsite] = React.useState(
    initialData?.socialWebsite || initialData?.website || "",
  );
  
  // 3 photos for AI Avatar generation (with backward compatibility)
  const [avatarPhoto1, setAvatarPhoto1] = React.useState<string | null>(
    initialData?.avatarPhoto1 || initialData?.avatarPhotoUrl || null
  );
  const [avatarPhoto2, setAvatarPhoto2] = React.useState<string | null>(
    initialData?.avatarPhoto2 || null
  );
  const [avatarPhoto3, setAvatarPhoto3] = React.useState<string | null>(
    initialData?.avatarPhoto3 || null
  );
  
  // Generated avatars
  const [generatedAvatar1, setGeneratedAvatar1] = React.useState<string | null>(
    initialData?.generatedAvatar1 || null
  );
  const [generatedAvatar2, setGeneratedAvatar2] = React.useState<string | null>(
    initialData?.generatedAvatar2 || null
  );
  const [generatedAvatar3, setGeneratedAvatar3] = React.useState<string | null>(
    initialData?.generatedAvatar3 || null
  );
  const [selectedAvatarUrl, setSelectedAvatarUrl] = React.useState<string | null>(
    initialData?.selectedAvatarUrl || null
  );
  
  // Generation state
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [generationProgress, setGenerationProgress] = React.useState(0);
  
  // Track which photo slot is uploading
  const [uploadingSlot, setUploadingSlot] = React.useState<number | null>(null);
  const [uploadError, setUploadError] = React.useState<string | null>(null);
  
  const [otherLinks, setOtherLinks] = React.useState<string[]>(
    initialData?.otherLinks || [],
  );
  const [currentOtherLink, setCurrentOtherLink] = React.useState("");

  // Track if initial data has been loaded
  const [isInitialized, setIsInitialized] = React.useState(false);

  // Helper to get current form data
  const getCurrentData = () => ({
    avatarName,
    professionalHeadline: headline,
    certificationStatus,
    affiliations,
    otherAffiliation,
    socialLinkedin: linkedIn,
    socialInstagram: instagram,
    socialWebsite: website,
    socialOther: otherLinks.join(', '),
    avatarPhoto1,
    avatarPhoto2,
    avatarPhoto3,
    generatedAvatar1,
    generatedAvatar2,
    generatedAvatar3,
    selectedAvatarUrl,
    // Keep legacy field for backward compatibility
    avatarPhotoUrl: selectedAvatarUrl || avatarPhoto1,
    otherLinks,
  });

  // Auto-save with debounce (1 second delay)
  React.useEffect(() => {
    // Skip auto-save on initial load
    if (!isInitialized) {
      setIsInitialized(true);
      return;
    }

    if (!onAutoSave) return;

    const timeoutId = setTimeout(() => {
      onAutoSave(getCurrentData());
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [avatarName, headline, certificationStatus, affiliations, linkedIn, instagram, website, avatarPhoto1, avatarPhoto2, avatarPhoto3, generatedAvatar1, generatedAvatar2, generatedAvatar3, selectedAvatarUrl, otherLinks, onAutoSave, isInitialized]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, slot: number) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);
    setUploadingSlot(slot);

    // Upload to Supabase Storage
    const result = await uploadAvatar(file);

    if (result.error) {
      setUploadError(result.error);
      setUploadingSlot(null);
      return;
    }

    if (result.url) {
      // Set the appropriate photo slot
      switch (slot) {
        case 1:
          // Delete old photo if exists
          if (avatarPhoto1) {
            const oldPath = avatarPhoto1.split('/storage/v1/object/public/avatars/')[1];
            if (oldPath) await deleteFile(oldPath);
          }
          setAvatarPhoto1(result.url);
          break;
        case 2:
          if (avatarPhoto2) {
            const oldPath = avatarPhoto2.split('/storage/v1/object/public/avatars/')[1];
            if (oldPath) await deleteFile(oldPath);
          }
          setAvatarPhoto2(result.url);
          break;
        case 3:
          if (avatarPhoto3) {
            const oldPath = avatarPhoto3.split('/storage/v1/object/public/avatars/')[1];
            if (oldPath) await deleteFile(oldPath);
          }
          setAvatarPhoto3(result.url);
          break;
      }
      
      // Clear generated avatars when source photos change
      setGeneratedAvatar1(null);
      setGeneratedAvatar2(null);
      setGeneratedAvatar3(null);
      setSelectedAvatarUrl(null);
    }
    
    setUploadingSlot(null);
  };

  const handleRemovePhoto = async (slot: number) => {
    let photoUrl: string | null = null;
    
    switch (slot) {
      case 1:
        photoUrl = avatarPhoto1;
        setAvatarPhoto1(null);
        break;
      case 2:
        photoUrl = avatarPhoto2;
        setAvatarPhoto2(null);
        break;
      case 3:
        photoUrl = avatarPhoto3;
        setAvatarPhoto3(null);
        break;
    }
    
    if (photoUrl) {
      const path = photoUrl.split('/storage/v1/object/public/avatars/')[1];
      if (path) await deleteFile(path);
    }
    
    // Clear generated avatars when source photos change
    setGeneratedAvatar1(null);
    setGeneratedAvatar2(null);
    setGeneratedAvatar3(null);
    setSelectedAvatarUrl(null);
  };

  // Generate AI Avatars (Mock for now - will integrate with Replicate/fal.ai later)
  const handleGenerateAvatars = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 300);
    
    try {
      // TODO: Replace with actual API call to Replicate or fal.ai
      // For now, use placeholder avatars for UI testing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock generated avatars using DiceBear API (cartoon style avatars)
      const seed = Date.now();
      const style1 = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}-1&backgroundColor=b6e3f4`;
      const style2 = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}-2&backgroundColor=c0aede`;
      const style3 = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}-3&backgroundColor=d1fae5`;
      
      setGeneratedAvatar1(style1);
      setGeneratedAvatar2(style2);
      setGeneratedAvatar3(style3);
      
      clearInterval(progressInterval);
      setGenerationProgress(100);
      
    } catch (error) {
      console.error('Avatar generation error:', error);
      setUploadError('Failed to generate avatars. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAvatar = (avatarUrl: string) => {
    setSelectedAvatarUrl(avatarUrl);
  };

  const addOtherLink = () => {
    if (currentOtherLink.trim()) {
      setOtherLinks([...otherLinks, currentOtherLink.trim()]);
      setCurrentOtherLink("");
    }
  };

  const removeOtherLink = (index: number) => {
    setOtherLinks(otherLinks.filter((_, i) => i !== index));
  };

  const handleAffiliationToggle = (affiliation: string) => {
    if (affiliations.includes(affiliation)) {
      setAffiliations(
        affiliations.filter((a) => a !== affiliation),
      );
    } else {
      setAffiliations([...affiliations, affiliation]);
    }
  };

  const handleNext = () => {
    onNext(getCurrentData());
  };

  // Save data when going back
  const handleBack = () => {
    onBack(getCurrentData());
  };

  const isValid =
    avatarName.trim() && headline.trim() && certificationStatus;

  // Render photo slot
  const renderPhotoSlot = (slot: number, photoUrl: string | null) => {
    const isUploading = uploadingSlot === slot;
    const inputId = `photo-upload-${slot}`;
    
    return (
      <div key={slot} className="flex flex-col items-center">
        <div className="relative">
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`Photo ${slot}`}
              className="w-28 h-28 rounded-xl object-cover border-2 border-slate-200 dark:border-slate-700"
            />
          ) : (
            <div className="w-28 h-28 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center">
              <Camera className="w-8 h-8 text-slate-400" />
            </div>
          )}
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
        
        <div className="mt-2 flex flex-col items-center gap-1">
          <label
            htmlFor={inputId}
            className={`text-sm px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors cursor-pointer ${isUploading || uploadingSlot !== null ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isUploading ? 'Uploading...' : photoUrl ? 'Change' : 'Upload'}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, slot)}
            className="hidden"
            id={inputId}
            disabled={isUploading || uploadingSlot !== null}
          />
          {photoUrl && !isUploading && (
            <button
              type="button"
              onClick={() => handleRemovePhoto(slot)}
              className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
            >
              Remove
            </button>
          )}
        </div>
        
        <span className="mt-1 text-xs text-slate-500 dark:text-slate-400">
          Photo {slot}
        </span>
      </div>
    );
  };

  // Render generated avatar option
  const renderGeneratedAvatar = (avatarUrl: string | null, label: string) => {
    if (!avatarUrl) return null;
    
    const isSelected = selectedAvatarUrl === avatarUrl;
    
    return (
      <div 
        className={`flex flex-col items-center cursor-pointer transition-all ${isSelected ? 'scale-105' : 'hover:scale-102'}`}
        onClick={() => handleSelectAvatar(avatarUrl)}
      >
        <div className={`relative rounded-xl overflow-hidden border-4 transition-all ${isSelected ? 'border-green-500 shadow-lg shadow-green-500/30' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'}`}>
          <img
            src={avatarUrl}
            alt={label}
            className="w-32 h-32 object-cover bg-white"
          />
          {isSelected && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <Check className="w-4 h-4 text-white" />
            </div>
          )}
        </div>
        <span className="mt-2 text-sm text-slate-600 dark:text-slate-400">{label}</span>
        {isSelected && (
          <span className="text-xs text-green-600 dark:text-green-400 font-medium">Selected</span>
        )}
      </div>
    );
  };

  // Count uploaded photos
  const uploadedPhotosCount = [avatarPhoto1, avatarPhoto2, avatarPhoto3].filter(Boolean).length;
  const hasAllPhotos = uploadedPhotosCount === 3;
  const hasGeneratedAvatars = generatedAvatar1 && generatedAvatar2 && generatedAvatar3;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 sm:py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-slate-900 dark:text-slate-100 mb-2">
            Basic Identity
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Let's start with the minimum information needed to
            set up your mentor avatar.
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            <span className="text-red-500">*</span> Required
            fields
          </p>
        </div>

        {/* Avatar Photos - Full Width Block */}
        <Card className="mb-6">
          <div>
            <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
              Photos for AI Avatar
              <span className="text-red-500 ml-1">*</span>
            </label>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              Upload 3 photos of yourself to create your AI Avatar. Use clear, well-lit photos.
            </p>
            
            {/* 3 Photo Slots */}
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              {renderPhotoSlot(1, avatarPhoto1)}
              {renderPhotoSlot(2, avatarPhoto2)}
              {renderPhotoSlot(3, avatarPhoto3)}
            </div>
            
            {/* Progress indicator */}
            <div className="text-center">
              <span className={`text-sm ${uploadedPhotosCount === 3 ? 'text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400'}`}>
                {uploadedPhotosCount}/3 photos uploaded
                {uploadedPhotosCount === 3 && ' ✓'}
              </span>
            </div>
            
            {uploadError && (
              <p className="mt-2 text-sm text-red-600 dark:text-red-400 text-center">
                {uploadError}
              </p>
            )}
            
            {/* Generate Button */}
            {hasAllPhotos && !hasGeneratedAvatars && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleGenerateAvatars}
                  disabled={isGenerating}
                  className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl ${isGenerating ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating... {generationProgress}%
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Generate My AI Avatar
                    </>
                  )}
                </button>
                {isGenerating && (
                  <div className="mt-3 w-64 mx-auto">
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 transition-all duration-300"
                        style={{ width: `${generationProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Generated Avatars Selection */}
            {hasGeneratedAvatars && (
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200 text-center mb-2">
                  Choose Your Avatar
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-6">
                  Click on the avatar you want to use
                </p>
                
                <div className="flex flex-wrap justify-center gap-6 mb-6">
                  {renderGeneratedAvatar(generatedAvatar1, 'Style 1')}
                  {renderGeneratedAvatar(generatedAvatar2, 'Style 2')}
                  {renderGeneratedAvatar(generatedAvatar3, 'Style 3')}
                </div>
                
                {/* Regenerate button */}
                <div className="text-center">
                  <button
                    onClick={handleGenerateAvatars}
                    disabled={isGenerating}
                    className="inline-flex items-center gap-2 px-4 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
                    Regenerate avatars
                  </button>
                </div>
                
                {selectedAvatarUrl && (
                  <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-center">
                    <p className="text-sm text-green-700 dark:text-green-300">
                      ✓ Avatar selected! You can continue to the next step.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            {/* Info box */}
            {!hasGeneratedAvatars && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-2">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-900 dark:text-blue-100">
                  <strong>Tips for best results:</strong>
                  <ul className="mt-1 space-y-0.5 text-blue-800 dark:text-blue-200">
                    <li>• Use photos with good lighting</li>
                    <li>• Show your face clearly</li>
                    <li>• Different angles help create a better avatar</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 mb-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Block 1: Name & Headline */}
            <Card className="space-y-6">
              {/* Avatar Name */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
                  Avatar name
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  How your avatar will be introduced to clients.
                </p>
                <input
                  type="text"
                  placeholder="Example: Coach Sarah, Dr. Alex Chen"
                  value={avatarName}
                  onChange={(e) =>
                    setAvatarName(e.target.value)
                  }
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {!avatarName.trim() && (
                  <p className="mt-1 text-xs text-red-500">
                    This field is required
                  </p>
                )}
              </div>

              {/* Professional Headline */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
                  Professional headline
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  A short description of your role or focus.
                </p>
                <input
                  type="text"
                  placeholder="Example: Executive Coach for Tech Leaders, Leadership Development Specialist"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {!headline.trim() && (
                  <p className="mt-1 text-xs text-red-500">
                    This field is required
                  </p>
                )}
              </div>
            </Card>

            {/* Block 2: Social Profiles */}
            <Card className="space-y-6">
              {/* Social Profiles */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
                  Social profiles (optional)
                </label>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  Add professional links you're comfortable
                  sharing. These help train your avatar on your
                  public expertise.
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/yourprofile"
                      value={linkedIn}
                      onChange={(e) =>
                        setLinkedIn(e.target.value)
                      }
                      className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Instagram
                    </label>
                    <input
                      type="url"
                      placeholder="https://instagram.com/yourprofile"
                      value={instagram}
                      onChange={(e) =>
                        setInstagram(e.target.value)
                      }
                      className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Personal website
                    </label>
                    <input
                      type="url"
                      placeholder="https://yourwebsite.com"
                      value={website}
                      onChange={(e) =>
                        setWebsite(e.target.value)
                      }
                      className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-600 dark:text-slate-400 mb-1">
                      Other
                    </label>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                      Add links to any other social or content platforms you use (coaching platforms, blogs, video channels, communities, etc.). Multiple links are supported.
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://yourprofile.com"
                        value={currentOtherLink}
                        onChange={(e) =>
                          setCurrentOtherLink(e.target.value)
                        }
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addOtherLink();
                          }
                        }}
                        className="flex-1 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={addOtherLink}
                        disabled={!currentOtherLink.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    {otherLinks.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {otherLinks.map((link, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                          >
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
                            >
                              {link}
                            </a>
                            <button
                              type="button"
                              onClick={() => removeOtherLink(index)}
                              className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg flex gap-2">
                  <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                  <p className="text-sm text-indigo-900 dark:text-indigo-100">
                    <strong>Why we ask this:</strong> This helps
                    to attach your work materials for
                    customizing your work methodology.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Block 3: Certification Status */}
            <Card className="space-y-6">
              {/* Certification Status */}
              <div>
                <label className="block text-slate-700 dark:text-slate-300 mb-2 font-medium">
                  Certification status
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                  Select what best describes your background:
                </p>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <input
                      type="radio"
                      name="certification"
                      value="not-certified"
                      checked={
                        certificationStatus === "not-certified"
                      }
                      onChange={(e) =>
                        setCertificationStatus(e.target.value)
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-slate-900 dark:text-slate-100">
                      Not certified (but experienced
                      practitioner)
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <input
                      type="radio"
                      name="certification"
                      value="in-process"
                      checked={
                        certificationStatus === "in-process"
                      }
                      onChange={(e) =>
                        setCertificationStatus(e.target.value)
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-slate-900 dark:text-slate-100">
                      In certification process
                    </span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <input
                      type="radio"
                      name="certification"
                      value="certified"
                      checked={
                        certificationStatus === "certified"
                      }
                      onChange={(e) =>
                        setCertificationStatus(e.target.value)
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-slate-900 dark:text-slate-100">
                      Certified coach
                    </span>
                  </label>
                </div>
                {!certificationStatus && (
                  <p className="mt-2 text-xs text-red-500">
                    Please select your certification status
                  </p>
                )}
              </div>
            </Card>

            {/* Block 4: Professional Affiliation */}
            {(certificationStatus === "certified" ||
              certificationStatus === "in-process") && (
              <Card className="space-y-6">
                {/* Professional Affiliation */}
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 mb-2">
                    Professional affiliation (optional)
                  </label>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    If certified, which organization?
                  </p>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        checked={affiliations.includes("ICF")}
                        onChange={() =>
                          handleAffiliationToggle("ICF")
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-slate-900 dark:text-slate-100">
                        ICF (International Coaching Federation)
                      </span>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        checked={affiliations.includes("EMCC")}
                        onChange={() =>
                          handleAffiliationToggle("EMCC")
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-slate-900 dark:text-slate-100">
                        EMCC (European Mentoring & Coaching
                        Council)
                      </span>
                    </label>
                    <label className="flex items-start gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        checked={affiliations.includes("Other")}
                        onChange={() =>
                          handleAffiliationToggle("Other")
                        }
                        className="w-4 h-4 mt-1"
                      />
                      <div className="flex-1">
                        <span className="text-slate-900 dark:text-slate-100">
                          Other:
                        </span>
                        {affiliations.includes("Other") && (
                          <input
                            type="text"
                            placeholder="Specify organization..."
                            value={otherAffiliation}
                            onChange={(e) =>
                              setOtherAffiliation(
                                e.target.value,
                              )
                            }
                            className="mt-2 w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          />
                        )}
                      </div>
                    </label>
                    <label className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <input
                        type="checkbox"
                        checked={affiliations.includes(
                          "Prefer not to specify",
                        )}
                        onChange={() =>
                          handleAffiliationToggle(
                            "Prefer not to specify",
                          )
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-slate-900 dark:text-slate-100">
                        Prefer not to specify
                      </span>
                    </label>
                  </div>
                  <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg flex gap-2">
                    <Info className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                    <p className="text-sm text-indigo-900 dark:text-indigo-100">
                      <strong>Why we ask this:</strong> Your
                      certification and affiliation help us
                      suggest ethical boundaries and
                      communication standards that align with
                      your professional context.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mb-6 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Everything remains fully editable.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-row gap-3 sm:gap-4">
          <Button
            onClick={handleBack}
            variant="outline"
            className="sm:w-auto"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!isValid || uploadingSlot !== null || isGenerating}
            variant="primary"
            className="flex-1"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
