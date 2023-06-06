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

export type CheckDeliveryTimeByProductInput = {
  id: Scalars['String'];
  postalCode: Scalars['String'];
  seller: Scalars['String'];
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

export enum GetProductTypeEnum {
  ProductId = 'PRODUCT_ID',
  SkuId = 'SKU_ID',
  Slug = 'SLUG'
}

export type LoggedInOutput = {
  __typename?: 'LoggedInOutput';
  authCookie?: Maybe<Scalars['String']>;
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  orderFormAddDiscountCoupon: OrderformOutput;
  orderFormAddGift: OrderformOutput;
  orderFormAddItem: OrderformOutput;
  orderFormAddSellerCoupon: OrderformOutput;
  orderFormAttachAddress: OrderformOutput;
  orderFormAttachClientByCookie: OrderformOutput;
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
  redefinePassword: LoggedInOutput;
  refreshToken: LoggedInOutput;
  removeCustomer: Scalars['Boolean'];
  sendLead: Scalars['Boolean'];
  signIn: LoggedInOutput;
  signOut: Scalars['Boolean'];
  signUp: LoggedInOutput;
  signUpVerificationCode: RequestCodeOutput;
  subscribeNewsletter: Scalars['Boolean'];
  wishlistAddProduct: Scalars['ID'];
  wishlistRemoveProduct: Scalars['Boolean'];
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


export type MutationOrderFormAttachClientByCookieArgs = {
  input: OrderformAttachClientByCookieInput;
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
  input: ResetVtexPasswordInput;
};


export type MutationRecoverPasswordVerificationCodeArgs = {
  input: RequestVerificationCodeInput;
};


export type MutationRedefinePasswordArgs = {
  input: RedefineVtexPasswordInput;
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
  input: SignUpUserInput;
};


export type MutationSignUpVerificationCodeArgs = {
  input: RequestVerificationCodeInput;
};


export type MutationSubscribeNewsletterArgs = {
  input: SubscribeNewsletterInput;
};


export type MutationWishlistAddProductArgs = {
  input: WishlistAddProductInput;
};


export type MutationWishlistRemoveProductArgs = {
  input: WishlistRemoveProductInput;
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

export type OrderformAttachClientByCookieInput = {
  orderFormId: Scalars['String'];
};

export type OrderformAttachClientByEmailInput = {
  email: Scalars['String'];
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
  hasPrimeSubscriptionInCart: Scalars['Boolean'];
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

export type PricePrimeInstallmentOutput = {
  __typename?: 'PricePrimeInstallmentOutput';
  number: Scalars['Float'];
  value: Scalars['Float'];
};

export type PrimeDetailOutput = {
  __typename?: 'PrimeDetailOutput';
  discountFrom: Scalars['Float'];
  discountPercentage: Scalars['Int'];
  installmentPrice: Scalars['Float'];
  installmentQty: Scalars['Int'];
  monthlyCashback: Scalars['Float'];
  productId: Scalars['Int'];
  productSeller: Scalars['String'];
};

export type PrimeInfoOutput = {
  __typename?: 'PrimeInfoOutput';
  installment: PricePrimeInstallmentOutput;
  price: Scalars['Float'];
};

export type ProductColorOutput = {
  __typename?: 'ProductColorOutput';
  colorId: Scalars['String'];
  colorUrl: Scalars['String'];
  disabled: Scalars['Boolean'];
  images: Array<Scalars['String']>;
  sizes: Array<ProductSizeOutput>;
};

export type ProductColorUrlOutput = {
  __typename?: 'ProductColorUrlOutput';
  id: Scalars['ID'];
  url: Scalars['String'];
};

export type ProductDeliveryTimeOutput = {
  __typename?: 'ProductDeliveryTimeOutput';
  estimatedDay?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  price: Scalars['Float'];
};

export type ProductInput = {
  /** Initial selected color */
  colorId?: InputMaybe<Scalars['String']>;
  /** Initial selected variant ID */
  itemId?: InputMaybe<Scalars['String']>;
  type: GetProductTypeEnum;
  value: Scalars['String'];
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
  categoryTree: Array<Scalars['String']>;
  colorUrls: Array<ProductColorUrlOutput>;
  colors: Array<ProductColorOutput>;
  disabledColors: Array<Scalars['String']>;
  initialColor?: Maybe<ProductColorOutput>;
  initialColorId?: Maybe<Scalars['String']>;
  initialSize?: Maybe<ProductSizeOutput>;
  initialSizeId?: Maybe<Scalars['String']>;
  priceRange: ProductPriceRangeOutput;
  productId: Scalars['ID'];
  productName: Scalars['String'];
  properties: ProductPropertiesOutput;
  saleOff: Scalars['Boolean'];
  share: ProductShareOutput;
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

export type ProductPropertiesOutput = {
  __typename?: 'ProductPropertiesOutput';
  composition?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  isAssinaturaSimples?: Maybe<Scalars['Boolean']>;
};

export type ProductRecommendationOutput = {
  __typename?: 'ProductRecommendationOutput';
  categoryTree?: Maybe<Array<Scalars['String']>>;
  items: Array<ProductItemOutput>;
  priceRange: ProductPriceRangeOutput;
  productId: Scalars['String'];
  productName: Scalars['String'];
};

export type ProductShareOutput = {
  __typename?: 'ProductShareOutput';
  message: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
};

export type ProductSizeInstallmentOutput = {
  __typename?: 'ProductSizeInstallmentOutput';
  number: Scalars['Int'];
  value: Scalars['Float'];
};

export type ProductSizeOutput = {
  __typename?: 'ProductSizeOutput';
  availableQuantity: Scalars['Int'];
  /** Final price (if discount exists, it's already applied) */
  currentPrice: Scalars['Float'];
  disabled: Scalars['Boolean'];
  discountPercent: Scalars['Float'];
  ean: Scalars['String'];
  hasDiscount: Scalars['Boolean'];
  installment: ProductSizeInstallmentOutput;
  itemId: Scalars['ID'];
  /** Price without discount (original price) - may be null if the original price is equal to current price */
  listPrice: Scalars['Float'];
  prime: PrimeInfoOutput;
  seller: Scalars['String'];
  size: Scalars['String'];
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
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  homePhone?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isComplete: Scalars['Boolean'];
  isPrime: Scalars['Boolean'];
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
  landingPagePrime: PrimeDetailOutput;
  mktinStatus: Scalars['Boolean'];
  order: OrderDetailOutput;
  orderForm: OrderformOutput;
  orders: OrderPaginationOutput;
  product: ProductOutput;
  productDeliveryTime: Array<ProductDeliveryTimeOutput>;
  productRecommendations: Array<ProductRecommendationOutput>;
  profile: ProfileOutput;
  ronRedirect?: Maybe<RonRedirectOutput>;
  sellerInfo?: Maybe<SellerInfoOutput>;
  sellersMktin: Array<Scalars['String']>;
  wishlistCheckProduct: WishlistCheckOutput;
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


export type QueryProductArgs = {
  input: ProductInput;
};


export type QueryProductDeliveryTimeArgs = {
  input: CheckDeliveryTimeByProductInput;
};


export type QueryRonRedirectArgs = {
  input: RonRedirectInput;
};


export type QuerySellerInfoArgs = {
  input: SellerInfoInput;
};


export type QueryWishlistCheckProductArgs = {
  input: WishlistCheckProductInput;
};

export type RedefineVtexPasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
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

export type ResetVtexPasswordInput = {
  code: Scalars['String'];
  cookies: Array<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
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
  isNewUser?: InputMaybe<Scalars['Boolean']>;
  password: Scalars['String'];
};

export enum SignUpDocumentTypeEnum {
  Cnpj = 'CNPJ',
  Cpf = 'CPF'
}

export type SignUpUserInput = {
  code: Scalars['String'];
  cookies: Array<Scalars['String']>;
  document?: InputMaybe<Scalars['String']>;
  documentType?: InputMaybe<SignUpDocumentTypeEnum>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SubscribeNewsletterInput = {
  email: Scalars['String'];
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

export type WishlistAddProductInput = {
  productId: Scalars['String'];
  skuId: Scalars['String'];
};

export type WishlistCheckOutput = {
  __typename?: 'WishlistCheckOutput';
  inList: Scalars['Boolean'];
  listIds: Array<Scalars['String']>;
};

export type WishlistCheckProductInput = {
  productId: Scalars['String'];
  skuId: Scalars['String'];
};

export type WishlistRemoveProductInput = {
  productId?: InputMaybe<Scalars['String']>;
  skuId?: InputMaybe<Scalars['String']>;
  wishlistItemId?: InputMaybe<Scalars['String']>;
};

export type AvailableGiftsFragmentFragment = { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string };

export type InitialOrderFormFragmentFragment = { __typename?: 'OrderformOutput', orderFormId: string, allItemsQuantity: number, messages: Array<string>, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, items: Array<{ __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null } | null };

export type OrderformItemFragmentFragment = { __typename?: 'OrderformItemOutput', productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, price: number, productId: string, id: string, listPrice: number, giftOfferingId?: string | null, seller: string, skuName: string, uniqueId: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice: number };

export type OrderformSelectableGiftFragmentFragment = { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> };

export type ProductColorFragmentFragment = { __typename?: 'ProductColorOutput', images: Array<string>, colorId: string, colorUrl: string, disabled: boolean, sizes: Array<{ __typename?: 'ProductSizeOutput', itemId: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } }> };

export type ProductSizeFragmentFragment = { __typename?: 'ProductSizeOutput', itemId: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } };

export type ProfileFragmentFragment = { __typename?: 'ProfileOutput', id: string, authCookie?: string | null, email: string, firstName?: string | null, lastName?: string | null, document?: string | null, birthDate?: string | null, homePhone?: string | null, gender?: string | null, isComplete: boolean, addresses: Array<{ __typename?: 'ProfileAddressOutput', id: string, receiverName?: string | null, complement?: string | null, neighborhood?: string | null, country?: string | null, state?: string | null, number?: string | null, street?: string | null, postalCode?: string | null, city?: string | null, reference?: string | null, addressName?: string | null, addressType?: string | null } | null>, customFields: Array<{ __typename?: 'ProfileCustomFieldOutput', cacheId?: string | null, key?: string | null, value?: string | null } | null>, payments: Array<{ __typename?: 'ProfilePaymentOutput', id: string, cardNumber?: string | null } | null> };

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

export type OrderFormAttachClientByCookieMutationVariables = Exact<{
  input: OrderformAttachClientByCookieInput;
}>;


export type OrderFormAttachClientByCookieMutation = { __typename?: 'Mutation', orderFormAttachClientByCookie: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, messagesDetailed: Array<{ __typename?: 'OrderformMessageOutput', code?: string | null, text?: string | null, status?: string | null }>, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, items: Array<{ __typename?: 'OrderformItemOutput', uniqueId: string, id: string, key: string, productId: string, productTitle: string, productRefId: string, refId: string, ean: string, name: string, skuName: string, seller: string, itemColor: string, itemSize: string, priceValidUntil: string, tax: number, price: number, listPrice: number, sellingPrice: number, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, rewardValue: number, isGift: boolean, isAddedAsGift: boolean, giftOfferingId?: string | null, isGiftable: boolean, disableCounter: boolean, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, quantity: number, isAssinaturaSimples: boolean, imageUrl?: string | null, detailUrl?: string | null, availability: string, measurementUnit: string, unitMultiplier: number, imageSource: string, bundleItems: Array<{ __typename?: 'OrderformItemBundleItemOutput', uniqueId: string, id: string, name: string }>, offerings: Array<{ __typename?: 'OrderformItemOfferingOutput', type: string, id: string, name: string, allowGiftMessage: boolean, attachmentOfferings: Array<{ __typename?: 'OrderformItemOfferingAttachmentOutput', name: string, required: boolean }> }> }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, seller: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null }, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, seller: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', utmSource?: string | null, utmMedium?: string | null, utmCampaign?: string | null, utmipage?: string | null, utmiPart?: string | null, utmiCampaign?: string | null, coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, marketingTags: Array<string> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null, geoCoordinates?: Array<number> | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null, geoCoordinates?: Array<number> | null }>, selectedAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null, geoCoordinates?: Array<number> | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number } } };

export type OrderFormRefreshDataMutationVariables = Exact<{
  input: OrderformRefreshDataInput;
}>;


export type OrderFormRefreshDataMutation = { __typename?: 'Mutation', orderFormRefreshData: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, messagesDetailed: Array<{ __typename?: 'OrderformMessageOutput', code?: string | null, text?: string | null, status?: string | null }>, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, items: Array<{ __typename?: 'OrderformItemOutput', uniqueId: string, id: string, key: string, productId: string, productTitle: string, productRefId: string, refId: string, ean: string, name: string, skuName: string, seller: string, itemColor: string, itemSize: string, priceValidUntil: string, tax: number, price: number, listPrice: number, sellingPrice: number, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, rewardValue: number, isGift: boolean, isAddedAsGift: boolean, giftOfferingId?: string | null, isGiftable: boolean, disableCounter: boolean, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, quantity: number, isAssinaturaSimples: boolean, imageUrl?: string | null, detailUrl?: string | null, availability: string, measurementUnit: string, unitMultiplier: number, imageSource: string, bundleItems: Array<{ __typename?: 'OrderformItemBundleItemOutput', uniqueId: string, id: string, name: string }>, offerings: Array<{ __typename?: 'OrderformItemOfferingOutput', type: string, id: string, name: string, allowGiftMessage: boolean, attachmentOfferings: Array<{ __typename?: 'OrderformItemOfferingAttachmentOutput', name: string, required: boolean }> }> }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, seller: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null }, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, seller: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', utmSource?: string | null, utmMedium?: string | null, utmCampaign?: string | null, utmipage?: string | null, utmiPart?: string | null, utmiCampaign?: string | null, coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, marketingTags: Array<string> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null, geoCoordinates?: Array<number> | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null, geoCoordinates?: Array<number> | null }>, selectedAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null, geoCoordinates?: Array<number> | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number } } };

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

export type ProfileUpdateMutationVariables = Exact<{
  input: ProfileUpdateInput;
}>;


export type ProfileUpdateMutation = { __typename?: 'Mutation', profile: { __typename?: 'ProfileOutput', id: string, authCookie?: string | null, email: string, firstName?: string | null, lastName?: string | null, document?: string | null, birthDate?: string | null, homePhone?: string | null, gender?: string | null, isComplete: boolean, addresses: Array<{ __typename?: 'ProfileAddressOutput', id: string, receiverName?: string | null, complement?: string | null, neighborhood?: string | null, country?: string | null, state?: string | null, number?: string | null, street?: string | null, postalCode?: string | null, city?: string | null, reference?: string | null, addressName?: string | null, addressType?: string | null } | null>, customFields: Array<{ __typename?: 'ProfileCustomFieldOutput', cacheId?: string | null, key?: string | null, value?: string | null } | null>, payments: Array<{ __typename?: 'ProfilePaymentOutput', id: string, cardNumber?: string | null } | null> } };

export type ProfileAddressMutationVariables = Exact<{
  input: UpsertProfileAddressInput;
}>;


export type ProfileAddressMutation = { __typename?: 'Mutation', profileAddress: { __typename?: 'ProfileAddressOutput', id: string, receiverName?: string | null, number?: string | null, city?: string | null, complement?: string | null, postalCode?: string | null, state?: string | null, street?: string | null, neighborhood?: string | null, country?: string | null, reference?: string | null, addressName?: string | null, addressType?: string | null } };

export type ProfileAddressRemoveMutationVariables = Exact<{
  input: RemoveProfileAddressInput;
}>;


export type ProfileAddressRemoveMutation = { __typename?: 'Mutation', profileAddressRemove: boolean };

export type RecoverPasswordResetMutationVariables = Exact<{
  input: ResetVtexPasswordInput;
}>;


export type RecoverPasswordResetMutation = { __typename?: 'Mutation', recoverPasswordReset: { __typename?: 'LoggedInOutput', token: string, authCookie?: string | null } };

export type RecoverPasswordVerificationCodeMutationVariables = Exact<{
  input: RequestVerificationCodeInput;
}>;


export type RecoverPasswordVerificationCodeMutation = { __typename?: 'Mutation', recoverPasswordVerificationCode: { __typename?: 'RequestCodeOutput', ok: boolean, cookies: Array<string> } };

export type RedefinePasswordMutationVariables = Exact<{
  input: RedefineVtexPasswordInput;
}>;


export type RedefinePasswordMutation = { __typename?: 'Mutation', redefinePassword: { __typename?: 'LoggedInOutput', token: string, authCookie?: string | null } };

export type RefreshTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'LoggedInOutput', token: string, authCookie?: string | null } };

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

export type SignInMutationVariables = Exact<{
  input: SignInInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'LoggedInOutput', token: string, authCookie?: string | null } };

export type SignUpMutationVariables = Exact<{
  input: SignUpUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'LoggedInOutput', token: string, authCookie?: string | null } };

export type SignUpVerificationCodeMutationVariables = Exact<{
  input: RequestVerificationCodeInput;
}>;


export type SignUpVerificationCodeMutation = { __typename?: 'Mutation', signUpVerificationCode: { __typename?: 'RequestCodeOutput', ok: boolean, cookies: Array<string> } };

export type SubscribeNewsletterMutationVariables = Exact<{
  input: SubscribeNewsletterInput;
}>;


export type SubscribeNewsletterMutation = { __typename?: 'Mutation', subscribeNewsletter: boolean };

export type WishlistAddProductMutationVariables = Exact<{
  input: WishlistAddProductInput;
}>;


export type WishlistAddProductMutation = { __typename?: 'Mutation', wishlistAddProduct: string };

export type WishlistRemoveProductMutationVariables = Exact<{
  input: WishlistRemoveProductInput;
}>;


export type WishlistRemoveProductMutation = { __typename?: 'Mutation', wishlistRemoveProduct: boolean };

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

export type LandingPagePrimeQueryVariables = Exact<{ [key: string]: never; }>;


export type LandingPagePrimeQuery = { __typename?: 'Query', landingPagePrime: { __typename?: 'PrimeDetailOutput', productId: number, productSeller: string, installmentQty: number, installmentPrice: number, monthlyCashback: number, discountFrom: number, discountPercentage: number } };

export type MktinStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type MktinStatusQuery = { __typename?: 'Query', mktinStatus: boolean };

export type ProductQueryVariables = Exact<{
  input: ProductInput;
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'ProductOutput', productId: string, productName: string, categoryTree: Array<string>, disabledColors: Array<string>, saleOff: boolean, priceRange: { __typename?: 'ProductPriceRangeOutput', sellingPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number }, listPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number } }, share: { __typename?: 'ProductShareOutput', title: string, message: string, url: string }, properties: { __typename?: 'ProductPropertiesOutput', description?: string | null, isAssinaturaSimples?: boolean | null, composition?: string | null }, colorUrls: Array<{ __typename?: 'ProductColorUrlOutput', id: string, url: string }>, colors: Array<{ __typename?: 'ProductColorOutput', images: Array<string>, colorId: string, colorUrl: string, disabled: boolean, sizes: Array<{ __typename?: 'ProductSizeOutput', itemId: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } }> }>, initialColor?: { __typename?: 'ProductColorOutput', images: Array<string>, colorId: string, colorUrl: string, disabled: boolean, sizes: Array<{ __typename?: 'ProductSizeOutput', itemId: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } }> } | null, initialSize?: { __typename?: 'ProductSizeOutput', itemId: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } } | null } };

