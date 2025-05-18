export interface Customer {
  id: number;
  nome: string;
  celular: string;
  email: string;
  dataCadastro: string; 
  documento: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  status: boolean;
}

export interface CustomerForm {
  id: number;
  nome: string;
  celular: string;
  email: string;
  dataCadastro: string;
  documento: string;
  cep: string;
  endereco: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  state: boolean;
}

export const mapFormToCustomer = ({
  state,
  ...rest
}: CustomerForm): Customer => ({
  ...rest,
  status: state,
});

export const mapCustomerToForm = ({
  status,
  ...rest
}: Customer): CustomerForm => ({
  ...rest,
  state: status,
});