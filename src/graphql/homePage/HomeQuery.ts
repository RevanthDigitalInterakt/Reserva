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
  orderBy: string;
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
  reservaMini: boolean;
  name: string;
  description: string;
  reference: string;
  orderBy: string;
  referenceLabel?: string;
  mkt: boolean;
}

export interface ICountDownClock {
  title: string;
  subtitle: string;
  watchType: number;
  countdownStart: string;
  countdown: string;
  titleButton: string;
  titleModal: string;
  descriptionModal: string;
  reference: string;
  formattedValue?: string | undefined;
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
                mkt
                image {
                  fileName
                  size
                  title
                  url
                  width
                  height
                }
                reservaMini
                name
                description
                reference
                orderBy
              }
            }
          }
        }
        mediasCollection {
          items {
            mkt
            orderBy
            reference
            reservaMini
            isLandingPage
            landingPageId
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
          mkt
          image {
            url
          }
        }
      }
    }
  }
`;
export const bannerDefaultQuery = gql`
  query BannerCategoryCollection($category: String) {
    bannerCategoryCollection(where: { item: { reference: $category } }) {
      items {
        name
        item {
          mkt
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
        shippingBar {
          freeShippingValue
          isFreeShipping
        }
        countDownClock {
          title
          subtitle
          watchType
          countdown
          titleButton
          titleModal
          descriptionModal
          reference
        }
        countDownClockReservaMini {
          title
          subtitle
          watchType
          countdown
          titleButton
          titleModal
          descriptionModal
          reference
        }
        offersPage
        searchMedia {
          title
          secionMediaCollection(limit: 10) {
            items {
              reference
              orderBy
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