export type ProductDeliveryTimeQueryVariables = Exact<{
  input: CheckDeliveryTimeByProductInput;
}>;


export type ProductDeliveryTimeQuery = { __typename?: 'Query', productDeliveryTime: Array<{ __typename?: 'ProductDeliveryTimeOutput', name: string, price: number, estimatedDay?: string | null }> };

export type ProductRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductRecommendationsQuery = { __typename?: 'Query', productRecommendations: Array<{ __typename?: 'ProductRecommendationOutput', productId: string, productName: string, priceRange: { __typename?: 'ProductPriceRangeOutput', sellingPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number }, listPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number } }, items: Array<{ __typename?: 'ProductItemOutput', images: Array<string>, itemId?: string | null, variations: Array<{ __typename?: 'ProductItemVariationOutput', originalName?: string | null, name?: string | null, values?: Array<string> | null }>, sellers: Array<{ __typename?: 'ProductItemSellerOutput', sellerId?: string | null, sellerDefault?: boolean | null, commertialOffer?: { __typename?: 'ProductItemSellerCommertialOfferOutput', tax: number, taxPercentage: number, availableQuantity: number, price: number, listPrice: number, spotPrice: number, priceWithoutDiscount: number, installments: Array<{ __typename?: 'ProductItemSellerCommertialOfferInstallmentOutput', value: number, totalValuePlusInterestRate: number, numberOfInstallments: number }> } | null }> }> }> };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'ProfileOutput', id: string, authCookie?: string | null, email: string, firstName?: string | null, lastName?: string | null, document?: string | null, birthDate?: string | null, homePhone?: string | null, gender?: string | null, isComplete: boolean, addresses: Array<{ __typename?: 'ProfileAddressOutput', id: string, receiverName?: string | null, complement?: string | null, neighborhood?: string | null, country?: string | null, state?: string | null, number?: string | null, street?: string | null, postalCode?: string | null, city?: string | null, reference?: string | null, addressName?: string | null, addressType?: string | null } | null>, customFields: Array<{ __typename?: 'ProfileCustomFieldOutput', cacheId?: string | null, key?: string | null, value?: string | null } | null>, payments: Array<{ __typename?: 'ProfilePaymentOutput', id: string, cardNumber?: string | null } | null> } };

