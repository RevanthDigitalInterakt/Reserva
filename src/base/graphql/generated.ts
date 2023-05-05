// @ts-nocheck
/* eslint-disable */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CepInput = {
  cep: Scalars['String'];
};

export type CepOutput = {
  __typename?: 'CepOutput';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  geoCoordinates?: Maybe<Scalars['Int']>;
  neighborhood?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type CheckEmailInput = {
  email: Scalars['String'];
};

export type ConfigCountdownClockOutput = {
  __typename?: 'ConfigCountdownClockOutput';
  countdown?: Maybe<Scalars['String']>;
  countdownStart?: Maybe<Scalars['String']>;
  descriptionModal?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleButton?: Maybe<Scalars['String']>;
  titleModal?: Maybe<Scalars['String']>;
  watchType?: Maybe<Scalars['String']>;
};

export type ConfigCountdownClockReservaOutput = {
  __typename?: 'ConfigCountdownClockReservaOutput';
  countdown?: Maybe<Scalars['String']>;
  descriptionModal?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  titleButton?: Maybe<Scalars['String']>;
  titleModal?: Maybe<Scalars['String']>;
  watchType?: Maybe<Scalars['String']>;
};

export type ConfigDiscountBarOutput = {
  __typename?: 'ConfigDiscountBarOutput';
  colorBar?: Maybe<Scalars['String']>;
  colorButton?: Maybe<Scalars['String']>;
  coupon?: Maybe<Scalars['String']>;
  descriptionModal?: Maybe<Scalars['String']>;
  shareMessage?: Maybe<Scalars['String']>;
  titleBar?: Maybe<Scalars['String']>;
  titleButton?: Maybe<Scalars['String']>;
  titleModal?: Maybe<Scalars['String']>;
};

export type ConfigOutput = {
  __typename?: 'ConfigOutput';
  countDownClock?: Maybe<ConfigCountdownClockOutput>;
  countDownClockReservaMini?: Maybe<ConfigCountdownClockReservaOutput>;
  discountCodeBar?: Maybe<ConfigDiscountBarOutput>;
  name: Scalars['String'];
  offersPage?: Maybe<Scalars['String']>;
  online: Scalars['Boolean'];
  searchCollection: Scalars['String'];
  searchMedia?: Maybe<ConfigSearchMediaOutput>;
  searchSuggestionsCollection: Array<Scalars['String']>;
  shippingBar?: Maybe<ConfigShippingBarOutput>;
};

export type ConfigSearchMediaItemOutput = {
  __typename?: 'ConfigSearchMediaItemOutput';
  image?: Maybe<Scalars['String']>;
  orderBy?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
};

export type ConfigSearchMediaOutput = {
  __typename?: 'ConfigSearchMediaOutput';
  items: Array<ConfigSearchMediaItemOutput>;
  title?: Maybe<Scalars['String']>;
};

export type ConfigShippingBarOutput = {
  __typename?: 'ConfigShippingBarOutput';
  freeShippingValue?: Maybe<Scalars['Float']>;
  isFreeShipping?: Maybe<Scalars['Boolean']>;
};

export type ContentfulCategoryDetailOutput = {
  __typename?: 'ContentfulCategoryDetailOutput';
  id: Scalars['String'];
  name: Scalars['String'];
  parentCategoryId?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type ContentfulCategoryOutput = {
  __typename?: 'ContentfulCategoryOutput';
  fatherCategoryId?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
};

export type ContentfulCollectionOutput = {
  __typename?: 'ContentfulCollectionOutput';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  totalProducts?: Maybe<Scalars['Int']>;
};

export type ContentfulProductItemOutput = {
  __typename?: 'ContentfulProductItemOutput';
  productId: Scalars['ID'];
  productName: Scalars['String'];
};

export type DeeplinkOutput = {
  __typename?: 'DeeplinkOutput';
  active: Scalars['Boolean'];
  path: Scalars['String'];
  referenceId?: Maybe<Scalars['String']>;
};

export type DeeplinkPathInput = {
  path: Scalars['String'];
};

export type GenericOutput = {
  __typename?: 'GenericOutput';
  error: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type LoggedInOutput = {
  __typename?: 'LoggedInOutput';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  orderFormAddDiscountCoupon: OrderformOutput;
  orderFormAddGift: OrderformOutput;
  orderFormAddItem: OrderformOutput;
  orderFormAddSellerCoupon: OrderformOutput;
  orderFormAttachAddress: OrderformOutput;
  orderFormAttachClient: OrderformOutput;
  orderFormAttachClientByEmail: OrderformOutput;
  orderFormRefreshData: OrderformOutput;
  orderFormRemoveDiscountCoupon: OrderformOutput;
  orderFormRemoveGift: OrderformOutput;
  orderFormRemoveSellerCoupon: OrderformOutput;
  orderFormRemoveUnavailableItems: GenericOutput;
  orderFormSetGiftSize: OrderformOutput;
  orderFormUpdateItem: OrderformOutput;
  profile: ProfileOutput;
  profileAddress: ProfileAddressOutput;
  profileAddressRemove: Scalars['Boolean'];
  recoverPasswordReset: LoggedInOutput;
  recoverPasswordVerificationCode: RequestCodeOutput;
  refreshTokenUrl: Scalars['String'];
  removeCustomer: Scalars['Boolean'];
  sendLead: Scalars['Boolean'];
  signIn: LoggedInOutput;
  signOut: Scalars['Boolean'];
  signUp: LoggedInOutput;
  signUpVerificationCode: RequestCodeOutput;
};


export type MutationOrderFormAddDiscountCouponArgs = {
  input: OrderformAddCouponInput;
};


export type MutationOrderFormAddGiftArgs = {
  input: OrderformGiftInput;
};


export type MutationOrderFormAddItemArgs = {
  input: OrderformAddItemInput;
};


export type MutationOrderFormAddSellerCouponArgs = {
  input: OrderformAddCouponInput;
};


export type MutationOrderFormAttachAddressArgs = {
  input: OrderformSelectAddressInput;
};


export type MutationOrderFormAttachClientArgs = {
  input: OrderformAttachClientInput;
};


export type MutationOrderFormAttachClientByEmailArgs = {
  input: OrderformAttachClientByEmailInput;
};


export type MutationOrderFormRefreshDataArgs = {
  input: OrderformRefreshDataInput;
};


export type MutationOrderFormRemoveDiscountCouponArgs = {
  input: OrderformRemoveCouponInput;
};


export type MutationOrderFormRemoveGiftArgs = {
  input: OrderformGiftInput;
};


export type MutationOrderFormRemoveSellerCouponArgs = {
  input: OrderformRemoveCouponInput;
};


export type MutationOrderFormRemoveUnavailableItemsArgs = {
  input: OrderformRemoveUnavailableItemsInput;
};


export type MutationOrderFormSetGiftSizeArgs = {
  input: OrderformSetGiftSizeInput;
};


export type MutationOrderFormUpdateItemArgs = {
  input: OrderformUpdateItemInput;
};


export type MutationProfileArgs = {
  input: ProfileUpdateInput;
};


export type MutationProfileAddressArgs = {
  input: UpsertProfileAddressInput;
};


export type MutationProfileAddressRemoveArgs = {
  input: RemoveProfileAddressInput;
};


export type MutationRecoverPasswordResetArgs = {
  input: VtexUserInput;
};


export type MutationRecoverPasswordVerificationCodeArgs = {
  input: RequestVerificationCodeInput;
};


export type MutationRemoveCustomerArgs = {
  customerId: Scalars['String'];
};


export type MutationSendLeadArgs = {
  input: SendLeadInput;
};


export type MutationSignInArgs = {
  input: SignInInput;
};


export type MutationSignUpArgs = {
  input: VtexUserInput;
};


export type MutationSignUpVerificationCodeArgs = {
  input: RequestVerificationCodeInput;
};

export type OrderDetailIdInput = {
  orderId: Scalars['String'];
};

export type OrderDetailItemOfferingOutput = {
  __typename?: 'OrderDetailItemOfferingOutput';
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['String'];
  type: Scalars['String'];
};

export type OrderDetailItemOutput = {
  __typename?: 'OrderDetailItemOutput';
  commission: Scalars['Int'];
  detailUrl: Scalars['String'];
  ean: Scalars['String'];
  freightCommission: Scalars['Int'];
  id: Scalars['String'];
  imageUrl: Scalars['String'];
  isGift: Scalars['Boolean'];
  listPrice: Scalars['Int'];
  measurementUnit: Scalars['String'];
  name: Scalars['String'];
  offerings: Array<OrderDetailItemOfferingOutput>;
  price: Scalars['Int'];
  productId: Scalars['String'];
  quantity: Scalars['Int'];
  refId: Scalars['String'];
  rewardValue: Scalars['Int'];
  seller: Scalars['String'];
  sellerSku: Scalars['String'];
  sellingPrice: Scalars['Int'];
  tax: Scalars['Int'];
  uniqueId: Scalars['String'];
  unitMultiplier: Scalars['Float'];
};

export type OrderDetailOutput = {
  __typename?: 'OrderDetailOutput';
  affiliateId: Scalars['String'];
  clientProfileData: OrderDetailProfileDataOutput;
  creationDate: Scalars['String'];
  items: Array<OrderDetailItemOutput>;
  lastChange: Scalars['String'];
  marketplaceOrderId: Scalars['String'];
  orderGroup: Scalars['String'];
  orderId: Scalars['String'];
  origin: Scalars['String'];
  salesChannel: Scalars['String'];
  sellerOrderId: Scalars['String'];
  sequence: Scalars['String'];
  shippingData: OrderDetailShippingData;
  status: Scalars['String'];
  statusDescription: Scalars['String'];
  totals: Array<OrderDetailTotalOutput>;
  value: Scalars['Int'];
};

export type OrderDetailProfileDataOutput = {
  __typename?: 'OrderDetailProfileDataOutput';
  document: Scalars['String'];
  documentType: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  userProfileId: Scalars['String'];
};

export type OrderDetailShippingData = {
  __typename?: 'OrderDetailShippingData';
  address: OrderDetailShippingDataAddress;
};

export type OrderDetailShippingDataAddress = {
  __typename?: 'OrderDetailShippingDataAddress';
  addressId?: Maybe<Scalars['String']>;
  addressType?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  complement?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  geoCoordinates: Array<Scalars['Float']>;
  neighborhood?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  receiverName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type OrderDetailTotalOutput = {
  __typename?: 'OrderDetailTotalOutput';
  id: Scalars['ID'];
  name: Scalars['String'];
  value: Scalars['Int'];
};

export type OrderOutput = {
  __typename?: 'OrderOutput';
  ShippingEstimatedDateMax: Scalars['String'];
  affiliateId: Scalars['String'];
  clientName: Scalars['String'];
  creationDate: Scalars['String'];
  currencyCode: Scalars['String'];
  lastMessageUnread: Scalars['String'];
  orderFormId: Scalars['String'];
  orderId: Scalars['String'];
  origin: Scalars['String'];
  paymentNames: Scalars['String'];
  salesChannel: Scalars['String'];
  sequence: Scalars['String'];
  status: Scalars['String'];
  statusDescription: Scalars['String'];
  totalItems: Scalars['Int'];
  totalValue: Scalars['Int'];
  workflowInErrorState: Scalars['Boolean'];
  workflowInRetry: Scalars['Boolean'];
};

export type OrderPaginationOutput = {
  __typename?: 'OrderPaginationOutput';
  list: Array<OrderOutput>;
  paging: PaginationDetailOutput;
};

export type OrderformAddCouponInput = {
  coupon: Scalars['String'];
  orderFormId: Scalars['String'];
};

export type OrderformAddItemInput = {
  id: Scalars['String'];
  orderFormId: Scalars['String'];
  quantity: Scalars['Int'];
  seller: Scalars['String'];
};

export type OrderformAddressOutput = {
  __typename?: 'OrderformAddressOutput';
  addressId?: Maybe<Scalars['String']>;
  addressType?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  complement?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  geoCoordinates?: Maybe<Array<Scalars['Float']>>;
  isDisposable: Scalars['Boolean'];
  neighborhood?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  receiverName?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type OrderformAppTotalizersOutput = {
  __typename?: 'OrderformAppTotalizersOutput';
  delivery: Scalars['Float'];
  discount: Scalars['Float'];
  items: Scalars['Float'];
  total: Scalars['Float'];
};

export type OrderformAttachClientByEmailInput = {
  email: Scalars['String'];
  orderFormId: Scalars['String'];
};

export type OrderformAttachClientInput = {
  orderFormId: Scalars['String'];
};

export type OrderformClientProfileDataOutput = {
  __typename?: 'OrderformClientProfileDataOutput';
  corporateDocument?: Maybe<Scalars['String']>;
  corporateName?: Maybe<Scalars['String']>;
  corporatePhone?: Maybe<Scalars['String']>;
  document?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  profileCompleteOnLoading?: Maybe<Scalars['String']>;
  stateInscription?: Maybe<Scalars['String']>;
  tradeName?: Maybe<Scalars['String']>;
};

export type OrderformGiftInput = {
  /** This is the offering id */
  id: Scalars['String'];
  /** Product index */
  index: Scalars['Int'];
  orderFormId: Scalars['String'];
};

export type OrderformInput = {
  orderFormId?: InputMaybe<Scalars['String']>;
};

export type OrderformInstallmentInfoOutput = {
  __typename?: 'OrderformInstallmentInfoOutput';
  installmentPrice: Scalars['Float'];
  installmentsNumber: Scalars['Float'];
  totalPrice: Scalars['Float'];
};

export type OrderformItemBundleItemOutput = {
  __typename?: 'OrderformItemBundleItemOutput';
  id: Scalars['ID'];
  name: Scalars['String'];
  uniqueId: Scalars['ID'];
};

export type OrderformItemOfferingAttachmentOutput = {
  __typename?: 'OrderformItemOfferingAttachmentOutput';
  name: Scalars['String'];
  required: Scalars['Boolean'];
};

export type OrderformItemOfferingOutput = {
  __typename?: 'OrderformItemOfferingOutput';
  allowGiftMessage: Scalars['Boolean'];
  attachmentOfferings: Array<OrderformItemOfferingAttachmentOutput>;
  id: Scalars['String'];
  name: Scalars['String'];
  type: Scalars['String'];
};

export type OrderformItemOutput = {
  __typename?: 'OrderformItemOutput';
  availability: Scalars['String'];
  bundleItems: Array<OrderformItemBundleItemOutput>;
  detailUrl?: Maybe<Scalars['String']>;
  disableCounter: Scalars['Boolean'];
  discountApi?: Maybe<Scalars['Float']>;
  discountPercent: Scalars['Float'];
  ean: Scalars['String'];
  giftOfferingId?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  imageSource: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  isAddedAsGift: Scalars['Boolean'];
  isAssinaturaSimples: Scalars['Boolean'];
  isGift: Scalars['Boolean'];
  isGiftable: Scalars['Boolean'];
  itemColor: Scalars['String'];
  itemSize: Scalars['String'];
  key: Scalars['String'];
  listPrice: Scalars['Int'];
  measurementUnit: Scalars['String'];
  name: Scalars['String'];
  offerings: Array<OrderformItemOfferingOutput>;
  price: Scalars['Int'];
  priceValidUntil: Scalars['String'];
  priceWithDiscount: Scalars['Float'];
  productId: Scalars['String'];
  productRefId: Scalars['String'];
  productTitle: Scalars['String'];
  quantity: Scalars['Int'];
  refId: Scalars['String'];
  rewardValue: Scalars['Int'];
  seller: Scalars['String'];
  sellingPrice: Scalars['Int'];
  showFirstPurchaseDiscountMessage?: Maybe<Scalars['String']>;
  showTotalDiscountFirstPurchaseValue?: Maybe<Scalars['Float']>;
  skuName: Scalars['String'];
  tax: Scalars['Int'];
  uniqueId: Scalars['String'];
  unitMultiplier: Scalars['Int'];
};

export type OrderformMarketingDataOutput = {
  __typename?: 'OrderformMarketingDataOutput';
  coupon?: Maybe<Scalars['String']>;
  marketingTags: Array<Scalars['String']>;
  sellerCoupon?: Maybe<Scalars['String']>;
  sellerCouponName?: Maybe<Scalars['String']>;
  utmCampaign?: Maybe<Scalars['String']>;
  utmMedium?: Maybe<Scalars['String']>;
  utmSource?: Maybe<Scalars['String']>;
  utmiCampaign?: Maybe<Scalars['String']>;
  utmiPart?: Maybe<Scalars['String']>;
  utmipage?: Maybe<Scalars['String']>;
};

export type OrderformMessageOutput = {
  __typename?: 'OrderformMessageOutput';
  code?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
};

export type OrderformOutput = {
  __typename?: 'OrderformOutput';
  allItemsQuantity: Scalars['Int'];
  appTotalizers: OrderformAppTotalizersOutput;
  clientProfileData?: Maybe<OrderformClientProfileDataOutput>;
  installmentInfo: OrderformInstallmentInfoOutput;
  items: Array<OrderformItemOutput>;
  marketingData?: Maybe<OrderformMarketingDataOutput>;
  messages: Array<Scalars['String']>;
  messagesDetailed: Array<OrderformMessageOutput>;
  orderFormId: Scalars['ID'];
  salesChannel: Scalars['String'];
  selectableGift?: Maybe<OrderformSelectableGiftOutput>;
  shippingData?: Maybe<OrderformShippingDataOutput>;
};

export type OrderformRefreshDataInput = {
  orderFormId: Scalars['String'];
};

export type OrderformRemoveCouponInput = {
  orderFormId: Scalars['String'];
};

export type OrderformRemoveUnavailableItemsInput = {
  orderFormId: Scalars['String'];
};

export type OrderformSelectAddressInput = {
  addressId: Scalars['String'];
  orderFormId: Scalars['String'];
};

export type OrderformSelectableGiftAvailableGiftOutput = {
  __typename?: 'OrderformSelectableGiftAvailableGiftOutput';
  availability: Scalars['String'];
  detailUrl: Scalars['String'];
  ean: Scalars['String'];
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  isGift?: Maybe<Scalars['Boolean']>;
  isSelected: Scalars['Boolean'];
  measurementUnit: Scalars['String'];
  name: Scalars['String'];
  productId: Scalars['String'];
  productRefId: Scalars['String'];
  refId: Scalars['String'];
  rewardValue?: Maybe<Scalars['Float']>;
  seller: Scalars['String'];
  skuName: Scalars['String'];
  tax?: Maybe<Scalars['Float']>;
  uniqueId: Scalars['String'];
  unitMultiplier: Scalars['Float'];
};

export type OrderformSelectableGiftOptionOutput = {
  __typename?: 'OrderformSelectableGiftOptionOutput';
  color: Scalars['String'];
  id: Scalars['ID'];
  size: Scalars['String'];
};

export type OrderformSelectableGiftOutput = {
  __typename?: 'OrderformSelectableGiftOutput';
  availableGifts: Array<OrderformSelectableGiftAvailableGiftOutput>;
  availableQuantity?: Maybe<Scalars['Int']>;
  currentSelectableGift: OrderformSelectableGiftAvailableGiftOutput;
  giftOptions: Array<Maybe<OrderformSelectableGiftOptionOutput>>;
  id: Scalars['ID'];
};

export type OrderformSetGiftSizeInput = {
  giftId: Scalars['String'];
  id: Scalars['String'];
  orderFormId: Scalars['String'];
  seller: Scalars['String'];
};

export type OrderformShippingDataOutput = {
  __typename?: 'OrderformShippingDataOutput';
  address?: Maybe<OrderformAddressOutput>;
  availableAddresses: Array<OrderformAddressOutput>;
  /** @deprecated Use field `address` instead of `selectedAddresses` */
  selectedAddresses: Array<OrderformAddressOutput>;
};

export type OrderformUpdateItemInput = {
  id: Scalars['String'];
  /** Must be used if you want to set the remove the item from cart */
  index?: InputMaybe<Scalars['Int']>;
  orderFormId: Scalars['String'];
  quantity: Scalars['Int'];
  seller: Scalars['String'];
};

export type PaginationDetailOutput = {
  __typename?: 'PaginationDetailOutput';
  currentPage: Scalars['Int'];
  pages: Scalars['Int'];
  perPage: Scalars['Int'];
  total: Scalars['Int'];
};

export type PaginationInput = {
  page: Scalars['Int'];
};

export type ProductItemOutput = {
  __typename?: 'ProductItemOutput';
  images: Array<Scalars['String']>;
  itemId?: Maybe<Scalars['String']>;
  sellers: Array<ProductItemSellerOutput>;
  variations: Array<ProductItemVariationOutput>;
};

export type ProductItemSellerCommertialOfferInstallmentOutput = {
  __typename?: 'ProductItemSellerCommertialOfferInstallmentOutput';
  numberOfInstallments: Scalars['Float'];
  totalValuePlusInterestRate: Scalars['Float'];
  value: Scalars['Float'];
};

export type ProductItemSellerCommertialOfferOutput = {
  __typename?: 'ProductItemSellerCommertialOfferOutput';
  availableQuantity: Scalars['Float'];
  installments: Array<ProductItemSellerCommertialOfferInstallmentOutput>;
  listPrice: Scalars['Float'];
  price: Scalars['Float'];
  priceWithoutDiscount: Scalars['Float'];
  spotPrice: Scalars['Float'];
  tax: Scalars['Float'];
  taxPercentage: Scalars['Float'];
};

export type ProductItemSellerOutput = {
  __typename?: 'ProductItemSellerOutput';
  commertialOffer?: Maybe<ProductItemSellerCommertialOfferOutput>;
  sellerDefault?: Maybe<Scalars['Boolean']>;
  sellerId?: Maybe<Scalars['String']>;
};

export type ProductItemVariationOutput = {
  __typename?: 'ProductItemVariationOutput';
  name?: Maybe<Scalars['String']>;
  originalName?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Scalars['String']>>;
};

export type ProductOutput = {
  __typename?: 'ProductOutput';
  categoryTree?: Maybe<Array<Scalars['String']>>;
  items: Array<ProductItemOutput>;
  priceRange: ProductPriceRangeOutput;
  productId: Scalars['String'];
  productName: Scalars['String'];
};

export type ProductPriceLevelOutput = {
  __typename?: 'ProductPriceLevelOutput';
  highPrice: Scalars['Float'];
  lowPrice: Scalars['Float'];
};

export type ProductPriceRangeOutput = {
  __typename?: 'ProductPriceRangeOutput';
  listPrice: ProductPriceLevelOutput;
  sellingPrice: ProductPriceLevelOutput;
};

export type ProfileAddressOutput = {
  __typename?: 'ProfileAddressOutput';
  addressName?: Maybe<Scalars['String']>;
  addressType?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  complement?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  neighborhood?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  receiverName?: Maybe<Scalars['String']>;
  reference?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type ProfileCustomFieldOutput = {
  __typename?: 'ProfileCustomFieldOutput';
  cacheId?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type ProfileOutput = {
  __typename?: 'ProfileOutput';
  addresses: Array<Maybe<ProfileAddressOutput>>;
  authCookie?: Maybe<Scalars['String']>;
  birthDate?: Maybe<Scalars['String']>;
  customFields: Array<Maybe<ProfileCustomFieldOutput>>;
  document?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  homePhone?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isComplete: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  payments: Array<Maybe<ProfilePaymentOutput>>;
};

export type ProfilePaymentOutput = {
  __typename?: 'ProfilePaymentOutput';
  cardNumber?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

export type ProfileUpdateCustomFieldInput = {
  key: Scalars['String'];
  value?: InputMaybe<Scalars['String']>;
};

export type ProfileUpdateInput = {
  birthDate: Scalars['String'];
  customFields: Array<ProfileUpdateCustomFieldInput>;
  document: Scalars['String'];
  firstName: Scalars['String'];
  gender: Scalars['String'];
  homePhone: Scalars['String'];
  lastName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  cep?: Maybe<CepOutput>;
  checkIfUserExists: Scalars['Boolean'];
  checkSearchRedirect?: Maybe<Scalars['String']>;
  config?: Maybe<ConfigOutput>;
  contentfulCategories: Array<ContentfulCategoryOutput>;
  contentfulCategory: ContentfulCategoryDetailOutput;
  contentfulCollections: Array<ContentfulCollectionOutput>;
  contentfulProducts: Array<ContentfulProductItemOutput>;
  deeplinkPath?: Maybe<DeeplinkOutput>;
  mktinStatus: Scalars['Boolean'];
  order: OrderDetailOutput;
  orderForm: OrderformOutput;
  orders: OrderPaginationOutput;
  productRecommendations: Array<ProductOutput>;
  profile: ProfileOutput;
  ronRedirect?: Maybe<RonRedirectOutput>;
  sellerInfo?: Maybe<SellerInfoOutput>;
  sellersMktin: Array<Scalars['String']>;
};


export type QueryCepArgs = {
  input: CepInput;
};


export type QueryCheckIfUserExistsArgs = {
  input: CheckEmailInput;
};


export type QueryCheckSearchRedirectArgs = {
  q: Scalars['String'];
};


export type QueryContentfulCategoriesArgs = {
  searchKey: Scalars['String'];
};


export type QueryContentfulCategoryArgs = {
  categoryId: Scalars['String'];
};


export type QueryContentfulCollectionsArgs = {
  searchKey: Scalars['String'];
};


export type QueryContentfulProductsArgs = {
  q: Scalars['String'];
};


export type QueryDeeplinkPathArgs = {
  input: DeeplinkPathInput;
};


export type QueryOrderArgs = {
  input: OrderDetailIdInput;
};


export type QueryOrderFormArgs = {
  input?: InputMaybe<OrderformInput>;
};


export type QueryOrdersArgs = {
  input: PaginationInput;
};


export type QueryRonRedirectArgs = {
  input: RonRedirectInput;
};


export type QuerySellerInfoArgs = {
  input: SellerInfoInput;
};

export type RemoveProfileAddressInput = {
  addressId: Scalars['String'];
};

export type RequestCodeOutput = {
  __typename?: 'RequestCodeOutput';
  cookies: Array<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type RequestVerificationCodeInput = {
  email: Scalars['String'];
};

export type RonRedirectInput = {
  code: Scalars['String'];
};

export type RonRedirectOutput = {
  __typename?: 'RonRedirectOutput';
  orderFormId?: Maybe<Scalars['String']>;
  type: RonRedirectTypeEnum;
  url?: Maybe<Scalars['String']>;
};

export enum RonRedirectTypeEnum {
  Custom = 'CUSTOM',
  Orderform = 'ORDERFORM',
  Pdc = 'PDC',
  Pdp = 'PDP'
}

export type SellerInfoInput = {
  sellerId: Scalars['String'];
};

export type SellerInfoOutput = {
  __typename?: 'SellerInfoOutput';
  bannerMobile?: Maybe<Scalars['String']>;
  linkApp?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  sellerId: Scalars['ID'];
  sellerName?: Maybe<Scalars['String']>;
  texto?: Maybe<Scalars['String']>;
};

export type SendLeadInput = {
  email: Scalars['String'];
  idCampanha: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type SignInInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpsertProfileAddressInput = {
  addressId?: InputMaybe<Scalars['ID']>;
  city: Scalars['String'];
  complement?: InputMaybe<Scalars['String']>;
  country: Scalars['String'];
  neighborhood: Scalars['String'];
  number: Scalars['String'];
  postalCode: Scalars['String'];
  receiverName: Scalars['String'];
  state: Scalars['String'];
  street: Scalars['String'];
};

export type VtexUserInput = {
  code: Scalars['String'];
  cookies: Array<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AvailableGiftsFragmentFragment = { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string };

export type InitialOrderFormFragmentFragment = { __typename?: 'OrderformOutput', orderFormId: string, allItemsQuantity: number, messages: Array<string>, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, items: Array<{ __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null } | null };

export type OrderformItemFragmentFragment = { __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number };

export type OrderformSelectableGiftFragmentFragment = { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> };

export type OrderFormAddDiscountCouponMutationVariables = Exact<{
  orderFormId: Scalars['String'];
  coupon: Scalars['String'];
}>;


export type OrderFormAddDiscountCouponMutation = { __typename?: 'Mutation', orderFormAddDiscountCoupon: { __typename?: 'OrderformOutput', orderFormId: string, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number } } };

export type OrderFormAddGiftMutationVariables = Exact<{
  orderFormId: Scalars['String'];
  index: Scalars['Int'];
  id: Scalars['String'];
}>;


export type OrderFormAddGiftMutation = { __typename?: 'Mutation', orderFormAddGift: { __typename?: 'OrderformOutput', orderFormId: string, items: Array<{ __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number }> } };

export type OrderFormAddSellerCouponMutationVariables = Exact<{
  orderFormId: Scalars['String'];
  coupon: Scalars['String'];
}>;


export type OrderFormAddSellerCouponMutation = { __typename?: 'Mutation', orderFormAddSellerCoupon: { __typename?: 'OrderformOutput', orderFormId: string, marketingData?: { __typename?: 'OrderformMarketingDataOutput', marketingTags: Array<string> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number } } };

export type OrderFormAttachClientByEmailMutationVariables = Exact<{
  orderFormId: Scalars['String'];
  email: Scalars['String'];
}>;


export type OrderFormAttachClientByEmailMutation = { __typename?: 'Mutation', orderFormAttachClientByEmail: { __typename?: 'OrderformOutput', orderFormId: string } };

export type OrderFormRefreshDataMutationVariables = Exact<{
  orderFormId: Scalars['String'];
}>;


export type OrderFormRefreshDataMutation = { __typename?: 'Mutation', orderFormRefreshData: { __typename?: 'OrderformOutput', orderFormId: string, allItemsQuantity: number, messages: Array<string>, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, items: Array<{ __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null } | null } };

export type OrderFormRemoveDiscountCouponMutationVariables = Exact<{
  orderFormId: Scalars['String'];
}>;


export type OrderFormRemoveDiscountCouponMutation = { __typename?: 'Mutation', orderFormRemoveDiscountCoupon: { __typename?: 'OrderformOutput', orderFormId: string, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number } } };

export type OrderFormRemoveGiftMutationVariables = Exact<{
  orderFormId: Scalars['String'];
  index: Scalars['Int'];
  id: Scalars['String'];
}>;


export type OrderFormRemoveGiftMutation = { __typename?: 'Mutation', orderFormRemoveGift: { __typename?: 'OrderformOutput', orderFormId: string, items: Array<{ __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number }> } };

export type OrderFormRemoveSellerCouponMutationVariables = Exact<{
  orderFormId: Scalars['String'];
}>;


export type OrderFormRemoveSellerCouponMutation = { __typename?: 'Mutation', orderFormRemoveSellerCoupon: { __typename?: 'OrderformOutput', orderFormId: string, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number } } };

export type OrderFormRemoveUnavailableItemsMutationVariables = Exact<{
  orderFormId: Scalars['String'];
}>;


export type OrderFormRemoveUnavailableItemsMutation = { __typename?: 'Mutation', orderFormRemoveUnavailableItems: { __typename?: 'GenericOutput', message?: string | null, error: boolean } };

export type OrderFormSetGiftSizeMutationVariables = Exact<{
  orderFormId: Scalars['String'];
  giftId: Scalars['String'];
  id: Scalars['String'];
  seller: Scalars['String'];
}>;


export type OrderFormSetGiftSizeMutation = { __typename?: 'Mutation', orderFormSetGiftSize: { __typename?: 'OrderformOutput', orderFormId: string, allItemsQuantity: number, messages: Array<string>, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, items: Array<{ __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null } | null } };

export type OrderFormUpdateItemMutationVariables = Exact<{
  orderFormId: Scalars['String'];
  seller: Scalars['String'];
  id: Scalars['String'];
  quantity: Scalars['Int'];
  index: Scalars['Int'];
}>;


export type OrderFormUpdateItemMutation = { __typename?: 'Mutation', orderFormUpdateItem: { __typename?: 'OrderformOutput', allItemsQuantity: number, messages: Array<string>, items: Array<{ __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number }>, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number } } };

export type RemoveUserMutationMutationVariables = Exact<{
  customerId: Scalars['String'];
}>;


export type RemoveUserMutationMutation = { __typename?: 'Mutation', removeCustomer: boolean };

export type SendLeadsMutationVariables = Exact<{
  idCampanha: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
}>;


export type SendLeadsMutation = { __typename?: 'Mutation', sendLead: boolean };

export type CheckIfUserExistsQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type CheckIfUserExistsQuery = { __typename?: 'Query', checkIfUserExists: boolean };

export type CheckSearchRedirectQueryVariables = Exact<{
  q: Scalars['String'];
}>;


export type CheckSearchRedirectQuery = { __typename?: 'Query', checkSearchRedirect?: string | null };

export type ConfigShippingBarQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfigShippingBarQuery = { __typename?: 'Query', config?: { __typename?: 'ConfigOutput', shippingBar?: { __typename?: 'ConfigShippingBarOutput', freeShippingValue?: number | null, isFreeShipping?: boolean | null } | null } | null };

export type DeeplinkPathQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type DeeplinkPathQuery = { __typename?: 'Query', deeplinkPath?: { __typename?: 'DeeplinkOutput', path: string, referenceId?: string | null, active: boolean } | null };

export type InitialBagStoreQueryVariables = Exact<{
  orderFormId: Scalars['String'];
}>;


export type InitialBagStoreQuery = { __typename?: 'Query', orderForm: { __typename?: 'OrderformOutput', orderFormId: string, allItemsQuantity: number, messages: Array<string>, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, items: Array<{ __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null } | null } };

export type MktinStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type MktinStatusQuery = { __typename?: 'Query', mktinStatus: boolean };

export type ProductRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductRecommendationsQuery = { __typename?: 'Query', productRecommendations: Array<{ __typename?: 'ProductOutput', productId: string, productName: string, priceRange: { __typename?: 'ProductPriceRangeOutput', sellingPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number }, listPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number } }, items: Array<{ __typename?: 'ProductItemOutput', images: Array<string>, itemId?: string | null, variations: Array<{ __typename?: 'ProductItemVariationOutput', originalName?: string | null, name?: string | null, values?: Array<string> | null }>, sellers: Array<{ __typename?: 'ProductItemSellerOutput', sellerId?: string | null, sellerDefault?: boolean | null, commertialOffer?: { __typename?: 'ProductItemSellerCommertialOfferOutput', tax: number, taxPercentage: number, availableQuantity: number, price: number, listPrice: number, spotPrice: number, priceWithoutDiscount: number, installments: Array<{ __typename?: 'ProductItemSellerCommertialOfferInstallmentOutput', value: number, totalValuePlusInterestRate: number, numberOfInstallments: number }> } | null }> }> }> };

export type SellerInfoQueryVariables = Exact<{
  sellerId: Scalars['String'];
}>;


export type SellerInfoQuery = { __typename?: 'Query', sellerInfo?: { __typename?: 'SellerInfoOutput', sellerId: string, texto?: string | null, logo?: string | null, bannerMobile?: string | null, sellerName?: string | null, linkApp?: string | null } | null };

export type SellersMktinQueryVariables = Exact<{ [key: string]: never; }>;


export type SellersMktinQuery = { __typename?: 'Query', sellersMktin: Array<string> };

export const OrderformItemFragmentFragmentDoc = gql`
    fragment OrderformItemFragment on OrderformItemOutput {
  productTitle
  itemColor
  itemSize
  isGift
  isGiftable
  imageSource
  key
  isAssinaturaSimples
  priceWithDiscount
  discountPercent
  discountApi
  showFirstPurchaseDiscountMessage
  showTotalDiscountFirstPurchaseValue
  price
  productId
  id
  listPrice
  giftOfferingId
  seller
  skuName
  uniqueId
  isAddedAsGift
  name
  quantity
  disableCounter
  sellingPrice
}
    `;
export const AvailableGiftsFragmentFragmentDoc = gql`
    fragment AvailableGiftsFragment on OrderformSelectableGiftAvailableGiftOutput {
  isSelected
  uniqueId
  id
  productId
  productRefId
  imageUrl
  detailUrl
  availability
  measurementUnit
  unitMultiplier
  refId
  ean
  name
  skuName
  tax
  rewardValue
  isGift
  seller
}
    `;
export const OrderformSelectableGiftFragmentFragmentDoc = gql`
    fragment OrderformSelectableGiftFragment on OrderformSelectableGiftOutput {
  id
  availableQuantity
  currentSelectableGift {
    ...AvailableGiftsFragment
  }
  giftOptions {
    id
    color
    size
  }
  availableGifts {
    ...AvailableGiftsFragment
  }
}
    ${AvailableGiftsFragmentFragmentDoc}`;
export const InitialOrderFormFragmentFragmentDoc = gql`
    fragment InitialOrderFormFragment on OrderformOutput {
  orderFormId
  appTotalizers {
    items
    discount
    delivery
    total
  }
  items {
    ...OrderformItemFragment
  }
  selectableGift {
    ...OrderformSelectableGiftFragment
  }
  allItemsQuantity
  installmentInfo {
    installmentsNumber
    installmentPrice
    totalPrice
  }
  messages
  marketingData {
    coupon
    sellerCoupon
    sellerCouponName
  }
}
    ${OrderformItemFragmentFragmentDoc}
${OrderformSelectableGiftFragmentFragmentDoc}`;
export const OrderFormAddDiscountCouponDocument = gql`
    mutation orderFormAddDiscountCoupon($orderFormId: String!, $coupon: String!) {
  orderFormAddDiscountCoupon(input: {orderFormId: $orderFormId, coupon: $coupon}) {
    orderFormId
    marketingData {
      coupon
    }
    appTotalizers {
      items
      discount
      delivery
      total
    }
  }
}
    `;
export type OrderFormAddDiscountCouponMutationFn = Apollo.MutationFunction<OrderFormAddDiscountCouponMutation, OrderFormAddDiscountCouponMutationVariables>;

/**
 * __useOrderFormAddDiscountCouponMutation__
 *
 * To run a mutation, you first call `useOrderFormAddDiscountCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormAddDiscountCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormAddDiscountCouponMutation, { data, loading, error }] = useOrderFormAddDiscountCouponMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *      coupon: // value for 'coupon'
 *   },
 * });
 */
export function useOrderFormAddDiscountCouponMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormAddDiscountCouponMutation, OrderFormAddDiscountCouponMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormAddDiscountCouponMutation, OrderFormAddDiscountCouponMutationVariables>(OrderFormAddDiscountCouponDocument, options);
      }
export type OrderFormAddDiscountCouponMutationHookResult = ReturnType<typeof useOrderFormAddDiscountCouponMutation>;
export type OrderFormAddDiscountCouponMutationResult = Apollo.MutationResult<OrderFormAddDiscountCouponMutation>;
export type OrderFormAddDiscountCouponMutationOptions = Apollo.BaseMutationOptions<OrderFormAddDiscountCouponMutation, OrderFormAddDiscountCouponMutationVariables>;
export const OrderFormAddGiftDocument = gql`
    mutation orderFormAddGift($orderFormId: String!, $index: Int!, $id: String!) {
  orderFormAddGift(input: {orderFormId: $orderFormId, index: $index, id: $id}) {
    orderFormId
    items {
      ...OrderformItemFragment
    }
  }
}
    ${OrderformItemFragmentFragmentDoc}`;
export type OrderFormAddGiftMutationFn = Apollo.MutationFunction<OrderFormAddGiftMutation, OrderFormAddGiftMutationVariables>;

/**
 * __useOrderFormAddGiftMutation__
 *
 * To run a mutation, you first call `useOrderFormAddGiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormAddGiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormAddGiftMutation, { data, loading, error }] = useOrderFormAddGiftMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *      index: // value for 'index'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderFormAddGiftMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormAddGiftMutation, OrderFormAddGiftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormAddGiftMutation, OrderFormAddGiftMutationVariables>(OrderFormAddGiftDocument, options);
      }
export type OrderFormAddGiftMutationHookResult = ReturnType<typeof useOrderFormAddGiftMutation>;
export type OrderFormAddGiftMutationResult = Apollo.MutationResult<OrderFormAddGiftMutation>;
export type OrderFormAddGiftMutationOptions = Apollo.BaseMutationOptions<OrderFormAddGiftMutation, OrderFormAddGiftMutationVariables>;
export const OrderFormAddSellerCouponDocument = gql`
    mutation orderFormAddSellerCoupon($orderFormId: String!, $coupon: String!) {
  orderFormAddSellerCoupon(input: {orderFormId: $orderFormId, coupon: $coupon}) {
    orderFormId
    marketingData {
      marketingTags
    }
    appTotalizers {
      items
      discount
      delivery
      total
    }
  }
}
    `;
export type OrderFormAddSellerCouponMutationFn = Apollo.MutationFunction<OrderFormAddSellerCouponMutation, OrderFormAddSellerCouponMutationVariables>;

/**
 * __useOrderFormAddSellerCouponMutation__
 *
 * To run a mutation, you first call `useOrderFormAddSellerCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormAddSellerCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormAddSellerCouponMutation, { data, loading, error }] = useOrderFormAddSellerCouponMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *      coupon: // value for 'coupon'
 *   },
 * });
 */
export function useOrderFormAddSellerCouponMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormAddSellerCouponMutation, OrderFormAddSellerCouponMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormAddSellerCouponMutation, OrderFormAddSellerCouponMutationVariables>(OrderFormAddSellerCouponDocument, options);
      }
export type OrderFormAddSellerCouponMutationHookResult = ReturnType<typeof useOrderFormAddSellerCouponMutation>;
export type OrderFormAddSellerCouponMutationResult = Apollo.MutationResult<OrderFormAddSellerCouponMutation>;
export type OrderFormAddSellerCouponMutationOptions = Apollo.BaseMutationOptions<OrderFormAddSellerCouponMutation, OrderFormAddSellerCouponMutationVariables>;
export const OrderFormAttachClientByEmailDocument = gql`
    mutation orderFormAttachClientByEmail($orderFormId: String!, $email: String!) {
  orderFormAttachClientByEmail(input: {orderFormId: $orderFormId, email: $email}) {
    orderFormId
  }
}
    `;
export type OrderFormAttachClientByEmailMutationFn = Apollo.MutationFunction<OrderFormAttachClientByEmailMutation, OrderFormAttachClientByEmailMutationVariables>;

/**
 * __useOrderFormAttachClientByEmailMutation__
 *
 * To run a mutation, you first call `useOrderFormAttachClientByEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormAttachClientByEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormAttachClientByEmailMutation, { data, loading, error }] = useOrderFormAttachClientByEmailMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useOrderFormAttachClientByEmailMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormAttachClientByEmailMutation, OrderFormAttachClientByEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormAttachClientByEmailMutation, OrderFormAttachClientByEmailMutationVariables>(OrderFormAttachClientByEmailDocument, options);
      }
export type OrderFormAttachClientByEmailMutationHookResult = ReturnType<typeof useOrderFormAttachClientByEmailMutation>;
export type OrderFormAttachClientByEmailMutationResult = Apollo.MutationResult<OrderFormAttachClientByEmailMutation>;
export type OrderFormAttachClientByEmailMutationOptions = Apollo.BaseMutationOptions<OrderFormAttachClientByEmailMutation, OrderFormAttachClientByEmailMutationVariables>;
export const OrderFormRefreshDataDocument = gql`
    mutation orderFormRefreshData($orderFormId: String!) {
  orderFormRefreshData(input: {orderFormId: $orderFormId}) {
    ...InitialOrderFormFragment
  }
}
    ${InitialOrderFormFragmentFragmentDoc}`;
export type OrderFormRefreshDataMutationFn = Apollo.MutationFunction<OrderFormRefreshDataMutation, OrderFormRefreshDataMutationVariables>;

/**
 * __useOrderFormRefreshDataMutation__
 *
 * To run a mutation, you first call `useOrderFormRefreshDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormRefreshDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormRefreshDataMutation, { data, loading, error }] = useOrderFormRefreshDataMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *   },
 * });
 */
export function useOrderFormRefreshDataMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormRefreshDataMutation, OrderFormRefreshDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormRefreshDataMutation, OrderFormRefreshDataMutationVariables>(OrderFormRefreshDataDocument, options);
      }
export type OrderFormRefreshDataMutationHookResult = ReturnType<typeof useOrderFormRefreshDataMutation>;
export type OrderFormRefreshDataMutationResult = Apollo.MutationResult<OrderFormRefreshDataMutation>;
export type OrderFormRefreshDataMutationOptions = Apollo.BaseMutationOptions<OrderFormRefreshDataMutation, OrderFormRefreshDataMutationVariables>;
export const OrderFormRemoveDiscountCouponDocument = gql`
    mutation orderFormRemoveDiscountCoupon($orderFormId: String!) {
  orderFormRemoveDiscountCoupon(input: {orderFormId: $orderFormId}) {
    orderFormId
    appTotalizers {
      items
      discount
      delivery
      total
    }
  }
}
    `;
export type OrderFormRemoveDiscountCouponMutationFn = Apollo.MutationFunction<OrderFormRemoveDiscountCouponMutation, OrderFormRemoveDiscountCouponMutationVariables>;

/**
 * __useOrderFormRemoveDiscountCouponMutation__
 *
 * To run a mutation, you first call `useOrderFormRemoveDiscountCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormRemoveDiscountCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormRemoveDiscountCouponMutation, { data, loading, error }] = useOrderFormRemoveDiscountCouponMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *   },
 * });
 */
export function useOrderFormRemoveDiscountCouponMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormRemoveDiscountCouponMutation, OrderFormRemoveDiscountCouponMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormRemoveDiscountCouponMutation, OrderFormRemoveDiscountCouponMutationVariables>(OrderFormRemoveDiscountCouponDocument, options);
      }
export type OrderFormRemoveDiscountCouponMutationHookResult = ReturnType<typeof useOrderFormRemoveDiscountCouponMutation>;
export type OrderFormRemoveDiscountCouponMutationResult = Apollo.MutationResult<OrderFormRemoveDiscountCouponMutation>;
export type OrderFormRemoveDiscountCouponMutationOptions = Apollo.BaseMutationOptions<OrderFormRemoveDiscountCouponMutation, OrderFormRemoveDiscountCouponMutationVariables>;
export const OrderFormRemoveGiftDocument = gql`
    mutation orderFormRemoveGift($orderFormId: String!, $index: Int!, $id: String!) {
  orderFormRemoveGift(input: {orderFormId: $orderFormId, index: $index, id: $id}) {
    orderFormId
    items {
      ...OrderformItemFragment
    }
  }
}
    ${OrderformItemFragmentFragmentDoc}`;
export type OrderFormRemoveGiftMutationFn = Apollo.MutationFunction<OrderFormRemoveGiftMutation, OrderFormRemoveGiftMutationVariables>;

/**
 * __useOrderFormRemoveGiftMutation__
 *
 * To run a mutation, you first call `useOrderFormRemoveGiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormRemoveGiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormRemoveGiftMutation, { data, loading, error }] = useOrderFormRemoveGiftMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *      index: // value for 'index'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderFormRemoveGiftMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormRemoveGiftMutation, OrderFormRemoveGiftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormRemoveGiftMutation, OrderFormRemoveGiftMutationVariables>(OrderFormRemoveGiftDocument, options);
      }
export type OrderFormRemoveGiftMutationHookResult = ReturnType<typeof useOrderFormRemoveGiftMutation>;
export type OrderFormRemoveGiftMutationResult = Apollo.MutationResult<OrderFormRemoveGiftMutation>;
export type OrderFormRemoveGiftMutationOptions = Apollo.BaseMutationOptions<OrderFormRemoveGiftMutation, OrderFormRemoveGiftMutationVariables>;
export const OrderFormRemoveSellerCouponDocument = gql`
    mutation orderFormRemoveSellerCoupon($orderFormId: String!) {
  orderFormRemoveSellerCoupon(input: {orderFormId: $orderFormId}) {
    orderFormId
    appTotalizers {
      items
      discount
      delivery
      total
    }
  }
}
    `;
export type OrderFormRemoveSellerCouponMutationFn = Apollo.MutationFunction<OrderFormRemoveSellerCouponMutation, OrderFormRemoveSellerCouponMutationVariables>;

/**
 * __useOrderFormRemoveSellerCouponMutation__
 *
 * To run a mutation, you first call `useOrderFormRemoveSellerCouponMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormRemoveSellerCouponMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormRemoveSellerCouponMutation, { data, loading, error }] = useOrderFormRemoveSellerCouponMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *   },
 * });
 */
export function useOrderFormRemoveSellerCouponMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormRemoveSellerCouponMutation, OrderFormRemoveSellerCouponMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormRemoveSellerCouponMutation, OrderFormRemoveSellerCouponMutationVariables>(OrderFormRemoveSellerCouponDocument, options);
      }
