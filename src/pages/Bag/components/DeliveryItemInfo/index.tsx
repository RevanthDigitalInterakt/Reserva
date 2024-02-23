import React from 'react';
import { Text, View } from 'react-native';
import { deliveryItemInfoStyles } from './DeliveryItemInfo.styles';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import { decimalPart, integerPart } from '../../../../utils/numberUtils';

type DeliveryItemInfoProps = {
  friendlyName: string;
  shippingEstimate: string;
  totalShippingValue: number;
};

export default function DeliveryItemInfo({
  friendlyName,
  shippingEstimate,
  totalShippingValue,
}: DeliveryItemInfoProps) {
  return (
    <View style={deliveryItemInfoStyles.container}>
      <View style={deliveryItemInfoStyles.containerWrap}>
        <IconComponent icon="greenCheck" style={deliveryItemInfoStyles.iconRight} />
        <View style={deliveryItemInfoStyles.textWrap}>
          <Text style={deliveryItemInfoStyles.title}>
            {friendlyName}
          </Text>
          <Text style={deliveryItemInfoStyles.subTitle}>
            {shippingEstimate}
          </Text>
        </View>
      </View>
      <Text style={deliveryItemInfoStyles.shippingValue}>
        {totalShippingValue > 0 ? (
          `R$ ${integerPart(
            (totalShippingValue / 100),
          )},${decimalPart(
            (totalShippingValue / 100),
          )}`
        ) : (
          'Grátis'
        )}
      </Text>

    </View>
  );
}
