export interface Payments {
    id?: number;
    valor: number;
    meioPagamento: string;
    dataPagamento: string;
    recebido : boolean;
    observacoes : string;
    contratoId : number;
}