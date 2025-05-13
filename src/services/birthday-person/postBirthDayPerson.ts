import api from '@/config/apiConfig';
import { BirthDayPerson } from '@/models/BirthDayPerson';

const URL = 'http://localhost:8080';

export const postBirthDayPerson = async (body: BirthDayPerson): Promise<boolean> => {
        try {
        await api.post(`${URL}/aniversariante`, body);

        return true;
    } catch (error) {
        console.log("Error ao criar Aniversariante: ", error);
        return false;
    }
} 