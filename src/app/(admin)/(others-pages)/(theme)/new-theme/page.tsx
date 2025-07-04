/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import React, { useEffect, useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import SearchInput from "@/components/input/SearchInput";
import { PaginationTheme, TableTheme } from "@/components/tables/theme";
import { getThemesByDescription } from "@/services/theme/getTheme";
import { ThemeModal } from "@/components/form/theme/components/modal/themeModal";
import { Theme } from "@/models/Theme";

interface ValuesState {
  data: Array<Theme>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
}

export default function PageTheme() {
  const [state, setState] = useState<ValuesState>({
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
    fetchItemContract(0, debouncedSearchTerm);
    setState(prev => ({ ...prev, currentPage: 1 }));
  }, [debouncedSearchTerm]);


  const handleChangePage = (page: number) => {
    if (page) fetchItemContract(page, debouncedSearchTerm);
  };

  const fetchItemContract = async (page: number = 0, descricao: string = "") => {
    setState(prev => ({ ...prev, loading: true }));
    try {
      const response = await getThemesByDescription(descricao, page);
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
      <PageBreadcrumb pageTitle="Temas" />
      <div className="space-y-6">
        <ComponentCard title="Tabela de Temas">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between">
            <SearchInput
              onSearch={handleSearch}
              placeholder="Pesquisar por nome do item..."
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={() => setModalOpen(true)}>
              Adicionar Novo Tema
            </button>
          </div>
          {state.loading ? (
            <div className="py-10 text-center">Carregando...</div>
          ) : (
            <>
              <TableTheme theme={state.data} />
              <div className="mt-4 flex left">
                <PaginationTheme
                  currentPage={state.currentPage}
                  totalPages={state.totalPages}
                  onPageChange={handleChangePage}
                />
              </div>
            </>
          )}
        </ComponentCard>
      </div>
      <ThemeModal isOpen={isModalOpen} onClose={() => {
        setModalOpen(false);
        fetchItemContract(1, "");
      }} />
    </div>
  );
}