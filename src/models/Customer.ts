export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    document: string;
    cep?: string;
    address?: string;
    number?: string;
    city?: string;
    uf?: string;
    state?: string;
}