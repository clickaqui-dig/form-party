import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import ContractTab from "./ContractTab";
import PaymentModal from "./PaymentModal";
import FormInModal from "@/components/example/ModalExample/FormInModal";
import { useModal } from "@/hooks/useModal";

export default function TabsComponent() {
    const [activeTab, setActiveTab] = useState("itensContrato");
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <ComponentCard title="Contratos e Pagamentos">
            <div className="p-6 bg-gray-100 border rounded-lg shadow-md">
                {/* Título */}
                <h2 className="text-lg font-bold">Contrato e Pagamentos</h2>

                {/* Navegação das Abas */}
                <div className="flex space-x-4 border-b mt-4">
                    <button
                        className={`py-2 px-4 ${activeTab === "itensContrato"
                            ? "border-b-2 border-green-600 text-green-600 font-semibold"
                            : "text-gray-600 hover:text-green-600"
                            }`}
                        onClick={() => setActiveTab("itensContrato")}
                    >
                        Itens do contrato
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === "pagamentos"
                            ? "border-b-2 border-green-600 text-green-600 font-semibold"
                            : "text-gray-600 hover:text-green-600"
                            }`}
                        onClick={() => setActiveTab("pagamentos")}
                    >
                        Pagamentos
                    </button>
                    <button
                        className={`py-2 px-4 ${activeTab === "contrato"
                            ? "border-b-2 border-green-600 text-green-600 font-semibold"
                            : "text-gray-600 hover:text-green-600"
                            }`}
                        onClick={() => setActiveTab("contrato")}
                    >
                        Contrato
                    </button>
                </div>

                {/* Conteúdo das Abas */}
                <div className="mt-6">
                    {activeTab === "itensContrato" && (
                        <div>
                            {/* Conteúdo da aba "Itens do Contrato" */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Modelo de produtos e serviços
                                </label>
                                <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                                    <option>Informe o modelo de produtos e serviços</option>
                                </select>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                        Remover
                                    </button>
                                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                                        Adicionar novo item
                                    </button>
                                </div>
                                <table className="min-w-full divide-y divide-gray-200 border rounded">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Descrição
                                            </th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Valor (R$)
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-white">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                Nenhum registro encontrado
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                0,00
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                                Total dos itens
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                                                0,00
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "pagamentos" && (
                        <div className="mt-4">
                            {/* Campos de entrada: Desconto, Acréscimo e Valor Total */}
                            <div className="flex flex-wrap gap-4">
                                {/* Campo Desconto */}
                                <div className="w-full md:w-1/3">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Desconto (R$)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="Informe o desconto"
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Campo Acréscimo */}
                                <div className="w-full md:w-1/3">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Acréscimo (R$)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            placeholder="Informe o acréscimo"
                                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                                        />
                                    </div>
                                </div>

                                {/* Valor Total */}
                                <div className="w-full md:w-1/3">
                                    <label className="block mb-1 text-sm font-medium text-gray-700">Valor Total</label>
                                    <p className="text-lg text-green-600 font-bold mt-2">R$ 0,00</p>
                                </div>
                            </div>

                            {/* Botões de Remover e Adicionar Pagamento */}
                            <div className="flex flex-wrap items-center gap-4 mt-4">
                                <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition">
                                    ✖ Remover
                                </button>
                                <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
                                    onClick={() => setModalOpen(true)}
                                >
                                    ➕ Adicionar pagamento
                                </button>
                            </div>

                            {/* Tabela de pagamentos */}
                            <div className="mt-6 overflow-x-auto">
                                <table className="min-w-full border divide-y divide-gray-200 rounded-lg overflow-hidden">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                <input type="checkbox" />
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Valor (R$)
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Data Pagamento
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Recebido?
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Observações
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Meio de Pagamento
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Nenhum registro encontrado */}
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-500 text-center" colSpan={6}>
                                                Nenhum registro encontrado
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                        <tr>
                                            <td className="px-6 py-4 text-sm font-medium text-right" colSpan={6}>
                                                Total: R$ 0,00
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === "contrato" && (
                        <div>
                            <ContractTab />
                        </div>
                    )}
                    <PaymentModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
                </div>
            </div>
        </ComponentCard>
    );
}