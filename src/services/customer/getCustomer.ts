import { buildQueryParams } from '@/utils/builders/buildQueryParams';
import api from '../../config/apiConfig';
import { Customer } from '@/models/Customer';


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

        const response = await api.get(`/cliente`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar Clientes: ", error);
        return null;
    }
}