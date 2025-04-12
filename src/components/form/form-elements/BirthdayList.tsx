"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useFormikContext } from "formik";

const BirthdayList = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBirthday, setNewBirthday] = useState({ name: "", date: "", tema:""});
  const [selectedBirthdays, setSelectedBirthdays] = useState([]);
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue("birthdayList",birthdays)
  },[birthdays])
  const handleAddBirthday = () => {
    if (newBirthday.name && newBirthday.date) {
      const currentYear = new Date().getFullYear();
      const birthYear = new Date(newBirthday.date).getFullYear();
      const idade = currentYear - birthYear;

      const newEntry = {
        ...newBirthday,
        id: Date.now(),
        age: idade,
        ageAtEvent: idade + 1,
      }
      setBirthdays((prev) => [...prev, newEntry]);
     
      setNewBirthday({ name: "", date: "", tema:""});
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

  const handleSelectBirthday = (id :any) => {
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
              onClick={handleRemoveBirthday}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm flex items-center"
            >
              ✖ Remover
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm flex items-center"
            >
              ➕ Adicionar
            </button>
          </div>
        </div>

        {/* Tabela responsiva */}
        <div className="overflow-x-auto ">
          <table className="min-w-full border-collapse">
            <thead className="">
              <tr>
                <th className="dark:text-white border border-gray-300 px-2 py-1 text-left font-medium text-sm">
                  Sel
                </th>
                <th className="dark:text-white border border-gray-300 px-2 py-1 text-left font-medium text-sm">
                  Nome
                </th>
                <th className="dark:text-white border border-gray-300 px-2 py-1 text-left font-medium text-sm">
                  Nasc.
                </th>
                <th className="dark:text-white border border-gray-300 px-2 py-1 text-left font-medium text-sm">
                  Idade
                </th>
                <th className="dark:text-white border border-gray-300 px-2 py-1 text-left font-medium text-sm">
                  Idade Evento
                </th>
                <th className="dark:text-white border border-gray-300 px-2 py-1 text-left font-medium text-sm">
                  Tema
                </th> 
              </tr>
            </thead>
            <tbody className="text-sm">
              {birthdays.length > 0 ? (
                birthdays
                  .map((birthday) => (
                    <tr key={birthday.id}>
                      <td className="border border-gray-300 px-2 py-1">
                        <input
                          type="checkbox"
                          checked={selectedBirthdays.includes(birthday.id)}
                          onChange={() => handleSelectBirthday(birthday.id)}
                        />
                      </td>
                      <td className="dark:text-gray-200 border border-gray-300 px-2 py-1">
                        {birthday.name}
                      </td>
                      <td className="dark:text-gray-200 border border-gray-300 px-2 py-1">
                        {birthday.date}
                      </td>
                      <td className="dark:text-gray-200 border border-gray-300 px-2 py-1">
                        {birthday.age}
                      </td>
                      <td className="dark:text-gray-200 border border-gray-300 px-2 py-1">
                        {birthday.ageAtEvent}
                      </td>

                      <td className="dark:text-gray-200 border border-gray-300 px-2 py-1">
                        {birthday.tema}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-4 text-gray-500 border border-gray-300"
                  >
                    Nenhum registro encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <h2 className="text-lg font-bold text-gray-700 mb-4">Adicionar aniversariante</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome
                </label>
                <input
                  type="text"
                  value={newBirthday.name}
                  onChange={(e) =>
                    setNewBirthday({ ...newBirthday, name: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                  placeholder="Digite o nome"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  value={newBirthday.date}
                  onChange={(e) =>
                    setNewBirthday({ ...newBirthday, date: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tema
                </label>
                <input
                  type="text"
                  value={newBirthday.tema}
                  onChange={(e) =>
                    setNewBirthday({ ...newBirthday, tema: e.target.value })
                  }
                  className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-lg text-sm"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleAddBirthday}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ComponentCard>
  );
};

export default BirthdayList;