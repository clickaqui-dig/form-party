import api from '@/config/apiConfig';
import { Theme } from "@/models/Theme";

const URL = 'http://localhost:8080';

export const postTheme = async (body: Theme): Promise<boolean> => {
        try {
        await api.post(`${URL}/tema`, body);

        return true;
    } catch (error) {
        console.log("Error ao criar tema: ", error);
        return false;
    }
} 