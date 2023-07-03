import React, { useCallback } from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Typography } from '@usereservaapp/reserva-ui';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import { styles } from './PrimeHero.styles';
import IconPrimeLogo from '../Icons/IconPrimeLogo';
import type { PrimeDetailOutput } from '../../../../base/graphql/generated';
import EventProvider from '../../../../utils/EventProvider';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { usePrimeStore } from '../../../../zustand/usePrimeStore/usePrimeStore';

const ImageSource = require('../../../../../assets/common/header.png');

interface IPrimeHero {
  data: PrimeDetailOutput;
  onAddToCart: () => Promise<void>;
}

function PrimeHero({ data, onAddToCart }: IPrimeHero) {
  const { profile } = useAuthStore(['profile']);
  const { hasPrimeSubscriptionInCart } = usePrimeStore(['hasPrimeSubscriptionInCart']);

  const onPressAddCart = useCallback(() => {
    EventProvider.logEvent('prime_press_add_to_cart_lp', { position: 'top' });
    onAddToCart();
  }, [onAddToCart]);

  const hasPrime = profile?.isPrime || hasPrimeSubscriptionInCart;

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

        <Typography variant="tituloSessao" style={styles.subtitle}>
          Torne-se membro do maior clube de vantagens da
          {'\n'}
          moda brasileira e tenha acesso a descontos
          especiais, frete grátis e muito mais.
        </Typography>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            testID="com.usereserva:id/PrimeHero_call_to_action"
            style={styles.button}
            onPress={onPressAddCart}
          >
            <Typography variant="tituloSessao" style={styles.buttonText}>
              {hasPrime ? 'CONTINUAR COMPRANDO' : 'ASSINE AGORA'}
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export default PrimeHero;
