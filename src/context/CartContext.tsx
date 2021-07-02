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
import { AddAddressToCart, AddCustomerToOrder, AddItemToCart, CepVerify, CreateCart, IdentifyCustomer } from '../services/vtexService'

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

interface OrderForm {
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

interface CartContextProps {
    orderForm: OrderForm | undefined
    addItem: (quantity: number, itemId: string) => void;
    identifyCustomer: (email: string) => Promise<boolean | undefined>;
    addCustomer: (customer: any) => Promise<boolean | undefined>;
    addShippingData: (address: Partial<Address>) => Promise<boolean | undefined>;
}

export const CartContext = createContext<CartContextProps | null>(null);

interface CartContextProviderProps {
    children?: ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
    const [orderForm, setOrderForm] = useState<OrderForm>();

    const orderform = async () => {
        try {
            const { data } = await CreateCart();
            setOrderForm(data);
        } catch (error) {
            console.log("error", error.response.data);
        }
    }

    const addItem = async (quantity: number, itemId: string) => {
        try {
            const { data } = await AddItemToCart(orderForm?.orderFormId, quantity, itemId, "1")
        } catch (error) {
            console.log("error", error.response.data);
        }
    }

    const identifyCustomer = async (email: string) => {
        try {
            const data = await IdentifyCustomer(orderForm?.orderFormId, email);

            setOrderForm(data);

            // TODO - change this later, find a better way to check if theres's no user
            return !!data.clientProfileData.firstName;
        } catch (error) {
            console.log("error", error.response.data);
        }
    }

    const addCustomer = async (customer: any) => {
        try {
            const data = await AddCustomerToOrder(orderForm?.orderFormId, { ...customer, email: orderForm?.clientProfileData.email });

            setOrderForm(data);

            return !!data;
        } catch (error) {
            console.log("error", error.response.data);
        }
    }

    const addShippingData = async (address: Partial<Address>) => {
        try {


            const { city, street } = await CepVerify(address.postalCode || '')
            console.log(city, street)
            const data = await AddAddressToCart(
                orderForm?.orderFormId,
                {
                    selectedAddresses: [{
                        ...address,
                        city,
                        street,
                    }],
                    clearAddressIfPostalCodeNotFound: false
                });

            console.log(data);

            return !!data;
        } catch (error) {
            console.log("error", error.response.data);
        }
    }

    useEffect(() => {
        orderform()
    }, []);

    return (
        <CartContext.Provider
            value={{ orderForm, addItem, identifyCustomer, addCustomer, addShippingData }}
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

    const { orderForm, addItem, identifyCustomer, addCustomer, addShippingData } = cartContext;
    return {
        orderForm,
        addItem,
        identifyCustomer,
        addCustomer,
        addShippingData
    };
};
