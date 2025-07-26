import api from "@/config/apiConfig";

export const putSituationById = async (id: number, situacao: string): Promise<boolean> => {
    try {
        await api.put(`/contrato/${id}/situacao/${situacao}`);
        return true;
    } catch (error) {
        console.log("Error ao atualizar situação contrato: ", error);
        return false;
    }
}