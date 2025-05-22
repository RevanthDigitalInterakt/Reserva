import type { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo } from 'react';

import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import NewCreateAddress from '../../../pages/Address/CreateAddress/CreateAddress';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { NewAddress } from './view/NewAddress';
import { useIsTester } from '../../../hooks/useIsTester';

type Props = StackScreenProps<RootStackParamList, 'NewAddress'>;
type NewCreateAddressProps = StackScreenProps<RootStackParamList, 'CreateAddress'>;

export default function NewAddressABTest(
  newCreateAddressProps: NewCreateAddressProps,
  newAddressProps: Props,
): JSX.Element {
  const { getBoolean } = useRemoteConfig();
  const isTester = useIsTester();

  const showNewAddress = useMemo(() => getBoolean(isTester ? 'show_new_address_tester' : 'show_new_address'), [getBoolean, isTester]);

  return (
    showNewAddress
      ? <NewCreateAddress {...newCreateAddressProps} /> : <NewAddress {...newAddressProps} />
  );
}
