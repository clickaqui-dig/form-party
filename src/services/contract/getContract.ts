import { Contract } from "@/app/(admin)/(others-pages)/(contract)/search-contract/page";
import { buildQueryParams } from "@/utils/builders/buildQueryParams";
import axios from "axios";

const URL = 'http://localhost:3001';

interface RequestContract {
    page: number,
    limit: number,
    search?: string,
}

interface ResponseContract {
    total: number,
    page: number,
    limit: number,
    data: Array<Contract>,
}

export const getContract = async(
    {
    page, 
    limit,
    search = ""
}: RequestContract
): Promise<ResponseContract | null> => {
    try {
        const query = buildQueryParams({ page, limit, search });

        const response = await axios.get(`${URL}/contracts${query}`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar contratos: ", error);
        return null;
    }
}