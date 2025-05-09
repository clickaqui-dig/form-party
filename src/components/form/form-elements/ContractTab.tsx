import Label from "../Label";

import ContractEditor from "@/components/editor/ContractEditor";

export default function ContractTab() {
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
        <ContractEditor />
      </div>
    </div>
  );
}