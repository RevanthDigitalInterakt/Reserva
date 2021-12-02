import { gql } from '@apollo/client';

export interface HomeQuery {
  fileName: string;
  title: string;
  width: number;
  height: number;
  size: number;
  url: string;
  reference: string;
  route: string;
}

export interface ConfigCollection {
  reference: string;
  image: {
    url: string;
  };
}

export enum CarrouselTypes {
  mainCarrousel = 'principal',
  cardsCarrousel = 'cards',
  banner = 'banner',
}

export interface TextProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
}

export interface Carrousel {
  type: CarrouselTypes;
  title: string;
  showtime?: number;
  itemsCollection: {
    items: CarrouselCard[];
  };
}

export interface CarrouselCard {
  image: {
    fileName: string;
    size: any;
    title: any;
    url: any;
    width: any;
    height: any;
  };
  name: string;
  description: string;
  reference: string;

  referenceLabel?: string;
}

export const homeQuery = gql`
  query homePageCollection {
    homePageCollection(limit: 12) {
      items {
        carrouselHomeCollection(limit: 3) {
          items {
            type
            title
            showtime
            itemsCollection(limit: 3) {
              items {
                image {
                  fileName
                  size
                  title
                  url
                  width
                  height
                }
                name
                description
                reference
                referenceLabel
              }
            }
          }
        }
        mediasCollection {
          items {
            reference
            image {
              fileName
              title
              width
              height
              size
              url
            }
          }
        }
      }
    }
  }
`;

export const bannerQuery = gql`
  query BannerCategoryCollection($category: String) {
    bannerCategoryCollection(where: { item: { reference: $category } }) {
      items {
        name
        item {
          image {
            url
          }
        }
      }
    }
  }
`;
export const bannerDefaultQuery = gql`
  query BannerCategoryCollection {
    bannerCategoryCollection(where: { item: { reference: "default" } }) {
      items {
        name
        item {
          image {
            url
          }
        }
      }
    }
  }
`;
export const configCollection = gql`
  query ConfigCollection {
    configCollection(where: { name: "MainConfig" }) {
      items {
        name
        online
        searchCollection
        discountCodeBar {
          titleBar
          colorBar
          titleModal
          descriptionModal
          titleButton
          colorButton
          shareMessage
          coupon
        }
        searchMedia {
          title
          secionMediaCollection(limit: 10) {
            items {
              reference
              image {
                url
              }
            }
          }
        }
        searchSuggestionsCollection(limit: 20) {
          items {
            name
          }
        }
      }
    }
  }
`;
// query {
//   # add your query
//   configCollection(where:{name: "MainConfig"}) {
//     items {
//       name
//       online
//       searchCollection
//       searchMedia {
//         title
//        	secionMediaCollection(limit: 10) {
//         	items {
//             reference
//             image {
//               url
//             }
//           }
//       	}
//       }
//     }
//   }
// }
