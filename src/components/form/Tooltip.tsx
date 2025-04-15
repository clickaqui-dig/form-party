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
        <div className="group relative flex max-w-max flex-col items-center z-1000">
            <div className="
            
        absolute 
        bottom-full
        left-1/2 
        mb-2 
        min-w-max 
        -translate-x-1/2 
        scale-0 
        transform 
        rounded-lg 
        px-3 
        py-2 
        text-xs 
        font-medium 
        transition-all 
        duration-500 
        group-hover:scale-100
      ">
                <div className="relative max-w-xs flex flex-col  rounded bg-gray-800 p-2 text-center text-white shadow-lg  w-64">

                    <div className="
  absolute 
  top-full 
  left-1/2 
  h-0 
  w-0 
  -translate-x-1/2 
  border-x-4 
  border-b-4 
  border-t-0 
  border-transparent 
  border-b-gray-800
  transform 
  rotate-45
" />

                    <h2 className="mb-2 text-sm font-semibold">Dados do Evento</h2>
                    <ul className="text-xs font-medium">
                        <li className="flex flex-row items-center justify-start">
                            <b className="mr-1">Código:</b>
                            <p className="py-1">{event.id}</p>
                        </li>
                        <li className="flex flex-row items-center justify-start">
                            <b className="mr-1">Situação:</b>
                            <p className="py-1">{event.situation}</p>
                        </li>
                        <li className="flex flex-row items-center justify-start">
                            <b className="mr-1">Cliente:</b>
                            <p className="py-1">{event.title}</p>
                        </li>
                        <li className="flex flex-row items-center justify-start">
                            <b className="mr-1">Início:</b>
                            <p className="py-1">{event.startTime}</p>
                        </li>
                        <li className="flex flex-row items-center justify-start">
                            <b className="mr-1">Fim:</b>
                            <p className="py-1">{event.endTime}</p>
                        </li>
                    </ul>

                </div>
            </div>

            {children}

        </div>
    )
}

export default Tooltip;