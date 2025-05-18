/* eslint-disable @typescript-eslint/no-explicit-any */
import Label from "@/components/form/Label";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback } from "react";
import jsPDF from 'jspdf';

export const OptionsEditComponent = () => {
    const [editor] = useLexicalComposerContext();


    const generatePdf = useCallback(async (html: string) => {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        wrapper.style.top = '0';
        wrapper.style.left = '0';
        wrapper.style.boxSizing = 'border-box';
        wrapper.style.pointerEvents = 'none';
        document.body.appendChild(wrapper);

        const pdf = new jsPDF({ format: 'a4', unit: 'px' });
        await pdf.html(wrapper, {
            margin: [20, 20, 20, 20],
            autoPaging: 'text',
            html2canvas: { 
                scale: 0.33, 
                useCORS: true,
                allowTaint: true,
                letterRendering: true,
            },
            x: 20,
            y: 20,
            
        }).then(() => {
            pdf.save(`Contrato-bolo-e-balao.pdf`);
            document.body.removeChild(wrapper);
        });
    }, []);

    const handleClick = () => {
        editor.getEditorState().read(() => {
            const html = $generateHtmlFromNodes(editor, null);
            generatePdf(html);
        });
    };
    return (
        <div className="mt-4">
            {/* Data de Geração */}
            <div className="flex flex-wrap gap-4 mb-4">
                <div className="w-full md:w-1/3">
                    <Label className=" dark:text-gray-200">
                        Data Geração
                    </Label>
                    <input
                        type="date"
                        className="dark:text-white w-full px-3 py-2 border rounded-md shadow-sm focus:border-green-500 focus:ring-green-500 text-sm"
                    />
                </div>
            </div>

            {/* Botões de Ações */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition" onClick={handleClick}>
                    📝 Gerar contrato
                </button>
                <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition">
                    📱 Compartilhar no WhatsApp
                </button>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contrato
                </label>
            </div>
        </div>
    );
}