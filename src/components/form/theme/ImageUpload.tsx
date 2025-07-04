import React, { useState } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageFile {
  file: File;
  preview: string;
  descricao?: string;
}

interface ImageUploadProps {
  onImagesChange: (images: ImageFile[]) => void;
  maxImages?: number;
  acceptedTypes?: string[];
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  maxImages = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
}) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageFile[] = [];
    const remainingSlots = maxImages - selectedImages.length;

    for (let i = 0; i < Math.min(files.length, remainingSlots); i++) {
      const file = files[i];
      
      if (acceptedTypes.includes(file.type)) {
        const preview = URL.createObjectURL(file);
        newImages.push({ file, preview });
      }
    }

    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    onImagesChange(updatedImages);
  };

  const updateImageDescription = (index: number, descricao: string) => {
    const updatedImages = selectedImages.map((img, i) => 
      i === index ? { ...img, descricao } : img
    );
    setSelectedImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={selectedImages.length >= maxImages}
        />
        
        <div className="space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600 hover:text-blue-500">
              Clique para fazer upload
            </span>
            {' '}ou arraste e solte
          </div>
          <p className="text-xs text-gray-500">
            PNG, JPG, WEBP até 10MB (máximo {maxImages} imagens)
          </p>
          <p className="text-xs text-gray-500">
            {selectedImages.length}/{maxImages} imagens selecionadas
          </p>
        </div>
      </div>

      {/* Preview das Imagens */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedImages.map((imageFile, index) => (
            <div key={index} className="relative border rounded-lg p-3 bg-gray-50">
              <div className="relative">
                <img
                  src={imageFile.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-32 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Descrição da imagem (opcional)"
                  value={imageFile.descricao || ''}
                  onChange={(e) => updateImageDescription(index, e.target.value)}
                  className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="mt-1 text-xs text-gray-500">
                {imageFile.file.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};