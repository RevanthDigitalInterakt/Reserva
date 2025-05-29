import React from 'react';
import {
  Platform, Text, TouchableOpacity, View,
} from 'react-native';
import { shippingDataDetailsStyles } from './ShippingDataDetails.styles';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import { platformType } from '../../../../utils/platformType';

type TShippingDataDetailsProps = {
  onPress: () => void;
  type: string;
  store?: string;
};

export default function ShippingDataDetails({ type, store = '', onPress }: TShippingDataDetailsProps) {
  const isIOS = Platform.OS === platformType.IOS;

  const shadownContainer = [
    shippingDataDetailsStyles.container,
    isIOS ? shippingDataDetailsStyles.shadowIOS
      : shippingDataDetailsStyles.shadowAndroid,
  ];

  return (
    <View style={[shippingDataDetailsStyles.container, shadownContainer]}>
      <View style={shippingDataDetailsStyles.contentWrap}>
        <View style={shippingDataDetailsStyles.containerWrap}>
          <IconComponent icon="greenCheck" style={shippingDataDetailsStyles.iconRight} />
          <View>
            <Text style={shippingDataDetailsStyles.title}>
              {type}
            </Text>
            {store && (
              <Text style={shippingDataDetailsStyles.description}>
                {store}
              </Text>
            )}
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={onPress} hitSlop={20}>
        <View style={shippingDataDetailsStyles.buttonWrap}>
          <Text style={shippingDataDetailsStyles.edit}>
            Editar
          </Text>
          <View>
            <IconComponent icon="chevronRight" />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
