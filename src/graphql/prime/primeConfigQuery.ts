import { gql } from '@apollo/client';

export const primeConfigQuery = gql`
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
