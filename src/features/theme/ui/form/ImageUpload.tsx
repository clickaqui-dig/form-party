/* eslint-disable @next/next/no-img-element */
import { ImageFile } from "@/features/theme";
import { Upload, X } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface ImageUploadProps {
  images?: ImageFile[];
  onImagesChange(images: ImageFile[]): void;
  onRemoveImage?(id?: number): Promise<void> | void;
  maxImages?: number;
  acceptedTypes?: string[];
  isEdit?: boolean;
}

export const ImageUpload: FC<ImageUploadProps> = ({
  images = [],
  onImagesChange,
  onRemoveImage,
  maxImages = 5,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'],
  isEdit = false,
}) => {
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>(images);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => setSelectedImages(images), [images]);

  useEffect(() => {
    return () => {
      selectedImages.forEach((img) => {
        if (img.preview?.startsWith('blob:')) URL.revokeObjectURL(img.preview);
      });
    };
  }, [selectedImages]);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = maxImages - selectedImages.length;
    const toAdd = Array.from(files)
      .slice(0, remaining)
      .filter((f) => acceptedTypes.includes(f.type))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        nomeArquivoOriginal: file.name,
        isNew: true
      }));

    const updated = [...selectedImages, ...toAdd];
    setSelectedImages(updated);
    onImagesChange(updated);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (['dragenter', 'dragover'].includes(e.type)) setDragActive(true);
    if (e.type === 'dragleave') setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = async (index: number) => {
    const img = selectedImages[index];
    if (img.id && onRemoveImage) await onRemoveImage(img.id);
    const updated = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updated);
    onImagesChange(updated);
  };

  const updateDescription = (index: number, descricao: string) => {
    const updated = selectedImages.map((img, i) => (i === index ? { ...img, descricao } : img));
    setSelectedImages(updated);
    onImagesChange(updated);
  };

  return (
    <div className="space-y-4">
      {/* Área de upload */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
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
          onChange={(e) => handleFiles(e.target.files)}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={selectedImages.length >= maxImages}
        />

        <div className="space-y-2">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="text-sm text-gray-600">
            <span className="font-medium text-blue-600 hover:text-blue-500">Clique para fazer upload</span>{' '}
            ou arraste e solte
          </div>
          <p className="text-xs text-gray-500">PNG, JPG, WEBP até 10MB (máximo {maxImages})</p>
          <p className="text-xs text-gray-500">{selectedImages.length}/{maxImages} selecionadas</p>
        </div>
      </div>

      {/* Grid de imagens */}
      {selectedImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {selectedImages.map((img, index) => {
            console.log(img)
            const src = img.preview ?? img.url ?? '';
            const isPersisted = !!img.id;
            return (
              <div key={index} className="relative border rounded-lg p-3 bg-gray-50">
                {/* Thumb */}
                <div className="relative">
                  <img
                    src={src}
                    alt={img.descricao ?? `Imagem ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Descrição da imagem (opcional)"
                    value={img.descricao ?? ''}
                    onChange={(e) => updateDescription(index, e.target.value)}
                    disabled={isEdit && isPersisted}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div className="mt-1 text-xs text-gray-500">
                  {img.nomeArquivoOriginal}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
