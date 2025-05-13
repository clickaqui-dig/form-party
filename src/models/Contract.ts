export interface Contract {
    id?: number;
    cliente: number;
    valorRecebido: number;
    valorPendente: number;
    valorTotal: number;
    tipoDoContrato: string;
    dataHoraInicial: string;
    dataHoraFinal: string;
    duracao: number;
    quantidadeConvidados: number;
    observacoes: string;
    desconto: number;
    acrescimo: number;
    itensContrato: number[];
    listaAniversariantes: number[];
}