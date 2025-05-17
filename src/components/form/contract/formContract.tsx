/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCustomerByName } from "@/services/customer/getCustomerbyName";
import { ErrorMessage, Field, useFormikContext } from "formik";
import debounce from "lodash.debounce";
import { useEffect, useRef, useState, useMemo } from "react";
import BirthdayList from "../form-elements/BirthdayList";
import TabsComponent from "./components/Tabs/TabsComponent";
import Input from "../input/InputField";
import Label from "../Label";
import Select from "../Select";
import { ChevronDownIcon } from "lucide-react";
import { getContractByDate } from "@/services/contract/getContractByDate";

function calcularDuracaoHoras(inicio: string, fim: string): string {
  if (!inicio || !fim) return '';
  const ini = new Date(inicio);
  const fin = new Date(fim);
  if (isNaN(ini.getTime()) || isNaN(fin.getTime())) return '';
  const diffMs = fin.getTime() - ini.getTime();
  if (diffMs < 0) return '';
  const diffHrs = diffMs / (1000 * 60 * 60);
  return diffHrs.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export const FormContract = () => {
  const { setFieldValue, values, errors } = useFormikContext<any>();
  const [clientSuggestions, setClientSuggestions] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [duracaoHoras, setDuracaoHoras] = useState('');

  const [conflictInfo, setConflictInfo] = useState<{ exists: boolean, contract?: any }>({ exists: false });

  const pageSize = 10;
  const fetchIdRef = useRef(0);

  const fetchClients = debounce(async (search: string, pageNum: number = 0, reset: boolean = true) => {
    if (search.length < 2) {
      setClientSuggestions([]);
      setHasMore(false);
      setPage(0);
      return;
    }
    setIsLoading(true);
    const currentFetchId = ++fetchIdRef.current;
    try {
      const response = await getCustomerByName(search, pageNum, pageSize);
      if (fetchIdRef.current !== currentFetchId) return;
      if (reset) {
        setClientSuggestions(response.content ?? []);
      } else {
        setClientSuggestions(prev => [...prev, ...(response.content ?? [])]);
      }
      setHasMore(!response.last);
      setPage(response.number + 1);
    } catch (error: any) {
      setClientSuggestions([]);
      setHasMore(false);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }, 500);

  const valuePending = useMemo(() => {
    return values.valorTotal - Number(values.valorRecebido);
  }, [values.valorRecebido, values.valorTotal]);

  const valueRecept = useMemo(() => {
    return values.valorRecebido;
  }, [values.valorRecebido]);


  useEffect(() => {
    if (query.length >= 2) {
      setPage(0);
      fetchClients(query, 0, true);
    } else {
      setClientSuggestions([]);
      setHasMore(false);
      setPage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleLoadMore = () => {
    fetchClients(query, page, false);
  };

  // Atualiza duração ao mudar qualquer dos campos
  useEffect(() => {
    const dur = calcularDuracaoHoras(values.dataHoraInicial, values.dataHoraFinal);
    setDuracaoHoras(dur);
    setFieldValue("duracao", dur);
  }, [values.dataHoraInicial, values.dataHoraFinal, setFieldValue]);

  const handleClientSelect = (client: any) => {
    setFieldValue("cliente", client.id);
    // setFieldValue("nome", client.nome);
    setFieldValue("emailCliente", client.email);
    setFieldValue("celularCliente", client.celular);
    setFieldValue("documento", client.documento);
    setFieldValue("cep", client.cep);
    setFieldValue("endereco", client.endereco);
    setFieldValue("numero", client.numero);
    setFieldValue("cidade", client.cidade);
    setFieldValue("uf", client.uf);
    setClientSuggestions([]);
    setHasMore(false);
    setQuery(client.nome);
    setFieldValue('nomeCliente', client.nome);

  };

  const optionsContract = [
    { value: "ANIVERSARIO", label: "Aniversário" },
  ];

  const handleSelectChangeContract = (value: string) => {
    setFieldValue("tipoDoContrato", "ANIVERSARIO")
    console.log("Selected value:", value);
  };

  // CHECAGEM DE CONFLITO DE DATA/HORA INICIO
  useEffect(() => {
    if (!values.dataHoraInicial) {
      setConflictInfo({ exists: false });
      return;
    }
    let cancelled = false;

    // Debounce pode ser adicionado se quiser evitar requisições a cada digito
    const debouncedCheck = setTimeout(async () => {
      const result = await getContractByDate(values.dataHoraInicial);
      if (!cancelled) {
        if (result && result.length > 0) {
          setConflictInfo({ exists: true, contract: result[0] });
        } else {
          setConflictInfo({ exists: false });
        }
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(debouncedCheck);
    };
  }, [values.dataHoraFinal]);

  const handleChangeQuery = (e: any) => {
    setQuery(e.target.value)
    setFieldValue('nomeCliente', e.target.value)
  }

  return (
    < div className="space-y-6" >
      {/* AVISO DE CONFLITO DE DATA */}
      {
        conflictInfo.exists && values.idContrato === 0 && (
          <div className="bg-red-100 rounded p-2 mb-2 border border-red-300 text-red-700 text-sm">
            Já existe um contrato cadastrado para o mesmo horário/dia:
            <div className="mt-1 text-xs">
              ID: {conflictInfo.contract.id} | Início: {conflictInfo.contract.dataHoraInicial}
            </div>
          </div>
        )
      }

      {/* Primeira linha */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div>
          <Label htmlFor="idForm">Código</Label>
          <Field id="idForm" name="idForm">
            {({ field }: any) => (
              <Input
                {...field}
                type="text"
                value={field.value ?? ''}
                disabled
              />
            )}
          </Field>
        </div>
        <div>
          <Label htmlFor="situation">Situação</Label>
          <Label>{values.idForm > 0 ? values.situacao : ""}</Label>
        </div>
        <div>
          <Label htmlFor="valorRecebido">Valor Recebido</Label>
          <Label>R${valueRecept}</Label>
        </div>
        <div>
          <Label htmlFor="valorPendente">Valor Pendente</Label>
          <Label>R${valuePending}</Label>
        </div>
        <div>
          <Label htmlFor="valorTotal">Valor Total</Label>
          <Label>R${values.valorTotal}</Label>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-danger flex w-full justify-center rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 sm:w-auto disabled:bg-gray-300 disabled:cursor-not-allowed "
            disabled={values.idContrato === 0 ? true : false}
          // onClick={()=>{
          //   alert("teste")
          // }}
          >
            Cancelar contrato
          </button>
        </div>
      </div>
      {/* Segunda linha (Cliente, E-mail, Celular, CPF/CNPJ) */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="relative">
          <Label htmlFor="nomeCliente">Cliente</Label>
          <Field id="nomeCliente" name="nomeCliente">
            {({ field }: any) => (
              <Input
                {...field}
                type="text"
                value={field.value ?? ''}
                placeholder="Digite para buscar clientes..."
                onChange={(e) => handleChangeQuery(e)}
              />
            )}
          </Field>
          {errors.nomeCliente && (
            <div className="text-red-500 text-sm mt-1">{errors.nomeCliente}</div>
          )}
          {isLoading && <div className="absolute top-full bg-gray-100 p-2 z-20">Carregando...</div>}
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
        <div>
          <Label htmlFor="emailCliente">E-mail</Label>
          <Field id="emailCliente" name="emailCliente">
            {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
          </Field>
          {errors.emailCliente && (
            <div className="text-red-500 text-sm mt-1">{errors.emailCliente}</div>
          )}
        </div>
        <div>
          <Label htmlFor="celularCliente">Celular</Label>
          <Field id="celularCliente" name="celularCliente">
            {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
          </Field>
          {errors.celularCliente && (
            <div className="text-red-500 text-sm mt-1">{errors.celularCliente}</div>
          )}
        </div>
        <div>
          <Label htmlFor="documento">CPF/CNPJ</Label>
          <Field id="documento" name="documento">
            {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
          </Field>
          {errors.documento && (
            <div className="text-red-500 text-sm mt-1">{errors.documento}</div>
          )}
        </div>
      </div>

      {/* Terceira linha (CEP, Endereço, Número, Cidade, UF) */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div>
          <Label htmlFor="cep">CEP</Label>
          <Field id="cep" name="cep">
            {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
          </Field>
          {errors.cep && (
            <div className="text-red-500 text-sm mt-1">{errors.cep}</div>
          )}
        </div>
        <div className="col-span-2">
          <Label htmlFor="endereco">Endereço</Label>
          <Field id="endereco" name="endereco">
            {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
          </Field>
          {errors.endereco && (
            <div className="text-red-500 text-sm mt-1">{errors.endereco}</div>
          )}
        </div>
        <div>
          <Label htmlFor="numero">Número</Label>
          <Field id="numero" name="numero">
            {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
          </Field>
          {errors.numero && (
            <div className="text-red-500 text-sm mt-1">{errors.numero}</div>
          )}
        </div>
        <div>
          <Label htmlFor="cidade">Cidade</Label>
          <Field id="cidade" name="cidade">
            {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
          </Field>
          {errors.cidade && (
            <div className="text-red-500 text-sm mt-1">{errors.cidade}</div>
          )}
        </div>
        <div>
          <Label htmlFor="uf">UF</Label>
          <Field id="uf" name="uf">
            {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
          </Field>
          {errors.uf && (
            <div className="text-red-500 text-sm mt-1">{errors.uf}</div>
          )}
        </div>
      </div>

      {/* quarta linha */}
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div>
          <Label htmlFor="tipoDoContrato">Tipo do Contrato</Label>
          <div className="relative">
            <Field id="tipoDoContrato" name="tipoDoContrato">
              {({ field }: any) => (
                <Select
                  {...field}
                  options={[optionsContract][0]}
                  onChange={handleSelectChangeContract}
                  className="dark:bg-dark-700"
                // disable={true}
                />
              )}
            </Field>
            {errors.tipoDoContrato === "ANIVERSARIO" && (
              <div className="text-red-500 text-sm mt-1">{errors.tipoDoContrato}</div>
            )}
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="dataHoraInicial">Data Início</Label>
          <div className="relative">
            <Field id="dataHoraInicial" name="dataHoraInicial">
              {({ field }: any) => (
                <Input
                  type="datetime-local"
                  id="dataHoraInicial"
                  name="dataHoraInicial"
                  value={field.value ?? ""}
                  onChange={(event) => {
                    setFieldValue("dataHoraInicial", event.target.value);
                  }}
                />
              )}
            </Field>
            {errors.dataHoraInicial && (
              <div className="text-red-500 text-sm mt-1">{errors.dataHoraInicial}</div>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="dataHoraFinal">Data Final</Label>
          <div className="relative">
            <Field id="dataHoraFinal" name="dataHoraFinal">
              {({ field }: any) => (
                <Input
                  type="datetime-local"
                  id="dataHoraFinal"
                  name="dataHoraFinal"
                  value={field.value ?? ""}
                  onChange={(event) => {
                    setFieldValue("dataHoraFinal", event.target.value)
                  }}
                />
              )}
            </Field>
            {errors.dataHoraFinal && (
              <div className="text-red-500 text-sm mt-1">{errors.dataHoraFinal}</div>
            )}
          </div>
        </div>
        <div>
          <Label>Duração</Label>
          <Label>{duracaoHoras ? `${duracaoHoras} horas` : '--'}</Label>
        </div>
        <div>
          <Label htmlFor="quantidadeConvidados">Quant. de convidados</Label>
          <Field id="quantidadeConvidados" name="quantidadeConvidados" >
            {({ field }: any) => (
              <Input
                type="text"
                value={field.value ?? ""}
                onChange={(event) => {
                  setFieldValue("quantidadeConvidados", event.target.value)
                }}
              />
            )}
          </Field>
          {errors.quantidadeConvidados && (
            <div className="text-red-500 text-sm mt-1">{errors.quantidadeConvidados}</div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        <div className="w-96">
          <Label htmlFor="observacoes"> Observações</Label>
          <Field id="observacoes" name="observacoes">
            {({ field }: any) => (
              <Input
                type="text"
                value={field.value ?? ""}
                onChange={(event) => {
                  setFieldValue("observacoes", event.target.value)
                }}
              />
            )}
          </Field>
          {errors.observacoes && (
            <div className="text-red-500 text-sm mt-1">{errors.observacoes}</div>
          )}
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
  )
}