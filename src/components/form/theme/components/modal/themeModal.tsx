/* eslint-disable @typescript-eslint/no-explicit-any */
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { Form, Formik, FormikHelpers } from "formik";
import { FC, useEffect, useState } from "react";
import { validationSchemaThema } from "../../validation";
import { ImageFile } from "@/models/ImageFile";

interface ThemeModalProps {
    isOpen: boolean;
    onClose: () => void;
    dataTheme: any;
}

const initialValues = {
    id: 0,
    descricao: "",
    observacoes: "",
    imagens: [] as ImageFile[],
};

export const ThemeModal: FC<ThemeModalProps> = ({ isOpen, onClose, dataTheme }) => {
    const [theme, setTheme] = useState<any>(initialValues);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        if (dataTheme.id !== 0) {
            setIsEdit(true);
            setTheme(dataTheme);
        } else {
            setIsEdit(false);
        }
   
    }, [dataTheme, isEdit]);

    if (!isOpen) return null;

    const handleSubmit = async (
        values: typeof initialValues,
        formikHelpers: FormikHelpers<typeof initialValues>
    ) => {
        console.log(values)
        console.log(formikHelpers)
        // try {
        //     const response = await createTheme()

        //     if (response) {
        //         toast.success("Item cadastrado com sucesso !");

        //         if (values.imagens && values.imagens.length > 0) {

        //             try {
        //                 await uploadThemeImages(response.id, values.imagens);
        //                 onClose();
        //                 toast.success("Imagens enviadas com sucesso!");

        //             } catch (imageError: any) {
        //                 toast.warning("Tema criado, mas houve erro no upload das imagens: " + imageError.message);
        //             }
        //         }

        //         formikHelpers.resetForm();
        //     } else {
        //         toast.error("Error ao item, revise o formulario.")
        //     }

        // } catch (error: any) {
        //     toast.error(error.message);
        // }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-[800px] p-6 lg:p-5"
        >
            <div className="flex items-center justify-between px-4 py-2 border-b">
                <Label className="text-2xl" > {isEdit ? 'Atualizar' : 'Adicionar'} Tema</Label>
            </div>
            <Formik
                initialValues={theme}
                onSubmit={handleSubmit}
                validationSchema={validationSchemaThema}
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

                            {/** Chamar form aqui */}
                            {
                                !isEdit &&
                                (
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
                                )
                            }

                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}