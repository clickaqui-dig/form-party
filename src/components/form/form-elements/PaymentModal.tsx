import { Modal } from "@/components/ui/modal";
import React, { useState } from "react";

export default function PaymentModal({ isOpen, onClose }) {
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

  const handleSubmit = (e) => {
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
    className="max-w-[700px] p-6 lg:p-10"
  >
    {/* // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"> */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-auto">
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <h2 className="text-xl font-bold">Adicionar pagamento</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            ✖
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Valor (R$) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder="Valor da parcela"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Meio de pagamento <span className="text-red-500">*</span>
            </label>
            <select
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
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Data pagamento <span className="text-red-500">*</span>
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Recebido?</label>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="recebido"
                  checked={formData.recebido}
                  onChange={handleChange}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
                <span className="ml-2 text-gray-700">Sim</span>
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Observações</label>
            <textarea
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              placeholder="Observações"
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
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
      </div>
    {/* // </div> */}
    </Modal>
  );
}