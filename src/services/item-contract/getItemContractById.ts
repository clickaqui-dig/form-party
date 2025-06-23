/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/config/apiConfig';

export const getItemContractById = async (
 id: any
) => {
  try {
    const response = await api.get(`/item-contrato/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Item:', error);
    throw error;
  }
};