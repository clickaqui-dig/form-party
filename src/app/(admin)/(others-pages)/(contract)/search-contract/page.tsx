'use client';

import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import SearchInput from "@/components/input/SearchInput";
import { PaginationContract, TableContract } from "@/components/tables/contract";
import { getContract } from "@/services/contract/getContract";
import React, { useEffect, useState } from "react";

interface guests {
  id: number,
  titulo: string,
  data: string,
}

interface BirthdayList{
  nome:string,
  dataNas: string;
  tema:string;
  foto?: any;
}

interface ItensContract{
  desc:string;
  valor:number;
}

interface ItensPayments{
  valor:number;
  meioPagamento :string;
  dataPagamento : string;
  recebido : boolean;
  obs?: string;
}

export interface Contract {
  id: number,
  codigoCliente: number,
  situacao: string,
  valorRecebido: number,
  valorPendente: number,
  valorTotal: number,
  tiposDeContrato: string,
  dataHoraInicial: string,
  dataHoraFinal: string,
  duracao: number,
  convidados?: guests[],
  quantidadeConvidados?: number;
  observacoes?: string;
  listaAniversariantes?: BirthdayList[];
  itemContrato?: ItensContract[];
  tipoPagemento?: string;
  desconto?: number;
  acrescimo?:number
  payments?: ItensPayments[];
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

  useEffect(() => {
    fetchContracts({ page: 1, search: debouncedSearchTerm });
  }, [debouncedSearchTerm]);


  useEffect(() => {
    fetchContracts({ page: state.currentPage });
  }, []);

  const fetchContracts = async ({ page = 1, search = "" }) => {
    setState(prevState => ({ ...prevState, loading: true }));
    try {
      const response = await getContract({ page, limit: 5, search });
      if (response) {
        setState({
          data: response.data,
          currentPage: response.page,
          totalPages: Math.ceil(response.total / response.limit),
          loading: false,
        });
      }
    } catch (error) {
      console.log(error);
      setState(prevState => ({ ...prevState, loading: false }));
    }
  };

  const handleChangePage = (page: number) => {
    if (page) {
      fetchContracts({ page, search: debouncedSearchTerm });
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
              <PaginationContract
                currentPage={state.currentPage}
                totalPages={state.totalPages}
                onPageChange={handleChangePage}
              />

            </>
          )}
        </ComponentCard>
      </div>
    </div>
  );
}