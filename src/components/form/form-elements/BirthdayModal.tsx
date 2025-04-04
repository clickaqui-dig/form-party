import { Modal } from "@/components/ui/modal";
import React, { useState } from "react";
import Label from "../Label";
import Input from "../input/InputField";
import Select from "../Select";

const options = [
  { value: "Cartão", label: "Cartão" },
  { value: "Boleto", label: "Boleto" },
  { value: "Pix", label: "Pix" },
];

export default function BithdayModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    valor: '',
    meioPagamento: '',
    dataPagamento: '',
    recebido: false,
    observacoes: ''
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    setFormData({
      valor: '',
      meioPagamento: '',
      dataPagamento: '',
      recebido: false,
      observacoes: ''
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-[700px] p-6 lg:p-5"
    >
      <div className="flex items-center justify-between px-4 py-2 border-b">
        <Label className="text-2xl" >Adicionar pagamento</Label>
      </div>

      <form onSubmit={handleSubmit} className="p-4">
        <div className="mb-4">
          <Label>
            Valor (R$) <span className="text-red-500">*</span>
          </Label>
          {/* <input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            placeholder="Valor da parcela"
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          /> */}

          <Input type="number"
            name="valor"
            // value={formData.valor}
            onChange={handleChange}
            placeholder="Valor da parcela" 
            />
        </div>

        <div className="mb-4">
          <Label>
            Meio de pagamento <span className="text-red-500">*</span>
          </Label>

          <Select
                options={options}
                placeholder="Selecione uma opção"
                onChange={handleChange}
                className="dark:text-gray-400"
              />
          {/* <select
            name="meioPagamento"
            value={formData.meioPagamento}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          >
            <option value="">Selecione uma opção</option>
            <option value="Cartão">Cartão</option>
            <option value="Boleto">Boleto</option>
            <option value="Pix">Pix</option>
          </select> */}
        </div>

        <div className="mb-4">
          <Label>
            Data pagamento <span className="text-red-500">*</span>
          </Label>
          <input
            type="date"
            name="dataPagamento"
            value={formData.dataPagamento}
            onChange={handleChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <Label>Recebido?</Label>
          <div className="flex space-x-4">
            <Label >
              <input
                type="checkbox"
                name="recebido"
                checked={formData.recebido}
                onChange={handleChange}
                className="form-checkbox h-5 w-5 text-green-600"
              />
              <span className="ml-2 dark:text-gray-400">Sim</span>
            </Label>
          </div>
        </div>

        <div className="mb-4">
          <Label>Observações</Label>
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
            placeholder="Observações"
            className=" w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
            rows={3}
          ></textarea>
        </div>

        <p className="text-sm text-red-500">* Campos obrigatórios</p>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 mr-2"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
          >
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  );
}