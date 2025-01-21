// TODO move all requests to api-gw
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import {
  instance,
  instance2,
  instance7,
} from '../config/vtexConfig';

const vtexConfig7 = instance7;

interface PriceDefinition {
  calculatedSellingPrice: number;
  total: number;
  sellingPrices: { value: number; quantity: number }[];
}

interface AdditionalInfo {
  dimension: any;
  brandName: string;
  brandId: string;
  offeringInfo: any;
  offeringType: any;
  offeringTypeId: any;
}
interface PriceTag {
  name: string;
  value: number;
  rawValue: number;
  isPercentual: boolean;
  identifier: string;
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
  priceTags: PriceTag[];
  availability: string;
  measurementUnit: string;
  unitMultiplier: number;
  manufacturerCode: any;
  priceDefinition: PriceDefinition;
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
interface ShippingData {
  attachmentId: string;
  address: Address;
  selectedAddresses: Address[];
  availableAddresses: AvailableAddresses[];
  logisticsInfo: LogisticsInfo[];
  pickupPoints: PickupPoints[];
}

export interface PickupPoints {
  friendlyName: string;
  address: Address;
  additionalInfo: string;
  id: string;
  businessHours: BusinessHours[];
}

interface BusinessHours {
  DayOfWeek: number;
  OpeningTime: string;
  ClosingTime: string;
}

interface DeliveryIds {
  courierId: string;
  warehouseId: string;
  dockId: string;
  courierName: string;
  quantity: number;
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

interface Seller {
  id: string;
  name: string;
  logo: string;
}
export interface IVtexServiceRequestOrder {
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

const GetPurchaseData = async (orderGroup: any) => {
  try {
    const response = await vtexConfig7.get(
      `/checkout/pub/orders/order-group/${orderGroup}`,
    );
    return response;
  } catch (err) {
    ExceptionProvider.captureException(err, "GetPurchaseData - vtexService.ts");
  }
  // o orderGroup é pego quando chega na url orderPlaced(metodo checkURL na tela)
  // é retornado um array de pedidos. pq por padrão a vtex pode ter um mesmo
  // place order para varias compras.
};

const OrderDetail = async (orderId: string) => {
  const response = await instance2.get<IVtexServiceRequestOrder>(`/oms/user/orders/${orderId}`, {
    headers: {
      'X-VTEX-API-APPKEY': '',
    },
  });
  return response;
};

const SearchNewOrders = async (page: string, email: string, cookie: string) => {
  const response = await instance.get<{ list: IVtexServiceRequestOrder[], paging: { total: number } }>(
    `oms/user/orders/?page=${page}&per_page=20&includeProfileLastPurchases=true`,
    {
      headers: {
        cookie,
      },
    },
  );
  return response;
};

export {
  GetPurchaseData, OrderDetail, SearchNewOrders,
};
