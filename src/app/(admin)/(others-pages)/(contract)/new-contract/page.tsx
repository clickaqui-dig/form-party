"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Formik, FormikHelpers } from "formik";
import { postContract } from "@/services/contract/postContract";
import { useRouter } from "next/navigation";
import FormContract from "@/components/form/contract";
import { validationSchemaContract } from "@/components/form/contract/validation";
import { toast } from "react-toastify";

const initialValues = {
  idContrato: 0,
  cliente: 0,
  valorRecebido: 0,
  valorPendente: 0,
  valorTotal: 0,
  tipoDoContrato: "",
  dataHoraInicial: "",
  dataHoraFinal: "",
  duracao: 0,
  quantidadeConvidados: 0,
  observacoes: "",
  listaAniversariantes: [],
  itensContrato: [],
  payments: [],
  desconto: 0,
  acrescimo: 0,
  situacao: ''
};

export default function FormElements() {
  const router = useRouter();
  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      console.log("value novo contrato ===>>", values);
      const response = await postContract({
        cliente: values.cliente,
        valorRecebido: values.valorRecebido,
        valorPendente: values.valorPendente,
        valorTotal: Number(values.valorTotal),
        tipoDoContrato: values.tipoDoContrato,
        dataHoraInicial: values.dataHoraInicial,
        dataHoraFinal: values.dataHoraFinal,
        duracao: Number(values.duracao),
        quantidadeConvidados: values.quantidadeConvidados,
        observacoes: values.observacoes,
        desconto: 0,
        acrescimo: 0,
        situacao: 'EM_ANDAMENTO',
        itensContrato: values.itensContrato.map((item: any) => item.id),
        listaAniversariantes: values.listaAniversariantes.map((item: any) => item.id)
      });

      if (response) {
        router.push('/search-contract')
      }

      if (response) {
        router.push('/search-contract')
        formikHelpers.resetForm()
      } else {
        toast.error("Error ao criar contrato, revise o formulario.")
      }

    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Contrato" />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchemaContract}
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
              <FormContract />
              <button
                onClick={() => handleValidateAndSubmit()}
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
