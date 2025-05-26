import { gql } from '@apollo/client';

export const productSearch = gql`
  query ProductSearch(
    $query: String = ""
    $fullText: String = ""
    $map: String = ""
    $selectedFacets: [SelectedFacetInput]
    $category: String = ""
    $specificationFilters: [String]
    $priceRange: String = ""
    $collection: String = ""
    $salesChannel: String
    $orderBy: String = "OrderByScoreDESC"
    $from: Int = 0
    $to: Int = 9
    $hideUnavailableItems: Boolean = true
    $simulationBehavior: SimulationBehavior = default
    $productOriginVtex: Boolean = false
    $operator: Operator
    $fuzzy: String
    $searchState: String
    $options: Options
  ) {
    productSearch(
      query: $query
      fullText: $fullText
      map: $map
      selectedFacets: $selectedFacets
      category: $category
      specificationFilters: $specificationFilters
      priceRange: $priceRange
      collection: $collection
      salesChannel: $salesChannel
      orderBy: $orderBy
      from: $from
      to: $to
      hideUnavailableItems: $hideUnavailableItems
      simulationBehavior: $simulationBehavior
      productOriginVtex: $productOriginVtex
      operator: $operator
      fuzzy: $fuzzy
      searchState: $searchState
      options: $options
    ) @context(provider: "vtex.search-graphql") {
      products {
        productClusters {
          id
          name
        }
        categoryTree {
          href
        }
        clusterHighlights {
          id
          name
        }
        items(filter: FIRST_AVAILABLE) {
          images {
            imageUrl
          }
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
              Tax
              taxPercentage
              AvailableQuantity
              Price
              ListPrice
              spotPrice
              PriceWithoutDiscount
              discountHighlights {
                name
              }
              Installments {
                Value
                TotalValuePlusInterestRate
                NumberOfInstallments
              }
            }
          }
        }
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
      }
      recordsFiltered
      breadcrumb {
        name
        href
      }
    }
  }
`;

export interface ProductSearchVars {
  query?: string;
  fullText?: string;
  map?: string;
  selectedFacets?: SelectedFacetInput[];
  category?: string;
  specificationFilters?: string[];
  priceRange?: string;
  collection?: string;
  salesChannel?: string;
  orderBy?: string;
  from?: number;
  to?: number;
  hideUnavailableItems?: Boolean;
  simulationBehavior?: SimulationBehavior;
  productOriginVtex?: Boolean;
  operator?: Operator;
  fuzzy?: string;
  searchState?: string;
  options?: Options;
}

export interface SelectedFacetInput {
  key: string;
  value: string;
}

export type SimulationBehavior = 'default' | 'skip' | 'async';

export type Operator = 'and' | 'or';

export interface Options {
  allowRedirect: Boolean;
}

export interface ProductSearchResponse {
  productSearch: ProductSearchData;
}

export interface ProductSearchData {
  products: ProductQL[];
  recordsFiltered?: number;
  titleTag?: string;
  metaTagDescription?: string;
  breadcrumb?: SearchBreadcrumb[];
  canonical?: string;
  suggestion?: SearchSuggestions;
  correction?: SearchCorrection;
  operator?: Operator;
  fuzzy?: string;
  searchState?: string;
  banners?: SearchBanner[];
  redirect?: string;
}

export interface SearchBreadcrumb {
  name?: string;
  href?: string;
}

export interface SearchSuggestions {
  searches?: SearchSuggestion[];
}

export interface SearchSuggestion {
  term: string;
  count: number;
  attributes?: SearchSuggestionAttribute[];
}

export interface SearchSuggestionAttribute {
  key: string;
  value: string;
  labelValue: string;
}

export interface SearchCorrection {
  text?: String;
  highlighted?: String;
  misspelled?: Boolean;
  correction?: Boolean;
}

export interface SearchBanner {
  id?: String;
  name?: String;
  area?: String;
  html?: String;
}

