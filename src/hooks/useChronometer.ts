import { useEffect, useRef, useState } from 'react';

import BackgroundTimer from 'react-native-background-timer';

export const useChronometer = ({ initial = '00:00:00', countDown = false }) => {
  const [valueFormatted, setValueFormatted] = useState(initial);
  const value = useRef(initial);

  useEffect(() => {
    value.current = initial;
  }, [initial]);

  const start = () => {
    let seconds = convertHoursToSeconds(value.current);

    BackgroundTimer.runBackgroundTimer(() => {
      if (countDown) {
        seconds -= 1;
      } else {
        seconds += 1;
      }
      const formatted = convertSecondsToHours(seconds);
      setValueFormatted(formatted);
    }, 1000);
  };

  const stop = () => {
    BackgroundTimer.stopBackgroundTimer();
  };

  const reset = () => {
    stop();
    value.current = initial;
    start();
  };

  useEffect(() => {
    BackgroundTimer.stopBackgroundTimer();
  }, []);

  return {
    currentValue: valueFormatted,
    start,
    stop,
    reset,
  };
};

const convertHoursToSeconds = (time = '00:00:00') => {
  let [horas, minutos, segundos] = time?.split(':') || [undefined, undefined, undefined];
  horas = Number(horas);
  minutos = Number(minutos);
  segundos = Number(segundos);
  const horasEmSegundos = horas * 3600;
  const minutosEmSegundos = minutos * 60;
  return horasEmSegundos + minutosEmSegundos + segundos;
};

const convertSecondsToHours = (seconds = 0) => {
  if (seconds <= 0) return '00:00:00';

  let horas = Math.trunc(seconds / 3600);
  let segundosRestantes = seconds - horas * 3600;
  let minutos = Math.trunc(segundosRestantes / 60);
  segundosRestantes -= minutos * 60;

  horas = horas < 10 ? `0${horas}` : horas;
  minutos = minutos < 10 ? `0${minutos}` : minutos;
  segundosRestantes = segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;

  return `${horas}:${minutos}:${segundosRestantes}`;
};
