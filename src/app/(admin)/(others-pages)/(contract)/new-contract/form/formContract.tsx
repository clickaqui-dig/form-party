/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Label from '@/components/form/Label';
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import { ChevronDownIcon } from '@/icons';
import PhoneInput from "@/components/form/group-input/PhoneInput";
import BirthdayList from "@/components/form/form-elements/BirthdayList";
import TabsComponent from "@/components/form/form-elements/TabsComponent";
import { useFormikContext } from "formik";

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
        setFieldValue("contractType", value)
        console.log("Selected value:", value);
    };

    const countries = [
        { code: "BR", label: "+55" },
        { code: "GB", label: "+44" },
    ];

    const handlePhoneNumberChange = (phoneNumber: string) => {
        setFieldValue("cellphone", phoneNumber)
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
                    <Label htmlFor="client">Cliente</Label>
                    <Input type="text"
                        onChange={(event) => {
                            setFieldValue("client", event.target.value)
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        type="text"
                        placeholder="info@gmail.com"
                        onChange={(event) => {
                            setFieldValue("email", event.target.value)
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="cellphone">Celular</Label>
                    <PhoneInput
                        selectPosition="start"
                        countries={countries}
                        placeholder="+55 (11) 0000-0000"
                        onChange={handlePhoneNumberChange}
                    />
                </div>
                <div>
                    <Label htmlFor="cpfCpj">CPF ou CNPJ</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("cpfCpj", event.target.value)
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
                    <Label htmlFor="address">Endereço</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("address", event.target.value)
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="numberAddress">Número</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("numberAddress", event.target.value)
                        }}
                    />
                </div>
                <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("city", event.target.value)
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
                    <Label htmlFor="contractType">Tipo de Contrato</Label>
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
                    <Label htmlFor="initialDate">Data Inicio</Label>
                    <div className="relative">
                        <Input
                            type="datetime-local"
                            id="initialDate"
                            name="initialDate"
                            onChange={(event) => {
                                setFieldValue("initialDate", event.target.value)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <Label htmlFor="finalDate">Data Final</Label>
                    <div className="relative">
                        <Input
                            type="datetime-local"
                            id="finalDate"
                            name="finalDate"
                            onChange={(event) => {
                                setFieldValue("finalDate", event.target.value)
                            }}
                        />
                    </div>
                </div>
                <div>
                    <Label>Duração</Label>
                    <Label>10 horas</Label>
                </div>
                <div>
                    <Label htmlFor="quantityGuest">Quant. de convidados</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("quantityGuest", event.target.value)
                        }}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div className="w-96">
                    <Label htmlFor="quantityGuest"> Observações</Label>
                    <Input
                        type="text"
                        onChange={(event) => {
                            setFieldValue("quantityGuest", event.target.value)
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