/* eslint-disable @typescript-eslint/no-explicit-any */
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { useFormikContext } from "formik";

import {
} from "@lexical/rich-text";
import { useMemo } from "react";
import { ToolbarPlugin } from "../../EditText/ToolbarPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { clauseHtml, contractItemHtml, headerHtml, signatureHtml, valuesHtml } from "../../EditText/config/initialHtml";
import { editorConfig } from "../../EditText/config/editorConfig";
import { PrepopulatedFromHtmlPlugin } from "../../EditText/config/populatedHtml";
import { OptionsEditComponent } from "../../EditText/OptionsEditComponent";
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

export const WriteContract = () => {
  const { values } = useFormikContext<any>();

  const templateHtml = useMemo(
    () => {
      const header = headerHtml({
        nameClient: values.nomeCliente,
        documentClient: values.documento,
        street: values.endereco,
        number: values.numero,
        city: values.cidade,
        state: values.uf,
        cep: values.cep,
        dateInit: values.dataHoraInicial,
        dateEnd: values.dataHoraFinal,
      });
      const itens = contractItemHtml(values.itensContrato);

      const value = valuesHtml({
        addition: values.acrescimo,
        discount: values.desconto,
        valor: values.valorTotal,
        amountAlreadyPaid: values.valorRecebido,
        amountToPay: values.valorPendente
      })
      
      const clause = clauseHtml({ birthday: values.aniversariantes, installments: values.pagamentos, temas: values.temas})

      const signature = signatureHtml({ name: values.nomeCliente, imageSrc: "/images/logo/bolo-balao.png"});

      return header + itens + value + clause + signature;
    },
    [values]
  );

  return (
    <LexicalComposer key={templateHtml} initialConfig={editorConfig}>
      <OptionsEditComponent />
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={<ContentEditable className="border border-gray-300 rounded-md p-4 min-h-[600px] focus:outline-blue-500" />}
        placeholder={<span className="absolute left-4 top-4 text-gray-400 select-none">Digite o contrato…</span>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <LinkPlugin />
      <ListPlugin />
      <TablePlugin />
      <PrepopulatedFromHtmlPlugin
        html={templateHtml} />
    </LexicalComposer>
  )
}