/* eslint-disable @typescript-eslint/no-explicit-any */
interface Feriado {
    date: string;
    name: string;
    type: 'nacional' | 'estadual' | 'municipal';
}

export const fetchFeriadosNacionais = async (ano: number): Promise<Feriado[]> => {
    try {
        const response = await fetch(`https://brasilapi.com.br/api/feriados/v1/${ano}`);

        if (!response.ok) {
            throw new Error(`Erro ao buscar feriados nacionais: ${response.status}`);
        }

        const data = await response.json();

        return data.map((feriado: any) => ({
            date: feriado.date,
            name: feriado.name,
            type: 'nacional'
        }));
    } catch (error) {
        console.error("Erro ao buscar feriados nacionais:", error);
        return [];
    }
};

export const getFeriadosEstaduaisMunicipais = (ano: number): Feriado[] => {
    return [
        {
            date: `${ano}-07-09`,
            name: 'Revolução Contitucionalista de 1932',
            type: 'estadual'
        }, {
            date: `${ano}-08-15`,
            name: 'Dia da Padroeira de Jundiaí',
            type: 'municipal'
        },
        {
            date: `${ano}-06-19`,
            name: 'Corpus Christi',
            type: 'municipal'
        },
    ];
};


// export const loadFeriados = async () => {
//     const currentYear = new Date().getFullYear();

//     try {
//       const [nacionais, estaduais] = await Promise.all([
//         fetchFeriadosNacionais(currentYear),
//         getFeriadosEstaduaisMunicipais(currentYear),
//       ]);

//       const todosFeriados = [...nacionais, ...estaduais];
//       return todosFeriados;

//     } catch (error) {
//       console.error("Erro ao carregar feriados:", error);
//       return [];
//     }
//   };

