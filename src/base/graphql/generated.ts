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

export type CheckEmailInput = {
  email: Scalars['String'];
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
  orderFormRemoveDiscountCoupon: OrderformOutput;
  orderFormRemoveGift: OrderformOutput;
  orderFormRemoveSellerCoupon: OrderformOutput;
  orderFormUpdateItem: OrderformOutput;
  recoverPasswordReset: LoggedInOutput;
  recoverPasswordVerificationCode: RequestCodeOutput;
  refreshTokenUrl: Scalars['String'];
  removeCustomer: Scalars['Boolean'];
  sendLead: Scalars['Boolean'];
  signIn: LoggedInOutput;
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


export type MutationOrderFormRemoveDiscountCouponArgs = {
  input: OrderformRemoveCouponInput;
};


export type MutationOrderFormRemoveGiftArgs = {
  input: OrderformGiftInput;
};


export type MutationOrderFormRemoveSellerCouponArgs = {
  input: OrderformRemoveCouponInput;
};


export type MutationOrderFormUpdateItemArgs = {
  input: OrderformUpdateItemInput;
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
  ean: Scalars['String'];
  id: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  isGift: Scalars['Boolean'];
  listPrice: Scalars['Int'];
  measurementUnit: Scalars['String'];
  name: Scalars['String'];
  offerings: Array<OrderformItemOfferingOutput>;
  price: Scalars['Int'];
  priceValidUntil: Scalars['String'];
  productId: Scalars['String'];
  productRefId: Scalars['String'];
  quantity: Scalars['Int'];
  refId: Scalars['String'];
  rewardValue: Scalars['Int'];
  sellingPrice: Scalars['Int'];
  skuName: Scalars['String'];
  tax: Scalars['Int'];
  uniqueId: Scalars['String'];
  unitMultiplier: Scalars['Int'];
};

export type OrderformMarketingDataOutput = {
  __typename?: 'OrderformMarketingDataOutput';
  coupon?: Maybe<Scalars['String']>;
  marketingTags: Array<Scalars['String']>;
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
  clientProfileData?: Maybe<OrderformClientProfileDataOutput>;
  items: Array<OrderformItemOutput>;
  marketingData?: Maybe<OrderformMarketingDataOutput>;
  messages: Array<OrderformMessageOutput>;
  orderFormId: Scalars['ID'];
  salesChannel: Scalars['String'];
};

export type OrderformRemoveCouponInput = {
  orderFormId: Scalars['String'];
};

export type OrderformUpdateItemInput = {
  id: Scalars['String'];
  /** Must be used if you want to set the remove the item from cart */
  index?: InputMaybe<Scalars['Int']>;
  orderFormId: Scalars['String'];
  quantity: Scalars['Int'];
  seller: Scalars['String'];
};

export type ProfileAddressOutput = {
  __typename?: 'ProfileAddressOutput';
  addressId?: Maybe<Scalars['ID']>;
  addressType?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  complement?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  neighborhood?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  receiverName?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type ProfileOutput = {
  __typename?: 'ProfileOutput';
  availableAddresses: Array<ProfileAddressOutput>;
  document?: Maybe<Scalars['String']>;
  documentType?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isComplete: Scalars['Boolean'];
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  checkIfUserExists: Scalars['Boolean'];
  contentfulCategories: Array<ContentfulCategoryOutput>;
  contentfulCategory: ContentfulCategoryDetailOutput;
  contentfulCollections: Array<ContentfulCollectionOutput>;
  contentfulProducts: Array<ContentfulProductItemOutput>;
  deeplinkPath?: Maybe<DeeplinkOutput>;
  mktinStatus: Scalars['Boolean'];
  orderForm: OrderformOutput;
  profile: ProfileOutput;
  sellerInfo: SellerInfoOutput;
  sellersMktin: Array<Scalars['String']>;
};


export type QueryCheckIfUserExistsArgs = {
  input: CheckEmailInput;
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


export type QueryOrderFormArgs = {
  input?: InputMaybe<OrderformInput>;
};


export type QuerySellerInfoArgs = {
  input: SellerInfoInput;
};

export type RequestCodeOutput = {
  __typename?: 'RequestCodeOutput';
  cookies: Array<Scalars['String']>;
  ok: Scalars['Boolean'];
};

export type RequestVerificationCodeInput = {
  email: Scalars['String'];
};

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

export type VtexUserInput = {
  code: Scalars['String'];
  cookies: Array<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
};

export type DeeplinkPathQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type DeeplinkPathQuery = { __typename?: 'Query', deeplinkPath?: { __typename?: 'DeeplinkOutput', path: string, referenceId?: string | null, active: boolean } | null };


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