export type OrderFormRemoveSellerCouponMutationHookResult = ReturnType<typeof useOrderFormRemoveSellerCouponMutation>;
export type OrderFormRemoveSellerCouponMutationResult = Apollo.MutationResult<OrderFormRemoveSellerCouponMutation>;
export type OrderFormRemoveSellerCouponMutationOptions = Apollo.BaseMutationOptions<OrderFormRemoveSellerCouponMutation, OrderFormRemoveSellerCouponMutationVariables>;
export const OrderFormRemoveUnavailableItemsDocument = gql`
    mutation orderFormRemoveUnavailableItems($orderFormId: String!) {
  orderFormRemoveUnavailableItems(input: {orderFormId: $orderFormId}) {
    message
    error
  }
}
    `;
export type OrderFormRemoveUnavailableItemsMutationFn = Apollo.MutationFunction<OrderFormRemoveUnavailableItemsMutation, OrderFormRemoveUnavailableItemsMutationVariables>;

/**
 * __useOrderFormRemoveUnavailableItemsMutation__
 *
 * To run a mutation, you first call `useOrderFormRemoveUnavailableItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormRemoveUnavailableItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormRemoveUnavailableItemsMutation, { data, loading, error }] = useOrderFormRemoveUnavailableItemsMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *   },
 * });
 */
export function useOrderFormRemoveUnavailableItemsMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormRemoveUnavailableItemsMutation, OrderFormRemoveUnavailableItemsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormRemoveUnavailableItemsMutation, OrderFormRemoveUnavailableItemsMutationVariables>(OrderFormRemoveUnavailableItemsDocument, options);
      }
export type OrderFormRemoveUnavailableItemsMutationHookResult = ReturnType<typeof useOrderFormRemoveUnavailableItemsMutation>;
export type OrderFormRemoveUnavailableItemsMutationResult = Apollo.MutationResult<OrderFormRemoveUnavailableItemsMutation>;
export type OrderFormRemoveUnavailableItemsMutationOptions = Apollo.BaseMutationOptions<OrderFormRemoveUnavailableItemsMutation, OrderFormRemoveUnavailableItemsMutationVariables>;
export const OrderFormSetGiftSizeDocument = gql`
    mutation orderFormSetGiftSize($orderFormId: String!, $giftId: String!, $id: String!, $seller: String!) {
  orderFormSetGiftSize(
    input: {orderFormId: $orderFormId, giftId: $giftId, id: $id, seller: $seller}
  ) {
    ...InitialOrderFormFragment
  }
}
    ${InitialOrderFormFragmentFragmentDoc}`;
export type OrderFormSetGiftSizeMutationFn = Apollo.MutationFunction<OrderFormSetGiftSizeMutation, OrderFormSetGiftSizeMutationVariables>;

