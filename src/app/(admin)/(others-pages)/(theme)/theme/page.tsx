"use client"

import { Theme } from "@/features/theme";
import { ThemeModal } from "@/features/theme/ui/modal/ThemeModal";
import { ThemesTable } from "@/features/theme/ui/table/ThemesTable";
import { useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function PageTheme() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataSelect, setDataSelect] = useState < Theme| any>(null);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsEdit(false);
    setDataSelect(null);
  }

  const handleOpenModalWithItemSelect = (data: Theme) => {
    setDataSelect(data);
    setIsEdit(() => true);
    setIsOpenModal(() => true);
  }

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  return (
    <>
      <ThemesTable isOpenModal={isOpenModal} handleSelect={handleOpenModalWithItemSelect} handleOpenModal={handleOpenModal} />
      <ThemeModal isOpen={isOpenModal} isEdit={isEdit} onClose={handleCloseModal} dataTheme={dataSelect}/>
    </>
  );
}