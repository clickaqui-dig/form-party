/* eslint-disable @typescript-eslint/no-explicit-any */
import Label from "@/components/form/Label";
import { $generateHtmlFromNodes } from "@lexical/html";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useCallback, useEffect, useState } from "react";
import jsPDF from 'jspdf';
import { useFormikContext } from "formik";
import { sendMessageWhatsapp } from "@/services/whatsapp/whatsappApi";

const marginX = 20;

function useLogo() {
    const [logo, setLogo] = useState<string | null>(null);
    useEffect(() => {
        fetch('/_next/image?url=%2Fimages%2Flogo%2Fbolo-balao.png&w=256&q=75')
            .then(r => r.blob())
            .then(blob => {
                const fr = new FileReader();
                fr.onloadend = () => setLogo(fr.result as string);
                fr.readAsDataURL(blob);
            });
    }, []);
    return logo;
}

interface OptionsEditComponentProps {
    id: string;
    nameDoc: string;
}

export const OptionsEditComponent = ({ id, nameDoc }: OptionsEditComponentProps) => {
    const [editor] = useLexicalComposerContext();
    const logo = useLogo();
    const { values } = useFormikContext<any>();

    const handleExport = useCallback(async () => {
        const html = await editor.getEditorState().read(() =>
            $generateHtmlFromNodes(editor, null)
        );

        const doc = new jsPDF({ unit: 'pt', format: 'a4' });

        const PAGE_PX = { w: 794, h: 1123 };     // A4 em 96 dpi

        const newHtml = `
            <div style="width:${PAGE_PX.w}px;box-sizing:border-box;">
                ${html}
            </div>
            `;
        await doc.html(newHtml, {
            margin: [70, 30, 30, 50],
            autoPaging: 'text',

            html2canvas: {
                scale: 0.63, windowWidth: PAGE_PX.w,
                windowHeight: PAGE_PX.h
            }
        });
        const total = doc.getNumberOfPages();
        const { width, height } = doc.internal.pageSize;

        for (let i = 1; i <= total; i++) {
            doc.setPage(i);

            if (logo) doc.addImage(logo, 'PNG', marginX, 12, 130, 65);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(12);
            doc.text(`Evento #${id}`, width / 2, 50, { align: 'center' });
            doc.setFontSize(10);
            doc.text(
                "BOLO E BALAO BUFFET INFANTIL",
                width - marginX,
                50,
                { align: 'right' }
            );

            doc.setFont("helvetica", "normal");
            doc.text(`Página ${i} `, width / 2, height - 10, {
                align: 'center'
            });
            doc.text(new Date().toLocaleDateString('pt-BR'),
                width - marginX,
                height - 8,
                { align: 'right' })
        }

        doc.save(`Contrato_${id}_${nameDoc}.pdf`);
    }, [editor, id, logo, nameDoc]);

    const handleSendWhatsapp = () => {
        sendMessageWhatsapp(values);
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
                <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition" onClick={handleExport}>
                    📝 Baixar contrato
                </button>
                <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition" onClick={handleSendWhatsapp}>
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