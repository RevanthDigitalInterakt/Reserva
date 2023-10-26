import React, { useCallback } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';

import type { PrimeDetailOutput } from '../../../../base/graphql/generated';
import { Typography } from '../../../../components/Typography/Typography';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import EventProvider from '../../../../utils/EventProvider';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import IconPrimeLogo from '../Icons/IconPrimeLogo';
import { styles } from './PrimeHero.styles';

const ImageSource = require('../../../../../assets/common/header.png');

interface IPrimeHero {
  data: PrimeDetailOutput;
  onAddToCart: () => Promise<void>;
}

function PrimeHero({ data, onAddToCart }: IPrimeHero) {
  const { isPrime } = usePrimeInfo();

  const onPressAddCart = useCallback(() => {
    EventProvider.logEvent('prime_press_add_to_cart_lp', { position: 'top' });
    onAddToCart();
  }, [onAddToCart]);

  return (
    <ImageBackground
      source={ImageSource}
      style={{ width: configDeviceSizes.DEVICE_WIDTH }}
      resizeMode="cover"
      testID="com.usereserva:id/PrimeHero_component"
    >
      <View style={styles.wrapper}>
        <IconPrimeLogo style={styles.icon} />

        <Typography variant="subtituloSessoes" style={styles.title}>
          Um paraíso de benefícios só
          {'\n'}
          {`seus por ${data.installmentQty}x`}
          <Typography variant="descontoTag2" style={styles.bold}>
            {` ${data.installmentPrice}/Mês*.`}
          </Typography>
        </Typography>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            testID="com.usereserva:id/PrimeHero_call_to_action"
            style={styles.button}
            onPress={onPressAddCart}
          >
            <Typography variant="tituloSessao" style={styles.buttonText}>
              {isPrime ? 'CONTINUAR COMPRANDO' : 'ASSINE AGORA'}
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default PrimeHero;
