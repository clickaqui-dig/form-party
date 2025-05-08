import api from '@/config/apiConfig';
import { Contract } from '@/models/Contract';


const URL = 'http://localhost:8080';

export const postContract = async (body: Contract): Promise<boolean> => {
        try {
        await api.post(`${URL}/contrato`, body);

        return true;
    } catch (error) {
        console.log("Error ao criar Contrato: ", error);
        return false;
    }
} 