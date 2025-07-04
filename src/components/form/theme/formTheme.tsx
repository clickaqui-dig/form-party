import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { Field, FieldProps, useFormikContext } from 'formik';
import { ImageUpload } from './ImageUpload'; // Ajuste o caminho conforme necessário

interface ImageFile {
  file: File;
  preview: string;
  descricao?: string;
}

export const FormTheme = () => {
    const { errors, setFieldValue } = useFormikContext<{ 
        descricao: string; 
        observacoes: string; 
        imagens: ImageFile[];
    }>();

    const handleImagesChange = (images: ImageFile[]) => {
        setFieldValue('imagens', images);
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="descricao">Descrição</Label>
                    <Field id="descricao" name="descricao">
                        {({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                value={field.value || ""}
                            />
                        )}
                    </Field>
                    {errors.descricao && (
                        <div className="text-red-500 text-sm mt-1">{errors.descricao}</div>
                    )}
                </div>
                <div>
                    <Label htmlFor="observacoes">Observações</Label>
                    <Field id="observacoes" name="observacoes">
                        {({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                value={field.value || ""}
                            />
                        )}
                    </Field>
                </div>
            </div>
            
            {/* Campo de Upload de Imagens */}
            <div>
                <Label htmlFor="imagens">Imagens do Tema</Label>
                <ImageUpload
                    onImagesChange={handleImagesChange}
                    maxImages={5}
                />
                {/* {errors.imagens && (
                    <div className="text-red-500 text-sm mt-1">{errors.imagens}</div>
                )} */}
            </div>
        </div>
    )
}