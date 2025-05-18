/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ContractForm {
    idForm: number;
    situacao: string;
    nomeCliente: string;
    celularCliente: string;
    emailCliente: string;
    documento: string;
    cep: string;
    endereco: string;
    numero: string;
    cidade: string;
    uf: string;
    status: boolean;
    valorRecebido: number;
    valorPendente: number;
    valorTotal: number;
    tipoDoContrato: string;
    dataHoraInicial: string;
    dataHoraFinal: string;   
    duracao: number;
    quantidadeConvidados: number;
    observacoes: string;
    listaAniversariantes: string[];
    itensContrato: any[];
    tipoPagemento: string[];
    pagamentos: any[];
    desconto: number;
    acrescimo: number;
  }
  