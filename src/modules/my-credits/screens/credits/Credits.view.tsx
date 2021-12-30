import React, { Fragment } from "react";
import { Box, Divider, Typography, Button, Icon } from "reserva-ui";

import { PriceCustom } from '../../../Checkout/components/PriceCustom';

export interface CreditsViewProps {
  creditsBalance?: number;
  screenCashbackInStoreActive: boolean;
  handleNavigateToCashbackInStore: () => void;
}

export const CreditsView = (
  {
    creditsBalance,
    handleNavigateToCashbackInStore,
    screenCashbackInStoreActive
  }: CreditsViewProps
) => {
  return (
    <Fragment>
      <Box mx="xxs" mt="sm">
        <Box mb="nano">
          <Typography variant="tituloSessoes">Meus créditos</Typography>
        </Box>
        <Typography fontFamily="nunitoRegular" fontSize={14}>
          Use o crédito na sua próxima compra. Ele aparecerá automaticamente no
          ato do pagamento.
        </Typography>
        <Box mt="xxs">
          <Divider variant="fullWidth" />
          <Box py="xxs" flexDirection="row" justifyContent="space-between">
            <Typography variant="subtituloSessoes">
              Créditos e cashback
            </Typography>
            <PriceCustom
              fontFamily="nunitoBold"
              num={creditsBalance || 0}
              sizeDecimal={13}
              sizeInterger={20}
            />
          </Box>
          <Divider variant="fullWidth" />
          {screenCashbackInStoreActive && (
            <Box flexDirection="row" mt="xxs">
              <Button
                flexDirection="row"
                onPress={handleNavigateToCashbackInStore}
              >
                <>
                  <Icon name="Cashback" size={20} color="preto" mr="xxxs" />
                  <Typography fontFamily="nunitoBold" fontSize={16}>
                    Cashback em Lojas
                  </Typography>
                </>
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Fragment>
  )
};