export type RonRedirectQueryVariables = Exact<{
  code: Scalars['String'];
}>;


export type RonRedirectQuery = { __typename?: 'Query', ronRedirect?: { __typename?: 'RonRedirectOutput', type: RonRedirectTypeEnum, url?: string | null, orderFormId?: string | null } | null };

export type SellerInfoQueryVariables = Exact<{
  sellerId: Scalars['String'];
}>;


export type SellerInfoQuery = { __typename?: 'Query', sellerInfo?: { __typename?: 'SellerInfoOutput', sellerId: string, texto?: string | null, logo?: string | null, bannerMobile?: string | null, sellerName?: string | null, linkApp?: string | null } | null };

export type SellersMktinQueryVariables = Exact<{ [key: string]: never; }>;


export type SellersMktinQuery = { __typename?: 'Query', sellersMktin: Array<string> };

export type WishlistCheckProductQueryVariables = Exact<{
  input: WishlistCheckProductInput;
}>;


export type WishlistCheckProductQuery = { __typename?: 'Query', wishlistCheckProduct: { __typename?: 'WishlistCheckOutput', inList: boolean, listIds: Array<string> } };

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
export const ProductSizeFragmentFragmentDoc = gql`
    fragment productSizeFragment on ProductSizeOutput {
  itemId
  size
  ean
  seller
  listPrice
  currentPrice
  discountPercent
  hasDiscount
  availableQuantity
  installment {
    value
    number
  }
  disabled
}
    `;
