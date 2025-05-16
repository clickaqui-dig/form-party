import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { Field, ErrorMessage, FieldProps, useFormikContext } from 'formik';

export const FormTheme = () => {
    const {errors} = useFormikContext<{ descricao: string; observacoes: string; }>();

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
        </div>
    )
}