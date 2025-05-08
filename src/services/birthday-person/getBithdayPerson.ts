import api from '@/config/apiConfig';

const URL = 'http://localhost:8080';

/**
 * Busca temas por descrição no backend
 * @param nome Texto a ser pesquisado
 * @returns Lista de temas correspondentes
 */
export const getBithDayPersonbyName = async (nome: string) => {
    try {   
        const response = await api.get(`${URL}/aniversariante/nome/${nome}`);
        return response.data.content; 
    } catch (error) {
        console.error('Erro ao buscar Aniversariante:', error);
        throw error;
    }
};