export interface ProductQL {
  brand?: string;
  brandId?: number;
  cacheId?: string;
  categoryId?: string;
  categoryTree?: Category[];
  clusterHighlights?: ClusterHighlight[];
  productClusters?: ProductClusters[];
  description?: string;
  items: SKU[];
  skuSpecifications: SkuSpecification[];
  link?: string;
  linkText?: string;
  productId: string;
  productName: string;
  properties?: Property[];
  propertyGroups?: PropertyGroup[];
  productReference?: string;
  titleTag?: string;
  metaTagDescription?: string;
  recommendations?: Recommendation;
  jsonSpecifications?: string;
  benefits?: Benefit[];
  itemMetadata?: ItemMetadata;
  specificationGroups?: SpecificationGroup[];
  priceRange: ProductPriceRange;
  releaseDate?: string;
  selectedProperties?: SelectedProperty[];
}

export interface Category {
  cacheId?: string;
  href?: string;
  slug?: string;
  id?: number;
  name?: string;
  titleTag?: string;
  hasChildren?: boolean;
  metaTagDescription?: string;
  children?: Category[];
}

export interface Property {
  originalName?: string;
  name?: string;
  values?: string[];
}

export interface PropertyGroup {
  name?: string;
  properties?: string;
}

export interface Recommendation {
  buy?: ProductQL[];
  view?: ProductQL[];
  similars?: ProductQL[];
}

export interface Benefit {
  featured?: Boolean;
  id?: string;
  name?: string;
  items?: BenefitItem[];
  teaserType?: string;
}

export interface BenefitItem {
  benefitProduct?: ProductQL;
  benefitSKUIds?: string[];
  discount?: number;
  minQuantity?: number;
}

export interface ItemMetadata {
  items?: ItemMetadataUnit[];
  priceTable?: ItemPriceTable[];
}

export interface ItemMetadataUnit {
  id?: string;
  name?: string;
  skuName?: string;
  productId?: string;
  refId?: string;
  ean?: string;
  imageUrl?: string;
  detailUrl?: string;
  seller?: string;
  assemblyOptions?: AssemblyOption[];
}

export interface AssemblyOption {
  id: string;
  name: string;
  required: boolean;
  composition: CompositionType;
  inputValues: InputValue[];
}

export interface CompositionType {
  minQuantity?: number;
  maxQuantity?: number;
  items?: CompositionItem[];
}

export interface CompositionItem {
  id?: string;
  minQuantity?: number;
  maxQuantity?: number;
  initialQuantity?: number;
  priceTable?: string;
  seller?: string;
}

export interface InputValue {
  label?: string;
  maxLength?: number;
  type?: InputValueType;
  defaultValue?: StringOrBoolean;
  domain?: string[];
}

export type InputValueType = 'TEXT' | 'BOOLEAN' | 'OPTIONS';
export type StringOrBoolean = string | boolean;

export interface ItemPriceTable {
  type?: String;
  values?: PriceTableItem[];
}

export interface PriceTableItem {
  id?: string;
  assemblyId?: string;
  price?: number;
}

export interface ClusterHighlight {
  id?: string;
  name?: string;
}

export interface ProductClusters {
  id?: string;
  name?: string;
}

export type ItemsFilter = 'ALL' | 'FIRST_AVAILABLE' | 'ALL_AVAILABLE';

export interface SKU {
  itemId?: string;
  name?: string;
  nameComplete?: string;
  complementName?: string;
  ean?: string;
  referenceId?: Reference[];
  measurementUnit?: string;
  unitMultiplier?: number;
  kitItems?: KitItem[];
  images: Image[];
  videos?: Video[];
  sellers: Seller[];
  variations?: Property[];
  estimatedDateArrival?: string;
}

export interface Reference {
  Key?: string;
  Value?: string;
}

export interface KitItem {
  itemId?: string;
  amount?: number;
  product?: OnlyProduct;
  sku?: SKU;
}

export interface OnlyProduct {
  brand?: string;
  categoryId?: string;
  categoryTree?: Category[];
  clusterHighlights?: ClusterHighlight[];
  productClusters?: ProductClusters[];
  description?: string;
  link?: string;
  linkText?: string;
  productId?: string;
  productName?: string;
  properties?: Property[];
  propertyGroups?: PropertyGroup[];
  productReference?: string;
  recommendations?: Recommendation;
  jsonSpecifications?: string;
}

