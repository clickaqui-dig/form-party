import api from '@/config/apiConfig';
import { BirthDayPerson } from '@/models/BirthDayPerson';

export const postBirthDayPerson = async (body: BirthDayPerson): Promise<boolean> => {
        try {
        await api.post(`/aniversariante`, body);

        return true;
    } catch (error) {
        console.log("Error ao criar Aniversariante: ", error);
        return false;
    }
} 