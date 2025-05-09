/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { TablePlugin } from "@lexical/react/LexicalTablePlugin";
import { $generateNodesFromDOM } from "@lexical/html";
import { $getRoot } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { editorConfig } from "./editorConfig";
import { ToolbarPlugin } from "./ToolbarPlugin";
import { initialHtml } from "./initialHtml";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';



function PrepopulatedFromHtmlPlugin({ html }: any) {
    const [editor] = useLexicalComposerContext();
    const didInit = useRef(false);

    useEffect(() => {
        if (didInit.current) return;
        didInit.current = true;

        editor.update(() => {
            const dom = new DOMParser().parseFromString(html, "text/html");
            const nodes = $generateNodesFromDOM(editor, dom);
            const root = $getRoot();
            root.clear();
            root.append(...nodes);
            root.selectEnd();
        });
    }, [editor, html]);

    return null;
}

export default function ContractEditor() {
    return (
        <LexicalComposer initialConfig={editorConfig}>
            <ToolbarPlugin />
            <RichTextPlugin
                contentEditable={<ContentEditable className="border border-gray-300 rounded-md p-4 min-h-[600px] focus:outline-blue-500" />}
                placeholder={<span className="absolute left-4 top-4 text-gray-400 select-none">Digite o contrato…</span>}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <LinkPlugin />
            <ListPlugin />
            <TablePlugin hasHorizontalScroll />
            <PrepopulatedFromHtmlPlugin html={initialHtml} />
        </LexicalComposer>
    );
}
