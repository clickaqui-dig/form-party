import api from "@/config/apiConfig";

const URL = 'http://localhost:8080';

export const getCustomerByName = async ({ nome }: { nome: string }) => {
  try {
    const response = await api.get(`${URL}/cliente/nome/${nome}`);
    return response.data; // Supondo que o backend retorna os dados no padrão `Page`
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    throw error;
  }
};