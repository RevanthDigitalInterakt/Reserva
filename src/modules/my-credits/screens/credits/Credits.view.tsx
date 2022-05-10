import React, { Fragment } from "react";
import { Box, Divider, Typography } from "@danilomsou/reserva-ui";
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
              Créditos
            </Typography>
            <PriceCustom
              fontFamily="nunitoBold"
              num={creditsBalance || 0}
              sizeDecimal={13}
              sizeInterger={20}
            />
          </Box>
          <Divider variant="fullWidth" />
          <Box mt="xxs" flexDirection="row" justifyContent="space-between">
            <Typography variant="subtituloSessoes">
              O que são meus créditos?
            </Typography>
          </Box>
          <Box mt="nano" flexDirection="row" justifyContent="space-between">
            <Typography fontFamily="nunitoRegular" fontSize={15}>
              Estes créditos são cedidos por nós, geralmente por conta de alguma
              promoção, devolução ou abono. Eles são atrelados ao seu CPF e não
              podem ser transferidos ou convertidos em outra forma de pagamento.
              E atenção à data de validade dos seus créditos, hein? Você deve
              utilizá-los nas lojas, no site ou aqui no App, antes que expirem.

            </Typography>
          </Box>
        </Box>
      </Box>
    </Fragment>
  )
};
