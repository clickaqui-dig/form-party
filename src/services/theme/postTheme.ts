import api from '@/config/apiConfig';
import { Theme } from "@/models/Theme";

export const postTheme = async (body: Theme): Promise<boolean> => {
        try { 
        const response = await api.post(`/tema`, body);

        console.log("post theme response", response)     
        return true;
    } catch (error) {
        console.log("Error ao criar tema: ", error);
        return false;
    }
} 