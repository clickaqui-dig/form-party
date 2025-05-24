export const maskCurrency = (value: string | number | null | undefined): string => {
  if (value === null || value === undefined) return 'R$ 0,00';
  const digitsOnly =
    typeof value === 'number'
      ? String(value).replace(/\D/g, '')
      : value.replace(/\D/g, '');

  if (digitsOnly.length === 0) return 'R$ 0,00';

  const number = parseInt(digitsOnly, 10) / 100;

  return number.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
