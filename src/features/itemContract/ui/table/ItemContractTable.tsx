import DefaultTable from "@/components/tables/DefaultTable"
import { FC, useEffect } from "react";
import { ItemContractHeader } from "./ItemContractTableHeader";
import { ItemContractRows } from "./ItemContractTableRows";
import { ItemContract } from "../../types";
import { usePaginatedSearch } from "@/hooks/usePaginatedSearch";
import { getItemContract } from "@/services/itemContractServices";

interface ItemContractTableProps {
    handleOpenModal: () => void;
    handleSelect: (data: ItemContract) => void;
    isOpenModal: boolean;
}

export const ItemContractTable: FC<ItemContractTableProps> = ({ handleOpenModal, handleSelect, isOpenModal }) => {
  const {
      items: itemsContract,
      loading,
      currentPage,
      totalPages,
      setSearchTerm,
      handlePageChange,
      refresh,
  } = usePaginatedSearch<ItemContract>(getItemContract);

  useEffect(() => {
    refresh();
  }, [isOpenModal, refresh]);

  return (
    <DefaultTable
      title="Item do Contrato"
      description="Tabela de Items do Contrato"
      states={{
        data: itemsContract,
        currentPage,
        totalPages,
        loading
      }}
      handleSearch={setSearchTerm}
      handleAction={handleOpenModal}
      handleChangePage={handlePageChange}
      buttonIsDisabled={false}
    >
      <ItemContractHeader/>
      <ItemContractRows itemsContract={itemsContract} actionFunction={handleSelect} />
    </DefaultTable>
  )
}
