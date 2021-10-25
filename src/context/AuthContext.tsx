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
import { compose } from 'redux';
import { string } from 'yup/lib/locale';

interface AuthContextProps {
  cookie: string | null;
  setCookie: Dispatch<SetStateAction<Promise<string | null>>>;
  email?: string | null;
  setEmail?: Dispatch<SetStateAction<string>>;
  cleanEmailAndCookie: () => void,
  isCookieEmpty: () => boolean
}

const getCookie = () => {
  let cookie: string | null = null
  AsyncStorage.getItem('@RNAuth:cookie').then(x => cookie = x)
  return cookie
}

export const AuthContext = createContext<AuthContextProps>({
  cookie: getCookie(),
  setCookie: async () => await AsyncStorage.getItem('@RNAuth:cookie') || '',
  setEmail: async () => await AsyncStorage.getItem('@RNAuth:email') || '',
  cleanEmailAndCookie: () => { },
  isCookieEmpty: () => true
});

interface AuthContextProviderProps {
  children?: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [email, setEmail] = useState("");
  const [cookie, setCookie] = useState('');
  const [isInitializing, setIsInitializing] = useState(true)

  const cleanEmailAndCookie = async () => {
    if (!isInitializing) {
      setEmail('')
      await AsyncStorage.setItem('@RNAuth:cookie', '')
      setCookie('')
      await AsyncStorage.setItem('@RNAuth:email', '')
    }
  }

  const isCookieEmpty = () => {
    return cookie === null || cookie === ''
  }

  useEffect(() => {
    getCookie()
    AsyncStorage.getItem('@RNAuth:cookie').then((value) => {
      setCookie(value);
      setIsInitializing(false)
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
        setCookie,
        cleanEmailAndCookie,
        isCookieEmpty,
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
  const { cookie, setCookie, email, setEmail, cleanEmailAndCookie, isCookieEmpty } = authContext;
  return {
    email,
    setEmail,
    cookie,
    setCookie,
    cleanEmailAndCookie,
    isCookieEmpty
  };
};