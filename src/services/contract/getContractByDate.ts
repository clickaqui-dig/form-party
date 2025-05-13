import api from "@/config/apiConfig";

const URL = 'http://localhost:8080';

export const getContractByDate = async (dataHoraInicial: string) => {
    try {
        const params = {
            page: 0,
            size: 1,
            dataHoraInicial
        };
        const response = await api.get(`${URL}/contrato`, { params });
        return response.data.content; // lista dos contratos encontrados
    } catch (error) {
        console.log("Erro ao buscar contratos na data/hora: ", error);
        return [];
    }
};