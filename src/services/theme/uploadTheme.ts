import api from '@/config/apiConfig';

interface ImageFile {
  file: File;
  preview: string;
  descricao?: string;
}

export const uploadThemeImages = async (themeId: number, images: ImageFile[]) => {
  const uploadPromises = images.map(async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile.file);
    
    if (imageFile.descricao) {
      formData.append('descricao', imageFile.descricao);
    }

    const response = await api.post(`/tema/${themeId}/uploadImage`, formData);


    if (!response) {
      throw new Error(`Erro ao fazer upload da imagem: ${imageFile.file.name}`);
    }

    return response;
  });

  return Promise.all(uploadPromises);
};