import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import { PencilIcon } from "@/icons";
import { maskCurrencyFromUnits } from "@/utils/masks/maskCurrencyFromUnits";
import Link from "next/link";
import { ItemContract } from "../../types";

interface ItemContractRowsProps {
  itemsContract: Array<ItemContract> | undefined;
  actionFunction: (item: ItemContract) => void;
}

export const ItemContractRows = ({
  itemsContract,
  actionFunction
}: ItemContractRowsProps) => {
  return (
    <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
      {itemsContract && itemsContract.map((item, index) => (
        <TableRow key={index}>
            <TableCell className="px-5 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                {item.id}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                {item.descricao}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                {maskCurrencyFromUnits(item.valor)}
            </TableCell>
            <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-40 flex justify-stretch gap-4">
                <Link href={``} onClick={() => actionFunction(item)} >
                    <PencilIcon className="fill-gray-500 dark:fill-gray-400 hover:text-violet-600 text-[20px]" />
                </Link>
            </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}
