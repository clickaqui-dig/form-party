/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { Field, FieldProps, useFormikContext } from "formik";
import { ChevronDownIcon } from "lucide-react";
import { useEffect, useMemo, useState, } from "react";
import { PaymentsContractModal } from "../../Modals/PaymentContractModal";
import { maskCurrency } from "@/utils/masks/maskCurrency";
import { unmaskCurrency } from "@/utils/masks/unMaskCurrency";
import { toast } from "react-toastify";
import { formatDate } from "@/utils/toDates";
import { maskCurrencyWithLimit } from "@/utils/masks/limityValue";

interface PaymentItem {
    id: number;
    valor: string;
    meioPagamento: string,
    dataPagamentos: string,
    recebido: boolean,
    observacoes: string
}

const typeDiscount = [
    { value: "fechado", label: "Fechado" },
];

export const PaymentsContract = () => {
    const [paymentsItems, setPaymentsItems] = useState<PaymentItem[]>([]);
    const [isModalPaymentOpen, setModalPaymentOpen] = useState(false);
    const [selectedPayments, setSelectedPayments] = useState<any[]>([]);
    const [useDiscount, setUseDiscount] = useState("fechado");

    const [discount, setDiscount] = useState(0);
    const [addition, setAddition] = useState(0);


    const { values, setFieldValue } = useFormikContext<any>();

    useEffect(() => {
        setPaymentsItems(values.pagamentos);
    }, [values]);


    const finalCurrency = useMemo(() => {
        const newCurrency = (values.valorTotal + addition - discount).toFixed(2);
        return newCurrency;
    }, [values.valorTotal, addition, discount]);
;

    const valueTotal = useMemo(() => {
        const total = paymentsItems.reduce((total, item) => total + Number(unmaskCurrency(item.valor)), 0).toFixed(2)
        return maskCurrency(total);
    }, [paymentsItems]);

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

        const total = Number(values.valorRecebido) + Number(unmaskCurrency(newEntry.valor));

        if (values.valorTotal - total < 0) {
            toast.warning('O valor do pagamento supera o valor faltante.');
        } else {
            setPaymentsItems(prevItems => [...prevItems, newEntry]);
            setFieldValue("pagamentos", [...values.pagamentos, newEntry])
            setModalPaymentOpen(false);
        }
    }

    const handleSelectPayments = (id: number) => {
        setSelectedPayments((prev: any) =>
            prev.includes(id)
                ? prev.filter((selectedId: any) => selectedId !== id)
                : [...prev, id]
        );
    };


    const handleRemovePayments = () => {
        if (selectedPayments.length === 0) {
            toast.warning("Selecione pelo menos um pagamento para remover.");
            return;
        }

        const updatedPayments = paymentsItems.filter(
            (payment) => !selectedPayments.includes(payment.id)
        );
        setPaymentsItems(updatedPayments);
        setFieldValue("pagamentos", updatedPayments)
        setSelectedPayments([]);
    };

    const handleChangeCurrency = (e: any, type: string) => {
        if (/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(e.key)) {
            e.preventDefault();           
        }

        const currency = unmaskCurrency(e.target.value)

        const maskedValue = maskCurrencyWithLimit(String(currency), values.valorTotal);
        setFieldValue(type, maskedValue);

        if (type === 'desconto') {
            setDiscount(currency);
            setFieldValue('valorTotal', (values.valorTotal + addition - currency).toFixed(2));
        }

        if (type === 'acrescimo') {
            setAddition(currency);
            setFieldValue('valorTotal', (values.valorTotal + currency - discount).toFixed(2));
        }

    };
    return (
        <>
            <div className="mt-4">
                <div className="mb-5">
                    <Label>Tipo de Pagamento</Label>
                    <div className="relative">
                        <Select
                            options={typeDiscount}
                            onChange={(event) => {
                                setUseDiscount(event)
                            }}
                            className="dark:bg-dark-700"
                            defaultValue="fechado"
                            disable={true}
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
                                    {...field}
                                    type="text"
                                    
                                    onChange={(e) => {
                                        handleChangeCurrency(e, "desconto")
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
                                    {...field}
                                    type="text"
                                   
                                    onChange={(e) => {
                                        handleChangeCurrency(e, "acrescimo")
                                    }}
                                />
                            )}
                        />
                    </div>

                    {/* Valor Total */}
                    <div className="w-full md:w-1/3">
                        <Label>Valor Total</Label>
                        <p className="text-lg text-green-600 font-bold mt-2">R$ {finalCurrency}</p>
                    </div>
                </div>

                {/* Botões de Remover e Adicionar Pagamento */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                    <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition" onClick={handleRemovePayments}>
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
                                            {formatDate(item.dataPagamentos)}
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

                        </tbody>
                        <tfoot className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <td className="px-6 py-4 text-sm font-medium text-right dark:text-white" colSpan={6}>
                                    Total: {valueTotal}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <PaymentsContractModal isOpen={isModalPaymentOpen} onClose={() => setModalPaymentOpen(false)} onAddItem={handleAddPaymentItem} />

        </>

    )
}