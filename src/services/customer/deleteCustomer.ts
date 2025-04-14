import axios from "axios";

interface RequestCustomer {
    id: number,
}

export const deleteCustomer = async ({ id }: RequestCustomer): Promise<boolean> => {
    try {
        await axios.delete(`${URL}/customers/${id}`);

        return true;
    } catch (error) {
        console.log("Error ao delete o Cliente: ", error);
        return false;
    }
}