//create a firebase context

import { RemoteConfigService } from "../shared/services/RemoteConfigService";
import React, { ChildContextProvider, createContext, useContext, useEffect, useState } from "react";

interface FirebaseContextProps {
  fetchValue: (key: string) => Promise<any>;
}

interface FirebaseContextProviderProps {
  children: React.ReactNode;
}

export const FirebaseContext = createContext<FirebaseContextProps>({
  fetchValue: () => Promise.resolve(null),
});

export const FirebaseContextProvider = ({ children }: FirebaseContextProviderProps) => {

  const fetchValue = async (key: string) => {
    const result = await RemoteConfigService.fetchValues()
    const item = result.find(x => x.key === key).value
    return item
  }

  useEffect(() => {
    fetchValue('test');
  }, [])

  return <FirebaseContext.Provider value={{
    fetchValue
  }}>
    {children}
  </FirebaseContext.Provider>
}

export const useFirebaseContext = () => {
  return useContext(FirebaseContext);
}
