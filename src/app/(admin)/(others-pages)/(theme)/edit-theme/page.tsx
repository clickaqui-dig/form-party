'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useState, useRef } from "react";
import { Formik, FormikHelpers, FormikProps } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import { FormTheme } from "@/components/form/theme/formTheme";
import { postTheme } from "@/services/theme/postTheme";

const initialValues = {
  descricao: "",
  observacoes: "",
};

export default function PageEditTheme() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const formikRef = useRef<FormikProps<typeof initialValues>>(null);

  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      await postTheme(values);
      
      // Resetar o formulário após o envio bem-sucedido
      formikHelpers.resetForm();
      
      // Feedback visual para o usuário
      setSubmitSuccess(true);
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Erro ao salvar o tema:", error);
    }
  }
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Tema" />
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Tema salvo com sucesso!
        </div>
      )}
      <Formik 
        innerRef={formikRef}
        initialValues={initialValues} 
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <ComponentCard title="Formulário">
              <FormTheme />
              <button
                onClick={() => handleSubmit()}
                type="button"
                disabled={!(isValid && dirty)}
                className="mt-4 btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
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