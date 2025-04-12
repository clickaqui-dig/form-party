"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Formik, FormikHelpers } from "formik";
import { FormContract } from "./form/formContract";


const initialValues = {
  id: "",
  situation: "",
  receiveValue: "",
  pendingValue: "",
  totalValue: "",
  client: "",
  email: "",
  cellphone: "",
  cpfCpj: "",
  cep:"",
  address:"",
  numberAddress:"",
  city:"",
  uf:"",
  contractType:"",
  initialDate:"",
  finalDate:"",
  durationParty:"",
  quantityGuest:"",
  observations:"",
  birthdayList: [],
  itemsContract:[],
  payments:[],
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
      <PageBreadcrumb pageTitle="Novo Contrato" />
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          {({ handleSubmit, isValid, dirty }) => {
            return (
              <ComponentCard title="Formulário">
                <FormContract/>
                <button
                      onClick={() => handleSubmit()}
                      type="button"
                      className="btn btn-success flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
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
