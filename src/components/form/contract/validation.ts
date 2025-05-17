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

export const validationSchemaContract = Yup.object().shape({
    nomeCliente: Yup.string().max(100).min(5).required("O nome do perfil deve ser passado."),
    emailCliente: Yup.string().email('Email inválido').required('O email deve ser passado.'),
    celularCliente: Yup.string().required("Celular é obrigatorio"),
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
    endereco: Yup.string().required('O endereço deve ser passado.'),
    cidade: Yup.string().required('A cidade deve ser passado.'),
    numero: Yup.string().required('O Número deve ser passado.'),
    dataHoraInicial: Yup.string()
      .required('Data inicial é obrigatória')
      .test(
        'is-future-date',
        'A data não pode ser anterior à data atual',
        function(value) {
          if (!value) return true; // Deixe a validação required lidar com valores vazios
          const inputDate = new Date(value);
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const inputDateOnly = new Date(inputDate);
          inputDateOnly.setHours(0, 0, 0, 0);
          return inputDateOnly >= currentDate;
        }
      ),
    dataHoraFinal: Yup.string()
      .required('Informar data final.')
      .test(
        'is-not-more-than-one-day',
        'A data final não pode ser maior que um dia após a data inicial',
        function(value) {
          const { dataHoraInicial } = this.parent;
          if (!value || !dataHoraInicial) return true; // Deixe a validação required lidar com valores vazios
          
          const start = new Date(dataHoraInicial);
          const end = new Date(value);
          
          // Calcular a diferença em milissegundos
          const diffMs = end.getTime() - start.getTime();
          
          // Converter para dias (1 dia = 24 * 60 * 60 * 1000 ms)
          const diffDays = diffMs / (24 * 60 * 60 * 1000);
          
          return diffDays <= 1;
        }
      )
      .test(
        'is-after-start-date',
        'A data final deve ser posterior à data inicial',
        function(value) {
          const { dataHoraInicial } = this.parent;
          if (!value || !dataHoraInicial) return true;
          
          const start = new Date(dataHoraInicial);
          const end = new Date(value);
          
          return end > start;
        }
      ),
    quantidadeConvidados: Yup.number()
        .min(5,'Quantidade tem que ser maior que 5')
        .max(60,"Lotação maxima é 60 pessoas")
        .required("Quantidade de convidados deve ser informado."),
    // observacoes: Yup.string().required("Escreva uma observação"),
    
});