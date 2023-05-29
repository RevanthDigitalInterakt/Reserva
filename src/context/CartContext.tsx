/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from 'react';

import type { CepResponse } from '../config/brasilApi';
import {
  AddAddressToCart,
  AddCustomerToOrder,
  AddItemToCart,
  CreateCart,
  RestoreData,
  RemoveItemFromCart,
  addToCoupon,
  removeCouponToOder,
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
  CepVerifyPostalCode,
  RestoreCart,
  SetGiftSize,
  UpdateItemToCart,
} from '../services/vtexService';
import { checkoutService } from '../services/checkoutService';
import EventProvider from '../utils/EventProvider';
import {
  useCheckIfUserExistsLazyQuery,
  useOrderFormAddSellerCouponMutation, useOrderFormAttachClientByCookieMutation, useOrderFormRefreshDataMutation,
} from '../base/graphql/generated';
import { splitSellerName } from '../utils/splitSellerName';
import { getBrands } from '../utils/getBrands';
import { defaultBrand } from '../utils/defaultWBrand';

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
  availableGifts: IOrderFormItem[];
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
  items: IOrderFormItem[];
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
export interface IOrderFormItem {
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
  items: IOrderFormItem[];
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

interface IAddItemDTO {
  quantity: number,
  itemId: string,
  seller: string,
  isUpdate?: boolean,
  index?: number,
  hasBundleItems?: boolean,
}

type TAddItemResponse = {
  message: string;
  ok?: undefined;
} | {
  ok: boolean;
  message?: undefined;
} | undefined;

interface CartContextProps {
  loading: boolean;
  topBarLoading: boolean;
  orderForm: OrderForm | undefined;
  updateOrderForm: () => Promise<OrderForm | void>;
  addItem: (dto: IAddItemDTO) => Promise<TAddItemResponse>;
  identifyCustomer: (email: string) => Promise<boolean | undefined>;
  addCustomer: (customer: any) => Promise<boolean | undefined>;
  addShippingData: (address: Partial<Address>) => Promise<boolean | undefined>;
  getCepData: (postalCode: string) => Promise<CepResponse | undefined>;
  addShippingOrPickupInfo: (
    logisticInfo: any[],
    selectedAddresses: any[]
  ) => Promise<boolean | undefined>;
  orderform: () => void;
  removeItem: (
    itemId: string,
    index: number,
    seller: string,
    qty: number
  ) => Promise<
  | {
    ok: boolean;
  }
  | undefined
  >;
  resetUserCheckout: () => Promise<boolean | undefined>;
  addCoupon: (coupon: string) => Promise<boolean | undefined>;
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
  restoreCart: (orderFormId: string) => Promise<void>;
  sellerCode: string;
  sellerName: string;
  applyCouponOnPressed: (value: string) => Promise<void>;
  hasErrorApplyCoupon: boolean;
  setGiftSizeRequest: (
    orderFormId: string,
    selectableGiftsId: string,
    id: string,
    seller: string
  ) => void;
  toggleGiftWrapping: (
    flag: boolean, orderFormId: string, item: IOrderFormItem, index: number, cookie?: string) => (
    Promise<void>
  );
  refreshOrderFormData: (orderFormId: string) => void;
}

export const CartContext = createContext<CartContextProps | null>(null);

interface CartContextProviderProps {
  children?: ReactNode;
}

const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [orderForm, setOrderForm] = useState<OrderForm>();
  const [loading, setLoading] = useState<boolean>(false);
  const [sellerCode, setSellerCode] = useState<string>('');
  const [sellerName, setSellerName] = useState<string>('');
  const [topBarLoading, setTopBarLoading] = useState<boolean>(false);
  const [hasErrorApplyCoupon, setHasErrorApplyCoupon] = useState<boolean>(false);

  const [orderFormAddSellerCoupon] = useOrderFormAddSellerCouponMutation({
    context: { clientName: 'gateway' },
  });

  const [checkIfUserExist] = useCheckIfUserExistsLazyQuery({
    context: { clientName: 'gateway' },
  });

  const [OrderFormAttachClientByCookie] = useOrderFormAttachClientByCookieMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const [orderFormRefreshData] = useOrderFormRefreshDataMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const _requestOrderForm = async () => {
    const { data } = await CreateCart();
    setOrderForm(data);
  };

