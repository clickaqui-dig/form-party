/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { ItemContract, Modal, Table } from "@/features/itemContract";
import { useState } from "react";


export default function PageNewItemContract() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataSelect, setDataSelect] = useState < ItemContract| any>(null);

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setIsEdit(false);
    setDataSelect(null);
  }

  const handleOpenModalWithItemSelect = (data: ItemContract) => {
    setDataSelect(data);
    setIsEdit(() => true);
    setIsOpenModal(() => true);
  }

  const handleOpenModal = () => {
    setIsOpenModal(true);
  }

  return (
    <>
      <Table isOpenModal={isOpenModal} handleSelect={handleOpenModalWithItemSelect} handleOpenModal={handleOpenModal}/>
      <Modal isOpen={isOpenModal} isEdit={isEdit} onClose={handleCloseModal} dataItemContract={dataSelect}/>
    </>
  );
}
