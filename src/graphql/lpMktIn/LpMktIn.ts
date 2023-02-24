import { gql } from '@apollo/client';

export interface ILpMktQuery {
  fileName: string;
  title: string;
  width: number;
  height: number;
  size: number;
  url: string;
  reference: string;
  route: string;
}

export enum ECarouselTypes {
  mainCarrousel = 'principal',
  cardsCarrousel = 'cards',
  banner = 'banner',
}
export interface ICarouselCard {
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
}

export interface ICarousel {
  type: ECarouselTypes;
  title: string;
  showtime?: number;
  itemsCollection: {
    items: ICarouselCard[];
  };
}

export const lpMktQuery = gql`
query lpMktinCollection{
    lpMktinCollection(limit: 9){
        items{
            carouselCollection(limit: 3){
                items{
                    type
                    title
                    showtime
                    itemsCollection(limit: 3){
                        items{
                            image{
                                fileName
                                size
                                title
                                url
                                width
                                height
                            }
                            name
                            description
                        }
                    }
                }
            }
            brandsCollection(limit: 20){
                items{
                    type
                    title
                    showtime
                    itemsCollection(limit: 20){
                        items{
                            image{
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
                        }
                    }
                }     
            }
            bannersCollection{
                items {
                    reference                        
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
          mktCollection
        }
    }
}
`;
