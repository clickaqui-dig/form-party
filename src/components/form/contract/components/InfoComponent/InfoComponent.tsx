/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import { useConflict } from "@/hooks/useConflict";
import { getCustomerByName } from "@/services/customer/getCustomerbyName";
import { Field, useFormikContext } from "formik";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { ContractForm } from "@/models/Contract";
import { maskCurrency } from "@/utils/masks/maskCurrency";
import { putSituationById } from "@/services/contract/putUpdateSituation";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { resolve } from "path";

const optionsContract = [
    { value: "ANIVERSARIO", label: "Aniversário" },
];

export const InfoComponent = () => {
    const { setFieldValue, values, errors, setFieldError } = useFormikContext<ContractForm>();
    const [clientSuggestions, setClientSuggestions] = useState<any[]>([]);
    const conflictContract = useConflict(values);
    const router = useRouter();

    useEffect(() => {
        if (conflictContract.exists && values.idContrato === 0) {
            setFieldError(
                'dataHoraInicial',
                `Já existe contrato (${conflictContract.info.id}) nesse horário`
            );
            setFieldError(
                'dataHoraFinal',
                `Já existe contrato (${conflictContract.info.id}) nesse horário`
            );
        } else {
            setFieldError(
                'dataHoraInicial',
                undefined
            );
            setFieldError(
                'dataHoraFinal',
                undefined
            );
        }
    }, [conflictContract, setFieldError, values.idContrato])

    const valuePending = useMemo(() => {
        const result = Number(values.valorTotal) - Number(values.valorRecebido);
        const resultWithTwoCases = Number(result).toFixed(2);
        return maskCurrency(String(resultWithTwoCases));
    }, [values.valorRecebido, values.valorTotal]);

    const valueRecept = useMemo(() => {
        return maskCurrency(String(values.valorRecebido));
    }, [values.valorRecebido]);

    const valueTotal = useMemo(() => {
        return maskCurrency(String(values.valorTotal));
    }, [values.valorTotal])

    const handleCancelContract = async () => {
        try {
            await putSituationById(values.idContrato,'CANCELADO')
            router.push('/search-contract');
        } catch (error: any) {
            toast.error("Erro ao cancelar contrato.");
            console.error(error);

        }
       
        setFieldValue('situacao','CANCELADO')
    }

    const handleChangeQuery = (e: any) => {
        const value = e.target.value
        setFieldValue('nomeCliente', value);

        if (value.length >= 2) {
            fetchClients(value)
        }
    }

    const fetchClients = debounce(async (search: string, pageNum: number = 0) => {
        try {
            const pageSize = 10
            const response = await getCustomerByName(search, pageNum, pageSize);

            if (response) {
                setClientSuggestions(response.content);
            }

        } catch (error: any) {

            console.log(error)
        }
    }, 500);

    const handleClientSelect = (client: any) => {
        setFieldValue("cliente", client.id);
        setFieldValue("emailCliente", client.email);
        setFieldValue("celularCliente", client.celular);
        setFieldValue("documento", client.documento);
        setFieldValue("cep", client.cep);
        setFieldValue("endereco", client.endereco);
        setFieldValue("numero", client.numero);
        setFieldValue("cidade", client.cidade);
        setFieldValue("uf", client.uf);
        setClientSuggestions([]);
        setFieldValue('nomeCliente', client.nome);
    };

    const handleSelectChangeContract = (value: string) => {
        setFieldValue("tipoDoContrato", value)
    };

    const durationHours = useMemo(() => {
        const inicio = values.dataHoraInicial;
        const fim = values.dataHoraFinal;
        if (!inicio || !fim) return '';
        const ini = new Date(inicio);
        const fin = new Date(fim);
        if (isNaN(ini.getTime()) || isNaN(fin.getTime())) return '';
        const diffMs = fin.getTime() - ini.getTime();
        if (diffMs < 0) return '';
        const diffHrs = diffMs / (1000 * 60 * 60);
        return diffHrs.toLocaleString(undefined, { maximumFractionDigits: 2 });
    }, [values.dataHoraFinal, values.dataHoraInicial])

    return (
        <>
            {conflictContract.exists && values.idContrato === 0 && (
                <div className="bg-red-100 rounded p-2 mb-2 border border-red-300 text-red-700 text-sm">
                    Já existe um contrato cadastrado para o mesmo horário/dia:
                    <div className="mt-1 text-xs">
                        ID: {conflictContract.info.id} | Início: {conflictContract.info.dataHoraInicial}
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div>
                    <Label htmlFor="idForm">Código</Label>
                    <Field id="idContrato" name="idContrato">
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
                    <Label>{values.situacao}</Label>
                </div>
                <div>
                    <Label htmlFor="valorRecebido">Valor Recebido</Label>
                    <Label>{valueRecept}</Label>
                </div>
                <div>
                    <Label htmlFor="valorPendente">Valor Pendente</Label>
                    <Label>{valuePending}</Label>
                </div>
                <div>
                    <Label htmlFor="valorTotal">Valor Total</Label>
                    <Label>{valueTotal}</Label>
                </div>
                <div>
                    <button
                        type="button"
                        className="btn btn-danger flex w-full justify-center rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 sm:w-auto disabled:bg-gray-300 disabled:cursor-not-allowed "
                        disabled={values.idContrato === 0 || values.situacao === 'Cancelado' ? true : false}
                        onClick={() => {
                            handleCancelContract();
                        }}
                    >
                        Cancelar contrato
                    </button>
                </div>
            </div>

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
                        {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
                    </Field>
                </div>
                <div>
                    <Label htmlFor="celularCliente">Celular</Label>
                    <Field id="celularCliente" name="celularCliente">
                        {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
                    </Field>
                </div>
                <div>
                    <Label htmlFor="documento">CPF/CNPJ</Label>
                    <Field id="documento" name="documento">
                        {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
                    </Field>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Field id="cep" name="cep">
                        {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
                    </Field>
                </div>
                <div className="col-span-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Field id="endereco" name="endereco">
                        {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
                    </Field>
                </div>
                <div>
                    <Label htmlFor="numero">Número</Label>
                    <Field id="numero" name="numero">
                        {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
                    </Field>
                </div>
                <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Field id="cidade" name="cidade">
                        {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
                    </Field>
                </div>
                <div>
                    <Label htmlFor="uf">UF</Label>
                    <Field id="uf" name="uf">
                        {({ field }: any) => <Input {...field} type="text" value={field.value ?? ''} disabled />}
                    </Field>
                </div>
            </div>

            {/* quarta linha */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="tipoDoContrato">Tipo do Contrato</Label>
                    <div className="relative">
                        <Field id="tipoDoContrato" name="tipoDoContrato">
                            {({ field }: any) => (
                                <Select
                                    {...field}
                                    options={optionsContract}
                                    defaultValue="ANIVERSARIO"
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
                <div className="col-span-1">
                    <Label htmlFor="dataHoraInicial">Data Início</Label>
                    <div className="relative">
                        <Field id="dataHoraInicial" name="dataHoraInicial">
                            {({ field }: any) => (
                                <Input
                                    type="datetime-local"
                                    id="dataHoraInicial"
                                    name="dataHoraInicial"
                                    step={1800}
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
                <div className="col-span-1">
                    <Label htmlFor="dataHoraFinal">Data Final</Label>
                    <div className="relative">
                        <Field id="dataHoraFinal" name="dataHoraFinal">
                            {({ field }: any) => (
                                <Input
                                    type="datetime-local"
                                    id="dataHoraFinal"
                                    step={1800}
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
                    <Label>{durationHours ? `${durationHours} horas` : '--'}</Label>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
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
        </>
    )
}