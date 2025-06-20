export const subtrairDias = (dataString: string, dias: number): string => {
    const data = new Date(dataString); // Converte o texto para um objeto Date
    data.setDate(data.getDate() - dias); // Subtrai a quantidade de dias

    // Formata a nova data
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro é 0
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
};

export const calcularDuracao = (dataInicial: string, dataFinal: string): string => {
    const inicio = new Date(dataInicial).getTime(); // Milissegundos da data inicial
    const fim = new Date(dataFinal).getTime(); // Milissegundos da data final

    const diferencaMs = fim - inicio; // Diferença em milissegundos
    const diferencaMinutos = Math.floor(diferencaMs / (1000 * 60)); // Convertendo para minutos
    const horas = Math.floor(diferencaMinutos / 60); // Horas completas
    const minutos = diferencaMinutos % 60; // Minutos restantes

    // return `${horas}h ${minutos}m`; // Formata a duração
    return `${horas}`; // Formata a duração
};


export const formatarData = (dataString: string): string => {
    const data = new Date(dataString); // Converte a string para um objeto Date
    const dia = String(data.getDate()).padStart(2, "0"); // Garante 2 dígitos (ex: 05 em vez de 5)
    const mes = String(data.getMonth() + 1).padStart(2, "0"); // Janeiro é 0, então soma 1
    const ano = data.getFullYear();
    const horas = String(data.getHours()).padStart(2, "0");
    const minutos = String(data.getMinutes()).padStart(2, "0");

    return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
};