export interface SkuSpecification {
  field: SKUSpecificationField;
  values: SKUSpecificationValue[];
}

export interface SKUSpecificationField {
  originalName?: string;
  name?: string;
}

export interface SKUSpecificationValue {
  originalName?: string;
  name?: string;
}

export interface SpecificationGroup {
  originalName?: string;
  name?: string;
  specifications?: SpecificationGroupProperty[];
}

export interface SpecificationGroupProperty {
  originalName?: string;
  name?: string;
  values?: string[];
}

export interface ProductPriceRange {
  sellingPrice: PriceRange;
  listPrice: PriceRange;
}

export interface PriceRange {
  highPrice: number;
  lowPrice: number;
}

export interface SelectedProperty {
  key?: string;
  value?: string;
}

export interface Image {
  cacheId?: string;
  imageId?: string;
  imageLabel?: string;
  imageTag?: string;
  imageUrl: string;
  imageText?: string;
}

export interface Video {
  videoUrl?: string;
}

export interface Seller {
  sellerId?: string;
  sellerName?: string;
  addToCartLink?: string;
  sellerDefault?: boolean;
  commertialOffer: Offer;
}

export interface Offer {
  Installments: Installment[];
  Price?: number;
  ListPrice?: number;
  spotPrice?: number;
  PriceWithoutDiscount?: number;
  RewardValue?: number;
  PriceValidUntil?: string;
  AvailableQuantity?: number;
  Tax?: number;
  taxPercentage?: number;
  CacheVersionUsedToCallCheckout?: string;
  DeliverySlaSamples?: DeliverySlaSamples[];
  discountHighlights: Discount[];
  teasers: Teaser[];
  giftSkuIds?: string[];
  gifts?: Gift[];
}

export type InstallmentsCriteria =
  | 'MAX_WITHOUT_INTEREST'
  | 'MAX_WITH_INTEREST'
  | 'MAX'
  | 'MIN'
  | 'ALL';

export interface Installment {
  Value: number;
  InterestRate?: number;
  TotalValuePlusInterestRate?: number;
  NumberOfInstallments: number;
  PaymentSystemName?: string;
  PaymentSystemGroupName?: string;
  Name?: string;
}

export interface DeliverySlaSamples {
  DeliverySlaPerTypes?: DeliverySlaPerTypes[];
  Region?: Region;
}

export interface DeliverySlaPerTypes {
  TypeName?: string;
  Price?: number;
  EstimatedTimeSpanToDelivery?: string;
}

export interface Region {
  IsPersisted?: boolean;
  IsRemoved?: boolean;
  Id?: string;
  Name?: string;
  CountryCode?: string;
  ZipCode?: string;
  CultureInfoName?: string;
}

export interface Discount {
  name?: string;
}

export interface Teaser {
  name?: String;
  conditions?: TeaserCondition;
  effects?: TeaserEffects;
}

export interface TeaserCondition {
  minimumQuantity?: number;
  parameters?: TeaserValue[];
}

export interface TeaserValue {
  name?: String;
  value?: String;
}

export interface TeaserEffects {
  parameters: TeaserValue[];
}

export interface Gift {
  productName: String;
  skuName: String;
  brand: String;
  linkText: String;
  description: String;
  images: GiftImage[];
}

export interface GiftImage {
  imageUrl: string;
  imageLabel: string;
  imageText: string;
}

export enum OrderByEnum {
  OrderByPriceDESC = 'OrderByPriceDESC',
  OrderByPriceASC = 'OrderByPriceASC',
  OrderByTopSaleDESC = 'OrderByTopSaleDESC',
  OrderByReviewRateDESC = 'OrderByReviewRateDESC',
  OrderByNameASC = 'OrderByNameASC',
  OrderByNameDESC = 'OrderByNameDESC',
  OrderByReleaseDateDESC = 'OrderByReleaseDateDESC',
  OrderByBestDiscountDESC = 'OrderByBestDiscountDESC',
  OrderByScoreDESC = 'OrderByScoreDESC',
}
