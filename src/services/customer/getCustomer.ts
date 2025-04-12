import { Customer } from "@/app/(admin)/(others-pages)/(customers)/search-customer/page";
import { buildQueryParams } from "@/utils/builders/buildQueryParams";
import axios from "axios";

const URL = 'http://localhost:3001';

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

        const response = await axios.get(`${URL}/customers${query}`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar CEP: ", error);
        return null;
    }
}