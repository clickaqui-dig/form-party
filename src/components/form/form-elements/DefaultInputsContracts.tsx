"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { ChevronDownIcon } from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";
import BirthdayList from "./BirthdayList";
import TabsComponent from "./TabsComponent";

export default function DefaultInputsContracts() {
  const [showPassword, setShowPassword] = useState(false);
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
    console.log("Selected value:", value);
  };

  const countries = [
    { code: "BR", label: "+55" },
    { code: "GB", label: "+44" },
  ];

  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };

  return (
    <ComponentCard title="Formulário">
      <div className="space-y-6">

        {/* Primeira linha */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div>
            <Label>Código</Label>
            <Input type="text" disabled={true} />
          </div>
          <div>
            <Label>Situação</Label>
            <Label>Criado</Label>
          </div>
          <div>
            <Label>Valor Recebido</Label>
            <Label>R$1000,00</Label>
          </div>
          <div>
            <Label>Valor Pendente</Label>
            <Label>R$500,00</Label>
          </div>
          <div>
            <Label>Valor Total</Label>
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
            <Label>Cliente</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>E-mail</Label>
            <Input type="text" placeholder="info@gmail.com" />
          </div>
          <div>
            <Label>Celular</Label>
            <PhoneInput
              selectPosition="start"
              countries={countries}
              placeholder="+55 (11) 0000-0000"
              onChange={handlePhoneNumberChange}
            />
          </div>
          <div>
            <Label>CPF ou CNPJ</Label>
            <Input type="text" />
          </div>
        </div>

        {/* Terceira linha (CEP, Endereço, Número, Cidade, UF) */}
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
          <div>
            <Label>CEP</Label>
            <Input type="text" />
          </div>
          <div className="col-span-2">
            <Label>Endereço</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>Número</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>Cidade</Label>
            <Input type="text" />
          </div>
          <div>
            <Label>UF</Label>
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
            <Label>Tipo de Contrato</Label>
            <div className="relative">
              <Select
                options={optionsContract}
                placeholder="Tipo"
                onChange={handleSelectChange}
                className="dark:bg-dark-700"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon />
              </span>
            </div>
          </div>
          <div>
            <Label htmlFor="datePicker">Data Inicio</Label>
            <div className="relative">
              <Input
                type="datetime-local"
                id="datePicker"
                name="datePicker"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="datePicker">Data Final</Label>
            <div className="relative">
              <Input
                type="datetime-local"
                id="datePicker"
                name="datePicker"
                onChange={(e) => console.log(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Duração</Label>
            <Label>10 horas</Label>
          </div>
          <div>
            <Label className="">Quant. de convidados</Label>
            <Input type="text" />
          </div>

          <div className="max-w-full">
            <Label> Observações</Label>
            <Input type="text" onChange={(e)=>{console.log("testeeee digitação", e)}}/>
          </div>


        </div>

        <>
          <BirthdayList/>
        </>

        <>
          <TabsComponent/>
        </>



        {/* Botão Salvar */}
        <button
          onClick={() => { }}
          type="button"
          className="btn btn-success flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
        >
          Salvar
        </button>
      </div>
    </ComponentCard>
  );
}