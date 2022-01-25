import React, { Fragment } from "react";
import { ImageBackground } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { Box, Typography } from "reserva-ui";
import { images } from '../../../../assets';
import { LoadingScreen } from "../../../../common/components/LoadingScreen";

export interface CashbackInStoreViewProps {
  token?: string;
}

export const CashbackInStoreView = (
  {
    token,
  }: CashbackInStoreViewProps
) => {
  return (
    <Fragment>
      <Box mx="xxs" mt="sm">
        <Box mb="nano">
          <Typography variant="tituloSessoes">
            Ganhe Cashback na Hora
          </Typography>
        </Box>
        <Box mb="xxs">
          <Typography fontFamily="nunitoRegular" fontSize={14}>
            Ao finalizar sua compra nas lojas físicas, você pode converter
            parte do valor em cashback!
          </Typography>
        </Box>
        <Box>
          <Typography fontFamily="nunitoRegular" fontSize={14}>
            Confira as regras da promoção atual com o vendedor e gere seu QR
            Code abaixo.
          </Typography>
        </Box>
        <Box mt="xl" alignItems="center" justifyContent="center">
          <ImageBackground
            source={images.QrcodeBackground}
            style={{ width: 230, height: 230, justifyContent: 'center' }}
            resizeMode="contain"
          >
            <Box alignItems="center" justifyContent="center">
              {token ? (
                <QRCode
                  value={token}
                  logo={images.logoQRCode}
                  logoSize={40}
                  size={200}
                />
              ):  (
                <LoadingScreen />
              )}
            </Box>
          </ImageBackground>
        </Box>
      </Box>
    </Fragment>
  );
}
