/* eslint-disable @typescript-eslint/no-explicit-any */
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { Form, Formik, FormikHelpers } from "formik";
import { FC, useState } from "react";
import { FormItemContract } from "../../formItemContract";
import { toast } from "react-toastify";
// import { postItemContract } from "@/services/item-contract/postItemContract";
import { validationSchemaItemContract } from "../../validation";

interface ItemContractModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const initialValues = {
  descricao: "",
  valor: 0,
};

export const ItemContractModal: FC<ItemContractModalProps> = ({ isOpen, onClose }) => {
  const [lastResetAt, setLastResetAt] = useState<number | null>(null);
  if (!isOpen) return null;


  const handleSubmit = async (
    values: typeof initialValues,
    formikHelpers: FormikHelpers<typeof initialValues>
  ) => {
    try {
      // const response = await postItemContract(values)

      // if (response) {
      //   toast.success("Item cadastrado com sucesso !")
      //   formikHelpers.resetForm();
      //   setLastResetAt(Date.now());
      // } else {
      //   toast.error("Error ao item, revise o formulario.")
      // }

    } catch (error: any) {
      toast.error(error.message);
    }
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[800px] p-6 lg:p-5"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Label className="text-2xl" >Adicionar Item</Label>
      </div>
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
            <Form>

              <FormItemContract lastResetAt={lastResetAt} />

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 mr-2"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleValidateAndSubmit()}
                  type="button"
                  className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                >
                  Adicionar
                </button>
              </div>

            </Form>
          )
        }}
      </Formik>
    </Modal>
  )
}
