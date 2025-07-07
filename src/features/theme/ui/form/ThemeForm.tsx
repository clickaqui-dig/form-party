/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { ImageFile, Theme } from "../../types";
import { Form, Formik, FormikHelpers } from "formik";
import { toast } from "react-toastify";
import { FieldTheme } from "./FieldTheme";
import { createTheme, uploadThemeImages } from "@/services/themeServices";
import { urlToImageFile } from "@/utils/urlToImageFile";

interface ThemeFormProps {
    isEdit: boolean;
    dataTheme: Theme;
    onClose: () => void;
}

const initialValues = {
    id: 0,
    descricao: "",
    observacoes: "",
    imagens: [] as ImageFile[],
};
export const ThemeForm: FC<ThemeFormProps> = ({ isEdit, dataTheme, onClose }) => {
    const [theme, setTheme] = useState<any>(initialValues);

    useEffect(() => {
        const carregarImages = async () => {
            if (isEdit) {
                const imagens = await Promise.all(
                    (dataTheme.imagens ?? []).map((img: ImageFile) => {
                         if (img.url) {
                            return urlToImageFile(img.url, {
                                id: img.id,
                                descricao: img.descricao,
                                nomeArquivo: img.nomeArquivoOriginal,
                            })
                        } 
                    }
                      
                    ),
                );
                setTheme({
                    id: dataTheme.id ?? 0,
                    descricao: dataTheme.descricao ?? '',
                    observacoes: dataTheme.observacoes ?? '',
                    imagens,
                });
            } else {
                setTheme(initialValues);
            }
        };
        carregarImages().catch(console.error);
    }, [dataTheme, isEdit]);

    const handleSubmit = async (
        values: typeof initialValues,
        helpers: FormikHelpers<any>,
    ) => {
        try {
            let id = 0;
            if (isEdit == false) {
                const resTheme = await createTheme(values);
                toast.success('Tema cadastrado!');
                
                    id = resTheme.id ? resTheme.id : 0;
                
            } else {
                id = values.id;
            }

            if (id !== 0) {
                const novas = values.imagens.filter((img) => img.isNew);
                if (novas.length) {
                    try {
                        if (id) {
                            await uploadThemeImages(id, novas);
                            toast.success('Imagens enviadas com sucesso!');
                        }
                    } catch (err: any) {
                        toast.warning(`Tema salvo, mas erro no upload: ${err.message}`);
                    }
                }
            }
            onClose();
            helpers.resetForm();
        } catch (err: any) {
            toast.error(err.message);
        }
    };

    return (
        <Formik
            enableReinitialize
            initialValues={theme}
            onSubmit={handleSubmit}
            validateOnChange={false}
            validateOnBlur={false}
            validateOnMount={false}
        /* validationSchema={validationSchemaThema} */
        >
            {({ handleSubmit, validateForm }) => {
                const submitWithValidation = async () => {
                    const errs = await validateForm();
                    if (Object.keys(errs).length === 0) handleSubmit();
                };
              
                return (
                    <Form>
                        <FieldTheme isEdit={isEdit} />
                  
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
                                        Adicionar
                                    </button>
                                </div>
                      
                    </Form>
                );
            }}
        </Formik>
    );
  };