'use client';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SearchInput from "@/components/input/SearchInput";
import TableContract from "@/components/tables/contract/TableContract";
import PaginationContract from "@/components/tables/contract/PaginationContract";
import { getContract } from "@/services/contract/getContract";
import React, { useEffect, useState } from "react";
import { Customer } from "@/models/Customer";

export interface Contract {
  id: number,
  cliente: Customer,
  valorRecebido: number,
  valorPendente: number,
  valorTotal: number,
  tipoDoContrato: string,
  dataHoraInicial: string,
  dataHoraFinal: string,
  duracao: number,
  quantidadeConvidados?: number;
  observacoes?: string;
  listaAniversariantes?: any[];
  itensContrato?: any[];
  tipoPagemento?: any[];
  desconto?: number;
  acrescimo?:number
  pagamentos?: any[];
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
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Pesquisa ou busca inicial sempre que termo ou página muda
  useEffect(() => {
    fetchContracts(1, debouncedSearchTerm); // sempre página 1 na busca
    setState(prev => ({ ...prev, currentPage: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  // Mudança de página
  const handleChangePage = (page: number) => {
    if (page) fetchContracts(page, debouncedSearchTerm);
  };

  // Aciona a busca de fato
  const fetchContracts = async (page: number = 1, nome: string = "") => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await getContract({ page, limit: 5, search: nome });
      if (response) {
        setState({
          data: response.data,
          currentPage: response.page,
          totalPages: Math.ceil(response.total / response.limit),
          loading: false,
        });
      }
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setState(prevState => ({ ...prevState, currentPage: 1 }));
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Contratos" />
      <div className="space-y-6">
        <ComponentCard title="Tabela de Contratos">
          <SearchInput
            onSearch={handleSearch}
            placeholder="Pesquisar por nome do cliente..."
          />
          {state.loading ? (
            <div className="py-10 text-center">Carregando...</div>
          ) : (
            <>
              <TableContract contract={state.data} />
              <div className="mt-4 flex left">
                <PaginationContract
                  currentPage={state.currentPage}
                  totalPages={state.totalPages}
                  onPageChange={handleChangePage}
                />
              </div>
            </>
          )}
        </ComponentCard>
      </div>
    </div>
  );
}