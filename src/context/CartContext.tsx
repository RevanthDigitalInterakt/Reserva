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
import { CepResponse } from '../config/brasilApi';
import {
  AddAddressToCart,
  AddCustomerToOrder,
  AddItemToCart,
  CepVerify,
  CreateCart,
  IdentifyCustomer,
  RemoveItemFromCart,
} from '../services/vtexService';

interface ClientPreferencesData {
  attachmentId: string;
  locale: string;
  optinNewsLetter: boolean;
}

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
}

interface Message {
  code: any;
  status: string;
  text: string;
}

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
  reference: any;
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
  reference: any;
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
  deliveryIds: [DeliveryIds];
  shippingEstimate: string;
  shippingEstimateDate: any;
  lockTTL: any;
  availableDeliveryWindows: [];
  deliveryWindow: any;
  price: number;
  tax: number;
  pickupPointId: string;
  deliveryChannel: string;
}
interface LogisticsInfo {
  itemIndex: number;
  selectedSla: string;
  selectedDeliveryChannel: string;
  slas: Slas[];
}

interface BusinessHours {
  DayOfWeek: number;
  OpeningTime: string;
  ClosingTime: string;
}

export interface PickupPoints {
  friendlyName: string;
  address: Address;
  additionalInfo: string;
  id: string;
  businessHours: BusinessHours[];
}

interface ShippingData {
  attachmentId: string;
  address: Address;
  selectedAddresses: Address[];
  availableAddresses: AvailableAddresses[];
  logisticsInfo: LogisticsInfo[];
  pickupPoints: PickupPoints[];
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
  checkToSavePersonDataByDefault: boolean;
  templateOptions: TemplateOptions;
  timeZone: string;
  currencyCode: string;
  currencyLocale: number;
  currencySymbol: string;
  currencyFormatInfo: CurrencyFormatInfo;
}

interface OrderForm {
  canEditData: boolean;
  clientPreferencesData: ClientPreferencesData;
  clientProfileData: ClientProfileData;
  giftRegistryData: any;
  items: Item[];
  loggedIn: boolean;
  marketingData: any;
  messages: Message[];
  orderFormId: string;
  paymentData: string;
  salesChannel: string;
  sellers: Seller[];
  shippingData: ShippingData;
  storePreferencesData: StorePreferencesData;
  totalizers: Totalizers[];
  userProfileId: any;
  userType: any;
  value: number;
}
interface Item {
  unique: string;
  id: string;
  productId: string;
  productRefId: string;
  refId: string;
  ean: any;
  name: string;
  skuName: string;
  modalType: any;
  parentItemIndex: any;
  parentAssemblyBinding: any;
  assemblies: any[];
  priceValidUntil: string;
  tax: number;
  price: number;
  listPrice: number;
  manualPrice: any;
  manualPriceAppliedBy: any;
  sellingPrice: number;
  rewardValue: number;
  isGift: boolean;
  additionalInfo: AdditionalInfo;
  preSaleDate: any;
  productCategoryIds: string;
  productCategories: any;
  quantity: number;
  seller: string;
  sellerChain: string[];
  imageUrl: string;
  detailUrl: string;
  components: any[];
  bundleItems: any[];
  attachments: any[];
  attachmentOfferings: any[];
  offerings: any[];
  priceTags: PrioceTag[];
  availability: string;
  measurementUnit: string;
  unitMultiplier: number;
  manufacturerCode: any;
  priceDefinition: PriceDefinition;
}
interface AdditionalInfo {
  dimension: any;
  brandName: string;
  brandId: string;
  offeringInfo: any;
  offeringType: any;
  offeringTypeId: any;
}

interface PrioceTag {
  name: string;
  value: number;
  rawValue: number;
  isPercentual: boolean;
  identifier: string;
}

interface PriceDefinition {
  calculatedSellingPrice: number;
  total: number;
  sellingPrices: { value: number; quantity: number }[];
}

