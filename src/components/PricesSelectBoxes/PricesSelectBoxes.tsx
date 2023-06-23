import React, { useLayoutEffect, useState, useCallback } from 'react';
import { Typography } from '@usereservaapp/reserva-ui';
import { View } from 'react-native';
import { SelectBoxPrime } from '../SelectBoxPrime/SelectBoxPrime';
import { SelectBoxNormal } from '../SelectBoxNormal/SelectBoxNormal';
import type { ProductSizeOutput } from '../../base/graphql/generated';
import { styles } from './PricesSelectBoxes.styles';
import testProps from '../../utils/testProps';
import { ModalSignIn } from '../ModalSignIn';
import { ModalBag } from '../../common/components/ModalBag/ModalBag';

interface IPropsPriceSelectBoxes {
  selectedSize: ProductSizeOutput | null;
}

function PricesSelectBoxes({ selectedSize }: IPropsPriceSelectBoxes) {
  const [isNormalPriceSelected, setIsNormalPriceSelected] = useState(false);
  const [isPrimePriceSelected, setIsPrimePriceSelected] = useState(false);
  const [isModalSignInVisible, setIsModalSignInVisible] = useState(false);
  const [loadingAddCart, setLoadingAddCart] = useState(false);
  const [animationBag, setAnimationBag] = useState(false);

  const hasDiscount = selectedSize?.hasDiscount;

  useLayoutEffect(() => {
    /* TODO: make verification if user is prime
    or has prime on the cart and if has prime on the bag */
    if (hasDiscount) {
      setIsNormalPriceSelected(!isNormalPriceSelected);
    } else {
      setIsPrimePriceSelected(!isPrimePriceSelected);
    }
  }, [hasDiscount]);

  const handleSelectBoxesPress = useCallback(
    (option: string) => {
      if (option === 'priceNormal' && !isNormalPriceSelected) {
        setIsNormalPriceSelected(true);
        setIsPrimePriceSelected(false);
      } else if (option === 'pricePrime' && !isPrimePriceSelected) {
        setIsNormalPriceSelected(false);
        setIsPrimePriceSelected(true);
        setIsModalSignInVisible(true);
      }
    },
    [isNormalPriceSelected, isPrimePriceSelected],
  );

  return (
    <View {...testProps('com.usereserva:id/prices_select_boxes')}>
      <ModalSignIn
        isVisible={isModalSignInVisible}
        onClose={() => setIsModalSignInVisible(false)}
        loadingAddCart={loadingAddCart}
        setAnimationBag={setAnimationBag}
        setLoadingAddCart={setLoadingAddCart}
      />

      <ModalBag
        isVisible={animationBag}
        onBackdropPress={() => setAnimationBag(false)}
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
          savedValue={15} // TODO: should be the difference between price prime and normal price
          price={selectedSize?.prime?.price}
        />
      )}
    </View>
  );
}

export default PricesSelectBoxes;
