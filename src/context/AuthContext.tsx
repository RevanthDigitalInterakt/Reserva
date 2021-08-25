import AsyncStorage from '@react-native-community/async-storage';
import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
  Dispatch,
} from 'react';
import { useEffect } from 'react';

interface AuthContextProps {
  cookie: Promise<string | null>;
  setCookie: Dispatch<SetStateAction<Promise<string | null>>>;
  email?: string | null;
  setEmail?: Dispatch<SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextProps>({
  cookie: AsyncStorage.getItem('@RNAuth:cookie') || '',
  setCookie: () => AsyncStorage.getItem('@RNAuth:cookie') || '',
  setEmail: () => AsyncStorage.getItem('@RNAuth:email') || '',
});

interface AuthContextProviderProps {
  children?: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [email, setEmail] = useState("");
  const [cookie, setCookie] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('@RNAuth:cookie').then((value) => {
      setCookie(value);
    })
    AsyncStorage.getItem('@RNAuth:email').then((value) => {
      setEmail(value);
    })
  }, [])
  

  return (
    <AuthContext.Provider
      value={{
        cookie,
        email,
        setEmail,
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
  const { cookie, setCookie, email, setEmail } = authContext;
  return {
    email,
    setEmail,
    cookie,
    setCookie
  };
};