export const ProductColorFragmentFragmentDoc = gql`
    fragment productColorFragment on ProductColorOutput {
  images
  colorId
  colorUrl
  disabled
  sizes {
    ...productSizeFragment
  }
}
    ${ProductSizeFragmentFragmentDoc}`;
export const ProfileFragmentFragmentDoc = gql`
    fragment ProfileFragment on ProfileOutput {
  id
  authCookie
  email
  firstName
  lastName
  document
  birthDate
  homePhone
  gender
  isComplete
  addresses {
    id
    receiverName
    complement
    neighborhood
    country
    state
    number
    street
    postalCode
    city
    reference
    addressName
    addressType
  }
  customFields {
    cacheId
    key
    value
  }
  payments {
    id
    cardNumber
  }
}
    `;
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
export const OrderFormAttachClientByCookieDocument = gql`
    mutation orderFormAttachClientByCookie($input: OrderformAttachClientByCookieInput!) {
  orderFormAttachClientByCookie(input: $input) {
    orderFormId
    salesChannel
    messagesDetailed {
      code
      text
      status
    }
    messages
    clientProfileData {
      email
      firstName
      lastName
      document
      phone
      corporateName
      tradeName
      corporateDocument
      stateInscription
      corporatePhone
      profileCompleteOnLoading
    }
    items {
      uniqueId
      id
      key
      productId
      productTitle
      productRefId
      refId
      ean
      name
      skuName
      seller
      itemColor
      itemSize
      priceValidUntil
      tax
      price
      listPrice
      sellingPrice
      priceWithDiscount
      discountPercent
      discountApi
      rewardValue
      isGift
      isAddedAsGift
      giftOfferingId
      isGiftable
      disableCounter
      showFirstPurchaseDiscountMessage
      showTotalDiscountFirstPurchaseValue
      quantity
      isAssinaturaSimples
      imageUrl
      detailUrl
      bundleItems {
        uniqueId
        id
        name
      }
      offerings {
        type
        id
        name
        allowGiftMessage
        attachmentOfferings {
          name
          required
        }
      }
      availability
      measurementUnit
      unitMultiplier
      imageSource
    }
    selectableGift {
      id
      availableQuantity
      giftOptions {
        id
        color
        size
      }
      currentSelectableGift {
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
        seller
        tax
        rewardValue
        isGift
      }
      availableGifts {
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
        seller
        tax
        rewardValue
        isGift
      }
    }
    marketingData {
      utmSource
      utmMedium
      utmCampaign
      utmipage
      utmiPart
      utmiCampaign
      coupon
      sellerCoupon
      sellerCouponName
      marketingTags
    }
    shippingData {
      address {
        addressType
        receiverName
        addressId
        isDisposable
        postalCode
        city
        state
        country
        street
        number
        neighborhood
        complement
        reference
        geoCoordinates
      }
      availableAddresses {
        addressType
        receiverName
        addressId
        isDisposable
        postalCode
        city
        state
        country
        street
        number
        neighborhood
        complement
        reference
        geoCoordinates
      }
      selectedAddresses {
        addressType
        receiverName
        addressId
        isDisposable
        postalCode
        city
        state
        country
        street
        number
        neighborhood
        complement
        reference
        geoCoordinates
      }
    }
    appTotalizers {
      items
      discount
      delivery
      total
    }
    installmentInfo {
      installmentsNumber
      installmentPrice
      totalPrice
    }
    allItemsQuantity
  }
}
    `;
