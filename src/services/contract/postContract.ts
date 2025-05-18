import api from '@/config/apiConfig';
import { ContractRequest } from '@/models/Contract';

export const postContract = async (body: ContractRequest): Promise<any> => {
    try {
        const teste = await api.post(`/contrato`, body);

        return teste;
    } catch (error) {
        console.log("Error ao criar Contrato: ", error);
        return false;
    }
} 