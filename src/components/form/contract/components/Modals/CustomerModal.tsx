import FormCustomer from "@/components/form/customer";
import { validationSchema } from "@/components/form/customer/validation";
import Label from "@/components/form/Label";
import { Modal } from "@/components/ui/modal";
import { mapFormToCustomer } from "@/models/Customer";
import { postCustomer } from "@/services/customer/postCustomer";
import { Form, Formik } from "formik";
import { FC } from "react";
import { toast } from "react-toastify";

const initialValues = {
    id: 0,
    nome: "",
    celular: "",
    email: "",
    dataCadastro: "",
    documento: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    state: true
};


interface CustomerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CustomerModal: FC<CustomerModalProps> = ({ isOpen, onClose }) => {

    if (!isOpen) return null;

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const payload = mapFormToCustomer(values);
            const response = await postCustomer(payload);
            console.log(response)
            if (response) {
                toast.success("Cliente cadastrado com sucesso !");
                onClose();
            } else {
                toast.error("Erro ao salvar cliente. Tente novamente.");
            }
        } catch (error) {
            toast.error("Ocorreu um erro. Verifique os dados e tente novamente.");
            console.error("Erro ao enviar formulário:", error);
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-[800px] p-6 lg:p-5"
        >
            <div className="flex items-center justify-between px-4 py-2 border-b">
                <Label className="text-2xl" >Adicionar cliente</Label>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
                validateOnMount={false}>
                {({ handleSubmit, validateForm, }) => {
                    const handleValidateAndSubmit = async () => {
                        const errors = await validateForm();

                        if (Object.keys(errors).length === 0) {
                            handleSubmit();
                        }
                          };
                    return (
                        <Form>
                            <div className="mt-4">
                                <FormCustomer />
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300 mr-2"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={handleValidateAndSubmit}
                                        type="button"
                                        className="btn btn-success btn-update-event flex w-full justify-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 sm:w-auto"
                                    >
                                        Salvar
                                    </button>
                                </div>
                            </div>
                             

                        </Form>
                    )
                }}
            </Formik>
        </Modal>
    )
}