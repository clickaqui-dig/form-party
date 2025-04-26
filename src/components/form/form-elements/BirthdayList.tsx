"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useFormikContext } from "formik";
import BithdayModal from "../modals/BirthdayModal";
import { Contract } from "@/app/(admin)/(others-pages)/(contract)/search-contract/page";

export interface BirthDayItem {
  name: string,
  date: string;
  tema: string
}

const BirthdayList = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBirthdays, setSelectedBirthdays] = useState([]);
  const { setFieldValue, values} = useFormikContext<Contract>();

  useEffect(() => {
    console.log("teste BithdayList ===>>>", values.cliente)
  }, [birthdays]);

  useEffect(() => {
    setFieldValue("listaAniversariantes", birthdays)
  }, [birthdays]);

  const handleAddBirthday = (newItem: BirthDayItem) => {
    if (newItem.name && newItem.date) {
      const currentYear = new Date().getFullYear();
      const birthYear = new Date(newItem.date).getFullYear();
      const idade = currentYear - birthYear;

      const newEntry = {
        ...newItem,
        id: Date.now(),
        age: idade,
        ageAtEvent: idade + 1,
      }
      setBirthdays((prev) => [...prev, newEntry]);

      setIsModalOpen(false);
    } else {
      alert("Preencha todos os campos!");
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
                  .map((birthday) => (
                    <tr key={birthday.id} className="bg-white dark:bg-gray-800">
                      <td className="px-10 py-3">
                        <input
                          type="checkbox"
                          checked={selectedBirthdays.includes(birthday.id)}
                          onChange={() => handleSelectBirthday(birthday.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.age}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.ageAtEvent}
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