export type OrderFormAttachClientByCookieMutationFn = Apollo.MutationFunction<OrderFormAttachClientByCookieMutation, OrderFormAttachClientByCookieMutationVariables>;

/**
 * __useOrderFormAttachClientByCookieMutation__
 *
 * To run a mutation, you first call `useOrderFormAttachClientByCookieMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormAttachClientByCookieMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormAttachClientByCookieMutation, { data, loading, error }] = useOrderFormAttachClientByCookieMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderFormAttachClientByCookieMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormAttachClientByCookieMutation, OrderFormAttachClientByCookieMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormAttachClientByCookieMutation, OrderFormAttachClientByCookieMutationVariables>(OrderFormAttachClientByCookieDocument, options);
      }
export type OrderFormAttachClientByCookieMutationHookResult = ReturnType<typeof useOrderFormAttachClientByCookieMutation>;
export type OrderFormAttachClientByCookieMutationResult = Apollo.MutationResult<OrderFormAttachClientByCookieMutation>;
export type OrderFormAttachClientByCookieMutationOptions = Apollo.BaseMutationOptions<OrderFormAttachClientByCookieMutation, OrderFormAttachClientByCookieMutationVariables>;
export const OrderFormRefreshDataDocument = gql`
    mutation orderFormRefreshData($input: OrderformRefreshDataInput!) {
  orderFormRefreshData(input: $input) {
    orderFormId
    salesChannel
    messagesDetailed {
      code
      text
      status
    }
    messages
    clientProfileData {
      email
      firstName
      lastName
      document
      phone
      corporateName
      tradeName
      corporateDocument
      stateInscription
      corporatePhone
      profileCompleteOnLoading
    }
    items {
      uniqueId
      id
      key
      productId
      productTitle
      productRefId
      refId
      ean
      name
      skuName
      seller
      itemColor
      itemSize
      priceValidUntil
      tax
      price
      listPrice
      sellingPrice
      priceWithDiscount
      discountPercent
      discountApi
      rewardValue
      isGift
      isAddedAsGift
      giftOfferingId
      isGiftable
      disableCounter
      showFirstPurchaseDiscountMessage
      showTotalDiscountFirstPurchaseValue
      quantity
      isAssinaturaSimples
      imageUrl
      detailUrl
      bundleItems {
        uniqueId
        id
        name
      }
      offerings {
        type
        id
        name
        allowGiftMessage
        attachmentOfferings {
          name
          required
        }
      }
      availability
      measurementUnit
      unitMultiplier
      imageSource
    }
    selectableGift {
      id
      availableQuantity
      giftOptions {
        id
        color
        size
      }
      currentSelectableGift {
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
        seller
        tax
        rewardValue
        isGift
      }
      availableGifts {
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
        seller
        tax
        rewardValue
        isGift
      }
    }
    marketingData {
      utmSource
      utmMedium
      utmCampaign
      utmipage
      utmiPart
      utmiCampaign
      coupon
      sellerCoupon
      sellerCouponName
      marketingTags
    }
    shippingData {
      address {
        addressType
        receiverName
        addressId
        isDisposable
        postalCode
        city
        state
        country
        street
        number
        neighborhood
        complement
        reference
        geoCoordinates
      }
      availableAddresses {
        addressType
        receiverName
        addressId
        isDisposable
        postalCode
        city
        state
        country
        street
        number
        neighborhood
        complement
        reference
        geoCoordinates
      }
      selectedAddresses {
        addressType
        receiverName
        addressId
        isDisposable
        postalCode
        city
        state
        country
        street
        number
        neighborhood
        complement
        reference
        geoCoordinates
      }
    }
    appTotalizers {
      items
      discount
      delivery
      total
    }
    installmentInfo {
      installmentsNumber
      installmentPrice
      totalPrice
    }
    allItemsQuantity
  }
}
    `;
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
 *      input: // value for 'input'
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
export const ProfileUpdateDocument = gql`
    mutation profileUpdate($input: ProfileUpdateInput!) {
  profile(input: $input) {
    ...ProfileFragment
  }
}
    ${ProfileFragmentFragmentDoc}`;
export type ProfileUpdateMutationFn = Apollo.MutationFunction<ProfileUpdateMutation, ProfileUpdateMutationVariables>;

/**
 * __useProfileUpdateMutation__
 *
 * To run a mutation, you first call `useProfileUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileUpdateMutation, { data, loading, error }] = useProfileUpdateMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProfileUpdateMutation(baseOptions?: Apollo.MutationHookOptions<ProfileUpdateMutation, ProfileUpdateMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProfileUpdateMutation, ProfileUpdateMutationVariables>(ProfileUpdateDocument, options);
      }
export type ProfileUpdateMutationHookResult = ReturnType<typeof useProfileUpdateMutation>;
export type ProfileUpdateMutationResult = Apollo.MutationResult<ProfileUpdateMutation>;
export type ProfileUpdateMutationOptions = Apollo.BaseMutationOptions<ProfileUpdateMutation, ProfileUpdateMutationVariables>;
export const ProfileAddressDocument = gql`
    mutation profileAddress($input: UpsertProfileAddressInput!) {
  profileAddress(input: $input) {
    id
    receiverName
    number
    city
    complement
    postalCode
    state
    street
    neighborhood
    country
    reference
    addressName
    addressType
  }
}
    `;
export type ProfileAddressMutationFn = Apollo.MutationFunction<ProfileAddressMutation, ProfileAddressMutationVariables>;

/**
 * __useProfileAddressMutation__
 *
 * To run a mutation, you first call `useProfileAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileAddressMutation, { data, loading, error }] = useProfileAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProfileAddressMutation(baseOptions?: Apollo.MutationHookOptions<ProfileAddressMutation, ProfileAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProfileAddressMutation, ProfileAddressMutationVariables>(ProfileAddressDocument, options);
      }
export type ProfileAddressMutationHookResult = ReturnType<typeof useProfileAddressMutation>;
export type ProfileAddressMutationResult = Apollo.MutationResult<ProfileAddressMutation>;
export type ProfileAddressMutationOptions = Apollo.BaseMutationOptions<ProfileAddressMutation, ProfileAddressMutationVariables>;
export const ProfileAddressRemoveDocument = gql`
    mutation profileAddressRemove($input: RemoveProfileAddressInput!) {
  profileAddressRemove(input: $input)
}
    `;
export type ProfileAddressRemoveMutationFn = Apollo.MutationFunction<ProfileAddressRemoveMutation, ProfileAddressRemoveMutationVariables>;

/**
 * __useProfileAddressRemoveMutation__
 *
 * To run a mutation, you first call `useProfileAddressRemoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProfileAddressRemoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [profileAddressRemoveMutation, { data, loading, error }] = useProfileAddressRemoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProfileAddressRemoveMutation(baseOptions?: Apollo.MutationHookOptions<ProfileAddressRemoveMutation, ProfileAddressRemoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProfileAddressRemoveMutation, ProfileAddressRemoveMutationVariables>(ProfileAddressRemoveDocument, options);
      }
export type ProfileAddressRemoveMutationHookResult = ReturnType<typeof useProfileAddressRemoveMutation>;
export type ProfileAddressRemoveMutationResult = Apollo.MutationResult<ProfileAddressRemoveMutation>;
export type ProfileAddressRemoveMutationOptions = Apollo.BaseMutationOptions<ProfileAddressRemoveMutation, ProfileAddressRemoveMutationVariables>;
export const RecoverPasswordResetDocument = gql`
    mutation recoverPasswordReset($input: ResetVtexPasswordInput!) {
  recoverPasswordReset(input: $input) {
    token
    authCookie
  }
}
    `;
export type RecoverPasswordResetMutationFn = Apollo.MutationFunction<RecoverPasswordResetMutation, RecoverPasswordResetMutationVariables>;

/**
 * __useRecoverPasswordResetMutation__
 *
 * To run a mutation, you first call `useRecoverPasswordResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecoverPasswordResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recoverPasswordResetMutation, { data, loading, error }] = useRecoverPasswordResetMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecoverPasswordResetMutation(baseOptions?: Apollo.MutationHookOptions<RecoverPasswordResetMutation, RecoverPasswordResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecoverPasswordResetMutation, RecoverPasswordResetMutationVariables>(RecoverPasswordResetDocument, options);
      }
export type RecoverPasswordResetMutationHookResult = ReturnType<typeof useRecoverPasswordResetMutation>;
export type RecoverPasswordResetMutationResult = Apollo.MutationResult<RecoverPasswordResetMutation>;
export type RecoverPasswordResetMutationOptions = Apollo.BaseMutationOptions<RecoverPasswordResetMutation, RecoverPasswordResetMutationVariables>;
export const RecoverPasswordVerificationCodeDocument = gql`
    mutation recoverPasswordVerificationCode($input: RequestVerificationCodeInput!) {
  recoverPasswordVerificationCode(input: $input) {
    ok
    cookies
  }
}
    `;
export type RecoverPasswordVerificationCodeMutationFn = Apollo.MutationFunction<RecoverPasswordVerificationCodeMutation, RecoverPasswordVerificationCodeMutationVariables>;

/**
 * __useRecoverPasswordVerificationCodeMutation__
 *
 * To run a mutation, you first call `useRecoverPasswordVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRecoverPasswordVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [recoverPasswordVerificationCodeMutation, { data, loading, error }] = useRecoverPasswordVerificationCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecoverPasswordVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<RecoverPasswordVerificationCodeMutation, RecoverPasswordVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RecoverPasswordVerificationCodeMutation, RecoverPasswordVerificationCodeMutationVariables>(RecoverPasswordVerificationCodeDocument, options);
      }
export type RecoverPasswordVerificationCodeMutationHookResult = ReturnType<typeof useRecoverPasswordVerificationCodeMutation>;
export type RecoverPasswordVerificationCodeMutationResult = Apollo.MutationResult<RecoverPasswordVerificationCodeMutation>;
export type RecoverPasswordVerificationCodeMutationOptions = Apollo.BaseMutationOptions<RecoverPasswordVerificationCodeMutation, RecoverPasswordVerificationCodeMutationVariables>;
export const RedefinePasswordDocument = gql`
    mutation redefinePassword($input: RedefineVtexPasswordInput!) {
  redefinePassword(input: $input) {
    token
    authCookie
  }
}
    `;
export type RedefinePasswordMutationFn = Apollo.MutationFunction<RedefinePasswordMutation, RedefinePasswordMutationVariables>;

/**
 * __useRedefinePasswordMutation__
 *
 * To run a mutation, you first call `useRedefinePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRedefinePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [redefinePasswordMutation, { data, loading, error }] = useRedefinePasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRedefinePasswordMutation(baseOptions?: Apollo.MutationHookOptions<RedefinePasswordMutation, RedefinePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RedefinePasswordMutation, RedefinePasswordMutationVariables>(RedefinePasswordDocument, options);
      }
export type RedefinePasswordMutationHookResult = ReturnType<typeof useRedefinePasswordMutation>;
export type RedefinePasswordMutationResult = Apollo.MutationResult<RedefinePasswordMutation>;
export type RedefinePasswordMutationOptions = Apollo.BaseMutationOptions<RedefinePasswordMutation, RedefinePasswordMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken {
  refreshToken {
    token
    authCookie
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: Apollo.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
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
export const SignInDocument = gql`
    mutation signIn($input: SignInInput!) {
  signIn(input: $input) {
    token
    authCookie
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($input: SignUpUserInput!) {
  signUp(input: $input) {
    token
    authCookie
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignUpVerificationCodeDocument = gql`
    mutation signUpVerificationCode($input: RequestVerificationCodeInput!) {
  signUpVerificationCode(input: $input) {
    ok
    cookies
  }
}
    `;
export type SignUpVerificationCodeMutationFn = Apollo.MutationFunction<SignUpVerificationCodeMutation, SignUpVerificationCodeMutationVariables>;

/**
 * __useSignUpVerificationCodeMutation__
 *
 * To run a mutation, you first call `useSignUpVerificationCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpVerificationCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpVerificationCodeMutation, { data, loading, error }] = useSignUpVerificationCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpVerificationCodeMutation(baseOptions?: Apollo.MutationHookOptions<SignUpVerificationCodeMutation, SignUpVerificationCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpVerificationCodeMutation, SignUpVerificationCodeMutationVariables>(SignUpVerificationCodeDocument, options);
      }
export type SignUpVerificationCodeMutationHookResult = ReturnType<typeof useSignUpVerificationCodeMutation>;
export type SignUpVerificationCodeMutationResult = Apollo.MutationResult<SignUpVerificationCodeMutation>;
export type SignUpVerificationCodeMutationOptions = Apollo.BaseMutationOptions<SignUpVerificationCodeMutation, SignUpVerificationCodeMutationVariables>;
export const SubscribeNewsletterDocument = gql`
    mutation subscribeNewsletter($input: SubscribeNewsletterInput!) {
  subscribeNewsletter(input: $input)
}
    `;
export type SubscribeNewsletterMutationFn = Apollo.MutationFunction<SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables>;

/**
 * __useSubscribeNewsletterMutation__
 *
 * To run a mutation, you first call `useSubscribeNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeNewsletterMutation, { data, loading, error }] = useSubscribeNewsletterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubscribeNewsletterMutation(baseOptions?: Apollo.MutationHookOptions<SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables>(SubscribeNewsletterDocument, options);
      }
export type SubscribeNewsletterMutationHookResult = ReturnType<typeof useSubscribeNewsletterMutation>;
export type SubscribeNewsletterMutationResult = Apollo.MutationResult<SubscribeNewsletterMutation>;
export type SubscribeNewsletterMutationOptions = Apollo.BaseMutationOptions<SubscribeNewsletterMutation, SubscribeNewsletterMutationVariables>;
export const WishlistAddProductDocument = gql`
    mutation wishlistAddProduct($input: WishlistAddProductInput!) {
  wishlistAddProduct(input: $input)
}
    `;
export type WishlistAddProductMutationFn = Apollo.MutationFunction<WishlistAddProductMutation, WishlistAddProductMutationVariables>;

/**
 * __useWishlistAddProductMutation__
 *
 * To run a mutation, you first call `useWishlistAddProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWishlistAddProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [wishlistAddProductMutation, { data, loading, error }] = useWishlistAddProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useWishlistAddProductMutation(baseOptions?: Apollo.MutationHookOptions<WishlistAddProductMutation, WishlistAddProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WishlistAddProductMutation, WishlistAddProductMutationVariables>(WishlistAddProductDocument, options);
      }
export type WishlistAddProductMutationHookResult = ReturnType<typeof useWishlistAddProductMutation>;
export type WishlistAddProductMutationResult = Apollo.MutationResult<WishlistAddProductMutation>;
export type WishlistAddProductMutationOptions = Apollo.BaseMutationOptions<WishlistAddProductMutation, WishlistAddProductMutationVariables>;
export const WishlistRemoveProductDocument = gql`
    mutation wishlistRemoveProduct($input: WishlistRemoveProductInput!) {
  wishlistRemoveProduct(input: $input)
}
    `;
export type WishlistRemoveProductMutationFn = Apollo.MutationFunction<WishlistRemoveProductMutation, WishlistRemoveProductMutationVariables>;

/**
 * __useWishlistRemoveProductMutation__
 *
 * To run a mutation, you first call `useWishlistRemoveProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWishlistRemoveProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [wishlistRemoveProductMutation, { data, loading, error }] = useWishlistRemoveProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useWishlistRemoveProductMutation(baseOptions?: Apollo.MutationHookOptions<WishlistRemoveProductMutation, WishlistRemoveProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WishlistRemoveProductMutation, WishlistRemoveProductMutationVariables>(WishlistRemoveProductDocument, options);
      }
export type WishlistRemoveProductMutationHookResult = ReturnType<typeof useWishlistRemoveProductMutation>;
export type WishlistRemoveProductMutationResult = Apollo.MutationResult<WishlistRemoveProductMutation>;
export type WishlistRemoveProductMutationOptions = Apollo.BaseMutationOptions<WishlistRemoveProductMutation, WishlistRemoveProductMutationVariables>;
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
export const LandingPagePrimeDocument = gql`
    query landingPagePrime {
  landingPagePrime {
    productId
    productSeller
    installmentQty
    installmentPrice
    monthlyCashback
    discountFrom
    discountPercentage
  }
}
    `;

/**
 * __useLandingPagePrimeQuery__
 *
 * To run a query within a React component, call `useLandingPagePrimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingPagePrimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingPagePrimeQuery({
 *   variables: {
 *   },
 * });
 */
