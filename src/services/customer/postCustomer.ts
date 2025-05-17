import { Customer } from "@/models/Customer";
import api from '@/config/apiConfig';

export const postCustomer = async (body: Customer): Promise<boolean> => {
        try {
        await api.post(`/cliente`, body);

        return true;
    } catch (error: any) {
        console.log("Error ao criar Cliente: ", error);
        alert(`${error.response.data}`)
        return false;
    }
} 