/* eslint-disable @typescript-eslint/no-explicit-any */
import api from '@/config/apiConfig';

interface LoginRequest {
    email: string,
    password: string,
}

interface LoginResponse {
    token: string
}

export const handleLogin = async (body: LoginRequest): Promise<LoginResponse| any> => {
    return await api.post(`/auth/login`, body);
}