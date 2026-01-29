import React from "react";
import { Upload, File, X, CheckCircle } from "lucide-react";

interface UploadBoxProps {
  title: string;
  description: string;
  accept?: string;
  onUpload?: (files: File[]) => void;
  uploadedFiles?: Array<{ name: string; size: string }>;
  onRemove?: (index: number) => void;
  className?: string;
  icon?: React.ReactNode;
}

export function UploadBox({
  title,
  description,
  accept,
  onUpload,
  uploadedFiles = [],
  onRemove,
  className = "",
  icon,
}: UploadBoxProps) {
  const [isDragging, setIsDragging] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    onUpload?.(files);
  };

  const handleFileSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(e.target.files || []);
    onUpload?.(files);
  };

  return (
    <div className={className}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`
          border-2 border-dashed rounded-xl p-8
          cursor-pointer transition-all duration-200
          ${
            isDragging
              ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-950"
              : "border-slate-300 dark:border-slate-600 hover:border-indigo-400 hover:bg-slate-50 dark:hover:bg-slate-800"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
          multiple
        />
        <div className="flex flex-col items-center gap-3 text-center">
          {icon || (
            <Upload className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
          )}
          <div>
            <h4 className="text-slate-900 dark:text-slate-100">
              {title}
            </h4>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              {description}
            </p>
          </div>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="mt-4 space-y-2">
          {uploadedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-4 bg-white dark:bg-slate-800 border-2 border-green-200 dark:border-green-800 rounded-lg shadow-sm"
            >
              <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
              <File className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-slate-900 dark:text-slate-100 font-medium">
                  {file.name}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {file.size}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove?.(index);
                }}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-red-600 dark:text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}