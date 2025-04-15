import { Customer } from "@/models/Customer";
import axios from "axios";

const URL = 'http://192.168.0.7:3001';

interface RequestCustomer {
    id: number,
}


export const getCustomerById = async(
    {id}
        : RequestCustomer): Promise<Customer | null> => {
        try {

        const response = await axios.get(`${URL}/customers/${id}`);

        return response.data;
    } catch (error) {
        console.log("Error ao buscar Cliente por id: ", error);
        return null;
    }
}