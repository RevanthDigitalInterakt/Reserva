import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';

import * as Sentry from '@sentry/react-native';

import AsyncStorage from '@react-native-community/async-storage';
import analytics from '@react-native-firebase/analytics';
import appsFlyer from 'react-native-appsflyer';

import { CepResponse } from '../config/brasilApi';
import {
  AddAddressToCart,
  AddCustomerToOrder,
  AddItemToCart,
  CepVerify,
  CreateCart,
  ValidateProfile,
  IdentifyCustomer,
  RemoveItemFromCart,
  addToCoupon,
  removeCouponToOder,
  validateSellerCoupon,
  addToSellerCoupon,
  removeSellerCouponToOder,
  ResetUserCheckout,
  SendUserEmail,
  ConvertZipCode,
  Tracking,
  PickupPoint,
  Orders,
  SearchNewOrders,
  SearchNewOrderDetail,
  OrderDetail,
  VerifyEmail,
  DeleteCustomerProfile,
  CepVerifyPostalCode,
} from '../services/vtexService';
import { CategoriesParserString } from '../utils/categoriesParserString';

interface ClientPreferencesData {
  attachmentId: string;
  locale: string;
  optinNewsLetter: boolean;
}

export interface ClientProfileData {
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

interface MarketingData {
  utmSource: any;
  utmMedium: any;
  utmCampaign: any;
  utmipage: any;
  utmiPart: any;
  utmiCampaign: any;
  coupon: any;
  marketingTags: string[];
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
interface SelectableGifts {
  availableGifts: Item[];
  availableQuantity: number;
  id: string;
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
  isDisposable: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  geoCoordinates: number[];
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
  shippingEstimateDate: string;
  deliveryChannel: string;
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

export interface items {
  items: {
    distance?: number;
    pickupPoint: PickupPoints;
  }[];
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

export interface OrderForm {
  canEditData: boolean;
  clientPreferencesData: ClientPreferencesData;
  clientProfileData: ClientProfileData;
  giftRegistryData: any;
  items: Item[];
  loggedIn: boolean;
  marketingData: MarketingData;
  messages: Message[];
  orderFormId: string;
  paymentData: any;
  salesChannel: string;
  sellers: Seller[];
  selectableGifts: SelectableGifts[];
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

export interface PackageAttachment {
  packages: {
    items: {
      itemIndex: number;
      quantity: number;
      price: number;
      description: number;
      unitMultiplier: number;
    }[];
    courier: string;
    invoiceNumber: string;
    invoiceValue: number;
    invoiceUrl: string;
    issuanceDate: string;
    trackingNumber: string;
    invoiceKey: string;
    trackingUrl: string;
    embeddedInvoice: string;
    type: string;
    courierStatus: {
      status: string;
      finished: boolean;
      deliveredDate: string;
      data: {
        lastChange: string;
        city: null;
        state: null;
        description: string;
        createDate: string;
      }[];
    };
  }[];
}

export interface IOrder {
  orderId: string;
  creationDate: string;
  clientName: string;
  items: null;
  totalValue: number;
  paymentNames: string;
  status: string;
  statusDescription: string;
  marketPlaceOrderId: null;
  sequence: string;
  salesChannel: string;
  affiliateId: string;
  origin: string;
  workflowInErrorState: boolean;
  workflowInRetry: boolean;
  lastMessageUnread: string;
  ShippingEstimatedDate: null;
  ShippingEstimatedDateMax: null;
  ShippingEstimatedDateMin: null;
  orderIsComplete: boolean;
  listId: null;
  listType: null;
  authorizedDate: null;
  callCenterOperatorName: null;
  totalItems: number;
  currencyCode: string;
  hostname: string;
  invoiceOutput: null;
  invoiceInput: null;
  lastChange: string;
  isAllDelivered: boolean;
  isAnyDelivered: boolean;
  giftCardProviders: null;
  orderFormId: string;
  paymentApprovedDate: null;
  readyForHandlingDate: null;
  deliveryDates: null;
}

export interface IOrderId {
  orderId: string;
  sequence: string;
  marketplaceOrderId: string;
  marketplaceServicesEndpoint: string;
  sellerOrderId: string;
  origin: string;
  affiliateId: string;
  salesChannel: string;
  merchantName: null;
  status: string;
  statusDescription: string;
  value: number;
  creationDate: string;
  lastChange: string;
  orderGroup: string;
  totals: {
    id: string;
    name: string;
    value: number;
  }[];
  items: Item[];
  marketplaceItems: any[];
  clientProfileData: ClientProfileData;
  giftRegistryData: null;
  marketingData: MarketingData;
  ratesAndBenefitsData: {
    id: string;
    rateAndBenefitsIdentifiers: any[];
  };
  shippingData: ShippingData;
  paymentData: any;
  packageAttachment: PackageAttachment;
  sellers: Seller[];
  callCenterOperatorData: null;
  followUpEmail: string;
  lastMessage: null;
  hostname: string;
  invoiceData: {
    address: null;
    userPaymentInfo: null;
  };
  changesAttachment: null;
  openTextField: null;
  roundingError: number;
  orderFormId: string;
  commercialConditionData: null;
  isCompleted: boolean;
  customData: string;
  storePreferencesData: StorePreferencesData;
  allowCancellation: boolean;
  allowEdition: boolean;
  isCheckedIn: boolean;
  marketplace: {
    baseURL: boolean;
    isCertified: null;
    name: boolean;
  };
  authorizedDate: boolean;
  invoicedDate: boolean;
  cancelReason: null;
  itemMetadata: {
    Items: {
      Id: string;
      Seller: string;
      Name: string;
      SkuName: string;
      ProductId: string;
      RefId: string;
      Ean: string;
      ImageUrl: string;
      DetailUrl: string;
      AssemblyOptions: any[];
    }[];
  };
  subscriptionData: null;
  taxData: null;
  checkedInPickupPointId: null;
  cancellationData: null;
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
    logisticInfo: any[],
    selectedAddresses: any[]
  ) => Promise<boolean | undefined>; // todo - type later,
  orderform: () => void;
  removeItem: () => Promise<{ ok: boolean }>;
  resetUserCheckout: () => Promise<boolean | undefined>;
  addCoupon: (coupon: string) => Promise<boolean | undefined>;
  addSellerCoupon: (coupon: string) => Promise<boolean | undefined>;
  removeCoupon: (coupon: string) => Promise<boolean | undefined>;
  removeSellerCoupon: (coupon: string) => Promise<boolean | undefined>;
  sendUserEmail: (email: string) => Promise<boolean | undefined>;
  convertZipCode: (postalCode: string) => Promise<Address | undefined>;
  tracking: (
    cookie: string,
    order: string
  ) => Promise<PackageAttachment | undefined>;
  pickupPoint: (
    longitude: string,
    latitude: string
  ) => Promise<items | undefined>;
  orders: (page: string) => Promise<IOrder[] | undefined>;
  searchNewOrders: (
    page: string,
    email: string,
    cookie: string
  ) => Promise<IOrder[] | undefined>;
  searchNewOrderDetail: (
    page: string,
    email: string,
    cookie: string
  ) => Promise<IOrder[] | undefined>;
  orderDetail: (orderId: string) => Promise<IOrderId | undefined>;
  verifyEmail: (email: string) => Promise<boolean | undefined>;
  deleteCustomerProfile: (id: string) => Promise<boolean | undefined>;
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
      Sentry.captureException(error);
    }
  };

