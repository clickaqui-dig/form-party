/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { maskCurrency } from '@/utils/masks/maskCurrency';
import { unmaskCurrency } from '@/utils/masks/unMaskCurrency';
import { Field, FieldProps, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

export const FormItemContract: React.FC<{ lastResetAt: number | null }> = ({ lastResetAt }) => {
    const { errors, setFieldValue } = useFormikContext<{descricao: string, valor: number}>();
    const [currency, setCurrency] = useState('R$ 0,00');

    const handleChangeCurrency = (value: any) => {

        const maskedValue = maskCurrency(value);
        setCurrency(maskedValue);

        const naturalValue = unmaskCurrency(maskedValue);
        setFieldValue('valor', naturalValue);
    };

    useEffect(() => {
        setCurrency('');
    }, [lastResetAt])

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
                    {errors.descricao && (
                        <div className="text-red-500 text-sm mt-1">{errors.descricao}</div>
                    )}
                </div>
                <div>
                    <Label htmlFor="valor">Valor</Label>
                    <Field id="valor" name="valor">
                        {({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                value={currency}
                                onChange={(e) => {
                                    handleChangeCurrency(e.target.value)
                                }}
                            />
                        )}
                    </Field>
                    {errors.valor && (
                        <div className="text-red-500 text-sm mt-1">{errors.valor}</div>
                    )}
                </div>
            </div>
        </div>
    )
}