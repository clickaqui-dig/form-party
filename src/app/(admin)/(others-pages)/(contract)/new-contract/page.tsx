import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import DefaultInputsContracts from "@/components/form/form-elements/DefaultInputsContracts";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

export default function FormElements() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Novo Contrato" />
        <div >
          <DefaultInputsContracts />
      </div>
    </div>
  );
}
