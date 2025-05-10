import { Contract } from "@/app/(admin)/(others-pages)/(contract)/search-contract/page";
import axios from "axios";

const URL = 'http://localhost:3001';

interface RequestContract {
    id: number,
}

export const getContractById = async ({ id }: RequestContract): Promise<Contract | null> => {
    try {
        const response = await axios.get(`${URL}/contracts/${id}`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar contrato por id: ", error);
        return null;
    }
}