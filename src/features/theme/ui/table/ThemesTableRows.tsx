import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { PencilIcon } from "@/icons";
import { Theme } from "../../types";
import Link from "next/link";

interface ThemesTableRowsProps {
    themes: Array<Theme> | undefined;
    actionFunction: (item: Theme) => void;
}

export const ThemesTableRows = ({ themes, actionFunction }: ThemesTableRowsProps) => {
    return (
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {themes && themes.map((theme, index) => (
                <TableRow key={index}>
                    <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {theme.id}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {theme.descricao}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {theme.observacoes}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-40 flex justify-stretch gap-4">
                        <Link href={``} onClick={() => actionFunction(theme)} >
                            <PencilIcon className="fill-gray-500 dark:fill-gray-400 hover:text-violet-600 text-[20px]" />
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>

    )
}