import React, {
  useLayoutEffect, useState, useCallback,
} from 'react';
import { View } from 'react-native';
import { Typography } from '@usereservaapp/reserva-ui';

import testProps from '../../utils/testProps';
import { useCart } from '../../context/CartContext';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import type { ProductSizeOutput } from '../../base/graphql/generated';
import { usePrimeStore } from '../../zustand/usePrimeStore/usePrimeStore';

import { ModalSignIn } from '../ModalSignIn';
import { ModalBag } from '../ModalBag/ModalBag';
import { ModalWelcomePrime } from '../ModalWelcomePrime';
import { SelectBoxPrime } from '../SelectBoxPrime/SelectBoxPrime';
import { SelectBoxNormal } from '../SelectBoxNormal/SelectBoxNormal';

import { styles } from './PricesSelectBoxes.styles';

interface IPropsPriceSelectBoxes {
  selectedSize: ProductSizeOutput | null;
}

function PricesSelectBoxes({ selectedSize }: IPropsPriceSelectBoxes) {
  const [isNormalPriceSelected, setIsNormalPriceSelected] = useState(false);
  const [isPrimePriceSelected, setIsPrimePriceSelected] = useState(false);
  const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);

  const {
    animationBag,
    handleClickContinue,
    isVisibleModalWelcome,
    changeStateAnimationBag,
    hasPrimeSubscriptionInCart,
  } = usePrimeStore([
    'animationBag',
    'handleClickContinue',
    'isVisibleModalWelcome',
    'changeStateAnimationBag',
    'hasPrimeSubscriptionInCart',
  ]);

  const { orderForm } = useCart();
  const { profile } = useAuthStore(['profile']);

  const hasDiscount = selectedSize?.hasDiscount;

  const selectNormalPrice = useCallback(() => {
    setIsNormalPriceSelected(true);
    setIsPrimePriceSelected(false);
  }, []);

  const selectPrimePrice = useCallback(() => {
    setIsNormalPriceSelected(false);
    setIsPrimePriceSelected(true);
  }, []);

  const selectPriceBasedOnUser = useCallback(() => {
    if (!hasDiscount && (profile?.isPrime || hasPrimeSubscriptionInCart)) {
      selectPrimePrice();
    } else {
      selectNormalPrice();
    }
  }, [hasDiscount, hasPrimeSubscriptionInCart, profile?.isPrime]);

  useLayoutEffect(() => {
    selectPriceBasedOnUser();
  }, [hasDiscount,
    orderForm,
    hasPrimeSubscriptionInCart,
    isModalSignInVisible,
    selectPriceBasedOnUser]);

  const handleSelectBoxesPress = useCallback(
    (option: string) => {
      if (option === 'priceNormal' && !isNormalPriceSelected) {
        selectNormalPrice();
      } else if (option === 'pricePrime' && !isPrimePriceSelected) {
        selectPrimePrice();

        if (!profile?.isPrime && !hasPrimeSubscriptionInCart) {
          setIsModalSignInVisible(true);
        }
      }
    },
    [hasPrimeSubscriptionInCart, isNormalPriceSelected, isPrimePriceSelected, profile?.isPrime],
  );

  const savedValueProduct = (): number => {
    const currentPriceProduct = selectedSize?.currentPrice || 0;
    const pricePrime = selectedSize?.prime?.price || 0;

    if (!currentPriceProduct && !pricePrime) return 0;

    const calcPriceWithPrime = currentPriceProduct - pricePrime;

    return calcPriceWithPrime;
  };

  return (
    <View {...testProps('com.usereserva:id/prices_select_boxes')}>
      <ModalSignIn
        isVisible={isModalSignInVisible}
        onClose={() => setIsModalSignInVisible(false)}
      />

      <ModalWelcomePrime isVisible={isVisibleModalWelcome} onClose={handleClickContinue} />

      <ModalBag
        isVisible={animationBag}
        onBackdropPress={() => changeStateAnimationBag(false)}
      />

      <SelectBoxNormal
        installmentsNumber={selectedSize?.installment.number ?? 1}
        installmentsPrice={selectedSize?.installment.value ?? 0}
        isChecked={isNormalPriceSelected}
        onPress={handleSelectBoxesPress}
        price={
          hasDiscount ? selectedSize.currentPrice : selectedSize?.listPrice
        }
      />

      {selectedSize?.hasDiscount ? (
        <Typography
          fontFamily="reservaSansRegular"
          color="fullBlack"
          style={styles.textWrapper}
        >
          O desconto do
          <Typography
            fontFamily="reservaDisplayRegular"
            variant="descontoTag2"
            fontSize={20}
            color="vermelhoRSV"
          >
            {' '}
            Prime
            {' '}
          </Typography>
          não é cumulativo com produtos em liquidação.
        </Typography>
      ) : (
        <SelectBoxPrime
          installmentsNumber={selectedSize?.prime?.installment?.number ?? 1}
          installmentsPrice={selectedSize?.prime?.installment?.value ?? 0}
          isChecked={isPrimePriceSelected}
          onPress={handleSelectBoxesPress}
          savedValue={savedValueProduct()}
          price={selectedSize?.prime?.price}
        />
      )}
    </View>
  );
}

export default PricesSelectBoxes;