/**
 * __useOrderFormSetGiftSizeMutation__
 *
 * To run a mutation, you first call `useOrderFormSetGiftSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormSetGiftSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormSetGiftSizeMutation, { data, loading, error }] = useOrderFormSetGiftSizeMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *      giftId: // value for 'giftId'
 *      id: // value for 'id'
 *      seller: // value for 'seller'
 *   },
 * });
 */
export function useOrderFormSetGiftSizeMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormSetGiftSizeMutation, OrderFormSetGiftSizeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormSetGiftSizeMutation, OrderFormSetGiftSizeMutationVariables>(OrderFormSetGiftSizeDocument, options);
      }
export type OrderFormSetGiftSizeMutationHookResult = ReturnType<typeof useOrderFormSetGiftSizeMutation>;
export type OrderFormSetGiftSizeMutationResult = Apollo.MutationResult<OrderFormSetGiftSizeMutation>;
export type OrderFormSetGiftSizeMutationOptions = Apollo.BaseMutationOptions<OrderFormSetGiftSizeMutation, OrderFormSetGiftSizeMutationVariables>;
export const OrderFormUpdateItemDocument = gql`
    mutation orderFormUpdateItem($orderFormId: String!, $seller: String!, $id: String!, $quantity: Int!, $index: Int!) {
  orderFormUpdateItem(
    input: {orderFormId: $orderFormId, seller: $seller, id: $id, quantity: $quantity, index: $index}
  ) {
    items {
      ...OrderformItemFragment
    }
    appTotalizers {
      items
      discount
      delivery
      total
    }
    selectableGift {
      ...OrderformSelectableGiftFragment
    }
    allItemsQuantity
    messages
    installmentInfo {
      installmentsNumber
      installmentPrice
      totalPrice
    }
  }
}
    ${OrderformItemFragmentFragmentDoc}
${OrderformSelectableGiftFragmentFragmentDoc}`;
export type OrderFormUpdateItemMutationFn = Apollo.MutationFunction<OrderFormUpdateItemMutation, OrderFormUpdateItemMutationVariables>;

