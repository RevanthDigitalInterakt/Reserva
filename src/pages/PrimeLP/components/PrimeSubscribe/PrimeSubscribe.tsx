import React, { useCallback } from 'react';
import {
  View, TouchableOpacity, ImageBackground,
} from 'react-native';
import { styles } from './PrimeSubscribe.styles';
import testProps from '../../../../utils/testProps';
import type { PrimeDetailOutput } from '../../../../base/graphql/generated';
import EventProvider from '../../../../utils/EventProvider';
import { usePrimeInfo } from '../../../../hooks/usePrimeInfo';
import { Typography } from '../../../../components/Typography/Typography';

const ImageProductSource = require('../../../../../assets/common/product.png');

interface IPrimeSubscribe {
  data: PrimeDetailOutput;
  onAddToCart: () => Promise<void>;
}

function PrimeSubscribe({ data, onAddToCart }: IPrimeSubscribe) {
  const { isPrime } = usePrimeInfo();

  const onPressAddCart = useCallback(async () => {
    EventProvider.logEvent('prime_press_add_to_cart_lp', { position: 'bottom' });
    onAddToCart();
  }, [onAddToCart]);

  return (
    <View {...testProps('prime_subscribe_component')}>
      <View style={styles.wrapperTop}>
        <Typography variant="descontoTag2" style={styles.title}>Assine Agora!</Typography>

        <Typography variant="tituloSessao" style={styles.subtitle}>
          {`Ganhe ${data.discountPercentage}% OFF* em todos os produtos da Reserva. Tudo isso por`}
          <Typography variant="precoPromocional2" style={styles.subtitleBold}>
            {` ${data.installmentQty}x de R$ ${data.installmentPrice}/Mês.`}
          </Typography>
        </Typography>
      </View>

      <ImageBackground source={ImageProductSource} resizeMode="contain" style={styles.image}>
        <Typography style={styles.legalText}>
          *Exceto para parcerias, assinaturas, livros, drinks e máscaras.
          Desconto não cumulativo com outras promoções.
        </Typography>
      </ImageBackground>

      <TouchableOpacity
        style={styles.button}
        onPress={onPressAddCart}
        {...testProps('prime_lp_bottom_button_add')}
      >
        <Typography style={styles.buttonText}>
          {isPrime ? 'CONTINUAR COMPRANDO' : 'Quero ser Prime'}
        </Typography>
      </TouchableOpacity>
    </View>
  );
}

export default PrimeSubscribe;
