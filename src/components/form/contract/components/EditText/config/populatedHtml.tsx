/* eslint-disable @typescript-eslint/no-explicit-any */

import { $generateNodesFromDOM } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getRoot } from "lexical";
import { useEffect, useRef } from "react";

export const PrepopulatedFromHtmlPlugin = ({ html }: any) => {
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