import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { Modal } from "@/components/ui/modal";
import Label from "../Label";
import Input from "../input/InputField";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: { descricao: string; valor: number }) => void;
}

interface FormData {
  descricao: string;
  valor: string;
}

const ContractModal: FC<ContractModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState<FormData>({
    descricao: '',
    valor: '',
  });

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddItem({
      descricao: formData.descricao,
      valor: parseFloat(formData.valor)
    });
    setFormData({
      descricao: '',
      valor: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] p-6 lg:p-5"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Label className="text-2xl">Adicionar item ao contrato</Label>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <Label>
            Descrição <span className="text-red-500">*</span>
          </Label>
          <Input 
            type="text"
            name="descricao"
            value={formData.descricao}
            onChange={handleChange}
            placeholder="Descrição" 
          />
        </div>

        <div className="mb-4">
          <Label>
            Valor (R$) <span className="text-red-500">*</span>
          </Label>
          <Input 
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            placeholder="Valor da parcela" 
          />
        </div>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ContractModal;