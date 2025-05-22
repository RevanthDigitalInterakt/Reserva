import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
  useLayoutEffect,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { instance } from '../config/vtexConfig';

interface RegionalSearchContextProps {
  regionId: string | null;
  setRegionId: Dispatch<SetStateAction<string | null>>;
  segmentToken: string | null;
  setSegmentToken: Dispatch<SetStateAction<string | null>>;
  cep: string | null;
  setCep: Dispatch<SetStateAction<string | null>>;
  fetchRegionId: (segmentId: string) => void;
}

const getRegionId = () => {
  let regionId: string | null = null;
  AsyncStorage.getItem('@RNRegionalSearch:regionId').then((x) => (regionId = x));
  return regionId;
};

const getCep = () => {
  let regionId: string | null = null;
  AsyncStorage.getItem('@RNRegionalSearch:cep').then((x) => (regionId = x));
  return regionId;
};

const getSegmentToken = () => {
  let segmentToken: string | null = null;
  AsyncStorage.getItem('@RNRegionalSearch:segmentToken').then((x) => (segmentToken = x));
  return segmentToken;
};

export const RegionalSearchContext = createContext<RegionalSearchContextProps>({
  regionId: getRegionId(),
  setRegionId: async () => (await AsyncStorage.getItem('@RNAuth:regionId')) || '',
  segmentToken: getSegmentToken(),
  setSegmentToken: async () => (await AsyncStorage.getItem('@RNAuth:segmentToken')) || '',
  cep: getCep(),
  setCep: async () => (await AsyncStorage.getItem('@RNAuth:cep')) || '',
  fetchRegionId: (segmentId: string) => { },
});

interface RegionalSearchProviderProps {
  children?: ReactNode;
}

function RegionalSearchContextProvider({ children }: RegionalSearchProviderProps) {
  const [regionId, setRegionId] = useState('');
  const [cep, setCep] = useState('');
  const [segmentToken, setSegmentToken] = useState('');

  const fetchRegionId = async (segmentId: string) => {
    if (segmentId) {
      const { data } = await instance.get(`/segments/${segmentId}`);
      return data;
    }
  };

  useEffect(() => {
    if (regionId) {
      AsyncStorage.setItem('@RNRegionalSearch:regionId', regionId);
    }
  }, [regionId]);

  useEffect(() => {
    if (cep) {
      AsyncStorage.setItem('@RNRegionalSearch:cep', cep);
    }
  }, [cep]);

  useLayoutEffect(() => {
    fetchRegionId(segmentToken);
    if (segmentToken) {
      AsyncStorage.setItem('@RNRegionalSearch:segmentToken', segmentToken);
    }
  }, [segmentToken]);

  useEffect(() => {
    AsyncStorage.getItem('@RNRegionalSearch:regionId').then((value) => {
      setRegionId(value);
    });

    AsyncStorage.getItem('@RNRegionalSearch:cep').then((value) => {
      setCep(value);
    });

    AsyncStorage.getItem('@RNRegionalSearch:segmentToken').then((value) => {
      setSegmentToken(value);
    });
  });

  return (
    <RegionalSearchContext.Provider
      value={{
        regionId,
        setRegionId,
        segmentToken,
        setSegmentToken,
        cep,
        setCep,
        fetchRegionId,
      }}
    >
      {children}
    </RegionalSearchContext.Provider>
  );
}

export default RegionalSearchContextProvider;

export const useRegionalSearch = () => {
  const regionalSearchContext = useContext(RegionalSearchContext);
  if (!regionalSearchContext) {
    throw new Error('use RegionalSearch must be used within a RegionalSearchContextProvider');
  }
  const {
    regionId,
    setRegionId,
    segmentToken,
    setSegmentToken,
    cep,
    setCep,
    fetchRegionId,
  } = regionalSearchContext;
  return {
    regionId,
    setRegionId,
    segmentToken,
    setSegmentToken,
    cep,
    setCep,
    fetchRegionId,
  };
};
