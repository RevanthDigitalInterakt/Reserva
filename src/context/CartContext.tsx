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
import { CreateCart } from '../services/vtexService'

interface CartContextProps {
    canEditData: boolean;
    clientPreferencesData: {
        attachmentId: string;
        locale: string;
        optinNewsLetter: boolean;
    };
    clientProfileData: {
        attachmentId: string;
        email: string;
        firstName: string;
        lastName: string;
        document: string;
        documentType: string;
        phone: string;
        corporateName: null;
        tradeName: null;
        corporateDocument: null;
        stateInscription: null;
        corporatePhone: null;
        isCorporate: boolean;
    };
    giftRegistryData: null;
    items: string[];
    loggedIn: boolean;
    marketingData: null;
    messages: {
        code: null,
        status: string;
        text: string;
    }[];
    orderFormId: string,
    paymentData: …,
    salesChannel: string,
    sellers: {
        id: string;
        name: string;
        logo: string;
    }[]
    shippingData: {
        attachmentId: string;
        address: {
            addressType: string;
            receiverName: string;
            addressId: string;
            postalCode: string;
            city: string;
            state: string;
            country: string;
            street: string;
            number: string;
            neighborhood: string;
            complement: string;
            reference: null
        },
        availableAddresses: {
            addressType: string;
            receiverName: string;
            addressId: string;
            postalCode: string;
            city: string;
            state: string;
            country: string;
            street: string;
            number: string;
            neighborhood: string;
            complement: string;
            reference: null
        }[];
        logisticsInfo: {
            itemIndex: number;
            selectedSla: string;
            slas: {
                id: string;
                name: string;
                deliveryIds: [
                    {
                        courierId: string;
                        warehouseId: string;
                        dockId: string;
                        courierName: string;
                        quantity: number;
                    }
                ],
                shippingEstimate: string;
                shippingEstimateDate: null,
                lockTTL: null,
                availableDeliveryWindows: [],
                deliveryWindow: null,
                price: number;
                tax: number;
            }[]
        }[]
    }

    storePreferencesData: {
        countryCode: string;
        checkToSavePersonDataByDefault: boolean,
        templateOptions: {
            toggleCorporate: boolean;
        },
        timeZone: string;
        currencyCode: string;
        currencyLocale: number,
        currencySymbol: string;
        currencyFormatInfo: {
            currencyDecimalDigits: number;
            currencyDecimalSeparator: string;
            currencyGroupSeparator: string;
            currencyGroupSize: number;
            startsWithCurrencySymbol: boolean;
        }
    }
    totalizers: {
        id: string;
        name: string;
        value: number;
    }[]
    userProfileId: null,
    userType: null,
    value: number
}

export const CartContext = createContext<CartContextProps>({} as CartContextProps);

interface CartContextProviderProps {
    children?: ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {

    const orderform = async () => {
        try {
            const response = await CreateCart();
            console.log("orderform", response);
        } catch (error) {
            console.log("error", error.response.data);
        }
    }
    useEffect(() => {
        orderform()
    }, [])

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

// hooks
export const useCart = () => {
    const cartContext = useContext(CartContext);
    if (!cartContext) {
        throw new Error('use Auth must be used within a AuthContextProvider');
    }
    const { } = cartContext;
    return {
        cookie,
        setCookie
    };
};
