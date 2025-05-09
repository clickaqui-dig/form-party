import api from '@/config/apiConfig';

const URL = 'http://localhost:8080';

/**
 * Busca temas por descrição no backend
 * @param descricao Texto a ser pesquisado
 * @returns Lista de temas correspondentes
 */
export const getItemContract = async (descricao: string) => {
    try {   
        const response = await api.get(`${URL}/item-contrato/descricao/${descricao}`);
        return response.data.content; 
    } catch (error) {
        console.error('Erro ao buscar Item:', error);
        throw error;
    }
};