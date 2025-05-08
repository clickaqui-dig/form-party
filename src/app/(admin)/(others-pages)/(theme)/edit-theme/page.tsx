'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import { FormTheme } from "@/components/form/theme/formTheme";
import { postTheme } from "@/services/theme/postTheme";
import Cookies from 'js-cookie';

const initialValues = {
  descricao: "",
  observacoes: "",
};

export default function PageEditTheme() {
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await postTheme(values)
    } catch (error) {
      
    }
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Tema" />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <ComponentCard title="Formulário">
              <FormTheme/>
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
