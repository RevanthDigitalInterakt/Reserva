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
import { RSA } from 'react-native-rsa-native'
import { compose } from 'redux';
import { string } from 'yup/lib/locale';
interface AuthContextProps {
  cookie: string | null;
  setCookie: Dispatch<SetStateAction<Promise<string | null>>>;
  email?: string | null;
  setEmail?: Dispatch<SetStateAction<string>>;
  cleanEmailAndCookie: () => void,
  isCookieEmpty: () => boolean,
  saveCredentials: (data: LoginCredentials | null) => Promise<any>,
  getCredentials: () => Promise<LoginCredentials>
}

export interface LoginCredentials {
  email: string,
  password: string
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
  isCookieEmpty: () => true,
  saveCredentials: async () => { },
  getCredentials: async () => { }
});

interface AuthContextProviderProps {
  children?: ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [email, setEmail] = useState("");
  const [cookie, setCookie] = useState('');
  const [RSAKey, setRSAKey] = useState({ private: '', public: '' });
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


  const saveCredentials = async (data: { email: string, password: string } | null) => {
    const credentials = JSON.stringify(data)
    const encodedMessage = await RSA.encrypt(credentials, RSAKey.public)
    // const decrypted = await RSA.decrypt(encodedMessage, RSAKey.private)
    // console.log('decrypted', decrypted)
    return await AsyncStorage.setItem('@RNAuth:credentials', encodedMessage)
  }

  const getCredentials = async () => {
    const value = await AsyncStorage.getItem('@RNAuth:credentials')
    if (!!value) {
      console.log(value, RSAKey)
      const decryptedMessage = await RSA.decrypt(value, RSAKey.private)
      console.log('decryptedMessage', JSON.parse(decryptedMessage))
      return JSON.parse(decryptedMessage)
    }
    return null
  }

  useEffect(() => {
    AsyncStorage.getItem('@RNAuth:RSAKey').then((value) => {
      if (!value) {
        RSA.generateKeys(4096).then(key => {
          console.log('asdasdasdasdas', JSON.stringify(key))
          AsyncStorage.setItem('@RNAuth:RSAKey', JSON.stringify(key))
          setRSAKey(key)
        })
      } else {
        setRSAKey(JSON.parse(value))
      }
    })

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
        saveCredentials,
        getCredentials
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
  const { cookie, setCookie, email, setEmail, cleanEmailAndCookie, isCookieEmpty, saveCredentials, getCredentials } = authContext;
  return {
    email,
    setEmail,
    cookie,
    setCookie,
    cleanEmailAndCookie,
    isCookieEmpty,
    saveCredentials,
    getCredentials
  };
};