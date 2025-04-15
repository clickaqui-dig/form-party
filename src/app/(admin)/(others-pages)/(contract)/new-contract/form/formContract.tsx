/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Label from '@/components/form/Label';
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from '@/icons';
import PhoneInput from "@/components/form/group-input/PhoneInput";
import BirthdayList from "@/components/form/form-elements/BirthdayList";
import TabsComponent from "@/components/form/form-elements/TabsComponent";
import { ErrorMessage, Field, FieldProps, useFormikContext } from "formik";

export const FormContract = () => {
    const { setFieldValue, setFieldError } = useFormikContext();
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
    const handleSelectChange = (value: string) => {
        setFieldValue("uf", value)
        console.log("Selected value:", value);
    };
    const handleSelectChangeContract = (value: string) => {
        setFieldValue("tiposDeContrato", value)
        console.log("Selected value:", value);
    };

    const countries = [
        { code: "BR", label: "+55" },
        { code: "GB", label: "+44" },
    ];

    const handlePhoneNumberChange = (phoneNumber: string) => {
        setFieldValue("celularCliente", phoneNumber)
        console.log("Updated phone number:", phoneNumber);
    };

    return (
        <div className="space-y-6">

            {/* Primeira linha */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div>
                    <Label htmlFor="id">Código</Label>
                    <Input type="text" disabled={true} />
                </div>
                <div>
                    <Label htmlFor="situation">Situação</Label>
                    <Label>Criado</Label>
                </div>
                <div>
                    <Label htmlFor="receiveValue" >Valor Recebido</Label>
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
                        onClick={() => { }}
                        type="button"
                        className="btn btn-danger flex w-full justify-center rounded-lg bg-red-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-600 sm:w-auto"
                    >
                        Cancelar contrato
                    </button>
                </div>
            </div>

            {/* Segunda linha (Cliente, E-mail, Celular, CPF/CNPJ) */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="cliente">Cliente</Label>
                    <Field id="cliente" name="cliente"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                            />
                        )} />
                    <ErrorMessage name="cliente" component="div" />
                </div>
                <div>
                    <Label htmlFor="emailCliente">E-mail</Label>
                    <Field id="emailCliente" name="emailCliente"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="info@gmail.com"
                            />
                        )}
                    />
                    <ErrorMessage name="emailCliente" component="div" />
                </div>
                <div>
                    <Label htmlFor="celularCliente">Celular</Label>
                    <PhoneInput
                        selectPosition="start"
                        countries={countries}
                        placeholder="+55 (11) 0000-0000"
                        onChange={handlePhoneNumberChange}
                    />
                </div>
                <div>
                    <Label htmlFor="documento">CPF ou CNPJ</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("documento", event.target.value)
                        }}
                    />
                </div>
            </div>

            {/* Terceira linha (CEP, Endereço, Número, Cidade, UF) */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("cep", event.target.value)
                        }}
                    />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("endereco", event.target.value)
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="numero">Número</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("numero", event.target.value)
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("cidade", event.target.value)
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="uf">UF</Label>
                    <div className="relative">
                        <Select
                            options={options}
                            placeholder="Estado"
                            onChange={handleSelectChange}
                            className="dark:bg-dark-900"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                        </span>
                    </div>
                </div>
            </div>

            {/* quarta linha */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div>
                    <Label htmlFor="tiposDeContrato">Tipo de Contrato</Label>
                    <div className="relative">
                        <Select
                            options={optionsContract}
                            placeholder="Tipo"
                            onChange={handleSelectChangeContract}
                            className="dark:bg-dark-700"
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                        </span>
                    </div>
                </div>
                <div>
                    <Label htmlFor="dataHoraInicial">Data Inicio</Label>
                    <div className="relative">
                        <Input
                            type="datetime-local"
                            id="dataHoraInicial"
                            name="dataHoraInicial"
                            onChange={(event) => {
                                setFieldValue("dataHoraInicial", event.target.value)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="dataHoraFinal">Data Final</Label>
                    <div className="relative">
                        <Input
                            type="datetime-local"
                            id="dataHoraFinal"
                            name="dataHoraFinal"
                            onChange={(event) => {
                                setFieldValue("dataHoraFinal", event.target.value)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <Label>Duração</Label>
                    <Label>10 horas</Label>
                </div>
                <div>
                    <Label htmlFor="quantidadeConvidados">Quant. de convidados</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("quantidadeConvidados", event.target.value)
                        }}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="w-96">
                    <Label htmlFor="observacoes"> Observações</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("observacoes", event.target.value)
                        }}
                    />
                </div>
            </div>





            <>
                <BirthdayList />
            </>

            <>
                <TabsComponent />
            </>
        </div>
    );
}