/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Formik, FormikHelpers } from "formik";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getContractById } from "@/services/contract/getContractById";
import FormContract from "@/components/form/contract";


export default function PageEditCustomer() {
    const params = useParams();
    const id = params.id;
    const [initialValues, setInitialValues] = useState<any>({
        idForm: 0,
        situacao: "",
        nomeCliente: "",
        celularCliente: "",
        emailCliente: "",
        documento: "",
        cep: "",
        endereco: "",
        numero: "",
        cidade: "",
        uf: "",
        status: false,
        valorRecebido: 0,
        valorPendente: 0,
        valorTotal: 0,
        tipoDoContrato: "",
        dataHoraInicial: "",
        dataHoraFinal: "",
        duracao: 0,
        quantidadeConvidados: 0,
        observacoes: "",
        listaAniversariantes: [],
        itensContrato: [],
        tipoPagemento: [],
        desconto: 0,
        acrescimo: 0,
    });

    useEffect(() => {
        if (id) {
            fetchCustomer(Number(id));
        }

    }, [id]);

    const fetchCustomer = async (id: number) => {
        try {
            const response = await getContractById({ id });
            console.log("response ===>>>", response)
            if (response) {
                const listaAniversariantes = response.listaAniversariantes.map((item) => {
                    return {
                        id: item.id,
                        nome: item.nome,
                        dataNascimento: item.dataNascimento,
                        tema: item.tema.descricao,
                        idade: item.idade,
                        idadeNoEvento: item.idadeNoEvento,
                    }
                })
                setInitialValues({
                    ...response,
                    idForm: response.id,
                    nomeCliente: response.cliente.nome,
                    emailCliente: response.cliente.email,
                    documento: response.cliente.documento,
                    cep: response.cliente.cep,
                    endereco: response.cliente.endereco,
                    numero: response.cliente.numero,
                    cidade: response.cliente.cidade,
                    celularCliente: response.cliente.celular,
                    uf: response.cliente.uf,
                    tipoDoContrato:response.tipoDoContrato,
                    listaAniversariantes,
                    itensContrato: response.itensContrato,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (
        values: typeof initialValues
    ) => {
        console.log(values)

    }

    return (
        <div>
            <PageBreadcrumb pageTitle="Edição Contrato" />
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {({ handleSubmit, isValid, dirty }) => {
                    return (
                        <ComponentCard title="Edição Contrato">
                            <FormContract />
                            <button
                                onClick={() => handleSubmit()}
                                type="button"
                                disabled={!(isValid && dirty)}
                                className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                            >
                                Salvar
                            </button>
                        </ComponentCard>
                    )
                }}
            </Formik>
        </div>
    )
}