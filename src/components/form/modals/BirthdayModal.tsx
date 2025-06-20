/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@/components/ui/modal";
import React, { ChangeEvent, FC, FormEvent, useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import { BirthDayItem } from "../form-elements/BirthdayList";
import { validateBirthdayForm } from "./validations";

interface BirthDayProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: BirthDayItem) => void;
}

const BirthDayModal: FC<BirthDayProps> = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState<BirthDayItem>({
    id: 0,
    nomeAniversariante: "",
    idade: 0,
    idadeNoEvento: 0
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setFormData((prev) => ({
      ...prev,
      nome: e.target.value,
    }));
    
    // Limpa o erro quando o usuário começa a digitar
    if (formErrors.nome) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.nome;
        return newErrors;
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "nomeAniversariante") setInputValue(value);
    
    // Limpa o erro quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validar o formulário antes de enviar
    const { isValid, errors } = await validateBirthdayForm(formData);
    
    if (!isValid) {
      setFormErrors(errors);
      return;
    }
    
    // Se for válido, limpa os erros e continua
    setFormErrors({});
    onAddItem(formData);
    setFormData({
      id: 0,
      nomeAniversariante: "",
      idade: 0,
      idadeNoEvento: 0
    });
    setInputValue("");
    onClose();
  };

  // Função para exibir mensagem de erro
  const renderError = (field: string) => {
    return formErrors[field] ? (
      <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>
    ) : null;
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Label className="text-2xl">Adicionar Aniversariante</Label>
      </div>
      <form onSubmit={handleSubmit} className="relative p-4">
        {/* Campo nome com autocomplete */}
        <div className="mb-6 relative" >
          <Label>Nome</Label>
          <Input
            type="text"
            name="nomeAniversariante"
            value={inputValue}
            onChange={handleChange}
            placeholder="Nome"
            className={`w-full ${formErrors.nome ? 'border-red-500' : ''}`}
          />
          {renderError('nomeAniversariante')}
        </div>

        <div className="mb-4">
          <Label>Idade</Label>
          <Input
            type="number"
            name="idade"
            value={formData.idade.toString()}
            onChange={handleChange}
            placeholder="Idade"
            className={formErrors.idade ? 'border-red-500' : ''}
          />
          {renderError('idade')}
        </div>

        <div className="mb-4">
          <Label>Idade no Evento</Label>
          <Input
            type="text"
            name="idadeNoEvento"
            value={formData.idadeNoEvento.toString()}
            onChange={handleChange}
            placeholder="Idade no Evento"
            className={formErrors.idadeNoEvento ? 'border-red-500' : ''}
          />
          {renderError('idadeNoEvento')}
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
};

export default BirthDayModal;