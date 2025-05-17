/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ComponentCard from "../../../../common/ComponentCard";
import ContractTab from "../../../form-elements/ContractTab";
import { useFormikContext } from "formik";
import { ItemsContract } from "./ItemsContract";
import { PaymentsContract } from "./PaymentsContract";

export default function TabsComponent() {
    const [activeTab, setActiveTab] = useState("itensContrato");
    const { values } = useFormikContext<any>();

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
                    onClick={() => {
                        if (values.id) {
                            setActiveTab("pagamentos")
                        }
                    }}
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
                    <ItemsContract />
                )}

                {activeTab === "pagamentos" && (
                    <PaymentsContract />
                )}

                {activeTab === "contrato" && (
                    <ContractTab />
                )}
            </div>
        </ComponentCard>
    );
}