/**
 * __useOrderFormUpdateItemMutation__
 *
 * To run a mutation, you first call `useOrderFormUpdateItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormUpdateItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormUpdateItemMutation, { data, loading, error }] = useOrderFormUpdateItemMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *      seller: // value for 'seller'
 *      id: // value for 'id'
 *      quantity: // value for 'quantity'
 *      index: // value for 'index'
 *   },
 * });
 */
export function useOrderFormUpdateItemMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormUpdateItemMutation, OrderFormUpdateItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormUpdateItemMutation, OrderFormUpdateItemMutationVariables>(OrderFormUpdateItemDocument, options);
      }
export type OrderFormUpdateItemMutationHookResult = ReturnType<typeof useOrderFormUpdateItemMutation>;
export type OrderFormUpdateItemMutationResult = Apollo.MutationResult<OrderFormUpdateItemMutation>;
export type OrderFormUpdateItemMutationOptions = Apollo.BaseMutationOptions<OrderFormUpdateItemMutation, OrderFormUpdateItemMutationVariables>;
export const RemoveUserMutationDocument = gql`
    mutation removeUserMutation($customerId: String!) {
  removeCustomer(customerId: $customerId)
}
    `;
export type RemoveUserMutationMutationFn = Apollo.MutationFunction<RemoveUserMutationMutation, RemoveUserMutationMutationVariables>;

