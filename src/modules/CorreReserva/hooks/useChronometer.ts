import React, { useEffect, useRef, useState } from 'react';

import BackgroundTimer from 'react-native-background-timer';

export const useChronometer = ({
  initial = '00:00:00',
  countDown = false,
  initialRsvMini = '00:00:00',
}) => {
  const [valueFormatted, setValueFormatted] = useState(initial);
  const [valueFormattedRsvMini, setValueFormattedRsvMini] = useState(initial);
  const value = useRef(initial);
  const valueRsvMini = useRef(initialRsvMini);
  const intervalIDRef = useRef();

  useEffect(() => {
    value.current = initial;
  }, [initial]);

  useEffect(() => {
    valueRsvMini.current = initialRsvMini;
  }, [initialRsvMini]);

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

  const startRsvMini = () => {
    let seconds = convertHoursToSeconds(valueRsvMini.current);

    BackgroundTimer.runBackgroundTimer(() => {
      if (countDown) {
        seconds -= 1;
      } else {
        seconds += 1;
      }
      const formatted = convertSecondsToHours(seconds);
      setValueFormattedRsvMini(formatted);
    }, 1000);
  };

  const stop = () => {
    BackgroundTimer.stopBackgroundTimer();
    // if (intervalIDRef.current) {
    //   clearInterval(intervalIDRef.current);
    // }
  };

  const reset = () => {
    stop();
    value.current = initial;
    start();
  };

  const resetRsvMini = () => {
    stop();
    valueRsvMini.current = initialRsvMini;
    start();
  };

  useEffect(() => {
    BackgroundTimer.stopBackgroundTimer();
  }, []);

  return {
    currentValue: valueFormatted,
    currentValueRsvMini: valueFormattedRsvMini,
    start,
    startRsvMini,
    stop,
    reset,
    resetRsvMini,
  };
};

const convertHoursToSeconds = (time = '00:00:00') => {
  let [horas, minutos, segundos] = time.split(':');
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
  segundosRestantes =
    segundosRestantes < 10 ? `0${segundosRestantes}` : segundosRestantes;

  return `${horas}:${minutos}:${segundosRestantes}`;
};
