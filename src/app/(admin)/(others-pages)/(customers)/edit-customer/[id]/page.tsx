"use client"

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormCustomer from "@/components/form/customer";
import { validationSchema } from "@/components/form/customer/validation";
import { Customer } from "@/models/Customer";
import { getCustomerById } from "@/services/customer/getCustomerById";
import { maskCEP, maskPhone } from "@/utils/masks";
import { Formik } from "formik";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"


export default function PageEditCustomer() {
    const params = useParams();
    const id = params.id;
    const [initialValues, setInitialValues] = useState<Customer>({
        id: 0,
        nome: "",
        celular: "",
        email: "",
        dataCadastro: "",
        documento: "",
        cep: "",
        endereco: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        status: true
    });

    useEffect(() => {
        if (id) {
            fetchCustomer(Number(id));
        }
    }, []);

      const fetchCustomer = async (id: number ) => {
        try {
            const response = await getCustomerById({ id });

            if (response) {
                setInitialValues({
                    ...response,
                    celular: response.celular ? maskPhone(response.celular) : "",
                    documento: response.documento,
                    cep: response.cep?  maskCEP(response.cep) : "" ,
                    uf: response.uf?.toLowerCase(),
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
            <PageBreadcrumb pageTitle="Edição Cliente" />
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
                {({ handleSubmit, isValid }) => {
                    return (
                        <ComponentCard title="Formulário">
                            <FormCustomer />
                            <button
                                onClick={() => handleSubmit}
                                type="button"
                                disabled={isValid}
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