import { Customer } from "@/models/Customer";
import api from '@/config/apiConfig';

const URL = 'http://localhost:8080';

interface RequestCustomer {
    id: number,
    body: Customer,
}

export const putCustomer = async ({ id, body }: RequestCustomer): Promise<boolean> => {
    try {
        await api.put(`${URL}/cliente/${id}`, body);

        return true;
    } catch (error) {
        console.log("Error ao atualizar o Cliente: ", error);
        return false;
    }
}