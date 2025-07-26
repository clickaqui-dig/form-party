/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/config/apiConfig';
import { Payments } from "@/models/Payments";

export interface ResponsePayments {
    id: number;
    valor: number
    meioPagamento: string
    dataPagamento: string
    recebido: boolean
    observacoes: string
    contratoId: number
}

export const postPayments = async (id: number, body: Payments[]): Promise<ResponsePayments[]> => {
    try {
        const payments : ResponsePayments[] = await api.post(`/pagamento/${id}`, body);

        return payments;
    } catch (error: any) {
        console.log("Error ao cadasatrar pagamento: ", error);
        return [];
    }
} 