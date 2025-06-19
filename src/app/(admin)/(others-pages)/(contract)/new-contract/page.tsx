"use client";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import { Formik } from "formik";
import { postContract } from "@/services/contract/postContract";
import { useRouter } from "next/navigation";
import FormContract from "@/components/form/contract";
import { validationSchemaContract } from "@/components/form/contract/validation";
import { toast } from "react-toastify";
import { mapContractFormToRequest } from "@/models/Contract";

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
  aniversariantes: [],
  itensContrato: [],
  payments: [],
  temas: [],
  desconto: 0,
  acrescimo: 0,
  situacao: 'EM_ANDAMENTO'
};

export default function FormElements() {
  const router = useRouter();

  const handleSubmit = async (
    values: typeof initialValues
  ) => {
    try {
      console.log("values aniversariantes,", values.aniversariantes)
      const payload = mapContractFormToRequest(values, values.cliente);
      console.log("payload contract ===>>>", payload)
      const response = await postContract(payload);

      if (response) {
        toast.success("Contrato cadastrado com sucesso !");
        router.push(`/edit-contract/${response.data.id}`);
      } else {
        toast.error("Error ao salvar contrato, revise o formulario.")
      }

    } catch (error) {
      toast.error("Ocorreu um erro. Verifique os dados e tente novamente.");
      console.error("Erro ao enviar formulário:", error);
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
            console.log(errors);
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
