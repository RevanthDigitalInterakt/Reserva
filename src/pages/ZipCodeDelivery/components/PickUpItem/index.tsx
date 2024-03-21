import React, { useCallback } from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { ShippingSimulationOutput, ShippingStoreOutput } from '../../../../base/graphql/generated';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import { pickUpItemStyle } from './styles/pickUpItem.styles';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

type TPickUpItemProps = {
  store: ShippingStoreOutput
  deliveryOptions: ShippingSimulationOutput['delivery']['deliveryOptions'],
  deliveryOptionsStore: ShippingSimulationOutput['storeList']['deliveryOptions']
};

export default function PickUpItem({
  store,
  deliveryOptions,
  deliveryOptionsStore,
}: Readonly<TPickUpItemProps>) {
  const { actions } = useBagStore(['actions']);
  const navigation = useNavigation();

  const handleSetPickUpItemStore = useCallback(async () => {
    await actions.ADD_DELIVERY_TO_PICKUP_IN_POINT(
      deliveryOptionsStore,
      store.address,
    );

    actions.ADD_DELIVERY_TYPE('Retire em loja', store.friendlyName);

    navigation?.goBack();
  }, [store, deliveryOptions, deliveryOptionsStore]);

  return (
    <TouchableOpacity onPress={handleSetPickUpItemStore}>
      <View style={pickUpItemStyle.container}>
        <View style={pickUpItemStyle.textWrapper}>
          <Text style={pickUpItemStyle.friendlyNameText}>
            {store.friendlyName}
          </Text>
          <Text style={pickUpItemStyle.addressText}>
            {store.address.street}
            ,
            {store.address.complement}
            ,
            {store.address.neighborhood}
            -
            {store.address.city}
            -
            {store.address.state}
          </Text>
        </View>
        <IconComponent icon="chevronRight" />
      </View>
    </TouchableOpacity>
  );
}
