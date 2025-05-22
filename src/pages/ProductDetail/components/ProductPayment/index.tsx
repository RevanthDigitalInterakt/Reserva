import React, { useState } from 'react';

import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import testProps from '../../../../utils/testProps';
import { ProductPaymentDescription } from './components/ProductPaymentDescription';
import { useProductDetailStore } from '../../../../zustand/useProductDetail/useProductDetail';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import EventProvider from '../../../../utils/EventProvider';

enum PaymentWaysEnum {
  CREDIT_CARD = 'creditCardPaymentGroup',
  GIFT_CARD = 'giftCardPaymentGroup',
  TICKET = 'PagalevePaymentGroup',
  NU_PAY = 'NubankPaymentGroup',
  PIX = 'PagalevePixAVistaTransparentePaymentGroup',
}

function PaymentWays() {
  const { productDetail } = useProductDetailStore(['productDetail']);
  const { getString } = useRemoteConfig();
  const creditCardDescription = getString('creditCardPaymentDescription');
  const giftCardDescription = getString('giftCardPaymentDescription');
  const nubankDescription = getString('nubankPaymentDescription');
  const pixDescription = getString('pixPaymentDescription');
  const hasCreditCardPaymentWay = productDetail?.paymentSystemGroupName?.includes(
    PaymentWaysEnum.CREDIT_CARD,
  );
  const hasGiftCardPaymentWay = productDetail?.paymentSystemGroupName?.includes(
    PaymentWaysEnum.GIFT_CARD,
  );
  const hasNuPayPaymentWay = productDetail?.paymentSystemGroupName?.includes(
    PaymentWaysEnum.NU_PAY,
  );
  const hasPixPaymentWay = productDetail?.paymentSystemGroupName?.includes(
    PaymentWaysEnum.PIX,
  );

  return (
    <>
      {hasCreditCardPaymentWay && (
        <ProductPaymentDescription
          title="Cartão de crédito"
          description={creditCardDescription}
          testID="credit_card_payment_way"
        />
      )}
      {hasPixPaymentWay && (
        <ProductPaymentDescription
          title="Pix"
          description={pixDescription}
          testID="pix_payment_way"
        />
      )}
      {hasNuPayPaymentWay && (
        <ProductPaymentDescription
          title="Nubank"
          description={nubankDescription}
          testID="nubank_payment_way"
        />
      )}
      {hasGiftCardPaymentWay && (
        <ProductPaymentDescription
          title="Cartão Presente"
          description={giftCardDescription}
          testID="gift_card_payment_way"
        />
      )}
    </>
  );
}

export function ProductPayment() {
  const { productDetail } = useProductDetailStore(['productDetail']);
  const [showSection, setShowSection] = useState(false);
  const onToggle = (show: boolean) => setShowSection(show);
  return (
    <Box>
      <Button
        {...testProps('about_this_product_button')}
        variant="semBorda"
        onPress={() => {
          onToggle(!showSection);
          EventProvider.logEvent('payment_options_click', {
            item_id: productDetail?.productId,
          });
        }}
        flexDirection="row"
      >
        <>
          {showSection ? (
            <Box alignSelf="center" paddingRight="quarck" paddingLeft="quarck">
              <IconLegacy name="Subtraction" color="fullBlack" size={20} />
            </Box>
          ) : (
            <Box alignSelf="center" paddingRight="nano">
              <IconLegacy name="Add" color="fullBlack" size={20} />
            </Box>
          )}

          <Box flex={1}>
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              Formas de pagamento
            </Typography>
          </Box>
        </>
      </Button>

      {showSection && <PaymentWays />}
    </Box>
  );
}
