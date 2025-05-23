/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  EventInput,
  EventClickArg,
  EventContentArg,
} from "@fullcalendar/core";
import Tooltip from "../form/Tooltip";
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import { useRouter } from "next/navigation";
import { getCalendar } from "@/services/contract/getCalendar";
import { fetchFeriadosNacionais, getFeriadosEstaduaisMunicipais, loadFeriados } from "@/services/calendar/getHolidays";

interface CalendarEvent extends EventInput {
  extendedProps: {
    situacao: string;
    nomeCliente: string;
    valorTotal: number;
    valorRecebido: number;
    valorPendente: number;
    calendar: string;
    isFeriado?: boolean;
    tipoFeriado?: string;
  };
}

// Interface para os feriados
interface Feriado {
  date: string;
  name: string;
  type: 'nacional' | 'estadual' | 'municipal';
}

const Calendar: React.FC = () => {
  const router = useRouter();

  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [page, setPage] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [feriados, setFeriados] = useState<Feriado[]>([]);

  const calendarRef = useRef<FullCalendar>(null);

  const loadFeriados = async () => {
    const currentYear = new Date().getFullYear();

    try {
      const [nacionais, estaduais] = await Promise.all([
        fetchFeriadosNacionais(currentYear),
        getFeriadosEstaduaisMunicipais(currentYear),
      ]);

      const todosFeriados = [...nacionais, ...estaduais,];
      setFeriados(todosFeriados);

      const feriadosEvents: CalendarEvent[] = todosFeriados.map((feriado) => ({
        id: `feriado-${feriado.date}-${feriado.type}`,
        title: feriado.name,
        start: feriado.date,
        allDay: true,
        display: 'background',
        backgroundColor: getFeriadoColor(feriado.type),
        extendedProps: {
          situacao: 'Feriado',
          nomeCliente: '',
          valorTotal: 0,
          valorRecebido: 0,
          valorPendente: 0,
          calendar: 'Feriado',
          isFeriado: true,
          tipoFeriado: feriado.type
        },
      }));

      return feriadosEvents;
    } catch (error) {
      console.error("Erro ao carregar feriados:", error);
      return [];
    }
  };

  // Função para definir cores diferentes para cada tipo de feriado
  const getFeriadoColor = (tipo: string): string => {
    switch (tipo) {
      case 'nacional':
        return 'rgba(255, 0, 0, 0.2)'; // Vermelho transparente
      case 'estadual':
        return 'rgba(0, 0, 255, 0.2)'; // Azul transparente
      case 'municipal':
        return 'rgba(0, 128, 0, 0.2)'; // Verde transparente
      default:
        return 'rgba(128, 128, 128, 0.2)'; // Cinza transparente
    }
  };

  const fetchCalendar = useCallback(
    async () => {
      try {
        // Carrega os feriados de APIs externas
        const feriadosEvents = await loadFeriados();

        // Carrega os eventos normais
        const response = await getCalendar({ page: 0, size: 50 });
        const paginated = response;
        const responseEvents: CalendarEvent[] = paginated.content.filter((item: any) => item.situacao !== 'CANCELADO').map((item: any) => ({
          id: item.id,
          title: item.nomeCliente,
          start: item.dataHoraInicial,
          end: item.dataHoraFinal,
          extendedProps: {
            situacao: item.situacao,
            nomeCliente: item.nomeCliente,
            valorTotal: item.valorTotal,
            valorRecebido: item.valorRecebido,
            valorPendente: item.valorPendente,
            calendar: handleSituation(item),
          },
        }));

        // Combina os eventos normais com os feriados
        setEvents([...responseEvents, ...feriadosEvents]);
        setPage(paginated.number);
        setLastPage(paginated.last ?? false);
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const handleSituation = (item: any) => {
    if (item.valorTotal === item.valorRecebido) {
      return "Success"
    } else if (item.valorRecebido === 0 && item.valorPendente === 0) {
      return "Primary"
    } else {
      return "Danger"
    }
  }

  useEffect(() => {
    fetchCalendar();
  }, [fetchCalendar]);


  const handleEventClick = (clickInfo: EventClickArg) => {
    const event = clickInfo.event;
    // Não navegar para edição se for um feriado
    if (event.extendedProps.isFeriado) {
      return;
    }
    router.push(`/edit-contract/${event.id}`)
  };


  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="custom-calendar">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "",
          }}
          locale={ptBrLocale}
          events={events}
          selectable={true}
          eventClick={handleEventClick}
          eventContent={renderEventContent}
        />
      </div>

      {/* Legenda para os feriados */}
      <div className="flex flex-wrap gap-4 p-3 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: 'rgba(255, 0, 0, 0.2)' }}></div>
          <span className="text-sm">Feriado Nacional</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: 'rgba(0, 0, 255, 0.2)' }}></div>
          <span className="text-sm">Feriado Estadual</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 mr-2 rounded" style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)' }}></div>
          <span className="text-sm">Feriado Municipal</span>
        </div>
      </div>
    </div>
  );
};

const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year}  ${hour}:${minute}`;
}

const renderEventContent = (eventInfo: EventContentArg) => {
  // Se for um feriado, renderiza de forma diferente
  if (eventInfo.event.extendedProps.isFeriado) {
    return (
      <div className="w-full text-center text-xs font-semibold">
        {eventInfo.event.title}
      </div>
    );
  }

  // Renderização normal para eventos não-feriados
  const colorClass = `fc-bg-${eventInfo.event.extendedProps.calendar?.toLowerCase()}`;
  const event = {
    id: eventInfo.event.id,
    title: eventInfo.event.title,
    situation: eventInfo.event.extendedProps.situacao,
    startTime: eventInfo.event.start ? formatDate(eventInfo.event.start) : "",
    endTime: eventInfo.event.end ? formatDate(eventInfo.event.end) : "",
    nomeCliente: eventInfo.event.extendedProps.nomeCliente,
    valorTotal: eventInfo.event.extendedProps.valorTotal,
    valorRecebido: eventInfo.event.extendedProps.valorRecebido,
    valorPendente: eventInfo.event.extendedProps.valorPendente
  }
  return (
    <Tooltip event={event} >
      <div
        className={`event-fc-color fc-event-main flex ${colorClass}  rounded-sm p-1`}
      >
        <div className="fc-daygrid-event-dot"></div>
        <div className="fc-event-title">{eventInfo.event.title.split(' ')[0]}</div>
      </div>
    </Tooltip>
  );
};

export default Calendar;