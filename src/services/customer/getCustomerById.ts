import api from "@/config/apiConfig";
import { Customer } from "@/models/Customer";
<<<<<<< HEAD
=======
import api from '@/config/apiConfig';

const URL = 'http://localhost:3001';
>>>>>>> 647d27afedf7d83900eb7a48e5fce2f80afd22fd

interface RequestCustomer {
    id: number,
}


export const getCustomerById = async(
    {id}
        : RequestCustomer): Promise<Customer | null> => {
        try {

<<<<<<< HEAD
        const response = await api.get(`/cliente/${id}`);
=======
        const response = await api.get(`${URL}/customers/${id}`);
>>>>>>> 647d27afedf7d83900eb7a48e5fce2f80afd22fd

        return response.data;
    } catch (error) {
        console.log("Error ao buscar Cliente por id: ", error);
        return null;
    }
}