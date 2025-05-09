import { Modal } from "@/components/ui/modal";
import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import { BirthDayItem } from "../form-elements/BirthdayList";
import debounce from "lodash.debounce";
import { getBirthDayPersonbyName } from "@/services/birthday-person/getBithdayPerson";

interface BirthDayProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: BirthDayItem) => void;
}

const BithdayModal: FC<BirthDayProps> = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState<BirthDayItem>({
    id:0,
    nome: "",
    dataNascimento: "",
    tema: "",
    idade: 0,
    idadeNoEvento: 0 
  });
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Debounced fetch for autocomplete
  const fetchPersons = debounce(async (query: string) => {
    if (query.length >= 2) {
      setIsLoading(true);
      try {
        const response = await getBirthDayPersonbyName(query);
        setSuggestions(response || []);
      } catch (error) {
        console.error("Erro ao buscar aniversariante:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSuggestions([]);
    }
  }, 300);

  useEffect(() => {
    if (inputValue) fetchPersons(inputValue);
    else setSuggestions([]);
    if (!isOpen) setSuggestions([]);
  }, [inputValue, isOpen]);

  // Fecha sugestões ao clicar fora
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setFormData((prev) => ({
      ...prev,
      name: e.target.value,
    }));
  };

  const handleSuggestionClick = (person: any) => {
    setInputValue(person.nome);
    setFormData({
      id: person.id,
      nome: person.nome,   
      dataNascimento: person.dataNascimento || "",  
      tema: person.tema.descricao || "" ,
      idade: person.idade || "",
      idadeNoEvento: person.idadeNoEvento || ""
    });
    setSuggestions([]);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "name") setInputValue(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddItem(formData);
    setFormData({
      id:0,
      nome: "",
      dataNascimento: "",
      tema: "",
      idade: 0,
      idadeNoEvento: 0 
    });
    setInputValue("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg p-6">
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Label className="text-2xl">Adicionar Aniversariante</Label>
      </div>
      <form onSubmit={handleSubmit} className="relative p-4">
        {/* Campo nome com autocomplete */}
        <div className="mb-6 relative" ref={autocompleteRef}>
          <Label>Nome</Label>
          <Input
            type="text"
            name="name"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Digite para buscar aniversariante..."
            className="w-full"
          />
          {isLoading && (
            <div className="absolute left-0 top-full bg-white border border-gray-200 w-full p-2 rounded-b shadow z-20">
              <span className="text-gray-600 text-sm">Carregando...</span>
            </div>
          )}
          {!!suggestions.length && (
            <ul className="absolute left-0 top-full w-full bg-white border border-gray-200 rounded-b shadow max-h-48 overflow-y-auto z-20">
              {suggestions.map((person) => (
                <li
                  key={person.id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm transition"
                  onClick={() => handleSuggestionClick(person)}
                >
                  {person.nome}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <Label>Data de nascimento</Label>
          <Input
            type="date"
            name="date"
            value={formData.dataNascimento}
            onChange={handleChange}
            placeholder="Data de Nascimento"
          />
        </div>

        <div className="mb-4">
          <Label>Tema</Label>
          <Input
            type="text"
            name="tema"
            value={formData.tema}
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
};
export default BithdayModal;