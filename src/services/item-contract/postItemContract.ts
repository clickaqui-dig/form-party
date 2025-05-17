import api from '@/config/apiConfig';
import { ItemContract } from '@/models/ItemContract';

export const postItemContract = async (body: ItemContract): Promise<boolean> => {
    try {

        await api.post(`/item-contrato`, body);

        return true;
    } catch (error) {
        console.log("Error ao criar Item: ", error);
        return false;
    }
} 