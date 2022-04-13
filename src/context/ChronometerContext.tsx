import React, {
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
  Dispatch,
  useState,
  useRef,
  useEffect,
} from 'react';
import BackgroundTimer from 'react-native-background-timer';

interface ChronometerContextProps {
  time: string;
  timeRsvMini?: string;
  setTime?: Dispatch<SetStateAction<string>>;
  setTimeRsvMini?: Dispatch<SetStateAction<string>>;
}

const defaultState = {
  time: '00:00:00',
  timeRsvMini: '00:00:00',
};

interface Time {
  time: string;
  timeRsvMini: string;
}

export const ChronometerContext =
  createContext<ChronometerContextProps>(defaultState);

interface ChronometerContextProviderProps {
  children?: ReactNode;
}
const ChronometerContextProvider = ({
  children,
}: ChronometerContextProviderProps) => {
  const [time, setTime] = useState<Time>();
  const [timeRsvMini, setTimeRsvMini] = useState<Time>();

  // console.log('timetime', time)
  return (
    <ChronometerContext.Provider
      value={{
        time,
        setTime,
        timeRsvMini,
        setTimeRsvMini,
      }}
    >
      {children}
    </ChronometerContext.Provider>
  );
};

export default ChronometerContextProvider;

export const useCountDown = () => {
  const chronometerContext = useContext(ChronometerContext);
  const { time, setTime } = chronometerContext;
  const [timeRsvMini, setTimeRsvMini] = useState<Time>();
  return {
    time,
    setTime,
    timeRsvMini,
    setTimeRsvMini,
  };
};
