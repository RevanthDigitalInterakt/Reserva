import AsyncStorage from '@react-native-community/async-storage';
import React, {
    useState,
    createContext,
    ReactNode,
    useContext,
    SetStateAction,
    Dispatch,
} from 'react';

interface CartContextProps {

}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);

interface CartContextProviderProps {
    children?: ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {

    return (
        <CartContext.Provider
            value={{

            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;

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