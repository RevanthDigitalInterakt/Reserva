import React, { Fragment } from "react";
import { ImageBackground, TouchableOpacity } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import { Box, Button, Icon, Image, Typography } from "reserva-ui";
import { images } from '../../../../assets';
import { ModalTermsAndConditions } from "./components/ModalTermsAndConditions";


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

          <Box mt="xxxs">
            <ModalTermsAndConditions
              isVisible={modalVisible}
              loading={false}
              isAccepted={termsIsAccepted}
              setIsVisible={() => toggleModal()}
              setTermAndConditions={() => acceptTermsAndConditions()}
            />
            <Box
              flexDirection="row"
              alignItems="center"
              mt="xxxs"
              justifyContent="center"
            >
              <Box>
                <Box flexDirection="row" alignItems="center">
                  <TouchableOpacity
                    onPress={() => toggleModal()}
                  >
                    <Typography
                      variant="precoAntigo3"
                      color="preto"
                      style={{ textDecorationLine: 'underline' }}
                    >
                      Ler termos e condições de uso.
                    </Typography>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box mt="xxs" style={{
            backgroundColor: "rgba(214, 209, 196, 0.15)",
            padding: 10,
            borderColor: "#D6D1C4",
            borderWidth: 1,
            borderRadius: 4,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%"
          }}>
            <TouchableOpacity
                onPress={() => acceptTermsAndConditions()}
              >
                <Box
                  backgroundColor={termsIsAccepted ? 'preto' : 'white'}
                  width={14}
                  height={14}
                  border="1px"
                  borderColor="preto"
                  borderRadius="pico"
                  mr="nano"
                  alignItems="center"
                  justifyContent="center"
                >
                  {termsIsAccepted && (
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
            <Typography fontFamily="nunitoRegular" fontSize={14}>
              Li e aceito os termos e condições de uso.
            </Typography>
          </Box>
          <Box mt="xs" mb="nano">
            <Button
              disabled={!termsIsAccepted}
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
