import React, { useCallback, useState } from 'react';

import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import testProps from '../../../../utils/testProps';
import { ProductPaymentDescription } from './components/ProductPaymentDescription';

function PaymentWays() {
  return (
    <>
      <ProductPaymentDescription title="Cartão de crédito" description="10x sem juros no cartão, comparcela mínima de R$ 60" testID="credit_card_payment_way" />
      <ProductPaymentDescription title="Pix" description="Pague à vista ou até em 4x sem juros. " testID="pix_payment_way" />
      <ProductPaymentDescription title="Nubank" description="Em até 24x" testID="nubank_payment_way" />
      <ProductPaymentDescription title="Cartão Presente" description="Cartões de Presente Pré-pagos" testID="gift_card_payment_way" />
    </>
  );
}

export function ProductPayment() {
  const [showSection, setShowSection] = useState(false);
  const onToggle = useCallback((show: boolean) => {
    setShowSection(show);

    // EventProvider.logEvent('product_view_about', {
    //   show: show ? 1 : 0,
    //   product_id: productDetail?.productId || '',
    // });
  }, []);
  // }, [productDetail]);

  return (
    <Box>
      <Button
        {...testProps('about_this_product_button')}
        variant="semBorda"
        onPress={() => onToggle(!showSection)}
        flexDirection="row"
      >
        <>
          {showSection
            ? (
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
