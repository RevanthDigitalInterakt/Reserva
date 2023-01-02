import React, {
  useState, createContext, ReactNode, useContext,
} from 'react';

interface ConfigContextProps {
  offersPage: string;
  setOffersPage: (offersPage: string) => void;
}

export const ConfigContext = createContext<ConfigContextProps>({
  offersPage: '',
  setOffersPage: (offersPage: string) => {},
});

interface ConfigContextProviderProps {
  children?: ReactNode;
}

const ConfigContextProvider = ({ children }: ConfigContextProviderProps) => {
  const [offersPage, setOffersPage] = useState('#61dafb');

  const changeOffersPage = (value: string) => {
    setOffersPage(value);
  };

  return (
    <ConfigContext.Provider
      value={{
        offersPage,
        setOffersPage: changeOffersPage,
      }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

export default ConfigContextProvider;

export const useConfigContext = () => {
  const configContext = useContext(ConfigContext);
  if (!configContext) {
    throw new Error('use Config must be used within a ConfigContext');
  }
  const { offersPage, setOffersPage } = configContext;
  return { offersPage, setOffersPage };
};
