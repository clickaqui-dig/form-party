import api from '@/config/apiConfig';

/**
 * Busca itens de contrato por descrição no backend, com paginação
 * @param descricao Texto a ser pesquisado
 * @param page Página atual (começa do 0)
 * @param size Quantidade por página
 * @returns Objeto padrão Page ({content, last, number...})
 */
export const getItemContract = async (
  descricao: string,
  page: number = 0,
  size: number = 10
) => {
  try {
    const response = await api.get(`/item-contrato`, {
      params: { descricao, page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Item:', error);
    throw error;
  }
};