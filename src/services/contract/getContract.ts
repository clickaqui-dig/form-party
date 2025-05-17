import api from "@/config/apiConfig";

interface RequestContract {
    page: number,
    limit: number,
    search?: string,
}

interface ResponseContract {
    total: number,
    page: number,
    limit: number,
    data: Array<any>,
}

export const getContract = async(
    {
        page,
        limit,
        search = ""
    }: RequestContract
): Promise<ResponseContract | null> => {
    try {
        const params: any = {
            page: (page > 0 ? page - 1 : 0), 
            size: limit,
        };
        if (search) params.nome = search; 

        const response = await api.get(`/contrato`, { params });

        // Adaptar Page Spring para o front
        const backend = response.data;
        return {
            total: backend.totalElements,
            page: backend.number + 1,         
            limit: backend.size,
            data: backend.content,
        };
    } catch (error) {
        console.log("Error ao buscar contratos: ", error);
        return null;
    }
}