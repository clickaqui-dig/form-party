import { Modal } from "@/components/ui/modal";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import { BirthDayItem } from "../form-elements/BirthdayList";

const options = [
  { value: "Cartão", label: "Cartão" },
  { value: "Boleto", label: "Boleto" },
  { value: "Pix", label: "Pix" },
];

interface BirthDayProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: BirthDayItem) => void;
}
const BithdayModal: FC<BirthDayProps> = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState<BirthDayItem>({
    name: '',
    date: '',
    tema: '',
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
      name: formData.name,
      date: formData.date,
      tema: formData.tema,
    });
    setFormData({
      name: '',
      date: '',
      tema: '',
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
        <Label className="text-2xl" >Adicionar Aniversariante</Label>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <Label>
            Nome
          </Label>

          <Input type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nome"
          />
        </div>

        <div className="mb-4">
          <Label>
            Data de nascimento
            {/* <span className="text-red-500">*</span> */}
          </Label>

          <Input type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Data de Nascimento"
          />

        </div>

        <div className="mb-4">
          <Label>
            Tema
          </Label>

          <Input type="text"
            name="tema"
            value={formData.tema}
            onChange={handleChange}
            placeholder="Tema"
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
            onClick={() => { onAddItem }}
          >
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  );
}
export default BithdayModal;