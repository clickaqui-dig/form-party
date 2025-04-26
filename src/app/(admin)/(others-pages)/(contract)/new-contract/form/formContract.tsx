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


                    <Field id="celularCliente" name="celularCliente" selectPosition="start" countries={countries}
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="(11) 00000-0000"
                                onChange={(event) => {
                                    setFieldValue("celularCliente", event.target.value)
                                    console.log("Updated phone number:", event.target.value);
                                }}
                            />
                        )} />
                    <ErrorMessage name="celularCliente" component="div" />
                </div>
                <div>
                    <Label htmlFor="documento">CPF ou CNPJ</Label>


                    <Field id="documento" name="documento"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("documento", event.target.value)
                                }}
                            />
                        )} />
                    <ErrorMessage name="documento" component="div" />
                </div>
            </div>

            {/* Terceira linha (CEP, Endereço, Número, Cidade, UF) */}
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div>
                    <Label htmlFor="cep">CEP</Label>

                    <Field id="cep" name="cep"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("cep", event.target.value)
                                }}
                            />
                        )} />
                    <ErrorMessage name="cep" component="div" />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="endereco">Endereço</Label>

                    <Field id="endereco" name="endereco"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("endereco", event.target.value)
                                }}
                            />
                        )} />
                    <ErrorMessage name="endereco" component="div" />
                </div>
                <div>
                    <Label htmlFor="numero">Número</Label>
                    <Field id="numero" name="numero"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("numero", event.target.value)
                                }}
                            />
                        )} />
                    <ErrorMessage name="numero" component="div" />
                </div>
                <div>
                    <Label htmlFor="cidade">Cidade</Label>
                    <Field id="cidade" name="cidade"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("cidade", event.target.value)
                                }}
                            />
                        )} />
                    <ErrorMessage name="cidade" component="div" />
                </div>
                <div>
                    <Label htmlFor="uf">UF</Label>
                    <div className="relative">
                        <Field id="uf" name="uf"
                            render={({ field }: FieldProps) => (
                                <Select
                                    {...field}
                                    options={options}
                                    placeholder="Estado"
                                    onChange={(event)=>{
                                        console.log("uf ====",event)
                                        setFieldValue("uf", event)
                                    }}
                                    className="dark:bg-dark-900"
                                />
                            )} />
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
                        <Field id="uf" name="uf"
                            render={({ field }: FieldProps) => (
                                <Select
                                    {...field}
                                    options={optionsContract}
                                    placeholder="Tipo"
                                    onChange={handleSelectChangeContract}
                                    className="dark:bg-dark-700"
                                />
                            )}
                        />
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                        </span>
                    </div>
                </div>
                <div>
                    <Label htmlFor="dataHoraInicial">Data Inicio</Label>
                    <div className="relative">
                        <Field id="city" name="city"
                            render={({ field }: FieldProps) => (
                                <Input
                                    type="datetime-local"
                                    id="dataHoraInicial"
                                    name="dataHoraInicial"
                                    onChange={(event) => {
                                        setFieldValue("dataHoraInicial", event.target.value)
                                    }}
                                />
                            )} />
                        <ErrorMessage name="city" component="div" />
                    </div>
                </div>
                <div>
                    <Label htmlFor="dataHoraFinal">Data Final</Label>
                    <div className="relative">
                        <Field id="city" name="city"
                            render={({ field }: FieldProps) => (
                                <Input
                                    type="datetime-local"
                                    id="dataHoraFinal"
                                    name="dataHoraFinal"
                                    onChange={(event) => {
                                        setFieldValue("dataHoraFinal", event.target.value)
                                    }}
                                />
                            )} />
                        <ErrorMessage name="dataHoraFinal" component="div" />
                    </div>
                </div>
                <div>
                    <Label>Duração</Label>
                    <Label>10 horas</Label>
                </div>
                <div>
                    <Label htmlFor="quantidadeConvidados">Quant. de convidados</Label>
                    <Field id="quantidadeConvidados" name="quantidadeConvidados"
                        render={({ field }: FieldProps) => (
                            <Input
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("quantidadeConvidados", event.target.value)
                                }}
                            />
                        )} />
                    <ErrorMessage name="quantidadeConvidados" component="div" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="w-96">
                    <Label htmlFor="observacoes"> Observações</Label>

                    <Field id="observacoes" name="observacoes"
                        render={({ field }: FieldProps) => (
                            <Input
                                type="text"
                                onChange={(event) => {
                                    setFieldValue("observacoes", event.target.value)
                                }}
                            />

                        )}
                    />
                    <ErrorMessage name="quantidadeConvidados" component="div" />
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