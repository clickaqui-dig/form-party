/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormikContext } from "formik";
import { useEffect, useState } from "react"
import { ItemsContractModal } from "../Modals/ItemsContractModal";

interface ContractItem {
    id: number;
    descricao: string;
    valor: number;
}

interface TypeSelectItemContract {
    id: number;
    index: number;
}

export const ItemsContract = () => {
    const [contractItems, setContractItems] = useState<ContractItem[]>([]);
    const [selectedItemContract, setSelectedItemContract] = useState<TypeSelectItemContract[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const { values } = useFormikContext<any>();

    useEffect(() => {
        setContractItems(values.itensContrato)
    }, [values]);

    const handleAddContractItem = (newItem: ContractItem) => {

        const newEntry = {
            id: newItem.id,
            descricao: newItem.descricao,
            valor: newItem.valor,
        };
        setContractItems(prevItems => [...prevItems, newEntry]);

        setModalOpen(false);
    }

    const handleRemoveItemContract = () => {
        if (selectedItemContract.length === 0) {
            //!TODO Colocar o toast
            //alert("Selecione pelo menos um item para remover.");
            return;
        }
        const selected = selectedItemContract.map((item) => item.index)

        const updatedItemContract = contractItems.filter(
            (item, index) => !selected.includes(index)
        );

        setContractItems(updatedItemContract);
    };

    const handleSelectItemContract = (id: number, index: number) => {
        if (!handleFindItem(index)) {
            setSelectedItemContract((prev) => [...prev, { id, index }]);
        } else {
            setSelectedItemContract((prev) => prev.filter((selectedId) => selectedId.index !== index))
        }
    };
    
    const handleFindItem = (index: number) => {
        const existItem = selectedItemContract.find((item) => item.index === index)

        return existItem ? true : false;
    }

    return (
        <>
            <div>
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
                                                checked={handleFindItem(index)}
                                                onChange={() => handleSelectItemContract(item.id, index)}
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
            <ItemsContractModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAddItem={handleAddContractItem} />
        </>
       
    )
}