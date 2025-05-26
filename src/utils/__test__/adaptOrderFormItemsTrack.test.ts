import { adaptOrderFormItemsTrack } from '../adaptOrderFormItemsTrack';

const productMock = [
  {
    unique: 'unique',
    id: 'id',
    productId: 'productId',
    productRefId: 'productRefId',
    refId: 'refId',
    ean: 'ean',
    name: 'name',
    skuName: 'skuName',
    modalType: 'modalType',
    parentItemIndex: 'parentItemIndex',
    parentAssemblyBinding: 'parentAssemblyBinding',
    assemblies: [],
    priceValidUntil: 'priceValidUntil',
    tax: 0,
    price: 1990,
    listPrice: 1,
    manualPrice: 'manualPrice',
    manualPriceAppliedBy: 'manualPriceAppliedBy',
    sellingPrice: 1,
    rewardValue: 0,
    isGift: false,
    additionalInfo: {
      dimension: 'dimension',
      brandName: 'brandName',
      brandId: 'brandId',
      offeringInfo: 'offeringInfo',
      offeringType: 'offeringType',
      offeringTypeId: 'offeringTypeId',
    },
    preSaleDate: 'preSaleDate',
    productCategoryIds: 'productCategoryIds',
    productCategories: 'product',
    quantity: 1,
    seller: 'seller',
    sellerChain: [],
    imageUrl: 'imageUrl',
    detailUrl: 'detailUrl',
    components: [],
    bundleItems: [],
    attachments: [],
    attachmentOfferings: [],
    offerings: [],
    priceTags: [],
    availability: 'availability',
    measurementUnit: 'measurementUnit',
    unitMultiplier: 1,
    manufacturerCode: 'manufacturerCode',
    priceDefinition: {
      calculatedSellingPrice: 0,
      total: 19.9,
      sellingPrices: [],
    },
  },
];

describe('adaptOrderFormItemsTrack test', () => {
  it('must return formatted items', () => {
    const result = adaptOrderFormItemsTrack(productMock);

    expect(result).toStrictEqual([{
      price: 19.9,
      item_id: 'productId',
      quantity: 1,
      item_name: 'name',
      item_variant: 'skuName',
      item_category: 'product',
    }]);
  });

  it('must return formatted items without productCategories', () => {
    const newMock = productMock.map((item) => ({
      ...item,
      productCategories: undefined,
    }));

    const result = adaptOrderFormItemsTrack(newMock);

    expect(result).toStrictEqual([{
      price: 19.9,
      item_id: 'productId',
      quantity: 1,
      item_name: 'name',
      item_variant: 'skuName',
      item_category: 'product',
    }]);
  });
});
