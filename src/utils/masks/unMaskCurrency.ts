export const unmaskCurrency = (value: string) => {
  if (!value) return 0;
  
  const sanitized = value.replace(/[^\d.,-]+/g, '');
  const withoutThousands = sanitized.replace(/\./g, '');
  const normalized = withoutThousands.replace(/,/g, '.');

  return parseFloat(normalized) || 0;
};


export const validationTypePayments = (value : string) =>{
  if(value === 'Pix')
    return 'PIX'
  else if (value === 'Cartão de Crédito')
    return 'CARTAO_CREDITO'
  else
    return 'CARTAO_DEBITO'
}