import { ImageFile } from "./ImageFile";

export interface Theme {
  id?: number;
  descricao: string;
  observacoes: string;
  imagens: Array<ImageFile>;
}