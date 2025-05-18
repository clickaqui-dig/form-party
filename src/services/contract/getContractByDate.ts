import api from "@/config/apiConfig";

export const getContractByDate = async (dataHoraInicial: string, dataHoraFinal: string) => {
    try {
        const params = {
            page: 0,
            size: 1,
            dataHoraInicial,
            dataHoraFinal
        };
        const response = await api.get(`/contrato`, { params });
        return response.data.content; 
    } catch (error) {
        console.log("Erro ao buscar contratos na data/hora: ", error);
        return [];
    }
};