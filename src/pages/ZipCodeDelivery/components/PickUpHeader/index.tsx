import React from 'react';

import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AddZipCodeDelivery from '../../../Bag/components/AddZipCodeDelivery';
import { pickUpHeaderStyles } from './styles/pickUpHeader.styles';
import type { ShippingSimulationOutput } from '../../../../base/graphql/generated';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

type TPickUpHeaderProps = {
  addressDelivery: ShippingSimulationOutput
  showHeader: boolean
};

export default function PickUpHeader({
  addressDelivery,
  showHeader,
}: TPickUpHeaderProps): JSX.Element {
  const { actions } = useBagStore(['actions']);
  const navigation = useNavigation();

  const handleClickDeliveryToResidence = async () => {
    await actions.ADD_DELIVERY_TO_RESIDENCE(
      addressDelivery.delivery.deliveryOptions,
      addressDelivery.delivery.address,
    );
    actions.ADD_DELIVERY_TYPE('Receba em casa');
    navigation.goBack();
  };
  return (
    <>
      {showHeader && (
      <>
        <View style={pickUpHeaderStyles.containerMarginTop}>
          <Text style={pickUpHeaderStyles.deliveryText}>
            Receba em casa
          </Text>
        </View>
        <View style={pickUpHeaderStyles.containerMarginTop}>
          <AddZipCodeDelivery
            icon="greenCheck"
            label={addressDelivery?.delivery?.address?.street!}
            description={`${addressDelivery?.delivery.address?.neighborhood} - ${addressDelivery?.delivery.address?.city} - ${addressDelivery?.delivery.address?.state}`}
            onPress={handleClickDeliveryToResidence}
          />
        </View>
      </>
      )}
      {!!addressDelivery?.storeList?.stores.length && (
      <>
        {showHeader && (
        <View style={pickUpHeaderStyles.dividerWrap}>
          <View style={pickUpHeaderStyles.divider} />
          <Text style={pickUpHeaderStyles.dividerText}>
            OU
          </Text>
          <View style={pickUpHeaderStyles.divider} />
        </View>
        )}
        <View style={pickUpHeaderStyles.containerMarginTop}>
          <View>
            <Text style={pickUpHeaderStyles.deliveryText}>
              Retirada em loja
            </Text>
          </View>
          <View
            style={[
              pickUpHeaderStyles.containerMarginTop,
              pickUpHeaderStyles.containerMarginBottom,
            ]}
          >
            <Text style={pickUpHeaderStyles.pickUpText}>
              Selecione uma das lojas abaixo para buscar seu pedido e ganhe
              {' '}
              <Text style={pickUpHeaderStyles.pickUpDiscountStoreText}>
                {`${addressDelivery.storeList.discountStorePickup} % off `}
              </Text>
              <Text style={pickUpHeaderStyles.pickUpTextBold}>
                em uma nova compra no ato da retirada.
              </Text>
            </Text>
          </View>
        </View>
      </>
      )}
    </>
  );
}
