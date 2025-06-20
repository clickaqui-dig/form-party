import { calcularDuracao, formatarData, subtrairDias } from "@/utils/masks";

export const sendMessageWhatsapp = async (values: any): Promise<void> => {
    try {
        const celularCliente = Number("55" + values.celularCliente.replace(/[\s()-]/g, ""));

        const itensContrato = values.itensContrato || [];

        const itensFormatados = itensContrato
            .map((item: any) => `- ${item.descricao.toUpperCase()}: R$ ${item.valor}`)
            .join("\n");

        // Mensagem padrão com itens do contrato
        const message = `
                    Olá ${values.nomeCliente}
        
Segue os dados do seu contrato:
        
Duração: Das ${formatarData(values.dataHoraInicial)} até ${formatarData(values.dataHoraFinal)} (${calcularDuracao(values.dataHoraInicial, values.dataHoraFinal)})
Número de convidados: ${values.quantidadeConvidados}
        
Itens do seu contrato:
${itensFormatados}
        
Total do contrato: R$ ${values.valorTotal}
Total pago: R$ ${values.valorRecebido}
Total a pagar: R$ ${values.valorPendente}
Se houver saldo em aberto, o mesmo deve ser quitado até o dia ${subtrairDias(values.dataHoraInicial, 10)}.
                `.trim();

        // Criar a URL do WhatsApp
        const url = `https://api.whatsapp.com/send?phone=${celularCliente}&text=${encodeURIComponent(message)}`;

        // // Abrir o link no navegador
        window.open(url, "_blank");


    } catch (error) {
        console.log("Error ao buscar CEP: ", error);

    }
}