import {
  Box,
  Button,
  Checkbox,
  Image,
  Typography,
} from '@usereservaapp/reserva-ui';
import React, { Fragment, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { images } from '../../../../assets';
import { ModalTermsAndConditionsCashback } from './components/ModalTermsAndConditionsCashback';

import {
  profileQuery,
} from '../../../../graphql/profile/profileQuery';

export interface CashbackInStoreViewProps {
  token?: string;
  generateToken: () => void;
  toggleModal: () => void;
  modalVisible: boolean;
  termsIsAccepted: boolean;
  acceptTermsAndConditions: () => void;
}

export const CashbackInStoreView = ({
  token,
  generateToken,
  toggleModal,
  modalVisible,
  termsIsAccepted,
  acceptTermsAndConditions,
}: CashbackInStoreViewProps) => {
  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });
  const navigation = useNavigation();

  useEffect(() => {
    getProfile().then((response) => {
      if (!response.data?.profile) navigation.navigate('Login', { comeFrom: 'Profile' });
    });
  }, []);

  return (
    <>
      <Box mx="xxs" mt="sm">
        <Box mb="nano">
          <Typography fontFamily="reservaSerifMedium" fontSize={28}>
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
            <Box alignItems="center" justifyContent="center">
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
          <Box mt="xl" mb="xxs" width="100%">
            <Button
              onPress={() => generateToken()}
              height={50}
              bg="preto"
              width="100%"
              disabled={!termsIsAccepted}
            >
              <Typography color="white">GERAR QR CODE</Typography>
            </Button>
          </Box>

          <ModalTermsAndConditionsCashback
            isVisible={modalVisible}
            setIsVisible={toggleModal}
            setTermAndConditions={acceptTermsAndConditions}
          />

          <Box
            borderRadius={4}
            bg="#F9F8F6"
            borderWidth={1}
            borderColor="#C7C3B7"
            flexDirection="row"
            width="100%"
            alignItems="center"
            mb="nano"
            height={42}
          >
            <Box>
              <Checkbox
                marginLeft={13}
                checked={termsIsAccepted}
                color="preto"
                onCheck={acceptTermsAndConditions}
              />
            </Box>
            <Box>
              <Button onPress={toggleModal}>
                <Typography
                  fontFamily="nunitoRegular"
                  fontSize={14}
                  color="preto"
                >
                  {'Li e aceito os '}
                  <Typography style={{ textDecorationLine: 'underline' }}>
                    termos e condições de uso.
                  </Typography>
                </Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
