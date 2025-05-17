import api from '@/config/apiConfig';

export const getBirthDayPersonbyName = async (
  nome: string,
  page: number = 0,
  size: number = 10
) => {
  try {
    const response = await api.get(`/aniversariante`, {
      params: { nome, page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Aniversariante:', error);
    throw error;
  }
};