  const verifyEmail = async (email: string) => {
    try {
      const { data } = await VerifyEmail(email);

      return data.length > 0;
    } catch (error) {
      Sentry.captureException(error);
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

      // check produt availability
      const index = data.items.findIndex(({ id }: any) => id === itemId);
      const product = data.items[index];

      if (product.availability !== 'available') {
        const productRemoved = await removeUnavailableProduct(
          product.id,
          index,
          seller
        );

        if (productRemoved) return { message: 'O produto não está disponível' };
      }

      const categories = CategoriesParserString(product.productCategories);

      // set new order form
      setOrderForm(data);
      appsFlyer.logEvent(
        'af_add_to_cart',
        {
          af_price: product.price,
          af_content: product.name,
          af_content_id: itemId,
          af_content_type: categories,
          af_currency: 'BRL',
          af_quantity: quantity,
          af_seller: seller,
        },
        (res) => { },
        (err) => {
          Sentry.captureException(err);
        }
      );
      analytics().logEvent('add_to_cart', {
        item_id: itemId,
        item_name: product.name,
        item_price: product.price,
        item_quantity: quantity,
        item_category: categories,
        currency: 'BRL',
        seller,
      });
      return { ok: !(product.quantity < quantity) };
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const removeItem = async (
    itemId: string,
    index: number,
    seller: string,
    qty: number
  ) => {
    try {
      const productRemoved = orderForm?.items.find(
        (item: any) => item.id === itemId
      );
      const { data } = await RemoveItemFromCart(
        orderForm?.orderFormId,
        itemId,
        index,
        seller,
        qty
      );
      setOrderForm(data);

      appsFlyer.logEvent(
        'remove_from_cart',
        {
          af_content_id: itemId,
          af_content_type: CategoriesParserString(
            productRemoved?.productCategories
          ),
        },
        (res) => { },
        (err) => {
          Sentry.captureException(err);
        }
      );

      analytics().logEvent('remove_from_cart', {
        item_id: itemId,
        item_categories: CategoriesParserString(
          productRemoved?.productCategories
        ),
      });

      return { ok: true };
    } catch (err) {
      Sentry.captureException(err);
    }
  };

  const removeUnavailableProduct = async (
    itemId: string,
    index: number,
    seller: string
  ) => {
    try {
      const { data } = await RemoveItemFromCart(
        orderForm?.orderFormId,
        itemId,
        index,
        seller,
        0
      );

      return !!data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const resetUserCheckout = async () => {
    try {
      const { data } = await ResetUserCheckout(orderForm?.orderFormId);
      return !!data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const identifyCustomer = async (email: string) => {
    try {
      await ResetUserCheckout(orderForm?.orderFormId);
      const data = await IdentifyCustomer(orderForm?.orderFormId, email);
      setOrderForm(data);
      // TODO - change this later, find a better way to check if theres's no user
      return !!data.clientProfileData.firstName;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const addCustomer = async (customer: any) => {
    try {
      const data = await AddCustomerToOrder(orderForm?.orderFormId, {
        ...customer,
        email: orderForm?.clientProfileData.email,
      });

      appsFlyer.logEvent('af_complete_registration', {
        af_registration_method: 'email',
      });

      analytics().logEvent('complete_registration', {
        registration_method: 'email',
        custumer_email: orderForm?.clientProfileData.email,
      });

      setOrderForm(data);

      return !!data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const getCepData = async (postalCode: string) => {
    try {
      const data = await CepVerifyPostalCode(postalCode);

      return data;
    } catch (err) {
      Sentry.captureException(err);
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
      Sentry.captureException(error);
    }
  };

  const addShippingOrPickupInfo = async (
    logisticsInfo: any[],
    selectedAddresses: any[]
  ) => {
    try {
      const data = await AddAddressToCart(orderForm?.orderFormId, {
        selectedAddresses,
        logisticsInfo,
      });

      // set new order form
      setOrderForm(data);

      return !!data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const addCoupon = async (coupon: string) => {
    try {
      const { data } = await addToCoupon(orderForm?.orderFormId, coupon);
      setOrderForm(data);

      const { messages } = data;
      const isCouponInValid = messages
        .map(({ text }: any) => text)
        .find((t: string) => t.includes(coupon));

      return !!isCouponInValid;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const addSellerCoupon = async (coupon: string) => {
    try {
      const { data } = await validateSellerCoupon(coupon);
      if (data.length > 0 && data[0].ativo) {
        await addToSellerCoupon(orderForm?.orderFormId, {
          ...orderForm?.marketingData,
          marketingTags: [
            'CodigoVendedor',
            `code_CodigoVendedor=${coupon}`,
            `vendedor_apelido=${data[0].vendedor_apelido}`,
            'ron=false',
          ],
        });
        return !!data;
      }
      return false;
    } catch (error) {
      Sentry.captureException(error);
    }
  };
  const removeCoupon = async (coupon: string) => {
    try {
      const { data } = await removeCouponToOder(orderForm?.orderFormId, coupon);
      setOrderForm(data);
      return !!data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const removeSellerCoupon = async (coupon: string) => {
    try {
      const { data } = await removeSellerCouponToOder(orderForm?.orderFormId, {
        ...orderForm?.marketingData,
        marketingTags: [''],
      });
      setOrderForm(data);
      return !!data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };
  useEffect(() => {
    orderform();
  }, []);

  const sendUserEmail = async (email: string) => {
    try {
      const { data } = await SendUserEmail(email);
      return !!data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const convertZipCode = async (postalCode: string) => {
    try {
      const { data } = await ConvertZipCode(postalCode);
      return data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };
  const tracking = async (cookie: string, order: string) => {
    try {
      const { data } = await Tracking(cookie, order);
      return data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const pickupPoint = async (longitude: string, latitude: string) => {
    try {
      const { data } = await PickupPoint(longitude, latitude);
      return data;
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const orders = async (page: string) => {
    try {
      const { data } = await Orders(page);
      return data || [];
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const orderDetail = async (orderId: string) => {
    try {
      const { data } = await OrderDetail(orderId);
      return data || [];
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const searchNewOrders = async (
    page: string,
    email: string,
    cookie: string
  ) => {
    try {
      const { data } = await SearchNewOrders(page, email, cookie);
      return data || [];
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const searchNewOrderDetail = async (
    page: string,
    email: string,
    cookie: string
  ) => {
    try {
      const { data } = await SearchNewOrderDetail(page, email, cookie);
      return data || [];
    } catch (error) {
      Sentry.captureException(error);
    }
  };

  const deleteCustomerProfile = async (id: string) => {
    try {
      const { data } = await DeleteCustomerProfile(id);
      return data || [];
    } catch (error) {
      Sentry.captureException(error);
    }
  };

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
        removeItem,
        addCoupon,
        addSellerCoupon,
        removeCoupon,
        removeSellerCoupon,
        resetUserCheckout,
        sendUserEmail,
        convertZipCode,
        tracking,
        pickupPoint,
        orders,
        searchNewOrders,
        orderDetail,
        searchNewOrderDetail,
        verifyEmail,
        deleteCustomerProfile,
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
    removeItem,
    addCoupon,
    addSellerCoupon,
    removeCoupon,
    removeSellerCoupon,
    resetUserCheckout,
    sendUserEmail,
    convertZipCode,
    tracking,
    pickupPoint,
    orders,
    searchNewOrders,
    searchNewOrderDetail,
    orderDetail,
    verifyEmail,
    deleteCustomerProfile,
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
    removeItem,
    addCoupon,
    addSellerCoupon,
    removeCoupon,
    removeSellerCoupon,
    resetUserCheckout,
    sendUserEmail,
    convertZipCode,
    tracking,
    pickupPoint,
    orders,
    searchNewOrders,
    searchNewOrderDetail,
    orderDetail,
    verifyEmail,
    deleteCustomerProfile,
  };
};
