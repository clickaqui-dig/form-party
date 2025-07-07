export type ImageFile = {
    id?: number;
    descricao?: string;
    url?: string;
    file?: File;
    preview?: string;
    nomeArquivoOriginal: string;
  };
  
  export type Theme = {
    id?: number;
    descricao: string;
    observacoes: string;
    imagens: ImageFile[];
  };
  