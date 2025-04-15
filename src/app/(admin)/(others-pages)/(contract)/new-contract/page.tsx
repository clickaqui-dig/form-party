"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Formik, FormikHelpers } from "formik";
import { FormContract } from "./form/formContract";

const initialValues = {
  id: 0,
  codigo: "",
  complemento:"",
  bairro:"",
  situacao: "",
  valorRecebido: 0,
  valorPendente: 0,
  valorTotal: 0,
  cliente: "",
  emailCliente: "",
  celularCliente: "",
  documento: "",
  cep:"",
  endereco:"",
  numero:"",
  cidade:"",
  uf:"",
  tiposDeContrato:"",
  dataHoraInicial:"",
  dataHoraFinal:"",
  duracao:0,
  quantidadeConvidados:0,
  observacoes:"",
  listaAniversariantes: [],
  itemContrato:[],
  payments:[],
  tipoPagemento: "",
  desconto: 0,
  acrescimo:0,
  convidados:[],
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
