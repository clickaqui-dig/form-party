export const maskCurrencyWithLimit = (value: string, maxValue: number = Infinity) => {
  // Remove caracteres não numéricos
  let numericValue = value.replace(/\D/g, "");
  
  // Converte para número (em centavos)
  const cents = parseInt(numericValue || "0", 10);
  
  // Converte o valor máximo para centavos
  const maxCents = maxValue * 100;
  
  // Limita o valor ao máximo definido
  const limitedCents = Math.min(cents, maxCents);
  
  // Converte de volta para string
  numericValue = limitedCents.toString();
  
  return numericValue
    .replace(/^0+/, "") // Remove zeros à esquerda
    .padStart(3, "0") // Garante pelo menos 3 dígitos (1 real = 100 centavos)
    .replace(/(\d)(\d{2})$/, "$1,$2") // Adiciona vírgula antes dos 2 últimos dígitos
    .replace(/(?=(\d{3})+(\D))/g, ".") // Adiciona ponto a cada 3 dígitos
    .replace(/^\./, "") // Remove ponto no início, se houver
    .replace(/^/, "R$ "); // Adiciona o símbolo R$
};