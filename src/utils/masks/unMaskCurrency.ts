export const unmaskCurrency = (value: string) => {
  // Remove o símbolo da moeda (R$), pontos, espaços e substitui vírgula por ponto
  const numericValue = value
    .replace(/R\$\s*/g, "") // Remove R$ e espaços após
    .replace(/\./g, "") // Remove pontos (separadores de milhar)
    .replace(/,/g, "."); // Substitui vírgula por ponto (para decimal)
  
  // Converte para número (float)
  return parseFloat(numericValue || "0");
};


export const validationTypePayments = (value : string) =>{
  if(value === 'Pix')
    return 'PIX'
  else if (value === 'Cartão de Crédito')
    return 'CARTAO_CREDITO'
  else
    return 'CARTAO_DEBITO'
}