  const _requestRestoreCart = async (orderFormId: string): Promise<OrderForm> => {
    const { data } = await RestoreCart(orderFormId);
    setOrderForm(data);

    return data;
  };

  const _selectedCouponSeller = async (sellerCouponCode: string) => {
    setLoading(true);
    try {
      if (!orderForm?.orderFormId) return false;

      const { data } = await orderFormAddSellerCoupon({
        variables: {
          coupon: sellerCouponCode,
          orderFormId: orderForm.orderFormId,
        },
      });

      if (data?.orderFormAddSellerCoupon) {
        setSellerCode(sellerCouponCode);
        if (data.orderFormAddSellerCoupon.marketingData) {
          setSellerName(splitSellerName(data.orderFormAddSellerCoupon.marketingData.marketingTags[2] || ''));
        }
        return true;
      }

      return false;
    } catch (error) {
      EventProvider.captureException(error);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const orderform = async () => {
    setLoading(true);
    try {
      await _requestOrderForm();
    } catch (error) {
      EventProvider.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const setGiftSizeRequest = async (
    orderFormId: string,
    selectableGiftsId: string,
    id: string,
    seller: string,
  ) => {
    setTopBarLoading(true);
    try {
      const data = await SetGiftSize(
        orderFormId,
        selectableGiftsId,
        id,
        seller,
      );
      if (data) {
        await _requestOrderForm();
      }
    } catch (error) {
      EventProvider.captureException(error);
    } finally {
      setTopBarLoading(false);
    }
  };

  const verifyEmail = async (email: string) => {
    try {
      const { data } = await checkIfUserExist({
        variables: {
          email,
        },
      });

      return data?.checkIfUserExists || false;
    } catch (error) {
      EventProvider.captureException(error);
      return false;
    }
  };

  const convertPrice = (value: number) => value / 100;

  const addItem = async (dto: IAddItemDTO): Promise<TAddItemResponse> => {
    const {
      quantity, itemId, seller, index = -1, isUpdate = false, hasBundleItems = false,
    } = dto;

    try {
      const isUpdateItem = hasBundleItems && isUpdate && index >= 0;

      const { data } = isUpdateItem
        ? await UpdateItemToCart(
          orderForm?.orderFormId,
          quantity,
          itemId,
          seller,
          index,
          hasBundleItems,
        ) : await AddItemToCart(
          orderForm?.orderFormId,
          quantity,
          itemId,
          seller,
        );

      const idx = data.items.findIndex(({ id }: any) => id === itemId);
      const product = data.items[idx];

      if (product.availability !== 'available') {
        const productRemoved = await removeUnavailableProduct(
          product.id,
          idx,
          seller,
        );

        if (productRemoved) return { message: 'O produto não está disponível' };
      }

      // set new order form
      setOrderForm(data);

      EventProvider.logEvent('page_view', {
        wbrand: defaultBrand.picapau,
      });

      EventProvider.logEvent('add_to_cart', {
        item_id: itemId,
        item_price: convertPrice(product?.price || 0),
        item_quantity: quantity,
        item_category: 'product',
        currency: 'BRL',
        seller,
        wbrand: getBrands(data?.items || []),
      });

      return { ok: !(product.quantity < quantity) };
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const removeItem = async (
    itemId: string,
    index: number,
    seller: string,
    qty: number,
  ) => {
    try {
      const productRemoved = orderForm?.items.find(
        (item: any) => item.id === itemId,
      );
      const { data } = await RemoveItemFromCart(
        orderForm?.orderFormId,
        itemId,
        index,
        seller,
        qty,
      );
      setOrderForm(data);

      EventProvider.logEvent('remove_from_cart', {
        item_id: itemId,
        item_categories: 'product',
        wbrand: getBrands(data?.items),
      });

      return { ok: true };
    } catch (err) {
      EventProvider.captureException(err);
    }
  };

  const removeUnavailableProduct = async (
    itemId: string,
    index: number,
    seller: string,
  ) => {
    try {
      const { data } = await RemoveItemFromCart(
        orderForm?.orderFormId,
        itemId,
        index,
        seller,
        0,
      );

      return !!data;
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const resetUserCheckout = async () => {
    try {
      const { data } = await ResetUserCheckout(orderForm?.orderFormId);
      return !!data;
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const refreshOrderFormData = async (orderFormId: string) => {
    await orderFormRefreshData({
      variables: {
        input: {
          orderFormId,
        },
      },
    });
  };
  const identifyCustomer = async (email: string) => {
    try {
      if (orderForm?.orderFormId) {
        await refreshOrderFormData(orderForm?.orderFormId);

        await OrderFormAttachClientByCookie({
          variables: {
            input: {
              orderFormId: orderForm?.orderFormId,
            },
          },
        });

        const { data } = await RestoreData(orderForm?.orderFormId);
        setOrderForm(data);

        // TODO - change this later, find a better way to check if theres's no user
        return !!data?.OrderFormAttachClientByCookie?.clientProfileData?.firstName;
      }
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const addCustomer = async (customer: any) => {
    try {
      const data = await AddCustomerToOrder(orderForm?.orderFormId, {
        ...customer,
        email: orderForm?.clientProfileData.email,
      });

      EventProvider.logEvent('complete_registration', {
        registration_method: 'email',
        custumer_email: String(orderForm?.clientProfileData?.email),
      });

      setOrderForm(data);

      return !!data;
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const getCepData = async (postalCode: string) => {
    try {
      const data = await CepVerifyPostalCode(postalCode);

      return data;
    } catch (err) {
      EventProvider.captureException(err);
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
      EventProvider.captureException(error);
    }
  };

  const addShippingOrPickupInfo = async (
    logisticsInfo: any[],
    selectedAddresses: any[],
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
      EventProvider.captureException(error);
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
      EventProvider.captureException(error);
    }
  };

  const removeCoupon = async (coupon: string) => {
    setLoading(true);
    try {
      const { data } = await removeCouponToOder(orderForm?.orderFormId, coupon);
      setOrderForm(data);
      return !!data;
    } catch (error) {
      EventProvider.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const removeSellerCoupon = async (coupon: string) => {
    setTopBarLoading(true);
    try {
      const { data } = await removeSellerCouponToOder(orderForm?.orderFormId, {
        ...orderForm?.marketingData,
        marketingTags: [''],
      });
      setSellerCode('');
      setSellerName('');
      setOrderForm(data);
      return !!data;
    } catch (error) {
      EventProvider.captureException(error);
    } finally {
      setTopBarLoading(false);
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
      EventProvider.captureException(error);
    }
  };

  const convertZipCode = async (postalCode: string) => {
    try {
      const { data } = await ConvertZipCode(postalCode);
      return data;
    } catch (error) {
      EventProvider.captureException(error);
    }
  };
  const tracking = async (cookie: string, order: string) => {
    try {
      const { data } = await Tracking(cookie, order);
      return data;
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const pickupPoint = async (longitude: string, latitude: string) => {
    try {
      const { data } = await PickupPoint(longitude, latitude);
      return data;
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const orders = async (page: string) => {
    try {
      const { data } = await Orders(page);
      return data || [];
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const orderDetail = async (orderId: string) => {
    try {
      const { data } = await OrderDetail(orderId);
      return data || [];
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const searchNewOrders = async (
    page: string,
    email: string,
    cookie: string,
  ) => {
    try {
      const { data } = await SearchNewOrders(page, email, cookie);
      return data || [];
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const searchNewOrderDetail = async (
    page: string,
    email: string,
    cookie: string,
  ) => {
    try {
      const { data } = await SearchNewOrderDetail(page, email, cookie);
      return data || [];
    } catch (error) {
      EventProvider.captureException(error);
    }
  };

  const updateOrderForm = async (): Promise<OrderForm | void> => {
    if (orderForm) {
      const { data } = await RestoreData(orderForm?.orderFormId);
      setOrderForm(data);
      return data;
    }
  };

  const applyCouponOnPressed = async (sellerCouponCode?: string): Promise<void> => {
    if (!sellerCouponCode) {
      setHasErrorApplyCoupon(true);
      return;
    }

    if (!orderForm?.orderFormId) {
      setTopBarLoading(false);
      return;
    }

    setTopBarLoading(true);
    try {
      const { data } = await orderFormAddSellerCoupon({
        variables: {
          coupon: sellerCouponCode,
          orderFormId: orderForm.orderFormId,
        },
      });

      if (!data?.orderFormAddSellerCoupon) {
        setHasErrorApplyCoupon(true);
        return;
      }
      setSellerCode(sellerCouponCode);
      if (data.orderFormAddSellerCoupon.marketingData) {
        setSellerName(splitSellerName(data.orderFormAddSellerCoupon.marketingData.marketingTags[2] || ''));
      }
    } catch (error) {
      EventProvider.captureException(error);
      setHasErrorApplyCoupon(true);
    } finally {
      setTopBarLoading(false);
    }
  };

  const restoreCart = async (orderFormId: string) => {
    setLoading(true);
    try {
      const data = await _requestRestoreCart(orderFormId);

      const sellerCodeData = data?.marketingData?.marketingTags?.filter(
        (item) => item.startsWith('code_CodigoVendedor='),
      )[0];

      if (sellerCodeData) {
        const sellerId = sellerCodeData?.split('=')[1] as unknown as string | undefined;
        if (sellerId) {
          await _selectedCouponSeller(sellerId);
        }
      }

      setOrderForm(data);
    } catch (error) {
      EventProvider.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleGiftWrapping = async (flag: boolean, orderFormId: string, item: IOrderFormItem, index: number, cookie?: string) => {
    try {
      setTopBarLoading(true);

      if (flag) {
        const offeringId = item.offerings.filter((offering) => offering?.type === 'Embalagem pra Presente')[0].id;

        if (!offeringId) return;

        await checkoutService.activeGiftWrapping(
          orderFormId,
          index,
          { id: offeringId },
          cookie ?? undefined,
        );

        await _requestRestoreCart(orderFormId);

        return;
      }

      // Check if item has bundle_items
      const hasGift = item.bundleItems[0].id;

      if (!hasGift) return;

      await checkoutService.removeGiftWrapping(
        orderFormId,
        index,
        hasGift,
        cookie ?? undefined,
      );

      await _requestRestoreCart(orderFormId);
    } catch (err) {
      EventProvider.captureException(err);
    } finally {
      setTopBarLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        loading,
        topBarLoading,
        orderForm,
        updateOrderForm,
        addItem,
        identifyCustomer,
        addCustomer,
        addShippingData,
        getCepData,
        addShippingOrPickupInfo,
        orderform,
        removeItem,
        addCoupon,
        removeCoupon,
        removeSellerCoupon,
        resetUserCheckout,
        refreshOrderFormData,
        sendUserEmail,
        convertZipCode,
        tracking,
        pickupPoint,
        orders,
        searchNewOrders,
        orderDetail,
        searchNewOrderDetail,
        verifyEmail,
        restoreCart,
        sellerCode,
        sellerName,
        applyCouponOnPressed,
        hasErrorApplyCoupon,
        setGiftSizeRequest,
        toggleGiftWrapping,
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
    loading,
    topBarLoading,
    orderForm,
    updateOrderForm,
    addItem,
    identifyCustomer,
    addCustomer,
    addShippingData,
    getCepData,
    addShippingOrPickupInfo,
    orderform,
    removeItem,
    addCoupon,
    removeCoupon,
    removeSellerCoupon,
    refreshOrderFormData,
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
    restoreCart,
    sellerCode,
    sellerName,
    applyCouponOnPressed,
    hasErrorApplyCoupon,
    setGiftSizeRequest,
    toggleGiftWrapping,
  } = cartContext;
  return {
    loading,
    topBarLoading,
    orderForm,
    updateOrderForm,
    addItem,
    identifyCustomer,
    addCustomer,
    addShippingData,
    getCepData,
    addShippingOrPickupInfo,
    orderform,
    removeItem,
    addCoupon,
    removeCoupon,
    removeSellerCoupon,
    resetUserCheckout,
    refreshOrderFormData,
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
    restoreCart,
    sellerCode,
    sellerName,
    applyCouponOnPressed,
    hasErrorApplyCoupon,
    setGiftSizeRequest,
    toggleGiftWrapping,
  };
};
