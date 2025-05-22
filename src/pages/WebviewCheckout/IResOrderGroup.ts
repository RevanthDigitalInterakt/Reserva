// Interface for the top-level order object
interface IResOrderGroup {
  orderId: string;
  sequence: string;
  marketplaceOrderId: string;
  marketplaceServicesEndpoint: string | null;
  sellerOrderId: string;
  origin: string;
  affiliateId: string;
  salesChannel: string;
  merchantName: string | null;
  status: string;
  statusDescription: string | null;
  value: number;
  creationDate: string;
  lastChange: string;
  orderGroup: string;
  totals: Total[];
  items: Item[];
  marketplaceItems: any[];
  clientProfileData: ClientProfileData;
  giftRegistryData: any | null;
  marketingData: MarketingData;
  ratesAndBenefitsData: RatesAndBenefitsData;
  shippingData: ShippingData;
  paymentData: PaymentData;
  packageAttachment: PackageAttachment;
  sellers: Seller[];
  callCenterOperatorData: any | null;
  followUpEmail: string;
  lastMessage: string | null;
  hostname: string;
  invoiceData: any | null;
  changesAttachment: any | null;
  openTextField: any | null;
  roundingError: number;
  orderFormId: string;
  commercialConditionData: any | null;
  isCompleted: boolean;
  customData: any | null;
  storePreferencesData: StorePreferencesData;
  allowCancellation: boolean;
  allowEdition: boolean;
  isCheckedIn: boolean;
  marketplace: any | null;
  authorizedDate: string | null;
  invoicedDate: string | null;
  cancelReason: string | null;
  itemMetadata: ItemMetadata;
  subscriptionData: any | null;
  taxData: any | null;
  checkedInPickupPointId: string | null;
  cancellationData: CancellationData;
  cancellationRequests: CancellationRequest[];
  clientPreferencesData: ClientPreferencesData;
}

// Interface for totals
interface Total {
  id: string;
  name: string;
  value: number;
}

// Interface for items
interface Item {
  uniqueId: string;
  id: string;
  productId: string;
  ean: string;
  lockId: string | null;
  itemAttachment: ItemAttachment;
  attachments: any[];
  quantity: number;
  seller: string;
  name: string;
  refId: string;
  price: number;
  listPrice: number;
  manualPrice: number | null;
  manualPriceAppliedBy: string | null;
  priceTags: PriceTag[];
  imageUrl: string;
  detailUrl: string;
  components: any[];
  bundleItems: any[];
  params: any[];
  offerings: Offering[];
  attachmentOfferings: any[];
  sellerSku: string;
  priceValidUntil: string;
  commission: number;
  tax: number;
  preSaleDate: string | null;
  additionalInfo: AdditionalInfo;
  measurementUnit: string;
  unitMultiplier: number;
  sellingPrice: number;
  isGift: boolean;
  shippingPrice: number | null;
  rewardValue: number;
  freightCommission: number;
  priceDefinition: PriceDefinition;
  taxCode: string;
  parentItemIndex: number | null;
  parentAssemblyBinding: string | null;
  callCenterOperator: string | null;
  serialNumbers: any | null;
  assemblies: any[];
  costPrice: number | null;
}

interface ItemAttachment {
  content: Record<string, any>;
  name: string | null;
}

interface PriceTag {
  name: string;
  value: number;
  isPercentual: boolean;
  identifier: string;
  rawValue: number;
  rate: number | null;
  jurisCode: string | null;
  jurisType: string | null;
  jurisName: string | null;
}

interface Offering {
  type: string;
  id: string;
  name: string;
  price: number;
}

interface AdditionalInfo {
  brandName: string;
  brandId: string;
  categoriesIds: string;
  categories: Category[];
  productClusterId: string;
  commercialConditionId: string;
  dimension: Dimension;
  offeringInfo: any | null;
  offeringType: string | null;
  offeringTypeId: string | null;
}

interface Category {
  id: number;
  name: string;
}

interface Dimension {
  cubicweight: number;
  height: number;
  length: number;
  weight: number;
  width: number;
}

interface PriceDefinition {
  sellingPrices: SellingPrice[];
  calculatedSellingPrice: number;
  total: number;
  reason: string | null;
}

interface SellingPrice {
  value: number;
  quantity: number;
}

// Interface for client profile data
interface ClientProfileData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  documentType: string;
  document: string;
  phone: string;
  corporateName: string | null;
  tradeName: string | null;
  corporateDocument: string | null;
  stateInscription: string | null;
  corporatePhone: string | null;
  isCorporate: boolean;
  userProfileId: string;
  userProfileVersion: string | null;
  customerClass: string | null;
  customerCode: string | null;
}

// Interface for marketing data
interface MarketingData {
  id: string;
  utmSource: string | null;
  utmPartner: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  coupon: string;
  utmiCampaign: string | null;
  utmipage: string | null;
  utmiPart: string | null;
  marketingTags: string[];
}

// Interface for rates and benefits data
interface RatesAndBenefitsData {
  id: string;
  rateAndBenefitsIdentifiers: RateAndBenefitsIdentifier[];
}

interface RateAndBenefitsIdentifier {
  description: string;
  featured: boolean;
  id: string;
  name: string;
  matchedParameters: Record<string, string>;
  additionalInfo: any | null;
}

