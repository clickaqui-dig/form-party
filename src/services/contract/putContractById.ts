import api from "@/config/apiConfig";
import { Contract } from "@/models/Contract";

export const putContractById = async (id: number, body: Contract): Promise<Contract | null> => {
    try {
        const response = await api.put(`/contrato/${id}`, body);

        return response.data;
    } catch (error) {
        console.log("Error ao atualizar contrato: ", error);
        return null;
    }
}