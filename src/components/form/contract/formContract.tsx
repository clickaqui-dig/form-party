/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import BirthdayList from "../form-elements/BirthdayList";
import InfoComponent from "./components/InfoComponent";
import TabsComponent from "./components/TabsComponent";
import { useFormikContext } from "formik";
import { unmaskCurrency } from "@/utils/masks/unMaskCurrency";

export const FormContract = () => {

  const { values, setFieldValue } = useFormikContext<any>();

      useEffect(() => {
        const payments = values.pagamentos;
        if (Array.isArray(payments)) {
          setFieldValue('valorRecebido', payments.reduce((total: any, item: any) => total + Number(unmaskCurrency(item.valor)), 0).toFixed(2))
        }

        const subtotal = values.itensContrato.reduce((acum: any, item: any) => acum + item.valor, 0);
        if (subtotal) {
          const applyDiscount = Math.min(Math.max(values.desconto, 0), subtotal);

          const applyAddition = Math.max(values.acrescimo, 0);

          const total = Math.max(subtotal - applyDiscount + applyAddition, 0);
          setFieldValue('valorTotal', total.toFixed(2));
        }

      }, [setFieldValue, values]);

  return (
    < div className="space-y-6" >
      <>
        <InfoComponent />
      </>
      <>
        <BirthdayList />
      </>
      <>
        <TabsComponent />
      </>
    </div>
  )
}