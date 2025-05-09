import { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import ContractTab from "./ContractTab";
import PaymentModal from "../modals/PaymentModal";
import Label from "../Label";
import Select from "../Select";
import { ChevronDownIcon } from "@/icons";
import ContractModal from "../modals/ContractModal";
import { Field, FieldProps, useFormikContext } from "formik";
import Input from "../input/InputField";

const typeDiscount = [
    { value: "fechado", label: "Fechado" },
    { value: "aberto", label: "Aberto" },
];

interface ContractItem {
    id: number;
    descricao: string;
    valor: number;
}

export interface PaymentItem {
    id: number;
    valor: string;
    meioPagamento: string,
    dataPagamentos: string,
    recebido: boolean,
    observacoes: string
}

export default function TabsComponent() {
    const [activeTab, setActiveTab] = useState("itensContrato");
    const [useDiscount, setUseDiscount] = useState("fechado");
    const [isModalOpen, setModalOpen] = useState(false);
    const [isModalPaymentOpen, setModalPaymentOpen] = useState(false);
    const [contractItems, setContractItems] = useState<ContractItem[]>([]);
    const [paymentsItems, setPaymentsItems] = useState<PaymentItem[]>([]);
    const [selectedPayments, setSelectedPayments] = useState<any[]>([]);
    const [selectedItemContract, setSelectedItemContract] = useState<any[]>([]);
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        setFieldValue("payments", paymentsItems)
        setFieldValue("itemContrato", contractItems)
    }, [paymentsItems, contractItems]);

    const handleAddContractItem = (newItem: ContractItem) => {

        const newEntry = {
            ...contractItems,
            id: newItem.id,
            descricao: newItem.descricao,
            valor: newItem.valor,
        };
        setContractItems(prevItems => [...prevItems, newEntry]);

        setModalOpen(false);
    }

    const handleAddPaymentItem = (newItem: PaymentItem) => {
        const newEntry = {
            ...paymentsItems,
            id: newItem.id,
            valor: newItem.valor,
            meioPagamento: newItem.meioPagamento,
            dataPagamentos: newItem.dataPagamentos,
            recebido: newItem.recebido,
            observacoes: newItem.observacoes

        };

        setPaymentsItems(prevItems => [...prevItems, newEntry]);
        setModalPaymentOpen(false);
    }

    const handleSelectPayments = (id: any) => {
        setSelectedPayments((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id]
        );
    };

    const handleSelectItemContract = (id: any) => {
        setSelectedItemContract((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id]
        );
    };

    const handleRemoveBirthday = () => {
        if (selectedPayments.length === 0) {
            alert("Selecione pelo menos um aniversariante para remover.");
            return;
        }

        const updatedBirthdays = paymentsItems.filter(
            (payment) => !selectedPayments.includes(payment.id)
        );
        setPaymentsItems(updatedBirthdays);
        setSelectedPayments([]);
    };

    const handleRemoveItemContract = () => {
        if (selectedItemContract.length === 0) {
            alert("Selecione pelo menos um item para remover.");
            return;
        }

        const updatedItemContract = contractItems.filter(
            (payment) => !selectedItemContract.includes(payment.id)
        );
        setContractItems(updatedItemContract);
        setSelectedPayments([]);
    };

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
                    onClick={() => alert("Finalize o cadastro do contrato primeiro.")}
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
                            <select className="mt-1 block w-full dark:border-white dark:bg-gray- rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm dark:text-white">
                                <option >Informe o modelo de produtos e serviços</option>
                            </select>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleRemoveItemContract}>
                                    Remover
                                </button>
                                <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => setModalOpen(true)}>
                                    Adicionar novo item
                                </button>
                            </div>
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 border rounded dark:border-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                                            Sel
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                                            Descrição
                                        </th>
                                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
                                            Valor (R$)
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contractItems.length > 0 ? (
                                        contractItems.map((item, index) => (
                                            <tr key={index} className="bg-white dark:bg-gray-800">
                                                <td className="px-6 py-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedItemContract.includes(item.id)}
                                                        onChange={() => handleSelectItemContract(item.id)}
                                                    />
                                                </td>
                                                <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300/80">
                                                    {item.descricao}
                                                </td>
                                                <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300/80 text-right">
                                                    {item.valor}
                                                </td>
                                            </tr>
                                        ))

                                    ) : (
                                        <tr className="bg-white dark:bg-gray-800">
                                            <td className=" px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center" colSpan={2}>
                                                Nenhum Registro encontrado
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                <tfoot className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-medium text-right dark:text-white" colSpan={6}>
                                            Total: {contractItems.reduce((total, item) => total + Number(item.valor), 0).toFixed(2)}
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
                                    onChange={(event) => {
                                        setUseDiscount(event)
                                        setFieldValue("tipoPagamento", event)
                                    }}
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
                                <Label>Desconto {useDiscount === "fechado" ? "(R$)" : "(%)"}</Label>
                                <Field id="desconto" name="desconto"
                                    render={({ field }: FieldProps) => (
                                        <Input
                                            type="number"
                                            onChange={(event) => {
                                                setFieldValue("desconto", event.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            {/* Campo Acréscimo */}
                            <div className="w-full md:w-1/3">
                                <Label>Acréscimo {useDiscount === "fechado" ? "(R$)" : "(%)"}</Label>
                                <Field id="acrescimo" name="acrescimo"
                                    render={({ field }: FieldProps) => (
                                        <Input
                                            type="number"
                                            onChange={(event) => {
                                                setFieldValue("acrescimo", event.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>

                            {/* Valor Total */}
                            <div className="w-full md:w-1/3">
                                <Label>Valor Total</Label>
                                <p className="text-lg text-green-600 font-bold mt-2">R$ 0,00</p>
                            </div>
                        </div>

                        {/* Botões de Remover e Adicionar Pagamento */}
                        <div className="flex flex-wrap items-center gap-4 mt-4">
                            <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition" onClick={handleRemoveBirthday}>
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
                            <table className="min-w-full border divide-y divide-gray-200 dark:divide-gray-700 rounded-lg overflow-hidden ">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                                            Sel
                                        </th>
                                        <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                                            Valor (R$)
                                        </th>
                                        <th className="px-10 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                                            Data Pagamento
                                        </th>
                                        <th className="px-10 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                                            Recebido?
                                        </th>
                                        <th className="px-10 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                                            Observações
                                        </th>
                                        <th className="px-10 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                                            Meio de Pagamento
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paymentsItems.length > 0 ? (
                                        paymentsItems.map((item, index) => (
                                            <tr key={index} className="bg-white dark:bg-gray-800">
                                                <td className="px-10 py-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedPayments.includes(item.id)}
                                                        onChange={() => handleSelectPayments(item.id)}
                                                    />
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                                                    {item.valor}
                                                </td>
                                                <td className="px-10 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                                                    {item.dataPagamentos}
                                                </td>
                                                <td className="px-10 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                                                    {item.recebido === true ? "Sim" : "Não"}
                                                </td>
                                                <td className="px-10 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                                                    {item.observacoes}
                                                </td>
                                                <td className="px-10 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                                                    {item.meioPagamento}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-500 text-center" colSpan={6}>
                                                Nenhum registro encontrado
                                            </td>
                                        </tr>
                                    )
                                    }

                                    {/* Nenhum registro encontrado */}

                                </tbody>
                                <tfoot className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <td className="px-6 py-4 text-sm font-medium text-right dark:text-white" colSpan={6}>
                                            Total: {paymentsItems.reduce((total, item) => total + Number(item.valor), 0).toFixed(2)}
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
                <PaymentModal isOpen={isModalPaymentOpen} onClose={() => setModalPaymentOpen(false)} onAddItem={handleAddPaymentItem} />
                <ContractModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAddItem={handleAddContractItem} />
            </div>
        </ComponentCard>
    );
}