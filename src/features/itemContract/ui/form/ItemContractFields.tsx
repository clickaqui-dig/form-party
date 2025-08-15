import { Field, FieldProps, useFormikContext } from "formik";
import { FC, useCallback, useEffect, useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";

export const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined || Number.isNaN(value)) return "R$ 0,00";

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const parseCurrency = (value: string): number => {
  if (!value) return 0;

  const numeric = value
    .replace(/\s/g, "")
    .replace(/[R$]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");

  const num = parseFloat(numeric);
  return Number.isNaN(num) ? 0 : num;
};

export const ItemContractFields: FC = () => {
  const { values, errors, setFieldValue } = useFormikContext<{ descricao: string; valor: number }>();

  const [currency, setCurrency] = useState(() => formatCurrency(values.valor));

  const handleChangeCurrency = useCallback(
    (raw: string) => {
      setCurrency(raw);
      setFieldValue("valor", parseCurrency(raw));
    },
    [setFieldValue]
  );

  useEffect(() => {
    setCurrency(formatCurrency(values.valor));
  }, [values.valor]);

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
                {() => (
                  <Input
                    id="valor"
                    name="valor"
                    type="text"
                    value={currency}
                    onChange={(e) => handleChangeCurrency(e.target.value)}
                    onBlur={() => setCurrency(formatCurrency(values.valor))} // prettify after editing
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
