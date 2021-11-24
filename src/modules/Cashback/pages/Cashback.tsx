/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';

import { StackScreenProps } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';
import { TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Typography, Icon } from 'reserva-ui';
import { loadingSpinner } from 'reserva-ui/src/assets/animations';

import { images } from '../../../assets';
import { ProfileVars } from '../../../graphql/profile/profileQuery';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { cashbackService } from '../../../services/cashbackService';
import {
  StorageService,
  StorageServiceKeys,
} from '../../../services/storageService';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { ModalSuccess } from '../components/ModalSuccess';
import { ModalTermsAndConditions } from '../components/ModalTermsAndConditions';

type Props = StackScreenProps<RootStackParamList, 'Cashback'>;

type InstallationToken = {
  installationToken: string;
};

type UnionProfile = ProfileVars & InstallationToken;

export const Cashback: React.FC<Props> = ({ navigation, route }) => {
  const { isAcceptedConditions } = route.params;
  const [loading] = useState(false);
  const [qrCode, setQrCode] = useState<string>();
  const [loadingTerms, setLoadingTerms] = useState(false);
  const [loadingQrCode, setLoadingQrCode] = useState(false);
  const [installationToken, setInstallationToken] = useState<
    string | undefined
  >('');
  const [profile, setProfile] = useState<ProfileVars>();
  const [acceptConditions, setAcceptConditions] = useState(false);
  const [modalSuccessVisible, setModalSuccessVisible] = useState(false);
  const [showModalTermsAndConditions, setShowModalTermsAndConditions] =
    useState(false);

  const intervalTokenRef: { current: NodeJS.Timeout | null } = useRef(null);

  const handleAcceptLoyalty = async () => {
    if (!acceptConditions && profile) {
      setLoadingTerms(true);
      await cashbackService.acceptLoyalty(profile.document);
      setLoadingTerms(false);
      setAcceptConditions(true);
    }
  };

  useEffect(() => {
    StorageService.multiGet<UnionProfile>([
      {
        key: StorageServiceKeys.PROFILE,
        isJSON: true,
      },
      {
        key: StorageServiceKeys.INSTALLATION_TOKEN,
      },
    ]).then((values) => {
      console.log('values', values[0].value);
    });

    StorageService.getJSON(StorageService.storageKeys.PROFILE).then((value) => {
      setProfile(value);
    });
    StorageService.getItem(StorageService.storageKeys.INSTALLATION_TOKEN).then(
      (value) => {
        setInstallationToken(value);
        if (isAcceptedConditions) {
          setLoadingTerms(false);
          setAcceptConditions(true);
        }
      }
    );
  }, []);

  const generateToken = async () => {
    if (acceptConditions && installationToken && profile) {
      if (!qrCode) {
        setLoadingQrCode(true);
      }
      return cashbackService
        .getToken(profile.document, installationToken)
        .then(({ data: { result, token } }) => {
          if (result) {
            setQrCode(token);
            setLoadingQrCode(false);
          }
        });
    }
  };

  useEffect(() => { }, [profile]);

  useEffect(() => {
    generateToken();
    const intervalToken = setInterval(() => {
      generateToken();
    }, 60 * 1000);
    intervalTokenRef.current = intervalToken;

    return () => {
      clearInterval(intervalTokenRef.current as NodeJS.Timeout);
    };
  }, [acceptConditions]);

  const termsAndConditions = () => {
    handleAcceptLoyalty();
    setShowModalTermsAndConditions(false);
  };

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton
        loading={loading}
        showShadow
        backButtonPress={() => navigation.goBack()}
      />
      <ScrollView>
        <Box mx={20} mt="sm">
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
                {qrCode && (
                  <QRCode
                    value={qrCode}
                    logo={images.logoQRCode}
                    logoSize={40}
                    size={200}
                  />
                )}
                {loadingQrCode && !qrCode && (
                  <LottieView
                    source={loadingSpinner}
                    style={{
                      width: 60,
                    }}
                    autoPlay
                    loop
                  />
                )}
              </Box>
            </ImageBackground>
          </Box>

          <Box mt={20}>
            <ModalTermsAndConditions
              isVisible={showModalTermsAndConditions}
              loading={loadingTerms}
              isAccepted={acceptConditions}
              setIsVisible={() => setShowModalTermsAndConditions(false)}
              setTermAndConditions={() => termsAndConditions()}
            />
            <Box
              flexDirection="row"
              alignItems="center"
              mt="xxxs"
              justifyContent="center"
            >
              {loadingTerms ? (
                <Box mr="quarck" alignItems="center" justifyContent="center">
                  <LottieView
                    source={loadingSpinner}
                    style={{
                      width: 14,
                    }}
                    autoPlay
                    loop
                  />
                </Box>
              ) : (
                <TouchableOpacity
                  onPress={() => handleAcceptLoyalty()}
                  disabled={acceptConditions}
                >
                  <Box
                    backgroundColor={acceptConditions ? 'preto' : 'white'}
                    width={14}
                    height={14}
                    border="1px"
                    borderColor="preto"
                    borderRadius="pico"
                    mr="nano"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {acceptConditions && (
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
                    onPress={() => setShowModalTermsAndConditions(true)}
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
      </ScrollView>
      <ModalSuccess
        isVisible={modalSuccessVisible}
        setIsVisible={setModalSuccessVisible}
      />
    </SafeAreaView>
  );
};
