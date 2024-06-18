/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, {
  useState,
  createContext,
  type ReactNode,
  useContext,
  useEffect,
} from 'react';

import
{
  CreateCart,
  Orders,
  SearchNewOrders,
  OrderDetail,
  RestoreCart,
} from '../services/vtexService';
import
{
  useCheckIfUserExistsLazyQuery,
  useOrderFormAddSellerCouponMutation,
  type OrderformOutput,
} from '../base/graphql/generated';
import { setAsyncStorageItem } from '../hooks/useAsyncStorageProvider';
import { useBagStore } from '../zustand/useBagStore/useBagStore';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

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
  pickupStoreInfo?: {
    additionalInfo: string;
    dockId: number | null;
    friendlyName: string; // Apenas esse campo será utilizado
    isPickupStore: boolean;
  };
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
  packageItems: OrderformOutput['packageItems'];
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

export interface IAddItemDTO {
  quantity: number,
  itemId: string,
  seller: string,
  isUpdate?: boolean,
  index?: number,
  hasBundleItems?: boolean,
}

export type TAddItemResponse = {
  message: string;
  ok?: undefined;
} | {
  ok: boolean;
  message?: undefined;
} | undefined;

interface CartContextProps {
  orders: (page: string) => Promise<IOrder[] | undefined>;
  searchNewOrders: (
    page: string,
    email: string,
    cookie: string
  ) => Promise<IOrder[] | undefined>;
  orderDetail: (orderId: string) => Promise<IOrderId | undefined>;
  restoreCart: (orderFormId: string) => Promise<void>;
}

export const CartContext = createContext<CartContextProps | null>(null);

interface CartContextProviderProps {
  children?: ReactNode;
}

function CartContextProvider({ children }: CartContextProviderProps) {
  const [orderForm, setOrderForm] = useState<OrderForm>();

  const { actions } = useBagStore(['actions']);

  useEffect(() => {
    if (orderForm?.orderFormId && orderForm?.items) {
      setAsyncStorageItem('orderFormId', orderForm?.orderFormId)
        .then(actions.REFETCH_ORDER_FORM);
    }
  }, [orderForm?.orderFormId, orderForm?.items, actions.REFETCH_ORDER_FORM]);

  const [orderFormAddSellerCoupon] = useOrderFormAddSellerCouponMutation({
    context: { clientName: 'gateway' },
  });

  const _requestOrderForm = async () => {
    const { data } = await CreateCart();

    setOrderForm(data);
  };

  const _requestRestoreCart = async (orderFormId: string): Promise<OrderForm> => {
    const { data } = await RestoreCart(orderFormId);

    if (orderFormId) {
      setAsyncStorageItem('orderFormId', orderFormId);
    }

    setOrderForm(data);

    return data;
  };

  const _selectedCouponSeller = async (sellerCouponCode: string) => {
    try {
      if (!orderForm?.orderFormId) return false;

      const { data } = await orderFormAddSellerCoupon({
        variables: {
          coupon: sellerCouponCode,
          orderFormId: orderForm.orderFormId,
        },
      });

      if (data?.orderFormAddSellerCoupon) {
        return true;
      }

      return false;
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
    return false;
  };

  const orderform = async () => {
    try {
      await _requestOrderForm();
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  };

  useEffect(() => {
    orderform();
  }, []);

  const orders = async (page: string) => {
    try {
      const { data } = await Orders(page);
      return data || [];
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  };

  const orderDetail = async (orderId: string) => {
    try {
      const { data } = await OrderDetail(orderId);
      return data || [];
    } catch (error) {
      ExceptionProvider.captureException(error);
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
      ExceptionProvider.captureException(error);
    }
  };

  const restoreCart = async (orderFormId: string) => {
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
      ExceptionProvider.captureException(error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        orders,
        searchNewOrders,
        orderDetail,
        restoreCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;

// hooks
export const useCart = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error('use Auth must be used within a AuthContextProvider');
  }

  const {
    orders,
    searchNewOrders,
    orderDetail,
    restoreCart,
  } = cartContext;
  return {
    orders,
    searchNewOrders,
    orderDetail,
    restoreCart,
  };
};
