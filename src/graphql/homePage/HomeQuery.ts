import { gql } from "@apollo/client";

export interface HomeQuery {
    fileName: string;
    title: string;
    width: number;
    height: number;
    size: number;
    url: string;
}

export interface ConfigCollection {
    reference: string;
    image: {
        url: string;
    };
}

export const homeQuery = gql`
  query homePageCollection($limit:Int!){
    homePageCollection{
      items{
        mediasCollection(limit:$limit){
          items{
            reference
            image{
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
    bannerCategoryCollection(where:{item: {reference: $category}}) {
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
`
export const bannerDefaultQuery = gql`
  query BannerCategoryCollection {
    bannerCategoryCollection(where:{item: {reference: "default"}}) {
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
`
export const configCollection = gql`
query ConfigCollection{
  configCollection(where:{name: "MainConfig"}) {
    items {
      name
      online
      searchCollection
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
    }
  }
}
`
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