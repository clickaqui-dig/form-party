/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import ComponentCard from "../../../../../../components/common/ComponentCard";
import PageBreadcrumb from "../../../../../../components/common/PageBreadCrumb";
import { Formik } from "formik";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getContractById } from "../../../../../../services/contract/getContractById";
import FormContract from "../../../../../../components/form/contract";
import { toast } from "react-toastify";
import { putContractById } from "../../../../../../services/contract/putContractById";
import { postPayments } from "../../../../../../services/payments/postPayments";
import { unmaskCurrency, validationTypePayments } from "../../../../../../utils/masks/unMaskCurrency";
import { mapContractFormToRequest } from "../../../../../../models/Contract";

// const initialValues = {
//     idContrato: 0,
//     situacao: "",
//     cliente:0,
//     nomeCliente: "",
//     celularCliente: "",
//     emailCliente: "",
//     documento: "",
//     cep: "",
//     endereco: "",
//     numero: "",
//     cidade: "",
//     uf: "",
//     status: false,
//     valorRecebido: 0,
//     valorPendente: 0,
//     valorTotal: 0,
//     tipoDoContrato: "",
//     dataHoraInicial: "",
//     dataHoraFinal: "",
//     duracao: 0,
//     quantidadeConvidados: 0,
//     observacoes: "",
//     aniversariantes: [],
//     itensContrato: [],
//     tipoPagemento: [],
//     pagamentos: [],
//     desconto: 0,
//     acrescimo: 0,
//     temas: []
// }

const initialValues = {
  idContrato: 0,
  cliente: 0,
  valorRecebido: 0,
  valorPendente: 0,
  valorTotal: 0,
  tipoDoContrato: "",
  dataHoraInicial: "",
  dataHoraFinal: "",
  duracao: 0,
  quantidadeConvidados: 0,
  observacoes: "",
  aniversariantes: [],
  itensContrato: [],
  payments: [],
  temas: [],
  desconto: 0,
  acrescimo: 0,
  situacao: '',
  pagamentos: []
};


export default function PageEditCustomer() {
    const params = useParams();
    const id = params.id;
    const [contract, setInitialValues] = useState<any>(initialValues);

    useEffect(() => {
        if (id) {
            fetchCustomer(Number(id));
        }

    }, [id]);

    const fetchCustomer = async (id: number) => {
        try {
            const response = await getContractById({ id });
            if (response) {
                const listaAniversariantes = response.aniversariantes === undefined ? [] : response.aniversariantes.map((item) => {
                    return {
                        id: item.id,
                        nomeAniversariante: item.nomeAniversariante,
                        idade: item.idade,
                        idadeNoEvento: item.idadeNoEvento,
                    }
                });

                const mapPayments = response.pagamentos === undefined ? [] : response.pagamentos.map((item: any) => {
                    return {
                        valor: Number(item.valor).toFixed(2),
                        meioPagamento: validationTypePayments(item.meioPagamento),
                        dataPagamento: item.dataPagamento,
                        recebido: item.recebido,
                        observacoes: item.observacoes,
                        contratoId: Number(id)
                    }
                });

                const mapThema = response.temas === undefined ? [] : response.temas.map((item :any) => {
                    return {
                        id: item.id,
                        descricao: item.descricao,
                        observacoes: item.observacoes
                    }
                })

                setInitialValues({
                    ...response,
                    idContrato: response.id,
                    cliente: response.cliente.id,
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
                    aniversariantes: listaAniversariantes,
                    itensContrato: response.itensContrato,
                    situacao: response.situacao === 'CANCELADO' ? "Cancelado" : "Em Andamento",
                    pagamentos: mapPayments,
                    temas: mapThema
                });
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
                const payload = mapContractFormToRequest(values, values.cliente);
                const responsePutContract = await putContractById(Number(id), {...payload, situacao: 'EM_ANDAMENTO', desconto:desconto, acrescimo: acrescimo});

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

                let responsePayments = false;

                if (responsePutContract) {
                    responsePayments = await postPayments(Number(id), mapPayments)
                    if (responsePayments) {
                        toast.success("Contrato editado com sucesso !")
                    } else {
                        toast.error("Erro ao cadsaatrar pagamento");
                    }
                } else {
                    toast.error("Erro ao editar contrato");
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