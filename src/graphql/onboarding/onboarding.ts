import { gql } from '@apollo/client';

export const onboarding = gql`
  query Onboarding {
    onboardingCollection(limit: 4) {
      items {
        itemsOnboardingCollection(limit: 4) {
          items {
            imageBackground {
              url
            }
            title
            subtitle
            description
            visibleAndroid
          }
        }
      }
    }
  }
`;
