import { ImageFile } from "@/features/theme";

export async function urlToImageFile(
    url: string,
    opts: { id?: number; descricao?: string; nomeArquivo: string },
  ): Promise<ImageFile> {
    try {
      const proxied = `/api/proxy-image?url=${encodeURIComponent(url)}`;
      const resp = await fetch(proxied);
      if (!resp.ok) throw new Error('proxy error');
      const blob = await resp.blob();
      const file = new File([blob], opts.nomeArquivo, { type: blob.type });
      const preview = URL.createObjectURL(blob);
      return { id: opts.id, url, file, preview, descricao: opts.descricao, nomeArquivoOriginal: opts.nomeArquivo };
    } catch (err) {
    console.log(err)
      return { id: opts.id, url, preview: url, descricao: opts.descricao, nomeArquivoOriginal: opts.nomeArquivo };
    }
  }