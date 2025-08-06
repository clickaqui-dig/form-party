import { jwtDecode } from 'jwt-decode';


interface JWTPayload {
  userType?: string;
  roles?: string[];
  type?: string;
  userId?: string;
  email?: string;
  exp?: number;
  iat?: number;
}

export const decodeToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwtDecode<any>(token);
    return decoded;
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};

export const getUserTypeFromToken = (token: string): JWTPayload => {
  const decoded = decodeToken(token);
  if (!decoded) return {};

  return decoded;
};

export const isTokenValid = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) return false;
  
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};