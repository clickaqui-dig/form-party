import api from '@/config/apiConfig';
import { Payments } from "@/models/Payments";

const URL = 'http://localhost:8080';

export const postPayments = async (id: number , body: Payments): Promise<boolean> => {
        try {
        await api.post(`${URL}/pagamento/${id}`, body);

        return true;
    } catch (error: any) {
        console.log("Error ao cadasatrar pagamento: ", error);
        alert(`${error.response.data}`)
        return false;
    }
} 