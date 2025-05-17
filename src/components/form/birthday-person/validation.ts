import * as Yup from "yup";

export const validationSchemaBirthDayPerson = Yup.object().shape({
    nome: Yup.string().max(100).min(5).required("O nome deve ser passado."),
    dataNascimento: Yup.string().required('Data de nascimento é obrigatoria'),
    idade: Yup.number().required('Idade obrigatoria').positive('A idade deve ser maior que zero').integer('A idade deve ser um número inteiro'),
    idadeNoEvento: Yup.number().required('Idade obrigatoria').positive('A idade deve ser maior que zero').integer('A idade deve ser um número inteiro'),
  tema: Yup.string()
    .required('Escolha um tema.')
    .test(
      'not-empty',
      'Escolha um tema válido.',
      value => value !== undefined && value !== null && value !== ''
    )
});