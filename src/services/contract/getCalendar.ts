/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/config/apiConfig";
import { buildQueryParams } from "@/utils/builders/buildQueryParams";

interface RequestCalendar {
    page: number,
    size: number,
}

export const getCalendar = async (
    { page, size }
        : RequestCalendar):
    Promise<any | null> => {
    const query = buildQueryParams({ page, size });
    
    const response = await api.get(`/contrato/calendario${query}`);

    return response.data;
}