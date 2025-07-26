import api from '@/config/apiConfig';
import { ImageFile, Theme } from '@/features/theme/types';
import { PaginatedResponse } from '@/hooks/usePaginatedSearch';

const CONCURRENCY = 3;

type ThemePage = PaginatedResponse<Theme>;

export async function fetchThemes(
  descricao: string,
  page: number = 0,
  size: number = 10): Promise<PaginatedResponse<Theme>> {
  const { data } = await api.get<ThemePage>('/tema', {
    params: { descricao, page, size }
  });
  return {
    content: data.content,
    page,
    totalElements: data.totalElements,
    limit: 10,
    last: data.last
  };
}

export async function fetchTheme(id: number): Promise<Theme> {
  const { data } = await api.get<Theme>(`/tema/${id}`);
  return data;
}

export async function createTheme(body: Theme): Promise<Theme> {
  const { data } = await api.post<Theme>('/tema', body);
  return data;
}

export async function uploadThemeImages(
    themeId: number,
    images: ImageFile[],
    onProgress?: (percent: number, index: number) => void
  ) {

    const uploadOne = async (img: ImageFile, index: number) => {
      if (!img.file) return;

      const fd = new FormData();
      fd.append('file', img.file);
      if (img.descricao) fd.append('descricao', img.descricao);

      await api.post(`/tema/${themeId}/uploadImage`, fd, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          if (onProgress && e.total) {
            const pct = Math.round((e.loaded * 100) / e.total);
            onProgress(pct, index);
          }
        },
      });
    };

    for (let i = 0; i < images.length; i += CONCURRENCY) {
      const slice = images.slice(i, i + CONCURRENCY);
      await Promise.all(slice.map((img, k) => uploadOne(img, i + k)));
    }
}

export async function deleteThemeImages(id: number): Promise<Theme> {
    const { data } = await api.delete<Theme>(`tema/images/${id}`);
    return data;
  }
