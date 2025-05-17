export const unmaskCurrency = (value: string) => {
  // Remove o símbolo da moeda (R$), pontos, espaços e substitui vírgula por ponto
  const numericValue = value
    .replace(/R\$\s*/g, "") // Remove R$ e espaços após
    .replace(/\./g, "") // Remove pontos (separadores de milhar)
    .replace(/,/g, "."); // Substitui vírgula por ponto (para decimal)
  
  // Converte para número (float)
  return parseFloat(numericValue || "0");
};