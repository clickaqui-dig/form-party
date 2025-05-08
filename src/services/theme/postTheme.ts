import api from '@/config/apiConfig';
import { Theme } from "@/models/Theme";

const URL = 'http://localhost:8080';

export const postTheme = async (body: Theme): Promise<boolean> => {
        try {
        console.log("post theme", body)    
        const response = await api.post(`${URL}/tema`, body);

        console.log("post theme response", response)     
        return true;
    } catch (error) {
        console.log("Error ao criar tema: ", error);
        return false;
    }
} 