import React from 'react';

import { Text, TouchableOpacity, View } from 'react-native';
import type { ShippingStoreOutput } from '../../../../base/graphql/generated';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import { pickUpItemStyle } from './styles/pickUpItem.styles';

type PickUpItemProps = {
  store: ShippingStoreOutput
};

export default function PickUpItem({ store }: PickUpItemProps): JSX.Element {
  return (
    <TouchableOpacity onPress={() => console.log('Clicou adicionar endereço')}>
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
