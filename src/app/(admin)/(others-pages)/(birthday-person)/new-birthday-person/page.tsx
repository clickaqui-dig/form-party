'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import Cookies from 'js-cookie';
import FormBirthDayPerson from "@/components/form/birthday-person";
import { postBirthDayPerson } from "@/services/birthday-person/postBirthDayPerson";
import { toast } from "react-toastify";
import { validationSchemaBirthDayPerson } from "@/components/form/birthday-person/validation";

const initialValues = {
  nome: "",
  dataNascimento: "",
  idade: 0,
  idadeNoEvento: 0,
  tema: 0
};

export default function PageNewBithdayPerson() {
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      const response = await postBirthDayPerson(values)

      if (response) {
        toast.success("Aniversariante cadastrado com sucesso!")
        formikHelpers.resetForm()
      } else {
        toast.error("Error ao criar Aniversariante, revise o formulario.")
      }

    } catch (error: any) {
      toast.error(error)
    }
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Aniversariante" />
      <Formik 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        validationSchema={validationSchemaBirthDayPerson}         
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}>
        {({ handleSubmit, validateForm }) => {

          const handleValidateAndSubmit = async () => {
            const errors = await validateForm();

            if (Object.keys(errors).length === 0) {
              handleSubmit();
            }
          };

          return (
            <ComponentCard title="Formulário">
              <FormBirthDayPerson />
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
