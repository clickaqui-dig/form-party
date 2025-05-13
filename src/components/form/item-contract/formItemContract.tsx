/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { Field, ErrorMessage, FieldProps, useFormikContext } from 'formik';

export const FormItemContract = () => {

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
                                value={field.value ?? ''} 
                            />
                        )}
                        </Field>
                    <ErrorMessage name="descricao" component="div" />
                </div>
                <div>
                    <Label htmlFor="valor">Valor</Label>
                    <Field id="valor" name="valor">
                        {({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="number"
                                value={field.value ?? ''} 
                            />
                        )}
                      </Field>
                    <ErrorMessage name="valor" component="div" />
                </div>
            </div>
        </div>
    )
}