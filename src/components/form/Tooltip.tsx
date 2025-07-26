/* eslint-disable @typescript-eslint/no-explicit-any */
interface Event {
    id: string;
    title: string;
    situation: any;
    startTime: string;
    endTime: string;
}

interface TooltipProps {
    event: Event;
    children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, event }) => {
    return (
        <div className="group relative inline-block">
            <div
                className="
            absolute top-full left-1/2 mt-2   /* ↓ muda de bottom-full p/ top-full */
            -translate-x-1/2 scale-0 group-hover:scale-100
            transition-transform duration-150 z-[9999]
          "
            >
                <div className="relative w-64 rounded bg-gray-800 p-2 text-xs text-white shadow-lg">
                    <div
                        className="
                absolute -top-1 left-1/2           /* posição acima do balão */
                h-0 w-0 -translate-x-1/2 rotate-45
                border-x-4 border-t-4 border-b-0   /* só borda-t colorida */
                border-transparent border-t-gray-800
              "
                    />

                    <h2 className="mb-2 text-sm font-semibold">Dados do Evento</h2>
                    <ul className="text-xs font-medium">
                        <li className="flex items-center">
                            <b className="mr-1">Código:</b> <span>{event.id}</span>
                        </li>
                        <li className="flex items-center">
                            <b className="mr-1">Cliente:</b> <span>{event.title}</span>
                        </li>
                        <li className="flex items-center">
                            <b className="mr-1">Início:</b> <span>{event.startTime}</span>
                        </li>
                        <li className="flex items-center">
                            <b className="mr-1">Fim:</b> <span>{event.endTime}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* ALVO DO HOVER */}
            {children}
        </div>
    )
}

export default Tooltip;