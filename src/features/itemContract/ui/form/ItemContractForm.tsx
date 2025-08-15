import { Form, Formik, FormikHelpers } from "formik";
import { FC, useEffect, useState } from "react"
import { ItemContract } from "../../types";
import { toast } from "react-toastify";
import { postItemContract, putItemContract } from "@/services/itemContractServices";
import { ItemContractFields } from "./ItemContractFields";

interface ItemContractProps {
    isEdit: boolean;
    data: ItemContract;
    onClose: () => void;
}

const initialValues: ItemContract = {
    id: 0,
    descricao: "",
    valor: 0,
};

export const ItemContractForm: FC<ItemContractProps> = ({ isEdit, data, onClose }) => {
  const [itemContract, setItemContract] = useState<ItemContract>(initialValues);

  useEffect(() => {
    if(isEdit){
      setItemContract(data);
    }
  },[isEdit, data])

  const handleSubmit = async (
    values: ItemContract,
    helpers: FormikHelpers<ItemContract>,
  ) => {
    const [operation, successMsg, errorMsg] = isEdit
      ? [
          () => putItemContract(Number(values.id), values),
          'Item atualizado com sucesso!',
          'Erro ao atualizar, revise o formulário.',
        ]
      : [
          () => postItemContract(values),
          'Item cadastrado com sucesso!',
          'Erro ao criar, revise o formulário.',
        ];
    try {
      await operation();
      toast.success(successMsg);
      helpers.resetForm();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(errorMsg);
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={itemContract}
      onSubmit={handleSubmit}
      validateOnChange={false}
      validateOnBlur={false}
      validateOnMount={false}
    >
    {({ handleSubmit, validateForm}) => {
      const submitWithValidation = async () => {
          const errs = await validateForm();
          if (Object.keys(errs).length === 0) handleSubmit();
      };
      return (
        <Form>
          <ItemContractFields />
          <div className="flex justify-end mt-6">
              <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 mr-2"
              >
                  Cancelar
              </button>
              <button
                  type="button"
                  onClick={submitWithValidation}
                  className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
              >
                 {isEdit ? 'Atualizar' : 'Adicionar'}
              </button>
          </div>
        </Form>
      )
    }}
    </Formik>
  )
}
