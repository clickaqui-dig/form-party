/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ComponentCard from "../../../../common/ComponentCard";
import { useFormikContext } from "formik";
import { PaymentsContract } from "./tabs/PaymentsContract";
import { ItemsContract } from "./tabs/ItemsContract";
import { WriteContract } from "./tabs/WriteContract";


export const TabsComponent = () => {
    const [activeTab, setActiveTab] = useState("itensContrato");
    const { values, setFieldValue } = useFormikContext<any>();

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
                    className={`py-2 px-4 disabled:text-gray-600 disabled:pointer-events-none ${activeTab === "pagamentos"
                        ? "border-b-2 border-green-600 text-green-600 dark:text-green-400 font-semibold"
                        : " text-gray-600 hover:text-green-600 dark:text-gray-200"
                        }`}
                    disabled={!values.id ? true : false}
                    onClick={() => {
                        if (values.id) {
                            setActiveTab("pagamentos")
                        }
                    }}
                >
                    Pagamentos
                </button>
                <button
                    className={`py-2 px-4 disabled:text-gray-600 disabled:pointer-events-none ${activeTab === "contrato"
                        ? "border-b-2 border-green-600 text-green-600 dark:text-green-400 font-semibold"
                        : "text-gray-600 hover:text-green-600 dark:text-gray-200 "
                        }`}
                    disabled={!values.id ? true : false}
                    onClick={() => {
                        if (values.id) {
                            setActiveTab("contrato")
                            
                            //TODO :: SOLUÇÃO PALIATIVA
                            setFieldValue("valorPendente", values.valorTotal - Number(values.valorRecebido));
                        }
                    }}
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
                    <WriteContract />
                )}
            </div>
        </ComponentCard>
    );
}