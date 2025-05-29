/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { Formik } from "formik";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getContractById } from "@/services/contract/getContractById";
import FormContract from "@/components/form/contract";
import { toast } from "react-toastify";
import { putContractById } from "@/services/contract/putContractById";
import { postPayments } from "@/services/payments/postPayments";
import { unmaskCurrency, validationTypePayments } from "@/utils/masks/unMaskCurrency";
import { maskCurrency } from "@/utils/masks/maskCurrency";
import { ContractForm } from "@/models/forms/ContractForm";


const initialValues = {
    idContrato: 0,
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
    pagamentos: [],
    desconto: 0,
    acrescimo: 0,
}


export default function PageEditCustomer() {
    const params = useParams();
    const id = params.id;
    const [contract, setInitialValues] = useState<ContractForm>(initialValues);

    useEffect(() => {
        if (id) {
            fetchCustomer(Number(id));
        }

    }, [id]);

    const fetchCustomer = async (id: number) => {
        try {
            const response = await getContractById({ id });
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

                const mapPayments = response.pagamentos.map((item: any) => {
                    return {
                        valor: maskCurrency(item.valor.toString()),
                        meioPagamento: validationTypePayments(item.meioPagamento),
                        dataPagamento: item.dataPagamento,
                        recebido: item.recebido,
                        observacoes: item.observacoes,
                        contratoId: Number(id)
                    }
                })

                setInitialValues({
                    ...response,
                    idContrato: response.id,
                    nomeCliente: response.cliente.nome,
                    emailCliente: response.cliente.email,
                    documento: response.cliente.documento,
                    cep: response.cliente.cep,
                    endereco: response.cliente.endereco,
                    numero: response.cliente.numero,
                    cidade: response.cliente.cidade,
                    celularCliente: response.cliente.celular,
                    uf: response.cliente.uf,
                    tipoDoContrato: response.tipoDoContrato,
                    listaAniversariantes,
                    itensContrato: response.itensContrato,
                    situacao: response.situacao === 'CANCELADO' ? "Cancelado" : "Em Andamento",
                    pagamentos: mapPayments
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = async (
        values: typeof initialValues
    ) => {
        try {
            if (id) {
                const desconto = typeof values.desconto === 'string' ? unmaskCurrency(values.desconto) : values.desconto;
                const acrescimo = typeof values.acrescimo === 'string' ? unmaskCurrency(values.acrescimo) : values.acrescimo;

                const responsePutContract = await putContractById(Number(id), {
                    cliente: values.cliente.id,
                    valorRecebido: Number(values.valorRecebido),
                    valorPendente: values.valorTotal - Number(values.valorRecebido),
                    valorTotal: values.valorTotal,
                    tipoDoContrato: "ANIVERSARIO",
                    dataHoraInicial: values.dataHoraInicial,
                    dataHoraFinal: values.dataHoraFinal,
                    duracao: values.duracao,
                    quantidadeConvidados: values.quantidadeConvidados,
                    observacoes: values.observacoes,
                    desconto,
                    acrescimo,
                    itensContrato: values.itensContrato.map((item: any) => item.id),
                    listaAniversariantes: values.listaAniversariantes.map((item: any) => item.id),
                    situacao: values.situacao === 'Em Andamento ' ? 'EM_ANDAMENTO' : 'CANCELADO',
                });

                const mapPayments = values.pagamentos.map((item: any) => {
                    return {
                        valor: unmaskCurrency(item.valor),
                        meioPagamento: validationTypePayments(item.meioPagamento),
                        dataPagamento: item.dataPagamento,
                        recebido: item.recebido,
                        observacoes: item.observacoes,
                        contratoId: Number(id)
                    }
                })

                const responsePayments = await postPayments(Number(id), mapPayments)

                if(responsePutContract && responsePayments){
                    toast.success("Contrato editado com sucesso !")
                } else {
                    toast.error("Erro: verificar formulario");
                }
            }
        } catch (error: any) {
            console.log(error);
            
            const messageErro = error ? error.response.data.error : 'Algo inesperado aconteceu em nosso sistema.'
            toast.error(messageErro);
        }

    }

    return (
        <div>
            <PageBreadcrumb pageTitle="Edição Contrato" />
            <Formik initialValues={contract} onSubmit={handleSubmit} enableReinitialize>
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