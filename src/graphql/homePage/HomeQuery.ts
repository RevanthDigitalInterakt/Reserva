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
  brands = 'brands',
}

export interface TextProps {
  text: string;
  fontSize: string;
  fontFamily: string;
  fontWeight: string;
  color: string;
}

export interface Carousel {
  type: CarrouselTypes;
  title: string;
  url: string;
  showtime?: number;
  itemsCollection: {
    items: CarrouselCard[];
  };
  filters: IQueryFilters
}

export interface IQueryFilters {
  priceFilter?: {
    from: number;
    to: number;
  };
  categoriesFilterCollection?: {
    items: {
      category: string;
    }[];
  }
}

export interface CarrouselCard {
  image: {
    fileName?: string;
    size?: number;
    title?: string;
    url: string;
    width?: number;
    height?: number;
  };
  reservaMini: boolean;
  name: string;
  description: string;
  reference: string;
  orderBy: string;
  filters?: IQueryFilters
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
                image {
                  fileName
                  size
                  title
                  url
                  width
                  height
                }
                filters{
                  priceFilter{
                    from,
                    to
                  }
                  categoriesFilterCollection(limit:4){
                    items{
                      category
                    }
                  }
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
            orderBy
            reference
            reservaMini
            image {
              fileName
              title
              width
              height
              size
              url
            }
            filters{
              priceFilter{
                from,
                to
              }
              categoriesFilterCollection(limit:4){
                items{
                  category
                }
              }
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
          texto
          image {
            url
            height
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
        shippingBar {
          freeShippingValue
          isFreeShipping
        }
        countDownClock {
          title
          subtitle
          watchType
          countdown
          countdownStart
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
