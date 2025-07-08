/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import { useFormikContext } from "formik";
import { toast } from "react-toastify";
import ThemeModal from "../modals/ThemeModal";

export interface ThemeListItem {
  id: number;
  observacoes: string,
  descricao: string;
}


const ThemeList =() => {
  const [thema, setThema] = useState<any>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<any>([]);
  const { values, setFieldValue } = useFormikContext<any>();


  useEffect(() => {
    setThema(values.temas);
  }, [values]);

  const handleAddThema = (newItem: ThemeListItem) => {
    if (newItem.descricao) {
      const newEntry = {
        id: newItem.id,
        descricao: newItem.descricao,
        observacoes: newItem.observacoes,
      }

      const allThema : any = thema;

      allThema.push(newEntry);
      setThema(allThema);
      setFieldValue("temas", allThema)
      
      setIsModalOpen(false);
    } else {
      //!TODO Colocar toast
      toast.error("Preenchar os campos")
    }
  };

  const handleRemoveThema = () => {
    if (selectedTheme.length === 0) {
      alert("Selecione pelo menos um tema para remover.");
      return;
    }

    const updatedThema = thema.filter(
      (birthday : any) => !selectedTheme.includes(birthday.id)
    );

    setThema(updatedThema);
    setSelectedTheme([]);
  };

  const handleSelectBirthday = (id: any) => {
    setSelectedTheme((prev : any) =>
      prev.includes(id)
        ? prev.filter((selectedId : any) => selectedId !== id)
        : [...prev, id]
    );
  };

  return (
    <ComponentCard title="Tema">
      <div className="space-y-6">
        {/* Botões de ação e campo de busca */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <div className="flex flex-wrap gap-2">

            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={handleRemoveThema}
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
                  Descricao
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium dark:text-white text-gray-500 uppercase tracking-wider">
                  Observação
                </th>
              </tr>
            </thead>
            <tbody>
              {thema.length > 0 ? (
                thema
                  .map((birthday: any) => (
                    <tr key={birthday.id} className="bg-white dark:bg-gray-800">
                      <td className="px-10 py-3 text-center ">
                        <input
                          type="checkbox"
                          checked={selectedTheme.includes(birthday.id)}
                          onChange={() => handleSelectBirthday(birthday.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.descricao}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500 dark:text-gray-300/80">
                        {birthday.observacoes}
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
        <ThemeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddItem={handleAddThema} />
        
      </div>
    </ComponentCard>
  );
};

export default ThemeList;