/**
 * __useRemoveUserMutationMutation__
 *
 * To run a mutation, you first call `useRemoveUserMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUserMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUserMutationMutation, { data, loading, error }] = useRemoveUserMutationMutation({
 *   variables: {
 *      customerId: // value for 'customerId'
 *   },
 * });
 */
export function useRemoveUserMutationMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUserMutationMutation, RemoveUserMutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveUserMutationMutation, RemoveUserMutationMutationVariables>(RemoveUserMutationDocument, options);
      }
export type RemoveUserMutationMutationHookResult = ReturnType<typeof useRemoveUserMutationMutation>;
export type RemoveUserMutationMutationResult = Apollo.MutationResult<RemoveUserMutationMutation>;
export type RemoveUserMutationMutationOptions = Apollo.BaseMutationOptions<RemoveUserMutationMutation, RemoveUserMutationMutationVariables>;
export const SendLeadsDocument = gql`
    mutation sendLeads($idCampanha: String!, $email: String!, $name: String!, $phone: String!) {
  sendLead(
    input: {idCampanha: $idCampanha, email: $email, name: $name, phone: $phone}
  )
}
    `;
export type SendLeadsMutationFn = Apollo.MutationFunction<SendLeadsMutation, SendLeadsMutationVariables>;

/**
 * __useSendLeadsMutation__
 *
 * To run a mutation, you first call `useSendLeadsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendLeadsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendLeadsMutation, { data, loading, error }] = useSendLeadsMutation({
 *   variables: {
 *      idCampanha: // value for 'idCampanha'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      phone: // value for 'phone'
 *   },
 * });
 */
