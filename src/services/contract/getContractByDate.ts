import api from "@/config/apiConfig";

export const getContractByDate = async (dataHoraInicial: string) => {
    try {
        const params = {
            page: 0,
            size: 1,
            dataHoraInicial
        };
        const response = await api.get(`/contrato`, { params });
        return response.data.content; 
    } catch (error) {
        console.log("Erro ao buscar contratos na data/hora: ", error);
        return [];
    }
};