import { Field, FieldProps, useFormikContext } from "formik";
import { ImageFile } from "@/features/theme";
import Input from "../../../../components/form/input/InputField";
import { FC, useCallback } from "react";
import Label from "../../../../components/form/Label";
import { ImageUpload } from "./ImageUpload";
import { deleteThemeImages } from "@/services/themeServices";

interface FormValues {
    descricao: string;
    observacoes: string;
    imagens: ImageFile[];
}

interface FormThemeProps {
    isEdit?: boolean;
}

export const FieldTheme: FC<FormThemeProps> = ({ isEdit = false }) => {
    const { values, setFieldValue, errors } = useFormikContext<FormValues>();

    const handleImagesChange = useCallback(
        (imgs: ImageFile[]) => setFieldValue('imagens', imgs),
        [setFieldValue],
    );

    const removeImageS3 = async (id?: number) => {
        if (!id) return;
        try {
            await deleteThemeImages(id);
        } catch (err) {
            console.error('Erro ao deletar imagem', err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Field name="descricao">
                        {({ field }: FieldProps) => (
                            <Input {...field} type="text" disabled={isEdit} />
                        )}
                    </Field>
                    {errors.descricao && (
                        <span className="text-red-500 text-sm mt-1">{errors.descricao as string}</span>
                    )}
                </div>

                <div>
                    <Label htmlFor="observacoes">Observações</Label>
                    <Field name="observacoes">
                        {({ field }: FieldProps) => (
                            <Input {...field} type="text" disabled={isEdit} />
                        )}
                    </Field>
                </div>
            </div>

            <div>
                <Label htmlFor="imagens">Imagens do Tema</Label>
                <ImageUpload
                    images={values.imagens}
                    onImagesChange={handleImagesChange}
                    onRemoveImage={removeImageS3}
                    maxImages={5}
                    isEdit={isEdit}
                />
            </div>
        </div>
    );
  };