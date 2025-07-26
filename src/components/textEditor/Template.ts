/* eslint-disable @typescript-eslint/no-explicit-any */
import { formatBr } from "./utils/formatBr";

interface OneHtmlProps {
    header: HeaderHtmlProps;
    contractItem: ContractItemHtmlProps[];
    valueHtml: ValuesHtmlProps;
    installments: Installments[];
    clauseHtmlProps: ClauseHtmlProps;
    signatureHtmlProps: SignatureHtmlProps;
}

interface HeaderHtmlProps {
    nameClient: string;
    documentClient: string;
    street: string;
    number: string;
    city: string;
    state: string;
    cep: string;
    dateInit: string;
    dateEnd: string;
}

interface ContractItemHtmlProps {
    id: number;
    descricao: string;
    valor: number;
}


interface ValuesHtmlProps {
    addition: number;
    discount: number;
    valor: number;
    amountAlreadyPaid: number;
    amountToPay: number;
}

interface Installments {
    id: number;
    valor: string;
    meioPagamento: string;
    dataPagamento: string;
    recebido: boolean;
    observacoes?: string;
}

interface ClauseHtmlProps {
    birthday: any[];
    installments: Installments[]
    temas: any[];
}

interface SignatureHtmlProps {
    name: string;
}

const brDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR');

const toNumber = (valor: string) =>
    Number(valor);
const formatIso = (iso: string) => {
    const d = new Date(iso);
    const pad = (n: number) => n.toString().padStart(2, '0');

    const dia = pad(d.getDate());
    const mes = pad(d.getMonth() + 1);
    const ano = d.getFullYear();

    const horas = pad(d.getHours());
    const mins = pad(d.getMinutes());

    return {
        date: `${dia}/${mes}/${ano}`,
        time: `${horas}:${mins}h`,
    };
}

const formatBrl = (v: number) =>
    new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
    }).format(v);

const numCss = 'font-size:12px; white-space:nowrap; display:block; text-align:right;';

