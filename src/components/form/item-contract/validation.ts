import * as Yup from "yup";

export const validationSchemaItemContract = Yup.object().shape({
    descricao: Yup.string() .max(100, "A descrição não pode ter mais de 100 caracteres").min(5, "A descrição deve ter pelo menos 5 caracteres").required("A descrição é obrigatoria"),
    valor: Yup.number().required('Valor obrigatorio.').positive('A idade deve ser maior que zero')
});