import React, { Fragment } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import { Box, Icon, Typography } from "reserva-ui";
import QRCode from 'react-native-qrcode-svg';

import { images } from '../../../../assets';
import { LoadingScreen } from "../../../../common/components/LoadingScreen";
import { ModalTermsAndConditions } from "./components/ModalTermsAndConditions";

export interface CashbackInStoreViewProps {
  isLoyal: boolean;
  loadingLoyalRequest: boolean;
  isVisibleTermsAndConditions: boolean;
  acceptLoyalty: () => void;
  handleToggleTermsAndConditions: () => void;
}

export const CashbackInStoreView = (
  {
    isLoyal,
    loadingLoyalRequest,
    isVisibleTermsAndConditions,
    acceptLoyalty,
    handleToggleTermsAndConditions
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
              {true && (
                <QRCode
                  value="sda"
                  logo={images.logoQRCode}
                  logoSize={40}
                  size={200}
                />
              )}
              {false && (
                <LoadingScreen />
              )}
            </Box>
          </ImageBackground>
        </Box>
        <Box mt="xxs">
          <ModalTermsAndConditions
            isVisible={isVisibleTermsAndConditions}
            loading={loadingLoyalRequest}
            isAccepted={isLoyal}
            setIsVisible={handleToggleTermsAndConditions}
            setTermAndConditions={acceptLoyalty}
          />
          <Box
            flexDirection="row"
            alignItems="center"
            mt="xxxs"
            justifyContent="center"
          >
            {loadingLoyalRequest ? (
              <Box mr="quarck" alignItems="center" justifyContent="center">
                <LoadingScreen />
              </Box>
            ) : (
              <TouchableOpacity
                onPress={acceptLoyalty}
                disabled={isLoyal}
              >
                <Box
                  backgroundColor={isLoyal ? 'preto' : 'white'}
                  width={14}
                  height={14}
                  border="1px"
                  borderColor="preto"
                  borderRadius="pico"
                  mr="nano"
                  alignItems="center"
                  justifyContent="center"
                >
                  {isLoyal && (
                    <Icon
                      name="Check"
                      size={14}
                      color="white"
                      mt="nano"
                      ml="quarck"
                    />
                  )}
                </Box>
              </TouchableOpacity>
            )}
            <Box>
              <Box flexDirection="row" alignItems="center">
                <Typography variant="precoAntigo3" color="preto">
                  Li e aceito os{' '}
                </Typography>

                <TouchableOpacity
                  onPress={handleToggleTermsAndConditions}
                >
                  <Typography
                    variant="precoAntigo3"
                    color="preto"
                    fontWeight="bold"
                    style={{ textDecorationLine: 'underline' }}
                  >
                    termos e condições.
                  </Typography>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}
