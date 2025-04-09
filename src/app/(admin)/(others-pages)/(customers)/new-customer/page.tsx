'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import FormCustomer from "./form";
import { Formik, FormikHelpers } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import { validationSchema } from "./form/validation";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  document: "",
  cep: "",
  address: "",
  number: "",
  city: "",
  uf: "",
  state: ""
};

export default function FormElements() {
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    console.log(values)
    
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Cliente" />
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
        {({ handleSubmit, isValid, dirty }) => {
          return (
            <ComponentCard title="Formulário">
              <FormCustomer/>
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
