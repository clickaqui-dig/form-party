import api from '@/config/apiConfig';

interface RequestCustomer {
    id: number,
}

export const deleteCustomer = async ({ id }: RequestCustomer): Promise<boolean> => {
    try {
        await api.delete(`${URL}/customers/${id}`);

        return true;
    } catch (error) {
        console.log("Error ao delete o Cliente: ", error);
        return false;
    }
}