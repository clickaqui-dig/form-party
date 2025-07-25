/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "@/components/ui/modal";
import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import debounce from "lodash.debounce";
import { ThemeListItem } from "../form-elements/ThemaList";
import { fetchThemes  } from "@/services/themeServices";
import { ImageFile } from "@/features/theme";

interface ThemeProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: ThemeListItem) => void;
}

const ThemeModal: FC<ThemeProps> = ({ isOpen, onClose, onAddItem }) => {
  const [formData, setFormData] = useState<ThemeListItem>({
    id: 0,
    descricao: "",
    observacoes: "",

  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [themeSuggestions, setThemeSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const pageSize = 10;
  const fetchIdRef = useRef(0);
  const autocompleteRef = useRef<HTMLDivElement>(null);
  const [selectedImages, setSelectedImages] = useState<ImageFile[]>([]);

  // Debounced fetch for autocomplete paginado
  const fetchPersons = debounce(async (query: string, pageNum: number = 0, reset: boolean = true) => {
    if (query.length < 2) {
      setThemeSuggestions([]);
      setHasMore(false);
      setPage(0);
      return;
    }
    setIsLoading(true);
    const currentFetchId = ++fetchIdRef.current;
    try {
      const response = await fetchThemes(query, pageNum, pageSize);
      if (fetchIdRef.current !== currentFetchId) return; // descarta respostas antigas
      if (response && response.content) {
        if (reset) {
          setThemeSuggestions(response.content);
        } else {
          setThemeSuggestions(prev => [...prev, ...response.content]);
        }
        setHasMore(!response.last);
        setPage(response.page);
      } else {
        setThemeSuggestions([]);
        setHasMore(false);
      }
    } catch (error) {
      setThemeSuggestions([]);
      setHasMore(false);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, 300);

  // Busca automática ao digitar
  useEffect(() => {
    if (inputValue) fetchPersons(inputValue, 0, true);
    else setThemeSuggestions([]);
    if (!isOpen) setThemeSuggestions([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue, isOpen]);

  // Fecha sugestões ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target as Node)) {
        setThemeSuggestions([]);
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
      descricao: e.target.value,
    }));
    setPage(0);

    // Limpa o erro quando o usuário começa a digitar
    if (formErrors.descricao) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.descricao;
        return newErrors;
      });
    }
  };

  const handleSuggestionClick = (theme: any) => {
    setInputValue(theme.descricao);
    setSelectedImages(theme.imagens)
    setFormData({
      id: theme.id,
      descricao: theme.descricao,
      observacoes: theme.observacoes || "",
    });
    setThemeSuggestions([]);
    setHasMore(false);

    // Limpa os erros relacionados aos campos preenchidos
    const fieldsToCheck = ['descricao', 'observacoes'];
    const fieldsWithValues = fieldsToCheck.filter(field => !!theme[field]);

    if (fieldsWithValues.length > 0) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
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
    if (name === "descricao") setInputValue(value);

    // Limpa o erro quando o usuário começa a digitar
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
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

    setFormErrors({});
    onAddItem(formData);
    setFormData({
      id: 0,
      descricao: "",
      observacoes: "",
    });
    setInputValue("");
    setPage(0);
    setThemeSuggestions([]);
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
        <Label className="text-2xl">Adicionar Tema</Label>
      </div>
      <form onSubmit={handleSubmit} className="relative p-4">
        <div>
          <Label htmlFor="tema">Tema</Label>
          <div className="relative">
            <Input
              id="descricao"
              name="descricao"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Digite para buscar temas..."
              requerid={true}
            />
            {isLoading && (
              <div className="absolute top-full left-0 bg-gray-100 p-2 z-20">
                Carregando...
              </div>
            )}
            {themeSuggestions.length > 0 && (
              <ul className="absolute top-full z-10 bg-white border border-gray-200 max-h-48 overflow-y-auto w-full">
                {themeSuggestions && themeSuggestions.map(theme => (
                  <li
                    key={theme.id}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleSuggestionClick(theme)}
                  >
                    {theme.descricao}
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
          {/* Corrigido o name do ErrorMessage para 'tema' (não 'temas') */}
          {renderError('dataNascimento')}
        </div>

        <div className="mb-4">
          <Label>Observação</Label>
          <Input
            type="text"
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            placeholder="Observação"
            className={formErrors.tema ? 'border-red-500' : ''}
          />
          {/* {renderError('tema')} */}
        </div>

        <div className="mb-4">
          {selectedImages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedImages.map((img, index) => {
            console.log(img.url)
            const src  = img.url;
            
            return (
              <div key={index} className="relative border rounded-lg p-3 bg-gray-50">
                {/* Thumb */}
                <div className="relative">
                  <img
                    src={src}
                    alt={img.descricao ?? `Imagem ${index + 1}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>

                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Descrição da imagem (opcional)"
                    value={img.descricao ?? ''}
                    disabled={true}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div className="mt-1 text-xs text-gray-500">
                  {img.nomeArquivoOriginal}
                </div>
              </div>
            );
          })}
            </div>
          )}
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

export default ThemeModal;