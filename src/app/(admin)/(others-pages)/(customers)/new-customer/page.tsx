'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import FormCustomer from "@/components/form/customer";
import { Formik } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import { validationSchema } from "@/components/form/customer/validation";
import { postCustomer } from "@/services/customer/postCustomer";
import { useRouter } from "next/navigation";
import { Customer } from "@/models/Customer";

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

export default function PageNewCustomer() {
  const router = useRouter();
  const handleSubmit = async (
    values: typeof initialValues
  ) => {
    const body = values as unknown as Customer;
    const response = await postCustomer(body);
    if (response === true) {
      router.push('/search-customer')
    }
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Cliente" />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <ComponentCard title="Formulário">
              <FormCustomer />
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
  );
}
