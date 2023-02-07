import { gql } from '@apollo/client';

export interface IBrandCarouselItem {
  __typename: string,
  brandLogo: {
    __typename: string,
    url: string
  },
  reference: string
}

export interface IBrandsCarouselQuery {
  brandsCarousel: {
    __typename: string,
    brandsCollection: {
      __typename: string,
      items: Array<IBrandCarouselItem>
    }
  }
}

export const brandsCarouselQuery = gql`
    query BrandsCarousel($id: String!){
      brandsCarousel(id: $id) {
        brandsCollection {
          items {
            brandLogo {
              url
            }
            reference
          }
        }
      }
    }
`;
