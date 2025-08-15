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
    obs: string;
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
  if (!contractItem.length) return "";

  const linhas = contractItem
    .map(
      (it) => `
        <tr>
          <td><span style="font-size:12px;">${it.descricao}</span></td>
          <td><span style="font-size:12px;">${formatBrl(it.valor)}</span></td>
        </tr>`
    )
    .join("");

  const total = contractItem.reduce((s, it) => s + it.valor, 0);

   //----------- installments
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
   
      // Somar os valores convertendo para número para evitar concatenação de strings
      const totalInstallments = installments.reduce((s, p) => s + toNumber(p.valor), 0);
   
      // Formatar o total em moeda brasileira
      const totalFmt = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(totalInstallments);
   
      // -------- clauseHtmlProps
      const birthdayBoy = clauseHtmlProps.birthday
        .map((it: any) => {
          return `
            <p>
              <span style="font-size:12px;">${it.nomeAniversariante} ${it.idade} anos</span>
            </p>
          `;
        })
        .join('');

   const themaParty = clauseHtmlProps.temas
     .map((it: any) => {
       return `
         <p>
           <span style="font-size:12px;">${it.descricao}</span>
         </p>
       `;
     })
     .join('');

        const obsContract = `<p>
           <span style="font-size:12px;">${clauseHtmlProps.obs}</span>
         </p>`

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
           <span style="font-size:14px;"><strong>CONTRATO DE PRESTAÇÃO &nbsp; DE SERVIÇOS</strong></span>
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
         <p style="text-align:center">
           <span><strong>CONDIÇÕES GERAIS</strong></span>
         </p>
         <p style="text-align:justify;">
           <span>&nbsp;</span>
         </p>
         <p>
           <span>
             <strong>1.&nbsp;&nbsp;OBJETO -</strong> O presente contrato destina-se à prestação de serviços
             de buffet pela CONTRATADA &nbsp; e em sua sede, reservando os referidos serviços para o
             <strong>dia ${dateSpan}</strong>, bem como demais serviços descritos na planilha abaixo,
             em favor do(a) <strong>CONTRATANTE &nbsp;</strong>.&nbsp;
           </span>
           <br>
         </p>
         <p>
           <span><strong>Itens do contrato</strong>:</span><br>
         </p>
         <table style="width:100%; border-collapse:collapse;">
           <thead>
             <tr>
               <td><span><strong>Descrição</strong></span></td>
               <td><span><strong>Valor</strong></span></td>
             </tr>
           </thead>
           <tbody>
             ${linhas}
             <tr>
               <td><span><strong>Total</strong></span></td>
               <td><span><strong>${totalFmt}</strong></span></td>
             </tr>
           </tbody>
         </table>
    
         <!-- Aqui pode inserir os valores de parcelas -->
         <p><strong>Parcelas:</strong></p>
         <table style="width:100%; border-collapse:collapse;">
           <thead>
             <tr>
               <td><strong>#</strong></td>
               <td><strong>Data</strong></td>
               <td><strong>Meio de Pagamento</strong></td>
               <td><strong>Recebido</strong></td>
               <td style="text-align:right;"><strong>Valor</strong></td>
             </tr>
           </thead>
           <tbody>
             ${row}
           </tbody>
         </table>
         
         <p>Data do contrato: ${getCurrentDate()}</p>
       </div>
      </tbody>
    </table>
    
    <p>
      <span style="font-size:12px;"><strong>Valores:</strong></span>
    </p>
    <table style="width:100%; border-collapse:collapse;">
      <tbody>
        <tr>
          <td><span style="font-size:12px;"><strong>No Acréscimo</strong></span></td>
          <td style="text-align:right;">
            <span style="${numCss}">${formatBr(valueHtml?.addition ?? 0)}</span>
          </td>
        </tr>
        <tr>
          <td><span style="font-size:12px;"><strong>Desconto</strong></span></td>
          <td style="text-align:right;">
            <span style="${numCss}">${formatBr(valueHtml?.discount ?? 0)}</span>
          </td>
        </tr>
        <tr>
          <td><span style="font-size:12px;"><strong>Total</strong></span></td>
          <td style="text-align:right;">
            <span style="${numCss}">${formatBr(valueHtml?.valor ?? 0)}</span>
          </td>
        </tr>
        <tr>
          <td><span style="font-size:12px;"><strong>Valor já pago</strong></span></td>
          <td style="text-align:right;">
            <span style="${numCss}">${formatBr(valueHtml?.amountAlreadyPaid ?? 0)}</span>
          </td>
        </tr>
        <tr>
          <td><span style="font-size:12px;"><strong>Valor a pagar</strong></span></td>
          <td style="text-align:right;">
            <span style="${numCss}">${formatBr(valueHtml?.amountToPay ?? 0)}</span>
          </td>
        </tr>
      </tbody>
    </table>
    
    <p>CHAVE PIX: CNPJ 31.774.785/0001-83</p>
    
    <p>
      <span><strong>Aniversariantes:</strong></span>
      ${birthdayBoy ?? ''}
    </p>
    <p>
      <span><strong>Temas:</strong></span>
      ${themaParty ?? ''}
    </p>

     <p>
      <span><strong>Observação:</strong></span>
      ${obsContract ?? ''}
    </p>

    <p>Data do contrato: ${getCurrentDate()}</p>
    
    <p style="text-align:justify;">
      <span>
        <strong>2.&nbsp;DOS VALORES E PAGAMENTO -</strong> Pelos serviços prestados a CONTRATANTE &nbsp; &nbsp; pagará a CONTRATADA &nbsp; o valor de R$ ${formatBr(total ?? 0)}, que deverá ser quitado conforme cronograma de pagamento abaixo:&nbsp;
      </span>
    </p>
    
    <table style="width:100%; border-collapse:collapse;">
      <thead>
        <tr>
          <td><span><strong>Parcela</strong></span></td>
          <td><span><strong>Vencimento</strong></span></td>
          <td><span><strong>Meio pagamento</strong></span></td>
          <td><span><strong>Pago?</strong></span></td>
          <td style="text-align:right;"><span><strong>Valor</strong></span></td>
        </tr>
      </thead>
      <tbody>
        ${row ?? ''}
        <tr>
          <td colspan="4"><span style="font-size:12px;"><strong>Total</strong></span></td>
          <td style="text-align:right;"><span style="${numCss}"><strong>${totalFmt ?? formatBr(total ?? 0)}</strong></span></td>
        </tr>
      </tbody>
    </table>
    
    <p style="text-align:justify;">
      <span>
        2.1.&nbsp;&nbsp;&nbsp;&nbsp;O pagamento poderá ser realizado por meio de cartão de crédito em até 4X, salvo promoção realizada pela CONTRATADA &nbsp; por determinado período, ou transferência bancária para a conta da CONTRATADA &nbsp; conforme convencionado no contrato e aqui descrito: CHAVE PIX: CNPJ 31.774.785/0001-83.
      </span>
    </p>
    
    <p style="text-align:justify;">
      <span>2.2.&nbsp;&nbsp;&nbsp;&nbsp;Para a reserva da data do evento a CONTRATANTE &nbsp; &nbsp; deverá pagar à CONTRATADA &nbsp; o valor equivalente a 20% do total do contrato a título de <i><u>sinal</u></i>.&nbsp;</span><br>
      <span>Parágrafo único - Em caso de desistência da CONTRATANTE &nbsp; após 7 (sete) dias da assinatura do contrato ou do depósito do valor do <i><u>sinal</u></i>, a CONTRATADA &nbsp; realizará a retenção integral do referido valor.</span>
    </p>
    
    <p style="text-align:justify;">
      <span>2.3.&nbsp;&nbsp;&nbsp;&nbsp;O contrato de prestação de serviços deverá ser integralmente quitado até 10 (dez) dias antecedentes à data do evento, sob pena da CONTRATADA &nbsp; não realizar o evento.</span>
    </p>
    
    <p style="text-align:justify;">
      <span>2.4.&nbsp;&nbsp;&nbsp;&nbsp;Caso o pagamento não seja integralmente quitado no prazo supramencionado, os valores recebidos pela CONTRATADA &nbsp; serão integralmente retidos a título de dano material, haja vista que a CONTRATADA &nbsp; fica impedida de realizar novo evento devido à proximidade da data.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>3.&nbsp;&nbsp;&nbsp;&nbsp;DO CARDÁPIO - </strong>O(A) CONTRATANTE &nbsp; não poderá substituir o cardápio contratado por outro, nem tampouco requerer a devolução de valores já pagos ou frustrar pagamentos futuros em razão do número de convidados faltosos ao evento, bem como também não pode levar consigo, após o término da festa, alimentos, bebidas e demais serviços contratados.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>4.&nbsp;&nbsp;&nbsp;&nbsp;DURAÇÃO DO EVENTO - </strong>O serviço terá duração de 04h00min, com tolerância de 15 (quinze) minutos para a saída dos convidados. Não poderá haver prorrogação no horário estipulado para o término do evento, sendo que, caso ocorra insistência e descumprimento por parte do(a) CONTRATANTE &nbsp; ou seus convidados, será cobrada uma taxa de R$ 150,00 (CENTO E CINQUENTA REAIS) para cada 15 (quinze) minutos adicionais.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>5.&nbsp;&nbsp;&nbsp;&nbsp;ATRASOS - </strong>O evento iniciará no horário contratado, sendo que a CONTRATADA &nbsp; dará início aos serviços, independentemente da presença ou não do(a) CONTRATANTE, aniversariante ou demais convidados, não surtindo qualquer efeito no horário para encerramento do evento, que se manterá inalterado.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>6.&nbsp;&nbsp;&nbsp;&nbsp;CONTROLE DE CONVIDADOS - </strong>O controle de presença será feito pela CONTRATADA &nbsp; no dia do evento, sendo que, havendo excesso na quantidade de pessoas presentes, além do estipulado no contrato, o(a) CONTRATANTE &nbsp; pagará a CONTRATADA &nbsp; a diferença de convidados imediatamente após o término do evento, na forma à vista, por meio de dinheiro ou cartão de débito, conforme valores estipulados abaixo:</span>
    </p>
    
    <ul>
      <li>
        <p style="text-align:justify;">
          <span>VALOR CONVIDADO EXTRA no dia da festa: R$ 100,00 (cem reais);</span>
        </p>
      </li>
      <li>
        <p style="text-align:justify;">
          <span>VALOR CONVIDADO EXTRA 7 DIAS ANTES: R$ 75,00 (setenta e cinco reais) (CARDÁPIO BARULHO), R$ 85,00 (oitenta e cinco reais) (CARDÁPIO DIVERSÃO) e R$ 50,00 (cinquenta reais) (CARDÁPIO DA FELICIDADE), sendo o valor total calculado no momento do pagamento.&nbsp;</span>
        </p>
      </li>
    </ul>
    
    <p style="text-align:justify;">
      <span>Parágrafo único: Caso o pagamento não seja efetuado concomitantemente ao término da festa, haverá um acréscimo de 10% no valor total de todos os excedentes.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>7.&nbsp;&nbsp;&nbsp;&nbsp;EXCESSO DE CONVIDADOS - </strong>O cardápio foi elaborado de acordo com o número de convidados determinados pelo(a) CONTRATANTE &nbsp; e as solicitações deste(a). Portanto, a CONTRATADA &nbsp; não será responsabilizada se, atendidas as especificações contratadas, houver insuficiência de comida e/ou bebida decorrente da entrada de número maior que até 15% (quinze por cento) acima do previsto de pessoas no evento.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>8.&nbsp;&nbsp;&nbsp;&nbsp;OBRIGAÇÕES DA CONTRATANTE &nbsp; - </strong>O(A) CONTRATANTE &nbsp; deverá fornecer à CONTRATADA &nbsp; todas as informações necessárias para a realização adequada do serviço de buffet, especificando os serviços fornecidos e a forma como deverão ser prestados.</span><br>
      <span>OBS: quantidade de convidados, tema da festa, pessoas com dificuldade de locomoção, pessoas e crianças com síndromes atípicas.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>9.&nbsp;&nbsp;&nbsp;&nbsp;OBRIGAÇÕES DA CONTRATADA - </strong>É dever da CONTRATADA &nbsp; oferecer um serviço de buffet de acordo com as especificações do(a) CONTRATANTE &nbsp;, fornecendo produtos de alta qualidade, preparados e servidos dentro de rigorosas normas de higiene e limpeza, conforme o cardápio escolhido, cujas especificações encontram-se em documento anexo ao presente contrato.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>10.&nbsp;&nbsp;&nbsp;&nbsp;INADIMPLEMENTO - </strong>O(A) CONTRATANTE &nbsp; deverá efetuar o pagamento na forma e condições estabelecidas na cláusula 2. Em caso de inadimplemento, incidirá sobre o valor multa pecuniária de 10% (dez por cento), juros moratórios de 1% (um por cento) ao mês, correção monetária e honorários advocatícios de 15% (quinze por cento) para cobranças extrajudiciais, servindo o presente como título executivo extrajudicial.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>11.&nbsp;&nbsp;&nbsp;&nbsp;DEVOLUÇÃO - </strong>Todos os utensílios, enfeites das mesas e outros objetos fornecidos, bem como móveis, brinquedos e demais itens das dependências da CONTRATADA, deverão ser devolvidos em perfeito estado de conservação, sob pena de o(a) CONTRATANTE &nbsp; arcar com os respectivos valores de reposição.</span>
    </p>
    
    <p style="text-align:justify;">
      <span>11.1.&nbsp;&nbsp;&nbsp;<strong>Fica o(a) CONTRATANTE &nbsp; obrigado(a) a indenizar a CONTRATADA no caso de quebra de brinquedos devido ao uso indevido e inadequado, devendo ressarcir pelo valor de um novo, ou pela manutenção do mesmo (valor da manutenção: R$ 150,00 + peça a ser trocada).</strong></span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>12.&nbsp;&nbsp;&nbsp;&nbsp;RESPONSABILIDADE - </strong>A CONTRATADA &nbsp; não responderá por qualquer ocorrência acidentária do(a) CONTRATANTE &nbsp; ou seus convidados nas dependências da CONTRATADA, estando ciente o(a) CONTRATANTE &nbsp; que o local possui alvará municipal, autorização do Corpo de Bombeiros, funcionários treinados e sinalizações de segurança para prevenção de acidentes.</span>
    </p>
    
    <p style="text-align:justify;">
      <span><strong>13.&nbsp;&nbsp;&nbsp;&nbsp;REMARCAÇÃO - </strong>O evento somente poderá ser remarcado para outra data, mediante comum acordo entre as partes e respeitando a disponibilidade da CONTRATADA, nas seguintes situações:</span><br>
      <span>a)&nbsp;&nbsp;&nbsp;&nbsp;Acidente ou doenças infectocontagiosas com o(a) CONTRATANTE &nbsp;, aniversariante ou parentes em linha direta (mãe, pai, irmãos, avós), que impeçam a locomoção no dia do evento, comprovado por atestado médico.</span><br>
      <span>b)&nbsp;&nbsp;&nbsp;&nbsp;Morte do(a) CONTRATANTE &nbsp;, aniversariante ou parentes em linha direta, mediante apresentação da certidão de óbito, desde que o óbito tenha ocorrido no máximo 30 (trinta) dias antes do evento.</span>
    </p>
    
    <p style="text-align:justify;">
      <span>13.1.&nbsp;&nbsp;&nbsp;&nbsp;Nos casos das alíneas <i><u>a</u></i> e <i><u>b</u></i>, será permitida uma única remarcação, com prazo máximo de 12 (doze) meses a partir do pedido de remarcação.</span><br>
      <span>Parágrafo Primeiro - o contrato em vigor não se interrompe, devendo os pagamentos serem quitados nas datas acordadas.</span><br>
      <span>Parágrafo Segundo - nos casos sem culpa da CONTRATADA, o(a) CONTRATANTE &nbsp; será responsável pela diferença de valores entre os serviços inicialmente contratados e a tabela vigente na nova data.</span>
    </p>
    
    <p style="text-align:justify;">
      <span>13.2.&nbsp;&nbsp;&nbsp;&nbsp;A CONTRATADA &nbsp; se exime de responsabilidade por casos fortuitos ou força maior que impeçam a prestação do serviço, como
    
    
           <p style="text-align:justify;">
               <span><strong>13.&nbsp;&nbsp;&nbsp;&nbsp;REMARCAÇÃO - </strong>O evento somente poderá ser remarcado para outra data, mediante comum acordo entre as partes e respeitando a disponibilidade da CONTRATADA, nas seguintes situações:</span><br>
               <span>a)&nbsp;&nbsp;&nbsp;&nbsp;Acidente ou doenças infectocontagiosas com o(a) CONTRATANTE &nbsp;, aniversariante ou parentes em linha direta (mãe, pai, irmãos, avós), que impeçam a locomoção no dia do evento, comprovado por atestado médico.</span><br>
               <span>b)&nbsp;&nbsp;&nbsp;&nbsp;Morte do(a) CONTRATANTE &nbsp;, aniversariante ou parentes em linha direta, mediante apresentação da certidão de óbito, desde que o óbito tenha ocorrido no máximo 30 (trinta) dias antes do evento.</span>
           </p>
    
           <p style="text-align:justify;">
               <span>13.1.&nbsp;&nbsp;&nbsp;&nbsp;Nos casos das alíneas <i><u>a</u></i> e <i><u>b</u></i>, será permitida uma única remarcação, com prazo máximo de 12 (doze) meses a partir do pedido de remarcação.</span><br>
               <span>Parágrafo Primeiro - o contrato em vigor não se interrompe, devendo os pagamentos serem quitados nas datas acordadas.</span><br>
               <span>Parágrafo Segundo - nos casos sem culpa da CONTRATADA, o(a) CONTRATANTE &nbsp; será responsável pela diferença de valores entre os serviços inicialmente contratados e a tabela vigente na nova data.</span>
           </p>
    
           <p style="text-align:justify;">
               <span>13.2.&nbsp;&nbsp;&nbsp;&nbsp;A CONTRATADA &nbsp; se exime de responsabilidade por casos fortuitos ou força maior que impeçam a prestação do serviço, como falta de energia ou quebra de brinquedos.</span><br>
               <span>Parágrafo único - havendo remarcação por esses motivos, o(a) CONTRATANTE &nbsp; terá direito a novo evento caso não tenha transcorrido 50% do tempo previsto.</span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>14.&nbsp;&nbsp;&nbsp;&nbsp;RESCISÃO - </strong>O contrato poderá ser rescindido nos seguintes casos:</span><br>
               <span>a)&nbsp;&nbsp;&nbsp;&nbsp;Morte do(a) CONTRATANTE &nbsp; ou aniversariante, com devolução de 70% do valor pago, após apresentação dos documentos comprobatórios, no prazo de até 90 dias após comunicação oficial.</span><br>
               <span>b)&nbsp;&nbsp;&nbsp;&nbsp;Falta de pagamento dos serviços contratados.</span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>15.&nbsp;&nbsp;&nbsp;&nbsp;DESISTÊNCIA - </strong>O(A) CONTRATANTE &nbsp; poderá rescindir unilateralmente observando:</span><br>
               <span>a)&nbsp;&nbsp;&nbsp;&nbsp;Notificar por escrito com antecedência mínima de 60 dias da data do evento;</span><br>
               <span>b)&nbsp;&nbsp;&nbsp;&nbsp;Notificações fora desse prazo não serão aceitas, salvo exceções previstas na cláusula 13.</span>
           </p>
    
           <p style="text-align:justify;">
               <span>15.1.&nbsp;&nbsp;&nbsp;&nbsp;Na rescisão unilateral com prazo respeitado, a CONTRATADA &nbsp; reterá 30% do valor quitado a título de indenização, e o saldo será devolvido em até 90 dias na conta indicada pelo(a) CONTRATANTE &nbsp;.</span>
           </p>
    
           <p style="text-align:justify;">
               <span>15.2.&nbsp;&nbsp;&nbsp;&nbsp;Negada a rescisão e o(a) CONTRATANTE &nbsp; não comparecer ao evento, não haverá devolução de valores.</span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>16.&nbsp;&nbsp;&nbsp;&nbsp;EXCLUSÕES - </strong>Não estão incluídos no contrato: toalhas de mesa, balões, flores naturais, doces personalizados, papelaria personalizada e esculturas. Estes são vendidos como adicionais. Decorações fora da lista têm valores variáveis de R$ 250,00 a R$ 2.500,00, conforme tema.</span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>17.&nbsp;&nbsp;&nbsp;&nbsp;PROIBIÇÕES - </strong>Não é permitido trazer chopp, cooler com bebidas como whisky, vinho ou destilados em geral.</span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>18.&nbsp;&nbsp;&nbsp;&nbsp;CORTESIAS:</strong></span><br>
            <span>- Decoração do Buffet, CONSULTAR &nbsp; LISTA &nbsp; DE TEMAS DISPONIVEIS, (incluso mesa, painel, bolo cenográfico, bandejas, personagens no tema escolhido de acordo com a lista de temas disponíveis)</span><br>
            <span>- 20 (vinte) lembrancinhas para as crianças (kit amarelinha). As lembrancinhas extras será cobrado o valor de R$3,00 (três reais) a unidade, e deverá ser solicitada pelo(a) CONTRATANTE &nbsp; com antecedência de 3(três) dias da data do evento.</span><br>
            <span>- Convites para Pai, mãe e aniversariantes em qualquer cardápio;&nbsp;</span><br>
            <span>- 15 (quinze) crianças de 1 a 8 anos nos CARDÁPIOS &nbsp; FESTA &nbsp; DO BARULHO &nbsp; E &nbsp; DIVERSÃO.</span>
           </p>
    
           <p style="text-align:justify;">
               <span>Parágrafo único: <strong><u>Crianças menores de 6 anos devem estar acompanhadas de 1 adulto responsável (pai ou mãe).</u></strong></span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>19.&nbsp;&nbsp;&nbsp;&nbsp;FATORES EXTERNOS - </strong>O evento será realizado na data prevista, independentemente de alterações climáticas ou outros fatores, exceto remarcações previstas. A CONTRATADA &nbsp; não se responsabiliza por atrasos do(a) CONTRATANTE &nbsp; ou aniversariante que provoquem cancelamento por fatores externos ou culpa de terceiros.</span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>20.&nbsp;&nbsp;&nbsp;&nbsp;IRREVOGABILIDADE E IRRETRATABILIDADE - </strong>Este contrato é irrevogável e irretratável, obrigando as partes, seus herdeiros e sucessores.</span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>21.&nbsp;&nbsp;&nbsp;&nbsp;LGPD - </strong>O(A) CONTRATANTE &nbsp; declara consentimento expresso para coleta, tratamento e compartilhamento de dados necessários ao cumprimento do contrato, conforme artigos da LGPD.</span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>22.&nbsp;&nbsp;&nbsp;&nbsp;DISPOSIÇÕES GERAIS</strong></span>
           </p>
    
           <p style="text-align:justify;">
               <span>22.1.&nbsp;&nbsp;&nbsp;&nbsp;Tolerância de descumprimento não caracteriza desistência nem novação.</span>
           </p>
    
           <p style="text-align:justify;">
               <span>22.2.&nbsp;&nbsp;&nbsp;&nbsp;A CONTRATADA &nbsp; não se responsabiliza por danos, furtos ou ocorrências com veículos estacionados ou pertences deixados no estabelecimento.</span>
           </p>
    
           <p style="text-align:justify;">
               <span>22.3.&nbsp;&nbsp;&nbsp;&nbsp;O CONTRATADO &nbsp; solicita autorização para uso de imagens para divulgação em meios digitais.</span>
           </p>
    
           <p style="text-align:justify;">
               <span>( &nbsp; ) AUTORIZADO &nbsp;&nbsp;&nbsp; ( &nbsp; ) NÃO AUTORIZO</span>
           </p>
    
           <p style="text-align:justify;">
               <span>22.4.&nbsp;&nbsp;&nbsp;&nbsp;<strong>O ingresso do(a) aniversariante, pai, mãe e irmãos será liberado 15 minutos antes do início da festa, e dos demais convidados somente no horário da festa. Antes disso, a porta permanecerá trancada para preparação do local.</strong></span>
           </p>
    
           <p style="text-align:justify;">
               <span><strong>23.&nbsp;&nbsp;&nbsp;&nbsp;ASSINATURA DIGITAL - </strong>As partes reconhecem a validade da assinatura eletrônica, conforme MP nº 2.200/2001, como título executivo extrajudicial.</span>
           </p>
    
           <p>
               <span><strong>Jundiaí, ${getCurrentDate()}.</strong></span>
           </p>
        
           </div>
  `;
}
