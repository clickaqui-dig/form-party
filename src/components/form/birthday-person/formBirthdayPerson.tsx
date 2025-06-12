/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { Field, ErrorMessage, FieldProps, useFormikContext } from 'formik';
import { useEffect, useState, useRef } from 'react';
import debounce from 'lodash.debounce';
import { getThemesByDescription } from '@/services/theme/getTheme';

export const FormBirthDayPerson = () => {
  const { setFieldValue, errors, values} = useFormikContext<any>();
  const [themeSuggestions, setThemeSuggestions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const pageSize = 10;
  const fetchIdRef = useRef(0);

  // Busca temas paginados
  const fetchThemes = debounce(async (query: string, pageNum: number = 0, reset = false) => {
    if (query.length < 2) {
      setThemeSuggestions([]);
      setHasMore(false);
      setPage(0);
      return;
    }

    setIsLoading(true);
    const currentFetchId = ++fetchIdRef.current;
    try {
      const response = await getThemesByDescription(query, pageNum, pageSize);

      if (fetchIdRef.current !== currentFetchId) return; // Ignora respostas antigas

      // Se reset, inicia; se não, concatena
      if (reset) {
        setThemeSuggestions(response.content);
      } else {
        setThemeSuggestions(prev => [...prev, ...response.content]);
      }
      setHasMore(!response.last); // .last indica se é a última página
      setPage(response.number + 1); // Atualiza para próxima página
    } catch (error) {
      setThemeSuggestions([]);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, 500);

  // Atualiza sugestões sempre que inputValue mudar
  useEffect(() => {
    if (inputValue.length >= 2) {
      setPage(0);
      fetchThemes(inputValue, 0, true);
    } else {
      setThemeSuggestions([]);
      setHasMore(false);
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  // Função para carregar mais (paginado)
  const handleLoadMore = () => {
    fetchThemes(inputValue, page, false);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="nome">Nome</Label>
          <Field id="nome" name="nome">
            {({ field }: FieldProps) => <Input {...field} type="text" />}
          </Field>
          {errors.nome && (
            <div className="text-red-500 text-sm mt-1">{String(errors.nome)}</div>
          )}
        </div>

        <div>
          <Label htmlFor="dataNascimento">Data de Nascimento</Label>
          <Field id="dataNascimento" name="dataNascimento">
            {({ field }: FieldProps) => (
              <Input {...field} type="date" placeholder="Data de Nascimento" />
            )}
          </Field>
                    {errors.dataNascimento && (
            <div className="text-red-500 text-sm mt-1">{String(errors.dataNascimento)}</div>
          )}
        </div>

        <div>
          <Label htmlFor="idade">Idade</Label>
          <Field id="idade" name="idade">
            {({ field }: FieldProps) => <Input {...field} type="number" min='0' max='100' />}
          </Field>
          {errors.idade && values.idade == 0 && (
            <div className="text-red-500 text-sm mt-1">{String(errors.idade)}</div>
          )}
        </div>

        <div>
          <Label htmlFor="idadeNoEvento">Idade no Evento</Label>
          <Field id="idadeNoEvento" name="idadeNoEvento">
            {({ field }: FieldProps) => <Input {...field} type="number" min='0' max='100' />}
          </Field>
          {errors.idadeNoEvento && (
            <div className="text-red-500 text-sm mt-1">{String(errors.idadeNoEvento)}</div>
          )}
        </div>

        {/* Campo Tema com autocomplete */}
        <div>
          <Label htmlFor="tema">Tema</Label>
          <div className="relative">
            <Input
              id="tema"
              name="tema"
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
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
                    onClick={() => {
                      setFieldValue('tema', theme.id); // Salva o ID do Tema
                      setInputValue(theme.descricao); // Mostra o texto no input
                      setThemeSuggestions([]); // Limpa a lista após seleção
                      setHasMore(false);
                    }}
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
          {  errors.tema && (
            <div className="text-red-500 text-sm mt-1">{String(errors.tema)}</div>
          )}
        </div>
      </div>
    </div>
  );
};