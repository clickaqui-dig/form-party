'use client';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SearchInput from "@/components/input/SearchInput";
import { PaginationCustomer } from "@/components/tables/customer";
import TableCustomer from "@/components/tables/customer/TableCustomer";
import { Customer } from "@/models/Customer";
import { getCustomer } from "@/services/customer/getCustomer";
import React, { useCallback, useEffect, useState } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");

  const fetchCustomer = useCallback(
    async (page = 0) => {
      try {
        const response = await getCustomer({
          page: page - 1,
          size: 5,
          nome: searchTerm,
        });

        if (response) {
          const { pageNumber } = response.pageable;

          setState((prev) => ({
            ...prev,
            data: response.content ?? [],
            currentPage: pageNumber + 1,
            totalPages: response.totalPages ?? 1,
            loading: false,
          }));
        }
      } catch (error) {
        console.error(error);
      }
    },
    [searchTerm]
  );

  useEffect(() => {
    fetchCustomer(state.currentPage);
  }, [state.currentPage, fetchCustomer]);

  const handleChangePage = (page: number) => {
    if (page) {
      fetchCustomer(page);
    }
  }
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term.length > 3) {
      setState(prevState => ({ ...prevState, currentPage: 1 }));
    }
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Clientes" />
      <div className="space-y-6">
     
        <ComponentCard title="Tabela de Clientes">
        <SearchInput
            onSearch={handleSearch}
            placeholder="Pesquisar por nome do cliente..."
          />
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
