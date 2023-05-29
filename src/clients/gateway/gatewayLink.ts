import { HttpLink } from '@apollo/client';
import { Config } from 'react-native-config';
import { setContext } from '@apollo/client/link/context';
import { v4 } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const transactionIdLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem('@RNAuth:Token');

  return ({
    headers: {
      ...headers,
      'x-transaction-id': v4(),
      'x-api-key': Config.API_KEY_GATEWAY,
      Authorization: token || '',
    },
  });
});
const gatewayLink = transactionIdLink.concat(
  new HttpLink({
    uri: Config.URL_GATEWAY_CLIENT,
  }),
);

export { gatewayLink };
