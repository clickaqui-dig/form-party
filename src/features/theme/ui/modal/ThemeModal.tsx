import Label from "@/components/form/Label"
import { Modal } from "@/components/ui/modal"
import { ThemeForm } from "../form/ThemeForm"
import { FC } from "react";
import { Theme } from "../../types";

interface ThemeModalProps {
    isOpen: boolean;
    onClose: () => void;
    isEdit: boolean;
    dataTheme: Partial<Theme>;
}

export const ThemeModal: FC<ThemeModalProps> = ({ isOpen, onClose, isEdit, dataTheme }) => {

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
            <ThemeForm isEdit={isEdit} dataTheme={dataTheme} onClose={onClose} />
        </Modal>
    )
}