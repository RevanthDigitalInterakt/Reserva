import { gql } from '@apollo/client';

const GET_PRODUCT_WITH_SLUG = gql`
  query Product(
    $slug: String
    $identifier: ProductUniqueIdentifier
    $skipCategoryTree: Boolean = false
  ) {
    product(slug: $slug, identifier: $identifier)
      @context(provider: "vtex.search-graphql") {
      cacheId
      productId
      description
      productName
      productReference
      linkText
      brand
      brandId
      link
      categoryTree {
        slug
        cacheId
        name
        id
        titleTag
        metaTagDescription
        hasChildren
      }
      categoryId
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
      specificationGroups {
        name
        originalName
        specifications {
          name
          originalName
          values
        }
      }
      skuSpecifications {
        field {
          name
          originalName
        }
        values {
          name
          originalName
        }
      }
      productClusters {
        id
        name
      }
      clusterHighlights {
        id
        name
      }
      properties {
        name
        values
      }
      titleTag
      metaTagDescription
      categoryId
      categoryTree @skip(if: $skipCategoryTree) {
        id
        name
        href
      }
      items {
        itemId
        name
        nameComplete
        complementName
        ean
        variations {
          name
          values
        }
        referenceId {
          Key
          Value
        }
        measurementUnit
        unitMultiplier
        images {
          cacheId
          imageId
          imageLabel
          imageTag
          imageUrl
          imageText
        }
        videos {
          videoUrl
        }
        sellers {
          sellerId
          sellerName
          sellerDefault
          addToCartLink
          sellerDefault
          commertialOffer {
            discountHighlights {
              name
            }
            teasers {
              name
              conditions {
                minimumQuantity
                parameters {
                  name
                  value
                }
              }
              effects {
                parameters {
                  name
                  value
                }
              }
            }
            Price
            ListPrice
            Tax
            taxPercentage
            spotPrice
            PriceWithoutDiscount
            RewardValue
            PriceValidUntil
            AvailableQuantity
            CacheVersionUsedToCallCheckout
            Installments {
              Value
              InterestRate
              TotalValuePlusInterestRate
              NumberOfInstallments
              Name
              PaymentSystemName
            }
          }
        }
        kitItems {
          itemId
          amount
          product {
            productName
            productId
            description
            linkText
            categoryTree {
              id
              name
              href
            }
            categoryId
            brand
            properties {
              name
              values
            }
          }
          sku {
            itemId
            name
            referenceId {
              Key
              Value
            }
            images {
              imageId
              imageLabel
              imageTag
              imageUrl
              imageText
            }
            sellers {
              sellerId
              sellerName
              sellerDefault
              addToCartLink
              sellerDefault
              commertialOffer {
                discountHighlights {
                  name
                }
                teasers {
                  name
                  conditions {
                    minimumQuantity
                    parameters {
                      name
                      value
                    }
                  }
                  effects {
                    parameters {
                      name
                      value
                    }
                  }
                }
                Price
                ListPrice
                Tax
                taxPercentage
                spotPrice
                PriceWithoutDiscount
                RewardValue
                PriceValidUntil
                AvailableQuantity
                Installments(criteria: MAX) {
                  Value
                  InterestRate
                  TotalValuePlusInterestRate
                  NumberOfInstallments
                  Name
                  PaymentSystemName
                }
              }
            }
          }
        }
        estimatedDateArrival
      }
      itemMetadata {
        items {
          id
          name
          imageUrl
          seller
          assemblyOptions {
            id
            name
            required
            inputValues {
              label
              maxLength
              type
              domain
              defaultValue
            }
            composition {
              minQuantity
              maxQuantity
              items {
                id
                minQuantity
                maxQuantity
                priceTable
                seller
                initialQuantity
              }
            }
          }
        }
        priceTable {
          type
          values {
            id
            assemblyId
            price
          }
        }
      }
    }
  }
`;

export { GET_PRODUCT_WITH_SLUG };
