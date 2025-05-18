import api from "@/config/apiConfig";
import { ContractRequest, ContractResponse } from "@/models/Contract";

export const putContractById = async (id: number, body: ContractRequest): Promise<ContractResponse | boolean> => {
    try {
        const response = await api.put(`/contrato/${id}`, body);

        return true;
    } catch (error) {
        console.log("Error ao atualizar contrato: ", error);
        return false;
    }
}