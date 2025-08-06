import { TableCell, TableHeader, TableRow } from "@/components/ui/table"


export const ThemesTableHeader = () => {
    return (
        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
                <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                    Código
                </TableCell>
                <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                    Descrição
                </TableCell>
                <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                    Observações
                </TableCell>
                <TableCell
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                    Ações
                </TableCell>
            </TableRow>
        </TableHeader>
    )
}