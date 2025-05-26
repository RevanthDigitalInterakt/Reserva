import { useState, useEffect, useRef } from 'react';

export function useNewChronometer() {
  const [time, setTime] = useState<string>('08:00:01');

  const $timer = useRef<NodeJS.Timer>(null);

  useEffect(() => {
    const tick = () => {
      const [hours, minutes, seconds] = time.split(':').map(Number);
      if (!hours || !minutes || !seconds) {
        clearInterval($timer.current);
        return;
      }
      let h = hours;
      let m = minutes;
      let s = seconds - 1;

      if (s < 0) {
        s = 59;
        m -= 1;
        if (m < 0) {
          m = 59;
          h -= 1;
        }
      }

      if (h === 0 && m === 0 && s === 0) {
        clearInterval($timer.current);
        return;
      }

      setTime([
        h.toString().padStart(2, '0'),
        m.toString().padStart(2, '0'),
        s.toString().padStart(2, '0'),
      ].join(':'));
    };

    $timer.current = setInterval(tick, 1000);

    return () => clearInterval($timer.current);
  }, [time]);

  return { time, setTime };
}
