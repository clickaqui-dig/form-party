/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@/components/ui/modal";
import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import { BirthDayItem } from "../form-elements/BirthdayList";
import debounce from "lodash.debounce";
import { getBirthDayPersonbyName } from "@/services/birthday-person/getBithdayPerson";
import { validateBirthdayForm } from "./validations";

interface BirthDayProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: BirthDayItem) => void;
}

const BirthDayModal: FC<BirthDayProps> = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState<BirthDayItem>({
    id: 0,
    nome: "",
    dataNascimento: "",
    tema: "",
    idade: 0,
    idadeNoEvento: 0
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pageSize = 10;
  const fetchIdRef = useRef(0);
  const autocompleteRef = useRef<HTMLDivElement>(null);

  // Debounced fetch for autocomplete paginado
  const fetchPersons = debounce(async (query: string, pageNum: number = 0, reset: boolean = true) => {
    if (query.length < 2) {
      setSuggestions([]);
      setHasMore(false);
      setPage(0);
      return;
    }
    setIsLoading(true);
    const currentFetchId = ++fetchIdRef.current;
    try {
      const response = await getBirthDayPersonbyName(query, pageNum, pageSize);
      if (fetchIdRef.current !== currentFetchId) return; // descarta respostas antigas
      if (response && response.content) {
        if (reset) {
          setSuggestions(response.content);
        } else {
          setSuggestions(prev => [...prev, ...response.content]);
        }
        setHasMore(!response.last);
        setPage(response.number + 1);
      } else {
        setSuggestions([]);
        setHasMore(false);
      }
    } catch (error) {
      setSuggestions([]);
      setHasMore(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // Busca automática ao digitar
  useEffect(() => {
    if (inputValue) fetchPersons(inputValue, 0, true);
    else setSuggestions([]);
    if (!isOpen) setSuggestions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      nome: e.target.value,
    }));
    setPage(0);
    
    // Limpa o erro quando o usuário começa a digitar
    if (formErrors.nome) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.nome;
        return newErrors;
      });
    }
  };

  const handleSuggestionClick = (person: any) => {
    setInputValue(person.nome);
    setFormData({
      id: person.id,
      nome: person.nome,
      dataNascimento: person.dataNascimento || "",
      tema: person.tema?.descricao || "",
      idade: person.idade || 0,
      idadeNoEvento: person.idadeNoEvento || 0
    });
    setSuggestions([]);
    setHasMore(false);
    
    // Limpa os erros relacionados aos campos preenchidos
    const fieldsToCheck = ['nome', 'dataNascimento', 'tema', 'idade', 'idadeNoEvento'];
    const fieldsWithValues = fieldsToCheck.filter(field => !!person[field]);
    
    if (fieldsWithValues.length > 0) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        fieldsWithValues.forEach(field => {
          delete newErrors[field];
        });
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
    if (name === "nome") setInputValue(value);
    
    // Limpa o erro quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleLoadMore = () => {
    fetchPersons(inputValue, page, false);
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
      nome: "",
      dataNascimento: "",
      tema: "",
      idade: 0,
      idadeNoEvento: 0
    });
    setInputValue("");
    setPage(0);
    setSuggestions([]);
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
        <div className="mb-6 relative" ref={autocompleteRef}>
          <Label>Nome</Label>
          <Input
            type="text"
            name="nome"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Digite para buscar aniversariante..."
            className={`w-full ${formErrors.nome ? 'border-red-500' : ''}`}
          />
          {renderError('nome')}
          
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
              {hasMore && (
                <li
                  className="py-2 text-center bg-gray-100 text-sm cursor-pointer hover:bg-gray-200"
                  onClick={handleLoadMore}
                >
                  Carregar mais...
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <Label>Data de nascimento</Label>
          <Input
            type="date"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            placeholder="Data de Nascimento"
            className={formErrors.dataNascimento ? 'border-red-500' : ''}
          />
          {renderError('dataNascimento')}
        </div>

        <div className="mb-4">
          <Label>Tema</Label>
          <Input
            type="text"
            name="tema"
            value={formData.tema}
            onChange={handleChange}
            placeholder="Tema"
            className={formErrors.tema ? 'border-red-500' : ''}
          />
          {renderError('tema')}
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