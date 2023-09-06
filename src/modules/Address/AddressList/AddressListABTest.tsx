import React, { useMemo } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import { useIsTester } from '../../../hooks/useIsTester';
import AddressList from './view';
import NewListAddress from '../../../pages/Address/ListAddress/ListAddress';
import type { RootStackParamList } from '../../../routes/StackNavigator';

type NewAddressListProps = StackScreenProps<RootStackParamList, 'AddressList'>;

export default function NewAddressABTest(
  newListAddressProps: NewAddressListProps,
): JSX.Element {
  const { getBoolean } = useRemoteConfig();
  const isTester = useIsTester();

  const showNewAddressList = useMemo(() => getBoolean(isTester ? 'show_new_address_list_tester' : 'show_new_address_list'), [getBoolean, isTester]);

  return (
    showNewAddressList
      ? <NewListAddress {...newListAddressProps} /> : <AddressList />
  );
}
