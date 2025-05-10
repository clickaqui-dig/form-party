import api from "@/config/apiConfig";

const URL = 'http://localhost:8080';

export const getCustomerByName = async (
  nome: string,
  page: number = 0,
  size: number = 10
) => {
  try {
    const response = await api.get(`${URL}/cliente`, {
      params: { nome, page, size }
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    throw error;
  }
};