// Interface for shipping data
interface ShippingData {
  id: string;
  address: Address;
  logisticsInfo: LogisticsInfo[];
  trackingHints: any | null;
  selectedAddresses: Address[];
  availableAddresses: Address[];
  contactInformation: any[];
}

interface Address {
  addressType: string;
  receiverName: string | null;
  addressId: string;
  versionId: string | null;
  entityId: string | null;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
  reference: string;
  geoCoordinates: number[];
}

interface LogisticsInfo {
  itemIndex: number;
  itemId: string;
  selectedDeliveryChannel: string;
  selectedSla: string;
  lockTTL: string;
  price: number;
  listPrice: number;
  sellingPrice: number;
  deliveryWindow: any | null;
  deliveryCompany: string;
  shippingEstimate: string;
  shippingEstimateDate: string;
  slas: Sla[];
  shipsTo: string[];
  deliveryIds: DeliveryId[];
  deliveryChannels: DeliveryChannel[];
  deliveryChannel: string;
  pickupStoreInfo: PickupStoreInfo;
  addressId: string;
  versionId: string | null;
  entityId: string | null;
  polygonName: string;
  pickupPointId: string | null;
  transitTime: string;
}

interface Sla {
  id: string;
  name: string;
  shippingEstimate: string;
  shippingEstimateDate: string | null;
  deliveryWindow: any | null;
  availableDeliveryWindows: any[];
  deliveryIds: DeliveryId[];
  listPrice: number;
  price: number;
  deliveryChannel: string;
  pickupStoreInfo: PickupStoreInfo;
  polygonName: string;
  lockTTL: string;
  pickupPointId: string | null;
  transitTime: string;
  pickupDistance: number | null;
}

interface DeliveryId {
  courierId: string;
  courierName: string;
  dockId: string;
  quantity: number;
  warehouseId: string;
  accountCarrierName: string;
  kitItemDetails: any[];
}

interface DeliveryChannel {
  id: string;
  stockBalance: number;
}

interface PickupStoreInfo {
  additionalInfo: string | null;
  address: Address | null;
  dockId: string | null;
  friendlyName: string | null;
  isPickupStore: boolean;
}

// Interface for payment data
interface PaymentData {
  giftCards: any[];
  transactions: Transaction[];
}

interface Transaction {
  isActive: boolean;
  transactionId: string;
  merchantName: string;
  payments: Payment[];
}

interface Payment {
  id: string;
  paymentSystem: string;
  paymentSystemName: string;
  value: number;
  installments: number;
  referenceValue: number;
  cardHolder: string | null;
  cardNumber: string | null;
  firstDigits: string | null;
  lastDigits: string | null;
  cvv2: string | null;
  expireMonth: string | null;
  expireYear: string | null;
  url: string | null;
  giftCardId: string | null;
  giftCardName: string | null;
  giftCardCaption: string | null;
  redemptionCode: string | null;
  group: string;
  tid: string;
  dueDate: string | null;
  connectorResponses: ConnectorResponses;
  giftCardProvider: string | null;
  giftCardAsDiscount: string | null;
  koinUrl: string | null;
  accountId: string | null;
  parentAccountId: string | null;
  bankIssuedInvoiceIdentificationNumber: string | null;
  bankIssuedInvoiceIdentificationNumberFormatted: string | null;
  bankIssuedInvoiceBarCodeNumber: string | null;
  bankIssuedInvoiceBarCodeType: string | null;
  billingAddress: Address | null;
  paymentOrigin: string | null;
}

interface ConnectorResponses {
  Tid: string;
  ReturnCode: string;
  Message: string;
  authId: string;
  acquirer: string;
}

// Interface for package attachment
interface PackageAttachment {
  packages: any[];
}

// Interface for sellers
interface Seller {
  id: string;
  name: string;
  logo: string;
  fulfillmentEndpoint: string;
}

// Interface for store preferences data
interface StorePreferencesData {
  countryCode: string;
  currencyCode: string;
  currencyFormatInfo: CurrencyFormatInfo;
  currencyLocale: number;
  currencySymbol: string;
  timeZone: string;
}

interface CurrencyFormatInfo {
  CurrencyDecimalDigits: number;
  CurrencyDecimalSeparator: string;
  CurrencyGroupSeparator: string;
  CurrencyGroupSize: number;
  StartsWithCurrencySymbol: boolean;
}

// Interface for item metadata
interface ItemMetadata {
  Items: MetadataItem[];
}

interface MetadataItem {
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
}

// Interface for cancellation data
interface CancellationData {
  RequestedByUser: boolean;
  RequestedBySystem: string | null;
  RequestedBySellerNotification: string | null;
  RequestedByPaymentNotification: string | null;
  Reason: string;
  CancellationDate: string;
}

// Interface for cancellation requests
interface CancellationRequest {
  id: string;
  reason: string;
  cancellationRequestDate: string;
  requestedByUser: boolean;
  deniedBySeller: boolean;
  deniedBySellerReason: string | null;
  cancellationRequestDenyDate: string | null;
}

// Interface for client preferences data
interface ClientPreferencesData {
  locale: string;
  optinNewsLetter: boolean;
}

export { IResOrderGroup };
