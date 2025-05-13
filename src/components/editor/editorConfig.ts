/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import {
  HeadingNode,
  QuoteNode,
} from "@lexical/rich-text";
import {TableNode, TableRowNode, TableCellNode} from "@lexical/table";

export const editorConfig = {
  namespace: "contract-editor",
  theme: {
    paragraph: "mb-2 text-base leading-relaxed text-justify",
    text: {
      bold: "font-semibold",
      italic: "italic",
      underline: "underline",
      strikethrough: "line-through",
    },
    table: "table-auto border-collapse w-full my-4",
    tableCellHeader: "border p-2 font-medium bg-gray-100",
    tableCell: "border p-2",
  },
  onError: (error: any) => {
    throw error;
  },
  nodes: [
   LinkNode,
    AutoLinkNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    TableNode,
    TableRowNode,
    TableCellNode,
  ],
};