export const initialHtml = ({ header, contractItem, valueHtml, installments, clauseHtmlProps }: OneHtmlProps) => {
    // ----------- header
    const address = `${header.street} ${header.number} - CEP ${header.cep} na cidade de ${header.city}-${header.state}`;

    const inicio = formatIso(header.dateInit);
    const fim = formatIso(header.dateEnd);

    const dateSpan = `${inicio.date} das ${inicio.time} às ${fim.time}.`;

    // ----------- contractItem
    if (!contractItem.length) return '';

    const linhas = contractItem
        .map(
            (it) => `
          <tr>
            <td>
              <span style="font-size:12px;">${it.descricao}</span>
            </td>
            <td>
              <span style="font-size:12px;">${formatBrl(it.valor)}</span>
            </td>
          </tr>`,
        )
        .join('');

    const total = contractItem.reduce((s, it) => s + it.valor, 0);


    // ----------- installments
    const row = installments
        .map(
            (p, idx) => `
          <tr>
            <td><span style="font-size:12px;">${idx + 1}</span></td>
            <td><span style="font-size:12px;">${brDate(p.dataPagamento)}</span></td>
            <td><span style="font-size:12px;">${p.meioPagamento}</span></td>
            <td><span style="font-size:12px;">${p.recebido ? 'Sim' : 'Não'}</span></td>
            <td style="text-align:right;"><span style="${numCss}">${p.valor}</span></td>
          </tr>`
        )
        .join('');

    const totalInstallments = installments.reduce((s, p) => s + toNumber(p.valor), 0);
    const totalFmt = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(totalInstallments);

    // -------- clauseHtmlProps
    const birthdayBoy = clauseHtmlProps.birthday.map((it: any) => {
        return `
                <p>
                    <span style="font-size:12px;">${it.nomeAniversariante} ${it.idade} anos</span>
                </p>
            `
        }).join('');

         const themaParty = clauseHtmlProps.temas.map((it: any) => {
            return `
                <p>
                    <span style="font-size:12px;">${it.descricao} </span>
                </p>
            `
    }).join('');

    const getCurrentDate = () => {
        const now = new Date();
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return `
    <div style="width:100%">
        <p style="text-align:center">
            <span style="font-size:14px;"><strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</strong></span>
        </p>
        <p style="text-align:justify">
            <span>
                Pelo presente instrumento e na melhor forma de direito que fazem de um lado
                ${header.nameClient} portador(a) do RG e inscrito(a) no CPF ${header.documentClient}
                residente e domiciliado à ${address},
                doravante designado(a) simplesmente <strong>CONTRATANTE</strong>, de outro,
                KARIN PATRICIA ARAUJO ALECRIM inscrita no CNPJ 31.774.785/0001-83,
                estabelecida na Rua José Veríssimo 143 – Vila Rio Branco – CEP 13215-430
                na cidade de Jundiaí-SP, designada simplesmente <strong>CONTRATADA</strong>,
                têm entre si justos e contratados o presente instrumento de prestação de serviços que se rege
                conforme as cláusulas a seguir dispostas:
            </span>
        </p>
        <p style="text-align:justify;">
            <span>&nbsp;</span>
        </p>
        <p style="text-align:center">
            <span><strong>CONDIÇÕES GERAIS</strong></span>
        </p>
        <p style="text-align:justify;">
            <span>&nbsp;</span>
        </p>
        <p>
            <span>
                <strong>1.&nbsp;&nbsp;OBJETO -</strong> O Presente contrato destina-se à prestação de serviços
                de buffet pela CONTRATADA e em sua sede, reservando os referidos serviços para o
                <strong>dia ${dateSpan}</strong>,bem como demais serviços descritos na planilha abaixo,
                em favor do(a) <strong>CONTRATANTE</strong>.&nbsp;
            </span>
            <br>
        </p>
        <p>
            <span><strong>Itens do contrato</strong>:</span><br>
        </p>
        <table style="width:100%; border-collapse:collapse;">
            <thead>
                <tr>
                    <td>
                        <span><strong>Descricao</strong></span>
                    </td>
                    <td>
                        <span><strong>Valor</strong></span>
                    </td>
                </tr>
            </thead>

            <tbody>
                ${linhas}
                <tr>
                <td>
                    <span><strong>Total</strong></span>
                </td>
                <td>
                    <span><strong>${formatBr(
        total
    )}</strong></span>
                </td>
                </tr>
            </tbody>
            </table>
        <p>
            <span style="font-size:12px;"><strong>Valores</strong>:</span>
        </p>
            <table style="width:100%; border-collapse:collapse;">
                <tbody>
                    <tr>
                        <td>
                            <span style="font-size:12px;"><strong>NO Acréscimo</strong></span>
                        </td>
                        <td style="text-align:right;">
                            <span style="${numCss}">${formatBr(
                            valueHtml.addition
                            )}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="font-size:12px;"><strong>Desconto</strong></span>
                        </td>
                        <td style="text-align:right;">
                            <span style="${numCss}">${formatBr(
                            valueHtml.discount
                            )}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="font-size:12px;"><strong>Total</strong></span>
                        </td>
                        <td style="text-align:right;">
                            <span style="${numCss}">${formatBr(
                            valueHtml.valor
                            )}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="font-size:12px;"><strong>Valor já pago</strong></span>
                        </td>
                        <td style="text-align:right;">
                            <span style="${numCss}">${formatBr(
                            valueHtml.amountAlreadyPaid
                            )}</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span style="font-size:12px;"><strong>Valor a pagar</strong></span>
                        </td>
                        <td style="text-align:right;">
                            <span style="${numCss}">${formatBr(
                            valueHtml.amountToPay
                            )}</span>
                        </td>
                    </tr>
                </tbody>
            </table>

        <p>
            CHAVE PIX: CNPJ 31774785000183
        </p>
        <p>
            <span ><strong>Aniversariantes:</strong></span>
            ${birthdayBoy}
        </p>
        <p>
            <span ><strong>Temas:</strong></span>
            ${themaParty}
        </p>
        <p style="text-align:justify;">
            <span><strong>2.&nbsp;DOS VALORES E PAGAMENTO -</strong> Pelos serviços prestados a CONTRATANTE pagará a CONTRATADA o valor de R$ ${formatBr(total)}, que deverá ser quitado conforme cronograma de pagamento abaixo:&nbsp;</span>
        </p>
        <table style="width:100%; border-collapse:collapse;">
                <thead>
                    <tr>
                        <td>
                            <span><strong>Parcela</strong></span>
                        </td>
                        <td>
                            <span><strong>Vencimento</strong></span>
                        </td>
                        <td>
                            <span><strong>Meio pagamento</strong></span>
                        </td>
                        <td>
                            <span><strong>Pago?</strong></span>
                        </td>
                        <td style="text-align:right;">
                            <span><strong>Valor</strong></span>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    ${row}
                    <tr>
                    <td colspan="4">
                        <span style="font-size:12px;"><strong>Total</strong></span>
                    </td>
                    <td style="text-align:right;">
                        <span style="${numCss}"><strong>${totalFmt}</strong></span>
                    </td>
                    </tr>
                </tbody>
            </table>
        <p style="text-align:justify;">
            <span>2.1.&nbsp;&nbsp;&nbsp;&nbsp;O pagamento poderá ser realizado por meio de cartão de crédito em até 4X, salvo promoção realizada pela CONTRATADA por determinado, ou transferência bancária para a conta da CONTRATADA conforme convencionado no contrato e aqui descrito: CHAVE PIX: CNPJ 31774785000183.</span>
        </p>
        <p style="text-align:justify;">
            <span>2.2.&nbsp;&nbsp;&nbsp;&nbsp;Para a reserva da data do evento a CONTRATANTE deverá pagar a CONTRATADA o valor equivalente a 20% do total do contrato a título de <i><u>sinal</u></i>.&nbsp;</span><br>
            <span>Parágrafo único - Em caso de desistência da CONTRATANTE após 7 (sete) dias da assinatura do contrato ou do depósito do valor do <i><u>sinal</u></i>, a CONTRATADA realizará a retenção integral do referido valor.</span>
        </p>
        <p style="text-align:justify;">
            <span>2.3.&nbsp;&nbsp;&nbsp;&nbsp;O contrato de prestação de serviços deverá ser integralmente quitado até 10 (dez) dias antecedentes a data do evento, sob pena da CONTRATADA não realizar o evento.</span>
        </p>
        <p style="text-align:justify;">
            <span>2.4.&nbsp;&nbsp;&nbsp;&nbsp;Caso o pagamento não seja integralmente quitado no prazo supramencionado, os valores recebidos pela CONTRATADA serão integralmente retidos a titulo de dano material, haja vista que a CONTRATADA fica impedida de realizar novo evento devido a proximidade da data.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>3.&nbsp;&nbsp;&nbsp;&nbsp;DO CARDÁPIO - </strong>O(A) CONTRATANTE não poderá substituir o cardápio contratado por outro, nem tampouco requerer a devolução de valores já pago ou frustar pagamentos futuros em razão do número de convidados faltosos ao evento, bem como também não pode levar consigo, após o término da festa, alimentos, bebidas e demais ou serviços contratados.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>4.&nbsp;&nbsp;&nbsp;&nbsp;DURAÇÃO DO EVENTO - O serviço terá duração de 04h00min, com tolerância de 15 (quinze) minutos para a saída dos convidados. Não poderá haver prorrogação no horário estipulado para o término do evento, sendo que, caso ocorra a insistência e descumprimento por parte do(a) CONTRATANTE ou seus convidados, será cobrado uma taxa de R$ 150,00 (CENTO E CINQUENTA REAIS) para cada 15 (quinze) minutos.</strong></span>
        </p>
        <p style="text-align:justify;">
            <span><strong>5.&nbsp;&nbsp;&nbsp;&nbsp;ATRASOS - </strong>O evento iniciará no horário contratado, sendo que a CONTRATADA dará início aos serviços, independente da presença ou não do(a) CONTRATANTE ou do(a) aniversariante e demais convidados, não surtindo qualquer efeito no horário para encerramento do evento que se manterá inalterado.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>6.&nbsp;&nbsp;&nbsp;&nbsp;CONTROLE DE CONVIDADOS - </strong>O controle de presença será feito pela CONTRATADA no dia do evento, sendo que, havendo excesso na quantidade de pessoas presentes, além do estipulado no contrato, o(a) CONTRATANTE pagará a CONTRATADA a diferença de convidados imediatamente após o término do evento na forma à vista, por meio de dinheiro ou cartão de débito, assim abaixo estipulado:</span>
        </p>
        <ul>
            <li>
                <p style="text-align:justify;">
                    <span>VALOR CONVIDADO EXTRA no dia da festa R$ 100,00 (cem reais);</span>
                </p>
            </li>
            <li>
                <p style="text-align:justify;">
                    <span>VALOR CONVIDADO EXTRA 7 DIAS ANTES R$ 75,00 (setenta e cinco reais) (CARDÁPIO BARULHO), R$ 85 (oitenta e cinco reais) (CARDÁPIO DIVERSÃO) e R$ 50 (cinquenta reais) (CARDAPIO DA FELICIDADE) sendo o valor total calculado no momento do pagamento.&nbsp;</span>
                </p>
            </li>
        </ul>

        <p style="text-align:justify;">
            <span>Parágrafo único: Caso o pagamento não seja efetuado concomitante ao término da festa, haverá um acréscimo de 10% no valor total de todos os excedentes.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>7.&nbsp;&nbsp;&nbsp;&nbsp;EXCESSO DE CONVIDADOS - </strong>O cardápio foi elaborado de acordo com o número de convidados determinados pelo(a) CONTRATANTE e de acordo com as solicitações deste(a). Portanto, a CONTRATADA não será responsabilizada se, atendidas as especificações contratadas, a insuficiência da comida e/ou da bebida resultar da entrada de numero maior do que até 15% (quinze por cento) ao previsto de pessoas no evento.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>8.&nbsp;&nbsp;&nbsp;&nbsp;OBRIGAÇÕES DA CONTRATANTE - </strong>O(A) CONTRATANTE deverá fornecer a CONTRATADA todas as informações necessárias a realização adequada do serviço de buffet, devendo especificar fornecimento dos serviço e a forma como este deverá ser prestado.</span><br>
            <span>OBS: quantidade de convidados, tema da festa, pessoas com dificuldade de locomoção, pessoas e crianças com síndromes atípicas.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>9.&nbsp;&nbsp;&nbsp;&nbsp;OBRIGAÇÕES DA CONTRATADA &nbsp;-</strong> É dever da CONTRATADA oferecer um serviço de buffet de acordo com as especificações do(a) CONTRATANTE, fornecendo produtos de alta qualidade, que deverão ser preparados e servidos dentro de rigorosas normas de higiene e limpeza e de acordo com o cardápio escolhido pelo(a) CONTRATANTE, cujas especificações, encontram-se em documento anexo ao presente contrato, passando a entregar-lhe.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>10.&nbsp;&nbsp;&nbsp;&nbsp;INADIMPLEMENTO -</strong> O(A) CONTRATANTE deverá efetuar o pagamento na forma e condições estabelecidas na clausula 2, sendo que, em caso de inadimplemento, deverá incidir sobre o valor do presente instrumento, multa pecuniária de 10% (dez por cento) juros mora de 1% (um por cento) ao mês, correção monetária e honorários advocaticios de 15% (quinze por cento) para as cobranças extrajudiciais, servindo o presente como título executivo extrajudicial.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>11.&nbsp;&nbsp;&nbsp;&nbsp;DEVOLUÇÃO -</strong> Todos os utensílios, enfeites das mesas e outros objetos fornecidos, bem como moveis, brinquedos e demais itens das dependencias da CONTRATADA, deverão ser devolvidos em perfeito estado de conservação, sob pena de o(a) CONTRATANTE arcar com os respectivos valores de reposição.</span>
        </p>
        <p style="text-align:justify;">
            <span>11.1.&nbsp;&nbsp;&nbsp;<strong> Fica o(a) CONTRATANTE obrigado(a) a indenizar a CONTRATADA no caso de quebra de brinquedos devido uso indevido e inadequado, devendo ressarcir a CONTRATADA pelo valor de um novo, ou a manutenção do mesmo, valor de manutenção R$ 150,00 + peça a ser trocada.</strong></span>
        </p>
        <p style="text-align:justify;">
            <span><strong>12.&nbsp;&nbsp;&nbsp;&nbsp;RESPONSABILIDADE - </strong>A CONTRATADA não responderá, de forma alguma, por qualquer ocorrência acidentária do(a) CONTRATANTE ou de seus convidados quanto a quedas ou outros acidentes nas dependências da CONTRATADA, restando ciente o(a) CONTRATANTE de que o local possui alavrá Municipal, autorização de funcionamento do Corpo de Bombeiros, funcionários treinados, além de haver indicações de segurança para prevenção de acidentes no local.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>13.&nbsp;&nbsp;&nbsp;&nbsp;REMARCAÇÃO - </strong>O evento, objeto deste contrato somente poderá ser remarcado para outra data, desde que seja de comum acordo entre as partes e respeitando a disponibilidade da CONTRATADA, mediante as seguintes situações e condições:</span><br>
            <span>a)&nbsp;&nbsp;&nbsp;&nbsp;em caso de acidente ou doenças infectocontagiosas com o(a) CONTRATANTE, com o(a) aniversariante e até pessoas de parentesco na linha de sucessão de primeiro grau (mãe, pai, irmãos e avós), desde que os impossibilite de locomover-se no dia do evento, devendo tal fato ser devidamente comprovado por meio de atestado médico e documentos comprobatórios pertinentes. Acidentes que não impedem a locomoção, não são considerados com gravidade suficiente para a remarcação de datas.&nbsp;</span><br>
            <span>b)&nbsp;&nbsp;&nbsp;&nbsp;em caso de morte do(a) CONTRATANTE, com o(a) aniversariante e até pessoas de parentesco na linha de sucessão de primeiro grau (mãe, pai, irmãos e avós), mediante apresentação do documento comprobatório do óbito, sendo que neste caso, somente serão considerados os pedidos de remarcação se, o óbito ocorreu no máximo até 30 (trinta) dias anteriores ao avento.</span>
        </p>
        <p style="text-align:justify;">
            <span>13.1.&nbsp;&nbsp;&nbsp;&nbsp;Nos casos previsto nas alíneas <i><u>a</u></i> e <i><u>b</u></i> será permitida uma única remarcação de data do evento, sendo que o prazo máximo será de 12 (doze) meses contados da data do pedido de remarcação.</span><br>
            <span>Parágrafo Primeiro - o contrato em vigor não se interrompe, de forma que os pagamentos dos valores deverão ser rigorosamente quitados nas datas aprazadas pelo(a) CONTRATANTE.</span><br>
            <span>Parágrafo Segundo - nos casos em que não haja culpa por parte da CONTRATADA para remarcação da data, fica o(a) CONTRATANTE responsável pelo pagamento da eventual diferença entre os valores dos serviços contratados inicialmente e os valores da tabela de preços à época da prestação dos serviços.</span>
        </p>
        <p style="text-align:justify;">
            <span>13.2.&nbsp;&nbsp;&nbsp;&nbsp;A CONTRATADA se exime de qualquer responsabilidade por casos fortuitos ou força maior ocorridos anteriormente ou durante a execução do evento e que lhe impeça a prestação do serviço a contento, designadamente no caso de falta de energia, quebra de brinquedos ou outras situações que lhe obste de cumprir as obrigações assumidas neste contrato.</span><br>
            <span>Parágrafo único - havendo remarcação do evento pelos motivos descritos na clausula 12.2. o(a) CONTRATANTE fará jus a um novo evento caso não tenha transcorrido 50% (cinquenta por cento) do tempo previsto.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>14.&nbsp;&nbsp;&nbsp;&nbsp;RESCISÃO - </strong>O presente contrato poder ser rescindido pelo seguintes motivos:</span><br>
            <span>a)&nbsp;&nbsp;&nbsp;&nbsp;em caso de morte do(a) CONTRATANTE ou do aniversariante, madiante a apresentação da devida certidão de óbito, sendo que a CONTRATADA efetuará a devolução do equivalente a 70% (setenta por cento) do valor contrato, caso o mesmo já tenha sido pago em sua integralidade, ou da soma dos valores pagos até então, no prazo de até 90 (noventa) dias apos a comunicação oficial e apresentação dos documentos comprobatórios do falecimento.</span><br>
            <span>b)&nbsp;&nbsp;&nbsp;&nbsp;Pela falta de pagamento dos serviços ora contratados.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>15.&nbsp;&nbsp;&nbsp;&nbsp;DESISTÊNCIA - </strong>O(A) CONTRATANTE poderá rescindir o presente contrato unilateralmente desde que observado os seguintes critérios:</span><br>
            <span>a)&nbsp;&nbsp;&nbsp;&nbsp;o(a) CONTRATANTE deverá notificar por escrito a sua desistência no prazo antecedente de 60 (sessenta) dias para a data do evento;</span><br>
            <span>b)&nbsp;&nbsp;&nbsp;&nbsp;não serão aceitas as notificações de rescisão unilateral após o prazo mencionado na alínea <i><u>a</u></i>, salvo as exceções prevista na cláusula 13;</span>
        </p>

        <p style="text-align:justify;">
            <span>15.1.&nbsp;&nbsp;&nbsp;&nbsp;Realizada a rescisão unilateral a pedido da CONTRATANTE e respeitado o prazo de notificação acima, a CONTRATADA fará a retenção de 30% (trinta por cento) do valor quitado a título de indenização por perdas e danos, e o saldo será depositado na conta indicada pelo CONTRATANTE no prazo de 90 (noventa) dias.</span>
        </p>
        <p style="text-align:justify;">
            <span>15.2.&nbsp;&nbsp;&nbsp;&nbsp;Negada a rescisão unilateral pela CONTRATADA, e a CONTRATANTE não comparecer no dia, local e hora do evento, não serão devidos nenhum valor a CONTRATANTE;a título de devolução ou reembolso.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>16.&nbsp;&nbsp;&nbsp;&nbsp;EXCLUI-SE DO PRESENTE CONTRATO -</strong> não estão incluídos toalhas de mesa, balões, &nbsp;flores &nbsp;naturais, &nbsp;doce &nbsp;personalizado, &nbsp;papelaria personalizada e esculturas os itens mencionados são vendidos como adicionais. Caso queira uma decoração nova que não consta em nossa lista, consultar valor que pode variar de R$ 250,00 à R$ 2.500,00 dependendo do tema.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>17.&nbsp;&nbsp;&nbsp;&nbsp;NÃO É PERMITIDO - </strong>trazer chopp de fora, cooler com bebidas como: &nbsp;whisky, vinho, e destilados em geral.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>18.&nbsp;&nbsp;&nbsp;&nbsp;CORTESIAS:</strong></span><br>
            <span>- Decoração do Buffet, CONSULTAR LISTA DE TEMAS DISPONIVEIS, (incluso mesa, painel, bolo cenográfico, bandejas, personagens no tema escolhido de acordo com a lista de temas disponíveis)</span><br>
            <span>- 20 (vinte) lembrancinhas para as crianças (kit amarelinha). As lembrancinhas extras será cobrado o valor de R$3,00 (três reais) a unidade, e deverá ser solicitada pelo(a) CONTRATANTE com antecedência de 3(três) dias da data do evento.</span><br>
            <span>- Convites para Pai, mãe e aniversariantes em qualquer cardápio;&nbsp;</span><br>
            <span>- 15 (quinze) crianças de 1 a 8 anos nos CARDÁPIOS FESTA DO BARULHO E DIVERSÃO.</span>
        </p>

        <p style="text-align:justify;">
            <span>Parágrafo único: <strong><u>As crianças menores de 6 anos devem estar acompanhados de 1 adulto responsável (PAI OU MÃE).</u></strong></span>
        </p>
        <p style="text-align:justify;">
            <span><strong>19.&nbsp;&nbsp;&nbsp;&nbsp;FATORES EXTERNOS - </strong>O evento será realizado impreterivelmente no dia descrito neste contrato, independente de qualquer alteração climática, chuvas e outras intempéries do tempo, exceto nos casos de remarcação de data descritas nas clausulas acima, sendo que a CONTRATADA não se responsabiliza em hipótese alguma, nos casos em que o atraso do(a) CONTRATANTE ou do(a) aniversariante venha a provocar o cancelamento da festa, em decorrência de fatores externos ou culpa de terceiros.&nbsp;</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>20.&nbsp;&nbsp;&nbsp;&nbsp;IRREVOGABILIDADE E IRRETRATABILIDADE -</strong> O presente contrato é feito em caráter irrevogável e irretratável, obrigando as partes seu herdeiro e sucessores.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>21.&nbsp;&nbsp;&nbsp;&nbsp;DA OBSERVÂNCIA À LGPD - </strong>O(A) CONTRATANTE declara expresso CONSENTIMENTO que o CONTRATADO irá coletar, tratar e compartilhar os dados necessários ao cumprimento do contrato, nos termos do Art. 7º, inc. V da LGPD, os dados necessários para cumprimento de obrigações legais, nos termos do Art. 7º, inc. II da LGPD, bem como os dados, se necessários para proteção ao crédito, conforme autorizado pelo Art. 7º, inc. V da LGPD. Outros dados poderão ser coletados, conforme termo de consentimento específico.</span>
        </p>
        <p style="text-align:justify;">
            <span><strong>22.&nbsp;&nbsp;&nbsp;&nbsp;DAS DISPOSIÇÕES GERAIS&nbsp;</strong></span>
        </p>
        <p style="text-align:justify;">
            <span>22.1.&nbsp;&nbsp;&nbsp;&nbsp;A tolerância, por qualquer das partes, com relação ao descumprimento de qualquer termo ou condição aqui ajustado, não será considerada como desistência em exigir o cumprimento de disposição nele contida, nem representará novação com relação à obrigação passada, presente ou futura, no tocante ao termo ou condição cujo descumprimento foi tolerado.</span>
        </p>
        <p style="text-align:justify;">
            <span>22.2.&nbsp;&nbsp;&nbsp;&nbsp;A CONTRATADA não se responsabiliza por danos, furtos ou outras ocorrências relacionadas com quaisquer veículos estacionados na via pública, bem assim por objetos, roupas e sapatos deixados no interior do estabelecimento.</span>
        </p>

        <p style="text-align:justify;">
            <span>22.3 O CONTRATADO solicita a permissão de uso das imagens para a divulgação de seu trabalho em seu site, redes sociais e meios de comunicação por tempo indeterminado.</span>
        </p>
        <p style="text-align:justify;">
            <span>( &nbsp; ) AUTORIZADO &nbsp; &nbsp;( &nbsp; &nbsp;) NÃO AUTORIZO</span>
        </p>
        <p style="text-align:justify;">
            <span>22.4 <strong>O ingresso do (a) ANIVERSARIANTE, PAI, MÃE E IRMÃOS somente será liberado 15( quinze) MINUTOS ANTES &nbsp;do início da festa e os demais convidados SOMENTE NO HORÁRIO DA FESTA. Antes &nbsp;disso a porta de entrada permanecerá trancada e os funcionários estarão preparando o local para a realização do evento.</strong></span>
        </p>
        <p style="text-align:justify;">
            <span>
            <strong>23.&nbsp;DA ASSINATURA DIGITAL - </strong>
            As partes, inclusive suas testemunhas, reconhecem a forma de contratação/assinatura por meios eletrônicos, digitais e informáticos como válida e plenamente eficaz, constituindo título executivo extrajudicial para todos os fins de direito, ainda que seja estabelecida com assinatura eletrônica ou certificação fora dos padrões ICPBRASIL, conforme disposto pelo art. 10 da Medida Provisória nº 2.200/2001 em vigor no Brasil.
            </span>
        </p>

        <p>
            <span><strong>Jundiaí, ${getCurrentDate()}.</strong></span>
        </p>


    </div>
  `;
}
