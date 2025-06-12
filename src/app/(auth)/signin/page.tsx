/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import FormSignin from "@/components/form/signin";
import { validationSchema } from "@/components/form/signin/validation";
import Button from "@/components/ui/button/Button";
import { handleLogin } from "@/services/login/login";
import { Formik } from "formik";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const initialValues = {
  email: "",
  password: ""
};


export default function SignIn() {
  const [isChecked] = useState(false);
  const router = useRouter();


  const handleSubmit = async (
    values: typeof initialValues
  ) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        const response = await handleLogin(values);
        const newToken = response.data;

        if (!newToken) {
          throw new Error('Algo inesperado aconteceu em nosso sistema.');
        }

        if (isChecked) {
          Cookies.set('authToken', newToken, { expires: 1 })
        } else {
          Cookies.set('authToken', newToken)
        }
  
      }

      router.push('/calendar')

    } catch (error: any) {
      const messageErro = error ? error.response.data.error : 'Algo inesperado aconteceu em nosso sistema.'
      toast.error(messageErro)
    }
  }

  return (<div className="flex flex-col flex-1 lg:w-1/2 w-full">
    <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
      <div>
        <div className="mb-5 sm:mb-8">
          <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Login
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Digite seu e-mail e senha para entrar!
          </p>
        </div>
        <div>
          <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema} >
            {({ handleSubmit, isValid, dirty }) => {
              return (
                <div className="space-y-6">
                  <FormSignin />
                  <div className="flex items-center justify-between">
                  </div>
                  <div>
                    <Button type="submit" onClick={() => handleSubmit()} className="w-full" size="sm" disabled={!(isValid && dirty)}>
                      Sign in
                    </Button>
                  </div>
                </div>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  </div>);
}
