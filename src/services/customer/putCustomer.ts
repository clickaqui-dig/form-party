import { Customer } from "@/models/Customer";
import axios from "axios";

const URL = 'http://localhost:3001';

interface RequestCustomer {
    id: number,
    body: Customer,
}

export const putCustomer = async ({ id, body }: RequestCustomer): Promise<boolean> => {
            try {
        await axios.put(`${URL}/customers/${id}`, body);

        return true;
    } catch (error) {
        console.log("Error ao atualizar o Cliente: ", error);
        return false;
    }
}