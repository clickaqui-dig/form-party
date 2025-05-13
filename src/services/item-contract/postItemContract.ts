import api from '@/config/apiConfig';
import { ItemContract } from '@/models/ItemContract';

const URL = 'http://localhost:8080';

export const postItemContract = async (body: ItemContract): Promise<boolean> => {
        try {
        await api.post(`${URL}/item-contrato`, body);

        return true;
    } catch (error) {
        console.log("Error ao criar Item: ", error);
        return false;
    }
} 