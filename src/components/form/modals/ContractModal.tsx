import React, { FC, useState, ChangeEvent, FormEvent, useRef, useEffect } from "react";
import { Modal } from "@/components/ui/modal";
import Label from "../Label";
import Input from "../input/InputField";
import debounce from "lodash.debounce";
import { getItemContract } from "@/services/item-contract/getItemContract";

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: { id: number; descricao: string; valor: number }) => void;
}

interface FormData {
  id: number;
  descricao: string;
  valor: string;
}

const ContractModal: FC<ContractModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState<FormData>({
    id: 0,
    descricao: '',
    valor: '',
  });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Debounced fetch for autocomplete
  const fetchItemContract = debounce(async (query: string) => {
    if (query.length >= 2) {
      setIsLoading(true);
      try {
        const response = await getItemContract(query);
        setSuggestions(response || []);
      } catch (error) {
        console.error("Erro ao buscar Item:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    if (inputValue) {
      console.log("item contracto inputValue ===>>>", inputValue)
      fetchItemContract(inputValue)
    }
    else setSuggestions([]);
    if (!isOpen) setSuggestions([]);
  }, [inputValue, isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("item contracto value ===>>>", value)
    setInputValue(value);
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSuggestionClick = (item: FormData) => {
    setInputValue(item.descricao);
    setFormData({
      id: item.id,
      descricao: item.descricao,
      valor: item.valor,
    });
    setSuggestions([]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddItem({
      id: formData.id,
      descricao: formData.descricao,
      valor: parseFloat(formData.valor)
    });
    setFormData({
      id: 0,
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
            value={inputValue}
            onChange={handleChange}
            placeholder="Digite para buscaro Item..."
            className="w-full"
          />
          {isLoading && (
            <div className="left-0 top-full bg-white border border-gray-200 w-full p-2 rounded-b shadow z-20">
              <span className="text-gray-600 text-sm">Carregando...</span>
            </div>
          )}
          {!!suggestions.length && (
            <ul className="left-0 top-full w-full bg-white border border-gray-200 rounded-b shadow max-h-48 overflow-y-auto z-20">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm transition"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item.descricao}
                </li>
              ))}
            </ul>
          )}
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