interface CartContextProps {
  orderForm: OrderForm | undefined;
  addItem: (
    quantity: number,
    itemId: string,
    seller: string
  ) => Promise<{ message: string; ok: boolean }>;
  identifyCustomer: (email: string) => Promise<boolean | undefined>;
  addCustomer: (customer: any) => Promise<boolean | undefined>;
  addShippingData: (address: Partial<Address>) => Promise<boolean | undefined>;
  getCepData: (postalCode: string) => Promise<CepResponse | undefined>;
  addShippingOrPickupInfo: (
    logisticInfo: any[]
  ) => Promise<boolean | undefined>; //todo - type later,
  orderform: () => void;
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
      console.log('error', error.response.data);
    }
  };

  const addItem = async (quantity: number, itemId: string, seller: string) => {
    try {
      const { data } = await AddItemToCart(
        orderForm?.orderFormId,
        quantity,
        itemId,
        seller
      );

      console.log(data);
      // check produt availability
      const index = data.items.findIndex(({ id }: any) => id === itemId);
      const product = data.items[index];
      if (product.availability !== 'available') {
        const productRemoved = await removeUnavailableProduct(
          product.id,
          index
        );

        if (productRemoved) return { message: 'O produto não está disponível' };
      }

      // set new order form
      setOrderForm(data);
      return { ok: true };
    } catch (error) {
      console.log('error', error.response.data);
    }
  };

  const removeUnavailableProduct = async (itemId: string, index: number) => {
    try {
      const { data } = await RemoveItemFromCart(
        orderForm?.orderFormId,
        itemId,
        index
      );

      return !!data;
    } catch (error) {
      console.log('error', error.response.data);
    }
  };

  const identifyCustomer = async (email: string) => {
    try {
      const data = await IdentifyCustomer(orderForm?.orderFormId, email);

      setOrderForm(data);
      // TODO - change this later, find a better way to check if theres's no user
      return !!data.clientProfileData.firstName;
    } catch (error) {
      console.log('error', error.response.data);
    }
  };

  const addCustomer = async (customer: any) => {
    try {
      const data = await AddCustomerToOrder(orderForm?.orderFormId, {
        ...customer,
        email: orderForm?.clientProfileData.email,
      });

      setOrderForm(data);

      return !!data;
    } catch (error) {
      console.log('error', error.response.data);
    }
  };

  const getCepData = async (postalCode: string) => {
    try {
      const data = await CepVerify(postalCode);

      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const addShippingData = async (address: Partial<Address>) => {
    try {
      const data = await AddAddressToCart(orderForm?.orderFormId, {
        selectedAddresses: [
          {
            ...address,
          },
        ],
        clearAddressIfPostalCodeNotFound: false,
      });

      // set new order form
      setOrderForm(data);

      return !!data;
    } catch (error) {
      console.log('error', error.response.data);
    }
  };

  const addShippingOrPickupInfo = async (logisticsInfo: any[]) => {
    try {
      const data = await AddAddressToCart(orderForm?.orderFormId, {
        selectedAddresses: orderForm?.shippingData.selectedAddresses,
        logisticsInfo,
      });

      console.log(data);
      // set new order form
      setOrderForm(data);

      return !!data;
    } catch (error) {
      console.log('error', error.response.data);
    }
  };

  useEffect(() => {
    orderform();
  }, []);

  return (
    <CartContext.Provider
      value={{
        orderForm,
        addItem,
        identifyCustomer,
        addCustomer,
        addShippingData,
        getCepData,
        addShippingOrPickupInfo,
        orderform,
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

  const {
    orderForm,
    addItem,
    identifyCustomer,
    addCustomer,
    addShippingData,
    getCepData,
    addShippingOrPickupInfo,
    orderform,
  } = cartContext;
  return {
    orderForm,
    addItem,
    identifyCustomer,
    addCustomer,
    addShippingData,
    getCepData,
    addShippingOrPickupInfo,
    orderform,
  };
};
