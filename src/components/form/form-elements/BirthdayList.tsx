/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useFormikContext } from "formik";
import BithdayModal from "../modals/BirthdayModal";
import { toast } from "react-toastify";

export interface BirthDayItem {
  id: number;
  nomeAniversariante: string,
  idade: number;
  idadeNoEvento:number;
}


const BirthdayList =() => {
  const [birthdays, setBirthdays] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBirthdays, setSelectedBirthdays] = useState<any>([]);
  const { values, setFieldValue } = useFormikContext<any>();


  useEffect(() => {
    setBirthdays(values.aniversariantes);
  }, [values]);

  const handleAddBirthday = (newItem: BirthDayItem) => {
    if (newItem.nomeAniversariante) {
      const newEntry = {
        id: newItem.id,
        nomeAniversariante: newItem.nomeAniversariante,
        idade: newItem.idade,
        idadeNoEvento: newItem.idadeNoEvento,
      }

      const allBirthdays : any = birthdays;

      allBirthdays.push(newEntry);
      setBirthdays(allBirthdays);
      setFieldValue("aniversariantes", allBirthdays)
      
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
      (birthday : any) => !selectedBirthdays.includes(birthday.id)
    );

    setBirthdays(updatedBirthdays);
    setSelectedBirthdays([]);
  };

  const handleSelectBirthday = (id: any) => {
    setSelectedBirthdays((prev : any) =>
      prev.includes(id)
        ? prev.filter((selectedId : any) => selectedId !== id)
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
                  Idade
                </th>
              </tr>
            </thead>
            <tbody>
              {birthdays.length > 0 ? (
                birthdays
                  .map((birthday: any) => (
                    <tr key={birthday.id} className="bg-white dark:bg-gray-800">
                      <td className="px-10 py-3 text-center ">
                        <input
                          type="checkbox"
                          checked={selectedBirthdays.includes(birthday.id)}
                          onChange={() => handleSelectBirthday(birthday.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.nomeAniversariante}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.idade}
                      </td>
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