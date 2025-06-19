/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/config/apiConfig';
import { ItemContract } from '@/models/ItemContract';

export const postItemContract = async (body: ItemContract): Promise<any> => {
    try {
        const res =   await api.post(`/item-contrato`, body);
        return res;
    } catch (error) {
        console.log("Error ao criar Item: ", error);
        return false;
    }
} 