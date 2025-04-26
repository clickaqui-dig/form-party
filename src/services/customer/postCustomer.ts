import { Customer } from "@/models/Customer";
import api from '@/config/apiConfig';

const URL = 'http://localhost:3001';

export const postCustomer = async (body: Customer): Promise<boolean> => {
        try {
        await api.post(`${URL}/customers`, body);

        return true;
    } catch (error) {
        console.log("Error ao criar Cliente: ", error);
        return false;
    }
} 