export function useSendLeadsMutation(baseOptions?: Apollo.MutationHookOptions<SendLeadsMutation, SendLeadsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendLeadsMutation, SendLeadsMutationVariables>(SendLeadsDocument, options);
      }
export type SendLeadsMutationHookResult = ReturnType<typeof useSendLeadsMutation>;
export type SendLeadsMutationResult = Apollo.MutationResult<SendLeadsMutation>;
export type SendLeadsMutationOptions = Apollo.BaseMutationOptions<SendLeadsMutation, SendLeadsMutationVariables>;
export const CheckIfUserExistsDocument = gql`
    query checkIfUserExists($email: String!) {
  checkIfUserExists(input: {email: $email})
}
    `;

/**
 * __useCheckIfUserExistsQuery__
 *
 * To run a query within a React component, call `useCheckIfUserExistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfUserExistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfUserExistsQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCheckIfUserExistsQuery(baseOptions: Apollo.QueryHookOptions<CheckIfUserExistsQuery, CheckIfUserExistsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfUserExistsQuery, CheckIfUserExistsQueryVariables>(CheckIfUserExistsDocument, options);
      }
export function useCheckIfUserExistsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfUserExistsQuery, CheckIfUserExistsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfUserExistsQuery, CheckIfUserExistsQueryVariables>(CheckIfUserExistsDocument, options);
        }
export type CheckIfUserExistsQueryHookResult = ReturnType<typeof useCheckIfUserExistsQuery>;
export type CheckIfUserExistsLazyQueryHookResult = ReturnType<typeof useCheckIfUserExistsLazyQuery>;
export type CheckIfUserExistsQueryResult = Apollo.QueryResult<CheckIfUserExistsQuery, CheckIfUserExistsQueryVariables>;
export function refetchCheckIfUserExistsQuery(variables: CheckIfUserExistsQueryVariables) {
      return { query: CheckIfUserExistsDocument, variables: variables }
    }
export const CheckSearchRedirectDocument = gql`
    query checkSearchRedirect($q: String!) {
  checkSearchRedirect(q: $q)
}
    `;

/**
 * __useCheckSearchRedirectQuery__
 *
 * To run a query within a React component, call `useCheckSearchRedirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckSearchRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckSearchRedirectQuery({
 *   variables: {
 *      q: // value for 'q'
 *   },
 * });
 */
export function useCheckSearchRedirectQuery(baseOptions: Apollo.QueryHookOptions<CheckSearchRedirectQuery, CheckSearchRedirectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckSearchRedirectQuery, CheckSearchRedirectQueryVariables>(CheckSearchRedirectDocument, options);
      }
export function useCheckSearchRedirectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckSearchRedirectQuery, CheckSearchRedirectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckSearchRedirectQuery, CheckSearchRedirectQueryVariables>(CheckSearchRedirectDocument, options);
        }
export type CheckSearchRedirectQueryHookResult = ReturnType<typeof useCheckSearchRedirectQuery>;
export type CheckSearchRedirectLazyQueryHookResult = ReturnType<typeof useCheckSearchRedirectLazyQuery>;
export type CheckSearchRedirectQueryResult = Apollo.QueryResult<CheckSearchRedirectQuery, CheckSearchRedirectQueryVariables>;
export function refetchCheckSearchRedirectQuery(variables: CheckSearchRedirectQueryVariables) {
      return { query: CheckSearchRedirectDocument, variables: variables }
    }
export const ConfigShippingBarDocument = gql`
    query configShippingBar {
  config {
    shippingBar {
      freeShippingValue
      isFreeShipping
    }
  }
}
    `;

