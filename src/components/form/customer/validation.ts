import * as Yup from "yup";

function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++)
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
}

function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) return false;
  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  const digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;

  tamanho++;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
}

export const validationSchema = Yup.object().shape({
    nome: Yup.string().max(100).min(5).required("O nome do perfil deve ser passado."),
    email: Yup.string().email('Email inválido').required('O email deve ser passado.'),
    celular: Yup.string().required(),
    documento: Yup.string().required('CPF/CNPJ é obrigatório')
    .test('cpfCnpj-valido', 'CPF/CNPJ inválido', function (value) {
      if (!value) return false;
      const cpfCnpj = value.replace(/[^\d]+/g, '');
      return (
        (cpfCnpj.length === 11 && validarCPF(cpfCnpj)) ||
        (cpfCnpj.length === 14 && validarCNPJ(cpfCnpj))
      );
    }),
    cep: Yup.string().required('O CEP deve ser passado.'),
    endereco: Yup.string(),
    cidade: Yup.string(),
    numero: Yup.string().required('O Número deve ser passado.'),
});