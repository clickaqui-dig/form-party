import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: Yup
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres')
    .required('Senha é obrigatória'),
})
