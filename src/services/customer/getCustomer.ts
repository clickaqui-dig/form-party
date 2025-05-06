<<<<<<< HEAD
import { buildQueryParams } from '@/utils/builders/buildQueryParams';
import api from '../../config/apiConfig';
import { Customer } from '@/models/Customer';

=======
import { Customer } from "@/models/Customer";
import { buildQueryParams } from "@/utils/builders/buildQueryParams";
import api from '@/config/apiConfig';

const URL = 'http://localhost:8080';
>>>>>>> 647d27afedf7d83900eb7a48e5fce2f80afd22fd

interface RequestCustomer {
    page: number,
    limit: number,
}

interface ResponseCustomer {
    total: number,
    page: number,
    limit: number,
    data: Array<Customer>,
}

export const getCustomer = async(
    {
    page, limit
}: RequestCustomer
): Promise<ResponseCustomer
    | null> => {
    try {
        const query = buildQueryParams({ page, limit });

<<<<<<< HEAD
        const response = await api.get(`/cliente`);
=======
        const response = await api.get(`${URL}/cliente`);
>>>>>>> 647d27afedf7d83900eb7a48e5fce2f80afd22fd

        return response.data;
    } catch (error) {
        console.log("Error ao buscar Clientes: ", error);
        return null;
    }
}