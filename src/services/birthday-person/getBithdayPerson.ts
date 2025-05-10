import api from '@/config/apiConfig';

const URL = 'http://localhost:8080';

export const getBirthDayPersonbyName = async (
  nome: string,
  page: number = 0,
  size: number = 10
) => {
  try {
    const response = await api.get(`${URL}/aniversariante`, {
      params: { nome, page, size }
    });
    return response.data; // padrão Page: {content, totalElements, totalPages, number, last...}
  } catch (error) {
    console.error('Erro ao buscar Aniversariante:', error);
    throw error;
  }
};