import React, { useCallback } from 'react';
import { View, Text } from 'react-native';
import { styles } from './PrimeDiscount.styles';
import IconDiamond from '../../../assets/icons/IconDiamond';

import { Button } from '../Button';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import { PriceCustom } from '../PriceCustom/PriceCustom';
import { COLORS, FONTS } from '../../base/styles';
import { Divider } from '../Divider/Divider';

interface PrimeDiscountProps {
  discountPrime?: number;
  setOpenModal?: (value: boolean) => void;
  setNegativeValue?: boolean;
}

export default function PrimeDiscount({
  discountPrime,
  setOpenModal,
  setNegativeValue,
}: PrimeDiscountProps) {
  const { onAddPrimeToCart, isPrime } = usePrimeInfo();
  const handleClick = useCallback(async () => {
    await onAddPrimeToCart();
    if (setOpenModal) {
      setOpenModal(true);
    }
  }, []);

  return (
    <>
      {!isPrime && (<Divider variant="fullWidth" marginY="xs" />)}

      {discountPrime !== null && (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <IconDiamond />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>
              {isPrime ? 'Desconto Prime' : 'Valor para assinantes'}
              {!isPrime && <Text style={styles.boldText}> Prime</Text>}
            </Text>
          </View>
          <View style={styles.containerPriceCustom}>
            <PriceCustom
              fontFamily={FONTS.RESERVA_SANS_BOLD}
              color={COLORS.DARK_GOLD_TEXT}
              sizeInteger={14}
              sizeDecimal={14}
              num={discountPrime || 0}
              negative={setNegativeValue}
            />
          </View>
        </View>
      )}

      {!isPrime && (
        <>
          <Button
            onPress={() => handleClick()}
            title="ASSINE AGORA POR 12x de R$25"
            variant="primarioEstreito"
            inline
            style={{ backgroundColor: COLORS.BACKGROUND_GOLD_PRIME }}
          />
          <Text style={styles.textInfo}>
            Com a Reserva Prime tenha um mundo de benefícios como
          </Text>
          <Text style={styles.textInfoBold}>
            descontos e frete grátis em todos os seus pedidos!*
          </Text>
        </>
      )}
    </>
  );
}
