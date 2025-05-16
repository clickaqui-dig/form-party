import api from "@/config/apiConfig";
import { Contract } from "@/models/Contract";

const URL = 'http://localhost:8080';

interface RequestContract {
    id: number,
    body: Contract
}

export const putContractById = async (id: number, body: Contract): Promise<Contract | null> => {
    try {
        console.log("body put service ===>>", body)
        const response = await api.put(`${URL}/contrato/${id}`, body);

        return response.data;
    } catch (error) {
        console.log("Error ao atualizar contrato: ", error);
        return null;
    }
}