/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { FC, useEffect } from "react";
import DefaultTable from "@/components/tables/DefaultTable";
import { ThemesTableHeader } from "./ThemesTableHeader";
import { ThemesTableRows } from "./ThemesTableRows";
import { Theme } from "../../types";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { fetchThemes as getThemes } from "@/services/themeServices";

interface ThemeTableProps {
    handleOpenModal: () => void;
    handleSelect: (data: Theme) => void;
    isOpenModal: boolean;
}

export const ThemesTable: FC<ThemeTableProps> = ({ handleOpenModal, handleSelect, isOpenModal }) => {
    const {
        items: themes,
        loading,
        currentPage,
        totalPages,
        setSearchTerm,
        handlePageChange,
        refresh,
    } = usePaginatedSearch<Theme>(getThemes);

  useEffect(() => {
    refresh();
  }, [isOpenModal, refresh]);

    return (
        <DefaultTable
            title="Temas"
            description="Tabela de Temas"
            states={{
                data: themes,
                currentPage,
                totalPages,
                loading
            }}
            handleSearch={setSearchTerm}
            handleAction={handleOpenModal}
            handleChangePage={handlePageChange}
            buttonIsDisabled={false}
        >
            <ThemesTableHeader />
            <ThemesTableRows themes={themes} actionFunction={handleSelect} />
        </DefaultTable>
    )
}
