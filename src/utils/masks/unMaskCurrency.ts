export const unmaskCurrency = (
  value: string | number | null | undefined,
): number => {
  if (value === null || value === undefined || value === '') return 0;
  if (typeof value === 'number') return value;

  let raw = value.replace(/[\s\u00A0]|[A-Za-z$€£R]/g, '');

  raw = raw.replace(/[^\d,.\-]/g, '');

  if (raw === '') return 0;

  const lastComma = raw.lastIndexOf(',');
  const lastDot   = raw.lastIndexOf('.');
  const decPos    = Math.max(lastComma, lastDot);

  let intPart: string;
  let fracPart = '';

  if (decPos !== -1) {
    intPart = raw.slice(0, decPos).replace(/[.,]/g, '');
    fracPart = raw.slice(decPos + 1).replace(/[^\d]/g, '');
  } else {
    intPart = raw;
  }

  const numStr =
    decPos !== -1 ? `${intPart}.${fracPart}` : `${parseInt(intPart, 10) / 100}`;

  const num = parseFloat(numStr);
  return Number.isNaN(num) ? 0 : num;
};





export const validationTypePayments = (value : string) =>{
  if(value === 'Pix')
    return 'PIX'
  else if (value === 'Cartão de Crédito')
    return 'CARTAO_CREDITO'
  else
    return 'CARTAO_DEBITO'
}