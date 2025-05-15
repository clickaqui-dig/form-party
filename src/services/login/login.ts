/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/config/apiConfig';

const URL = 'http://localhost:8080/auth';

interface LoginRequest {
    email: string,
    password: string,
}

interface LoginResponse {
    token: string
}

export const handleLogin = async (body: LoginRequest): Promise<LoginResponse| any> => {
    return await api.post(`${URL}/login`, body);
}