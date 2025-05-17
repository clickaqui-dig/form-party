import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    $getSelection,
    $isRangeSelection,
} from "lexical";
import { $patchStyleText } from '@lexical/selection';
import {
    Bold,
    Italic,
    Underline,
    Strikethrough,
    AlignLeft,
    AlignCenter,
    AlignRight,
} from "lucide-react";

import { useCallback } from "react";
import { Button } from "./Button";

export function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();


    const applyStyle = useCallback(
        (styleObj: Record<string, string>) => {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $patchStyleText(selection, styleObj);
                }
            });
        },
        [editor],
      );

    return (
        <div className="flex flex-wrap items-center gap-1 border-b bg-gray-50 p-2">
            {/* --------- Inline styles --------- */}
            <Button
                size="icon"
                variant="ghost"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
            >
                <Bold className="h-4 w-4" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
            >
                <Italic className="h-4 w-4" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
            >
                <Underline className="h-4 w-4" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                onClick={() =>
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, "strikethrough")
                }
            >
                <Strikethrough className="h-4 w-4" />
            </Button>

            <span className="mx-2 h-4 w-px bg-gray-300" />

            {/* --------- Alignment --------- */}
            <Button
                size="icon"
                variant="ghost"
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
            >
                <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")}
            >
                <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
                size="icon"
                variant="ghost"
                onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")}
            >
                <AlignRight className="h-4 w-4" />
            </Button>

            <span className="mx-2 h-4 w-px bg-gray-300" />


            <select
                onChange={(e) => applyStyle({ "font-size": e.target.value })}
                className="ml-2 h-7 rounded border px-1 text-sm"
                defaultValue=""
            >
                <option disabled value="">
                    Tamanho
                </option>
                {["12px", "14px", "16px", "18px", "24px", "32px"].map((v) => (
                    <option key={v} value={v}>
                        {v.replace("px", "")}
                    </option>
                ))}
            </select>

            <select
                onChange={(e) => applyStyle({ color: e.target.value })}
                className="ml-2 h-7 rounded border px-1 text-sm"
                defaultValue=""
            >
                <option disabled value="">
                    Cor
                </option>
                {["black", "red", "blue", "green"].map((c) => (
                    <option key={c} value={c}>
                        {c.charAt(0).toUpperCase() + c.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
}
