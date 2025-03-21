import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum AddressTypeEnum {
  Pickup = 'PICKUP',
  Residential = 'RESIDENTIAL'
}

export type BannerCategoryImageOutput = {
  __typename?: 'BannerCategoryImageOutput';
  height: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type BannerCategoryInput = {
  category: Scalars['String']['input'];
};

export type BannerCategoryOutput = {
  __typename?: 'BannerCategoryOutput';
  image: BannerCategoryImageOutput;
  name?: Maybe<Scalars['String']['output']>;
};

export type BodyImagesCollectionOutput = {
  __typename?: 'BodyImagesCollectionOutput';
  items?: Maybe<Array<ItemsBodyImagesCollectionOutput>>;
};

export type CashbackAllExpirationOutput = {
  __typename?: 'CashbackAllExpirationOutput';
  data: CashbackExpirationInfoOutput;
  pagination: PaginationDetailOutput;
};

export type CashbackAllOperationOutput = {
  __typename?: 'CashbackAllOperationOutput';
  data: Array<CashbackOperationOutput>;
  pagination: PaginationDetailOutput;
};

export type CashbackDataInput = {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<CashbackStatusFilterEnum>;
  type?: InputMaybe<CashbackTypeTransactionEnum>;
  userId: Scalars['String']['input'];
};

export type CashbackExpirationInfoOutput = {
  __typename?: 'CashbackExpirationInfoOutput';
  cashbackToExpire: Array<CashbackExpirationItemOutput>;
  totalExpireBalanceInCents: Scalars['String']['output'];
};

export type CashbackExpirationItemOutput = {
  __typename?: 'CashbackExpirationItemOutput';
  expireAt: Scalars['String']['output'];
  expireCashbackAmount: Scalars['String']['output'];
  expireCashbackProgramRefId?: Maybe<Scalars['String']['output']>;
  expireDays: Scalars['Float']['output'];
  expireOperationId?: Maybe<Scalars['Int']['output']>;
  expireOrderId: Scalars['String']['output'];
  expireStatus: Scalars['String']['output'];
};

export type CashbackOperationOutput = {
  __typename?: 'CashbackOperationOutput';
  appliedBalanceInCents: Scalars['Float']['output'];
  cashbackAmountInCents: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  currentBalanceInCents: Scalars['Float']['output'];
  externalOrderAmountInCents: Scalars['Float']['output'];
  externalOrderId: Scalars['String']['output'];
  settlementDate?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CashbackOutput = {
  __typename?: 'CashbackOutput';
  expiration: CashbackExpirationInfoOutput;
  operations: Array<CashbackOperationOutput>;
  wallet: CashbackWalletOutput;
};

export enum CashbackStatusFilterEnum {
  All = 'ALL',
  Available = 'AVAILABLE',
  Canceled = 'CANCELED',
  Confirmed = 'CONFIRMED',
  Expired = 'EXPIRED',
  Pending = 'PENDING'
}

export type CashbackTransactionDataOutput = {
  __typename?: 'CashbackTransactionDataOutput';
  amountInCents: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  operation: CashbackTransactionOperationOutput;
  type: Scalars['String']['output'];
};

export type CashbackTransactionOperationOutput = {
  __typename?: 'CashbackTransactionOperationOutput';
  externalOrderId: Scalars['String']['output'];
};

export type CashbackTransactionOutput = {
  __typename?: 'CashbackTransactionOutput';
  data: Array<CashbackTransactionDataOutput>;
  pagination: PaginationDetailOutput;
};

export enum CashbackTypeTransactionEnum {
  Credit = 'CREDIT',
  Debit = 'DEBIT'
}

export type CashbackWalletOutput = {
  __typename?: 'CashbackWalletOutput';
  balanceExpiresOn?: Maybe<Scalars['String']['output']>;
  balanceInCents: Scalars['Float']['output'];
  pendingBalanceInCents: Scalars['Float']['output'];
  userStatus: Scalars['String']['output'];
};

export type CategoryCardsOutput = {
  __typename?: 'CategoryCardsOutput';
  sectionCardTitle?: Maybe<Scalars['String']['output']>;
  sectionMediaCards?: Maybe<Array<SectionMediaCardsOutput>>;
};

export type CepInput = {
  cep: Scalars['String']['input'];
};

export type CepOutput = {
  __typename?: 'CepOutput';
  addressId?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  complement?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  geoCoordinates?: Maybe<Array<Scalars['Float']['output']>>;
  neighborhood?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type CheckDeliveryTimeByProductInput = {
  id: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  seller: Scalars['String']['input'];
};

export enum ClockScreenEnum {
  All = 'ALL',
  Category = 'CATEGORY',
  Home = 'HOME',
  Offers = 'OFFERS'
}

export type ConfigCommercialBannerOutput = {
  __typename?: 'ConfigCommercialBannerOutput';
  endingDate?: Maybe<Scalars['String']['output']>;
  hasModal: Scalars['Boolean']['output'];
  mainText?: Maybe<Scalars['String']['output']>;
  modalButton: Scalars['Boolean']['output'];
  modalButtonLink?: Maybe<Scalars['String']['output']>;
  modalButtonText?: Maybe<Scalars['String']['output']>;
  modalDescription?: Maybe<Scalars['String']['output']>;
  modalTitle?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  startingDate?: Maybe<Scalars['String']['output']>;
};

export type ConfigCountdownClockOutput = {
  __typename?: 'ConfigCountdownClockOutput';
  countdown?: Maybe<Scalars['String']['output']>;
  countdownStart?: Maybe<Scalars['String']['output']>;
  descriptionModal?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  titleButton?: Maybe<Scalars['String']['output']>;
  titleModal?: Maybe<Scalars['String']['output']>;
  watchType?: Maybe<Scalars['String']['output']>;
};

export type ConfigCountdownClockReservaOutput = {
  __typename?: 'ConfigCountdownClockReservaOutput';
  countdown?: Maybe<Scalars['String']['output']>;
  descriptionModal?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  titleButton?: Maybe<Scalars['String']['output']>;
  titleModal?: Maybe<Scalars['String']['output']>;
  watchType?: Maybe<Scalars['String']['output']>;
};

export type ConfigOutput = {
  __typename?: 'ConfigOutput';
  commercialBannerCollection: Array<ConfigCommercialBannerOutput>;
  countDownClock?: Maybe<ConfigCountdownClockOutput>;
  countDownClockReservaMini?: Maybe<ConfigCountdownClockReservaOutput>;
  discountCodeBar: Array<DiscountCodeBarOutput>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  offersPage?: Maybe<Scalars['String']['output']>;
  online: Scalars['Boolean']['output'];
  returnPolicy?: Maybe<Scalars['String']['output']>;
  searchCollection: Scalars['String']['output'];
  searchMedia?: Maybe<ConfigSearchMediaOutput>;
  searchSuggestionsCollection: Array<Scalars['String']['output']>;
  shippingBar?: Maybe<ConfigShippingBarOutput>;
};

export type ConfigSearchMediaItemOutput = {
  __typename?: 'ConfigSearchMediaItemOutput';
  image?: Maybe<Scalars['String']['output']>;
  orderBy?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
};

export type ConfigSearchMediaOutput = {
  __typename?: 'ConfigSearchMediaOutput';
  items: Array<ConfigSearchMediaItemOutput>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ConfigShippingBarOutput = {
  __typename?: 'ConfigShippingBarOutput';
  freeShippingValue?: Maybe<Scalars['Float']['output']>;
  isFreeShipping?: Maybe<Scalars['Boolean']['output']>;
};

export type ContentHelpCenterImagesCollectionOutput = {
  __typename?: 'ContentHelpCenterImagesCollectionOutput';
  description?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ContentItemsExpansePanelCollectionOutput = {
  __typename?: 'ContentItemsExpansePanelCollectionOutput';
  expanseContentItem?: Maybe<Scalars['String']['output']>;
  expanseTitleItem?: Maybe<Scalars['String']['output']>;
};

export type ContentItemsHelpCenterCollectionOutput = {
  __typename?: 'ContentItemsHelpCenterCollectionOutput';
  linkUrl?: Maybe<Scalars['String']['output']>;
  sessionBodyCollection?: Maybe<SessionBodyCollectionOutput>;
  sessionTitle?: Maybe<Scalars['String']['output']>;
};

export type ContentfulCategoryDetailOutput = {
  __typename?: 'ContentfulCategoryDetailOutput';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  parentCategoryId?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
};

export type ContentfulCategoryOutput = {
  __typename?: 'ContentfulCategoryOutput';
  fatherCategoryId?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ContentfulCollectionOutput = {
  __typename?: 'ContentfulCollectionOutput';
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  totalProducts?: Maybe<Scalars['Int']['output']>;
};

export type ContentfulProductFvcOutput = {
  __typename?: 'ContentfulProductFvcOutput';
  productId?: Maybe<Scalars['String']['output']>;
};

export type ContentfulProductItemOutput = {
  __typename?: 'ContentfulProductItemOutput';
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
};

export type CountdownCategoryInput = {
  categoryReference?: InputMaybe<Scalars['String']['input']>;
  selectClockScreen: ClockScreenEnum;
};

export type CountdownClockCategoryOutput = {
  __typename?: 'CountdownClockCategoryOutput';
  backgroundColor: Scalars['String']['output'];
  bannerColor: Scalars['String']['output'];
  buttonColor: Scalars['String']['output'];
  descriptionModal?: Maybe<Scalars['String']['output']>;
  reference: Scalars['String']['output'];
  remainingTime: Scalars['String']['output'];
  selectClockScreen: ClockScreenEnum;
  subtitle: Scalars['String']['output'];
  textColor: Scalars['String']['output'];
  title: Scalars['String']['output'];
  titleButton: Scalars['String']['output'];
  titleModal: Scalars['String']['output'];
};

export type DeeplinkOutput = {
  __typename?: 'DeeplinkOutput';
  active: Scalars['Boolean']['output'];
  path: Scalars['String']['output'];
  referenceId?: Maybe<Scalars['String']['output']>;
};

export type DeeplinkPathInput = {
  path: Scalars['String']['input'];
};

export enum DeliveryChannelEnum {
  Delivery = 'DELIVERY',
  PickupInPoint = 'PICKUP_IN_POINT'
}

export type DiscountCodeBarOutput = {
  __typename?: 'DiscountCodeBarOutput';
  colorBar: Scalars['String']['output'];
  colorButton: Scalars['String']['output'];
  coupon: Scalars['String']['output'];
  descriptionModal: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  shareMessage: Scalars['String']['output'];
  titleBar: Scalars['String']['output'];
  titleButton: Scalars['String']['output'];
  titleModal: Scalars['String']['output'];
};

export type DitoRedirectInput = {
  code: Scalars['String']['input'];
};

export type DitoRedirectOutput = {
  __typename?: 'DitoRedirectOutput';
  type: DitoRedirectTypeEnum;
  url?: Maybe<Scalars['String']['output']>;
};

export enum DitoRedirectTypeEnum {
  None = 'NONE',
  RestoreCart = 'RESTORE_CART'
}

export type DorisOutput = {
  __typename?: 'DorisOutput';
  valid: Scalars['Boolean']['output'];
};

export type ExpansePanelOutput = {
  __typename?: 'ExpansePanelOutput';
  expansePanelCollection?: Maybe<ItemsExpansePanelCollectionOutput>;
};

export type FooterHelpCenterOutput = {
  __typename?: 'FooterHelpCenterOutput';
  footerLinkCollection?: Maybe<FooterLinkCollectionOutput>;
  footerTitle?: Maybe<Scalars['String']['output']>;
  textBody?: Maybe<Scalars['String']['output']>;
};

export type FooterLinkCollectionOutput = {
  __typename?: 'FooterLinkCollectionOutput';
  items?: Maybe<Array<ItemsFooterLinkCollectionOutput>>;
};

export type FvcContentfulCollectionInput = {
  collection: Scalars['String']['input'];
};

export type GenericOutput = {
  __typename?: 'GenericOutput';
  error: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export enum GetProductTypeEnum {
  ProductId = 'PRODUCT_ID',
  SkuId = 'SKU_ID',
  Slug = 'SLUG'
}

export type HealthcheckOutput = {
  __typename?: 'HealthcheckOutput';
  status: Scalars['Boolean']['output'];
  version: Scalars['String']['output'];
};

export type HelpCenterCollectionsItemsOutput = {
  __typename?: 'HelpCenterCollectionsItemsOutput';
  footerHelpCenter?: Maybe<FooterHelpCenterOutput>;
  itemsHelpCenterCollection?: Maybe<ItemsHelpCenterCollectionOutput>;
  titleHelpCenter?: Maybe<Scalars['String']['output']>;
};

export type HelpCenterOutput = {
  __typename?: 'HelpCenterOutput';
  items?: Maybe<Array<HelpCenterCollectionsItemsOutput>>;
};

export type HomeCarouselItemFiltersOutput = {
  __typename?: 'HomeCarouselItemFiltersOutput';
  priceFilter?: Maybe<HomeCarouselItemPricesFilterOutput>;
};

export type HomeCarouselItemImageOutput = {
  __typename?: 'HomeCarouselItemImageOutput';
  height?: Maybe<Scalars['Int']['output']>;
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
  width?: Maybe<Scalars['Int']['output']>;
};

export type HomeCarouselItemOutput = {
  __typename?: 'HomeCarouselItemOutput';
  bannerLocation?: Maybe<Array<Scalars['String']['output']>>;
  creativeName?: Maybe<Scalars['String']['output']>;
  facets: Array<ProductFacetOutput>;
  filters?: Maybe<HomeCarouselItemFiltersOutput>;
  image: HomeCarouselItemImageOutput;
  linkMktIn?: Maybe<Scalars['String']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  mkt: Scalars['Boolean']['output'];
  orderBy: Scalars['String']['output'];
  promotionName?: Maybe<Scalars['String']['output']>;
  reference: Scalars['String']['output'];
  reservaMini: Scalars['Boolean']['output'];
};

export type HomeCarouselItemPricesFilterOutput = {
  __typename?: 'HomeCarouselItemPricesFilterOutput';
  from?: Maybe<Scalars['Float']['output']>;
  to?: Maybe<Scalars['Float']['output']>;
};

export type HomeCarouselOutput = {
  __typename?: 'HomeCarouselOutput';
  id: Scalars['ID']['output'];
  items: Array<HomeCarouselItemOutput>;
  showtime?: Maybe<Scalars['Int']['output']>;
  type: HomePageSectionTypeEnum;
};

export type HomeCountdownFiltersOutput = {
  __typename?: 'HomeCountdownFiltersOutput';
  priceFilter?: Maybe<HomeCountdownPriceFilterOutput>;
};

export type HomeCountdownOutput = {
  __typename?: 'HomeCountdownOutput';
  countdown: Scalars['String']['output'];
  countdownStart?: Maybe<Scalars['String']['output']>;
  descriptionModal?: Maybe<Scalars['String']['output']>;
  facets: Array<ProductFacetOutput>;
  filters?: Maybe<HomeCountdownFiltersOutput>;
  formattedValue?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  subtitle?: Maybe<Scalars['String']['output']>;
  theme: HomeCountdownThemeOutput;
  title?: Maybe<Scalars['String']['output']>;
  titleButton?: Maybe<Scalars['String']['output']>;
  titleModal?: Maybe<Scalars['String']['output']>;
  type?: Maybe<ClockScreenEnum>;
  watchType?: Maybe<Scalars['String']['output']>;
};

export type HomeCountdownPriceFilterOutput = {
  __typename?: 'HomeCountdownPriceFilterOutput';
  from?: Maybe<Scalars['Float']['output']>;
  to?: Maybe<Scalars['Float']['output']>;
};

export type HomeCountdownThemeOutput = {
  __typename?: 'HomeCountdownThemeOutput';
  clockBackgroundColor: Scalars['String']['output'];
  colorBanner: Scalars['String']['output'];
  colorButton: Scalars['String']['output'];
};

export type HomeMediaOutput = {
  __typename?: 'HomeMediaOutput';
  bannerLocation?: Maybe<Array<Scalars['String']['output']>>;
  creativeName?: Maybe<Scalars['String']['output']>;
  deepLink?: Maybe<Scalars['String']['output']>;
  deepLinkNewsletter?: Maybe<Scalars['String']['output']>;
  facets: Array<ProductFacetOutput>;
  headerImage?: Maybe<HomeCarouselItemImageOutput>;
  id: Scalars['ID']['output'];
  image: HomeCarouselItemImageOutput;
  linkMktIn?: Maybe<Scalars['String']['output']>;
  locationId?: Maybe<Scalars['String']['output']>;
  mkt: Scalars['Boolean']['output'];
  orderBy: Scalars['String']['output'];
  promotionName?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  reservaMini: Scalars['Boolean']['output'];
};

export enum HomePageSectionTypeEnum {
  Brands = 'BRANDS',
  Cards = 'CARDS',
  Main = 'MAIN'
}

export type InfoCashbackPdpOutput = {
  __typename?: 'InfoCashbackPdpOutput';
  infoCashback?: Maybe<Scalars['String']['output']>;
  infoCashbackTextTooltip?: Maybe<Scalars['String']['output']>;
  infoCashbackTitleTooltip?: Maybe<Scalars['String']['output']>;
};

export type InvoiceKeyInput = {
  invoiceKey: Scalars['String']['input'];
};

export type InvoiceKeyOutput = {
  __typename?: 'InvoiceKeyOutput';
  estimatedDeliveryDate?: Maybe<Scalars['Float']['output']>;
  estimatedDeliveryDateFormated?: Maybe<Scalars['String']['output']>;
  lastStatusCreated?: Maybe<Scalars['String']['output']>;
  providerMessage?: Maybe<Scalars['String']['output']>;
  shipmentOrderVolumeState?: Maybe<Scalars['String']['output']>;
  shippingAdditional?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  shippingCity?: Maybe<Scalars['String']['output']>;
  shippingQuarter?: Maybe<Scalars['String']['output']>;
  shippingReference?: Maybe<Scalars['String']['output']>;
  shippingState?: Maybe<Scalars['String']['output']>;
};

export type ItemsBodyImagesCollectionOutput = {
  __typename?: 'ItemsBodyImagesCollectionOutput';
  helpCenterImagesCollection?: Maybe<ItemsHelpCenterImagesCollectionOutput>;
};

export type ItemsExpansePanelCollectionOutput = {
  __typename?: 'ItemsExpansePanelCollectionOutput';
  items?: Maybe<Array<ContentItemsExpansePanelCollectionOutput>>;
};

export type ItemsFooterLinkCollectionOutput = {
  __typename?: 'ItemsFooterLinkCollectionOutput';
  linkHelpCenter?: Maybe<Scalars['String']['output']>;
  linkTitle?: Maybe<Scalars['String']['output']>;
};

export type ItemsHelpCenterCollectionOutput = {
  __typename?: 'ItemsHelpCenterCollectionOutput';
  items?: Maybe<Array<ContentItemsHelpCenterCollectionOutput>>;
};

export type ItemsHelpCenterImagesCollectionOutput = {
  __typename?: 'ItemsHelpCenterImagesCollectionOutput';
  items?: Maybe<Array<ContentHelpCenterImagesCollectionOutput>>;
};

export type ItemsSessionBodyCollectionOutput = {
  __typename?: 'ItemsSessionBodyCollectionOutput';
  bodyImagesCollection?: Maybe<BodyImagesCollectionOutput>;
  expansePanel?: Maybe<ExpansePanelOutput>;
  helpCenterBodyText?: Maybe<Scalars['String']['output']>;
  helpCenterSessionTitle?: Maybe<Scalars['String']['output']>;
};

export type LastCartOutput = {
  __typename?: 'LastCartOutput';
  code?: Maybe<LastCartTypeEnum>;
  orderFormId?: Maybe<Scalars['String']['output']>;
};

export enum LastCartTypeEnum {
  AlreadySynced = 'ALREADY_SYNCED',
  NoPreviousCart = 'NO_PREVIOUS_CART',
  UpdatedCart = 'UPDATED_CART'
}

export type LoggedInOutput = {
  __typename?: 'LoggedInOutput';
  authCookie?: Maybe<Scalars['String']['output']>;
  token: Scalars['String']['output'];
};

export type MenuCategoryItemFiltersOutput = {
  __typename?: 'MenuCategoryItemFiltersOutput';
  priceFilter?: Maybe<MenuCategoryItemPricesFilterOutput>;
};

export type MenuCategoryItemOutput = {
  __typename?: 'MenuCategoryItemOutput';
  deeplinkUrl?: Maybe<Scalars['String']['output']>;
  facets: Array<ProductFacetOutput>;
  filters?: Maybe<MenuCategoryItemFiltersOutput>;
  highlight: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  referenceId?: Maybe<Scalars['String']['output']>;
  type: MenuItemTypeEnum;
};

export type MenuCategoryItemPricesFilterOutput = {
  __typename?: 'MenuCategoryItemPricesFilterOutput';
  from?: Maybe<Scalars['Float']['output']>;
  to?: Maybe<Scalars['Float']['output']>;
};

export type MenuCategoryOutput = {
  __typename?: 'MenuCategoryOutput';
  children: Array<MenuCategoryItemOutput>;
  deeplinkUrl?: Maybe<Scalars['String']['output']>;
  facets: Array<ProductFacetOutput>;
  highlight: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  referenceId?: Maybe<Scalars['String']['output']>;
  type: MenuItemTypeEnum;
};

export enum MenuItemTypeEnum {
  Category = 'CATEGORY',
  Collection = 'COLLECTION',
  Deeplink = 'DEEPLINK',
  ParentCategory = 'PARENT_CATEGORY'
}

export type Mutation = {
  __typename?: 'Mutation';
  orderFormAddDiscountCoupon: OrderformOutput;
  orderFormAddGift: OrderformOutput;
  orderFormAddItem: OrderformOutput;
  orderFormAddMultipleItem: OrderformOutput;
  orderFormAddSellerCoupon: OrderformOutput;
  orderFormAttachClientByCookie: OrderformOutput;
  orderFormAttachClientByEmail: OrderformOutput;
  orderFormRefreshData: OrderformOutput;
  orderFormRemoveDiscountCoupon: OrderformOutput;
  orderFormRemoveGift: OrderformOutput;
  orderFormRemoveSellerCoupon: OrderformOutput;
  orderFormRemoveUnavailableItems: GenericOutput;
  orderFormReset: OrderformOutput;
  orderFormSelectAddress: OrderformOutput;
  orderFormSetGiftSize: OrderformOutput;
  orderFormUpdateItem: OrderformOutput;
  profile: ProfileOutput;
  profileAddress: ProfileAddressOutput;
  profileAddressRemove: Scalars['Boolean']['output'];
  recoverPasswordReset: LoggedInOutput;
  recoverPasswordVerificationCode: RequestCodeOutput;
  redefinePassword: LoggedInOutput;
  refreshToken: LoggedInOutput;
  removeCustomer: Scalars['Boolean']['output'];
  sendLead: Scalars['Boolean']['output'];
  signIn: LoggedInOutput;
  signOut: Scalars['Boolean']['output'];
  signUp: LoggedInOutput;
  signUpVerificationCode: RequestCodeOutput;
  subscribeNewsletter: Scalars['Boolean']['output'];
  /** @deprecated This mutation is deprecated. Use the V2 version instead. */
  trackClick: Scalars['Boolean']['output'];
  trackClickV2: Array<Scalars['String']['output']>;
  trackOrder: TrackOrderOutput;
  /** @deprecated This mutation is deprecated. Use the V2 version instead. */
  trackPageView: Scalars['Boolean']['output'];
  trackPageViewV2: Array<Scalars['String']['output']>;
  tracking: Scalars['Boolean']['output'];
  wishlistAddProduct: Array<Scalars['String']['output']>;
  wishlistRemoveProduct: Array<Scalars['String']['output']>;
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


export type MutationOrderFormAddMultipleItemArgs = {
  input: OrderformAddMultipleItemInput;
};


export type MutationOrderFormAddSellerCouponArgs = {
  input: OrderformAddCouponInput;
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


export type MutationOrderFormResetArgs = {
  input: OrderformResetInput;
};


export type MutationOrderFormSelectAddressArgs = {
  input: OrderformSelectAddressInput;
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
  customerId: Scalars['String']['input'];
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


export type MutationTrackClickArgs = {
  input: TrackClickInput;
};


export type MutationTrackClickV2Args = {
  input: TrackClickInput;
};


export type MutationTrackOrderArgs = {
  input: TrackOrderInput;
};


export type MutationTrackPageViewArgs = {
  input: TrackPageViewInput;
};


export type MutationTrackPageViewV2Args = {
  input: TrackPageViewInput;
};


export type MutationTrackingArgs = {
  input: TrackAlgoliaInput;
};


export type MutationWishlistAddProductArgs = {
  input: WishlistAddProductInput;
};


export type MutationWishlistRemoveProductArgs = {
  input: WishlistRemoveProductInput;
};

export type OffersCarouselsOutput = {
  __typename?: 'OffersCarouselsOutput';
  categoryCards?: Maybe<CategoryCardsOutput>;
  items: Array<HomeCarouselItemOutput>;
  shelfProductsBottom?: Maybe<Scalars['String']['output']>;
  shelfProductsTop?: Maybe<Scalars['String']['output']>;
  shelfSubtitleBottom?: Maybe<Scalars['String']['output']>;
  shelfSubtitleTop?: Maybe<Scalars['String']['output']>;
  shelfTitle?: Maybe<Scalars['String']['output']>;
  showtime?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  type: HomePageSectionTypeEnum;
};

export type OffersPageBannerCarousel = {
  __typename?: 'OffersPageBannerCarousel';
  items: Array<OffersPageCollectionBannerCarouselItemOutput>;
  title: Scalars['String']['output'];
};

export type OffersPageCollectionBannerCarouselItemOutput = {
  __typename?: 'OffersPageCollectionBannerCarouselItemOutput';
  banner: Scalars['String']['output'];
  id?: Maybe<Scalars['String']['output']>;
};

export type OffersPageCollectionFilter = {
  __typename?: 'OffersPageCollectionFilter';
  items: Array<OffersPageCollectionFilterItemOutput>;
  title: Scalars['String']['output'];
};

export type OffersPageCollectionFilterItemOutput = {
  __typename?: 'OffersPageCollectionFilterItemOutput';
  collectionId?: Maybe<Scalars['String']['output']>;
  colorFilter?: Maybe<Array<Scalars['String']['output']>>;
  fromPriceFilter?: Maybe<Scalars['String']['output']>;
  offerImage: Scalars['String']['output'];
  offerName: Scalars['String']['output'];
  sizeFilter?: Maybe<Array<Scalars['String']['output']>>;
  toPriceFilter?: Maybe<Scalars['String']['output']>;
};

export type OrderDetailIdInput = {
  orderId: Scalars['String']['input'];
};

export type OrderDetailItemOfferingOutput = {
  __typename?: 'OrderDetailItemOfferingOutput';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type OrderDetailItemOutput = {
  __typename?: 'OrderDetailItemOutput';
  commission: Scalars['Int']['output'];
  detailUrl: Scalars['String']['output'];
  ean: Scalars['String']['output'];
  freightCommission: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
  isGift: Scalars['Boolean']['output'];
  listPrice: Scalars['Int']['output'];
  measurementUnit: Scalars['String']['output'];
  name: Scalars['String']['output'];
  offerings: Array<OrderDetailItemOfferingOutput>;
  price: Scalars['Int']['output'];
  productId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  refId: Scalars['String']['output'];
  rewardValue: Scalars['Int']['output'];
  seller: Scalars['String']['output'];
  sellerSku: Scalars['String']['output'];
  sellingPrice: Scalars['Int']['output'];
  tax: Scalars['Int']['output'];
  uniqueId: Scalars['String']['output'];
  unitMultiplier: Scalars['Float']['output'];
};

export type OrderDetailOutput = {
  __typename?: 'OrderDetailOutput';
  affiliateId: Scalars['String']['output'];
  clientProfileData: OrderDetailProfileDataOutput;
  creationDate: Scalars['String']['output'];
  items: Array<OrderDetailItemOutput>;
  lastChange: Scalars['String']['output'];
  marketplaceOrderId: Scalars['String']['output'];
  orderGroup: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  origin: Scalars['String']['output'];
  salesChannel: Scalars['String']['output'];
  sellerOrderId: Scalars['String']['output'];
  sequence: Scalars['String']['output'];
  shippingData: OrderDetailShippingData;
  status: Scalars['String']['output'];
  statusDescription: Scalars['String']['output'];
  totals: Array<OrderDetailTotalOutput>;
  value: Scalars['Int']['output'];
};

export type OrderDetailProfileDataOutput = {
  __typename?: 'OrderDetailProfileDataOutput';
  document: Scalars['String']['output'];
  documentType: Scalars['String']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  userProfileId: Scalars['String']['output'];
};

export type OrderDetailShippingData = {
  __typename?: 'OrderDetailShippingData';
  address: OrderDetailShippingDataAddress;
};

export type OrderDetailShippingDataAddress = {
  __typename?: 'OrderDetailShippingDataAddress';
  addressId?: Maybe<Scalars['String']['output']>;
  addressType?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  complement?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  geoCoordinates: Array<Scalars['Float']['output']>;
  neighborhood?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  receiverName?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type OrderDetailTotalOutput = {
  __typename?: 'OrderDetailTotalOutput';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  value: Scalars['Int']['output'];
};

export type OrderOutput = {
  __typename?: 'OrderOutput';
  ShippingEstimatedDateMax: Scalars['String']['output'];
  affiliateId: Scalars['String']['output'];
  clientName: Scalars['String']['output'];
  creationDate: Scalars['String']['output'];
  currencyCode: Scalars['String']['output'];
  lastMessageUnread: Scalars['String']['output'];
  orderFormId: Scalars['String']['output'];
  orderId: Scalars['String']['output'];
  origin: Scalars['String']['output'];
  paymentNames: Scalars['String']['output'];
  salesChannel: Scalars['String']['output'];
  sequence: Scalars['String']['output'];
  status: Scalars['String']['output'];
  statusDescription: Scalars['String']['output'];
  totalItems: Scalars['Int']['output'];
  totalValue: Scalars['Int']['output'];
  workflowInErrorState: Scalars['Boolean']['output'];
  workflowInRetry: Scalars['Boolean']['output'];
};

export type OrderPaginationOutput = {
  __typename?: 'OrderPaginationOutput';
  list: Array<OrderOutput>;
  paging: PaginationDetailOutput;
};

export type OrderformAddCouponInput = {
  coupon: Scalars['String']['input'];
  orderFormId: Scalars['String']['input'];
};

export type OrderformAddItemGiftCardInfoInput = {
  email: Scalars['String']['input'];
};

export type OrderformAddItemInput = {
  giftCard?: InputMaybe<OrderformAddItemGiftCardInfoInput>;
  id: Scalars['String']['input'];
  orderFormId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  seller: Scalars['String']['input'];
};

export type OrderformAddMultipleItemInfoInput = {
  id: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  seller: Scalars['String']['input'];
};

export type OrderformAddMultipleItemInput = {
  orderFormId: Scalars['String']['input'];
  orderItems: Array<OrderformAddMultipleItemInfoInput>;
};

export type OrderformAddressOutput = {
  __typename?: 'OrderformAddressOutput';
  addressId?: Maybe<Scalars['String']['output']>;
  addressType?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  complement?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  geoCoordinates?: Maybe<Array<Scalars['Float']['output']>>;
  isDisposable: Scalars['Boolean']['output'];
  neighborhood?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  receiverName?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type OrderformAppTotalizersOutput = {
  __typename?: 'OrderformAppTotalizersOutput';
  delivery: Scalars['Float']['output'];
  discount: Scalars['Float']['output'];
  items: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type OrderformAttachClientByCookieInput = {
  orderFormId: Scalars['String']['input'];
};

export type OrderformAttachClientByEmailInput = {
  email: Scalars['String']['input'];
  orderFormId: Scalars['String']['input'];
};

export type OrderformClientProfileDataOutput = {
  __typename?: 'OrderformClientProfileDataOutput';
  corporateDocument?: Maybe<Scalars['String']['output']>;
  corporateName?: Maybe<Scalars['String']['output']>;
  corporatePhone?: Maybe<Scalars['String']['output']>;
  document?: Maybe<Scalars['String']['output']>;
  documentType?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  profileCompleteOnLoading?: Maybe<Scalars['String']['output']>;
  stateInscription?: Maybe<Scalars['String']['output']>;
  tradeName?: Maybe<Scalars['String']['output']>;
};

export type OrderformGiftInput = {
  /** This is the offering id */
  id: Scalars['String']['input'];
  /** Product index */
  index: Scalars['Int']['input'];
  orderFormId: Scalars['String']['input'];
};

export type OrderformInput = {
  orderFormId?: InputMaybe<Scalars['String']['input']>;
};

export type OrderformInstallmentInfoOutput = {
  __typename?: 'OrderformInstallmentInfoOutput';
  installmentPrice: Scalars['Float']['output'];
  installmentsNumber: Scalars['Float']['output'];
  totalPrice: Scalars['Float']['output'];
};

export type OrderformItemAdditionalInfoOutput = {
  __typename?: 'OrderformItemAdditionalInfoOutput';
  brandName?: Maybe<Scalars['String']['output']>;
};

export type OrderformItemBundleItemOutput = {
  __typename?: 'OrderformItemBundleItemOutput';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  uniqueId: Scalars['ID']['output'];
};

export type OrderformItemOfferingAttachmentOutput = {
  __typename?: 'OrderformItemOfferingAttachmentOutput';
  name: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
};

export type OrderformItemOfferingOutput = {
  __typename?: 'OrderformItemOfferingOutput';
  allowGiftMessage: Scalars['Boolean']['output'];
  attachmentOfferings: Array<OrderformItemOfferingAttachmentOutput>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type OrderformItemOutput = {
  __typename?: 'OrderformItemOutput';
  additionalInfo?: Maybe<OrderformItemAdditionalInfoOutput>;
  availability: Scalars['String']['output'];
  bundleItems: Array<OrderformItemBundleItemOutput>;
  detailUrl?: Maybe<Scalars['String']['output']>;
  disableCounter: Scalars['Boolean']['output'];
  discountApi?: Maybe<Scalars['Float']['output']>;
  discountPercent: Scalars['Float']['output'];
  ean?: Maybe<Scalars['String']['output']>;
  giftOfferingId?: Maybe<Scalars['String']['output']>;
  hasPrimeDiscount: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  imageSource: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  /** This field indicates the original index position of the VTEX order form. */
  index: Scalars['Int']['output'];
  isAddedAsGift: Scalars['Boolean']['output'];
  isAssinaturaSimples: Scalars['Boolean']['output'];
  isGift: Scalars['Boolean']['output'];
  isGiftable: Scalars['Boolean']['output'];
  isPrimeSubscription: Scalars['Boolean']['output'];
  itemColor: Scalars['String']['output'];
  itemSize: Scalars['String']['output'];
  key: Scalars['String']['output'];
  listPrice?: Maybe<Scalars['Int']['output']>;
  measurementUnit: Scalars['String']['output'];
  name: Scalars['String']['output'];
  offerings: Array<OrderformItemOfferingOutput>;
  price?: Maybe<Scalars['Int']['output']>;
  priceValidUntil: Scalars['String']['output'];
  priceWithDiscount: Scalars['Float']['output'];
  productCategories: Array<Scalars['String']['output']>;
  productId: Scalars['String']['output'];
  productRefId?: Maybe<Scalars['String']['output']>;
  productTitle: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  refId?: Maybe<Scalars['String']['output']>;
  rewardValue: Scalars['Int']['output'];
  seller: Scalars['String']['output'];
  sellingPrice?: Maybe<Scalars['Int']['output']>;
  showFirstPurchaseDiscountMessage?: Maybe<Scalars['String']['output']>;
  showTotalDiscountFirstPurchaseValue?: Maybe<Scalars['Float']['output']>;
  skuName: Scalars['String']['output'];
  tax: Scalars['Int']['output'];
  uniqueId: Scalars['String']['output'];
  unitMultiplier: Scalars['Int']['output'];
  urlFacaVc: Scalars['String']['output'];
};

export type OrderformLogisticsInfoInput = {
  itemIndex: Scalars['String']['input'];
  selectedDeliveryChannel: DeliveryChannelEnum;
  selectedSla: Scalars['String']['input'];
};

export type OrderformMarketingDataOutput = {
  __typename?: 'OrderformMarketingDataOutput';
  coupon?: Maybe<Scalars['String']['output']>;
  couponApplied: Scalars['Boolean']['output'];
  couponDescription?: Maybe<Scalars['String']['output']>;
  couponDiscount: Scalars['Float']['output'];
  itemsWithCouponDiscount: Array<OrderformItemOutput>;
  itemsWithProgressiveDiscount: Array<OrderformItemOutput>;
  marketingTags: Array<Scalars['String']['output']>;
  progressiveDiscount: Scalars['Float']['output'];
  progressiveDiscountApplied: Scalars['Boolean']['output'];
  sellerCoupon?: Maybe<Scalars['String']['output']>;
  sellerCouponApplied: Scalars['Boolean']['output'];
  sellerCouponDiscount: Scalars['Float']['output'];
  sellerCouponName?: Maybe<Scalars['String']['output']>;
  utmCampaign?: Maybe<Scalars['String']['output']>;
  utmMedium?: Maybe<Scalars['String']['output']>;
  utmSource?: Maybe<Scalars['String']['output']>;
  utmiCampaign?: Maybe<Scalars['String']['output']>;
  utmiPart?: Maybe<Scalars['String']['output']>;
  utmipage?: Maybe<Scalars['String']['output']>;
};

export type OrderformMessageOutput = {
  __typename?: 'OrderformMessageOutput';
  code?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  text?: Maybe<Scalars['String']['output']>;
};

export type OrderformOutput = {
  __typename?: 'OrderformOutput';
  allItemsQuantity: Scalars['Int']['output'];
  appTotalizers: OrderformAppTotalizersOutput;
  clientProfileData?: Maybe<OrderformClientProfileDataOutput>;
  hasPrimeSubscriptionInCart: Scalars['Boolean']['output'];
  installmentInfo: OrderformInstallmentInfoOutput;
  /** @deprecated This field is deprecated, use packageItems instead. */
  items: Array<OrderformItemOutput>;
  marketingData?: Maybe<OrderformMarketingDataOutput>;
  messages: Array<Scalars['String']['output']>;
  messagesDetailed: Array<OrderformMessageOutput>;
  orderFormId: Scalars['ID']['output'];
  packageItems: Array<OrderformPackageItemsOutput>;
  prime?: Maybe<PrimeTotalizerOutput>;
  salesChannel: Scalars['String']['output'];
  selectableGift?: Maybe<OrderformSelectableGiftOutput>;
  shippingData?: Maybe<OrderformShippingDataOutput>;
};

export type OrderformPackageItemsMetadataOutput = {
  __typename?: 'OrderformPackageItemsMetadataOutput';
  availability?: Maybe<PackageAvailabilityEnum>;
  friendlyName?: Maybe<Scalars['String']['output']>;
  shippingEstimate?: Maybe<Scalars['Int']['output']>;
  shippingValue?: Maybe<Scalars['Int']['output']>;
};

export type OrderformPackageItemsOutput = {
  __typename?: 'OrderformPackageItemsOutput';
  items: Array<OrderformItemOutput>;
  metadata?: Maybe<OrderformPackageItemsMetadataOutput>;
  totalShippingValue: Scalars['Float']['output'];
};

export type OrderformRefreshDataInput = {
  orderFormId: Scalars['String']['input'];
};

export type OrderformRemoveCouponInput = {
  orderFormId: Scalars['String']['input'];
};

export type OrderformRemoveUnavailableItemsInput = {
  orderFormId: Scalars['String']['input'];
};

export type OrderformResetInput = {
  orderFormId: Scalars['String']['input'];
};

export type OrderformSelectAddressInput = {
  addressId?: InputMaybe<Scalars['String']['input']>;
  addressType: AddressTypeEnum;
  cep?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  complement?: InputMaybe<Scalars['String']['input']>;
  deliveryOptions: Array<OrderformLogisticsInfoInput>;
  neighborhood?: InputMaybe<Scalars['String']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  orderFormId: Scalars['String']['input'];
  receiverName?: InputMaybe<Scalars['String']['input']>;
  reference?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type OrderformSelectableGiftAvailableGiftOutput = {
  __typename?: 'OrderformSelectableGiftAvailableGiftOutput';
  availability: Scalars['String']['output'];
  detailUrl: Scalars['String']['output'];
  ean: Scalars['String']['output'];
  id: Scalars['String']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  isGift?: Maybe<Scalars['Boolean']['output']>;
  isSelected: Scalars['Boolean']['output'];
  measurementUnit: Scalars['String']['output'];
  name: Scalars['String']['output'];
  productId: Scalars['String']['output'];
  productRefId: Scalars['String']['output'];
  refId: Scalars['String']['output'];
  rewardValue?: Maybe<Scalars['Float']['output']>;
  seller: Scalars['String']['output'];
  skuName: Scalars['String']['output'];
  tax?: Maybe<Scalars['Float']['output']>;
  uniqueId: Scalars['String']['output'];
  unitMultiplier: Scalars['Float']['output'];
};

export type OrderformSelectableGiftOptionOutput = {
  __typename?: 'OrderformSelectableGiftOptionOutput';
  color: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  size: Scalars['String']['output'];
};

export type OrderformSelectableGiftOutput = {
  __typename?: 'OrderformSelectableGiftOutput';
  availableGifts: Array<OrderformSelectableGiftAvailableGiftOutput>;
  availableQuantity?: Maybe<Scalars['Int']['output']>;
  currentSelectableGift: OrderformSelectableGiftAvailableGiftOutput;
  giftOptions: Array<Maybe<OrderformSelectableGiftOptionOutput>>;
  id: Scalars['ID']['output'];
};

export type OrderformSetGiftSizeInput = {
  giftId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  orderFormId: Scalars['String']['input'];
  seller: Scalars['String']['input'];
};

export type OrderformShippingDataOutput = {
  __typename?: 'OrderformShippingDataOutput';
  address?: Maybe<OrderformAddressOutput>;
  availableAddresses: Array<OrderformAddressOutput>;
  /** @deprecated Use field `address` instead of `selectedAddresses` */
  selectedAddresses: Array<OrderformAddressOutput>;
};

export type OrderformUpdateItemInput = {
  id: Scalars['String']['input'];
  /** Must be used if you want to set the remove the item from cart */
  index?: InputMaybe<Scalars['Int']['input']>;
  orderFormId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  seller: Scalars['String']['input'];
};

export enum PackageAvailabilityEnum {
  Available = 'AVAILABLE',
  SomeUnavailable = 'SOME_UNAVAILABLE',
  Unavailable = 'UNAVAILABLE'
}

export type PaginationDetailOutput = {
  __typename?: 'PaginationDetailOutput';
  currentPage: Scalars['Int']['output'];
  pages: Scalars['Int']['output'];
  perPage: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PaginationInput = {
  page: Scalars['Int']['input'];
};

export type PrimeConfigItemOutput = {
  __typename?: 'PrimeConfigItemOutput';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type PrimeConfigOutput = {
  __typename?: 'PrimeConfigOutput';
  brands: Array<PrimeConfigItemOutput>;
  brandsAreInclusive: Scalars['Boolean']['output'];
  categories: Array<PrimeConfigItemOutput>;
  categoriesAreInclusive: Scalars['Boolean']['output'];
  collections: Array<PrimeConfigItemOutput>;
  collectionsIsInclusive: Scalars['Boolean']['output'];
  idCalculatorConfiguration: Scalars['String']['output'];
  idSeller: Scalars['String']['output'];
  idSellerIsInclusive: Scalars['Boolean']['output'];
  isActive: Scalars['Boolean']['output'];
  marketingTags: Array<PrimeConfigItemOutput>;
  name: Scalars['String']['output'];
  percentualDiscountValue: Scalars['Int']['output'];
  totalValueCeling: Scalars['Int']['output'];
  totalValueFloor: Scalars['Int']['output'];
};

export type PrimeDetailOutput = {
  __typename?: 'PrimeDetailOutput';
  discountFrom?: Maybe<Scalars['Float']['output']>;
  discountPercentage?: Maybe<Scalars['Int']['output']>;
  installmentPrice?: Maybe<Scalars['Float']['output']>;
  installmentQty?: Maybe<Scalars['Int']['output']>;
  monthlyCashback?: Maybe<Scalars['Float']['output']>;
  primeFaq?: Maybe<Array<PrimeFaqItemOutput>>;
  productId: Scalars['Int']['output'];
  productSeller: Scalars['String']['output'];
  skuId: Scalars['Int']['output'];
};

export type PrimeFaqItemOutput = {
  __typename?: 'PrimeFaqItemOutput';
  textBody?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type PrimeFaqOutput = {
  __typename?: 'PrimeFaqOutput';
  body: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
};

export type PrimeInfoOutput = {
  __typename?: 'PrimeInfoOutput';
  installment: ProductPriceInstallmentOutput;
  price: Scalars['Float']['output'];
};

export type PrimeTotalizerOutput = {
  __typename?: 'PrimeTotalizerOutput';
  renderApp: Scalars['Boolean']['output'];
  total?: Maybe<Scalars['Float']['output']>;
  totalDiscount: Scalars['Float']['output'];
};

export type ProductColorOutput = {
  __typename?: 'ProductColorOutput';
  colorId: Scalars['String']['output'];
  colorName?: Maybe<Scalars['String']['output']>;
  colorUrl: Scalars['String']['output'];
  disabled: Scalars['Boolean']['output'];
  images: Array<Scalars['String']['output']>;
  sizes: Array<ProductSizeOutput>;
};

export type ProductColorUrlOutput = {
  __typename?: 'ProductColorUrlOutput';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type ProductDeliveryTimeOutput = {
  __typename?: 'ProductDeliveryTimeOutput';
  estimatedDay?: Maybe<Scalars['String']['output']>;
  isDelivery: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  storeName: Scalars['String']['output'];
};

export type ProductFacetOutput = {
  __typename?: 'ProductFacetOutput';
  key: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type ProductGiftCardOptionOutput = {
  __typename?: 'ProductGiftCardOptionOutput';
  ean: Scalars['String']['output'];
  images: Array<Scalars['String']['output']>;
  itemId: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  seller: Scalars['String']['output'];
};

export type ProductGiftCardOutput = {
  __typename?: 'ProductGiftCardOutput';
  howItWorks: Scalars['String']['output'];
  options: Array<ProductGiftCardOptionOutput>;
  terms: Scalars['String']['output'];
};

export type ProductInput = {
  /** Initial selected color */
  colorId?: InputMaybe<Scalars['String']['input']>;
  /** Initial selected variant ID */
  itemId?: InputMaybe<Scalars['String']['input']>;
  type: GetProductTypeEnum;
  value: Scalars['String']['input'];
};

export type ProductItemOutput = {
  __typename?: 'ProductItemOutput';
  images: Array<Scalars['String']['output']>;
  itemId?: Maybe<Scalars['String']['output']>;
  sellers: Array<ProductItemSellerOutput>;
  skuName?: Maybe<Scalars['String']['output']>;
  variations: Array<ProductItemVariationOutput>;
};

export type ProductItemSellerCommertialOfferInstallmentOutput = {
  __typename?: 'ProductItemSellerCommertialOfferInstallmentOutput';
  name?: Maybe<Scalars['String']['output']>;
  numberOfInstallments: Scalars['Float']['output'];
  paymentSystemGroupName?: Maybe<Scalars['String']['output']>;
  paymentSystemName?: Maybe<Scalars['String']['output']>;
  totalValuePlusInterestRate: Scalars['Float']['output'];
  value: Scalars['Float']['output'];
};

export type ProductItemSellerCommertialOfferOutput = {
  __typename?: 'ProductItemSellerCommertialOfferOutput';
  availableQuantity: Scalars['Float']['output'];
  installments: Array<ProductItemSellerCommertialOfferInstallmentOutput>;
  listPrice: Scalars['Float']['output'];
  price: Scalars['Float']['output'];
  priceWithoutDiscount: Scalars['Float']['output'];
  spotPrice: Scalars['Float']['output'];
  tax: Scalars['Float']['output'];
  taxPercentage: Scalars['Float']['output'];
};

export type ProductItemSellerOutput = {
  __typename?: 'ProductItemSellerOutput';
  commertialOffer?: Maybe<ProductItemSellerCommertialOfferOutput>;
  sellerDefault?: Maybe<Scalars['Boolean']['output']>;
  sellerId?: Maybe<Scalars['String']['output']>;
};

export type ProductItemVariationOutput = {
  __typename?: 'ProductItemVariationOutput';
  name?: Maybe<Scalars['String']['output']>;
  originalName?: Maybe<Scalars['String']['output']>;
  values?: Maybe<Array<Scalars['String']['output']>>;
};

export type ProductKitOutput = {
  __typename?: 'ProductKitOutput';
  colorUrls: Array<ProductColorUrlOutput>;
  colors: Array<ProductColorOutput>;
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
};

export type ProductListOutput = {
  __typename?: 'ProductListOutput';
  brand: Scalars['String']['output'];
  category?: Maybe<Scalars['String']['output']>;
  colorName?: Maybe<Scalars['String']['output']>;
  colors?: Maybe<Array<Scalars['String']['output']>>;
  currentPrice: Scalars['Float']['output'];
  discountPercentage: Scalars['Float']['output'];
  ean: Scalars['String']['output'];
  hasDiscount: Scalars['Boolean']['output'];
  hasPrime?: Maybe<Scalars['Boolean']['output']>;
  image: Scalars['String']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  installment: ProductPriceInstallmentOutput;
  installmentEqualPrime?: Maybe<ProductSizeInstallmentOutput>;
  isKitLook?: Maybe<Scalars['Boolean']['output']>;
  listPrice: Scalars['Float']['output'];
  objectId?: Maybe<Scalars['String']['output']>;
  prime?: Maybe<ProductListPrimeOutput>;
  productId: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  size?: Maybe<Scalars['String']['output']>;
  sizes: Array<ProductListSizeOutput>;
  skuId: Scalars['String']['output'];
  skuName: Scalars['String']['output'];
  slug?: Maybe<Scalars['String']['output']>;
};

export type ProductListPrimeOutput = {
  __typename?: 'ProductListPrimeOutput';
  installment: ProductPriceInstallmentOutput;
  price: Scalars['Float']['output'];
};

export type ProductListSizeOutput = {
  __typename?: 'ProductListSizeOutput';
  name: Scalars['String']['output'];
  sellerId: Scalars['String']['output'];
  sellerName: Scalars['String']['output'];
  skuId: Scalars['String']['output'];
  stock: Scalars['Int']['output'];
};

export type ProductOutput = {
  __typename?: 'ProductOutput';
  action: ProductResultActionEnum;
  categoryTree: Array<Scalars['String']['output']>;
  colorUrls: Array<ProductColorUrlOutput>;
  colors: Array<ProductColorOutput>;
  disabledColors: Array<Scalars['String']['output']>;
  fvcProductReference?: Maybe<Scalars['String']['output']>;
  giftCard?: Maybe<ProductGiftCardOutput>;
  hasPrime?: Maybe<Scalars['Boolean']['output']>;
  identifier?: Maybe<Scalars['String']['output']>;
  initialColor?: Maybe<ProductColorOutput>;
  initialColorId?: Maybe<Scalars['String']['output']>;
  initialSize?: Maybe<ProductSizeOutput>;
  initialSizeId?: Maybe<Scalars['String']['output']>;
  kit?: Maybe<Array<ProductKitOutput>>;
  paymentSystemGroupName?: Maybe<Array<Scalars['String']['output']>>;
  priceRange?: Maybe<ProductPriceRangeOutput>;
  productId: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  properties: ProductPropertiesOutput;
  saleOff: Scalars['Boolean']['output'];
  share: ProductShareOutput;
  videoThumbnail?: Maybe<Scalars['String']['output']>;
};

export type ProductPriceInstallmentOutput = {
  __typename?: 'ProductPriceInstallmentOutput';
  number: Scalars['Int']['output'];
  value: Scalars['Float']['output'];
};

export type ProductPriceLevelOutput = {
  __typename?: 'ProductPriceLevelOutput';
  highPrice: Scalars['Float']['output'];
  lowPrice: Scalars['Float']['output'];
};

export type ProductPriceRangeOutput = {
  __typename?: 'ProductPriceRangeOutput';
  listPrice: ProductPriceLevelOutput;
  sellingPrice: ProductPriceLevelOutput;
};

export type ProductPropertiesOutput = {
  __typename?: 'ProductPropertiesOutput';
  composition?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  isAssinaturaSimples?: Maybe<Scalars['Boolean']['output']>;
};

export type ProductRecommendationOutput = {
  __typename?: 'ProductRecommendationOutput';
  categoryTree?: Maybe<Array<Scalars['String']['output']>>;
  items: Array<ProductItemOutput>;
  priceRange: ProductPriceRangeOutput;
  productId: Scalars['String']['output'];
  productName: Scalars['String']['output'];
};

export enum ProductResultActionEnum {
  RedirectToSite = 'RedirectToSite',
  ShowGiftCard = 'ShowGiftCard',
  ShowKit = 'ShowKit',
  ShowProduct = 'ShowProduct'
}

export type ProductShareOutput = {
  __typename?: 'ProductShareOutput';
  message: Scalars['String']['output'];
  title: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ProductSizeInstallmentOutput = {
  __typename?: 'ProductSizeInstallmentOutput';
  number: Scalars['Int']['output'];
  value: Scalars['Float']['output'];
};

export type ProductSizeOutput = {
  __typename?: 'ProductSizeOutput';
  availableQuantity: Scalars['Int']['output'];
  /** Final price (if discount exists, it's already applied) */
  currentPrice: Scalars['Float']['output'];
  disabled: Scalars['Boolean']['output'];
  discountPercent: Scalars['Float']['output'];
  ean: Scalars['String']['output'];
  hasDiscount: Scalars['Boolean']['output'];
  installment: ProductSizeInstallmentOutput;
  installmentEqualPrime?: Maybe<ProductSizeInstallmentOutput>;
  itemId: Scalars['ID']['output'];
  /** Price without discount (original price) - may be null if the original price is equal to current price */
  listPrice: Scalars['Float']['output'];
  prime?: Maybe<PrimeInfoOutput>;
  seller: Scalars['String']['output'];
  size: Scalars['String']['output'];
  skuName: Scalars['String']['output'];
};

export type ProfileAddressOutput = {
  __typename?: 'ProfileAddressOutput';
  addressName?: Maybe<Scalars['String']['output']>;
  addressType?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  complement?: Maybe<Scalars['String']['output']>;
  country?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  neighborhood?: Maybe<Scalars['String']['output']>;
  number?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  receiverName?: Maybe<Scalars['String']['output']>;
  reference?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type ProfileCustomFieldOutput = {
  __typename?: 'ProfileCustomFieldOutput';
  cacheId?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type ProfileInput = {
  orderFormId?: InputMaybe<Scalars['String']['input']>;
};

export type ProfileOutput = {
  __typename?: 'ProfileOutput';
  addresses: Array<Maybe<ProfileAddressOutput>>;
  authCookie?: Maybe<Scalars['String']['output']>;
  birthDate?: Maybe<Scalars['String']['output']>;
  customFields: Array<Maybe<ProfileCustomFieldOutput>>;
  document?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  homePhone?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isComplete: Scalars['Boolean']['output'];
  isPrime: Scalars['Boolean']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<LastCartOutput>;
  payments: Array<Maybe<ProfilePaymentOutput>>;
};

export type ProfilePaymentOutput = {
  __typename?: 'ProfilePaymentOutput';
  cardNumber?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
};

export type ProfileUpdateCustomFieldInput = {
  key: Scalars['String']['input'];
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ProfileUpdateInput = {
  birthDate: Scalars['String']['input'];
  customFields: Array<ProfileUpdateCustomFieldInput>;
  document: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  gender: Scalars['String']['input'];
  homePhone: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  appMenu: Array<MenuCategoryOutput>;
  bannerCategory: Array<BannerCategoryOutput>;
  cashback: CashbackOutput;
  cep?: Maybe<CepOutput>;
  /** @deprecated Use new query `search` */
  checkSearchRedirect?: Maybe<Scalars['String']['output']>;
  config?: Maybe<ConfigOutput>;
  contentfulCategories: Array<ContentfulCategoryOutput>;
  contentfulCategory: ContentfulCategoryDetailOutput;
  contentfulCollections: Array<ContentfulCollectionOutput>;
  contentfulFvcProducts: ContentfulProductFvcOutput;
  contentfulProducts: Array<ContentfulProductItemOutput>;
  countdown?: Maybe<CountdownClockCategoryOutput>;
  deeplinkPath?: Maybe<DeeplinkOutput>;
  ditoRedirect?: Maybe<DitoRedirectOutput>;
  getCashbackExpiration: CashbackAllExpirationOutput;
  getCashbackOperation: CashbackAllOperationOutput;
  getCashbackTransaction: CashbackTransactionOutput;
  getCashbackWallet: CashbackWalletOutput;
  healthcheck: HealthcheckOutput;
  helpCenterCollection: HelpCenterOutput;
  homeCarousels: Array<HomeCarouselOutput>;
  homeCountdown?: Maybe<HomeCountdownOutput>;
  homeMedias: Array<HomeMediaOutput>;
  infoCashbackPdpCollection: InfoCashbackPdpOutput;
  invoiceKey?: Maybe<InvoiceKeyOutput>;
  landingPagePrime: PrimeDetailOutput;
  mktinStatus: Scalars['Boolean']['output'];
  mostSearchedWords: Array<Scalars['String']['output']>;
  offersCarousels: Array<OffersCarouselsOutput>;
  offersPageCollectionBannerCarousel: OffersPageBannerCarousel;
  offersPageCollectionFilter: OffersPageCollectionFilter;
  order: OrderDetailOutput;
  orderForm: OrderformOutput;
  orders: OrderPaginationOutput;
  primeConfig: PrimeConfigOutput;
  primeFaq: Array<PrimeFaqOutput>;
  product: ProductOutput;
  productDeliveryTime: Array<ProductDeliveryTimeOutput>;
  productRecommendations: Array<ProductRecommendationOutput>;
  profile: ProfileOutput;
  recommendationShelf: RecommendationOutput;
  ronRedirect?: Maybe<RonRedirectOutput>;
  search: SearchOutput;
  searchAutocompleteSuggestions: Array<Scalars['String']['output']>;
  searchFacets: SearchFacetOutput;
  searchNews: Array<SearchNewsOutput>;
  sellerInfo?: Maybe<SellerInfoOutput>;
  sellersMktin: Array<Scalars['String']['output']>;
  shippingSimulation: ShippingSimulationOutput;
  trackingCode?: Maybe<TrackingCodeOutput>;
  updateInApp?: Maybe<UpdateInAppOutput>;
  verifyDorisProduct: DorisOutput;
  wishlist: Array<Scalars['String']['output']>;
  wishlistCheckProduct: WishlistCheckOutput;
};


export type QueryBannerCategoryArgs = {
  input: BannerCategoryInput;
};


export type QueryCepArgs = {
  input: CepInput;
};


export type QueryCheckSearchRedirectArgs = {
  q: Scalars['String']['input'];
};


export type QueryContentfulCategoriesArgs = {
  searchKey: Scalars['String']['input'];
};


export type QueryContentfulCategoryArgs = {
  categoryId: Scalars['String']['input'];
};


export type QueryContentfulCollectionsArgs = {
  searchKey: Scalars['String']['input'];
};


export type QueryContentfulFvcProductsArgs = {
  input: FvcContentfulCollectionInput;
};


export type QueryContentfulProductsArgs = {
  q: Scalars['String']['input'];
};


export type QueryCountdownArgs = {
  input: CountdownCategoryInput;
};


export type QueryDeeplinkPathArgs = {
  input: DeeplinkPathInput;
};


export type QueryDitoRedirectArgs = {
  input: DitoRedirectInput;
};


export type QueryGetCashbackExpirationArgs = {
  input: CashbackDataInput;
};


export type QueryGetCashbackOperationArgs = {
  input: CashbackDataInput;
};


export type QueryGetCashbackTransactionArgs = {
  input: CashbackDataInput;
};


export type QueryGetCashbackWalletArgs = {
  input: CashbackDataInput;
};


export type QueryInvoiceKeyArgs = {
  input: InvoiceKeyInput;
};


export type QueryMostSearchedWordsArgs = {
  provider?: InputMaybe<SearchProviderInput>;
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


export type QueryProfileArgs = {
  input?: InputMaybe<ProfileInput>;
};


export type QueryRecommendationShelfArgs = {
  input: SmarthintShelfInput;
};


export type QueryRonRedirectArgs = {
  input: RonRedirectInput;
};


export type QuerySearchArgs = {
  input: SearchProductInput;
};


export type QuerySearchAutocompleteSuggestionsArgs = {
  provider?: InputMaybe<SearchProviderInput>;
  q: Scalars['String']['input'];
};


export type QuerySearchFacetsArgs = {
  input: SearchFacetsInput;
};


export type QuerySellerInfoArgs = {
  input: SellerInfoInput;
};


export type QueryShippingSimulationArgs = {
  input: ShippingSimulationInput;
};


export type QueryTrackingCodeArgs = {
  input: TrackingCodeInput;
};


export type QueryVerifyDorisProductArgs = {
  ean: Scalars['String']['input'];
};


export type QueryWishlistCheckProductArgs = {
  input: WishlistCheckProductInput;
};

export type RecommendationFlagOutput = {
  __typename?: 'RecommendationFlagOutput';
  text?: Maybe<Scalars['String']['output']>;
  type: Scalars['String']['output'];
  value?: Maybe<Scalars['Float']['output']>;
};

export type RecommendationOutput = {
  __typename?: 'RecommendationOutput';
  products: Array<RecommendationProductsOutput>;
  shelfName: Scalars['String']['output'];
  shelfTitle: Scalars['String']['output'];
};

export type RecommendationPriceOutput = {
  __typename?: 'RecommendationPriceOutput';
  listPrice: Scalars['Float']['output'];
  salePrice: Scalars['Float']['output'];
};

export type RecommendationProductsOutput = {
  __typename?: 'RecommendationProductsOutput';
  brand: Scalars['String']['output'];
  categoryTree: Array<Scalars['String']['output']>;
  flags: Array<RecommendationFlagOutput>;
  image: Scalars['String']['output'];
  prices: RecommendationPriceOutput;
  productId: Scalars['String']['output'];
  productLink: Scalars['String']['output'];
  productName: Scalars['String']['output'];
  sku: Array<RecommendationSkuOutput>;
};

export type RecommendationSizeOutput = {
  __typename?: 'RecommendationSizeOutput';
  disabled: Scalars['Boolean']['output'];
  skuId?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type RecommendationSkuOutput = {
  __typename?: 'RecommendationSkuOutput';
  colorHex?: Maybe<Scalars['String']['output']>;
  colorName?: Maybe<Scalars['String']['output']>;
  colorRefId?: Maybe<Scalars['String']['output']>;
  sizes: Array<RecommendationSizeOutput>;
};

export type RedefineVtexPasswordInput = {
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type RemoveProfileAddressInput = {
  addressId: Scalars['String']['input'];
};

export type RequestCodeOutput = {
  __typename?: 'RequestCodeOutput';
  cookies: Array<Scalars['String']['output']>;
  ok: Scalars['Boolean']['output'];
};

export type RequestVerificationCodeInput = {
  email: Scalars['String']['input'];
};

export type ResetVtexPasswordInput = {
  code: Scalars['String']['input'];
  cookies: Array<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type RonRedirectInput = {
  code: Scalars['String']['input'];
  orderFormId?: InputMaybe<Scalars['String']['input']>;
};

export type RonRedirectOutput = {
  __typename?: 'RonRedirectOutput';
  orderFormId?: Maybe<Scalars['String']['output']>;
  type: RonRedirectTypeEnum;
  url?: Maybe<Scalars['String']['output']>;
};

export enum RonRedirectTypeEnum {
  Custom = 'CUSTOM',
  Orderform = 'ORDERFORM',
  Pdc = 'PDC',
  Pdp = 'PDP'
}

export type SearchFacetColorItemOutput = {
  __typename?: 'SearchFacetColorItemOutput';
  hex: Scalars['String']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type SearchFacetItemOutput = {
  __typename?: 'SearchFacetItemOutput';
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type SearchFacetOutput = {
  __typename?: 'SearchFacetOutput';
  categories: Array<SearchFacetItemOutput>;
  colors: Array<SearchFacetColorItemOutput>;
  prices: SearchFacetRangeOutput;
  sizes: Array<SearchFacetItemOutput>;
};

export type SearchFacetRangeOutput = {
  __typename?: 'SearchFacetRangeOutput';
  from: Scalars['Float']['output'];
  to: Scalars['Float']['output'];
};

export type SearchFacetsInput = {
  facets?: InputMaybe<Array<SearchProductFacetInput>>;
  provider?: InputMaybe<SearchProviderEnum>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type SearchNewsOutput = {
  __typename?: 'SearchNewsOutput';
  facets: Array<ProductFacetOutput>;
  image: Scalars['String']['output'];
  orderBy?: Maybe<Scalars['String']['output']>;
  referenceId: Scalars['String']['output'];
};

export enum SearchOrderByEnum {
  OrderByBestDiscountDesc = 'OrderByBestDiscountDESC',
  OrderByNameAsc = 'OrderByNameASC',
  OrderByNameDesc = 'OrderByNameDESC',
  OrderByPriceAsc = 'OrderByPriceASC',
  OrderByPriceDesc = 'OrderByPriceDESC',
  OrderByReleaseDateDesc = 'OrderByReleaseDateDESC',
  OrderByScoreDesc = 'OrderByScoreDESC',
  OrderByTopSaleDesc = 'OrderByTopSaleDESC'
}

export type SearchOutput = {
  __typename?: 'SearchOutput';
  count: Scalars['Int']['output'];
  identifier?: Maybe<Scalars['String']['output']>;
  items: Array<ProductListOutput>;
  queryID?: Maybe<Scalars['String']['output']>;
  redirect?: Maybe<Scalars['String']['output']>;
};

export type SearchProductFacetInput = {
  key: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type SearchProductInput = {
  analitycsTags?: InputMaybe<Array<Scalars['String']['input']>>;
  facets: Array<SearchProductFacetInput>;
  orderBy?: InputMaybe<SearchOrderByEnum>;
  page: Scalars['Int']['input'];
  perPage?: InputMaybe<Scalars['Int']['input']>;
  priceRange?: InputMaybe<SearchProductPriceRangeInput>;
  provider?: InputMaybe<SearchProviderEnum>;
  q?: InputMaybe<Scalars['String']['input']>;
  userToken?: InputMaybe<Scalars['String']['input']>;
};

export type SearchProductPriceRangeInput = {
  from: Scalars['Float']['input'];
  to: Scalars['Float']['input'];
};

export enum SearchProviderEnum {
  Algolia = 'ALGOLIA',
  Smarthint = 'SMARTHINT',
  Vtex = 'VTEX'
}

export type SearchProviderInput = {
  value?: InputMaybe<SearchProviderEnum>;
};

export type SectionMediaCardsOutput = {
  __typename?: 'SectionMediaCardsOutput';
  deepLink?: Maybe<Scalars['String']['output']>;
  deepLinkNewsletter?: Maybe<Scalars['String']['output']>;
  facets?: Maybe<Array<ProductFacetOutput>>;
  headerImage?: Maybe<HomeCarouselItemImageOutput>;
  id?: Maybe<Scalars['String']['output']>;
  image?: Maybe<HomeCarouselItemImageOutput>;
  reference?: Maybe<Scalars['String']['output']>;
};

export type SellerInfoInput = {
  sellerId: Scalars['String']['input'];
};

export type SellerInfoOutput = {
  __typename?: 'SellerInfoOutput';
  bannerMobile?: Maybe<Scalars['String']['output']>;
  linkApp?: Maybe<Scalars['String']['output']>;
  logo?: Maybe<Scalars['String']['output']>;
  sellerId: Scalars['ID']['output'];
  sellerName?: Maybe<Scalars['String']['output']>;
  texto?: Maybe<Scalars['String']['output']>;
};

export type SendLeadInput = {
  email: Scalars['String']['input'];
  idCampanha: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type SessionBodyCollectionOutput = {
  __typename?: 'SessionBodyCollectionOutput';
  items?: Maybe<Array<ItemsSessionBodyCollectionOutput>>;
};

export type ShippingDeliveryOutput = {
  __typename?: 'ShippingDeliveryOutput';
  address?: Maybe<CepOutput>;
  deliveryOptions: Array<ShippingLogisticsOptions>;
};

export type ShippingItemInput = {
  id: Scalars['String']['input'];
  quantity: Scalars['String']['input'];
  seller: Scalars['String']['input'];
};

export type ShippingLogisticsOptions = {
  __typename?: 'ShippingLogisticsOptions';
  itemIndex: Scalars['String']['output'];
  selectedDeliveryChannel: DeliveryChannelEnum;
  selectedSla: Scalars['String']['output'];
};

export type ShippingSimulationInput = {
  items: Array<ShippingItemInput>;
  postalCode: Scalars['String']['input'];
};

export type ShippingSimulationOutput = {
  __typename?: 'ShippingSimulationOutput';
  delivery: ShippingDeliveryOutput;
  storeList: ShippingStoreListOutput;
};

export type ShippingStoreListOutput = {
  __typename?: 'ShippingStoreListOutput';
  deliveryOptions: Array<ShippingLogisticsOptions>;
  discountStorePickup?: Maybe<Scalars['String']['output']>;
  stores: Array<ShippingStoreOutput>;
};

export type ShippingStoreOutput = {
  __typename?: 'ShippingStoreOutput';
  address: CepOutput;
  friendlyName: Scalars['String']['output'];
  id: Scalars['String']['output'];
};

export type SignInInput = {
  email: Scalars['String']['input'];
  isNewUser?: InputMaybe<Scalars['Boolean']['input']>;
  password: Scalars['String']['input'];
};

export enum SignUpDocumentTypeEnum {
  Cnpj = 'CNPJ',
  Cpf = 'CPF'
}

export type SignUpUserInput = {
  code: Scalars['String']['input'];
  cookies: Array<Scalars['String']['input']>;
  document?: InputMaybe<Scalars['String']['input']>;
  documentType?: InputMaybe<SignUpDocumentTypeEnum>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export enum SmarthintShelfChannelEnum {
  App = 'app',
  Padrao = 'padrao'
}

export type SmarthintShelfInput = {
  /** List of the last categories visited by the customer. Submission must be made in this format: categories=category. */
  categories?: InputMaybe<Scalars['String']['input']>;
  /** Channel in which recommendations should be returned. The channel value must be the same as that configured in the Administrative Panel by the User-Retailer. */
  channel: Array<SmarthintShelfChannelEnum>;
  /** {filterfield}:{filtervalue} Filters on the recommendation, made through the productFilters sent in the Product. */
  filter?: InputMaybe<Scalars['String']['input']>;
  /** If there is a specific Display Positioning configuration for a page, the value of this page must be an attribute in this field. The value of this configuration must be the same as that registered in the Administrative Panel by the User-Retailer, if this field is not filled in or we do not have an equal value in the settings, it will be disregarded */
  pageIdentifier?: InputMaybe<Scalars['String']['input']>;
  /** Type of Page on which recommendations should be returned. The value of the Page must be the same as that configured in the Administrative Panel by the User-Retailer and may vary between: category / search / searchWithResult / home / cart / emptycart / checkout / pagenotfound / product / other */
  pageType: TrackPageTypeEnum;
  /** Position of the windows that must be returned when the call is made */
  position: Scalars['Int']['input'];
  /** For the product page, a list with only one product must be sent within it and for the Cart/Checkout pages. All products in the cart must be sent, which must follow the format: products=productid:valorProductId. */
  products?: InputMaybe<Scalars['String']['input']>;
  providers: Array<TrackProvidersEnum>;
  /** Should be sent the user's email or anonymous ID - That field it'll be hashed and sent to providers */
  userIdentifier: Scalars['String']['input'];
};

export type SubTrackAlgoliaInput = {
  /** Pseudonymous identifier for authenticated users. */
  discount?: InputMaybe<Scalars['Float']['input']>;
  /** The price of the item. This should be the final price, inclusive of any discounts in effect. */
  price?: InputMaybe<Scalars['Float']['input']>;
  /** The quantity of the purchased or added-to-cart item. The total value of a purchase is the sum of quantity multiplied with the price for each purchased item. */
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type SubscribeNewsletterInput = {
  email: Scalars['String']['input'];
};

export type TrackAlgoliaInput = {
  analitycsTags?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Pseudonymous identifier for authenticated users. */
  authenticatedUserToken: Scalars['String']['input'];
  channel?: InputMaybe<Scalars['String']['input']>;
  /** If you include pricing information in the objectData parameter or provide value, you must also specify the currency as ISO-4217 currency code, such as USD or EUR. */
  currency?: InputMaybe<Scalars['String']['input']>;
  /** Name of the specific event */
  eventName: TrackEventNameEnum;
  /** List of facet filters. You can include up to 10 filters. Format: brand:apple. Filter must be URL-encoded */
  eventSubtype?: InputMaybe<TrackEventSubTypeEnum>;
  /** Type of the event, either click, conversion or view */
  eventType: TrackEventTypeEnum;
  /** List of facet filters. You can include up to 10 filters. Format: brand:apple. Filter must be URL-encoded */
  filters?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Name of the Algolia index */
  index: TrackEventIndexEnum;
  /** Extra information about the records involved in the event—for example, to add price and quantities of purchased products. */
  objectData?: InputMaybe<Array<SubTrackAlgoliaInput>>;
  /** List of object identifiers for items of an Algolia index. You can include up to 20 objectID. */
  objectIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Provide positions of clicked objects in search results, particularly for click events with queryID. Ensure the positions are absolute, not relative to any results page. Calculate the position using the formula: position on page + page number * hits per page. */
  positions?: InputMaybe<Array<Scalars['Float']['input']>>;
  /** Unique identifier for a search query. */
  queryID?: InputMaybe<Scalars['String']['input']>;
  /** Anonymous user identifier. */
  userToken: Scalars['String']['input'];
  /** The monetary value of the event, measured in currency. For example, the total value of a purchase. */
  value?: InputMaybe<Scalars['Float']['input']>;
};

export type TrackClickInput = {
  /** In this field, it should be indicated in which SmartHint feature the product was clicked. The field can have the value 'search' when clicked within a search or the value of the 'nameRecommendation' field if the click occurs within a SmartHint recommendation showcase. */
  clickFeature?: InputMaybe<Scalars['String']['input']>;
  /** In this field, the position of the Recommendation where the product was clicked should be provided. The position should be the same as indicated in the return of the Recommendation by Page call, where values can vary from 1 to 5 */
  locationRecs: Scalars['Int']['input'];
  /** Page Identifier from which the Buyer is coming, the Source of it until reaching the current page/screen. (e.g. collection:1427, product:1924, home, checkout, bag, etc.) */
  originIdentifier: Scalars['String']['input'];
  /** Page Identifier that is being viewed by the Buyer (e.g. collection:1427, product:1924, home, checkout, bag, etc.) */
  pageIdentifier: Scalars['String']['input'];
  /** The pagetype is the identifier of the type of page the Buyer is on. */
  pageType: TrackPageTypeEnum;
  /** Field used for SmartHint to know the position of clicked products in the features, be it search or recommendation. When the Buyer clicks on a product, the value of the position in the product list should be provided */
  position: Scalars['Int']['input'];
  /** Product code clicked by the Buyer. It's important that this data is the same as what was sent to the Product Catalog. */
  productId: Scalars['String']['input'];
  providers: Array<TrackProvidersEnum>;
  /** Session Value - A session is the period of time during which the user interacts with the application; the identifier of this session should be sent. */
  session: Scalars['String']['input'];
  /** When the clickFeature field is equal to search, the term entered by the Buyer to generate the search should be sent. */
  term?: InputMaybe<Scalars['String']['input']>;
  /** Should be sent the user's email - That field it'll be hashed and sent to providers */
  userEmail?: InputMaybe<Scalars['String']['input']>;
  /** Should be sent the user's email or anonymous ID - That field it'll be hashed and sent to providers */
  userIdentifier?: InputMaybe<Scalars['String']['input']>;
};

export enum TrackEventIndexEnum {
  Default = 'default',
  DiscountDesc = 'discountDesc',
  NameAsc = 'nameAsc',
  NameDesc = 'nameDesc',
  PriceAsc = 'priceAsc',
  PriceDesc = 'priceDesc',
  ReleaseDateDesc = 'releaseDateDesc'
}

export enum TrackEventNameEnum {
  CartItems = 'cartItems',
  CartItemsSearch = 'cartItemsSearch',
  ClickedFilter = 'clickedFilter',
  ClickedItems = 'clickedItems',
  ClickedItemsSearch = 'clickedItemsSearch',
  ConvertedFilter = 'convertedFilter',
  ConvertedItems = 'convertedItems',
  ConvertedItemsSearch = 'convertedItemsSearch',
  PurchasedItems = 'purchasedItems',
  PurchasedItemsSearch = 'purchasedItemsSearch',
  ViewedFilter = 'viewedFilter',
  ViewedItems = 'viewedItems'
}

export enum TrackEventSubTypeEnum {
  AddToCart = 'addToCart',
  Purchase = 'purchase'
}

export enum TrackEventTypeEnum {
  Click = 'click',
  Conversion = 'conversion',
  View = 'view'
}

export type TrackOrderInput = {
  /** Freight value */
  freight: Scalars['Float']['input'];
  items: Array<TrackOrderProductInput>;
  /** Order ID */
  orderId: Scalars['String']['input'];
  providers: Array<TrackProvidersEnum>;
  /** Session Value - A session is the period of time during which the user interacts with the application; the identifier of this session should be sent. */
  session: Scalars['String']['input'];
  /** Order total value */
  total: Scalars['Float']['input'];
  /** Should be sent the user's email - That filed it'll be hashed and sent to providers */
  userEmail?: InputMaybe<Scalars['String']['input']>;
};

export type TrackOrderOutput = {
  __typename?: 'TrackOrderOutput';
  body?: Maybe<Scalars['String']['output']>;
  success?: Maybe<Scalars['Boolean']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type TrackOrderProductInput = {
  /** Product name */
  name: Scalars['String']['input'];
  productId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  sku: Scalars['String']['input'];
};

export enum TrackPageTypeEnum {
  Cart = 'cart',
  Category = 'category',
  Checkout = 'checkout',
  Emptycart = 'emptycart',
  Home = 'home',
  Notfound = 'notfound',
  Other = 'other',
  Product = 'product',
  Search = 'search',
  SearchWithResult = 'searchWithResult'
}

export type TrackPageViewInput = {
  /** Time in seconds that the Buyer spent on the page. */
  elapsedTime?: InputMaybe<Scalars['Int']['input']>;
  /** Page Identifier from which the Buyer is coming, the Source of it until reaching the current page/screen. (e.g. collection:1427, product:1924, home, checkout, bag, etc.) */
  originIdentifier: Scalars['String']['input'];
  /** Page Identifier that is being viewed by the Buyer (e.g. collection:1427, product:1924, home, checkout, bag, etc.) */
  pageIdentifier: Scalars['String']['input'];
  /** The pagetype is the identifier of the type of page the Buyer is on. */
  pageType: TrackPageTypeEnum;
  providers: Array<TrackProvidersEnum>;
  /** Session Value - A session is the period of time during which the user interacts with the application; the identifier of this session should be sent. */
  session: Scalars['String']['input'];
  /** Should be sent the user's email - That field it'll be hashed and sent to providers */
  userEmail?: InputMaybe<Scalars['String']['input']>;
  /** Should be sent the user's email or anonymous ID - That field it'll be hashed and sent to providers */
  userIdentifier?: InputMaybe<Scalars['String']['input']>;
};

export enum TrackProvidersEnum {
  Smarthint = 'smarthint'
}

export type TrackingCodeInput = {
  trackingCode: Scalars['String']['input'];
};

export type TrackingCodeOutput = {
  __typename?: 'TrackingCodeOutput';
  estimatedDeliveryDate?: Maybe<Scalars['Float']['output']>;
  estimatedDeliveryDateFormated?: Maybe<Scalars['String']['output']>;
  lastStatusCreated?: Maybe<Scalars['String']['output']>;
  providerMessage?: Maybe<Scalars['String']['output']>;
  shipmentOrderVolumeState?: Maybe<Scalars['String']['output']>;
  shippingAdditional?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Scalars['String']['output']>;
  shippingCity?: Maybe<Scalars['String']['output']>;
  shippingQuarter?: Maybe<Scalars['String']['output']>;
  shippingReference?: Maybe<Scalars['String']['output']>;
  shippingState?: Maybe<Scalars['String']['output']>;
  trackingUrl?: Maybe<Scalars['String']['output']>;
};

export type UpdateInAppOutput = {
  __typename?: 'UpdateInAppOutput';
  onlyPlatform?: Maybe<Scalars['String']['output']>;
  targetVersion?: Maybe<Scalars['String']['output']>;
  updateAllVersions?: Maybe<Scalars['Boolean']['output']>;
  updateDescription?: Maybe<Scalars['String']['output']>;
  updateTitle?: Maybe<Scalars['String']['output']>;
  updateType?: Maybe<Scalars['String']['output']>;
};

export type UpsertProfileAddressInput = {
  addressId?: InputMaybe<Scalars['ID']['input']>;
  addressName?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  complement?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  mainAddress?: InputMaybe<Scalars['Boolean']['input']>;
  neighborhood: Scalars['String']['input'];
  number: Scalars['String']['input'];
  postalCode: Scalars['String']['input'];
  receiverName: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
};

export type WishlistAddProductInput = {
  productId: Scalars['String']['input'];
  skuId: Scalars['String']['input'];
};

export type WishlistCheckOutput = {
  __typename?: 'WishlistCheckOutput';
  inList: Scalars['Boolean']['output'];
  listIds: Array<Scalars['String']['output']>;
};

export type WishlistCheckProductInput = {
  productId: Scalars['String']['input'];
  skuId: Scalars['String']['input'];
};

export type WishlistRemoveProductInput = {
  productId?: InputMaybe<Scalars['String']['input']>;
  skuId?: InputMaybe<Scalars['String']['input']>;
};

export type AvailableGiftsFragmentFragment = { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string };

export type KitFragmentFragment = { __typename?: 'ProductKitOutput', productId: string, productName: string, colorUrls: Array<{ __typename?: 'ProductColorUrlOutput', id: string, url: string }>, colors: Array<{ __typename?: 'ProductColorOutput', colorId: string, colorName?: string | null, colorUrl: string, disabled: boolean, images: Array<string>, sizes: Array<{ __typename?: 'ProductSizeOutput', itemId: string, skuName: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number }, prime?: { __typename?: 'PrimeInfoOutput', price: number, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number } } | null, installmentEqualPrime?: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } | null }> }> };

export type OrderFormFragmentFragment = { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null };

export type OrderformPackageItemsFragmentFragment = { __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null };

export type OrderformSelectableGiftFragmentFragment = { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> };

export type ProductColorFragmentFragment = { __typename?: 'ProductColorOutput', images: Array<string>, colorId: string, colorUrl: string, colorName?: string | null, disabled: boolean, sizes: Array<{ __typename?: 'ProductSizeOutput', itemId: string, skuName: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number }, prime?: { __typename?: 'PrimeInfoOutput', price: number, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number } } | null, installmentEqualPrime?: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } | null }> };

export type ProductSizeFragmentFragment = { __typename?: 'ProductSizeOutput', itemId: string, skuName: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number }, prime?: { __typename?: 'PrimeInfoOutput', price: number, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number } } | null, installmentEqualPrime?: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } | null };

export type ProfileFragmentFragment = { __typename?: 'ProfileOutput', id: string, authCookie?: string | null, email: string, firstName?: string | null, lastName?: string | null, document?: string | null, birthDate?: string | null, homePhone?: string | null, isPrime: boolean, gender?: string | null, isComplete: boolean, addresses: Array<{ __typename?: 'ProfileAddressOutput', id: string, receiverName?: string | null, complement?: string | null, neighborhood?: string | null, country?: string | null, state?: string | null, number?: string | null, street?: string | null, postalCode?: string | null, city?: string | null, reference?: string | null, addressName?: string | null, addressType?: string | null } | null>, customFields: Array<{ __typename?: 'ProfileCustomFieldOutput', cacheId?: string | null, key?: string | null, value?: string | null } | null> };

export type OrderFormSelectAddressMutationVariables = Exact<{
  input: OrderformSelectAddressInput;
}>;


export type OrderFormSelectAddressMutation = { __typename?: 'Mutation', orderFormSelectAddress: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormAddDiscountCouponMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
  coupon: Scalars['String']['input'];
}>;


export type OrderFormAddDiscountCouponMutation = { __typename?: 'Mutation', orderFormAddDiscountCoupon: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormAddGiftMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
  index: Scalars['Int']['input'];
  id: Scalars['String']['input'];
}>;


export type OrderFormAddGiftMutation = { __typename?: 'Mutation', orderFormAddGift: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormAddItemMutationVariables = Exact<{
  input: OrderformAddItemInput;
}>;


export type OrderFormAddItemMutation = { __typename?: 'Mutation', orderFormAddItem: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormAddMultipleItemMutationVariables = Exact<{
  input: OrderformAddMultipleItemInput;
}>;


export type OrderFormAddMultipleItemMutation = { __typename?: 'Mutation', orderFormAddMultipleItem: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormAddSellerCouponMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
  coupon: Scalars['String']['input'];
}>;


export type OrderFormAddSellerCouponMutation = { __typename?: 'Mutation', orderFormAddSellerCoupon: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormRefreshDataMutationVariables = Exact<{
  input: OrderformRefreshDataInput;
}>;


export type OrderFormRefreshDataMutation = { __typename?: 'Mutation', orderFormRefreshData: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormRemoveDiscountCouponMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
}>;


export type OrderFormRemoveDiscountCouponMutation = { __typename?: 'Mutation', orderFormRemoveDiscountCoupon: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormRemoveGiftMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
  index: Scalars['Int']['input'];
  id: Scalars['String']['input'];
}>;


export type OrderFormRemoveGiftMutation = { __typename?: 'Mutation', orderFormRemoveGift: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormRemoveSellerCouponMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
}>;


export type OrderFormRemoveSellerCouponMutation = { __typename?: 'Mutation', orderFormRemoveSellerCoupon: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormRemoveUnavailableItemsMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
}>;


export type OrderFormRemoveUnavailableItemsMutation = { __typename?: 'Mutation', orderFormRemoveUnavailableItems: { __typename?: 'GenericOutput', message?: string | null, error: boolean } };

export type OrderFormResetMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
}>;


export type OrderFormResetMutation = { __typename?: 'Mutation', orderFormReset: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormSetGiftSizeMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
  giftId: Scalars['String']['input'];
  id: Scalars['String']['input'];
  seller: Scalars['String']['input'];
}>;


export type OrderFormSetGiftSizeMutation = { __typename?: 'Mutation', orderFormSetGiftSize: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type OrderFormUpdateItemMutationVariables = Exact<{
  orderFormId: Scalars['String']['input'];
  seller: Scalars['String']['input'];
  id: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  index: Scalars['Int']['input'];
}>;


export type OrderFormUpdateItemMutation = { __typename?: 'Mutation', orderFormUpdateItem: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type ProfileUpdateMutationVariables = Exact<{
  input: ProfileUpdateInput;
}>;


export type ProfileUpdateMutation = { __typename?: 'Mutation', profile: { __typename?: 'ProfileOutput', id: string, authCookie?: string | null, email: string, firstName?: string | null, lastName?: string | null, document?: string | null, birthDate?: string | null, homePhone?: string | null, isPrime: boolean, gender?: string | null, isComplete: boolean, addresses: Array<{ __typename?: 'ProfileAddressOutput', id: string, receiverName?: string | null, complement?: string | null, neighborhood?: string | null, country?: string | null, state?: string | null, number?: string | null, street?: string | null, postalCode?: string | null, city?: string | null, reference?: string | null, addressName?: string | null, addressType?: string | null } | null>, customFields: Array<{ __typename?: 'ProfileCustomFieldOutput', cacheId?: string | null, key?: string | null, value?: string | null } | null> } };

export type ProfileAddressMutationVariables = Exact<{
  input: UpsertProfileAddressInput;
}>;


export type ProfileAddressMutation = { __typename?: 'Mutation', profileAddress: { __typename?: 'ProfileAddressOutput', id: string, addressName?: string | null, receiverName?: string | null, complement?: string | null, neighborhood?: string | null, country?: string | null, state?: string | null, number?: string | null } };

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
  customerId: Scalars['String']['input'];
}>;


export type RemoveUserMutationMutation = { __typename?: 'Mutation', removeCustomer: boolean };

export type SendLeadsMutationVariables = Exact<{
  idCampanha: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
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

export type TrackClickV2MutationVariables = Exact<{
  input: TrackClickInput;
}>;


export type TrackClickV2Mutation = { __typename?: 'Mutation', trackClickV2: Array<string> };

export type TrackOrderMutationVariables = Exact<{
  input: TrackOrderInput;
}>;


export type TrackOrderMutation = { __typename?: 'Mutation', trackOrder: { __typename?: 'TrackOrderOutput', success?: boolean | null, url?: string | null, body?: string | null } };

export type TrackPageViewMutationVariables = Exact<{
  input: TrackPageViewInput;
}>;


export type TrackPageViewMutation = { __typename?: 'Mutation', trackPageView: boolean };

export type TrackingMutationVariables = Exact<{
  input: TrackAlgoliaInput;
}>;


export type TrackingMutation = { __typename?: 'Mutation', tracking: boolean };

export type WishlistAddProductMutationVariables = Exact<{
  input: WishlistAddProductInput;
}>;


export type WishlistAddProductMutation = { __typename?: 'Mutation', wishlistAddProduct: Array<string> };

export type WishlistRemoveProductMutationVariables = Exact<{
  input: WishlistRemoveProductInput;
}>;


export type WishlistRemoveProductMutation = { __typename?: 'Mutation', wishlistRemoveProduct: Array<string> };

export type AppMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type AppMenuQuery = { __typename?: 'Query', appMenu: Array<{ __typename?: 'MenuCategoryOutput', name: string, type: MenuItemTypeEnum, deeplinkUrl?: string | null, highlight: boolean, referenceId?: string | null, facets: Array<{ __typename?: 'ProductFacetOutput', key: string, value: string }>, children: Array<{ __typename?: 'MenuCategoryItemOutput', name: string, type: MenuItemTypeEnum, deeplinkUrl?: string | null, highlight: boolean, referenceId?: string | null, facets: Array<{ __typename?: 'ProductFacetOutput', key: string, value: string }>, filters?: { __typename?: 'MenuCategoryItemFiltersOutput', priceFilter?: { __typename?: 'MenuCategoryItemPricesFilterOutput', from?: number | null, to?: number | null } | null } | null }> }> };

export type BannerCategoryQueryVariables = Exact<{
  input: BannerCategoryInput;
}>;


export type BannerCategoryQuery = { __typename?: 'Query', bannerCategory: Array<{ __typename?: 'BannerCategoryOutput', image: { __typename?: 'BannerCategoryImageOutput', url: string } }> };

export type CashbackQueryVariables = Exact<{ [key: string]: never; }>;


export type CashbackQuery = { __typename?: 'Query', cashback: { __typename?: 'CashbackOutput', wallet: { __typename?: 'CashbackWalletOutput', balanceInCents: number }, expiration: { __typename?: 'CashbackExpirationInfoOutput', totalExpireBalanceInCents: string, cashbackToExpire: Array<{ __typename?: 'CashbackExpirationItemOutput', expireAt: string, expireCashbackAmount: string }> }, operations: Array<{ __typename?: 'CashbackOperationOutput', status: string, cashbackAmountInCents: number, appliedBalanceInCents: number, settlementDate?: string | null, createdAt: string }> } };

export type CepQueryVariables = Exact<{
  input: CepInput;
}>;


export type CepQuery = { __typename?: 'Query', cep?: { __typename?: 'CepOutput', postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, neighborhood?: string | null, reference?: string | null, geoCoordinates?: Array<number> | null } | null };

export type CheckSearchRedirectQueryVariables = Exact<{
  q: Scalars['String']['input'];
}>;


export type CheckSearchRedirectQuery = { __typename?: 'Query', checkSearchRedirect?: string | null };

export type ConfigShippingBarQueryVariables = Exact<{ [key: string]: never; }>;


export type ConfigShippingBarQuery = { __typename?: 'Query', config?: { __typename?: 'ConfigOutput', shippingBar?: { __typename?: 'ConfigShippingBarOutput', freeShippingValue?: number | null, isFreeShipping?: boolean | null } | null } | null };

export type CountdownQueryVariables = Exact<{
  input: CountdownCategoryInput;
}>;


export type CountdownQuery = { __typename?: 'Query', countdown?: { __typename?: 'CountdownClockCategoryOutput', textColor: string, bannerColor: string, buttonColor: string, backgroundColor: string, selectClockScreen: ClockScreenEnum, title: string, subtitle: string, titleButton: string, titleModal: string, remainingTime: string, reference: string, descriptionModal?: string | null } | null };

export type DeeplinkPathQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type DeeplinkPathQuery = { __typename?: 'Query', deeplinkPath?: { __typename?: 'DeeplinkOutput', path: string, referenceId?: string | null, active: boolean } | null };

export type HelpCenterCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type HelpCenterCollectionQuery = { __typename?: 'Query', helpCenterCollection: { __typename?: 'HelpCenterOutput', items?: Array<{ __typename?: 'HelpCenterCollectionsItemsOutput', titleHelpCenter?: string | null, itemsHelpCenterCollection?: { __typename?: 'ItemsHelpCenterCollectionOutput', items?: Array<{ __typename?: 'ContentItemsHelpCenterCollectionOutput', sessionTitle?: string | null, linkUrl?: string | null, sessionBodyCollection?: { __typename?: 'SessionBodyCollectionOutput', items?: Array<{ __typename?: 'ItemsSessionBodyCollectionOutput', helpCenterSessionTitle?: string | null, helpCenterBodyText?: string | null, expansePanel?: { __typename?: 'ExpansePanelOutput', expansePanelCollection?: { __typename?: 'ItemsExpansePanelCollectionOutput', items?: Array<{ __typename?: 'ContentItemsExpansePanelCollectionOutput', expanseTitleItem?: string | null, expanseContentItem?: string | null }> | null } | null } | null, bodyImagesCollection?: { __typename?: 'BodyImagesCollectionOutput', items?: Array<{ __typename?: 'ItemsBodyImagesCollectionOutput', helpCenterImagesCollection?: { __typename?: 'ItemsHelpCenterImagesCollectionOutput', items?: Array<{ __typename?: 'ContentHelpCenterImagesCollectionOutput', title?: string | null, description?: string | null, url?: string | null }> | null } | null }> | null } | null }> | null } | null }> | null } | null, footerHelpCenter?: { __typename?: 'FooterHelpCenterOutput', footerTitle?: string | null, textBody?: string | null, footerLinkCollection?: { __typename?: 'FooterLinkCollectionOutput', items?: Array<{ __typename?: 'ItemsFooterLinkCollectionOutput', linkTitle?: string | null, linkHelpCenter?: string | null }> | null } | null } | null }> | null } };

export type HomeCarouselsQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeCarouselsQuery = { __typename?: 'Query', homeCarousels: Array<{ __typename?: 'HomeCarouselOutput', id: string, type: HomePageSectionTypeEnum, showtime?: number | null, items: Array<{ __typename?: 'HomeCarouselItemOutput', mkt: boolean, linkMktIn?: string | null, reservaMini: boolean, reference: string, orderBy: string, bannerLocation?: Array<string> | null, facets: Array<{ __typename?: 'ProductFacetOutput', key: string, value: string }>, image: { __typename?: 'HomeCarouselItemImageOutput', url: string, title: string, height?: number | null, width?: number | null }, filters?: { __typename?: 'HomeCarouselItemFiltersOutput', priceFilter?: { __typename?: 'HomeCarouselItemPricesFilterOutput', from?: number | null, to?: number | null } | null } | null }> }> };

export type HomeConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeConfigQuery = { __typename?: 'Query', homeConfig?: { __typename?: 'ConfigOutput', id: string, offersPage?: string | null, commercialBannerCollection: Array<{ __typename?: 'ConfigCommercialBannerOutput', name?: string | null, startingDate?: string | null, endingDate?: string | null, mainText?: string | null, hasModal: boolean, modalTitle?: string | null, modalDescription?: string | null, modalButton: boolean, modalButtonText?: string | null, modalButtonLink?: string | null }> } | null };

export type HomeCountdownQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeCountdownQuery = { __typename?: 'Query', homeCountdown?: { __typename?: 'HomeCountdownOutput', type?: ClockScreenEnum | null, title?: string | null, subtitle?: string | null, watchType?: string | null, countdown: string, countdownStart?: string | null, titleButton?: string | null, titleModal?: string | null, descriptionModal?: string | null, reference?: string | null, formattedValue?: string | null, facets: Array<{ __typename?: 'ProductFacetOutput', key: string, value: string }>, theme: { __typename?: 'HomeCountdownThemeOutput', colorBanner: string, colorButton: string, clockBackgroundColor: string }, filters?: { __typename?: 'HomeCountdownFiltersOutput', priceFilter?: { __typename?: 'HomeCountdownPriceFilterOutput', from?: number | null, to?: number | null } | null } | null } | null };

export type HomeMediasQueryVariables = Exact<{ [key: string]: never; }>;


export type HomeMediasQuery = { __typename?: 'Query', homeMedias: Array<{ __typename?: 'HomeMediaOutput', id: string, mkt: boolean, linkMktIn?: string | null, reservaMini: boolean, deepLinkNewsletter?: string | null, deepLink?: string | null, orderBy: string, reference?: string | null, bannerLocation?: Array<string> | null, headerImage?: { __typename?: 'HomeCarouselItemImageOutput', url: string } | null, facets: Array<{ __typename?: 'ProductFacetOutput', key: string, value: string }>, image: { __typename?: 'HomeCarouselItemImageOutput', url: string, title: string } }> };

export type InfoCashbackPdpCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type InfoCashbackPdpCollectionQuery = { __typename?: 'Query', infoCashbackPdpCollection: { __typename?: 'InfoCashbackPdpOutput', infoCashback?: string | null, infoCashbackTitleTooltip?: string | null, infoCashbackTextTooltip?: string | null } };

export type InvoiceKeyQueryVariables = Exact<{
  invoiceKey: Scalars['String']['input'];
}>;


export type InvoiceKeyQuery = { __typename?: 'Query', invoiceKey?: { __typename?: 'InvoiceKeyOutput', estimatedDeliveryDate?: number | null, estimatedDeliveryDateFormated?: string | null, shippingReference?: string | null, shippingAdditional?: string | null, shippingAddress?: string | null, shippingQuarter?: string | null, shippingCity?: string | null, shippingState?: string | null, shipmentOrderVolumeState?: string | null, providerMessage?: string | null, lastStatusCreated?: string | null } | null };

export type LandingPagePrimeQueryVariables = Exact<{ [key: string]: never; }>;


export type LandingPagePrimeQuery = { __typename?: 'Query', landingPagePrime: { __typename?: 'PrimeDetailOutput', productId: number, skuId: number, productSeller: string, installmentQty?: number | null, installmentPrice?: number | null, monthlyCashback?: number | null, discountFrom?: number | null, discountPercentage?: number | null, primeFaq?: Array<{ __typename?: 'PrimeFaqItemOutput', title?: string | null, textBody?: string | null }> | null } };

export type MktinStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type MktinStatusQuery = { __typename?: 'Query', mktinStatus: boolean };

export type MostSearchedWordsQueryVariables = Exact<{ [key: string]: never; }>;


export type MostSearchedWordsQuery = { __typename?: 'Query', mostSearchedWords: Array<string> };

export type OffersCarouselsQueryVariables = Exact<{ [key: string]: never; }>;


export type OffersCarouselsQuery = { __typename?: 'Query', offersCarousels: Array<{ __typename?: 'OffersCarouselsOutput', type: HomePageSectionTypeEnum, title?: string | null, showtime?: number | null, shelfProductsBottom?: string | null, shelfProductsTop?: string | null, shelfSubtitleBottom?: string | null, shelfSubtitleTop?: string | null, shelfTitle?: string | null, items: Array<{ __typename?: 'HomeCarouselItemOutput', mkt: boolean, linkMktIn?: string | null, reservaMini: boolean, reference: string, orderBy: string, facets: Array<{ __typename?: 'ProductFacetOutput', key: string, value: string }>, image: { __typename?: 'HomeCarouselItemImageOutput', url: string, title: string, height?: number | null, width?: number | null }, filters?: { __typename?: 'HomeCarouselItemFiltersOutput', priceFilter?: { __typename?: 'HomeCarouselItemPricesFilterOutput', from?: number | null, to?: number | null } | null } | null }>, categoryCards?: { __typename?: 'CategoryCardsOutput', sectionCardTitle?: string | null, sectionMediaCards?: Array<{ __typename?: 'SectionMediaCardsOutput', id?: string | null, deepLink?: string | null, deepLinkNewsletter?: string | null, reference?: string | null, headerImage?: { __typename?: 'HomeCarouselItemImageOutput', url: string, title: string } | null, facets?: Array<{ __typename?: 'ProductFacetOutput', key: string, value: string }> | null, image?: { __typename?: 'HomeCarouselItemImageOutput', url: string, title: string } | null }> | null } | null }> };

export type OffersPageCollectionBannerCarouselQueryVariables = Exact<{ [key: string]: never; }>;


export type OffersPageCollectionBannerCarouselQuery = { __typename?: 'Query', offersPageCollectionBannerCarousel: { __typename?: 'OffersPageBannerCarousel', title: string, items: Array<{ __typename?: 'OffersPageCollectionBannerCarouselItemOutput', id?: string | null, banner: string }> } };

export type OffersPageQueryVariables = Exact<{ [key: string]: never; }>;


export type OffersPageQuery = { __typename?: 'Query', offersPageCollectionFilter: { __typename?: 'OffersPageCollectionFilter', title: string, items: Array<{ __typename?: 'OffersPageCollectionFilterItemOutput', collectionId?: string | null, offerImage: string, offerName: string, fromPriceFilter?: string | null, toPriceFilter?: string | null, sizeFilter?: Array<string> | null, colorFilter?: Array<string> | null }> } };

export type OrderQueryVariables = Exact<{
  input: OrderDetailIdInput;
}>;


export type OrderQuery = { __typename?: 'Query', order: { __typename?: 'OrderDetailOutput', orderId: string, sequence: string, marketplaceOrderId: string, sellerOrderId: string, origin: string, affiliateId: string, salesChannel: string, status: string, statusDescription: string, value: number, creationDate: string, lastChange: string, orderGroup: string, totals: Array<{ __typename?: 'OrderDetailTotalOutput', id: string, name: string, value: number }>, clientProfileData: { __typename?: 'OrderDetailProfileDataOutput', id: string, email: string, firstName: string, lastName?: string | null, documentType: string, document: string, phone?: string | null, userProfileId: string }, items: Array<{ __typename?: 'OrderDetailItemOutput', uniqueId: string, id: string, productId: string, ean: string, quantity: number, seller: string, name: string, refId: string, price: number, listPrice: number, imageUrl: string, detailUrl: string, sellerSku: string, commission: number, tax: number, measurementUnit: string, unitMultiplier: number, sellingPrice: number, isGift: boolean, rewardValue: number, freightCommission: number, offerings: Array<{ __typename?: 'OrderDetailItemOfferingOutput', id: string, type: string, name: string, price: string }> }>, shippingData: { __typename?: 'OrderDetailShippingData', address: { __typename?: 'OrderDetailShippingDataAddress', addressType?: string | null, receiverName?: string | null, addressId?: string | null, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, geoCoordinates: Array<number> } } } };

export type OrderFormQueryVariables = Exact<{
  orderFormId: Scalars['String']['input'];
}>;


export type OrderFormQuery = { __typename?: 'Query', orderForm: { __typename?: 'OrderformOutput', orderFormId: string, salesChannel: string, messages: Array<string>, allItemsQuantity: number, hasPrimeSubscriptionInCart: boolean, clientProfileData?: { __typename?: 'OrderformClientProfileDataOutput', email?: string | null, firstName?: string | null, lastName?: string | null, document?: string | null, documentType?: string | null, phone?: string | null, corporateName?: string | null, tradeName?: string | null, corporateDocument?: string | null, stateInscription?: string | null, corporatePhone?: string | null, profileCompleteOnLoading?: string | null } | null, packageItems: Array<{ __typename?: 'OrderformPackageItemsOutput', totalShippingValue: number, items: Array<{ __typename?: 'OrderformItemOutput', index: number, productTitle: string, itemColor: string, itemSize: string, isGift: boolean, isGiftable: boolean, imageSource: string, key: string, isAssinaturaSimples: boolean, priceWithDiscount: number, discountPercent: number, discountApi?: number | null, showFirstPurchaseDiscountMessage?: string | null, showTotalDiscountFirstPurchaseValue?: number | null, productCategories: Array<string>, price?: number | null, productId: string, availability: string, id: string, ean?: string | null, listPrice?: number | null, giftOfferingId?: string | null, seller: string, hasPrimeDiscount: boolean, skuName: string, uniqueId: string, urlFacaVc: string, isAddedAsGift: boolean, name: string, quantity: number, disableCounter: boolean, sellingPrice?: number | null, isPrimeSubscription: boolean, additionalInfo?: { __typename?: 'OrderformItemAdditionalInfoOutput', brandName?: string | null } | null }>, metadata?: { __typename?: 'OrderformPackageItemsMetadataOutput', shippingEstimate?: number | null, friendlyName?: string | null, availability?: PackageAvailabilityEnum | null } | null }>, selectableGift?: { __typename?: 'OrderformSelectableGiftOutput', id: string, availableQuantity?: number | null, currentSelectableGift: { __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }, giftOptions: Array<{ __typename?: 'OrderformSelectableGiftOptionOutput', id: string, color: string, size: string } | null>, availableGifts: Array<{ __typename?: 'OrderformSelectableGiftAvailableGiftOutput', isSelected: boolean, uniqueId: string, id: string, productId: string, productRefId: string, imageUrl?: string | null, detailUrl: string, availability: string, measurementUnit: string, unitMultiplier: number, refId: string, ean: string, name: string, skuName: string, tax?: number | null, rewardValue?: number | null, isGift?: boolean | null, seller: string }> } | null, marketingData?: { __typename?: 'OrderformMarketingDataOutput', coupon?: string | null, sellerCoupon?: string | null, sellerCouponName?: string | null, itemsWithCouponDiscount: Array<{ __typename?: 'OrderformItemOutput', id: string, name: string, sellingPrice?: number | null, itemColor: string, imageUrl?: string | null, imageSource: string }> } | null, shippingData?: { __typename?: 'OrderformShippingDataOutput', address?: { __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null } | null, availableAddresses: Array<{ __typename?: 'OrderformAddressOutput', addressType?: string | null, receiverName?: string | null, addressId?: string | null, isDisposable: boolean, postalCode?: string | null, city?: string | null, state?: string | null, country?: string | null, street?: string | null, number?: string | null, neighborhood?: string | null, complement?: string | null, reference?: string | null }> } | null, appTotalizers: { __typename?: 'OrderformAppTotalizersOutput', items: number, discount: number, delivery: number, total: number }, installmentInfo: { __typename?: 'OrderformInstallmentInfoOutput', installmentsNumber: number, installmentPrice: number, totalPrice: number }, prime?: { __typename?: 'PrimeTotalizerOutput', total?: number | null, totalDiscount: number, renderApp: boolean } | null } };

export type PrimeConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type PrimeConfigQuery = { __typename?: 'Query', primeConfig: { __typename?: 'PrimeConfigOutput', idCalculatorConfiguration: string, name: string, percentualDiscountValue: number, isActive: boolean, categoriesAreInclusive: boolean, collectionsIsInclusive: boolean, brandsAreInclusive: boolean, idSeller: string, idSellerIsInclusive: boolean, totalValueFloor: number, totalValueCeling: number, marketingTags: Array<{ __typename?: 'PrimeConfigItemOutput', id: string, name: string }>, categories: Array<{ __typename?: 'PrimeConfigItemOutput', id: string, name: string }>, brands: Array<{ __typename?: 'PrimeConfigItemOutput', id: string, name: string }>, collections: Array<{ __typename?: 'PrimeConfigItemOutput', id: string, name: string }> } };

export type PrimeFaqQueryVariables = Exact<{ [key: string]: never; }>;


export type PrimeFaqQuery = { __typename?: 'Query', primeFaq: Array<{ __typename?: 'PrimeFaqOutput', id: string, title: string, body: string }> };

export type ProductQueryVariables = Exact<{
  input: ProductInput;
}>;


export type ProductQuery = { __typename?: 'Query', product: { __typename?: 'ProductOutput', action: ProductResultActionEnum, productId: string, productName: string, paymentSystemGroupName?: Array<string> | null, identifier?: string | null, categoryTree: Array<string>, disabledColors: Array<string>, hasPrime?: boolean | null, saleOff: boolean, videoThumbnail?: string | null, fvcProductReference?: string | null, kit?: Array<{ __typename?: 'ProductKitOutput', productId: string, productName: string, colorUrls: Array<{ __typename?: 'ProductColorUrlOutput', id: string, url: string }>, colors: Array<{ __typename?: 'ProductColorOutput', colorId: string, colorName?: string | null, colorUrl: string, disabled: boolean, images: Array<string>, sizes: Array<{ __typename?: 'ProductSizeOutput', itemId: string, skuName: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number }, prime?: { __typename?: 'PrimeInfoOutput', price: number, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number } } | null, installmentEqualPrime?: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } | null }> }> }> | null, giftCard?: { __typename?: 'ProductGiftCardOutput', terms: string, howItWorks: string, options: Array<{ __typename?: 'ProductGiftCardOptionOutput', itemId: string, name: string, ean: string, seller: string, images: Array<string> }> } | null, priceRange?: { __typename?: 'ProductPriceRangeOutput', sellingPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number }, listPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number } } | null, share: { __typename?: 'ProductShareOutput', title: string, message: string, url: string }, properties: { __typename?: 'ProductPropertiesOutput', description?: string | null, isAssinaturaSimples?: boolean | null, composition?: string | null }, colorUrls: Array<{ __typename?: 'ProductColorUrlOutput', id: string, url: string }>, colors: Array<{ __typename?: 'ProductColorOutput', images: Array<string>, colorId: string, colorUrl: string, colorName?: string | null, disabled: boolean, sizes: Array<{ __typename?: 'ProductSizeOutput', itemId: string, skuName: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number }, prime?: { __typename?: 'PrimeInfoOutput', price: number, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number } } | null, installmentEqualPrime?: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } | null }> }>, initialColor?: { __typename?: 'ProductColorOutput', images: Array<string>, colorId: string, colorUrl: string, colorName?: string | null, disabled: boolean, sizes: Array<{ __typename?: 'ProductSizeOutput', itemId: string, skuName: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number }, prime?: { __typename?: 'PrimeInfoOutput', price: number, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number } } | null, installmentEqualPrime?: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } | null }> } | null, initialSize?: { __typename?: 'ProductSizeOutput', itemId: string, skuName: string, size: string, ean: string, seller: string, listPrice: number, currentPrice: number, discountPercent: number, hasDiscount: boolean, availableQuantity: number, disabled: boolean, installment: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number }, prime?: { __typename?: 'PrimeInfoOutput', price: number, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number } } | null, installmentEqualPrime?: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } | null } | null } };

export type ProductDeliveryTimeQueryVariables = Exact<{
  input: CheckDeliveryTimeByProductInput;
}>;


export type ProductDeliveryTimeQuery = { __typename?: 'Query', productDeliveryTime: Array<{ __typename?: 'ProductDeliveryTimeOutput', name: string, price: number, estimatedDay?: string | null, storeName: string, isDelivery: boolean }> };

export type ProductRecommendationsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductRecommendationsQuery = { __typename?: 'Query', productRecommendations: Array<{ __typename?: 'ProductRecommendationOutput', productId: string, productName: string, priceRange: { __typename?: 'ProductPriceRangeOutput', sellingPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number }, listPrice: { __typename?: 'ProductPriceLevelOutput', highPrice: number, lowPrice: number } }, items: Array<{ __typename?: 'ProductItemOutput', images: Array<string>, itemId?: string | null, skuName?: string | null, variations: Array<{ __typename?: 'ProductItemVariationOutput', originalName?: string | null, name?: string | null, values?: Array<string> | null }>, sellers: Array<{ __typename?: 'ProductItemSellerOutput', sellerId?: string | null, sellerDefault?: boolean | null, commertialOffer?: { __typename?: 'ProductItemSellerCommertialOfferOutput', tax: number, taxPercentage: number, availableQuantity: number, price: number, listPrice: number, spotPrice: number, priceWithoutDiscount: number, installments: Array<{ __typename?: 'ProductItemSellerCommertialOfferInstallmentOutput', value: number, totalValuePlusInterestRate: number, numberOfInstallments: number }> } | null }> }> }> };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'ProfileOutput', id: string, authCookie?: string | null, email: string, firstName?: string | null, lastName?: string | null, document?: string | null, birthDate?: string | null, homePhone?: string | null, isPrime: boolean, gender?: string | null, isComplete: boolean, addresses: Array<{ __typename?: 'ProfileAddressOutput', id: string, receiverName?: string | null, complement?: string | null, neighborhood?: string | null, country?: string | null, state?: string | null, number?: string | null, street?: string | null, postalCode?: string | null, city?: string | null, reference?: string | null, addressName?: string | null, addressType?: string | null } | null>, customFields: Array<{ __typename?: 'ProfileCustomFieldOutput', cacheId?: string | null, key?: string | null, value?: string | null } | null> } };

export type RecommendationShelfQueryVariables = Exact<{
  input: SmarthintShelfInput;
}>;


export type RecommendationShelfQuery = { __typename?: 'Query', recommendationShelf: { __typename?: 'RecommendationOutput', shelfName: string, shelfTitle: string, products: Array<{ __typename?: 'RecommendationProductsOutput', productName: string, productId: string, productLink: string, brand: string, image: string, categoryTree: Array<string>, flags: Array<{ __typename?: 'RecommendationFlagOutput', type: string, value?: number | null, text?: string | null }>, prices: { __typename?: 'RecommendationPriceOutput', listPrice: number, salePrice: number }, sku: Array<{ __typename?: 'RecommendationSkuOutput', colorName?: string | null, colorHex?: string | null, colorRefId?: string | null, sizes: Array<{ __typename?: 'RecommendationSizeOutput', skuId?: string | null, value?: string | null, disabled: boolean }> }> }> } };

export type ReturnPolicyConfigQueryVariables = Exact<{ [key: string]: never; }>;


export type ReturnPolicyConfigQuery = { __typename?: 'Query', config?: { __typename?: 'ConfigOutput', returnPolicy?: string | null } | null };

export type RonRedirectQueryVariables = Exact<{
  code: Scalars['String']['input'];
}>;


export type RonRedirectQuery = { __typename?: 'Query', ronRedirect?: { __typename?: 'RonRedirectOutput', type: RonRedirectTypeEnum, url?: string | null, orderFormId?: string | null } | null };

export type SearchQueryVariables = Exact<{
  input: SearchProductInput;
}>;


export type SearchQuery = { __typename?: 'Query', search: { __typename?: 'SearchOutput', queryID?: string | null, identifier?: string | null, count: number, items: Array<{ __typename?: 'ProductListOutput', productId: string, skuId: string, ean: string, skuName: string, productName: string, colors?: Array<string> | null, brand: string, category?: string | null, size?: string | null, colorName?: string | null, image: string, listPrice: number, currentPrice: number, hasDiscount: boolean, isKitLook?: boolean | null, discountPercentage: number, prime?: { __typename?: 'ProductListPrimeOutput', price: number, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number } } | null, installment: { __typename?: 'ProductPriceInstallmentOutput', value: number, number: number }, installmentEqualPrime?: { __typename?: 'ProductSizeInstallmentOutput', value: number, number: number } | null }> } };

export type SearchAutocompleteSuggestionsQueryVariables = Exact<{
  q: Scalars['String']['input'];
  provider: SearchProviderInput;
}>;


export type SearchAutocompleteSuggestionsQuery = { __typename?: 'Query', searchAutocompleteSuggestions: Array<string> };

export type SearchFacetsQueryVariables = Exact<{
  input: SearchFacetsInput;
}>;


export type SearchFacetsQuery = { __typename?: 'Query', searchFacets: { __typename?: 'SearchFacetOutput', categories: Array<{ __typename?: 'SearchFacetItemOutput', key: string, value: string, name: string }>, colors: Array<{ __typename?: 'SearchFacetColorItemOutput', key: string, value: string, name: string, hex: string }>, sizes: Array<{ __typename?: 'SearchFacetItemOutput', key: string, value: string, name: string }>, prices: { __typename?: 'SearchFacetRangeOutput', from: number, to: number } } };

export type SearchNewsQueryVariables = Exact<{ [key: string]: never; }>;


export type SearchNewsQuery = { __typename?: 'Query', searchNews: Array<{ __typename?: 'SearchNewsOutput', image: string, referenceId: string, orderBy?: string | null, facets: Array<{ __typename?: 'ProductFacetOutput', key: string, value: string }> }> };

export type ShippingSimulationQueryVariables = Exact<{
  input: ShippingSimulationInput;
}>;


export type ShippingSimulationQuery = { __typename?: 'Query', shippingSimulation: { __typename?: 'ShippingSimulationOutput', delivery: { __typename?: 'ShippingDeliveryOutput', address?: { __typename?: 'CepOutput', street?: string | null, postalCode?: string | null, city?: string | null, state?: string | null, neighborhood?: string | null, reference?: string | null, country?: string | null } | null, deliveryOptions: Array<{ __typename?: 'ShippingLogisticsOptions', itemIndex: string, selectedSla: string, selectedDeliveryChannel: DeliveryChannelEnum }> }, storeList: { __typename?: 'ShippingStoreListOutput', discountStorePickup?: string | null, stores: Array<{ __typename?: 'ShippingStoreOutput', friendlyName: string, id: string, address: { __typename?: 'CepOutput', addressId?: string | null, postalCode?: string | null, street?: string | null, neighborhood?: string | null, city?: string | null, state?: string | null, complement?: string | null, number?: string | null } }>, deliveryOptions: Array<{ __typename?: 'ShippingLogisticsOptions', itemIndex: string, selectedSla: string, selectedDeliveryChannel: DeliveryChannelEnum }> } } };

export type TrackingCodeQueryVariables = Exact<{
  trackingCode: Scalars['String']['input'];
}>;


export type TrackingCodeQuery = { __typename?: 'Query', trackingCode?: { __typename?: 'TrackingCodeOutput', trackingUrl?: string | null, estimatedDeliveryDate?: number | null, estimatedDeliveryDateFormated?: string | null, shippingReference?: string | null, shippingAddress?: string | null, shippingQuarter?: string | null, shippingCity?: string | null, shippingState?: string | null, shippingAdditional?: string | null, shipmentOrderVolumeState?: string | null, providerMessage?: string | null, lastStatusCreated?: string | null } | null };

export type UpdateInAppQueryVariables = Exact<{ [key: string]: never; }>;


export type UpdateInAppQuery = { __typename?: 'Query', updateInApp?: { __typename?: 'UpdateInAppOutput', updateTitle?: string | null, updateDescription?: string | null, updateAllVersions?: boolean | null, targetVersion?: string | null, onlyPlatform?: string | null, updateType?: string | null } | null };

export type VerifyDorisProductQueryVariables = Exact<{
  ean: Scalars['String']['input'];
}>;


export type VerifyDorisProductQuery = { __typename?: 'Query', verifyDorisProduct: { __typename?: 'DorisOutput', valid: boolean } };

export type WishlistQueryVariables = Exact<{ [key: string]: never; }>;


export type WishlistQuery = { __typename?: 'Query', wishlist: Array<string> };

export type WishlistCheckProductQueryVariables = Exact<{
  input: WishlistCheckProductInput;
}>;


export type WishlistCheckProductQuery = { __typename?: 'Query', wishlistCheckProduct: { __typename?: 'WishlistCheckOutput', inList: boolean, listIds: Array<string> } };

export const ProductSizeFragmentFragmentDoc = gql`
    fragment productSizeFragment on ProductSizeOutput {
  itemId
  skuName
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
  prime {
    price
    installment {
      value
      number
    }
  }
  installmentEqualPrime {
    value
    number
  }
  disabled
}
    `;
export const KitFragmentFragmentDoc = gql`
    fragment kitFragment on ProductKitOutput {
  productId
  productName
  colorUrls {
    id
    url
  }
  colors {
    colorId
    colorName
    colorUrl
    disabled
    images
    sizes {
      ...productSizeFragment
    }
  }
}
    ${ProductSizeFragmentFragmentDoc}`;
export const OrderformPackageItemsFragmentFragmentDoc = gql`
    fragment OrderformPackageItemsFragment on OrderformPackageItemsOutput {
  items {
    index
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
    productCategories
    price
    productId
    availability
    id
    ean
    listPrice
    giftOfferingId
    seller
    hasPrimeDiscount
    skuName
    uniqueId
    urlFacaVc
    isAddedAsGift
    name
    quantity
    disableCounter
    sellingPrice
    isPrimeSubscription
    additionalInfo {
      brandName
    }
  }
  totalShippingValue
  metadata {
    shippingEstimate
    friendlyName
    availability
  }
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
export const OrderFormFragmentFragmentDoc = gql`
    fragment orderFormFragment on OrderformOutput {
  orderFormId
  salesChannel
  messages
  clientProfileData {
    email
    firstName
    lastName
    document
    documentType
    phone
    corporateName
    tradeName
    corporateDocument
    stateInscription
    corporatePhone
    profileCompleteOnLoading
  }
  packageItems {
    ...OrderformPackageItemsFragment
  }
  selectableGift {
    ...OrderformSelectableGiftFragment
  }
  marketingData {
    coupon
    sellerCoupon
    sellerCouponName
    itemsWithCouponDiscount {
      id
      name
      sellingPrice
      itemColor
      imageUrl
      imageSource
    }
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
  prime {
    total
    totalDiscount
    renderApp
  }
  allItemsQuantity
  hasPrimeSubscriptionInCart
}
    ${OrderformPackageItemsFragmentFragmentDoc}
${OrderformSelectableGiftFragmentFragmentDoc}`;
export const ProductColorFragmentFragmentDoc = gql`
    fragment productColorFragment on ProductColorOutput {
  images
  colorId
  colorUrl
  colorName
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
  isPrime
  gender
  isComplete
  isPrime
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
}
    `;
export const OrderFormSelectAddressDocument = gql`
    mutation OrderFormSelectAddress($input: OrderformSelectAddressInput!) {
  orderFormSelectAddress(input: $input) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
export type OrderFormSelectAddressMutationFn = Apollo.MutationFunction<OrderFormSelectAddressMutation, OrderFormSelectAddressMutationVariables>;

/**
 * __useOrderFormSelectAddressMutation__
 *
 * To run a mutation, you first call `useOrderFormSelectAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormSelectAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormSelectAddressMutation, { data, loading, error }] = useOrderFormSelectAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderFormSelectAddressMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormSelectAddressMutation, OrderFormSelectAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormSelectAddressMutation, OrderFormSelectAddressMutationVariables>(OrderFormSelectAddressDocument, options);
      }
export type OrderFormSelectAddressMutationHookResult = ReturnType<typeof useOrderFormSelectAddressMutation>;
export type OrderFormSelectAddressMutationResult = Apollo.MutationResult<OrderFormSelectAddressMutation>;
export type OrderFormSelectAddressMutationOptions = Apollo.BaseMutationOptions<OrderFormSelectAddressMutation, OrderFormSelectAddressMutationVariables>;
export const OrderFormAddDiscountCouponDocument = gql`
    mutation orderFormAddDiscountCoupon($orderFormId: String!, $coupon: String!) {
  orderFormAddDiscountCoupon(input: {orderFormId: $orderFormId, coupon: $coupon}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
export const OrderFormAddItemDocument = gql`
    mutation orderFormAddItem($input: OrderformAddItemInput!) {
  orderFormAddItem(input: $input) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
export type OrderFormAddItemMutationFn = Apollo.MutationFunction<OrderFormAddItemMutation, OrderFormAddItemMutationVariables>;

/**
 * __useOrderFormAddItemMutation__
 *
 * To run a mutation, you first call `useOrderFormAddItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormAddItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormAddItemMutation, { data, loading, error }] = useOrderFormAddItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderFormAddItemMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormAddItemMutation, OrderFormAddItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormAddItemMutation, OrderFormAddItemMutationVariables>(OrderFormAddItemDocument, options);
      }
export type OrderFormAddItemMutationHookResult = ReturnType<typeof useOrderFormAddItemMutation>;
export type OrderFormAddItemMutationResult = Apollo.MutationResult<OrderFormAddItemMutation>;
export type OrderFormAddItemMutationOptions = Apollo.BaseMutationOptions<OrderFormAddItemMutation, OrderFormAddItemMutationVariables>;
export const OrderFormAddMultipleItemDocument = gql`
    mutation orderFormAddMultipleItem($input: OrderformAddMultipleItemInput!) {
  orderFormAddMultipleItem(input: $input) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
export type OrderFormAddMultipleItemMutationFn = Apollo.MutationFunction<OrderFormAddMultipleItemMutation, OrderFormAddMultipleItemMutationVariables>;

/**
 * __useOrderFormAddMultipleItemMutation__
 *
 * To run a mutation, you first call `useOrderFormAddMultipleItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormAddMultipleItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormAddMultipleItemMutation, { data, loading, error }] = useOrderFormAddMultipleItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderFormAddMultipleItemMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormAddMultipleItemMutation, OrderFormAddMultipleItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormAddMultipleItemMutation, OrderFormAddMultipleItemMutationVariables>(OrderFormAddMultipleItemDocument, options);
      }
export type OrderFormAddMultipleItemMutationHookResult = ReturnType<typeof useOrderFormAddMultipleItemMutation>;
export type OrderFormAddMultipleItemMutationResult = Apollo.MutationResult<OrderFormAddMultipleItemMutation>;
export type OrderFormAddMultipleItemMutationOptions = Apollo.BaseMutationOptions<OrderFormAddMultipleItemMutation, OrderFormAddMultipleItemMutationVariables>;
export const OrderFormAddSellerCouponDocument = gql`
    mutation orderFormAddSellerCoupon($orderFormId: String!, $coupon: String!) {
  orderFormAddSellerCoupon(input: {orderFormId: $orderFormId, coupon: $coupon}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
export const OrderFormRefreshDataDocument = gql`
    mutation orderFormRefreshData($input: OrderformRefreshDataInput!) {
  orderFormRefreshData(input: $input) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
export const OrderFormResetDocument = gql`
    mutation orderFormReset($orderFormId: String!) {
  orderFormReset(input: {orderFormId: $orderFormId}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
export type OrderFormResetMutationFn = Apollo.MutationFunction<OrderFormResetMutation, OrderFormResetMutationVariables>;

/**
 * __useOrderFormResetMutation__
 *
 * To run a mutation, you first call `useOrderFormResetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOrderFormResetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [orderFormResetMutation, { data, loading, error }] = useOrderFormResetMutation({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *   },
 * });
 */
export function useOrderFormResetMutation(baseOptions?: Apollo.MutationHookOptions<OrderFormResetMutation, OrderFormResetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OrderFormResetMutation, OrderFormResetMutationVariables>(OrderFormResetDocument, options);
      }
export type OrderFormResetMutationHookResult = ReturnType<typeof useOrderFormResetMutation>;
export type OrderFormResetMutationResult = Apollo.MutationResult<OrderFormResetMutation>;
export type OrderFormResetMutationOptions = Apollo.BaseMutationOptions<OrderFormResetMutation, OrderFormResetMutationVariables>;
export const OrderFormSetGiftSizeDocument = gql`
    mutation orderFormSetGiftSize($orderFormId: String!, $giftId: String!, $id: String!, $seller: String!) {
  orderFormSetGiftSize(
    input: {orderFormId: $orderFormId, giftId: $giftId, id: $id, seller: $seller}
  ) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
    addressName
    receiverName
    complement
    neighborhood
    country
    state
    number
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
export const TrackClickV2Document = gql`
    mutation trackClickV2($input: TrackClickInput!) {
  trackClickV2(input: $input)
}
    `;
export type TrackClickV2MutationFn = Apollo.MutationFunction<TrackClickV2Mutation, TrackClickV2MutationVariables>;

/**
 * __useTrackClickV2Mutation__
 *
 * To run a mutation, you first call `useTrackClickV2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackClickV2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackClickV2Mutation, { data, loading, error }] = useTrackClickV2Mutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackClickV2Mutation(baseOptions?: Apollo.MutationHookOptions<TrackClickV2Mutation, TrackClickV2MutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackClickV2Mutation, TrackClickV2MutationVariables>(TrackClickV2Document, options);
      }
export type TrackClickV2MutationHookResult = ReturnType<typeof useTrackClickV2Mutation>;
export type TrackClickV2MutationResult = Apollo.MutationResult<TrackClickV2Mutation>;
export type TrackClickV2MutationOptions = Apollo.BaseMutationOptions<TrackClickV2Mutation, TrackClickV2MutationVariables>;
export const TrackOrderDocument = gql`
    mutation TrackOrder($input: TrackOrderInput!) {
  trackOrder(input: $input) {
    success
    url
    body
  }
}
    `;
export type TrackOrderMutationFn = Apollo.MutationFunction<TrackOrderMutation, TrackOrderMutationVariables>;

/**
 * __useTrackOrderMutation__
 *
 * To run a mutation, you first call `useTrackOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackOrderMutation, { data, loading, error }] = useTrackOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackOrderMutation(baseOptions?: Apollo.MutationHookOptions<TrackOrderMutation, TrackOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackOrderMutation, TrackOrderMutationVariables>(TrackOrderDocument, options);
      }
export type TrackOrderMutationHookResult = ReturnType<typeof useTrackOrderMutation>;
export type TrackOrderMutationResult = Apollo.MutationResult<TrackOrderMutation>;
export type TrackOrderMutationOptions = Apollo.BaseMutationOptions<TrackOrderMutation, TrackOrderMutationVariables>;
export const TrackPageViewDocument = gql`
    mutation trackPageView($input: TrackPageViewInput!) {
  trackPageView(input: $input)
}
    `;
export type TrackPageViewMutationFn = Apollo.MutationFunction<TrackPageViewMutation, TrackPageViewMutationVariables>;

/**
 * __useTrackPageViewMutation__
 *
 * To run a mutation, you first call `useTrackPageViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackPageViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackPageViewMutation, { data, loading, error }] = useTrackPageViewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackPageViewMutation(baseOptions?: Apollo.MutationHookOptions<TrackPageViewMutation, TrackPageViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackPageViewMutation, TrackPageViewMutationVariables>(TrackPageViewDocument, options);
      }
export type TrackPageViewMutationHookResult = ReturnType<typeof useTrackPageViewMutation>;
export type TrackPageViewMutationResult = Apollo.MutationResult<TrackPageViewMutation>;
export type TrackPageViewMutationOptions = Apollo.BaseMutationOptions<TrackPageViewMutation, TrackPageViewMutationVariables>;
export const TrackingDocument = gql`
    mutation tracking($input: TrackAlgoliaInput!) {
  tracking(input: $input)
}
    `;
export type TrackingMutationFn = Apollo.MutationFunction<TrackingMutation, TrackingMutationVariables>;

/**
 * __useTrackingMutation__
 *
 * To run a mutation, you first call `useTrackingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackingMutation, { data, loading, error }] = useTrackingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackingMutation(baseOptions?: Apollo.MutationHookOptions<TrackingMutation, TrackingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TrackingMutation, TrackingMutationVariables>(TrackingDocument, options);
      }
export type TrackingMutationHookResult = ReturnType<typeof useTrackingMutation>;
export type TrackingMutationResult = Apollo.MutationResult<TrackingMutation>;
export type TrackingMutationOptions = Apollo.BaseMutationOptions<TrackingMutation, TrackingMutationVariables>;
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
export const AppMenuDocument = gql`
    query appMenu {
  appMenu {
    name
    type
    deeplinkUrl
    highlight
    referenceId
    facets {
      key
      value
    }
    children {
      name
      type
      deeplinkUrl
      highlight
      referenceId
      facets {
        key
        value
      }
      filters {
        priceFilter {
          from
          to
        }
      }
    }
  }
}
    `;

/**
 * __useAppMenuQuery__
 *
 * To run a query within a React component, call `useAppMenuQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppMenuQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppMenuQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppMenuQuery(baseOptions?: Apollo.QueryHookOptions<AppMenuQuery, AppMenuQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppMenuQuery, AppMenuQueryVariables>(AppMenuDocument, options);
      }
export function useAppMenuLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppMenuQuery, AppMenuQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppMenuQuery, AppMenuQueryVariables>(AppMenuDocument, options);
        }
export type AppMenuQueryHookResult = ReturnType<typeof useAppMenuQuery>;
export type AppMenuLazyQueryHookResult = ReturnType<typeof useAppMenuLazyQuery>;
export type AppMenuQueryResult = Apollo.QueryResult<AppMenuQuery, AppMenuQueryVariables>;
export function refetchAppMenuQuery(variables?: AppMenuQueryVariables) {
      return { query: AppMenuDocument, variables: variables }
    }
export const BannerCategoryDocument = gql`
    query bannerCategory($input: BannerCategoryInput!) {
  bannerCategory(input: $input) {
    image {
      url
    }
  }
}
    `;

/**
 * __useBannerCategoryQuery__
 *
 * To run a query within a React component, call `useBannerCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBannerCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBannerCategoryQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBannerCategoryQuery(baseOptions: Apollo.QueryHookOptions<BannerCategoryQuery, BannerCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BannerCategoryQuery, BannerCategoryQueryVariables>(BannerCategoryDocument, options);
      }
export function useBannerCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BannerCategoryQuery, BannerCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BannerCategoryQuery, BannerCategoryQueryVariables>(BannerCategoryDocument, options);
        }
export type BannerCategoryQueryHookResult = ReturnType<typeof useBannerCategoryQuery>;
export type BannerCategoryLazyQueryHookResult = ReturnType<typeof useBannerCategoryLazyQuery>;
export type BannerCategoryQueryResult = Apollo.QueryResult<BannerCategoryQuery, BannerCategoryQueryVariables>;
export function refetchBannerCategoryQuery(variables: BannerCategoryQueryVariables) {
      return { query: BannerCategoryDocument, variables: variables }
    }
export const CashbackDocument = gql`
    query cashback {
  cashback {
    wallet {
      balanceInCents
    }
    expiration {
      totalExpireBalanceInCents
      cashbackToExpire {
        expireAt
        expireCashbackAmount
      }
    }
    operations {
      status
      cashbackAmountInCents
      appliedBalanceInCents
      settlementDate
      createdAt
    }
  }
}
    `;

/**
 * __useCashbackQuery__
 *
 * To run a query within a React component, call `useCashbackQuery` and pass it any options that fit your needs.
 * When your component renders, `useCashbackQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCashbackQuery({
 *   variables: {
 *   },
 * });
 */
export function useCashbackQuery(baseOptions?: Apollo.QueryHookOptions<CashbackQuery, CashbackQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CashbackQuery, CashbackQueryVariables>(CashbackDocument, options);
      }
export function useCashbackLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CashbackQuery, CashbackQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CashbackQuery, CashbackQueryVariables>(CashbackDocument, options);
        }
export type CashbackQueryHookResult = ReturnType<typeof useCashbackQuery>;
export type CashbackLazyQueryHookResult = ReturnType<typeof useCashbackLazyQuery>;
export type CashbackQueryResult = Apollo.QueryResult<CashbackQuery, CashbackQueryVariables>;
export function refetchCashbackQuery(variables?: CashbackQueryVariables) {
      return { query: CashbackDocument, variables: variables }
    }
export const CepDocument = gql`
    query Cep($input: CepInput!) {
  cep(input: $input) {
    postalCode
    city
    state
    country
    street
    neighborhood
    reference
    geoCoordinates
  }
}
    `;

/**
 * __useCepQuery__
 *
 * To run a query within a React component, call `useCepQuery` and pass it any options that fit your needs.
 * When your component renders, `useCepQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCepQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCepQuery(baseOptions: Apollo.QueryHookOptions<CepQuery, CepQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CepQuery, CepQueryVariables>(CepDocument, options);
      }
export function useCepLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CepQuery, CepQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CepQuery, CepQueryVariables>(CepDocument, options);
        }
export type CepQueryHookResult = ReturnType<typeof useCepQuery>;
export type CepLazyQueryHookResult = ReturnType<typeof useCepLazyQuery>;
export type CepQueryResult = Apollo.QueryResult<CepQuery, CepQueryVariables>;
export function refetchCepQuery(variables: CepQueryVariables) {
      return { query: CepDocument, variables: variables }
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
export const CountdownDocument = gql`
    query countdown($input: CountdownCategoryInput!) {
  countdown(input: $input) {
    textColor
    bannerColor
    buttonColor
    backgroundColor
    selectClockScreen
    title
    subtitle
    titleButton
    titleModal
    remainingTime
    reference
    descriptionModal
  }
}
    `;

/**
 * __useCountdownQuery__
 *
 * To run a query within a React component, call `useCountdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountdownQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCountdownQuery(baseOptions: Apollo.QueryHookOptions<CountdownQuery, CountdownQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountdownQuery, CountdownQueryVariables>(CountdownDocument, options);
      }
export function useCountdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountdownQuery, CountdownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountdownQuery, CountdownQueryVariables>(CountdownDocument, options);
        }
export type CountdownQueryHookResult = ReturnType<typeof useCountdownQuery>;
export type CountdownLazyQueryHookResult = ReturnType<typeof useCountdownLazyQuery>;
export type CountdownQueryResult = Apollo.QueryResult<CountdownQuery, CountdownQueryVariables>;
export function refetchCountdownQuery(variables: CountdownQueryVariables) {
      return { query: CountdownDocument, variables: variables }
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
export const HelpCenterCollectionDocument = gql`
    query helpCenterCollection {
  helpCenterCollection {
    items {
      titleHelpCenter
      itemsHelpCenterCollection {
        items {
          sessionTitle
          linkUrl
          sessionBodyCollection {
            items {
              helpCenterSessionTitle
              helpCenterBodyText
              expansePanel {
                expansePanelCollection {
                  items {
                    expanseTitleItem
                    expanseContentItem
                  }
                }
              }
              bodyImagesCollection {
                items {
                  helpCenterImagesCollection {
                    items {
                      title
                      description
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
      footerHelpCenter {
        footerTitle
        textBody
        footerLinkCollection {
          items {
            linkTitle
            linkHelpCenter
          }
        }
      }
    }
  }
}
    `;

/**
 * __useHelpCenterCollectionQuery__
 *
 * To run a query within a React component, call `useHelpCenterCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelpCenterCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelpCenterCollectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelpCenterCollectionQuery(baseOptions?: Apollo.QueryHookOptions<HelpCenterCollectionQuery, HelpCenterCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelpCenterCollectionQuery, HelpCenterCollectionQueryVariables>(HelpCenterCollectionDocument, options);
      }
export function useHelpCenterCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelpCenterCollectionQuery, HelpCenterCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelpCenterCollectionQuery, HelpCenterCollectionQueryVariables>(HelpCenterCollectionDocument, options);
        }
export type HelpCenterCollectionQueryHookResult = ReturnType<typeof useHelpCenterCollectionQuery>;
export type HelpCenterCollectionLazyQueryHookResult = ReturnType<typeof useHelpCenterCollectionLazyQuery>;
export type HelpCenterCollectionQueryResult = Apollo.QueryResult<HelpCenterCollectionQuery, HelpCenterCollectionQueryVariables>;
export function refetchHelpCenterCollectionQuery(variables?: HelpCenterCollectionQueryVariables) {
      return { query: HelpCenterCollectionDocument, variables: variables }
    }
export const HomeCarouselsDocument = gql`
    query homeCarousels {
  homeCarousels {
    id
    type
    showtime
    items {
      mkt
      linkMktIn
      reservaMini
      reference
      orderBy
      facets {
        key
        value
      }
      image {
        url
        title
        height
        width
      }
      filters {
        priceFilter {
          from
          to
        }
      }
      bannerLocation
    }
  }
}
    `;

/**
 * __useHomeCarouselsQuery__
 *
 * To run a query within a React component, call `useHomeCarouselsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeCarouselsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeCarouselsQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeCarouselsQuery(baseOptions?: Apollo.QueryHookOptions<HomeCarouselsQuery, HomeCarouselsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeCarouselsQuery, HomeCarouselsQueryVariables>(HomeCarouselsDocument, options);
      }
export function useHomeCarouselsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeCarouselsQuery, HomeCarouselsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeCarouselsQuery, HomeCarouselsQueryVariables>(HomeCarouselsDocument, options);
        }
export type HomeCarouselsQueryHookResult = ReturnType<typeof useHomeCarouselsQuery>;
export type HomeCarouselsLazyQueryHookResult = ReturnType<typeof useHomeCarouselsLazyQuery>;
export type HomeCarouselsQueryResult = Apollo.QueryResult<HomeCarouselsQuery, HomeCarouselsQueryVariables>;
export function refetchHomeCarouselsQuery(variables?: HomeCarouselsQueryVariables) {
      return { query: HomeCarouselsDocument, variables: variables }
    }
export const HomeConfigDocument = gql`
    query homeConfig {
  homeConfig: config {
    id
    offersPage
    commercialBannerCollection {
      name
      startingDate
      endingDate
      mainText
      hasModal
      modalTitle
      modalDescription
      modalButton
      modalButtonText
      modalButtonLink
    }
  }
}
    `;

/**
 * __useHomeConfigQuery__
 *
 * To run a query within a React component, call `useHomeConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeConfigQuery(baseOptions?: Apollo.QueryHookOptions<HomeConfigQuery, HomeConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeConfigQuery, HomeConfigQueryVariables>(HomeConfigDocument, options);
      }
export function useHomeConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeConfigQuery, HomeConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeConfigQuery, HomeConfigQueryVariables>(HomeConfigDocument, options);
        }
export type HomeConfigQueryHookResult = ReturnType<typeof useHomeConfigQuery>;
export type HomeConfigLazyQueryHookResult = ReturnType<typeof useHomeConfigLazyQuery>;
export type HomeConfigQueryResult = Apollo.QueryResult<HomeConfigQuery, HomeConfigQueryVariables>;
export function refetchHomeConfigQuery(variables?: HomeConfigQueryVariables) {
      return { query: HomeConfigDocument, variables: variables }
    }
export const HomeCountdownDocument = gql`
    query homeCountdown {
  homeCountdown {
    type
    title
    subtitle
    watchType
    countdown
    countdownStart
    titleButton
    titleModal
    descriptionModal
    reference
    formattedValue
    facets {
      key
      value
    }
    theme {
      colorBanner
      colorButton
      clockBackgroundColor
    }
    filters {
      priceFilter {
        from
        to
      }
    }
  }
}
    `;

/**
 * __useHomeCountdownQuery__
 *
 * To run a query within a React component, call `useHomeCountdownQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeCountdownQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeCountdownQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeCountdownQuery(baseOptions?: Apollo.QueryHookOptions<HomeCountdownQuery, HomeCountdownQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeCountdownQuery, HomeCountdownQueryVariables>(HomeCountdownDocument, options);
      }
export function useHomeCountdownLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeCountdownQuery, HomeCountdownQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeCountdownQuery, HomeCountdownQueryVariables>(HomeCountdownDocument, options);
        }
export type HomeCountdownQueryHookResult = ReturnType<typeof useHomeCountdownQuery>;
export type HomeCountdownLazyQueryHookResult = ReturnType<typeof useHomeCountdownLazyQuery>;
export type HomeCountdownQueryResult = Apollo.QueryResult<HomeCountdownQuery, HomeCountdownQueryVariables>;
export function refetchHomeCountdownQuery(variables?: HomeCountdownQueryVariables) {
      return { query: HomeCountdownDocument, variables: variables }
    }
export const HomeMediasDocument = gql`
    query homeMedias {
  homeMedias {
    id
    mkt
    linkMktIn
    reservaMini
    deepLinkNewsletter
    deepLink
    headerImage {
      url
    }
    orderBy
    reference
    facets {
      key
      value
    }
    image {
      url
      title
    }
    bannerLocation
  }
}
    `;

/**
 * __useHomeMediasQuery__
 *
 * To run a query within a React component, call `useHomeMediasQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeMediasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeMediasQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeMediasQuery(baseOptions?: Apollo.QueryHookOptions<HomeMediasQuery, HomeMediasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HomeMediasQuery, HomeMediasQueryVariables>(HomeMediasDocument, options);
      }
export function useHomeMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeMediasQuery, HomeMediasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HomeMediasQuery, HomeMediasQueryVariables>(HomeMediasDocument, options);
        }
export type HomeMediasQueryHookResult = ReturnType<typeof useHomeMediasQuery>;
export type HomeMediasLazyQueryHookResult = ReturnType<typeof useHomeMediasLazyQuery>;
export type HomeMediasQueryResult = Apollo.QueryResult<HomeMediasQuery, HomeMediasQueryVariables>;
export function refetchHomeMediasQuery(variables?: HomeMediasQueryVariables) {
      return { query: HomeMediasDocument, variables: variables }
    }
export const InfoCashbackPdpCollectionDocument = gql`
    query InfoCashbackPdpCollection {
  infoCashbackPdpCollection {
    infoCashback
    infoCashbackTitleTooltip
    infoCashbackTextTooltip
  }
}
    `;

/**
 * __useInfoCashbackPdpCollectionQuery__
 *
 * To run a query within a React component, call `useInfoCashbackPdpCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInfoCashbackPdpCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInfoCashbackPdpCollectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useInfoCashbackPdpCollectionQuery(baseOptions?: Apollo.QueryHookOptions<InfoCashbackPdpCollectionQuery, InfoCashbackPdpCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InfoCashbackPdpCollectionQuery, InfoCashbackPdpCollectionQueryVariables>(InfoCashbackPdpCollectionDocument, options);
      }
export function useInfoCashbackPdpCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InfoCashbackPdpCollectionQuery, InfoCashbackPdpCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InfoCashbackPdpCollectionQuery, InfoCashbackPdpCollectionQueryVariables>(InfoCashbackPdpCollectionDocument, options);
        }
export type InfoCashbackPdpCollectionQueryHookResult = ReturnType<typeof useInfoCashbackPdpCollectionQuery>;
export type InfoCashbackPdpCollectionLazyQueryHookResult = ReturnType<typeof useInfoCashbackPdpCollectionLazyQuery>;
export type InfoCashbackPdpCollectionQueryResult = Apollo.QueryResult<InfoCashbackPdpCollectionQuery, InfoCashbackPdpCollectionQueryVariables>;
export function refetchInfoCashbackPdpCollectionQuery(variables?: InfoCashbackPdpCollectionQueryVariables) {
      return { query: InfoCashbackPdpCollectionDocument, variables: variables }
    }
export const InvoiceKeyDocument = gql`
    query InvoiceKey($invoiceKey: String!) {
  invoiceKey(input: {invoiceKey: $invoiceKey}) {
    estimatedDeliveryDate
    estimatedDeliveryDateFormated
    shippingReference
    shippingAdditional
    shippingAddress
    shippingQuarter
    shippingCity
    shippingState
    shipmentOrderVolumeState
    providerMessage
    lastStatusCreated
  }
}
    `;

/**
 * __useInvoiceKeyQuery__
 *
 * To run a query within a React component, call `useInvoiceKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useInvoiceKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInvoiceKeyQuery({
 *   variables: {
 *      invoiceKey: // value for 'invoiceKey'
 *   },
 * });
 */
export function useInvoiceKeyQuery(baseOptions: Apollo.QueryHookOptions<InvoiceKeyQuery, InvoiceKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InvoiceKeyQuery, InvoiceKeyQueryVariables>(InvoiceKeyDocument, options);
      }
export function useInvoiceKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InvoiceKeyQuery, InvoiceKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InvoiceKeyQuery, InvoiceKeyQueryVariables>(InvoiceKeyDocument, options);
        }
export type InvoiceKeyQueryHookResult = ReturnType<typeof useInvoiceKeyQuery>;
export type InvoiceKeyLazyQueryHookResult = ReturnType<typeof useInvoiceKeyLazyQuery>;
export type InvoiceKeyQueryResult = Apollo.QueryResult<InvoiceKeyQuery, InvoiceKeyQueryVariables>;
export function refetchInvoiceKeyQuery(variables: InvoiceKeyQueryVariables) {
      return { query: InvoiceKeyDocument, variables: variables }
    }
export const LandingPagePrimeDocument = gql`
    query landingPagePrime {
  landingPagePrime {
    productId
    skuId
    productSeller
    installmentQty
    installmentPrice
    monthlyCashback
    discountFrom
    discountPercentage
    primeFaq {
      title
      textBody
    }
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
export const MostSearchedWordsDocument = gql`
    query mostSearchedWords {
  mostSearchedWords
}
    `;

/**
 * __useMostSearchedWordsQuery__
 *
 * To run a query within a React component, call `useMostSearchedWordsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMostSearchedWordsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMostSearchedWordsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMostSearchedWordsQuery(baseOptions?: Apollo.QueryHookOptions<MostSearchedWordsQuery, MostSearchedWordsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MostSearchedWordsQuery, MostSearchedWordsQueryVariables>(MostSearchedWordsDocument, options);
      }
export function useMostSearchedWordsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MostSearchedWordsQuery, MostSearchedWordsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MostSearchedWordsQuery, MostSearchedWordsQueryVariables>(MostSearchedWordsDocument, options);
        }
export type MostSearchedWordsQueryHookResult = ReturnType<typeof useMostSearchedWordsQuery>;
export type MostSearchedWordsLazyQueryHookResult = ReturnType<typeof useMostSearchedWordsLazyQuery>;
export type MostSearchedWordsQueryResult = Apollo.QueryResult<MostSearchedWordsQuery, MostSearchedWordsQueryVariables>;
export function refetchMostSearchedWordsQuery(variables?: MostSearchedWordsQueryVariables) {
      return { query: MostSearchedWordsDocument, variables: variables }
    }
export const OffersCarouselsDocument = gql`
    query offersCarousels {
  offersCarousels {
    type
    title
    showtime
    items {
      mkt
      linkMktIn
      reservaMini
      reference
      orderBy
      facets {
        key
        value
      }
      image {
        url
        title
        height
        width
      }
      filters {
        priceFilter {
          from
          to
        }
      }
    }
    shelfProductsBottom
    shelfProductsTop
    shelfSubtitleBottom
    shelfSubtitleTop
    shelfTitle
    categoryCards {
      sectionCardTitle
      sectionMediaCards {
        id
        deepLink
        deepLinkNewsletter
        reference
        headerImage {
          url
          title
        }
        facets {
          key
          value
        }
        image {
          url
          title
        }
      }
    }
  }
}
    `;

/**
 * __useOffersCarouselsQuery__
 *
 * To run a query within a React component, call `useOffersCarouselsQuery` and pass it any options that fit your needs.
 * When your component renders, `useOffersCarouselsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOffersCarouselsQuery({
 *   variables: {
 *   },
 * });
 */
export function useOffersCarouselsQuery(baseOptions?: Apollo.QueryHookOptions<OffersCarouselsQuery, OffersCarouselsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffersCarouselsQuery, OffersCarouselsQueryVariables>(OffersCarouselsDocument, options);
      }
export function useOffersCarouselsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffersCarouselsQuery, OffersCarouselsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffersCarouselsQuery, OffersCarouselsQueryVariables>(OffersCarouselsDocument, options);
        }
export type OffersCarouselsQueryHookResult = ReturnType<typeof useOffersCarouselsQuery>;
export type OffersCarouselsLazyQueryHookResult = ReturnType<typeof useOffersCarouselsLazyQuery>;
export type OffersCarouselsQueryResult = Apollo.QueryResult<OffersCarouselsQuery, OffersCarouselsQueryVariables>;
export function refetchOffersCarouselsQuery(variables?: OffersCarouselsQueryVariables) {
      return { query: OffersCarouselsDocument, variables: variables }
    }
export const OffersPageCollectionBannerCarouselDocument = gql`
    query OffersPageCollectionBannerCarousel {
  offersPageCollectionBannerCarousel {
    items {
      id
      banner
    }
    title
  }
}
    `;

/**
 * __useOffersPageCollectionBannerCarouselQuery__
 *
 * To run a query within a React component, call `useOffersPageCollectionBannerCarouselQuery` and pass it any options that fit your needs.
 * When your component renders, `useOffersPageCollectionBannerCarouselQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOffersPageCollectionBannerCarouselQuery({
 *   variables: {
 *   },
 * });
 */
export function useOffersPageCollectionBannerCarouselQuery(baseOptions?: Apollo.QueryHookOptions<OffersPageCollectionBannerCarouselQuery, OffersPageCollectionBannerCarouselQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffersPageCollectionBannerCarouselQuery, OffersPageCollectionBannerCarouselQueryVariables>(OffersPageCollectionBannerCarouselDocument, options);
      }
export function useOffersPageCollectionBannerCarouselLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffersPageCollectionBannerCarouselQuery, OffersPageCollectionBannerCarouselQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffersPageCollectionBannerCarouselQuery, OffersPageCollectionBannerCarouselQueryVariables>(OffersPageCollectionBannerCarouselDocument, options);
        }
export type OffersPageCollectionBannerCarouselQueryHookResult = ReturnType<typeof useOffersPageCollectionBannerCarouselQuery>;
export type OffersPageCollectionBannerCarouselLazyQueryHookResult = ReturnType<typeof useOffersPageCollectionBannerCarouselLazyQuery>;
export type OffersPageCollectionBannerCarouselQueryResult = Apollo.QueryResult<OffersPageCollectionBannerCarouselQuery, OffersPageCollectionBannerCarouselQueryVariables>;
export function refetchOffersPageCollectionBannerCarouselQuery(variables?: OffersPageCollectionBannerCarouselQueryVariables) {
      return { query: OffersPageCollectionBannerCarouselDocument, variables: variables }
    }
export const OffersPageDocument = gql`
    query offersPage {
  offersPageCollectionFilter {
    title
    items {
      collectionId
      offerImage
      offerName
      fromPriceFilter
      toPriceFilter
      sizeFilter
      colorFilter
    }
  }
}
    `;

/**
 * __useOffersPageQuery__
 *
 * To run a query within a React component, call `useOffersPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useOffersPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOffersPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useOffersPageQuery(baseOptions?: Apollo.QueryHookOptions<OffersPageQuery, OffersPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OffersPageQuery, OffersPageQueryVariables>(OffersPageDocument, options);
      }
export function useOffersPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OffersPageQuery, OffersPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OffersPageQuery, OffersPageQueryVariables>(OffersPageDocument, options);
        }
export type OffersPageQueryHookResult = ReturnType<typeof useOffersPageQuery>;
export type OffersPageLazyQueryHookResult = ReturnType<typeof useOffersPageLazyQuery>;
export type OffersPageQueryResult = Apollo.QueryResult<OffersPageQuery, OffersPageQueryVariables>;
export function refetchOffersPageQuery(variables?: OffersPageQueryVariables) {
      return { query: OffersPageDocument, variables: variables }
    }
export const OrderDocument = gql`
    query order($input: OrderDetailIdInput!) {
  order(input: $input) {
    orderId
    sequence
    marketplaceOrderId
    sellerOrderId
    origin
    affiliateId
    salesChannel
    status
    statusDescription
    value
    creationDate
    lastChange
    orderGroup
    totals {
      id
      name
      value
    }
    clientProfileData {
      id
      email
      firstName
      lastName
      documentType
      document
      phone
      userProfileId
    }
    items {
      uniqueId
      id
      productId
      ean
      quantity
      seller
      name
      refId
      price
      listPrice
      imageUrl
      detailUrl
      sellerSku
      commission
      tax
      measurementUnit
      unitMultiplier
      sellingPrice
      isGift
      rewardValue
      freightCommission
      offerings {
        id
        type
        name
        price
      }
    }
    shippingData {
      address {
        addressType
        receiverName
        addressId
        postalCode
        city
        state
        country
        street
        number
        neighborhood
        complement
        geoCoordinates
      }
    }
  }
}
    `;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useOrderQuery(baseOptions: Apollo.QueryHookOptions<OrderQuery, OrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
      }
export function useOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderQueryResult = Apollo.QueryResult<OrderQuery, OrderQueryVariables>;
export function refetchOrderQuery(variables: OrderQueryVariables) {
      return { query: OrderDocument, variables: variables }
    }
export const OrderFormDocument = gql`
    query orderForm($orderFormId: String!) {
  orderForm(input: {orderFormId: $orderFormId}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;

/**
 * __useOrderFormQuery__
 *
 * To run a query within a React component, call `useOrderFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderFormQuery({
 *   variables: {
 *      orderFormId: // value for 'orderFormId'
 *   },
 * });
 */
export function useOrderFormQuery(baseOptions: Apollo.QueryHookOptions<OrderFormQuery, OrderFormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderFormQuery, OrderFormQueryVariables>(OrderFormDocument, options);
      }
export function useOrderFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderFormQuery, OrderFormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderFormQuery, OrderFormQueryVariables>(OrderFormDocument, options);
        }
export type OrderFormQueryHookResult = ReturnType<typeof useOrderFormQuery>;
export type OrderFormLazyQueryHookResult = ReturnType<typeof useOrderFormLazyQuery>;
export type OrderFormQueryResult = Apollo.QueryResult<OrderFormQuery, OrderFormQueryVariables>;
export function refetchOrderFormQuery(variables: OrderFormQueryVariables) {
      return { query: OrderFormDocument, variables: variables }
    }
export const PrimeConfigDocument = gql`
    query primeConfig {
  primeConfig {
    idCalculatorConfiguration
    marketingTags {
      id
      name
    }
    name
    percentualDiscountValue
    isActive
    categories {
      id
      name
    }
    categoriesAreInclusive
    brands {
      id
      name
    }
    collections {
      id
      name
    }
    collectionsIsInclusive
    brandsAreInclusive
    idSeller
    idSellerIsInclusive
    totalValueFloor
    totalValueCeling
  }
}
    `;

/**
 * __usePrimeConfigQuery__
 *
 * To run a query within a React component, call `usePrimeConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimeConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimeConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrimeConfigQuery(baseOptions?: Apollo.QueryHookOptions<PrimeConfigQuery, PrimeConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrimeConfigQuery, PrimeConfigQueryVariables>(PrimeConfigDocument, options);
      }
export function usePrimeConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimeConfigQuery, PrimeConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrimeConfigQuery, PrimeConfigQueryVariables>(PrimeConfigDocument, options);
        }
export type PrimeConfigQueryHookResult = ReturnType<typeof usePrimeConfigQuery>;
export type PrimeConfigLazyQueryHookResult = ReturnType<typeof usePrimeConfigLazyQuery>;
export type PrimeConfigQueryResult = Apollo.QueryResult<PrimeConfigQuery, PrimeConfigQueryVariables>;
export function refetchPrimeConfigQuery(variables?: PrimeConfigQueryVariables) {
      return { query: PrimeConfigDocument, variables: variables }
    }
export const PrimeFaqDocument = gql`
    query primeFaq {
  primeFaq {
    id
    title
    body
  }
}
    `;

/**
 * __usePrimeFaqQuery__
 *
 * To run a query within a React component, call `usePrimeFaqQuery` and pass it any options that fit your needs.
 * When your component renders, `usePrimeFaqQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePrimeFaqQuery({
 *   variables: {
 *   },
 * });
 */
export function usePrimeFaqQuery(baseOptions?: Apollo.QueryHookOptions<PrimeFaqQuery, PrimeFaqQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PrimeFaqQuery, PrimeFaqQueryVariables>(PrimeFaqDocument, options);
      }
export function usePrimeFaqLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PrimeFaqQuery, PrimeFaqQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PrimeFaqQuery, PrimeFaqQueryVariables>(PrimeFaqDocument, options);
        }
export type PrimeFaqQueryHookResult = ReturnType<typeof usePrimeFaqQuery>;
export type PrimeFaqLazyQueryHookResult = ReturnType<typeof usePrimeFaqLazyQuery>;
export type PrimeFaqQueryResult = Apollo.QueryResult<PrimeFaqQuery, PrimeFaqQueryVariables>;
export function refetchPrimeFaqQuery(variables?: PrimeFaqQueryVariables) {
      return { query: PrimeFaqDocument, variables: variables }
    }
export const ProductDocument = gql`
    query product($input: ProductInput!) {
  product(input: $input) {
    action
    productId
    productName
    paymentSystemGroupName
    identifier
    categoryTree
    disabledColors
    hasPrime
    saleOff
    videoThumbnail
    kit {
      ...kitFragment
    }
    giftCard {
      options {
        itemId
        name
        ean
        seller
        images
      }
      terms
      howItWorks
    }
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
    fvcProductReference
  }
}
    ${KitFragmentFragmentDoc}
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
    storeName
    isDelivery
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
      skuName
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
export const RecommendationShelfDocument = gql`
    query recommendationShelf($input: SmarthintShelfInput!) {
  recommendationShelf(input: $input) {
    shelfName
    shelfTitle
    products {
      productName
      productId
      productLink
      brand
      image
      categoryTree
      flags {
        type
        value
        text
      }
      prices {
        listPrice
        salePrice
      }
      sku {
        colorName
        colorHex
        colorRefId
        sizes {
          skuId
          value
          disabled
        }
      }
    }
  }
}
    `;

/**
 * __useRecommendationShelfQuery__
 *
 * To run a query within a React component, call `useRecommendationShelfQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendationShelfQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendationShelfQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRecommendationShelfQuery(baseOptions: Apollo.QueryHookOptions<RecommendationShelfQuery, RecommendationShelfQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecommendationShelfQuery, RecommendationShelfQueryVariables>(RecommendationShelfDocument, options);
      }
export function useRecommendationShelfLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecommendationShelfQuery, RecommendationShelfQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecommendationShelfQuery, RecommendationShelfQueryVariables>(RecommendationShelfDocument, options);
        }
export type RecommendationShelfQueryHookResult = ReturnType<typeof useRecommendationShelfQuery>;
export type RecommendationShelfLazyQueryHookResult = ReturnType<typeof useRecommendationShelfLazyQuery>;
export type RecommendationShelfQueryResult = Apollo.QueryResult<RecommendationShelfQuery, RecommendationShelfQueryVariables>;
export function refetchRecommendationShelfQuery(variables: RecommendationShelfQueryVariables) {
      return { query: RecommendationShelfDocument, variables: variables }
    }
export const ReturnPolicyConfigDocument = gql`
    query returnPolicyConfig {
  config {
    returnPolicy
  }
}
    `;

/**
 * __useReturnPolicyConfigQuery__
 *
 * To run a query within a React component, call `useReturnPolicyConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useReturnPolicyConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReturnPolicyConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useReturnPolicyConfigQuery(baseOptions?: Apollo.QueryHookOptions<ReturnPolicyConfigQuery, ReturnPolicyConfigQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ReturnPolicyConfigQuery, ReturnPolicyConfigQueryVariables>(ReturnPolicyConfigDocument, options);
      }
export function useReturnPolicyConfigLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReturnPolicyConfigQuery, ReturnPolicyConfigQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ReturnPolicyConfigQuery, ReturnPolicyConfigQueryVariables>(ReturnPolicyConfigDocument, options);
        }
export type ReturnPolicyConfigQueryHookResult = ReturnType<typeof useReturnPolicyConfigQuery>;
export type ReturnPolicyConfigLazyQueryHookResult = ReturnType<typeof useReturnPolicyConfigLazyQuery>;
export type ReturnPolicyConfigQueryResult = Apollo.QueryResult<ReturnPolicyConfigQuery, ReturnPolicyConfigQueryVariables>;
export function refetchReturnPolicyConfigQuery(variables?: ReturnPolicyConfigQueryVariables) {
      return { query: ReturnPolicyConfigDocument, variables: variables }
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
export const SearchDocument = gql`
    query search($input: SearchProductInput!) {
  search(input: $input) {
    queryID
    identifier
    count
    items {
      productId
      skuId
      ean
      skuName
      productName
      colors
      brand
      category
      size
      colorName
      image
      listPrice
      currentPrice
      hasDiscount
      isKitLook
      discountPercentage
      prime {
        price
        installment {
          value
          number
        }
      }
      installment {
        value
        number
      }
      installmentEqualPrime {
        value
        number
      }
    }
  }
}
    `;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchQuery(baseOptions: Apollo.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
      }
export function useSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, options);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = Apollo.QueryResult<SearchQuery, SearchQueryVariables>;
export function refetchSearchQuery(variables: SearchQueryVariables) {
      return { query: SearchDocument, variables: variables }
    }
export const SearchAutocompleteSuggestionsDocument = gql`
    query searchAutocompleteSuggestions($q: String!, $provider: SearchProviderInput!) {
  searchAutocompleteSuggestions(q: $q, provider: $provider)
}
    `;

/**
 * __useSearchAutocompleteSuggestionsQuery__
 *
 * To run a query within a React component, call `useSearchAutocompleteSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAutocompleteSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAutocompleteSuggestionsQuery({
 *   variables: {
 *      q: // value for 'q'
 *      provider: // value for 'provider'
 *   },
 * });
 */
export function useSearchAutocompleteSuggestionsQuery(baseOptions: Apollo.QueryHookOptions<SearchAutocompleteSuggestionsQuery, SearchAutocompleteSuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAutocompleteSuggestionsQuery, SearchAutocompleteSuggestionsQueryVariables>(SearchAutocompleteSuggestionsDocument, options);
      }
export function useSearchAutocompleteSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAutocompleteSuggestionsQuery, SearchAutocompleteSuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAutocompleteSuggestionsQuery, SearchAutocompleteSuggestionsQueryVariables>(SearchAutocompleteSuggestionsDocument, options);
        }
export type SearchAutocompleteSuggestionsQueryHookResult = ReturnType<typeof useSearchAutocompleteSuggestionsQuery>;
export type SearchAutocompleteSuggestionsLazyQueryHookResult = ReturnType<typeof useSearchAutocompleteSuggestionsLazyQuery>;
export type SearchAutocompleteSuggestionsQueryResult = Apollo.QueryResult<SearchAutocompleteSuggestionsQuery, SearchAutocompleteSuggestionsQueryVariables>;
export function refetchSearchAutocompleteSuggestionsQuery(variables: SearchAutocompleteSuggestionsQueryVariables) {
      return { query: SearchAutocompleteSuggestionsDocument, variables: variables }
    }
export const SearchFacetsDocument = gql`
    query searchFacets($input: SearchFacetsInput!) {
  searchFacets(input: $input) {
    categories {
      key
      value
      name
    }
    colors {
      key
      value
      name
      hex
    }
    sizes {
      key
      value
      name
    }
    prices {
      from
      to
    }
  }
}
    `;

/**
 * __useSearchFacetsQuery__
 *
 * To run a query within a React component, call `useSearchFacetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchFacetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchFacetsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchFacetsQuery(baseOptions: Apollo.QueryHookOptions<SearchFacetsQuery, SearchFacetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchFacetsQuery, SearchFacetsQueryVariables>(SearchFacetsDocument, options);
      }
export function useSearchFacetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchFacetsQuery, SearchFacetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchFacetsQuery, SearchFacetsQueryVariables>(SearchFacetsDocument, options);
        }
export type SearchFacetsQueryHookResult = ReturnType<typeof useSearchFacetsQuery>;
export type SearchFacetsLazyQueryHookResult = ReturnType<typeof useSearchFacetsLazyQuery>;
export type SearchFacetsQueryResult = Apollo.QueryResult<SearchFacetsQuery, SearchFacetsQueryVariables>;
export function refetchSearchFacetsQuery(variables: SearchFacetsQueryVariables) {
      return { query: SearchFacetsDocument, variables: variables }
    }
export const SearchNewsDocument = gql`
    query searchNews {
  searchNews {
    image
    referenceId
    facets {
      key
      value
    }
    orderBy
  }
}
    `;

/**
 * __useSearchNewsQuery__
 *
 * To run a query within a React component, call `useSearchNewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchNewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchNewsQuery({
 *   variables: {
 *   },
 * });
 */
export function useSearchNewsQuery(baseOptions?: Apollo.QueryHookOptions<SearchNewsQuery, SearchNewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchNewsQuery, SearchNewsQueryVariables>(SearchNewsDocument, options);
      }
export function useSearchNewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchNewsQuery, SearchNewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchNewsQuery, SearchNewsQueryVariables>(SearchNewsDocument, options);
        }
export type SearchNewsQueryHookResult = ReturnType<typeof useSearchNewsQuery>;
export type SearchNewsLazyQueryHookResult = ReturnType<typeof useSearchNewsLazyQuery>;
export type SearchNewsQueryResult = Apollo.QueryResult<SearchNewsQuery, SearchNewsQueryVariables>;
export function refetchSearchNewsQuery(variables?: SearchNewsQueryVariables) {
      return { query: SearchNewsDocument, variables: variables }
    }
export const ShippingSimulationDocument = gql`
    query ShippingSimulation($input: ShippingSimulationInput!) {
  shippingSimulation(input: $input) {
    delivery {
      address {
        street
        postalCode
        city
        state
        neighborhood
        reference
        country
      }
      deliveryOptions {
        itemIndex
        selectedSla
        selectedDeliveryChannel
      }
    }
    storeList {
      discountStorePickup
      stores {
        friendlyName
        id
        address {
          addressId
          postalCode
          street
          neighborhood
          city
          state
          neighborhood
          complement
          number
        }
      }
      deliveryOptions {
        itemIndex
        selectedSla
        selectedDeliveryChannel
      }
    }
  }
}
    `;

/**
 * __useShippingSimulationQuery__
 *
 * To run a query within a React component, call `useShippingSimulationQuery` and pass it any options that fit your needs.
 * When your component renders, `useShippingSimulationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useShippingSimulationQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useShippingSimulationQuery(baseOptions: Apollo.QueryHookOptions<ShippingSimulationQuery, ShippingSimulationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ShippingSimulationQuery, ShippingSimulationQueryVariables>(ShippingSimulationDocument, options);
      }
export function useShippingSimulationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ShippingSimulationQuery, ShippingSimulationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ShippingSimulationQuery, ShippingSimulationQueryVariables>(ShippingSimulationDocument, options);
        }
export type ShippingSimulationQueryHookResult = ReturnType<typeof useShippingSimulationQuery>;
export type ShippingSimulationLazyQueryHookResult = ReturnType<typeof useShippingSimulationLazyQuery>;
export type ShippingSimulationQueryResult = Apollo.QueryResult<ShippingSimulationQuery, ShippingSimulationQueryVariables>;
export function refetchShippingSimulationQuery(variables: ShippingSimulationQueryVariables) {
      return { query: ShippingSimulationDocument, variables: variables }
    }
export const TrackingCodeDocument = gql`
    query TrackingCode($trackingCode: String!) {
  trackingCode(input: {trackingCode: $trackingCode}) {
    trackingUrl
    estimatedDeliveryDate
    estimatedDeliveryDateFormated
    shippingReference
    shippingAddress
    shippingQuarter
    shippingCity
    shippingState
    shippingAdditional
    shipmentOrderVolumeState
    providerMessage
    lastStatusCreated
  }
}
    `;

/**
 * __useTrackingCodeQuery__
 *
 * To run a query within a React component, call `useTrackingCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrackingCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrackingCodeQuery({
 *   variables: {
 *      trackingCode: // value for 'trackingCode'
 *   },
 * });
 */
export function useTrackingCodeQuery(baseOptions: Apollo.QueryHookOptions<TrackingCodeQuery, TrackingCodeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrackingCodeQuery, TrackingCodeQueryVariables>(TrackingCodeDocument, options);
      }
export function useTrackingCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrackingCodeQuery, TrackingCodeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrackingCodeQuery, TrackingCodeQueryVariables>(TrackingCodeDocument, options);
        }
export type TrackingCodeQueryHookResult = ReturnType<typeof useTrackingCodeQuery>;
export type TrackingCodeLazyQueryHookResult = ReturnType<typeof useTrackingCodeLazyQuery>;
export type TrackingCodeQueryResult = Apollo.QueryResult<TrackingCodeQuery, TrackingCodeQueryVariables>;
export function refetchTrackingCodeQuery(variables: TrackingCodeQueryVariables) {
      return { query: TrackingCodeDocument, variables: variables }
    }
export const UpdateInAppDocument = gql`
    query updateInApp {
  updateInApp {
    updateTitle
    updateDescription
    updateAllVersions
    targetVersion
    onlyPlatform
    updateType
  }
}
    `;

/**
 * __useUpdateInAppQuery__
 *
 * To run a query within a React component, call `useUpdateInAppQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpdateInAppQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpdateInAppQuery({
 *   variables: {
 *   },
 * });
 */
export function useUpdateInAppQuery(baseOptions?: Apollo.QueryHookOptions<UpdateInAppQuery, UpdateInAppQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UpdateInAppQuery, UpdateInAppQueryVariables>(UpdateInAppDocument, options);
      }
export function useUpdateInAppLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UpdateInAppQuery, UpdateInAppQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UpdateInAppQuery, UpdateInAppQueryVariables>(UpdateInAppDocument, options);
        }
export type UpdateInAppQueryHookResult = ReturnType<typeof useUpdateInAppQuery>;
export type UpdateInAppLazyQueryHookResult = ReturnType<typeof useUpdateInAppLazyQuery>;
export type UpdateInAppQueryResult = Apollo.QueryResult<UpdateInAppQuery, UpdateInAppQueryVariables>;
export function refetchUpdateInAppQuery(variables?: UpdateInAppQueryVariables) {
      return { query: UpdateInAppDocument, variables: variables }
    }
export const VerifyDorisProductDocument = gql`
    query verifyDorisProduct($ean: String!) {
  verifyDorisProduct(ean: $ean) {
    valid
  }
}
    `;

/**
 * __useVerifyDorisProductQuery__
 *
 * To run a query within a React component, call `useVerifyDorisProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyDorisProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyDorisProductQuery({
 *   variables: {
 *      ean: // value for 'ean'
 *   },
 * });
 */
export function useVerifyDorisProductQuery(baseOptions: Apollo.QueryHookOptions<VerifyDorisProductQuery, VerifyDorisProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VerifyDorisProductQuery, VerifyDorisProductQueryVariables>(VerifyDorisProductDocument, options);
      }
export function useVerifyDorisProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyDorisProductQuery, VerifyDorisProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VerifyDorisProductQuery, VerifyDorisProductQueryVariables>(VerifyDorisProductDocument, options);
        }
export type VerifyDorisProductQueryHookResult = ReturnType<typeof useVerifyDorisProductQuery>;
export type VerifyDorisProductLazyQueryHookResult = ReturnType<typeof useVerifyDorisProductLazyQuery>;
export type VerifyDorisProductQueryResult = Apollo.QueryResult<VerifyDorisProductQuery, VerifyDorisProductQueryVariables>;
export function refetchVerifyDorisProductQuery(variables: VerifyDorisProductQueryVariables) {
      return { query: VerifyDorisProductDocument, variables: variables }
    }
export const WishlistDocument = gql`
    query wishlist {
  wishlist
}
    `;

/**
 * __useWishlistQuery__
 *
 * To run a query within a React component, call `useWishlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistQuery({
 *   variables: {
 *   },
 * });
 */
export function useWishlistQuery(baseOptions?: Apollo.QueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
      }
export function useWishlistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
        }
export type WishlistQueryHookResult = ReturnType<typeof useWishlistQuery>;
export type WishlistLazyQueryHookResult = ReturnType<typeof useWishlistLazyQuery>;
export type WishlistQueryResult = Apollo.QueryResult<WishlistQuery, WishlistQueryVariables>;
export function refetchWishlistQuery(variables?: WishlistQueryVariables) {
      return { query: WishlistDocument, variables: variables }
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