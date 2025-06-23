/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import SearchInput from "@/components/input/SearchInput";
import { PaginationItemContract, TableItemContract } from "@/components/tables/itemContract";
import { ItemContract } from "@/models/ItemContract";
import { getItemContract } from "@/services/item-contract/getItemContract";
import {ItemContractModal}  from "@/components/form/item-contract/components/modal/ItemContractModal";

interface ContractState {
  data: Array<ItemContract>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
}

export default function PageNewItemContract() {
  const [state, setState] = useState<ContractState>({
    data: [],
    currentPage: 1,
    totalPages: 1,
    loading: false,
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchItemContract(1, debouncedSearchTerm);
    setState(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearchTerm]);


  const handleChangePage = (page: number) => {
    if (page) fetchItemContract(page, debouncedSearchTerm);
  };

  const fetchItemContract = async (page: number = 1, descricao: string = "") => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await getItemContract(descricao, page);
      if (response) {
        setState({
          data: response.content,
          currentPage: response.page,
          totalPages: Math.ceil(response.total / response.limit),
          loading: false,
        });
      }
    } catch (error: any) {
      setState(prev => ({ ...prev, loading: false }));
      console.error(error);
    }
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setState(prevState => ({ ...prevState, currentPage: 1 }));
  };

  return (
    <div>
      <PageBreadcrumb pageTitle="Items do Contrato" />
      <div className="space-y-6">
        <ComponentCard title="Tabela de Items">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between">
            <SearchInput
              onSearch={handleSearch}
              placeholder="Pesquisar por nome do item..."
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => setModalOpen(true)}>
              Adicionar novo item
            </button>
          </div>
          {state.loading ? (
            <div className="py-10 text-center">Carregando...</div>
          ) : (
            <>
                <TableItemContract itemContract={state.data} />
              <div className="mt-4 flex left">
                <PaginationItemContract
                  currentPage={state.currentPage}
                  totalPages={state.totalPages}
                  onPageChange={handleChangePage}
                />
              </div>
            </>
          )}
        </ComponentCard>
      </div>
      <ItemContractModal isOpen={isModalOpen} onClose={() => {
        setModalOpen(false);
        fetchItemContract(1, "");
      }}/>
    </div>
  );
}
