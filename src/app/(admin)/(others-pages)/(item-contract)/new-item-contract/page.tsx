'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import FormItemContract from "@/components/form/item-contract";
import { postItemContract } from "@/services/item-contract/postItemContract";

const initialValues = {
  descricao: "",
  valor: 0,
};

export default function PageNewItemContract() {
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      await postItemContract(values)
    } catch (error) {
      console.log("Erro: ", error)
    }
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Tema" />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <ComponentCard title="Formulário">
              <FormItemContract/>
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
