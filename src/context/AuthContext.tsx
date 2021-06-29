import AsyncStorage from '@react-native-community/async-storage';
import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';

interface AuthContextProps {
  cookie: Promise<string | null>;
  setCookie: Dispatch<SetStateAction<Promise<string | null> | string | null>>;
}

export const AuthContext = createContext<AuthContextProps>({
  cookie: AsyncStorage.getItem('@RNAuth:cookie') || '',
  setCookie: () => AsyncStorage.getItem('@RNAuth:cookie') || '',
});

interface AuthContextProviderProps {
  children?: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [cookie, setCookie] = useState(
    AsyncStorage.getItem('@RNAuth:cookie') || '',
  );
  return (
    <AuthContext.Provider
      value={{
        cookie,
        setCookie
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('use Auth must be used within a AuthContextProvider');
  }
  const { cookie, setCookie } = authContext;
  return {
    cookie,
    setCookie
  };
};