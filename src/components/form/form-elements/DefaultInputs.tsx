"use client";
import React from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";
import { ChevronDownIcon} from "../../../icons";
import PhoneInput from "../group-input/PhoneInput";

export default function DefaultInputs() {
  const options = [
    { value: "sp", label: "São Paulo" },
    { value: "mg", label: "Minas Gerais" },
    { value: "rj", label: "Rio de Janeiro" },
  ];
  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  const countries = [
    { code: "BR", label: "+55" },
    { code: "GB", label: "+44" },
    // { code: "CA", label: "+1" },
    // { code: "AU", label: "+61" },
  ];

  const handlePhoneNumberChange = (phoneNumber: string) => {
    console.log("Updated phone number:", phoneNumber);
  };

  return (
    <ComponentCard title="Formulário">
      <div className="space-y-6">
        {/* Primeira linha (Nome, Email, Celular, CPF/CNPJ) */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <Label>Nome ou Razão Social</Label>
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

        {/* Segunda linha (CEP, Endereço, Número, Complemento, Cidade, UF) */}
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

        {/* Botão de salvar */}
        <button
          onClick={() => {}}
          type="button"
          className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
        >
          Salvar
        </button>
      </div>
    </ComponentCard>
  );
}