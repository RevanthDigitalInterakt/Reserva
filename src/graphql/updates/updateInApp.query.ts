import { gql } from '@apollo/client';

export const UPDATE_IN_APP_QUERY = gql`
  query UpdateInApp {
    updateInApp(id: "5zDaJDuIr9J9Ul0knN01eF") {
      updateTitle
      updateDescription
      updateAllVersions
      targetVersion
      onlyPlatform
      updateType
    }
  }
`;
