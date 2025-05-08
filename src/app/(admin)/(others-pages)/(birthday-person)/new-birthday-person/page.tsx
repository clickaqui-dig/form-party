'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import Cookies from 'js-cookie';
import FormBirthDayPerson from "@/components/form/birthday-person";
import { postBirthDayPerson } from "@/services/birthday-person/postBirthDayPerson";

const initialValues = {
  nome: "",
  dataNascimento: "",
  idade: 0,
  idadeNoEvento: 0,
  temas:[]
};

export default function PageNewBithdayPerson() {
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      console.log("theme ===>>", values)
       await postBirthDayPerson(values)
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
              <FormBirthDayPerson/>
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
