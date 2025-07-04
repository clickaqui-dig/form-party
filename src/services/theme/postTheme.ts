import api from '@/config/apiConfig';
import { Theme } from "@/models/Theme";

interface theme {
    id : number;
    descricao : string;
    observacao : string;
}

export const postTheme = async (body: Theme): Promise<theme | any> => {
        try { 
        const response = await api.post(`/tema`, body);

        console.log("post theme response", response)     
        return response.data;
    } catch (error) {
        console.log("Error ao criar tema: ", error);
        return false;
    }
} 