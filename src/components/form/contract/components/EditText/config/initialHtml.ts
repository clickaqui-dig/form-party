/* eslint-disable @typescript-eslint/no-explicit-any */
interface headerHtmlProps {
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

export const headerHtml = (data: headerHtmlProps) => {
    const address = `${data.street} ${data.number} - CEP ${data.cep} na cidade de ${data.city}-${data.state}`;

    const inicio = formatIso(data.dateInit);
    const fim = formatIso(data.dateEnd);

    const dateSpan = `${inicio.date} das ${inicio.time} às ${fim.time}.`;
    return `
    <p style="text-align:center;">
      <span style="font-size:14px;"><strong>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</strong></span>
    </p>

    <p>&nbsp;</p>

    <p>
      <span style="font-size:12px;">
        Pelo presente instrumento e na melhor forma de direito que fazem de um lado
        ${data.nameClient} portador(a) do RG e inscrito(a) no CPF ${data.documentClient}
        residente e domiciliado à ${address},
        doravante designado(a) simplesmente <strong>CONTRATANTE</strong>, de outro,
        KARIN PATRICIA ARAUJO ALECRIM inscrita no CNPJ 31.774.785/0001-83,
        estabelecida na Rua José Veríssimo 143 – Vila Rio Branco – CEP 13215-430
        na cidade de Jundiaí-SP, designada simplesmente <strong>CONTRATADA</strong>,
        têm entre si justos e contratados o presente instrumento de prestação de serviços que se rege
        conforme as cláusulas a seguir dispostas:
      </span>
    </p>

    <p>
      <span style="font-size:12px;">
        <strong>Cláusula 1ª </strong>– A <strong>CONTRATADA</strong> se responsabiliza em prestar
        ao(à) <strong>CONTRATANTE</strong> os serviços e produtos escolhidos conforme apresentados
        abaixo, reservando os referidos serviços para o <strong>dia ${dateSpan}</strong>
        Por outro lado, a <strong>CONTRATANTE</strong> reconhece na tabela abaixo todos os itens
        junto à <strong>CONTRATADA</strong>.
      </span>
    </p>
  `;
}

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

interface contractItemHtmlProps {
    id: number;
    descricao: string;
    valor: number;
}

export const contractItemHtml = (data: contractItemHtmlProps[]) => {
    if (!data.length) return '';

    const linhas = data
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

    const total = data.reduce((s, it) => s + it.valor, 0);

    return `
      <p>
        <span style="font-size:12px;"><strong>Itens do contrato</strong>:</span><br>
        &nbsp;
      </p>
  
      <figure class="table" style="width:100%;">
        <table style="table-layout:fixed;border-collapse:collapse;width:100%;">
        <thead>
            <tr>
                <th style="width:70%;">
                    <span style="font-size:12px;">Descricao</span>
                </th>
                <th style="width:30%;">
                    <span style="font-size:12px;">Valor</span>
                </th>
            </tr>
          </thead>
  
          <tbody>
            ${linhas}
  
            <tr>
              <td>
                <span style="font-size:12px;"><strong>Total</strong></span>
              </td>
              <td>
                <span style="font-size:12px;"><strong>${formatBrl(total)}</strong></span>
              </td>
            </tr>
          </tbody>
        </table>
      </figure>
    `;
}

interface valuesHtmlProps {
    addition: number;
    discount: number;
    valor: number;
    amountAlreadyPaid: number;
    amountToPay: number;
}

export const valuesHtml = (data: valuesHtmlProps) => {
    return `<p>
    <br>
    <span style="font-size:12px;"><strong>Valores</strong>:</span>
</p>
<figure class="table" style="width:100%;">
      <table style="width:100%; table-layout:fixed;">
        <tbody>
            <tr>
                <td>
                    <span style="font-size:12px;"><strong>NO Acréscimo</strong></span>
                </td>
                <td>
                    <span style="font-size:12px;">${formatBrl(data.addition)}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span style="font-size:12px;"><strong>Desconto</strong></span>
                </td>
                <td>
                    <span style="font-size:12px;">${formatBrl(data.discount)}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span style="font-size:12px;"><strong>Total</strong></span>
                </td>
                <td>
                    <span style="font-size:12px;">${formatBrl(data.valor)}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span style="font-size:12px;"><strong>Valor já pago</strong></span>
                </td>
                <td>
                    <span style="font-size:12px;">${formatBrl(data.amountAlreadyPaid)}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span style="font-size:12px;"><strong>Valor a pagar</strong></span>
                </td>
                <td>
                    <span style="font-size:12px;">${formatBrl(data.amountToPay)}</span>
                </td>
            </tr>
        </tbody>
    </table>
</figure>`;
}

interface Installments {
    id: number;
    valor: string;
    meioPagamento: string;
    dataPagamentos: string;
    recebido: boolean;
    observacoes?: string;
}

const brDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR');

const toNumber = (valor: string) =>
    Number(valor);

export const installmentsHtml = (installments: Installments[]) => {
    if (!installments.length) return '';

    const row = installments
        .map(
            (p, idx) => `
          <tr>
            <td><span style="font-size:12px;">${idx + 1}</span></td>
            <td><span style="font-size:12px;">${brDate(p.dataPagamentos)}</span></td>
            <td><span style="font-size:12px;">${p.meioPagamento}</span></td>
            <td><span style="font-size:12px;">${p.recebido ? 'Sim' : 'Não'}</span></td>
            <td><span style="font-size:12px;">${p.valor}</span></td>
          </tr>`
        )
        .join('');

    const total = installments.reduce((s, p) => s + toNumber(p.valor), 0);
    const totalFmt = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(total);

    return `
          <tbody>
            ${row}
            <tr>
              <td colspan="4">
                <span style="font-size:12px;"><strong>Total</strong></span>
              </td>
              <td>
                <span style="font-size:12px;"><strong>${totalFmt}</strong></span>
              </td>
            </tr>
          </tbody>
        `;
}

interface clauseHtmlProps {
    birthday: any[];
    installments: Installments[]
    temas : any[];
}

export const clauseHtml = (data: clauseHtmlProps) => {
    const birthdayBoy = data.birthday.map((it: any) => {
        return `
            <p>
                <span style="font-size:12px;">${it.nomeAniversariante} ${it.idadeNoEvento} anos</span>
            </p>
        `
    }).join('');

     const themaParty = data.temas.map((it: any) => {
        return `
            <p>
                <span style="font-size:12px;">${it.descricao} </span>
            </p>
        `
    }).join('');
    const installments = installmentsHtml(data.installments)
    return `
    <p>
        CHAVE PIX: CNPJ 31774785000183
    </p>
    <p>
        <span style="font-size:12px;"><strong>Aniversariantes:</strong></span>
        ${birthdayBoy}
    </p>

    <p>
        <span style="font-size:12px;"><strong>Temas:</strong></span>
        ${themaParty}
    </p>


    <p>
        <span style="font-size:12px;"><strong>Parágrafo Primeiro:</strong> A <strong>CONTRATADA</strong> se obriga a fornecer os produtos referentes ao escolhido, a fornecer pessoal qualificado proporcional ao número de convidados ao evento, a fornecer as instalações em bom estado de conservação e limpeza, no caso que se aplicar a contratação do espaço para a realização do evento.</span><br>
        <span style="font-size:12px;"><strong>Parágrafo Segundo: </strong>A <strong>CONTRATADA</strong> não fornece produtos ou alimentos para viagem.</span><br>
        <span style="font-size:12px;"><strong>Parágrafo Terceiro:</strong> O(a) <strong>CONTRATANTE</strong> deverá fornecer à <strong>CONTRATADA</strong> todas as informações detalhadas necessárias à adequada realização do serviço.</span>
    </p>
    <p>
        <strong>Cláusula 2ª </strong><span style="font-size:12px;">- O(a) </span><strong>CONTRATANTE </strong><span style="font-size:12px;">se responsabiliza em efetuar o pagamento no valor de R$ 2.330,00 pelos serviços prestados pela </span><strong>CONTRATADA</strong><span style="font-size:12px;">, conforme citados na cláusula 1. A </span><strong>CONTRATADA </strong><span style="font-size:12px;">não efetuará os serviços caso a cláusula 2º não estiver sido cumprida</span><br>
        <span style="font-size:12px;"><strong>Parágrafo Primeiro:</strong> Fica acordado que o(a) <strong>CONTRATANTE </strong>realizará o pagamento do evento em favor da <strong>CONTRATADA </strong>conforme cronograma abaixo:</span><br>
        &nbsp;
    </p>
<figure class="table" style="width:100%;">
  <table style="width:100%; table-layout:fixed;">
            <thead>
                <tr>
                    <th>
                        <span style="font-size:12px;">Parcela</span>
                    </th>
                    <th>
                        <span style="font-size:12px;">Vencimento</span>
                    </th>
                    <th>
                        <span style="font-size:12px;">Meio pagamento</span>
                    </th>
                    <th>
                        <span style="font-size:12px;">Pago?</span>
                    </th>
                    <th>
                        <span style="font-size:12px;">Valor</span>
                    </th>
                </tr>
            </thead>
            ${installments}
        </table>
    </figure>
    <p>
        <span style="font-size:12px;"><strong>Cláusula 3ª </strong>- Se o(a) <strong>CONTRATANTE </strong>desistir unilateralmente da prestação de serviços que ora contrata, perderá em favor da <strong>CONTRATADA </strong>os valores pagos a título de sinal e princípio de pagamento correspondente a 30% do total do contrato, a título de indenização por perdas e danos, pela rescisão unilateral do presente CONTRATO.</span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>Parágrafo Único: </strong>No caso do(a) <strong>CONTRATANTE </strong>desejar rescindir unilateralmente a presente prestação de serviços, em havendo efetuado o pagamento de mais de 30% (trinta por cento) do evento contratado, deverá avisar a <strong>CONTRATADA</strong>, com antecedência mínima de 60&nbsp;(sessenta) dias da data aprazada para o evento, recebendo, para tanto, da <strong>CONTRATADA </strong>os valores que excederem o montante do sinal e princípio de pagamento de que trata o parágrafo único da Cláusula 2ª .&nbsp;Desistindo com menos de 60 dias e com até 30 dias de antecedência, a multa será de 60% do valor da festa. Se a desistência for com menos de 15 dias de antecedência, a multa será de 100% do valor contratado. O CONTRATADO incidirá nas mesmas multas e prazos acima caso deixe de realizar a festa sem motivo justo.</span><br>
        <span style="font-size:12px;"><strong>Parágrafo Segundo: </strong>Apenas poderá ser rescindido o presente instrumento por parte do(a) <strong>CONTRATANTE</strong>, com menos de 60&nbsp;(sessenta) dias de antecedência da data aprazada para o evento, por motivo inteiramente justificável, sendo-lhe devolvido pela <strong>CONTRATADA </strong>os montantes eventualmente efetuados, salvo o sinal e princípio de pagamento de que trata o parágrafo único da Cláusula 2ª.</span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>Clausula 4ª</strong> - A <strong>CONTRATADA </strong>se obriga a efetuar o evento na opção de que trata a Cláusula 1ª, para o número de pessoas, convidados que excedam a este número, deverá ser efetuado pela(o) <strong>CONTRATANTE </strong>o pagamento da diferença de convidados imediatamente após o término do evento na forma à vista, por meio de dinheiro&nbsp;ou cartão de débito,VALOR CONVIDADO EXTRA&nbsp;no dia da festa R$ 70,00 (setenta reais), &nbsp;VALOR CONVIDADO EXTRA 7 dias antes R$ 50,00 ,&nbsp;sendo o valor total calculado no momento do pagamento. Caso o pagamento não seja efetuado imediatamente após término da festa, haverá um acréscimo de 10% no valor total de todos os excedentes.</span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>Parágrafo Primeiro: </strong>Caso o número de convidados ultrapasse 15% do total contratado na Cláusula 4ª, a <strong>CONTRATANTE </strong>deverá efetuar pagamento antecipado à data do evento.</span><br>
        <span style="font-size:12px;"><strong>Parágrafo Segundo:</strong> A falta de pagamento referente do Parágrafo Primeiro, desobriga a <strong>CONTRATADA </strong>a efetuar os serviços para mais do que 15% do total da Cláusula 4ª.</span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>Cláusula 5ª</strong> - O(a) <strong>CONTRATANTE </strong>se responsabiliza, por si e pelos seus convidados, pelos pertences da <strong>CONTRATADA</strong>, em havendo quebra de quaisquer dos pertences da <strong>CONTRATADA </strong>pelo <strong>CONTRATANTE </strong>ou seus convidados, fica o(a) <strong>CONTRATANTE </strong>obrigado(a) a indenizar a <strong>CONTRATADA</strong>.&nbsp;<strong>NO CASO DE QUEBRA DE BRINQUEDOS DEVIDO USO INDEVIDO SERÁ COBRADO O VALOR DE UM NOVO, OU VALOR DA MANUTENÇÃO DO MESMO,&nbsp;VALOR DE MANUTENÇÃO R$ 150,00 + PEÇA A SER TROCADA.</strong></span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>Parágrafo Primeiro:</strong> A <strong>CONTRATADA </strong>não se responsabiliza por objetos, vestuários ou calçados esquecidos no interior do estabelecimento. Os mesmos serão armazenados até o dia 30 de cada mês, não havendo procura serão entregues para Instituições de caridades da região.</span><br>
        <span style="font-size:12px;"><strong>Parágrafo Segundo:</strong> A <strong>CONTRATADA </strong>não se responsabiliza por eventuais furtos ou extravios de objetos ocorridos no período do evento.</span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>Cláusula 6ª </strong>- O serviço terá duração de 03h00min, com tolerância de 15 (quinze) minutos para a saída dos convidados, <strong><u>caso (o) CONTRATANTE ultrapasse este período, pagará uma taxa de 10% do valor total do evento para cada 15 (quinze) minutos, podendo ser fracionado.</u></strong></span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>Parágrafo Primeiro:</strong> Em falta de algum item do serviço/produto contratado, será feita a substituição do item sem prévio aviso.</span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>Cláusula 7ª</strong> - A <strong>CONTRATADA </strong>não se responsabiliza por eventuais falhas de energia elétrica devido a problemas na rede pública ou intempéries,&nbsp;por danos ocorridos por força maior, tais como: tempestades, queda de energia elétrica, inundações, brinquedo&nbsp; que eventualmente não esteja funcionando (apesar de todos os esforços empreendidos para que tal fato não ocorra), seja pela impossibilidade de encontrar peças, seja pela dificuldade de encontrar técnicos com disponibilidade imediata para o conserto; objetos perdidos; lesões por fatos imprevisíveis; serviços de terceiros contratados particularmente PELO(A) <strong>CONTRATANTE</strong>, incidentes que venham ocorrer com alguém cujas condições especiais deveriam ter sido especificadas por escrito; bem como quaisquer outros incidentes alheios à vontade <strong>DA&nbsp;CONTRATADA</strong>. Caso<strong>&nbsp;A CONTRATADA</strong>&nbsp;tiver condições de antever qualquer fato grave que possa impedir a realização da festa, poderá alterar sua data, consultando <strong>O (A) CONTRATANTE</strong> sobre o melhor dia dentre as datas disponíveis.</span>
    </p>
    <p>
        <span style="font-size:12px;"><strong>OBSERVAÇÕES IMPORTANTES</strong></span>
    </p>
    <p>
        <span style="font-size:12px;">Todas as especificações do presente contrato deverão constar por escrito e ser assinadas por ambas as partes contratantes ou por seus procuradores.</span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;">A decoração será uma cortesia do Buffet (mesa, painel, bolo cenográfico,bandejas, personagens no tema escolhido) NÃO ESTÁ INCLUSO BALÕES, FLORES NATURAIS, DOCE PERSONALIZADO OU PAPELARIA PERSONALIZADA os itens mencionados são vendidos como adicionais.</span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;">NÃO É PERMITIDO TRAZER CHOPP DE FORA, COOLER OU BEBIBAS COMO WHISKY, VINHO, E DESTILADOS EM GERAL.</span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;">Cortesia&nbsp;<strong>20 lembrancinhas</strong> para as crianças kit amarelinha, lembrancinhas extra&nbsp;será cobrado o valor de R$ 3,00 cada, O CONTRATANTE precisa solicitar com 3 dias de antecedência caso precise de lembrancinha extra.</span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;">Pai, mãe e aniversariante cortesia em qualquer cardápio.&nbsp;</span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;"><strong><u>O ingresso do (a) &nbsp;ANIVERSARIANTE, PAI, MÃE e IRMÃOS somente estará liberado 15 (quize) &nbsp;minutos antes do início da festa e o dos CONVIDADOS somente no horário da festa. Antes disso a porta de entrada permanecerá trancada e os funcionários estarão preparando o local para a realização do evento.</u></strong></span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;">Cortesia de <strong>15 crianças</strong> <strong>até 8&nbsp;anos .</strong></span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;">A data somente será confirmada após o pagamento da 1ª parcela. Caso não compareça a quantidade de convidados paga no pacote não haverá reembolso de valores vez que O CONTRATADO terá se preparado para receber o número de pessoas indicado. Não será permitido levar nenhuma sobra de alimentos/bebidas, a não ser que estas tenham sido levadas pelo (a) CONTRANTANTE, sob pena de ser cobrado deste o valor de um excedente por convidado que infringir a regra.</span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;"><strong><u>O CONTRATADO conta com cadeiras para acomodar até sessenta pessoas (60) no salão, distribuídas entre 10 mesas.</u></strong></span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;">Caso o evento contratado não possa ser realizado devido a pandemia do Covid-19 o mesmo poderá ser remarcado no prazo de até 12 meses sem alteração de valores, no caso de CANCELAMENTO será cobrado a multa acima estipulada e o pagamento será de acordo com a medida provisória 948/2020 na Lei 14.046, o consumidor será restituido no prazo de até 12 meses contado a partir do encerramento do estado de calamidade pública.</span>
    </p>
    <p style="text-align:justify;">
        <span style="font-size:12px;">O CONTRATADO solicita permissão do uso das imagens para a divulgação de seu trabalho em seu site, redes sociais e meios de comunicação por tempo indeterminado. (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) AUTORIZO &nbsp;&nbsp;&nbsp; (&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;) NÃO AUTORIZO</span>
    </p>
    <p>
        <span style="font-size:12px;">E por estarem assim, justas e contratadas, as partes de pleno acordo em tudo que se encontra disposto neste instrumento particular, firmam o presente instrumento, em 02 (duas) vias de igual teor e forma, transcritas apenas no anverso para maior validade jurídica.</span>
    </p>
    <p>
        <span style="font-size:12px;"></span>
    </p>
    `
}

interface signatureHtmlProps {
    name: string;
}

export const signatureHtml = ({ name }: signatureHtmlProps) => {
    return `
    <figure class="table" style="float:left;width:500px;">
    <table>
        <tbody>
            <tr>
                <td>
                    <span style="font-size:12px;"><strong>__________________________________________</strong></span>
                </td>
                <td>
                    &nbsp;
                </td>
                <td>
                    &nbsp;
                </td>
                <td>
                    <span style="font-size:12px;"><strong>&nbsp;________________________________________</strong></span>
                </td>
            </tr>
            <tr>
                <td>
                    <span style="font-size:12px;"><strong>CONTRATANTE</strong></span>
                </td>
                <td>
                    &nbsp;
                </td>
                <td>
                    &nbsp;
                </td>
                <td>
                    <span style="font-size:12px;"><strong>CONTRATADA</strong></span>
                </td>
            </tr>
            <tr>
                <td>
                    <span style="font-size:12px;"><strong>${name}</strong></span>
                </td>
                <td>
                    &nbsp;
                </td>
                <td>
                    &nbsp;
                </td>
                <td>
                    <span style="font-size:12px;"><strong>KARIN PATRICIA ARAUJO ALECRIM</strong></span>
                </td>
            </tr>
        </tbody>
    </table>
</figure>
    `
}

