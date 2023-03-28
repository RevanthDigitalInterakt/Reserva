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
  authCookie?: Maybe<Scalars['String']>;
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
  order: OrderDetailOutput;
  orderForm: OrderformOutput;
  orders: OrderPaginationOutput;
  profile: ProfileOutput;
  sellerInfo?: Maybe<SellerInfoOutput>;
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


export type QueryOrderArgs = {
  input: OrderDetailIdInput;
};


export type QueryOrderFormArgs = {
  input?: InputMaybe<OrderformInput>;
};


export type QueryOrdersArgs = {
  input: PaginationInput;
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

export type OrderFormAddSellerCouponMutationVariables = Exact<{
  orderFormId: Scalars['String'];
  coupon: Scalars['String'];
}>;


export type OrderFormAddSellerCouponMutation = { __typename?: 'Mutation', orderFormAddSellerCoupon: { __typename?: 'OrderformOutput', orderFormId: string, marketingData?: { __typename?: 'OrderformMarketingDataOutput', marketingTags: Array<string> } | null } };

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

export type DeeplinkPathQueryVariables = Exact<{
  path: Scalars['String'];
}>;


export type DeeplinkPathQuery = { __typename?: 'Query', deeplinkPath?: { __typename?: 'DeeplinkOutput', path: string, referenceId?: string | null, active: boolean } | null };

export type MktinStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type MktinStatusQuery = { __typename?: 'Query', mktinStatus: boolean };

export type SellerInfoQueryVariables = Exact<{
  sellerId: Scalars['String'];
}>;


export type SellerInfoQuery = { __typename?: 'Query', sellerInfo?: { __typename?: 'SellerInfoOutput', sellerId: string, texto?: string | null, logo?: string | null, bannerMobile?: string | null, sellerName?: string | null, linkApp?: string | null } | null };

export type SellersMktinQueryVariables = Exact<{ [key: string]: never; }>;


export type SellersMktinQuery = { __typename?: 'Query', sellersMktin: Array<string> };


export const OrderFormAddSellerCouponDocument = gql`
    mutation orderFormAddSellerCoupon($orderFormId: String!, $coupon: String!) {
  orderFormAddSellerCoupon(input: {orderFormId: $orderFormId, coupon: $coupon}) {
    orderFormId
    marketingData {
      marketingTags
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
