/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/config/apiConfig';
import { Payments } from "@/models/Payments";

export const postPayments = async (id: number, body: Payments[]): Promise<boolean> => {
    try {
        await api.post(`/pagamento/${id}`, body);

        return true;
    } catch (error: any) {
        console.log("Error ao cadasatrar pagamento: ", error);
        return false;
    }
} 