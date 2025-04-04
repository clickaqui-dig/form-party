import { useState } from "react";
import dynamic from "next/dynamic";
import Label from "../Label";

// Importa dinamicamente o Editor para evitar erros de renderização no Next.js
// const RichTextEditor = dynamic(() => import("@mantine/rte"), { ssr: false });

export default function ContractTab() {
  const [contractContent, setContractContent] = useState(""); // Estado para conteúdo do contrato

  return (
    <div className="mt-4">
      {/* Data de Geração */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="w-full md:w-1/3">
          <Label className=" dark:text-gray-200">
            Data Geração
          </Label>
          <input
            type="date"
            className="dark:text-white w-full px-3 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
          />
        </div>
      </div>

      {/* Botões de Ações */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">
          📝 Gerar contrato
        </button>
        <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">
          📤 Enviar contrato por e-mail
        </button>
      </div>

      {/* Ações relacionadas ao contrato */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <button className="dark:text-white text-blue-500 hover:underline flex items-center gap-2">
          🔽 Baixar contrato
        </button>
        <button className="dark:text-white text-blue-500 hover:underline flex items-center gap-2">
          📱 Compartilhar no WhatsApp
        </button>
        <button className="dark:text-white not-first-of-type:text-blue-500 hover:underline flex items-center gap-2">
          🖨️ Imprimir contrato
        </button>
      </div>

      {/* Editor de Texto para o Contrato */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Contrato
        </label>
        {/* <RichTextEditor
          value={contractContent}
          onChange={setContractContent}
          placeholder="Escreva o contrato aqui..."
          controls={[
            ["bold", "italic", "underline", "strike"],
            ["link", "blockquote", "codeBlock"],
            ["unorderedList", "orderedList"],
            ["alignLeft", "alignCenter", "alignRight"],
            ["sup", "sub"],
            ["table"],
            ["undo", "redo"],
          ]}
          className="border rounded-md"
        /> */}
      </div>
    </div>
  );
}