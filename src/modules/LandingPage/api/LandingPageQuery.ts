import { gql } from '@apollo/client';

type LPBanner = {
  __typename: 'LpBanner';
  image: { url: string };
};

type LPLeads = {
  __typename: 'LpLeads';
  idCampanha: string;
};

export type LandingPageData<T = any> = {
  landingPage: {
    itemsCollection: {
      items: T[];
    };
  };
};

export const GET_LEAD_LANDING_PAGE = gql`
  query GetLandingPage($id: String!) {
    landingPage(id: $id) {
      itemsCollection {
        items {
          __typename
          idCampanha
          title
          titleButton
        }
      }
    }
  }
`;

export const GET_LANDING_PAGE = gql`
  query GetLandingPage($id: String!) {
    landingPage(id: $id) {
      itemsCollection {
        items {
          __typename
          ... on LpLeads {
            idCampanha
            title
            titleButton
          }
          ... on LpBanner {
            image {
              url
            }
          }
          ... on LpProductList {
            reference
          }
          ... on LpSpace {
            size
          }
        }
      }
    }
  }
`;
