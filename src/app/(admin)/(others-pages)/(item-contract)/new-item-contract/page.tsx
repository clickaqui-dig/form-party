'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import { Formik, FormikHelpers } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import FormItemContract from "@/components/form/item-contract";
import { postItemContract } from "@/services/item-contract/postItemContract";
import { toast } from "react-toastify";
import { validationSchemaItemContract } from "@/components/form/item-contract/validation";

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
      const response = await postItemContract(values)

      if (response) {
        toast.success("Item cadastrado com sucesso !")
        formikHelpers.resetForm();
      } else {
        toast.error("Error ao item, revise o formulario.")
      }

    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Item" />
      <Formik
        initialValues={initialValues} 
        onSubmit={handleSubmit}
        validationSchema={validationSchemaItemContract}
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
              <FormItemContract />
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
