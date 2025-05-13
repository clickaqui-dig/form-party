import { Contract } from "@/app/(admin)/(others-pages)/(contract)/search-contract/page";
import api from "@/config/apiConfig";
import axios from "axios";

const URL = 'http://localhost:8080';

interface RequestContract {
    id: number,
}

export const getContractById = async ({ id }: RequestContract): Promise<Contract | null> => {
    try {
        const response = await api.get(`${URL}/contrato/${id}`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar contrato por id: ", error);
        return null;
    }
}