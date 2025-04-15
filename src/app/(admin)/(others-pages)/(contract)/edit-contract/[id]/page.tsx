"use client"

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { validationSchema } from "@/components/form/customer/validation";
import { Formik, FormikHelpers } from "formik";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Contract } from "../../search-contract/page";
import FormContract from "../../new-contract/form";
import { getContractById } from "@/services/contract/getContractById";


export default function PageEditCustomer() {
    const params = useParams();
    const id = params.id;
    const [initialValues, setInitialValues] = useState<Contract>({
        id: 0,
        codigo: "",
        complemento:"",
        bairro:"",
        situacao: "",
        valorRecebido: 0,
        valorPendente: 0,
        valorTotal: 0,
        cliente: "",
        emailCliente: "",
        celularCliente: "",
        documento: "",
        cep:"",
        endereco:"",
        numero:"",
        cidade:"",
        uf:"",
        tiposDeContrato:"",
        dataHoraInicial:"",
        dataHoraFinal:"",
        duracao:0,
        quantidadeConvidados:0,
        observacoes:"",
        listaAniversariantes: [],
        itemContrato:[],
        payments:[],
        tipoPagemento: "",
        desconto: 0,
        acrescimo:0,
        convidados:[],
    });

    useEffect(() => {
        if (id) {
            fetchCustomer(Number(id));
        }

    }, [id]);

      const fetchCustomer = async (id: number ) => {
        try {
            const response = await getContractById({ id });

            if (response) {
                console.log("retornoouu", response);
                setInitialValues({
                    ...response,
                })
            }
        } catch (error) {
          console.log(error);
        }
      }

    const handleSubmit = async (
        values: typeof initialValues,
        formikHelpers: FormikHelpers<typeof initialValues>
    ) => {
        console.log(values)

    }

    useEffect(()=>{
        console.log("initialValues == >",initialValues)
    },[initialValues])

    return (
        <div>
            <PageBreadcrumb pageTitle="Edição Contrato" />
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ handleSubmit, isValid, dirty }) => {
                    return (
                        <ComponentCard title="Formulário">
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