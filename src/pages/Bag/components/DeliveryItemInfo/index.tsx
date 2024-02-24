import React, { useMemo } from 'react';
import { Text, View } from 'react-native';
import { deliveryItemInfoStyles } from './DeliveryItemInfo.styles';
import IconComponent from '../../../../components/IconComponent/IconComponent';

type DeliveryItemInfoProps = {
  friendlyName: string;
  shippingEstimate: number;
};

export default function DeliveryItemInfo({
  friendlyName,
  shippingEstimate,
}: DeliveryItemInfoProps) {
  const estimateText = useMemo(
    () => (
      shippingEstimate > 1
        ? `Em até ${shippingEstimate} dias úteis.`
        : `Em até ${shippingEstimate} dia útil.`),
    [shippingEstimate],
  );

  return (
    <View style={deliveryItemInfoStyles.container}>
      <View style={deliveryItemInfoStyles.containerWrap}>
        <IconComponent icon="greenCheck" style={deliveryItemInfoStyles.iconRight} />
        <View style={deliveryItemInfoStyles.textWrap}>
          <Text style={deliveryItemInfoStyles.title}>
            {friendlyName}
          </Text>
          <Text style={deliveryItemInfoStyles.subTitle}>
            {estimateText}
          </Text>
        </View>
      </View>
    </View>
  );
}
