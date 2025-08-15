/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import TemplatePlugin from './plugins/TemplatePlugin';
import { ToolbarPlugin } from './plugins/ToolbarPlugin';
import { useFormikContext } from 'formik';
import { useMemo, useState } from 'react';
import { editorConfig } from './core/editorConfig';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OptionsEditComponent } from './components/Options';
import { initialHtml } from './Template';

export default function EditorComposer() {
  const { values } = useFormikContext<any>();
  const [id, setId] = useState("");
  const [nameDoc, setNameDoc] = useState("");

  const initialTemplate = useMemo(
    () => {
      setId(values.id);
      setNameDoc(values.nomeCliente);
      const header = {
        nameClient: values.nomeCliente,
        documentClient: values.documento,
        street: values.endereco,
        number: values.numero,
        city: values.cidade,
        state: values.uf,
        cep: values.cep,
        dateInit: values.dataHoraInicial,
        dateEnd: values.dataHoraFinal,
      };
      const contractItem = values.itensContrato;

      const valueHtml = {
        addition: values.acrescimo,
        discount: values.desconto,
        valor: values.valorTotal,
        amountAlreadyPaid: values.valorRecebido,
        amountToPay: values.valorPendente
      };

      const installments = values.pagamentos;
      const clauseHtmlProps = { 
        birthday: values.aniversariantes, 
        installments: values.pagamentos, 
        temas: values.temas, 
        paymentMethod: values.formaPagamento, 
        paymentTerms: values.condicoesPagamento, 
        obs: values.observacoes};

      const signatureHtmlProps = { name: values.nomeCliente };

      const txtHtml = initialHtml({ header, contractItem, valueHtml, installments, clauseHtmlProps, signatureHtmlProps });
      return txtHtml;
    },
    [values]
  );

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <OptionsEditComponent id={id} nameDoc={nameDoc} />
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className="border border-gray-300 rounded-md p-4 min-h-[600px] focus:outline-blue-500" />}
        placeholder={<span className="absolute left-4 top-4 text-gray-400 select-none"></span>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <TablePlugin />
      <LinkPlugin />
      <ListPlugin />
      <TemplatePlugin initialTemplate={initialTemplate} />
    </LexicalComposer>
  );
}
