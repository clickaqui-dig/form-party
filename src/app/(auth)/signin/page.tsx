"use client";
import Checkbox from "@/components/form/input/Checkbox";
import FormSignin from "@/components/form/signin";
import { validationSchema } from "@/components/form/signin/validation";
import Button from "@/components/ui/button/Button";
import { handleLogin } from "@/services/login/login";
import { Formik, FormikHelpers } from "formik";
import Link from "next/link";
import { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

const initialValues = {
  email: "",
  password: ""
};


export default function SignIn() {
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();


    const handleSubmit = async (
      values: typeof initialValues,
      formikHelpers: FormikHelpers<typeof initialValues>
    ) => {
      try {
        const response = await handleLogin(values);
        const token = response.data.token

        if (isChecked) {
          Cookies.set('token', token, { expires: 1 }) // 1 dia
        } else {
          Cookies.set('token', token) 
        }

        router.push('/calendar')

      } catch (error) {
        console.log(error)
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
              <FormSignin/>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
                  <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                    Keep me logged in
                  </span>
                </div>
                <Link
                  href="/reset-password"
                  className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Forgot password?
                </Link>
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
