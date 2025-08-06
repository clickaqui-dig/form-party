'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { use, useEffect, useMemo } from "react";
import FormCustomer from "@/components/form/customer";
import { Formik, Form } from "formik";
import ComponentCard from "@/components/common/ComponentCard";
import { validationSchema } from "@/components/form/customer/validation";
import { postCustomer } from "@/services/customer/postCustomer";
import { useRouter } from "next/navigation";
import { mapFormToCustomer } from "@/models/Customer";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

const initialValues = {
  id: 0,
  nome: "",
  celular: "",
  email: "",
  dataCadastro: "",
  documento: "",
  cep: "",
  endereco: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  state: true
};

export default function PageNewCustomer() {
  const router = useRouter();
  const roleUser = Cookies.get('roleUser');

  
  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const payload = mapFormToCustomer(values);
      const response = await postCustomer(payload);
      if (response) {
        toast.success("Cliente cadastrado com sucesso !");
        router.push('/search-customer');
      } else {
        toast.error("Erro ao salvar cliente. Tente novamente.");
      }
    } catch (error) {
      toast.error("Ocorreu um erro. Verifique os dados e tente novamente.");
      console.error("Erro ao enviar formulário:", error);
    }
  }
  
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Cliente"  />
      <Formik 
        initialValues={initialValues} 
        onSubmit={handleSubmit} 
        validationSchema={validationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        validateOnMount={false}
      >
        {({ handleSubmit, validateForm, }) => {

          const handleValidateAndSubmit = async () => {
            const errors = await validateForm();
            
            if (Object.keys(errors).length === 0) {
              handleSubmit();
            }
          };
          
          return (
            <Form>
              <ComponentCard title="Formulário">
                <FormCustomer />
                <div className="mt-4">
                  <button
                    onClick={handleValidateAndSubmit}
                    type="button"
                    className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                    disabled={roleUser !== 'ADMIN'}
                  >
                    Salvar
                  </button>
                </div>
              </ComponentCard>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}