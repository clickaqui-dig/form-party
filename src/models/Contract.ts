/* eslint-disable @typescript-eslint/no-explicit-any */

import { BirthDayPerson } from "./BirthDayPerson";
import { Customer } from "./Customer";
import { ItemContract } from "./ItemContract";
import { Payments } from "./Payments";
import { Theme } from "./Theme";

export interface ContractResponse {
  id: number;
  cliente: Customer;
  valorRecebido: number;
  valorPendente: number;
  valorTotal: number;
  tipoDoContrato: string;
  dataHoraInicial: string;
  dataHoraFinal: string;
  duracao: number;
  quantidadeConvidados: string | number;
  observacoes: string;
  desconto: number;
  acrescimo: number;
  situacao: string;
  dataCadastro: string;
  dataAtualizacao: string;
  temas: Theme[] | null;
  itensContrato: ItemContract[];
  listaAniversariantes: BirthDayPerson[];
  pagamentos: Payments[];
}


export interface ContractRequest {
  cliente: number;
  valorRecebido: number;
  valorPendente: number;
  valorTotal: number;
  tipoDoContrato: string;
  dataHoraInicial: string;
  dataHoraFinal: string;
  duracao: number;
  quantidadeConvidados: string | number;
  observacoes: string;
  aniversariantes: any[];
  itensContrato: number[];
  desconto: number;
  acrescimo: number;
  situacao: string;
  temas: any[];
}

export interface ContractForm {
  idContrato: number;
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
  aniversariantes: aniversariante[];
  itensContrato: any[];
  payments: any[];
  desconto: number;
  acrescimo: number;
  situacao: string;
  temas: any[];
}
interface aniversariante {
  nomeAniversariante: string;
  idade: string;
  idadeNoEvento: string;
}

export const mapContractFormToRequest = (
  values: ContractForm,
  clienteId: number
): ContractRequest => ({
  cliente: clienteId,
  valorRecebido: Number(values.valorRecebido) || 0,
  valorPendente: Number(values.valorPendente) || 0,
  valorTotal: Number(values.valorTotal),
  tipoDoContrato: "ANIVERSARIO",
  dataHoraInicial: values.dataHoraInicial,
  dataHoraFinal: values.dataHoraFinal,
  duracao: Number(values.duracao),
  quantidadeConvidados: values.quantidadeConvidados,
  observacoes: values.observacoes || '',
  aniversariantes: mapAniversariantes(values.aniversariantes),
  itensContrato: values.itensContrato.map((i) => i.id),
  desconto: Number(values.desconto) || 0,
  acrescimo: Number(values.acrescimo) || 0,
  situacao: values.situacao,
  temas: values.temas.map((i) => i.id)
});

export const mapAniversariantes = (value: any): aniversariante[] => {
  const aniversariante = value.map((x: any) =>{
    return { nome: x.nome,
    idade: x.idade,
    idadeNoEvento: x.idadeNoEvento}
  })
  return aniversariante;
};