import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import ContractTab from "./ContractTab";
import PaymentModal from "./PaymentModal";
import Label from "../Label";
import Select from "../Select";
import { ChevronDownIcon } from "@/icons";
import ContractModal from "./ContractModal";

const typeDiscount = [
    { value: "fechado", label: "Fechado" },
    { value: "aberto", label: "Aberto" },
];

interface ContractItem {
  descricao: string;
  valor: number;
}

interface PaymentItem {
    valor: string; 
    meioPagamento: string, 
    dataPagamentos : string, 
    recebido : boolean, 
    observacoes : string
  }

export default function TabsComponent() {
    const [activeTab, setActiveTab] = useState("itensContrato");
    const [useDiscount, setUseDiscount] = useState("fechado");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalPaymentOpen, setModalPaymentOpen] = useState(false);
    const [contractItems, setContractItems] = useState<ContractItem[]>([]);
    const [paymenteItems, setPaymentsItems] = useState<PaymentItem[]>([]);
    setModalPaymentOpen

    const handleSelectChange = (value: string) => {
        setUseDiscount(value)
    };

    const handleAddContractItem = (newItem : ContractItem)=>{
        setContractItems(prevItems => [...prevItems, newItem]);
        setModalOpen(false);
    }

    const handleAddPaymentItem = (newItem : PaymentItem)=>{
        setPaymentsItems(prevItems => [...prevItems, newItem]);
        setModalOpen(false);
    }

    return (
        <ComponentCard title="Contratos e Pagamentos">
            <div className=" flex space-x-4 border-b -mt-5">
                <button
                    className={`py-2 px-4 ${activeTab === "itensContrato"
                        ? "border-b-2 border-green-600 text-green-600 dark:text-green-400 font-semibold"
                        : "text-gray-600 hover:text-green-600 dark:text-gray-200"
                        }`}
                    onClick={() => setActiveTab("itensContrato")}
                >
                    Itens do contrato
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === "pagamentos"
                        ? "border-b-2 border-green-600 text-green-600 dark:text-green-400 font-semibold"
                        : " text-gray-600 hover:text-green-600 dark:text-gray-200"
                        }`}
                    onClick={() => setActiveTab("pagamentos")}
                >
                    Pagamentos
                </button>
                <button
                    className={`py-2 px-4 ${activeTab === "contrato"
                        ? "border-b-2 border-green-600 text-green-600 dark:text-green-400 font-semibold"
                        : "text-gray-600 hover:text-green-600 dark:text-gray-200"
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
                            <Label>
                                Modelo de produtos e serviços
                            </Label>
                            <select className="mt-1 block w-full dark:border-white dark:bg-gray- rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm">
                                <option >Informe o modelo de produtos e serviços</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                    Remover
                                </button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => setModalOpen(true)}>
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
                                    {contractItems.length > 0 ? (
                                        contractItems.map((item,index)=>(
                                            <tr key={index} className="bg-white">
                                                <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {item.descricao}
                                                </td>
                                                <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                                                    {item.valor}
                                                </td>
                                            </tr>
                                        ))
                                      
                                    ) : (
                                        <tr className="bg-white">
                                            <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500" colSpan={2}>
                                                Nenhum Registro encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot className="bg-gray-50">
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                            Total dos itens
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">
                                            {contractItems.reduce((total,item)=> total + item.valor,0).toFixed(2)}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === "pagamentos" && (

                    <div className="mt-4">
                        <div className="mb-5">
                            <Label>Tipo de Pagamento</Label>
                            <div className="relative">
                                <Select
                                    options={typeDiscount}
                                    placeholder="Tipo"
                                    onChange={handleSelectChange}
                                    className="dark:bg-dark-700"
                                />
                                <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                                    <ChevronDownIcon />
                                </span>
                            </div>
                        </div>
                        {/* Campos de entrada: Desconto, Acréscimo e Valor Total */}
                        <div className="flex flex-wrap gap-4">
                            {/* Campo Desconto */}
                            <div className="w-full md:w-1/3">
                                <Label>Desconto {useDiscount === "fechado" ? "(R$)" :"(%)"}</Label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="Informe o desconto"
                                        className="dark:text-white w-full px-3 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                                        // onChange={}
                                    />
                                </div>
                            </div>

                            {/* Campo Acréscimo */}
                            <div className="w-full md:w-1/3">
                                <Label>Acréscimo {useDiscount === "fechado" ? "(R$)" :"(%)"}</Label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        placeholder="Informe o acréscimo"
                                        className="dark:text-white w-full px-3 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Valor Total */}
                            <div className="w-full md:w-1/3">
                                <Label>Valor Total</Label>
                                <p className="text-lg text-green-600 font-bold mt-2">R$ 0,00</p>
                            </div>
                        </div>

                        {/* Botões de Remover e Adicionar Pagamento */}
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition">
                                ✖ Remover
                            </button>
                            <button className="flex items-center bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
                                onClick={() => setModalPaymentOpen(true)}
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
                <PaymentModal isOpen={isModalPaymentOpen} onClose={() => setModalPaymentOpen(false)} onAddItem={handleAddPaymentItem}/>
                <ContractModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAddItem={handleAddContractItem}/>
            </div>
        </ComponentCard>
    );
}