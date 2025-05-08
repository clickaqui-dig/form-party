import { Customer } from "@/models/Customer";
import api from '@/config/apiConfig';

const URL = 'http://localhost:8080';

export const postCustomer = async (body: Customer): Promise<boolean> => {
        try {
        await api.post(`${URL}/cliente`, body);

        return true;
    } catch (error) {
        console.log("Error ao criar Cliente: ", error);
        return false;
    }
} 