/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const fetchIdRef = useRef(0);
  const pageSize = 10;

  // Debounced fetch for autocomplete com paginação
  const fetchItemContract = debounce(async (query: string, pageNum: number = 0, reset: boolean = true) => {
    if (query.length < 2) {
      setSuggestions([]);
      setHasMore(false);
      setPage(0);
      return;
    }
    setIsLoading(true);
    const currentFetchId = ++fetchIdRef.current;
    try {
      const response = await getItemContract(query, pageNum, pageSize);
      if (fetchIdRef.current !== currentFetchId) return; // Despreza resposta antiga
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

  useEffect(() => {
    if (inputValue) {
      fetchItemContract(inputValue, 0, true);
    }
    else setSuggestions([]);
    if (!isOpen) setSuggestions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (name === "descricao") setInputValue(value);
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    if (name === "descricao") setPage(0); // Reset paginação
  };

  const handleSuggestionClick = (item: any) => {
    setInputValue(item.descricao);
    setFormData({
      id: item.id,
      descricao: item.descricao,
      valor: item.valor?.toString() ?? ''
    });
    setSuggestions([]);
    setHasMore(false);
  };

  const handleLoadMore = () => {
    fetchItemContract(inputValue, page, false);
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
    setInputValue('');
    setSuggestions([]);
    setHasMore(false);
    setPage(0);
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
        <div className="mb-4 relative" ref={autocompleteRef}>
          <Label>
            Descrição <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            name="descricao"
            value={inputValue}
            onChange={handleChange}
            placeholder="Digite para buscar o Item..."
            className="w-full"
          />
          {isLoading && (
            <div className="absolute left-0 top-full bg-white border border-gray-200 w-full p-2 rounded-b shadow z-20">
              <span className="text-gray-600 text-sm">Carregando...</span>
            </div>
          )}
          {!!suggestions.length && (
            <ul className="absolute left-0 top-full w-full bg-white border border-gray-200 rounded-b shadow max-h-48 overflow-y-auto z-20">
              {suggestions.map((item) => (
                <li
                  key={item.id}
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer text-sm transition"
                  onClick={() => handleSuggestionClick(item)}
                >
                  {item.descricao}
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