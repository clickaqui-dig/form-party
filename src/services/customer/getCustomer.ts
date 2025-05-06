import { Customer } from "@/models/Customer";
import { buildQueryParams } from "@/utils/builders/buildQueryParams";
import api from '@/config/apiConfig';

const URL = 'http://localhost:8080';

interface RequestCustomer {
    page: number,
    size: number,
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface ResponseCustomer {
    total: number,
    totalPages: number,
    totalElements: number,
    pageable: Pageable,
    content: Array<Customer>,
}

export const getCustomer = async(
    {
    page, size
}: RequestCustomer
): Promise<ResponseCustomer
    | null> => {
    try {
        const query = buildQueryParams({ page, size });

        const response = await api.get(`${URL}/cliente${query}`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar Clientes: ", error);
        return null;
    }
}