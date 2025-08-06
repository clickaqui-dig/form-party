"use client"

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import FormCustomer from "@/components/form/customer";
import { validationSchema } from "@/components/form/customer/validation";
import { CustomerForm, mapCustomerToForm, mapFormToCustomer } from "@/models/Customer";
import { getCustomerById } from "@/services/customer/getCustomerById";
import { putCustomer } from "@/services/customer/putCustomer";
import { maskCEP, maskPhone } from "@/utils/masks";
import { Formik } from "formik";
import { useParams, useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const initialValues = {
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
    state: true
  };


export default function PageEditCustomer() {
    const router = useRouter();
    const params = useParams();
    const id = params.id;
    const [customer, setCustomer] = useState<CustomerForm>(initialValues);
    const roleUser = Cookies.get('roleUser');

    const fetchCustomer = useCallback(
        async (customerId: number) => {
            try {
                const response = await getCustomerById({ id: customerId });

                if (response) {
                    const mappedData = mapCustomerToForm(response);
                    setCustomer({
                        ...mappedData,
                        celular: mappedData.celular ? maskPhone(response.celular) : "",
                        documento: mappedData.documento,
                        cep: mappedData.cep ? maskCEP(mappedData.cep) : "",
                        uf: mappedData.uf?.toLowerCase(),
                    });
                }
            } catch (error) {
                console.error(error);
            }
        },
        [setCustomer]
    );

    useEffect(() => {
        if (id) {
            fetchCustomer(Number(id));
        }
    }, [id, fetchCustomer]);


    const handleSubmit = async (
        values: typeof initialValues
    ) => {
        try {
            const payload = mapFormToCustomer(values)
            const response = await putCustomer({ id: values.id, body: payload });
            if (response) {
                toast.success("Cliente atualizado com sucesso !");
                router.push('/search-customer')
            } else {
                toast.error("Erro ao atualizar o cliente. Tente novamente.");
            }
        } catch (error) {
                  toast.error("Ocorreu um erro. Verifique os dados e tente novamente.");
                  console.error("Erro ao enviar formulário:", error);
        }

    }

    return (
        <div>
            <PageBreadcrumb pageTitle="Edição Cliente" />
            <Formik initialValues={customer} onSubmit={handleSubmit} validationSchema={validationSchema} enableReinitialize>
                {({ isValid, handleSubmit }) => {
                    return (
                        <ComponentCard title="Formulário">
                            <FormCustomer />
                            <button
                                type="button"
                                disabled={!isValid || roleUser !== 'ADMIN'}
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