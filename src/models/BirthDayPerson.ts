import { Theme } from "./Theme";

export interface BirthDayPerson {
  id?: number;
  nome?: string;
  dataNascimento: string;
  idade: number;
  idadeNoEvento: number;
  tema: Theme | number | null;
}