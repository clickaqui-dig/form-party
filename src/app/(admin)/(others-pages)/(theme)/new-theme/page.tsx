/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import { FormTheme } from "@/components/form/theme/formTheme";
import { postTheme } from "@/services/theme/postTheme";
import { validationSchemaThema } from "@/components/form/theme/validation";
import { toast } from "react-toastify";

const initialValues = {
  descricao: "",
  observacoes: "",
};

export default function PageNewTheme() {
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await postTheme(values);

      if (response) {
        toast.success("Tema cadastrado com sucesso !")
        formikHelpers.resetForm()
      } else {
        toast.error("Error ao criar tema, revise o formulario.")
      }

    } catch (error: any) {
      toast.error(error.message)
    }
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Tema" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaThema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
        >
        {({ handleSubmit, validateForm }) => {

          const handleValidateAndSubmit = async () => {
            const errors = await validateForm();

            if (Object.keys(errors).length === 0) {
              handleSubmit();
            }
          };

          return (
            <ComponentCard title="Formulário">
              <FormTheme />
              <button
                onClick={() => handleValidateAndSubmit()}
                type="button"
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
