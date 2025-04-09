import axios from "axios";

const URL = "https://viacep.com.br";

export interface CepResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    unidade: string;
    bairro: string;
    localidade: string;
    uf: string;
    estado: string;
    regiao: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

export interface CepResponseError {
    erro: boolean
}

export const searchCep = async(
    cep: number
): Promise<CepResponse | CepResponseError | null> => {
    try {
        const response = await axios.get(`${URL}/ws/${cep}/json/`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar CEP: ", error);
        return null;
    }
}