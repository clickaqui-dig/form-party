/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, FieldProps, useFormikContext } from "formik";
import { FC, useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { maskCurrency } from "@/utils/masks/maskCurrency";
import { unmaskCurrency } from "@/utils/masks/unMaskCurrency";
import { maskCurrencyFromUnits } from "@/utils/masks/maskCurrencyFromUnits";

export const ItemContractFields: FC = () => {
  const { values, errors, setFieldValue } = useFormikContext<{descricao: string, valor: number}>();
  const [currency, setCurrency] = useState('R$ 0,00');

  const handleChangeCurrency = (value: any) => {

      const maskedValue = maskCurrencyFromUnits(value);
      setCurrency(maskedValue);

      const naturalValue = unmaskCurrency(maskedValue);
      setFieldValue('valor', naturalValue);
  };

  useEffect(() => {
    if(values.valor != 0) {
      const maskedValue = maskCurrency(values.valor);
      setCurrency(maskedValue);
    }
  }, [values])

  return (
  <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="mb-4">
            <Label htmlFor="descricao"> Descrição <span className="text-red-500">*</span></Label>
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
        <div className="mb-4">
            <Label htmlFor="valor">
                Valor (R$) <span className="text-red-500">*</span>
            </Label>
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
