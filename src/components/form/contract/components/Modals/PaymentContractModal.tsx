/* eslint-disable @typescript-eslint/no-explicit-any */
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { FC, useState } from "react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddItem: (item: { id: number, valor: string; meioPagamento: string, dataPagamentos: string, recebido: boolean, observacoes: string }) => void;
  }

export const PaymentsContractModal: FC<PaymentModalProps> = ({ isOpen, onClose, onAddItem }) => {
    const [formData, setFormData] = useState({
        id: 0,
        valor: '',
        meioPagamento: '',
        dataPagamento: '',
        recebido: false,
        observacoes: ''
    });

    if (!isOpen) return null;

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        onAddItem({
            id: Date.now(),
            valor: formData.valor,
            meioPagamento: formData.meioPagamento,
            dataPagamentos: formData.dataPagamento,
            recebido: formData.recebido,
            observacoes: formData.observacoes
        });
        setFormData({
            id: 0,
            valor: '',
            meioPagamento: '',
            dataPagamento: '',
            recebido: false,
            observacoes: ''
        });
        onClose();
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

                    <Input type="number"
                        name="valor"
                        value={formData.valor}
                        onChange={handleChange}
                        placeholder="Valor da parcela"
                    />
                </div>

                <div className="mb-4">
                    <Label >
                        Meio de pagamento <span className="text-red-500">*</span>
                    </Label>
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
