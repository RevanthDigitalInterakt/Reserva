  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TrackingDocument = exports.TrackingCodeDocument = exports.TrackProvidersEnum = exports.TrackPageViewDocument = exports.TrackPageTypeEnum = exports.TrackOrderDocument = exports.TrackEventTypeEnum = exports.TrackEventSubTypeEnum = exports.TrackEventNameEnum = exports.TrackEventIndexEnum = exports.TrackClickV2Document = exports.SubscribeNewsletterDocument = exports.SmarthintShelfChannelEnum = exports.SignUpVerificationCodeDocument = exports.SignUpDocumentTypeEnum = exports.SignUpDocument = exports.SignInDocument = exports.ShippingSimulationDocument = exports.SendLeadsDocument = exports.SearchProviderEnum = exports.SearchOrderByEnum = exports.SearchNewsDocument = exports.SearchFacetsDocument = exports.SearchDocument = exports.SearchAutocompleteSuggestionsDocument = exports.RonRedirectTypeEnum = exports.RonRedirectDocument = exports.ReturnPolicyConfigDocument = exports.RemoveUserMutationDocument = exports.RefreshTokenDocument = exports.RedefinePasswordDocument = exports.RecoverPasswordVerificationCodeDocument = exports.RecoverPasswordResetDocument = exports.RecommendationShelfDocument = exports.ProfileUpdateDocument = exports.ProfileFragmentFragmentDoc = exports.ProfileDocument = exports.ProfileAddressRemoveDocument = exports.ProfileAddressDocument = exports.ProductSizeFragmentFragmentDoc = exports.ProductResultActionEnum = exports.ProductRecommendationsDocument = exports.ProductDocument = exports.ProductDeliveryTimeDocument = exports.ProductColorFragmentFragmentDoc = exports.PrimeFaqDocument = exports.PrimeConfigDocument = exports.PackageAvailabilityEnum = exports.OrderformSelectableGiftFragmentFragmentDoc = exports.OrderformPackageItemsFragmentFragmentDoc = exports.OrderFormUpdateItemDocument = exports.OrderFormSetGiftSizeDocument = exports.OrderFormSelectAddressDocument = exports.OrderFormResetDocument = exports.OrderFormRemoveUnavailableItemsDocument = exports.OrderFormRemoveSellerCouponDocument = exports.OrderFormRemoveGiftDocument = exports.OrderFormRemoveDiscountCouponDocument = exports.OrderFormRefreshDataDocument = exports.OrderFormFragmentFragmentDoc = exports.OrderFormDocument = exports.OrderFormAddSellerCouponDocument = exports.OrderFormAddMultipleItemDocument = exports.OrderFormAddItemDocument = exports.OrderFormAddGiftDocument = exports.OrderFormAddDiscountCouponDocument = exports.OffersPageDocument = exports.OffersPageCollectionBannerCarouselDocument = exports.OffersCarouselsDocument = exports.MostSearchedWordsDocument = exports.MktinStatusDocument = exports.MenuItemTypeEnum = exports.LastCartTypeEnum = exports.LandingPagePrimeDocument = exports.KitFragmentFragmentDoc = exports.InvoiceKeyDocument = exports.InfoCashbackPdpCollectionDocument = exports.HomePageSectionTypeEnum = exports.HomeMediasDocument = exports.HomeCountdownDocument = exports.HomeConfigDocument = exports.HomeCarouselsDocument = exports.HelpCenterCollectionDocument = exports.GetProductTypeEnum = exports.DitoRedirectTypeEnum = exports.DitoRedirectDocument = exports.DeliveryChannelEnum = exports.DeeplinkPathDocument = exports.CountdownDocument = exports.ConfigShippingBarDocument = exports.ClockScreenEnum = exports.CheckSearchRedirectDocument = exports.CepDocument = exports.CashbackTypeTransactionEnum = exports.CashbackStatusFilterEnum = exports.CashbackDocument = exports.BannerCategoryDocument = exports.AvailableGiftsFragmentFragmentDoc = exports.AppMenuDocument = exports.AddressTypeEnum = undefined;
  exports.WishlistRemoveProductDocument = exports.WishlistDocument = exports.WishlistCheckProductDocument = exports.WishlistAddProductDocument = exports.VerifyDorisProductDocument = exports.UpdateInAppDocument = undefined;
  exports.refetchAppMenuQuery = refetchAppMenuQuery;
  exports.refetchBannerCategoryQuery = refetchBannerCategoryQuery;
  exports.refetchCashbackQuery = refetchCashbackQuery;
  exports.refetchCepQuery = refetchCepQuery;
  exports.refetchCheckSearchRedirectQuery = refetchCheckSearchRedirectQuery;
  exports.refetchConfigShippingBarQuery = refetchConfigShippingBarQuery;
  exports.refetchCountdownQuery = refetchCountdownQuery;
  exports.refetchDeeplinkPathQuery = refetchDeeplinkPathQuery;
  exports.refetchDitoRedirectQuery = refetchDitoRedirectQuery;
  exports.refetchHelpCenterCollectionQuery = refetchHelpCenterCollectionQuery;
  exports.refetchHomeCarouselsQuery = refetchHomeCarouselsQuery;
  exports.refetchHomeConfigQuery = refetchHomeConfigQuery;
  exports.refetchHomeCountdownQuery = refetchHomeCountdownQuery;
  exports.refetchHomeMediasQuery = refetchHomeMediasQuery;
  exports.refetchInfoCashbackPdpCollectionQuery = refetchInfoCashbackPdpCollectionQuery;
  exports.refetchInvoiceKeyQuery = refetchInvoiceKeyQuery;
  exports.refetchLandingPagePrimeQuery = refetchLandingPagePrimeQuery;
  exports.refetchMktinStatusQuery = refetchMktinStatusQuery;
  exports.refetchMostSearchedWordsQuery = refetchMostSearchedWordsQuery;
  exports.refetchOffersCarouselsQuery = refetchOffersCarouselsQuery;
  exports.refetchOffersPageCollectionBannerCarouselQuery = refetchOffersPageCollectionBannerCarouselQuery;
  exports.refetchOffersPageQuery = refetchOffersPageQuery;
  exports.refetchOrderFormQuery = refetchOrderFormQuery;
  exports.refetchPrimeConfigQuery = refetchPrimeConfigQuery;
  exports.refetchPrimeFaqQuery = refetchPrimeFaqQuery;
  exports.refetchProductDeliveryTimeQuery = refetchProductDeliveryTimeQuery;
  exports.refetchProductQuery = refetchProductQuery;
  exports.refetchProductRecommendationsQuery = refetchProductRecommendationsQuery;
  exports.refetchProfileQuery = refetchProfileQuery;
  exports.refetchRecommendationShelfQuery = refetchRecommendationShelfQuery;
  exports.refetchReturnPolicyConfigQuery = refetchReturnPolicyConfigQuery;
  exports.refetchRonRedirectQuery = refetchRonRedirectQuery;
  exports.refetchSearchAutocompleteSuggestionsQuery = refetchSearchAutocompleteSuggestionsQuery;
  exports.refetchSearchFacetsQuery = refetchSearchFacetsQuery;
  exports.refetchSearchNewsQuery = refetchSearchNewsQuery;
  exports.refetchSearchQuery = refetchSearchQuery;
  exports.refetchShippingSimulationQuery = refetchShippingSimulationQuery;
  exports.refetchTrackingCodeQuery = refetchTrackingCodeQuery;
  exports.refetchUpdateInAppQuery = refetchUpdateInAppQuery;
  exports.refetchVerifyDorisProductQuery = refetchVerifyDorisProductQuery;
  exports.refetchWishlistCheckProductQuery = refetchWishlistCheckProductQuery;
  exports.refetchWishlistQuery = refetchWishlistQuery;
  exports.useAppMenuLazyQuery = useAppMenuLazyQuery;
  exports.useAppMenuQuery = useAppMenuQuery;
  exports.useBannerCategoryLazyQuery = useBannerCategoryLazyQuery;
  exports.useBannerCategoryQuery = useBannerCategoryQuery;
  exports.useCashbackLazyQuery = useCashbackLazyQuery;
  exports.useCashbackQuery = useCashbackQuery;
  exports.useCepLazyQuery = useCepLazyQuery;
  exports.useCepQuery = useCepQuery;
  exports.useCheckSearchRedirectLazyQuery = useCheckSearchRedirectLazyQuery;
  exports.useCheckSearchRedirectQuery = useCheckSearchRedirectQuery;
  exports.useConfigShippingBarLazyQuery = useConfigShippingBarLazyQuery;
  exports.useConfigShippingBarQuery = useConfigShippingBarQuery;
  exports.useCountdownLazyQuery = useCountdownLazyQuery;
  exports.useCountdownQuery = useCountdownQuery;
  exports.useDeeplinkPathLazyQuery = useDeeplinkPathLazyQuery;
  exports.useDeeplinkPathQuery = useDeeplinkPathQuery;
  exports.useDitoRedirectLazyQuery = useDitoRedirectLazyQuery;
  exports.useDitoRedirectQuery = useDitoRedirectQuery;
  exports.useHelpCenterCollectionLazyQuery = useHelpCenterCollectionLazyQuery;
  exports.useHelpCenterCollectionQuery = useHelpCenterCollectionQuery;
  exports.useHomeCarouselsLazyQuery = useHomeCarouselsLazyQuery;
  exports.useHomeCarouselsQuery = useHomeCarouselsQuery;
  exports.useHomeConfigLazyQuery = useHomeConfigLazyQuery;
  exports.useHomeConfigQuery = useHomeConfigQuery;
  exports.useHomeCountdownLazyQuery = useHomeCountdownLazyQuery;
  exports.useHomeCountdownQuery = useHomeCountdownQuery;
  exports.useHomeMediasLazyQuery = useHomeMediasLazyQuery;
  exports.useHomeMediasQuery = useHomeMediasQuery;
  exports.useInfoCashbackPdpCollectionLazyQuery = useInfoCashbackPdpCollectionLazyQuery;
  exports.useInfoCashbackPdpCollectionQuery = useInfoCashbackPdpCollectionQuery;
  exports.useInvoiceKeyLazyQuery = useInvoiceKeyLazyQuery;
  exports.useInvoiceKeyQuery = useInvoiceKeyQuery;
  exports.useLandingPagePrimeLazyQuery = useLandingPagePrimeLazyQuery;
  exports.useLandingPagePrimeQuery = useLandingPagePrimeQuery;
  exports.useMktinStatusLazyQuery = useMktinStatusLazyQuery;
  exports.useMktinStatusQuery = useMktinStatusQuery;
  exports.useMostSearchedWordsLazyQuery = useMostSearchedWordsLazyQuery;
  exports.useMostSearchedWordsQuery = useMostSearchedWordsQuery;
  exports.useOffersCarouselsLazyQuery = useOffersCarouselsLazyQuery;
  exports.useOffersCarouselsQuery = useOffersCarouselsQuery;
  exports.useOffersPageCollectionBannerCarouselLazyQuery = useOffersPageCollectionBannerCarouselLazyQuery;
  exports.useOffersPageCollectionBannerCarouselQuery = useOffersPageCollectionBannerCarouselQuery;
  exports.useOffersPageLazyQuery = useOffersPageLazyQuery;
  exports.useOffersPageQuery = useOffersPageQuery;
  exports.useOrderFormAddDiscountCouponMutation = useOrderFormAddDiscountCouponMutation;
  exports.useOrderFormAddGiftMutation = useOrderFormAddGiftMutation;
  exports.useOrderFormAddItemMutation = useOrderFormAddItemMutation;
  exports.useOrderFormAddMultipleItemMutation = useOrderFormAddMultipleItemMutation;
  exports.useOrderFormAddSellerCouponMutation = useOrderFormAddSellerCouponMutation;
  exports.useOrderFormLazyQuery = useOrderFormLazyQuery;
  exports.useOrderFormQuery = useOrderFormQuery;
  exports.useOrderFormRefreshDataMutation = useOrderFormRefreshDataMutation;
  exports.useOrderFormRemoveDiscountCouponMutation = useOrderFormRemoveDiscountCouponMutation;
  exports.useOrderFormRemoveGiftMutation = useOrderFormRemoveGiftMutation;
  exports.useOrderFormRemoveSellerCouponMutation = useOrderFormRemoveSellerCouponMutation;
  exports.useOrderFormRemoveUnavailableItemsMutation = useOrderFormRemoveUnavailableItemsMutation;
  exports.useOrderFormResetMutation = useOrderFormResetMutation;
  exports.useOrderFormSelectAddressMutation = useOrderFormSelectAddressMutation;
  exports.useOrderFormSetGiftSizeMutation = useOrderFormSetGiftSizeMutation;
  exports.useOrderFormUpdateItemMutation = useOrderFormUpdateItemMutation;
  exports.usePrimeConfigLazyQuery = usePrimeConfigLazyQuery;
  exports.usePrimeConfigQuery = usePrimeConfigQuery;
  exports.usePrimeFaqLazyQuery = usePrimeFaqLazyQuery;
  exports.usePrimeFaqQuery = usePrimeFaqQuery;
  exports.useProductDeliveryTimeLazyQuery = useProductDeliveryTimeLazyQuery;
  exports.useProductDeliveryTimeQuery = useProductDeliveryTimeQuery;
  exports.useProductLazyQuery = useProductLazyQuery;
  exports.useProductQuery = useProductQuery;
  exports.useProductRecommendationsLazyQuery = useProductRecommendationsLazyQuery;
  exports.useProductRecommendationsQuery = useProductRecommendationsQuery;
  exports.useProfileAddressMutation = useProfileAddressMutation;
  exports.useProfileAddressRemoveMutation = useProfileAddressRemoveMutation;
  exports.useProfileLazyQuery = useProfileLazyQuery;
  exports.useProfileQuery = useProfileQuery;
  exports.useProfileUpdateMutation = useProfileUpdateMutation;
  exports.useRecommendationShelfLazyQuery = useRecommendationShelfLazyQuery;
  exports.useRecommendationShelfQuery = useRecommendationShelfQuery;
  exports.useRecoverPasswordResetMutation = useRecoverPasswordResetMutation;
  exports.useRecoverPasswordVerificationCodeMutation = useRecoverPasswordVerificationCodeMutation;
  exports.useRedefinePasswordMutation = useRedefinePasswordMutation;
  exports.useRefreshTokenMutation = useRefreshTokenMutation;
  exports.useRemoveUserMutationMutation = useRemoveUserMutationMutation;
  exports.useReturnPolicyConfigLazyQuery = useReturnPolicyConfigLazyQuery;
  exports.useReturnPolicyConfigQuery = useReturnPolicyConfigQuery;
  exports.useRonRedirectLazyQuery = useRonRedirectLazyQuery;
  exports.useRonRedirectQuery = useRonRedirectQuery;
  exports.useSearchAutocompleteSuggestionsLazyQuery = useSearchAutocompleteSuggestionsLazyQuery;
  exports.useSearchAutocompleteSuggestionsQuery = useSearchAutocompleteSuggestionsQuery;
  exports.useSearchFacetsLazyQuery = useSearchFacetsLazyQuery;
  exports.useSearchFacetsQuery = useSearchFacetsQuery;
  exports.useSearchLazyQuery = useSearchLazyQuery;
  exports.useSearchNewsLazyQuery = useSearchNewsLazyQuery;
  exports.useSearchNewsQuery = useSearchNewsQuery;
  exports.useSearchQuery = useSearchQuery;
  exports.useSendLeadsMutation = useSendLeadsMutation;
  exports.useShippingSimulationLazyQuery = useShippingSimulationLazyQuery;
  exports.useShippingSimulationQuery = useShippingSimulationQuery;
  exports.useSignInMutation = useSignInMutation;
  exports.useSignUpMutation = useSignUpMutation;
  exports.useSignUpVerificationCodeMutation = useSignUpVerificationCodeMutation;
  exports.useSubscribeNewsletterMutation = useSubscribeNewsletterMutation;
  exports.useTrackClickV2Mutation = useTrackClickV2Mutation;
  exports.useTrackOrderMutation = useTrackOrderMutation;
  exports.useTrackPageViewMutation = useTrackPageViewMutation;
  exports.useTrackingCodeLazyQuery = useTrackingCodeLazyQuery;
  exports.useTrackingCodeQuery = useTrackingCodeQuery;
  exports.useTrackingMutation = useTrackingMutation;
  exports.useUpdateInAppLazyQuery = useUpdateInAppLazyQuery;
  exports.useUpdateInAppQuery = useUpdateInAppQuery;
  exports.useVerifyDorisProductLazyQuery = useVerifyDorisProductLazyQuery;
  exports.useVerifyDorisProductQuery = useVerifyDorisProductQuery;
  exports.useWishlistAddProductMutation = useWishlistAddProductMutation;
  exports.useWishlistCheckProductLazyQuery = useWishlistCheckProductLazyQuery;
  exports.useWishlistCheckProductQuery = useWishlistCheckProductQuery;
  exports.useWishlistLazyQuery = useWishlistLazyQuery;
  exports.useWishlistQuery = useWishlistQuery;
  exports.useWishlistRemoveProductMutation = useWishlistRemoveProductMutation;
  var _client = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var Apollo = _client;
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  // @ts-nocheck
  /* eslint-disable */

  var defaultOptions = {};
  /** All built-in and custom scalars, mapped to their actual values */
  var AddressTypeEnum = exports.AddressTypeEnum = /*#__PURE__*/function (AddressTypeEnum) {
    AddressTypeEnum["Pickup"] = "PICKUP";
    AddressTypeEnum["Residential"] = "RESIDENTIAL";
    return AddressTypeEnum;
  }({});
  var CashbackStatusFilterEnum = exports.CashbackStatusFilterEnum = /*#__PURE__*/function (CashbackStatusFilterEnum) {
    CashbackStatusFilterEnum["All"] = "ALL";
    CashbackStatusFilterEnum["Available"] = "AVAILABLE";
    CashbackStatusFilterEnum["Canceled"] = "CANCELED";
    CashbackStatusFilterEnum["Confirmed"] = "CONFIRMED";
    CashbackStatusFilterEnum["Expired"] = "EXPIRED";
    CashbackStatusFilterEnum["Pending"] = "PENDING";
    return CashbackStatusFilterEnum;
  }({});
  var CashbackTypeTransactionEnum = exports.CashbackTypeTransactionEnum = /*#__PURE__*/function (CashbackTypeTransactionEnum) {
    CashbackTypeTransactionEnum["Credit"] = "CREDIT";
    CashbackTypeTransactionEnum["Debit"] = "DEBIT";
    return CashbackTypeTransactionEnum;
  }({});
  var ClockScreenEnum = exports.ClockScreenEnum = /*#__PURE__*/function (ClockScreenEnum) {
    ClockScreenEnum["All"] = "ALL";
    ClockScreenEnum["Category"] = "CATEGORY";
    ClockScreenEnum["Home"] = "HOME";
    ClockScreenEnum["Offers"] = "OFFERS";
    return ClockScreenEnum;
  }({});
  var DeliveryChannelEnum = exports.DeliveryChannelEnum = /*#__PURE__*/function (DeliveryChannelEnum) {
    DeliveryChannelEnum["Delivery"] = "DELIVERY";
    DeliveryChannelEnum["PickupInPoint"] = "PICKUP_IN_POINT";
    return DeliveryChannelEnum;
  }({});
  var DitoRedirectTypeEnum = exports.DitoRedirectTypeEnum = /*#__PURE__*/function (DitoRedirectTypeEnum) {
    DitoRedirectTypeEnum["None"] = "NONE";
    DitoRedirectTypeEnum["RestoreCart"] = "RESTORE_CART";
    return DitoRedirectTypeEnum;
  }({});
  var GetProductTypeEnum = exports.GetProductTypeEnum = /*#__PURE__*/function (GetProductTypeEnum) {
    GetProductTypeEnum["ProductId"] = "PRODUCT_ID";
    GetProductTypeEnum["SkuId"] = "SKU_ID";
    GetProductTypeEnum["Slug"] = "SLUG";
    return GetProductTypeEnum;
  }({});
  var HomePageSectionTypeEnum = exports.HomePageSectionTypeEnum = /*#__PURE__*/function (HomePageSectionTypeEnum) {
    HomePageSectionTypeEnum["Brands"] = "BRANDS";
    HomePageSectionTypeEnum["Cards"] = "CARDS";
    HomePageSectionTypeEnum["Main"] = "MAIN";
    return HomePageSectionTypeEnum;
  }({});
  var LastCartTypeEnum = exports.LastCartTypeEnum = /*#__PURE__*/function (LastCartTypeEnum) {
    LastCartTypeEnum["AlreadySynced"] = "ALREADY_SYNCED";
    LastCartTypeEnum["NoPreviousCart"] = "NO_PREVIOUS_CART";
    LastCartTypeEnum["UpdatedCart"] = "UPDATED_CART";
    return LastCartTypeEnum;
  }({});
  var MenuItemTypeEnum = exports.MenuItemTypeEnum = /*#__PURE__*/function (MenuItemTypeEnum) {
    MenuItemTypeEnum["Category"] = "CATEGORY";
    MenuItemTypeEnum["Collection"] = "COLLECTION";
    MenuItemTypeEnum["Deeplink"] = "DEEPLINK";
    MenuItemTypeEnum["ParentCategory"] = "PARENT_CATEGORY";
    return MenuItemTypeEnum;
  }({});
  var PackageAvailabilityEnum = exports.PackageAvailabilityEnum = /*#__PURE__*/function (PackageAvailabilityEnum) {
    PackageAvailabilityEnum["Available"] = "AVAILABLE";
    PackageAvailabilityEnum["SomeUnavailable"] = "SOME_UNAVAILABLE";
    PackageAvailabilityEnum["Unavailable"] = "UNAVAILABLE";
    return PackageAvailabilityEnum;
  }({});
  var ProductResultActionEnum = exports.ProductResultActionEnum = /*#__PURE__*/function (ProductResultActionEnum) {
    ProductResultActionEnum["RedirectToSite"] = "RedirectToSite";
    ProductResultActionEnum["ShowGiftCard"] = "ShowGiftCard";
    ProductResultActionEnum["ShowKit"] = "ShowKit";
    ProductResultActionEnum["ShowProduct"] = "ShowProduct";
    return ProductResultActionEnum;
  }({});
  var RonRedirectTypeEnum = exports.RonRedirectTypeEnum = /*#__PURE__*/function (RonRedirectTypeEnum) {
    RonRedirectTypeEnum["Custom"] = "CUSTOM";
    RonRedirectTypeEnum["Orderform"] = "ORDERFORM";
    RonRedirectTypeEnum["Pdc"] = "PDC";
    RonRedirectTypeEnum["Pdp"] = "PDP";
    return RonRedirectTypeEnum;
  }({});
  var SearchOrderByEnum = exports.SearchOrderByEnum = /*#__PURE__*/function (SearchOrderByEnum) {
    SearchOrderByEnum["OrderByBestDiscountDesc"] = "OrderByBestDiscountDESC";
    SearchOrderByEnum["OrderByNameAsc"] = "OrderByNameASC";
    SearchOrderByEnum["OrderByNameDesc"] = "OrderByNameDESC";
    SearchOrderByEnum["OrderByPriceAsc"] = "OrderByPriceASC";
    SearchOrderByEnum["OrderByPriceDesc"] = "OrderByPriceDESC";
    SearchOrderByEnum["OrderByReleaseDateDesc"] = "OrderByReleaseDateDESC";
    SearchOrderByEnum["OrderByScoreDesc"] = "OrderByScoreDESC";
    SearchOrderByEnum["OrderByTopSaleDesc"] = "OrderByTopSaleDESC";
    return SearchOrderByEnum;
  }({});
  var SearchProviderEnum = exports.SearchProviderEnum = /*#__PURE__*/function (SearchProviderEnum) {
    SearchProviderEnum["Algolia"] = "ALGOLIA";
    SearchProviderEnum["Smarthint"] = "SMARTHINT";
    SearchProviderEnum["Vtex"] = "VTEX";
    return SearchProviderEnum;
  }({});
  var SignUpDocumentTypeEnum = exports.SignUpDocumentTypeEnum = /*#__PURE__*/function (SignUpDocumentTypeEnum) {
    SignUpDocumentTypeEnum["Cnpj"] = "CNPJ";
    SignUpDocumentTypeEnum["Cpf"] = "CPF";
    return SignUpDocumentTypeEnum;
  }({});
  var SmarthintShelfChannelEnum = exports.SmarthintShelfChannelEnum = /*#__PURE__*/function (SmarthintShelfChannelEnum) {
    SmarthintShelfChannelEnum["App"] = "app";
    SmarthintShelfChannelEnum["Padrao"] = "padrao";
    return SmarthintShelfChannelEnum;
  }({});
  var TrackEventIndexEnum = exports.TrackEventIndexEnum = /*#__PURE__*/function (TrackEventIndexEnum) {
    TrackEventIndexEnum["Default"] = "default";
    TrackEventIndexEnum["DiscountDesc"] = "discountDesc";
    TrackEventIndexEnum["NameAsc"] = "nameAsc";
    TrackEventIndexEnum["NameDesc"] = "nameDesc";
    TrackEventIndexEnum["PriceAsc"] = "priceAsc";
    TrackEventIndexEnum["PriceDesc"] = "priceDesc";
    TrackEventIndexEnum["ReleaseDateDesc"] = "releaseDateDesc";
    return TrackEventIndexEnum;
  }({});
  var TrackEventNameEnum = exports.TrackEventNameEnum = /*#__PURE__*/function (TrackEventNameEnum) {
    TrackEventNameEnum["CartItems"] = "cartItems";
    TrackEventNameEnum["CartItemsSearch"] = "cartItemsSearch";
    TrackEventNameEnum["ClickedFilter"] = "clickedFilter";
    TrackEventNameEnum["ClickedItems"] = "clickedItems";
    TrackEventNameEnum["ClickedItemsSearch"] = "clickedItemsSearch";
    TrackEventNameEnum["ConvertedFilter"] = "convertedFilter";
    TrackEventNameEnum["ConvertedItems"] = "convertedItems";
    TrackEventNameEnum["ConvertedItemsSearch"] = "convertedItemsSearch";
    TrackEventNameEnum["PurchasedItems"] = "purchasedItems";
    TrackEventNameEnum["PurchasedItemsSearch"] = "purchasedItemsSearch";
    TrackEventNameEnum["ViewedFilter"] = "viewedFilter";
    TrackEventNameEnum["ViewedItems"] = "viewedItems";
    return TrackEventNameEnum;
  }({});
  var TrackEventSubTypeEnum = exports.TrackEventSubTypeEnum = /*#__PURE__*/function (TrackEventSubTypeEnum) {
    TrackEventSubTypeEnum["AddToCart"] = "addToCart";
    TrackEventSubTypeEnum["Purchase"] = "purchase";
    return TrackEventSubTypeEnum;
  }({});
  var TrackEventTypeEnum = exports.TrackEventTypeEnum = /*#__PURE__*/function (TrackEventTypeEnum) {
    TrackEventTypeEnum["Click"] = "click";
    TrackEventTypeEnum["Conversion"] = "conversion";
    TrackEventTypeEnum["View"] = "view";
    return TrackEventTypeEnum;
  }({});
  var TrackPageTypeEnum = exports.TrackPageTypeEnum = /*#__PURE__*/function (TrackPageTypeEnum) {
    TrackPageTypeEnum["Cart"] = "cart";
    TrackPageTypeEnum["Category"] = "category";
    TrackPageTypeEnum["Checkout"] = "checkout";
    TrackPageTypeEnum["Emptycart"] = "emptycart";
    TrackPageTypeEnum["Home"] = "home";
    TrackPageTypeEnum["Notfound"] = "notfound";
    TrackPageTypeEnum["Other"] = "other";
    TrackPageTypeEnum["Product"] = "product";
    TrackPageTypeEnum["Search"] = "search";
    TrackPageTypeEnum["SearchWithResult"] = "searchWithResult";
    return TrackPageTypeEnum;
  }({});
  var TrackProvidersEnum = exports.TrackProvidersEnum = /*#__PURE__*/function (TrackProvidersEnum) {
    TrackProvidersEnum["Smarthint"] = "smarthint";
    return TrackProvidersEnum;
  }({});
  var ProductSizeFragmentFragmentDoc = exports.ProductSizeFragmentFragmentDoc = (0, _client.gql)`
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
  var KitFragmentFragmentDoc = exports.KitFragmentFragmentDoc = (0, _client.gql)`
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
  var OrderformPackageItemsFragmentFragmentDoc = exports.OrderformPackageItemsFragmentFragmentDoc = (0, _client.gql)`
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
  var AvailableGiftsFragmentFragmentDoc = exports.AvailableGiftsFragmentFragmentDoc = (0, _client.gql)`
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
  var OrderformSelectableGiftFragmentFragmentDoc = exports.OrderformSelectableGiftFragmentFragmentDoc = (0, _client.gql)`
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
  var OrderFormFragmentFragmentDoc = exports.OrderFormFragmentFragmentDoc = (0, _client.gql)`
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
  var ProductColorFragmentFragmentDoc = exports.ProductColorFragmentFragmentDoc = (0, _client.gql)`
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
  var ProfileFragmentFragmentDoc = exports.ProfileFragmentFragmentDoc = (0, _client.gql)`
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
  var OrderFormSelectAddressDocument = exports.OrderFormSelectAddressDocument = (0, _client.gql)`
    mutation OrderFormSelectAddress($input: OrderformSelectAddressInput!) {
  orderFormSelectAddress(input: $input) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormSelectAddressMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormSelectAddressDocument, options);
  }
  var OrderFormAddDiscountCouponDocument = exports.OrderFormAddDiscountCouponDocument = (0, _client.gql)`
    mutation orderFormAddDiscountCoupon($orderFormId: String!, $coupon: String!) {
  orderFormAddDiscountCoupon(input: {orderFormId: $orderFormId, coupon: $coupon}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormAddDiscountCouponMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormAddDiscountCouponDocument, options);
  }
  var OrderFormAddGiftDocument = exports.OrderFormAddGiftDocument = (0, _client.gql)`
    mutation orderFormAddGift($orderFormId: String!, $index: Int!, $id: String!) {
  orderFormAddGift(input: {orderFormId: $orderFormId, index: $index, id: $id}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormAddGiftMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormAddGiftDocument, options);
  }
  var OrderFormAddItemDocument = exports.OrderFormAddItemDocument = (0, _client.gql)`
    mutation orderFormAddItem($input: OrderformAddItemInput!) {
  orderFormAddItem(input: $input) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormAddItemMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormAddItemDocument, options);
  }
  var OrderFormAddMultipleItemDocument = exports.OrderFormAddMultipleItemDocument = (0, _client.gql)`
    mutation orderFormAddMultipleItem($input: OrderformAddMultipleItemInput!) {
  orderFormAddMultipleItem(input: $input) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormAddMultipleItemMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormAddMultipleItemDocument, options);
  }
  var OrderFormAddSellerCouponDocument = exports.OrderFormAddSellerCouponDocument = (0, _client.gql)`
    mutation orderFormAddSellerCoupon($orderFormId: String!, $coupon: String!) {
  orderFormAddSellerCoupon(input: {orderFormId: $orderFormId, coupon: $coupon}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormAddSellerCouponMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormAddSellerCouponDocument, options);
  }
  var OrderFormRefreshDataDocument = exports.OrderFormRefreshDataDocument = (0, _client.gql)`
    mutation orderFormRefreshData($input: OrderformRefreshDataInput!) {
  orderFormRefreshData(input: $input) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormRefreshDataMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormRefreshDataDocument, options);
  }
  var OrderFormRemoveDiscountCouponDocument = exports.OrderFormRemoveDiscountCouponDocument = (0, _client.gql)`
    mutation orderFormRemoveDiscountCoupon($orderFormId: String!) {
  orderFormRemoveDiscountCoupon(input: {orderFormId: $orderFormId}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormRemoveDiscountCouponMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormRemoveDiscountCouponDocument, options);
  }
  var OrderFormRemoveGiftDocument = exports.OrderFormRemoveGiftDocument = (0, _client.gql)`
    mutation orderFormRemoveGift($orderFormId: String!, $index: Int!, $id: String!) {
  orderFormRemoveGift(input: {orderFormId: $orderFormId, index: $index, id: $id}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormRemoveGiftMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormRemoveGiftDocument, options);
  }
  var OrderFormRemoveSellerCouponDocument = exports.OrderFormRemoveSellerCouponDocument = (0, _client.gql)`
    mutation orderFormRemoveSellerCoupon($orderFormId: String!) {
  orderFormRemoveSellerCoupon(input: {orderFormId: $orderFormId}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormRemoveSellerCouponMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormRemoveSellerCouponDocument, options);
  }
  var OrderFormRemoveUnavailableItemsDocument = exports.OrderFormRemoveUnavailableItemsDocument = (0, _client.gql)`
    mutation orderFormRemoveUnavailableItems($orderFormId: String!) {
  orderFormRemoveUnavailableItems(input: {orderFormId: $orderFormId}) {
    message
    error
  }
}
    `;
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
  function useOrderFormRemoveUnavailableItemsMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormRemoveUnavailableItemsDocument, options);
  }
  var OrderFormResetDocument = exports.OrderFormResetDocument = (0, _client.gql)`
    mutation orderFormReset($orderFormId: String!) {
  orderFormReset(input: {orderFormId: $orderFormId}) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormResetMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormResetDocument, options);
  }
  var OrderFormSetGiftSizeDocument = exports.OrderFormSetGiftSizeDocument = (0, _client.gql)`
    mutation orderFormSetGiftSize($orderFormId: String!, $giftId: String!, $id: String!, $seller: String!) {
  orderFormSetGiftSize(
    input: {orderFormId: $orderFormId, giftId: $giftId, id: $id, seller: $seller}
  ) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormSetGiftSizeMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormSetGiftSizeDocument, options);
  }
  var OrderFormUpdateItemDocument = exports.OrderFormUpdateItemDocument = (0, _client.gql)`
    mutation orderFormUpdateItem($orderFormId: String!, $seller: String!, $id: String!, $quantity: Int!, $index: Int!) {
  orderFormUpdateItem(
    input: {orderFormId: $orderFormId, seller: $seller, id: $id, quantity: $quantity, index: $index}
  ) {
    ...orderFormFragment
  }
}
    ${OrderFormFragmentFragmentDoc}`;
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
  function useOrderFormUpdateItemMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(OrderFormUpdateItemDocument, options);
  }
  var ProfileUpdateDocument = exports.ProfileUpdateDocument = (0, _client.gql)`
    mutation profileUpdate($input: ProfileUpdateInput!) {
  profile(input: $input) {
    ...ProfileFragment
  }
}
    ${ProfileFragmentFragmentDoc}`;
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
  function useProfileUpdateMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(ProfileUpdateDocument, options);
  }
  var ProfileAddressDocument = exports.ProfileAddressDocument = (0, _client.gql)`
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
  function useProfileAddressMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(ProfileAddressDocument, options);
  }
  var ProfileAddressRemoveDocument = exports.ProfileAddressRemoveDocument = (0, _client.gql)`
    mutation profileAddressRemove($input: RemoveProfileAddressInput!) {
  profileAddressRemove(input: $input)
}
    `;
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
  function useProfileAddressRemoveMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(ProfileAddressRemoveDocument, options);
  }
  var RecoverPasswordResetDocument = exports.RecoverPasswordResetDocument = (0, _client.gql)`
    mutation recoverPasswordReset($input: ResetVtexPasswordInput!) {
  recoverPasswordReset(input: $input) {
    token
    authCookie
  }
}
    `;
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
  function useRecoverPasswordResetMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(RecoverPasswordResetDocument, options);
  }
  var RecoverPasswordVerificationCodeDocument = exports.RecoverPasswordVerificationCodeDocument = (0, _client.gql)`
    mutation recoverPasswordVerificationCode($input: RequestVerificationCodeInput!) {
  recoverPasswordVerificationCode(input: $input) {
    ok
    cookies
  }
}
    `;
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
  function useRecoverPasswordVerificationCodeMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(RecoverPasswordVerificationCodeDocument, options);
  }
  var RedefinePasswordDocument = exports.RedefinePasswordDocument = (0, _client.gql)`
    mutation redefinePassword($input: RedefineVtexPasswordInput!) {
  redefinePassword(input: $input) {
    token
    authCookie
  }
}
    `;
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
  function useRedefinePasswordMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(RedefinePasswordDocument, options);
  }
  var RefreshTokenDocument = exports.RefreshTokenDocument = (0, _client.gql)`
    mutation refreshToken {
  refreshToken {
    token
    authCookie
  }
}
    `;
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
  function useRefreshTokenMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(RefreshTokenDocument, options);
  }
  var RemoveUserMutationDocument = exports.RemoveUserMutationDocument = (0, _client.gql)`
    mutation removeUserMutation($customerId: String!) {
  removeCustomer(customerId: $customerId)
}
    `;
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
  function useRemoveUserMutationMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(RemoveUserMutationDocument, options);
  }
  var SendLeadsDocument = exports.SendLeadsDocument = (0, _client.gql)`
    mutation sendLeads($idCampanha: String!, $email: String!, $name: String!, $phone: String!) {
  sendLead(
    input: {idCampanha: $idCampanha, email: $email, name: $name, phone: $phone}
  )
}
    `;
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
  function useSendLeadsMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(SendLeadsDocument, options);
  }
  var SignInDocument = exports.SignInDocument = (0, _client.gql)`
    mutation signIn($input: SignInInput!) {
  signIn(input: $input) {
    token
    authCookie
  }
}
    `;
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
  function useSignInMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(SignInDocument, options);
  }
  var SignUpDocument = exports.SignUpDocument = (0, _client.gql)`
    mutation signUp($input: SignUpUserInput!) {
  signUp(input: $input) {
    token
    authCookie
  }
}
    `;
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
  function useSignUpMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(SignUpDocument, options);
  }
  var SignUpVerificationCodeDocument = exports.SignUpVerificationCodeDocument = (0, _client.gql)`
    mutation signUpVerificationCode($input: RequestVerificationCodeInput!) {
  signUpVerificationCode(input: $input) {
    ok
    cookies
  }
}
    `;
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
  function useSignUpVerificationCodeMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(SignUpVerificationCodeDocument, options);
  }
  var SubscribeNewsletterDocument = exports.SubscribeNewsletterDocument = (0, _client.gql)`
    mutation subscribeNewsletter($input: SubscribeNewsletterInput!) {
  subscribeNewsletter(input: $input)
}
    `;
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
  function useSubscribeNewsletterMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(SubscribeNewsletterDocument, options);
  }
  var TrackClickV2Document = exports.TrackClickV2Document = (0, _client.gql)`
    mutation trackClickV2($input: TrackClickInput!) {
  trackClickV2(input: $input)
}
    `;
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
  function useTrackClickV2Mutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(TrackClickV2Document, options);
  }
  var TrackOrderDocument = exports.TrackOrderDocument = (0, _client.gql)`
    mutation TrackOrder($input: TrackOrderInput!) {
  trackOrder(input: $input) {
    success
    url
    body
  }
}
    `;
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
  function useTrackOrderMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(TrackOrderDocument, options);
  }
  var TrackPageViewDocument = exports.TrackPageViewDocument = (0, _client.gql)`
    mutation trackPageView($input: TrackPageViewInput!) {
  trackPageView(input: $input)
}
    `;
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
  function useTrackPageViewMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(TrackPageViewDocument, options);
  }
  var TrackingDocument = exports.TrackingDocument = (0, _client.gql)`
    mutation tracking($input: TrackAlgoliaInput!) {
  tracking(input: $input)
}
    `;
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
  function useTrackingMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(TrackingDocument, options);
  }
  var WishlistAddProductDocument = exports.WishlistAddProductDocument = (0, _client.gql)`
    mutation wishlistAddProduct($input: WishlistAddProductInput!) {
  wishlistAddProduct(input: $input)
}
    `;
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
  function useWishlistAddProductMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(WishlistAddProductDocument, options);
  }
  var WishlistRemoveProductDocument = exports.WishlistRemoveProductDocument = (0, _client.gql)`
    mutation wishlistRemoveProduct($input: WishlistRemoveProductInput!) {
  wishlistRemoveProduct(input: $input)
}
    `;
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
  function useWishlistRemoveProductMutation(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useMutation(WishlistRemoveProductDocument, options);
  }
  var AppMenuDocument = exports.AppMenuDocument = (0, _client.gql)`
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
  function useAppMenuQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(AppMenuDocument, options);
  }
  function useAppMenuLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(AppMenuDocument, options);
  }
  function refetchAppMenuQuery(variables) {
    return {
      query: AppMenuDocument,
      variables: variables
    };
  }
  var BannerCategoryDocument = exports.BannerCategoryDocument = (0, _client.gql)`
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
  function useBannerCategoryQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(BannerCategoryDocument, options);
  }
  function useBannerCategoryLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(BannerCategoryDocument, options);
  }
  function refetchBannerCategoryQuery(variables) {
    return {
      query: BannerCategoryDocument,
      variables: variables
    };
  }
  var CashbackDocument = exports.CashbackDocument = (0, _client.gql)`
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
  function useCashbackQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(CashbackDocument, options);
  }
  function useCashbackLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(CashbackDocument, options);
  }
  function refetchCashbackQuery(variables) {
    return {
      query: CashbackDocument,
      variables: variables
    };
  }
  var CepDocument = exports.CepDocument = (0, _client.gql)`
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
  function useCepQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(CepDocument, options);
  }
  function useCepLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(CepDocument, options);
  }
  function refetchCepQuery(variables) {
    return {
      query: CepDocument,
      variables: variables
    };
  }
  var CheckSearchRedirectDocument = exports.CheckSearchRedirectDocument = (0, _client.gql)`
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
  function useCheckSearchRedirectQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(CheckSearchRedirectDocument, options);
  }
  function useCheckSearchRedirectLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(CheckSearchRedirectDocument, options);
  }
  function refetchCheckSearchRedirectQuery(variables) {
    return {
      query: CheckSearchRedirectDocument,
      variables: variables
    };
  }
  var ConfigShippingBarDocument = exports.ConfigShippingBarDocument = (0, _client.gql)`
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
  function useConfigShippingBarQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(ConfigShippingBarDocument, options);
  }
  function useConfigShippingBarLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(ConfigShippingBarDocument, options);
  }
  function refetchConfigShippingBarQuery(variables) {
    return {
      query: ConfigShippingBarDocument,
      variables: variables
    };
  }
  var CountdownDocument = exports.CountdownDocument = (0, _client.gql)`
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
  function useCountdownQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(CountdownDocument, options);
  }
  function useCountdownLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(CountdownDocument, options);
  }
  function refetchCountdownQuery(variables) {
    return {
      query: CountdownDocument,
      variables: variables
    };
  }
  var DeeplinkPathDocument = exports.DeeplinkPathDocument = (0, _client.gql)`
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
  function useDeeplinkPathQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(DeeplinkPathDocument, options);
  }
  function useDeeplinkPathLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(DeeplinkPathDocument, options);
  }
  function refetchDeeplinkPathQuery(variables) {
    return {
      query: DeeplinkPathDocument,
      variables: variables
    };
  }
  var DitoRedirectDocument = exports.DitoRedirectDocument = (0, _client.gql)`
    query ditoRedirect($code: String!) {
  ditoRedirect(input: {code: $code}) {
    type
    url
  }
}
    `;

  /**
   * __useDitoRedirectQuery__
   *
   * To run a query within a React component, call `useDitoRedirectQuery` and pass it any options that fit your needs.
   * When your component renders, `useDitoRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
   * you can use to render your UI.
   *
   * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
   *
   * @example
   * const { data, loading, error } = useDitoRedirectQuery({
   *   variables: {
   *      code: // value for 'code'
   *   },
   * });
   */
  function useDitoRedirectQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(DitoRedirectDocument, options);
  }
  function useDitoRedirectLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(DitoRedirectDocument, options);
  }
  function refetchDitoRedirectQuery(variables) {
    return {
      query: DitoRedirectDocument,
      variables: variables
    };
  }
  var HelpCenterCollectionDocument = exports.HelpCenterCollectionDocument = (0, _client.gql)`
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
  function useHelpCenterCollectionQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(HelpCenterCollectionDocument, options);
  }
  function useHelpCenterCollectionLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(HelpCenterCollectionDocument, options);
  }
  function refetchHelpCenterCollectionQuery(variables) {
    return {
      query: HelpCenterCollectionDocument,
      variables: variables
    };
  }
  var HomeCarouselsDocument = exports.HomeCarouselsDocument = (0, _client.gql)`
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
  function useHomeCarouselsQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(HomeCarouselsDocument, options);
  }
  function useHomeCarouselsLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(HomeCarouselsDocument, options);
  }
  function refetchHomeCarouselsQuery(variables) {
    return {
      query: HomeCarouselsDocument,
      variables: variables
    };
  }
  var HomeConfigDocument = exports.HomeConfigDocument = (0, _client.gql)`
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
  function useHomeConfigQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(HomeConfigDocument, options);
  }
  function useHomeConfigLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(HomeConfigDocument, options);
  }
  function refetchHomeConfigQuery(variables) {
    return {
      query: HomeConfigDocument,
      variables: variables
    };
  }
  var HomeCountdownDocument = exports.HomeCountdownDocument = (0, _client.gql)`
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
  function useHomeCountdownQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(HomeCountdownDocument, options);
  }
  function useHomeCountdownLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(HomeCountdownDocument, options);
  }
  function refetchHomeCountdownQuery(variables) {
    return {
      query: HomeCountdownDocument,
      variables: variables
    };
  }
  var HomeMediasDocument = exports.HomeMediasDocument = (0, _client.gql)`
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
  function useHomeMediasQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(HomeMediasDocument, options);
  }
  function useHomeMediasLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(HomeMediasDocument, options);
  }
  function refetchHomeMediasQuery(variables) {
    return {
      query: HomeMediasDocument,
      variables: variables
    };
  }
  var InfoCashbackPdpCollectionDocument = exports.InfoCashbackPdpCollectionDocument = (0, _client.gql)`
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
  function useInfoCashbackPdpCollectionQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(InfoCashbackPdpCollectionDocument, options);
  }
  function useInfoCashbackPdpCollectionLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(InfoCashbackPdpCollectionDocument, options);
  }
  function refetchInfoCashbackPdpCollectionQuery(variables) {
    return {
      query: InfoCashbackPdpCollectionDocument,
      variables: variables
    };
  }
  var InvoiceKeyDocument = exports.InvoiceKeyDocument = (0, _client.gql)`
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
  function useInvoiceKeyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(InvoiceKeyDocument, options);
  }
  function useInvoiceKeyLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(InvoiceKeyDocument, options);
  }
  function refetchInvoiceKeyQuery(variables) {
    return {
      query: InvoiceKeyDocument,
      variables: variables
    };
  }
  var LandingPagePrimeDocument = exports.LandingPagePrimeDocument = (0, _client.gql)`
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
  function useLandingPagePrimeQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(LandingPagePrimeDocument, options);
  }
  function useLandingPagePrimeLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(LandingPagePrimeDocument, options);
  }
  function refetchLandingPagePrimeQuery(variables) {
    return {
      query: LandingPagePrimeDocument,
      variables: variables
    };
  }
  var MktinStatusDocument = exports.MktinStatusDocument = (0, _client.gql)`
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
  function useMktinStatusQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(MktinStatusDocument, options);
  }
  function useMktinStatusLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(MktinStatusDocument, options);
  }
  function refetchMktinStatusQuery(variables) {
    return {
      query: MktinStatusDocument,
      variables: variables
    };
  }
  var MostSearchedWordsDocument = exports.MostSearchedWordsDocument = (0, _client.gql)`
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
  function useMostSearchedWordsQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(MostSearchedWordsDocument, options);
  }
  function useMostSearchedWordsLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(MostSearchedWordsDocument, options);
  }
  function refetchMostSearchedWordsQuery(variables) {
    return {
      query: MostSearchedWordsDocument,
      variables: variables
    };
  }
  var OffersCarouselsDocument = exports.OffersCarouselsDocument = (0, _client.gql)`
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
  function useOffersCarouselsQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(OffersCarouselsDocument, options);
  }
  function useOffersCarouselsLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(OffersCarouselsDocument, options);
  }
  function refetchOffersCarouselsQuery(variables) {
    return {
      query: OffersCarouselsDocument,
      variables: variables
    };
  }
  var OffersPageCollectionBannerCarouselDocument = exports.OffersPageCollectionBannerCarouselDocument = (0, _client.gql)`
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
  function useOffersPageCollectionBannerCarouselQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(OffersPageCollectionBannerCarouselDocument, options);
  }
  function useOffersPageCollectionBannerCarouselLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(OffersPageCollectionBannerCarouselDocument, options);
  }
  function refetchOffersPageCollectionBannerCarouselQuery(variables) {
    return {
      query: OffersPageCollectionBannerCarouselDocument,
      variables: variables
    };
  }
  var OffersPageDocument = exports.OffersPageDocument = (0, _client.gql)`
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
  function useOffersPageQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(OffersPageDocument, options);
  }
  function useOffersPageLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(OffersPageDocument, options);
  }
  function refetchOffersPageQuery(variables) {
    return {
      query: OffersPageDocument,
      variables: variables
    };
  }
  var OrderFormDocument = exports.OrderFormDocument = (0, _client.gql)`
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
  function useOrderFormQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(OrderFormDocument, options);
  }
  function useOrderFormLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(OrderFormDocument, options);
  }
  function refetchOrderFormQuery(variables) {
    return {
      query: OrderFormDocument,
      variables: variables
    };
  }
  var PrimeConfigDocument = exports.PrimeConfigDocument = (0, _client.gql)`
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
  function usePrimeConfigQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(PrimeConfigDocument, options);
  }
  function usePrimeConfigLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(PrimeConfigDocument, options);
  }
  function refetchPrimeConfigQuery(variables) {
    return {
      query: PrimeConfigDocument,
      variables: variables
    };
  }
  var PrimeFaqDocument = exports.PrimeFaqDocument = (0, _client.gql)`
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
  function usePrimeFaqQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(PrimeFaqDocument, options);
  }
  function usePrimeFaqLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(PrimeFaqDocument, options);
  }
  function refetchPrimeFaqQuery(variables) {
    return {
      query: PrimeFaqDocument,
      variables: variables
    };
  }
  var ProductDocument = exports.ProductDocument = (0, _client.gql)`
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
  function useProductQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(ProductDocument, options);
  }
  function useProductLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(ProductDocument, options);
  }
  function refetchProductQuery(variables) {
    return {
      query: ProductDocument,
      variables: variables
    };
  }
  var ProductDeliveryTimeDocument = exports.ProductDeliveryTimeDocument = (0, _client.gql)`
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
  function useProductDeliveryTimeQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(ProductDeliveryTimeDocument, options);
  }
  function useProductDeliveryTimeLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(ProductDeliveryTimeDocument, options);
  }
  function refetchProductDeliveryTimeQuery(variables) {
    return {
      query: ProductDeliveryTimeDocument,
      variables: variables
    };
  }
  var ProductRecommendationsDocument = exports.ProductRecommendationsDocument = (0, _client.gql)`
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
  function useProductRecommendationsQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(ProductRecommendationsDocument, options);
  }
  function useProductRecommendationsLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(ProductRecommendationsDocument, options);
  }
  function refetchProductRecommendationsQuery(variables) {
    return {
      query: ProductRecommendationsDocument,
      variables: variables
    };
  }
  var ProfileDocument = exports.ProfileDocument = (0, _client.gql)`
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
  function useProfileQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(ProfileDocument, options);
  }
  function useProfileLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(ProfileDocument, options);
  }
  function refetchProfileQuery(variables) {
    return {
      query: ProfileDocument,
      variables: variables
    };
  }
  var RecommendationShelfDocument = exports.RecommendationShelfDocument = (0, _client.gql)`
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
  function useRecommendationShelfQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(RecommendationShelfDocument, options);
  }
  function useRecommendationShelfLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(RecommendationShelfDocument, options);
  }
  function refetchRecommendationShelfQuery(variables) {
    return {
      query: RecommendationShelfDocument,
      variables: variables
    };
  }
  var ReturnPolicyConfigDocument = exports.ReturnPolicyConfigDocument = (0, _client.gql)`
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
  function useReturnPolicyConfigQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(ReturnPolicyConfigDocument, options);
  }
  function useReturnPolicyConfigLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(ReturnPolicyConfigDocument, options);
  }
  function refetchReturnPolicyConfigQuery(variables) {
    return {
      query: ReturnPolicyConfigDocument,
      variables: variables
    };
  }
  var RonRedirectDocument = exports.RonRedirectDocument = (0, _client.gql)`
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
  function useRonRedirectQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(RonRedirectDocument, options);
  }
  function useRonRedirectLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(RonRedirectDocument, options);
  }
  function refetchRonRedirectQuery(variables) {
    return {
      query: RonRedirectDocument,
      variables: variables
    };
  }
  var SearchDocument = exports.SearchDocument = (0, _client.gql)`
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
  function useSearchQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(SearchDocument, options);
  }
  function useSearchLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(SearchDocument, options);
  }
  function refetchSearchQuery(variables) {
    return {
      query: SearchDocument,
      variables: variables
    };
  }
  var SearchAutocompleteSuggestionsDocument = exports.SearchAutocompleteSuggestionsDocument = (0, _client.gql)`
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
  function useSearchAutocompleteSuggestionsQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(SearchAutocompleteSuggestionsDocument, options);
  }
  function useSearchAutocompleteSuggestionsLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(SearchAutocompleteSuggestionsDocument, options);
  }
  function refetchSearchAutocompleteSuggestionsQuery(variables) {
    return {
      query: SearchAutocompleteSuggestionsDocument,
      variables: variables
    };
  }
  var SearchFacetsDocument = exports.SearchFacetsDocument = (0, _client.gql)`
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
  function useSearchFacetsQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(SearchFacetsDocument, options);
  }
  function useSearchFacetsLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(SearchFacetsDocument, options);
  }
  function refetchSearchFacetsQuery(variables) {
    return {
      query: SearchFacetsDocument,
      variables: variables
    };
  }
  var SearchNewsDocument = exports.SearchNewsDocument = (0, _client.gql)`
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
  function useSearchNewsQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(SearchNewsDocument, options);
  }
  function useSearchNewsLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(SearchNewsDocument, options);
  }
  function refetchSearchNewsQuery(variables) {
    return {
      query: SearchNewsDocument,
      variables: variables
    };
  }
  var ShippingSimulationDocument = exports.ShippingSimulationDocument = (0, _client.gql)`
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
  function useShippingSimulationQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(ShippingSimulationDocument, options);
  }
  function useShippingSimulationLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(ShippingSimulationDocument, options);
  }
  function refetchShippingSimulationQuery(variables) {
    return {
      query: ShippingSimulationDocument,
      variables: variables
    };
  }
  var TrackingCodeDocument = exports.TrackingCodeDocument = (0, _client.gql)`
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
  function useTrackingCodeQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(TrackingCodeDocument, options);
  }
  function useTrackingCodeLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(TrackingCodeDocument, options);
  }
  function refetchTrackingCodeQuery(variables) {
    return {
      query: TrackingCodeDocument,
      variables: variables
    };
  }
  var UpdateInAppDocument = exports.UpdateInAppDocument = (0, _client.gql)`
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
  function useUpdateInAppQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(UpdateInAppDocument, options);
  }
  function useUpdateInAppLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(UpdateInAppDocument, options);
  }
  function refetchUpdateInAppQuery(variables) {
    return {
      query: UpdateInAppDocument,
      variables: variables
    };
  }
  var VerifyDorisProductDocument = exports.VerifyDorisProductDocument = (0, _client.gql)`
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
  function useVerifyDorisProductQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(VerifyDorisProductDocument, options);
  }
  function useVerifyDorisProductLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(VerifyDorisProductDocument, options);
  }
  function refetchVerifyDorisProductQuery(variables) {
    return {
      query: VerifyDorisProductDocument,
      variables: variables
    };
  }
  var WishlistDocument = exports.WishlistDocument = (0, _client.gql)`
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
  function useWishlistQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(WishlistDocument, options);
  }
  function useWishlistLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(WishlistDocument, options);
  }
  function refetchWishlistQuery(variables) {
    return {
      query: WishlistDocument,
      variables: variables
    };
  }
  var WishlistCheckProductDocument = exports.WishlistCheckProductDocument = (0, _client.gql)`
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
  function useWishlistCheckProductQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useQuery(WishlistCheckProductDocument, options);
  }
  function useWishlistCheckProductLazyQuery(baseOptions) {
    var options = Object.assign({}, defaultOptions, baseOptions);
    return Apollo.useLazyQuery(WishlistCheckProductDocument, options);
  }
  function refetchWishlistCheckProductQuery(variables) {
    return {
      query: WishlistCheckProductDocument,
      variables: variables
    };
  }
