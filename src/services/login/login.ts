/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const URL = 'http://localhost:8080/auth';

interface LoginRequest {
    email: string,
    password: string,
}

interface LoginResponse {
    token: string
}

export const handleLogin = async (body: LoginRequest): Promise<LoginResponse| any> => {
    try {
        const response =   await axios.post(`${URL}/login`, body);

        return response;
    } catch (error) {
        console.log("Error ao realizar o login: ", error);
        return error;
    }
}