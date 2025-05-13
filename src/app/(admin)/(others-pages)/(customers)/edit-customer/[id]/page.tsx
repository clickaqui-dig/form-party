"use client"

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormCustomer from "@/components/form/customer";
import { validationSchema } from "@/components/form/customer/validation";
import { Customer } from "@/models/Customer";
import { getCustomerById } from "@/services/customer/getCustomerById";
import { putCustomer } from "@/services/customer/putCustomer";
import { maskCEP, maskPhone } from "@/utils/masks";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation"

import { useCallback, useEffect, useState } from "react"


export default function PageEditCustomer() {
    const router = useRouter();
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

    const fetchCustomer = useCallback(
        async (customerId: number) => {
            try {
                const response = await getCustomerById({ id: customerId });

                if (response) {
                    setInitialValues({
                        ...response,
                        celular: response.celular ? maskPhone(response.celular) : "",
                        documento: response.documento,
                        cep: response.cep ? maskCEP(response.cep) : "",
                        uf: response.uf?.toLowerCase(),
                    });
                }
            } catch (error) {
                console.error(error);
            }
        },
        [setInitialValues]
    );

    useEffect(() => {
        if (id) {
            fetchCustomer(Number(id));
        }
    }, [id, fetchCustomer]);


    const handleSubmit = async (
        values: typeof initialValues
    ) => {
        const response = await putCustomer({ id: values.id, body: values });
        if (response === true) {
            router.push('/search-customer')
        }
    }

    return (
        <div>
            <PageBreadcrumb pageTitle="Edição Cliente" />
            <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
                {({ isValid, handleSubmit }) => {
                    return (
                        <ComponentCard title="Formulário">
                            <FormCustomer />
                            <button
                                type="button"
                                disabled={!isValid}
                                onClick={() => handleSubmit()}
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