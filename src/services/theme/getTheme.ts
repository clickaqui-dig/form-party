import api from '@/config/apiConfig';

/**
 * Busca temas por descrição no backend com paginação
 * @param descricao Texto a ser pesquisado
 * @param page Página atual (começa do 0)
 * @param size Quantidade por página
 * @returns Dados da página, array de temas e info de paginação
 */
export const getThemesByDescription = async (
  descricao: string,
  page = 0,
  size = 10
) => {
  try {
    const response = await api.get(`/tema`, {
      params: { descricao, page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar temas:', error);
    throw error;
  }
};