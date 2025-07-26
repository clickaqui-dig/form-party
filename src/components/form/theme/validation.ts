import * as Yup from "yup";


export const validationSchemaThema = Yup.object().shape({
    descricao: Yup.string().max(100).min(5).required("A descrição é obrigatoria"),
});