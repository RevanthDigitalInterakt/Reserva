import React, { Fragment } from "react";
import { ImageBackground } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { Box, Button, Image, Typography } from "@danilomsou/reserva-ui";
import { images } from '../../../../assets';


export interface CashbackInStoreViewProps {
  token?: string;
  generateToken: () => void;
  toggleModal: () => void;
  modalVisible: boolean;
  termsIsAccepted: boolean;
  acceptTermsAndConditions: () => void;
}

export const CashbackInStoreView = (
  {
    token,
    generateToken,
    toggleModal,
    modalVisible,
    termsIsAccepted,
    acceptTermsAndConditions
  }: CashbackInStoreViewProps
) => {
  return (
    <Fragment>
      <Box mx="xxs" mt="sm">
        <Box mb="nano">
          <Typography variant="tituloSessoes">
          Cashback em Lojas
          </Typography>
        </Box>
        <Box mb="xxs">
          <Typography fontFamily="nunitoRegular" fontSize={14}>
          Use o QR Code para gerar cashback nas compras em lojas físicas.
          </Typography>
        </Box>
        <Box mt="xl" alignItems="center" justifyContent="center">
          <ImageBackground
            source={images.QrcodeBackground}
            style={{ width: 230, height: 230, justifyContent: 'center' }}
            resizeMode="contain"
          >
            <Box alignItems="center" justifyContent="center" >
              {token ? (
                <QRCode
                  value={token}
                  logo={images.logoQRCode}
                  logoSize={40}
                  size={200}
                />
              ) : (
                <Image source={images.imageCashback} width={200} height={200} />
              )}
            </Box>
          </ImageBackground>
          <Box mt="xl" mb="nano">
            <Button
              onPress={() => generateToken()}
              title="GERAR QR CODE"
              variant="primarioMaior"
            />
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}