export function useLandingPagePrimeQuery(baseOptions?: Apollo.QueryHookOptions<LandingPagePrimeQuery, LandingPagePrimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LandingPagePrimeQuery, LandingPagePrimeQueryVariables>(LandingPagePrimeDocument, options);
      }
export function useLandingPagePrimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LandingPagePrimeQuery, LandingPagePrimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LandingPagePrimeQuery, LandingPagePrimeQueryVariables>(LandingPagePrimeDocument, options);
        }
export type LandingPagePrimeQueryHookResult = ReturnType<typeof useLandingPagePrimeQuery>;
export type LandingPagePrimeLazyQueryHookResult = ReturnType<typeof useLandingPagePrimeLazyQuery>;
export type LandingPagePrimeQueryResult = Apollo.QueryResult<LandingPagePrimeQuery, LandingPagePrimeQueryVariables>;
export function refetchLandingPagePrimeQuery(variables?: LandingPagePrimeQueryVariables) {
      return { query: LandingPagePrimeDocument, variables: variables }
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
export const ProductDocument = gql`
    query product($input: ProductInput!) {
  product(input: $input) {
    productId
    productName
    categoryTree
    disabledColors
    saleOff
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
    share {
      title
      message
      url
    }
    properties {
      description
      isAssinaturaSimples
      composition
    }
    colorUrls {
      id
      url
    }
    colors {
      ...productColorFragment
    }
    initialColor {
      ...productColorFragment
    }
    initialSize {
      ...productSizeFragment
    }
  }
}
    ${ProductColorFragmentFragmentDoc}
${ProductSizeFragmentFragmentDoc}`;

/**
 * __useProductQuery__
 *
 * To run a query within a React component, call `useProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProductQuery(baseOptions: Apollo.QueryHookOptions<ProductQuery, ProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
      }
export function useProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductQuery, ProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductQuery, ProductQueryVariables>(ProductDocument, options);
        }
export type ProductQueryHookResult = ReturnType<typeof useProductQuery>;
export type ProductLazyQueryHookResult = ReturnType<typeof useProductLazyQuery>;
export type ProductQueryResult = Apollo.QueryResult<ProductQuery, ProductQueryVariables>;
export function refetchProductQuery(variables: ProductQueryVariables) {
      return { query: ProductDocument, variables: variables }
    }
export const ProductDeliveryTimeDocument = gql`
    query productDeliveryTime($input: CheckDeliveryTimeByProductInput!) {
  productDeliveryTime(input: $input) {
    name
    price
    estimatedDay
  }
}
    `;

/**
 * __useProductDeliveryTimeQuery__
 *
 * To run a query within a React component, call `useProductDeliveryTimeQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDeliveryTimeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDeliveryTimeQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useProductDeliveryTimeQuery(baseOptions: Apollo.QueryHookOptions<ProductDeliveryTimeQuery, ProductDeliveryTimeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductDeliveryTimeQuery, ProductDeliveryTimeQueryVariables>(ProductDeliveryTimeDocument, options);
      }
export function useProductDeliveryTimeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductDeliveryTimeQuery, ProductDeliveryTimeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductDeliveryTimeQuery, ProductDeliveryTimeQueryVariables>(ProductDeliveryTimeDocument, options);
        }
export type ProductDeliveryTimeQueryHookResult = ReturnType<typeof useProductDeliveryTimeQuery>;
export type ProductDeliveryTimeLazyQueryHookResult = ReturnType<typeof useProductDeliveryTimeLazyQuery>;
export type ProductDeliveryTimeQueryResult = Apollo.QueryResult<ProductDeliveryTimeQuery, ProductDeliveryTimeQueryVariables>;
export function refetchProductDeliveryTimeQuery(variables: ProductDeliveryTimeQueryVariables) {
      return { query: ProductDeliveryTimeDocument, variables: variables }
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
export const ProfileDocument = gql`
    query profile {
  profile {
    ...ProfileFragment
  }
}
    ${ProfileFragmentFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useProfileQuery(baseOptions?: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export function refetchProfileQuery(variables?: ProfileQueryVariables) {
      return { query: ProfileDocument, variables: variables }
    }
export const RonRedirectDocument = gql`
    query ronRedirect($code: String!) {
  ronRedirect(input: {code: $code}) {
    type
    url
    orderFormId
  }
}
    `;

/**
 * __useRonRedirectQuery__
 *
 * To run a query within a React component, call `useRonRedirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useRonRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRonRedirectQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useRonRedirectQuery(baseOptions: Apollo.QueryHookOptions<RonRedirectQuery, RonRedirectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RonRedirectQuery, RonRedirectQueryVariables>(RonRedirectDocument, options);
      }
export function useRonRedirectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RonRedirectQuery, RonRedirectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RonRedirectQuery, RonRedirectQueryVariables>(RonRedirectDocument, options);
        }
export type RonRedirectQueryHookResult = ReturnType<typeof useRonRedirectQuery>;
export type RonRedirectLazyQueryHookResult = ReturnType<typeof useRonRedirectLazyQuery>;
export type RonRedirectQueryResult = Apollo.QueryResult<RonRedirectQuery, RonRedirectQueryVariables>;
export function refetchRonRedirectQuery(variables: RonRedirectQueryVariables) {
      return { query: RonRedirectDocument, variables: variables }
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
export const WishlistCheckProductDocument = gql`
    query wishlistCheckProduct($input: WishlistCheckProductInput!) {
  wishlistCheckProduct(input: $input) {
    inList
    listIds
  }
}
    `;

/**
 * __useWishlistCheckProductQuery__
 *
 * To run a query within a React component, call `useWishlistCheckProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistCheckProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistCheckProductQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useWishlistCheckProductQuery(baseOptions: Apollo.QueryHookOptions<WishlistCheckProductQuery, WishlistCheckProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WishlistCheckProductQuery, WishlistCheckProductQueryVariables>(WishlistCheckProductDocument, options);
      }
export function useWishlistCheckProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WishlistCheckProductQuery, WishlistCheckProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WishlistCheckProductQuery, WishlistCheckProductQueryVariables>(WishlistCheckProductDocument, options);
        }
export type WishlistCheckProductQueryHookResult = ReturnType<typeof useWishlistCheckProductQuery>;
export type WishlistCheckProductLazyQueryHookResult = ReturnType<typeof useWishlistCheckProductLazyQuery>;
export type WishlistCheckProductQueryResult = Apollo.QueryResult<WishlistCheckProductQuery, WishlistCheckProductQueryVariables>;
export function refetchWishlistCheckProductQuery(variables: WishlistCheckProductQueryVariables) {
      return { query: WishlistCheckProductDocument, variables: variables }
    }
