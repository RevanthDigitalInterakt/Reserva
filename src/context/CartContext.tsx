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

interface ClientPreferencesData {
    attachmentId: string;
    locale: string;
    optinNewsLetter: boolean;
};

interface ClientProfileData {
    attachmentId: string;
    email: string;
    firstName: string;
    lastName: string;
    document: string;
    documentType: string;
    phone: string;
    corporateName: any;
    tradeName: any;
    corporateDocument: any;
    stateInscription: any;
    corporatePhone: any;
    isCorporate: boolean;
};

interface Message {
    code: any,
    status: string;
    text: string;
};

interface Seller {
    id: string;
    name: string;
    logo: string;
}

interface Totalizers {
    id: string;
    name: string;
    value: number;
}

interface Address {
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
    reference: any
}

interface AvailableAddresses {
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
    reference: any
}

interface DeliveryIds {
    courierId: string;
    warehouseId: string;
    dockId: string;
    courierName: string;
    quantity: number;
}

interface Slas {
    id: string;
    name: string;
    deliveryIds: [DeliveryIds],
    shippingEstimate: string;
    shippingEstimateDate: any,
    lockTTL: any,
    availableDeliveryWindows: [],
    deliveryWindow: any,
    price: number;
    tax: number;
}
interface LogisticsInfo {
    itemIndex: number;
    selectedSla: string;
    slas: Slas[]
}

interface ShippingData {
    attachmentId: string;
    address: Address,
    availableAddresses: AvailableAddresses[];
    logisticsInfo: LogisticsInfo[]
}

interface TemplateOptions {
    toggleCorporate: boolean;
}

interface CurrencyFormatInfo {
    currencyDecimalDigits: number;
    currencyDecimalSeparator: string;
    currencyGroupSeparator: string;
    currencyGroupSize: number;
    startsWithCurrencySymbol: boolean;
}

interface StorePreferencesData {
    countryCode: string;
    checkToSavePersonDataByDefault: boolean,
    templateOptions: TemplateOptions,
    timeZone: string;
    currencyCode: string;
    currencyLocale: number,
    currencySymbol: string;
    currencyFormatInfo: CurrencyFormatInfo
}

interface CartContextProps {
    canEditData: boolean;
    clientPreferencesData: ClientPreferencesData
    clientProfileData: ClientProfileData
    giftRegistryData: any;
    items: string[];
    loggedIn: boolean;
    marketingData: any;
    messages: Message[];
    orderFormId: string,
    paymentData: string,
    salesChannel: string,
    sellers: Seller[]
    shippingData: ShippingData
    storePreferencesData: StorePreferencesData
    totalizers: Totalizers[]
    userProfileId: any,
    userType: any,
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
