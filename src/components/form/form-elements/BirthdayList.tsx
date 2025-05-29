/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useFormikContext } from "formik";
import BithdayModal from "../modals/BirthdayModal";
import { toast } from "react-toastify";

export interface BirthDayItem {
  id: number;
  nome: string,
  dataNascimento: string;
  tema: string
  idade: number;
  idadeNoEvento:number;
}


const BirthdayList =() => {
  const [birthdays, setBirthdays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBirthdays, setSelectedBirthdays] = useState([]);
  const { values, setFieldValue, errors} = useFormikContext<any>();


  useEffect(() => {
    setBirthdays(values.listaAniversariantes);
  }, [values]);

  const handleAddBirthday = (newItem: BirthDayItem) => {
    if (newItem.nome) {
      const newEntry = {
        ...newItem,
        id: newItem.id,
        idade: newItem.idade,
        idadeNoEvento: newItem.idadeNoEvento,
      }

      const allBirthdays = birthdays;

      allBirthdays.push(newEntry);
      setBirthdays(allBirthdays);
      setFieldValue("listaAniversariantes", allBirthdays)
      
      setIsModalOpen(false);
    } else {
      //!TODO Colocar toast
      toast.error("Preenchar os campos")
    }
  };

  const handleRemoveBirthday = () => {
    if (selectedBirthdays.length === 0) {
      alert("Selecione pelo menos um aniversariante para remover.");
      return;
    }

    const updatedBirthdays = birthdays.filter(
      (birthday) => !selectedBirthdays.includes(birthday.id)
    );

    setBirthdays(updatedBirthdays);
    setSelectedBirthdays([]);
  };

  const handleSelectBirthday = (id: any) => {
    setSelectedBirthdays((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <ComponentCard title="Aniversariantes">
      <div className="space-y-6">
        {/* Botões de ação e campo de busca */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="flex flex-wrap gap-2">

            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleRemoveBirthday}
            >
              Remover
            </button>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setIsModalOpen(true)}
            >
              Adicionar
            </button>
          </div>
        </div>

        {/* Tabela responsiva */}
        <div className="overflow-x-auto ">
          <table className="min-w-full border-collapse border rounded dark:border-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                  Sel
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                  Nome
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                  Nasc.
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                  Idade
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                  Idade Evento
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                  Tema
                </th>
              </tr>
            </thead>
            <tbody>
              {birthdays.length > 0 ? (
                birthdays
                  .map((birthday: any) => (
                    <tr key={birthday.id} className="bg-white dark:bg-gray-800">
                      <td className="px-10 py-3">
                        <input
                          type="checkbox"
                          checked={selectedBirthdays.includes(birthday.id)}
                          onChange={() => handleSelectBirthday(birthday.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.nome}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.dataNascimento}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.idade}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.idadeNoEvento}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.tema}
                      </td>

                      {/* <td className="dark:text-gray-200 border border-gray-300 px-2 py-1">
                        {birthday.tema}
                      </td> */}
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-4 text-sm text-gray-500 text-center dark:bg-white/[0.03] bg-gray-50"
                  >
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <BithdayModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleAddBirthday} />
        
      </div>
    </ComponentCard>
  );
};

export default BirthdayList;