/* eslint-disable @typescript-eslint/no-explicit-any */

import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Select from '@/components/form/Select';
import { ChevronDownIcon } from '@/icons';
import { searchCep } from '@/services/viaCep/searchCep';
import { maskCEP, maskCNPJ, maskCPF, maskPhone } from '@/utils/masks';
import { Field, ErrorMessage, FieldProps, useFormikContext } from 'formik';

export const FormCustomer = () => {
    const { setFieldValue, setFieldError } = useFormikContext();
    const countries = [
        { code: "BR", label: "+55" },
    ];
    const options = [
        { value: "ac", label: "Acre" },
        { value: "al", label: "Alagoas" },
        { value: "ap", label: "Amapá" },
        { value: "am", label: "Amazonas" },
        { value: "ba", label: "Bahia" },
        { value: "ce", label: "Ceará" },
        { value: "df", label: "Distrito Federal" },
        { value: "es", label: "Espírito Santo" },
        { value: "go", label: "Goiás" },
        { value: "ma", label: "Maranhão" },
        { value: "mt", label: "Mato Grosso" },
        { value: "ms", label: "Mato Grosso do Sul" },
        { value: "mg", label: "Minas Gerais" },
        { value: "pa", label: "Pará" },
        { value: "pb", label: "Paraíba" },
        { value: "pr", label: "Paraná" },
        { value: "pe", label: "Pernambuco" },
        { value: "pi", label: "Piauí" },
        { value: "rj", label: "Rio de Janeiro" },
        { value: "rn", label: "Rio Grande do Norte" },
        { value: "rs", label: "Rio Grande do Sul" },
        { value: "ro", label: "Rondônia" },
        { value: "rr", label: "Roraima" },
        { value: "sc", label: "Santa Catarina" },
        { value: "sp", label: "São Paulo" },
        { value: "se", label: "Sergipe" },
        { value: "to", label: "Tocantins" },
    ];

    const handleChangeDocument = (e: any) => {
        const rawValue = e.target.value.replace(/\D/g, "");
        const maskedValue = rawValue.length <= 11 ? maskCPF(e.target.value) : maskCNPJ(e.target.value);
        setFieldValue("document", maskedValue);
    };

    const handleChangeCep = (e: any) => {
        const maskedValue = maskCEP(e.target.value);
        setFieldValue("cep", maskedValue);
        if (maskedValue.length === 9 ) {
            searchCepApi(maskedValue);
        }
    }

    const searchCepApi = async (value: any) => {
        try {
            const response: any = await searchCep(value);
            if (response === null || response.erro === 'true') {
                throw new Error('CEP não encontrado na API.')
            }
            setFieldValue("address", `${response.logradouro}`);
            setFieldValue("uf", response.uf.toLowerCase());
            console.log(response.uf.toLowerCase())
            setFieldValue("city", response.localidade);
        } catch (error) {
            setFieldError("cep", error ? String(error) : "")
            console.log(error);
        }
    }

    return (
        <div className = "space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                    <Label htmlFor="name">Nome ou Razão Social</Label>
                    <Field id="name" name="name" 
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                            />
                        )} />
                    <ErrorMessage name="name" component="div"  />
                </div>
                <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Field id="email" name="email"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="info@gmail.com"
                            />
                        )} />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <Label htmlFor="phone">Celular</Label>
                    <Field id="phone" name="phone" selectPosition="start" countries={countries}
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                placeholder="(11) 00000-0000"
                                onChange={(event: any) => {
                                    const phone = maskPhone(event.target.value);
                                    setFieldValue("phone", phone);
                                }}
                            />
                        )} />
                    <ErrorMessage name="phone" component="div" />
                </div>
                <div>
                    <Label htmlFor="document">CPF ou CNPJ</Label>
                    <Field id="document" name="document" 
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                onChange={handleChangeDocument}
                            />
                        )} />
                    <ErrorMessage name="document" component="div" />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
                <div>
                    <Label htmlFor="cep">CEP</Label>
                    <Field id="cep" name="cep"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                                onChange={handleChangeCep}
                            />
                        )} />
                    <ErrorMessage name="cep" component="div" />
                </div>
                <div className="col-span-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Field id="address" name="address"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                            />
                        )} />
                    <ErrorMessage name="address" component="div" />
                </div>
                <div>
                    <Label htmlFor="number">Número</Label>
                    <Field id="number" name="number"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                            />
                        )} />
                    <ErrorMessage name="number" component="div" />
                </div>
                <div>
                    <Label htmlFor="city">Cidade</Label>
                    <Field id="city" name="city"
                        render={({ field }: FieldProps) => (
                            <Input
                                {...field}
                                type="text"
                            />
                        )} />
                    <ErrorMessage name="city" component="div" />
                </div>
                <div>
                    <Label htmlFor="uf">UF</Label>
                    <Field id="uf" name="uf"
                        render={({ field }: FieldProps) => (
                            <Select
                                {...field}
                                options={options}
                                placeholder="Estado"
                                className="dark:bg-dark-900"
                            />
                        )} />
                    <div className='relative'>
                        <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 bottom-1/2 dark:text-gray-400">
                            <ChevronDownIcon />
                        </span>
                    </div>
                </div>
               
            </div>
        </div>
  
)
}