/**
 * __useConfigShippingBarQuery__
 *
 * To run a query within a React component, call `useConfigShippingBarQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfigShippingBarQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfigShippingBarQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfigShippingBarQuery(baseOptions?: Apollo.QueryHookOptions<ConfigShippingBarQuery, ConfigShippingBarQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ConfigShippingBarQuery, ConfigShippingBarQueryVariables>(ConfigShippingBarDocument, options);
      }
export function useConfigShippingBarLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ConfigShippingBarQuery, ConfigShippingBarQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ConfigShippingBarQuery, ConfigShippingBarQueryVariables>(ConfigShippingBarDocument, options);
        }
export type ConfigShippingBarQueryHookResult = ReturnType<typeof useConfigShippingBarQuery>;
export type ConfigShippingBarLazyQueryHookResult = ReturnType<typeof useConfigShippingBarLazyQuery>;
export type ConfigShippingBarQueryResult = Apollo.QueryResult<ConfigShippingBarQuery, ConfigShippingBarQueryVariables>;
export function refetchConfigShippingBarQuery(variables?: ConfigShippingBarQueryVariables) {
      return { query: ConfigShippingBarDocument, variables: variables }
    }
export const DeeplinkPathDocument = gql`
    query deeplinkPath($path: String!) {
  deeplinkPath(input: {path: $path}) {
    path
    referenceId
    active
  }
}
    `;

/**
 * __useDeeplinkPathQuery__
 *
 * To run a query within a React component, call `useDeeplinkPathQuery` and pass it any options that fit your needs.
 * When your component renders, `useDeeplinkPathQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDeeplinkPathQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useDeeplinkPathQuery(baseOptions: Apollo.QueryHookOptions<DeeplinkPathQuery, DeeplinkPathQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DeeplinkPathQuery, DeeplinkPathQueryVariables>(DeeplinkPathDocument, options);
      }
export function useDeeplinkPathLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DeeplinkPathQuery, DeeplinkPathQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DeeplinkPathQuery, DeeplinkPathQueryVariables>(DeeplinkPathDocument, options);
        }
export type DeeplinkPathQueryHookResult = ReturnType<typeof useDeeplinkPathQuery>;
export type DeeplinkPathLazyQueryHookResult = ReturnType<typeof useDeeplinkPathLazyQuery>;
export type DeeplinkPathQueryResult = Apollo.QueryResult<DeeplinkPathQuery, DeeplinkPathQueryVariables>;
export function refetchDeeplinkPathQuery(variables: DeeplinkPathQueryVariables) {
      return { query: DeeplinkPathDocument, variables: variables }
    }
export const InitialBagStoreDocument = gql`
    query initialBagStore($orderFormId: String!) {
  orderForm(input: {orderFormId: $orderFormId}) {
    ...InitialOrderFormFragment
  }
}
    ${InitialOrderFormFragmentFragmentDoc}`;

/**
 * __useInitialBagStoreQuery__
 *
 * To run a query within a React component, call `useInitialBagStoreQuery` and pass it any options that fit your needs.
 * When your component renders, `useInitialBagStoreQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInitialBagStoreQuery({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *   },
 * });
 */
export function useInitialBagStoreQuery(baseOptions: Apollo.QueryHookOptions<InitialBagStoreQuery, InitialBagStoreQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InitialBagStoreQuery, InitialBagStoreQueryVariables>(InitialBagStoreDocument, options);
      }
export function useInitialBagStoreLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InitialBagStoreQuery, InitialBagStoreQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InitialBagStoreQuery, InitialBagStoreQueryVariables>(InitialBagStoreDocument, options);
        }
export type InitialBagStoreQueryHookResult = ReturnType<typeof useInitialBagStoreQuery>;
export type InitialBagStoreLazyQueryHookResult = ReturnType<typeof useInitialBagStoreLazyQuery>;
export type InitialBagStoreQueryResult = Apollo.QueryResult<InitialBagStoreQuery, InitialBagStoreQueryVariables>;
export function refetchInitialBagStoreQuery(variables: InitialBagStoreQueryVariables) {
      return { query: InitialBagStoreDocument, variables: variables }
    }
export const MktinStatusDocument = gql`
    query mktinStatus {
  mktinStatus
}
    `;

/**
 * __useMktinStatusQuery__
 *
 * To run a query within a React component, call `useMktinStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useMktinStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMktinStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useMktinStatusQuery(baseOptions?: Apollo.QueryHookOptions<MktinStatusQuery, MktinStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MktinStatusQuery, MktinStatusQueryVariables>(MktinStatusDocument, options);
      }
export function useMktinStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MktinStatusQuery, MktinStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MktinStatusQuery, MktinStatusQueryVariables>(MktinStatusDocument, options);
        }
export type MktinStatusQueryHookResult = ReturnType<typeof useMktinStatusQuery>;
export type MktinStatusLazyQueryHookResult = ReturnType<typeof useMktinStatusLazyQuery>;
export type MktinStatusQueryResult = Apollo.QueryResult<MktinStatusQuery, MktinStatusQueryVariables>;
export function refetchMktinStatusQuery(variables?: MktinStatusQueryVariables) {
      return { query: MktinStatusDocument, variables: variables }
    }
export const ProductRecommendationsDocument = gql`
    query productRecommendations {
  productRecommendations {
    productId
    productName
    priceRange {
      sellingPrice {
        highPrice
        lowPrice
      }
      listPrice {
        highPrice
        lowPrice
      }
    }
    items {
      images
      itemId
      variations {
        originalName
        name
        values
      }
      sellers {
        sellerId
        sellerDefault
        commertialOffer {
          tax
          taxPercentage
          availableQuantity
          price
          listPrice
          spotPrice
          priceWithoutDiscount
          installments {
            value
            totalValuePlusInterestRate
            numberOfInstallments
          }
        }
      }
    }
  }
}
    `;

/**
 * __useProductRecommendationsQuery__
 *
 * To run a query within a React component, call `useProductRecommendationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductRecommendationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductRecommendationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductRecommendationsQuery(baseOptions?: Apollo.QueryHookOptions<ProductRecommendationsQuery, ProductRecommendationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductRecommendationsQuery, ProductRecommendationsQueryVariables>(ProductRecommendationsDocument, options);
      }
export function useProductRecommendationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductRecommendationsQuery, ProductRecommendationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductRecommendationsQuery, ProductRecommendationsQueryVariables>(ProductRecommendationsDocument, options);
        }
export type ProductRecommendationsQueryHookResult = ReturnType<typeof useProductRecommendationsQuery>;
export type ProductRecommendationsLazyQueryHookResult = ReturnType<typeof useProductRecommendationsLazyQuery>;
export type ProductRecommendationsQueryResult = Apollo.QueryResult<ProductRecommendationsQuery, ProductRecommendationsQueryVariables>;
export function refetchProductRecommendationsQuery(variables?: ProductRecommendationsQueryVariables) {
      return { query: ProductRecommendationsDocument, variables: variables }
    }
export const SellerInfoDocument = gql`
    query sellerInfo($sellerId: String!) {
  sellerInfo(input: {sellerId: $sellerId}) {
    sellerId
    texto
    logo
    bannerMobile
    sellerName
    linkApp
  }
}
    `;

/**
 * __useSellerInfoQuery__
 *
 * To run a query within a React component, call `useSellerInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellerInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellerInfoQuery({
 *   variables: {
 *      sellerId: // value for 'sellerId'
 *   },
 * });
 */
export function useSellerInfoQuery(baseOptions: Apollo.QueryHookOptions<SellerInfoQuery, SellerInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SellerInfoQuery, SellerInfoQueryVariables>(SellerInfoDocument, options);
      }
export function useSellerInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SellerInfoQuery, SellerInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SellerInfoQuery, SellerInfoQueryVariables>(SellerInfoDocument, options);
        }
export type SellerInfoQueryHookResult = ReturnType<typeof useSellerInfoQuery>;
export type SellerInfoLazyQueryHookResult = ReturnType<typeof useSellerInfoLazyQuery>;
export type SellerInfoQueryResult = Apollo.QueryResult<SellerInfoQuery, SellerInfoQueryVariables>;
export function refetchSellerInfoQuery(variables: SellerInfoQueryVariables) {
      return { query: SellerInfoDocument, variables: variables }
    }
export const SellersMktinDocument = gql`
    query sellersMktin {
  sellersMktin
}
    `;

/**
 * __useSellersMktinQuery__
 *
 * To run a query within a React component, call `useSellersMktinQuery` and pass it any options that fit your needs.
 * When your component renders, `useSellersMktinQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSellersMktinQuery({
 *   variables: {
 *   },
 * });
 */
export function useSellersMktinQuery(baseOptions?: Apollo.QueryHookOptions<SellersMktinQuery, SellersMktinQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SellersMktinQuery, SellersMktinQueryVariables>(SellersMktinDocument, options);
      }
export function useSellersMktinLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SellersMktinQuery, SellersMktinQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SellersMktinQuery, SellersMktinQueryVariables>(SellersMktinDocument, options);
        }
export type SellersMktinQueryHookResult = ReturnType<typeof useSellersMktinQuery>;
export type SellersMktinLazyQueryHookResult = ReturnType<typeof useSellersMktinLazyQuery>;
export type SellersMktinQueryResult = Apollo.QueryResult<SellersMktinQuery, SellersMktinQueryVariables>;
export function refetchSellersMktinQuery(variables?: SellersMktinQueryVariables) {
      return { query: SellersMktinDocument, variables: variables }
    }
