/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/config/apiConfig';
import { ItemContract } from '@/features/itemContract/types';
import { PaginatedResponse } from '@/hooks/usePaginatedSearch';
import { number } from 'yup';

type ItemContractPage = PaginatedResponse<ItemContract>;

export const getItemContract = async (
  descricao: string,
  page: number = 0,
  size: number = 10
): Promise<PaginatedResponse<ItemContract>> => {
    const { data } = await api.get<ItemContractPage>(`/item-contrato`, {
      params: { descricao, page, size }
    });
    return {
      content: data.content,
      page,
      totalElements: data.totalElements,
      limit: 10,
      last: data.last,
      number: data.number
    };
};

export const getItemContractById = async (
 id: number
) => {
  try {
    const response = await api.get(`/item-contrato/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Item:', error);
    throw error;
  }
};

export const postItemContract = async (body: ItemContract): Promise<any> => {
    try {
        const res = await api.post(`/item-contrato`, body);
        return res;
    } catch (error) {
        console.log("Error ao criar Item: ", error);
        return false;
    }
}

export const putItemContract = async (id: number, body: ItemContract): Promise<any> => {
  try {
      const res =   await api.put(`/item-contrato/${id}`, body);
      return res;
  } catch (error) {
      console.log("Error ao criar Item: ", error);
      return false;
  }
}
