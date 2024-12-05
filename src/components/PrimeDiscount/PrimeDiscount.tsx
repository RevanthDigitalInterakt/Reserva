import React, { useCallback, useMemo } from 'react';
import { View, Text } from 'react-native';
import { styles } from './PrimeDiscount.styles';
import IconDiamond from '../../../assets/icons/IconDiamond';

import { Button } from '../Button';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import { PriceCustom } from '../PriceCustom/PriceCustom';
import { COLORS, FONTS } from '../../base/styles';
import { Divider } from '../Divider/Divider';
import { useLandingPagePrimeQuery } from '../../base/graphql/generated';
import { useApolloFetchPolicyStore } from '../../zustand/useApolloFetchPolicyStore';

export enum PrimeDiscountType {
  BagCoupon = 'BagCoupon',
  BagFooter = 'BagFooter',
}

interface PrimeDiscountProps {
  type: PrimeDiscountType;
  totalPrime: number | null | undefined;
  discountPrime: number | undefined;
  renderApp: boolean | undefined;
  setOpenModal?: (value: boolean) => void;
  setNegativeValue?: boolean;
}

export default function PrimeDiscount({
  type,
  totalPrime,
  discountPrime,
  renderApp,
  setOpenModal,
  setNegativeValue,
}: PrimeDiscountProps) {
  const { getFetchPolicyPerKey } = useApolloFetchPolicyStore(['getFetchPolicyPerKey']);
  const { onAddPrimeToCart, isPrime } = usePrimeInfo();
  const handleClick = useCallback(async () => {
    await onAddPrimeToCart(true);
    if (setOpenModal) {
      setOpenModal(true);
    }
  }, []);

  const { data: rawData } = useLandingPagePrimeQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: getFetchPolicyPerKey('landingPagePrime'),
  });

  const data = useMemo(() => rawData?.landingPagePrime, [rawData?.landingPagePrime]);

  const hasRenderBagCupon = !isPrime && renderApp;

  const hasRenderBagFooter = isPrime && !!discountPrime && discountPrime > 0;

  // Quando usuário não é prime, e o carrinho dele tem vangatens de desconto com prime.
  if (hasRenderBagCupon && type === 'BagCoupon') {
    return (
      <>
        <Divider variant="fullWidth" marginY="xs" />
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <IconDiamond />
          </View>
          <View style={styles.containerText}>
            <Text style={styles.text}>
              Valor para assinantes
            </Text>
            <Text style={styles.boldText}> Prime</Text>
          </View>
          <View style={styles.containerPriceCustom}>
            <PriceCustom
              fontFamily={FONTS.RESERVA_SANS_BOLD}
              color={COLORS.DARK_GOLD_TEXT}
              sizeInteger={14}
              sizeDecimal={14}
              num={totalPrime || 0}
              negative={setNegativeValue}
            />
          </View>
        </View>

        <Button
          onPress={() => handleClick()}
          title={`ASSINE AGORA POR ${data?.installmentQty}x de R$${data?.installmentPrice}`}
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
    );
  }

  if (hasRenderBagFooter && type === 'BagFooter') {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <IconDiamond />
        </View>
        <View style={styles.containerText}>
          <Text style={styles.text}>
            Desconto Prime
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
    );
  }

  return null;
}
