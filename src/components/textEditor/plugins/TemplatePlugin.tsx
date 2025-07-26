'use client';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef } from 'react';
import { $isRootTextContentEmpty } from '@lexical/text';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot } from 'lexical';

interface TemplatePluginProps {
    initialTemplate: string;
}

export default function TemplatePlugin({ initialTemplate }: TemplatePluginProps) {
    const [editor] = useLexicalComposerContext();
    const done = useRef(false);

    useEffect(() => {
        if (done.current) return;
        done.current = true;

        editor.update(() => {
            if ($isRootTextContentEmpty(false)) {
                const dom = new DOMParser().parseFromString(initialTemplate, 'text/html');
                const nodes = $generateNodesFromDOM(editor, dom);
                const root = $getRoot();
                root.clear();
                root.append(...nodes);
            }
        });
    }, [editor, initialTemplate]);

    return null;
}
