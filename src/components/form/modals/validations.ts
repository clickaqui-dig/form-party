/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';

export const birthdayModalSchema = Yup.object().shape({
  nome: Yup.string()
    .required('O nome é obrigatório')
    .min(2, 'O nome deve ter pelo menos 2 caracteres'),
  
  idade: Yup.number()
    .required('A idade é obrigatória')
    .min(0, 'A idade não pode ser negativa'),
  
  idadeNoEvento: Yup.number()
    .required('A idade no evento é obrigatória')
    .min(0, 'A idade no evento não pode ser negativa'),
});

// Função auxiliar para validar o formulário
export const validateBirthdayForm = async (formData: any) => {
  try {
    await birthdayModalSchema.validate(formData, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      // Transformar erros do Yup em um objeto mais fácil de usar
      const errors: Record<string, string> = {};
      error.inner.forEach((err) => {
        if (err.path) {
          errors[err.path] = err.message;
        }
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { form: 'Erro de validação desconhecido' } };
  }
};