/* eslint-disable @typescript-eslint/no-explicit-any */
import { getContractByDate } from '@/services/contract/getContractByDate';
import { useCallback, useEffect, useState } from 'react';

interface ConflictInfo {
  exists: boolean;
  info: { id: number; dataHoraInicial: string };
}

const initialConflict: ConflictInfo = {
  exists: false,
  info: { id: 0, dataHoraInicial: '' },
};

export function useConflict(values: { dataHoraInicial: string, dataHoraFinal: string }) {
  const [conflictContract, setConflictContract] = useState<ConflictInfo>(initialConflict);

  const checkDateTimeIsExist = useCallback(
    async (dateInicial: string, dateFinal: string): Promise<ConflictInfo> => {
      const response = await getContractByDate(dateInicial, dateFinal);
      const filterResponse = response.filter((item: any) => item.situacao !== 'CANCELADO')
      if (filterResponse.length > 0) {

        return {
          exists: true,
          info: { id: filterResponse[0].id, dataHoraInicial: filterResponse[0].dataHoraInicial },
        };
      }

      return initialConflict;
    },
    []
  );

  useEffect(() => {
    if (values.dataHoraInicial === "" || values.dataHoraFinal === "") {
      setConflictContract(initialConflict);
      return;
    }

    const fetchCheckedDates = async () => {
      try {
        const response = await checkDateTimeIsExist(
          values.dataHoraInicial,
          values.dataHoraFinal
        );
        setConflictContract(response);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCheckedDates();

  }, [values.dataHoraInicial, values.dataHoraFinal, checkDateTimeIsExist]);

  return conflictContract;
}
