import { Customer } from "@/models/Customer";
import api from '@/config/apiConfig';

interface RequestCustomer {
    id: number,
}

export const getCustomerById = async(
    {id}
        : RequestCustomer): Promise<Customer | null> => {
        try {

        const response = await api.get(`/cliente/${id}`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar Cliente por id: ", error);
        return null;
    }
}