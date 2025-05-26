import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface ChronometerContextProps {
  time: string;
  setTime?: Dispatch<SetStateAction<string>>;
}

const defaultState = {
  time: '00:00:00',
};

interface Time {
  time: string;
}

export const ChronometerContext = createContext<ChronometerContextProps>(defaultState);

interface ChronometerContextProviderProps {
  children?: ReactNode;
}
function ChronometerContextProvider({
  children,
}: ChronometerContextProviderProps) {
  const [time, setTime] = useState<Time>();

  return (
    <ChronometerContext.Provider value={{ time, setTime }}>
      {children}
    </ChronometerContext.Provider>
  );
}

export default ChronometerContextProvider;

export const useCountDown = () => {
  const chronometerContext = useContext(ChronometerContext);
  const { time, setTime } = chronometerContext;

  return { time, setTime };
};
