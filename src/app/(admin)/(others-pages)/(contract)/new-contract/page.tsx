"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Formik, FormikHelpers } from "formik";
import { FormContract } from "./form/formContract";
import { postContract } from "@/services/contract/postContract";

const initialValues = {
  cliente: 0,
  valorRecebido: 0,
  valorPendente: 0,
  valorTotal: 0,
  tipoDoContrato:"",
  dataHoraInicial:"",
  dataHoraFinal:"",
  duracao:0,
  quantidadeConvidados:0,
  observacoes:"",
  listaAniversariantes: [],
  itensContrato:[],
  payments:[],
  desconto: 0,
  acrescimo:0,
};

export default function FormElements() {
    const handleSubmit = async (
      values: typeof initialValues,
      formikHelpers: FormikHelpers<typeof initialValues>
    ) => {
      console.log("contrato campos ===>>", values)
      try {
        const response = await postContract(values);
  
      } catch (error) {
        console.log(error)
      }
      
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
