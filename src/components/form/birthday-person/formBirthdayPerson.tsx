/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import { Field, ErrorMessage, FieldProps, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import { getThemesByDescription } from '@/services/theme/getTheme';

export const FormBirthDayPerson = () => {
    const { setFieldValue, setFieldError } = useFormikContext();
    const [themeSuggestions, setThemeSuggestions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>('');

    // Função para lidar com busca de temas
    const fetchThemes = debounce(async (query: string) => {
        if (query.length >= 2) {
            setIsLoading(true);
            try {
                const response = await getThemesByDescription(query);
                setThemeSuggestions(response); 
            } catch (error) {
                console.error('Erro ao buscar temas:', error);
                setThemeSuggestions([]);
            } finally {
                setIsLoading(false);
            }
        } else {
            setThemeSuggestions([]);
        }
    }, 500); // Debounce de 500ms

    useEffect(() => {
        fetchThemes(inputValue);
    }, [inputValue]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="nome">Nome</Label>
                    <Field id="nome" name="nome">
                        {({ field }: FieldProps) => (
                            <Input {...field} type="text" />
                        )}
                    </Field>
                    <ErrorMessage name="nome" component="div" />
                </div>

                <div>
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Field id="dataNascimento" name="dataNascimento">
                        {({ field }: FieldProps) => (
                            <Input {...field} 
                                type="date"
                                placeholder="Data de Nascimento"
                            />
                        )}
                    </Field>
                    <ErrorMessage name="dataNascimento" component="div" />
                </div>

                <div>
                    <Label htmlFor="idade">Idade</Label>
                    <Field id="idade" name="idade">
                        {({ field }: FieldProps) => (
                            <Input {...field} type="text" />
                        )}
                    </Field>
                    <ErrorMessage name="idade" component="div" />
                </div>

                <div>
                    <Label htmlFor="idadeNoEvento">Idade no Evento</Label>
                    <Field id="idadeNoEvento" name="idadeNoEvento">
                        {({ field }: FieldProps) => (
                            <Input {...field} type="text" />
                        )}
                    </Field>
                    <ErrorMessage name="idadeNoEvento" component="div" />
                </div>

                {/* Campo Tema com autocomplete */}
                <div>
                    <Label htmlFor="temas">Tema</Label>
                    <div className="relative">
                        <Input
                            id="temas"
                            name="temas"
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Digite para buscar temas..."
                        />
                        {isLoading && <div className="absolute top-full left-0 bg-gray-100 p-2">Carregando...</div>}
                        {themeSuggestions.length > 0 && (
                            <ul className="absolute top-full z-10 bg-white border border-gray-200 max-h-48 overflow-y-auto w-full">
                                {themeSuggestions.map((theme) => (
                                    <li
                                        key={theme.id}
                                        className="p-2 hover:bg-gray-200 cursor-pointer"
                                        onClick={() => {
                                            setFieldValue('temas', theme.id); // Captura o ID do Tema
                                            setInputValue(theme.descricao); // Mostra o texto do tema
                                            setThemeSuggestions([]); // Limpa a lista após seleção
                                        }}
                                    >
                                        {theme.descricao}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <ErrorMessage name="temas" component="div" />
                </div>
            </div>
        </div>
    );
};