import { ImageFile } from "@/features/theme";

export async function urlToImageFile(
  url: string,
  opts: { id?: number; descricao?: string; nomeArquivo: string },
): Promise<ImageFile> {
  try {
   
    return { id: opts.id, url, preview:url, descricao: opts.descricao, nomeArquivoOriginal: opts.nomeArquivo, isNew: false };
  } catch {
    return { id: opts.id, url, preview: `blob:${url}`, descricao: opts.descricao, nomeArquivoOriginal: opts.nomeArquivo, isNew: false };
  }
}
