import React, { createContext, ReactNode, useContext, useState } from 'react';

interface CorreContextProps {
  ValidCodes: KitType[];
  selectedModality?: Modalities;
  setSelectedModality: React.Dispatch<
    React.SetStateAction<Modalities | undefined>
  >;
  selectedKit?: KitType;
  setSelectedKit: React.Dispatch<React.SetStateAction<KitType | undefined>>;
  raceResume?: RaceResume;
  setRaceResume: React.Dispatch<React.SetStateAction<RaceResume | undefined>>;
}

export const CorreContext = createContext<CorreContextProps>();

interface AuthContextProviderProps {
  children: ReactNode;
}

type Modalities = 'presential' | 'virtual';

export interface KitType {
  name: string;
  code: string;
}

export interface RaceResume {
  foodPlate: string;
  distance: string;
  duration: string;
  pace: string;
}

const CorreContextProvider = ({ children }: AuthContextProviderProps) => {
  const [selectedModality, setSelectedModality] = useState<Modalities>();
  const [raceResume, setRaceResume] = useState<RaceResume>();
  const [selectedKit, setSelectedKit] = useState<KitType>();

  const ValidCodes: KitType[] = [
    { name: '15km', code: 'XtZ37QwhebAYPcp3' },
    { name: '10km', code: 'G7ZFdVe4DxaZUZzN' },
    { name: '5km', code: 'cTzstrjQHrPzfNJj' },
    { name: '2km', code: 'EVghDLHTecGspLD4' },
    { name: 'finalizar', code: 'aTmGF7us8HBmzPvC' },
  ];

  return (
    <CorreContext.Provider
      value={{
        ValidCodes,
        selectedModality,
        setSelectedModality,
        selectedKit,
        setSelectedKit,
        raceResume,
        setRaceResume,
      }}
    >
      {children}
    </CorreContext.Provider>
  );
};

export default CorreContextProvider;

export const useCorre = () => {
  const correContext = useContext(CorreContext);
  if (!correContext) {
    throw new Error('use Auth must be used within a CorreContextProvider');
  }
  return correContext;
};
