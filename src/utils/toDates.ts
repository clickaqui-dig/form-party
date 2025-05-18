import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function toLocalDateTime(dateLike: string | number | Date): string {
  const d = typeof dateLike === 'string' ? parseISO(dateLike) : new Date(dateLike);

  return format(d, "yyyy-MM-dd'T'HH:mm:ss");
}

export function formatDate(date: string): string {
    const dataISO = parseISO(date);
    const formated = format(dataISO, "dd/MM/yyyy", { locale: ptBR });
    return formated
}