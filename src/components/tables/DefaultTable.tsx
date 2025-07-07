import React, { ReactElement } from "react";
import { Table} from "../ui/table";
import PageBreadcrumb from "../common/PageBreadCrumb";
import ComponentCard from "../common/ComponentCard";
import SearchInput from "../input/SearchInput";
import { Pagination } from "./Pagination";

interface ValuesState {
  data: Array<unknown>;
  currentPage: number;
  totalPages: number;
  loading: boolean;
}

interface DefaultTableProps {
  title: string;
  description: string;
  buttonIsDisabled: boolean;
  handleSearch: (value: string) => void;
  states: ValuesState | undefined;
  handleAction: () => void;
  handleChangePage: (page: number) => void;
  children: [ReactElement, ReactElement];
}


export default function DefaultTable({ title, children, states, handleSearch, handleAction, handleChangePage, buttonIsDisabled }: DefaultTableProps) {
  const [headers, rows] = children; 
  return (
    <>
      <PageBreadcrumb pageTitle={title} />
      <div className="space-y-6">
        <ComponentCard title="Tabela de Temas">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-start justify-between">
            <SearchInput
              onSearch={handleSearch}
              placeholder="Pesquisar..."
            />
            <button disabled={buttonIsDisabled} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleAction}>
              Adicionar +
            </button>
          </div>
          {states && states.loading ? (
            <div className="py-10 text-center">Carregando...</div>
          ) : (
            <>
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
                  <div className="max-w-full overflow-x-auto">
                    <div className="min-w-[1102px]">
                      <Table>
                        {headers}
                        {rows}
                      </Table>
                    </div>
                  </div>
                </div>
              <div className="mt-4 flex left">
                <Pagination
                    currentPage={states ? states.currentPage : 0}
                    totalPages={states ? states.totalPages : 0}
                  onPageChange={handleChangePage}
                />
              </div>
            </>
          )}
        </ComponentCard>
      </div>
    </>
 
  );
}
