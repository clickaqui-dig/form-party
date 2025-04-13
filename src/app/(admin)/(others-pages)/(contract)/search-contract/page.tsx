'use client';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SearchInput from "@/components/input/SearchInput";
import { PaginationContract, TableContract } from "@/components/tables/contract";
import { PaginationCustomer } from "@/components/tables/customer";
import TableCustomer from "@/components/tables/customer/TableCustomer";
import { getContract } from "@/services/contract/getContract";
import { getCustomer } from "@/services/customer/getCustomer";
import React, { useEffect, useRef, useState } from "react";

interface guests {
  oi: number,
  titulo: string,
  data: string,
}

export interface Contract {
  id: number,
  codigo: string,
  situacao: string,
  valorRecebido: number,
  valorPendente: number,
  valorTotal: number,
  cliente: string,
  emailCliente: string,
  celularCliente: string,
  documento: string,
  cep: string,
  endereco: string,
  numero: string,
  complemento: string,
  bairro: string,
  uf: string,
  cidade: string,
  tiposDeContrato: string,
  dataHoraInicial: string,
  dataHoraFinal: string,
  duracao: number,
  convidados: guests[]
}

interface ContractState {
  data: Array<Contract>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
}

export default function BasicTables() {
  const [state, setState] = useState<ContractState>({
    data: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
  });

  useEffect(() => {
    fetchCustomer({ page: state.currentPage });
  }, [])

  const fetchCustomer = async ({ page = 1 }) => {
    try {
      const response = await getContract({ page, limit: 5 });
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
      <PageBreadcrumb pageTitle="Contratos" />
      <div className="space-y-6">
        <ComponentCard title="Tabela de Contratos">
          <SearchInput teste="teste"/>
          <TableContract contract={state.data} />
          <PaginationContract
            currentPage={state.currentPage}
            totalPages={state.totalPages}
            onPageChange={handleChangePage}
          />
        </ComponentCard>
      </div>
    </div>
  );
}
