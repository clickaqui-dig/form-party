'use client';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { PaginationCustomer } from "@/components/tables/customer";
import TableCustomer from "@/components/tables/customer/TableCustomer";
import { Customer } from "@/models/Customer";
import { getCustomer } from "@/services/customer/getCustomer";
import React, { useEffect, useState } from "react";

interface CustomerState {
  data: Array<Customer>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
}

export default function PageSearchCustomer() {
  const [state, setState] = useState<CustomerState>({
    data: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
  });

  useEffect(() => {
    fetchCustomer({ page: state.currentPage });
  }, [state.currentPage])

  const fetchCustomer = async ({ page = 1 }) => {
    try {
      const response = await getCustomer({ page, limit: 5 });
      if (response) {
        setState({
          data: response.data,
          currentPage: response.page,
          totalPages: Math.ceil(response.total / response.limit),
          loading: false,
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  const handleChangePage = (page: number) => {
    if (page) {
      fetchCustomer({ page });
    }
  }

  return (
    <div>
      <PageBreadcrumb pageTitle="Clientes" />
      <div className="space-y-6">
        <ComponentCard title="Tabela de Clientes">
          <TableCustomer customers={state.data} />
          <PaginationCustomer
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={handleChangePage}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
