export const maskCurrencyFromUnits = (
    value: string | number | null | undefined,
  ): string => {
    if (value === null || value === undefined || value === '') return 'R$ 0,00';
  
    let num: number;
  
    if (typeof value === 'number') {
      num = value;
    } else {
      const normalized = value.trim().replace(',', '.').replace(/[^\d.]/g, '');
  
      num = parseFloat(normalized);
  
      if (Number.isNaN(num)) {
        const digitsOnly = normalized.replace(/\D/g, '');
        num = digitsOnly ? parseInt(digitsOnly, 10) : 0;
      }
    }
  
    return num.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };