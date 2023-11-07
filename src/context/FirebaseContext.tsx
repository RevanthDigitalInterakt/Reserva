// create a firebase context

import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { RemoteConfigService } from '../shared/services/RemoteConfigService';

interface FirebaseContextProps {
  fetchValues: () => Promise<any[]>;
  getValue: (key: RemoteConfigKeysType) => Promise<any>;
  remoteConfigs: any[]
}

interface FirebaseContextProviderProps {
  children: React.ReactNode;
}

export const FirebaseContext = createContext<FirebaseContextProps>({
  fetchValues: () => Promise.resolve([]),
  getValue: () => Promise.resolve(null),
  remoteConfigs: [],
});

export enum RemoteConfigKeys {
  SCREEN_MAINTENANCE = 'SCREEN_MAINTENANCE',
  FEATURE_CASHBACK_IN_STORE = 'FEATURE_CASHBACK_IN_STORE',
}

export type RemoteConfigKeysType = keyof typeof RemoteConfigKeys;

export function FirebaseContextProvider({ children }: FirebaseContextProviderProps) {
  const [remoteConfigs, setRemoteConfigs] = useState<any[]>([]);

  const fetchValues = async () => {
    const result = await RemoteConfigService.fetchValues();
    setRemoteConfigs(result);
    return result;
  };

  const getValue = async (key: RemoteConfigKeysType) => {
    const result = await fetchValues();
    return result.find((x) => x.key === key);
  };

  useEffect(() => {
    fetchValues();
  }, []);

  return (
    <FirebaseContext.Provider value={{
      fetchValues,
      getValue,
      remoteConfigs,
    }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebaseContext = () => useContext(FirebaseContext);
