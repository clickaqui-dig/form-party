/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import Label from '@/components/form/Label';
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from '@/icons';
import BirthdayList from "@/components/form/form-elements/BirthdayList";
import TabsComponent from "@/components/form/form-elements/TabsComponent";
import { ErrorMessage, Field, useFormikContext } from "formik";
import debounce from "lodash.debounce";
import { getCustomerByName } from "@/services/customer/getCustomerbyName";

export const FormContract = () => {
  const { setFieldValue } = useFormikContext();
  const [clientSuggestions, setClientSuggestions] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Função para buscar clientes com debounce
  const fetchClients = debounce(async (query: string) => {
    if (query.length >= 2) {
      setIsLoading(true);
      try {
        const response = await getCustomerByName({ nome: query });
        setClientSuggestions(response.content || []); // Supondo que o backend retorna em `content`
      } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        setClientSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setClientSuggestions([]);
    }
  }, 500);

  // Atualiza sugestões ao digitar
  useEffect(() => {
    fetchClients(query);
  }, [query]);

  const handleClientSelect = (client: any) => {
    console.log("cliuentedoifndgf ===>>", client)

    setFieldValue("cliente", client.nome);
    setFieldValue("emailCliente", client.email);
    setFieldValue("celularCliente", client.celular);
    setFieldValue("documento", client.documento);
    setFieldValue("cep", client.cep);
    setFieldValue("endereco", client.endereco);
    setFieldValue("numero", client.numero);
    setFieldValue("cidade", client.cidade);
    setFieldValue("uf", client.uf);
    setClientSuggestions([]);
    setQuery(client.nome);
  };

  const options = [
    { value: "sp", label: "SP" },
    { value: "rj", label: "RJ" },
    { value: "mg", label: "MG" },
  ];

  const optionsContract = [
    { value: "aniversario", label: "Aniversário" },
    { value: "casamento", label: "Casamento" },
    { value: "confraternizacao", label: "Confraternização" },
    { value: "corporativo", label: "Corporativo" },
    { value: "formatura", label: "Formatura" },
    { value: "outros", label: "Outros" },
  ];

  const handleSelectChangeContract = (value: string) => {
    setFieldValue("tiposDeContrato", value)
    console.log("Selected value:", value);
};

  return (
    <div className="space-y-6">
      {/* Primeira linha */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div>
          <Label htmlFor="id">Código</Label>
          <Input type="text" disabled />
        </div>
        <div>
          <Label htmlFor="situation">Situação</Label>
          <Label>Criado</Label>
        </div>
        <div>
          <Label htmlFor="receiveValue">Valor Recebido</Label>
          <Label>R$1000,00</Label>
        </div>
        <div>
          <Label htmlFor="pendingValue">Valor Pendente</Label>
          <Label>R$500,00</Label>
        </div>
        <div>
          <Label htmlFor="totalValue">Valor Total</Label>
          <Label>R$1500,00</Label>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger flex w-full justify-center rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 sm:w-auto"
          >
            Cancelar contrato
          </button>
        </div>
      </div>

      {/* Segunda linha (Cliente, E-mail, Celular, CPF/CNPJ) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="relative">
          <Label htmlFor="cliente">Cliente</Label>
          <Field id="cliente" name="cliente">
            {({ field }: any) => (
              <Input
                {...field}
                type="text"
                value={query}
                placeholder="Digite para buscar clientes..."
                onChange={(e) => setQuery(e.target.value)}
              />
            )}
          </Field>
          <ErrorMessage name="cliente" component="div" />
          {isLoading && <div className="absolute top-full bg-gray-100 p-2">Carregando...</div>}
          {clientSuggestions.length > 0 && (
            <ul className="absolute top-full z-10 bg-white border border-gray-300 rounded-md w-full max-h-48 overflow-y-auto">
              {clientSuggestions.map((client) => (
                <li
                  key={client.id}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleClientSelect(client)}
                >
                  {client.nome} - {client.cpfCnpj}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <Label htmlFor="emailCliente">E-mail</Label>
          <Field id="emailCliente" name="emailCliente">
            {({ field }: any) => <Input {...field} type="text" disabled />}
          </Field>
          <ErrorMessage name="emailCliente" component="div" />
        </div>
        <div>
          <Label htmlFor="celularCliente">Celular</Label>
          <Field id="celularCliente" name="celularCliente">
            {({ field }: any) => <Input {...field} type="text" disabled />}
          </Field>
          <ErrorMessage name="celularCliente" component="div" />
        </div>
        <div>
          <Label htmlFor="documento">CPF/CNPJ</Label>
          <Field id="documento" name="documento">
            {({ field }: any) => <Input {...field} type="text" disabled />}
          </Field>
          <ErrorMessage name="documento" component="div" />
        </div>
      </div>

      {/* Terceira linha (CEP, Endereço, Número, Cidade, UF) */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Field id="cep" name="cep">
            {({ field }: any) => <Input {...field} type="text" disabled />}
          </Field>
          <ErrorMessage name="cep" component="div" />
        </div>
        <div className="col-span-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Field id="endereco" name="endereco">
            {({ field }: any) => <Input {...field} type="text" disabled />}
          </Field>
          <ErrorMessage name="endereco" component="div" />
        </div>
        <div>
          <Label htmlFor="numero">Número</Label>
          <Field id="numero" name="numero">
            {({ field }: any) => <Input {...field} type="text" disabled />}
          </Field>
          <ErrorMessage name="numero" component="div" />
        </div>
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Field id="cidade" name="cidade">
            {({ field }: any) => <Input {...field} type="text" disabled />}
          </Field>
          <ErrorMessage name="cidade" component="div" />
        </div>
        <div>
          <Label htmlFor="uf">UF</Label>
          <Field id="uf" name="uf">
            {({ field }: any) =>  <Input {...field} type="text" disabled />}
          </Field>
          <ErrorMessage name="uf" component="div" />
        </div>
      </div>

                  {/* quarta linha */}
                  <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div>
                    <Label htmlFor="tiposDeContrato">Tipo de Contrato</Label>
                    <div className="relative">
                        <Field id="uf" name="uf">
                            {({ field }: any) => (
                                <Select
                                    {...field}
                                    options={optionsContract}
                                    placeholder="Tipo"
                                    onChange={handleSelectChangeContract}
                                    className="dark:bg-dark-700"
                                />
                            )}
                         </Field>
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                        </span>
                    </div>
                </div>
                <div>
                    <Label htmlFor="dataHoraInicial">Data Inicio</Label>
                    <div className="relative">
                        <Field id="city" name="city">
                            {({ field }: any) => (
                                <Input
                                    type="datetime-local"
                                    id="dataHoraInicial"
                                    name="dataHoraInicial"
                                    onChange={(event) => {
                                        setFieldValue("dataHoraInicial", event.target.value)
                                    }}
                                />
                            )} 
                            </Field>
                     
                        <ErrorMessage name="city" component="div" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="dataHoraFinal">Data Final</Label>
                    <div className="relative">
                        <Field id="city" name="city"   >
                            {({ field }: any) => (
                                <Input
                                    type="datetime-local"
                                    id="dataHoraFinal"
                                    name="dataHoraFinal"
                                    onChange={(event) => {
                                        setFieldValue("dataHoraFinal", event.target.value)
                                    }}
                                />
                            )} 
                            
                        </Field>
                        <ErrorMessage name="dataHoraFinal" component="div" />
                    </div>
                </div>
                <div>
                    <Label>Duração</Label>
                    <Label>10 horas</Label>
                </div>
                <div>
                    <Label htmlFor="quantidadeConvidados">Quant. de convidados</Label>
                    <Field id="quantidadeConvidados" name="quantidadeConvidados" >
                        {({ field }: any) => (
                            <Input
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("quantidadeConvidados", event.target.value)
                                }}
                            />
                        )} 
                    </Field>
                    <ErrorMessage name="quantidadeConvidados" component="div" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="w-96">
                    <Label htmlFor="observacoes"> Observações</Label>

                    <Field id="observacoes" name="observacoes">
                        {({ field }: any) => (
                            <Input
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("observacoes", event.target.value)
                                }}
                            />

                        )}
                    </Field>
                    <ErrorMessage name="quantidadeConvidados" component="div" />
                </div>
            </div>


      {/* Resto do formulário */}
      <>
        <BirthdayList />
      </>
      <>
        <TabsComponent />
      </>
    </div>
  );
};