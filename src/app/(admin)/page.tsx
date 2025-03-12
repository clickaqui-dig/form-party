import type { Metadata } from "next";
import React from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import Calendar from "@/components/calendar/Calendar";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
      <div>
        <PageBreadcrumb pageTitle="Calendar" />
        <Calendar />
      </div>
  );
}
