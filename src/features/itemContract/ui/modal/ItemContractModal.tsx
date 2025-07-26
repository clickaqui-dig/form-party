import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { FC } from "react";
import { ItemContract } from "../../types";
import { ItemContractForm } from "../form/ItemContractForm";

interface ItemContractModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    dataItemContract: ItemContract;
}

export const ItemContractModal: FC<ItemContractModalProps> = ({
  isOpen, onClose, isEdit, dataItemContract
}) => {
  if (!isOpen) return null;

  return (
      <Modal
          isOpen={isOpen}
          onClose={onClose}
          className="max-w-[800px] p-6 lg:p-5"
      >
          <div className="flex items-center justify-between px-4 py-2 border-b">
              <Label className="text-2xl" > {isEdit ? '' : 'Adicionar'} Tema</Label>
          </div>
          <ItemContractForm isEdit={isEdit} data={dataItemContract} onClose={onClose} />
      </Modal>
  )
}
