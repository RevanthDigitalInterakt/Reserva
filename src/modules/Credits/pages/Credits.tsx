import { useLazyQuery } from '@apollo/client';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { profileQuery, type ProfileVars } from '../../../graphql/profile/profileQuery';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { cashbackService } from '../../../services/cashbackService';
import { StorageService, StorageServiceKeys } from '../../../shared/services/StorageService';
import { PriceCustom } from '../../Checkout/components/PriceCustom';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useRemoteConfig } from '../../../hooks/useRemoteConfig';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Divider } from '../../../components/Divider/Divider';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';

type Props = StackScreenProps<RootStackParamList, 'Credits'>;

export const Credits: React.FC<Props> = ({ navigation }) => {
  const { getBoolean } = useRemoteConfig();
  const [loadingCredit, setLoadingCredit] = useState(false);
  const [isAcceptedConditions, setIsAcceptConditions] = useState(false);
  const [cashbackInStore, setCashbackInStore] = useState(false);
  const [profile, setProfile] = useState<ProfileVars>();
  const [credit, setCredit] = useState(0);

  const [{ data, loading }, setProfileData] = useState({
    loading: true,
    data: {} as any,
  });

  const [getProfile] = useLazyQuery(profileQuery);

  useEffect(() => {
    getProfile().then((response) => setProfileData({
      loading: false,
      data: response.data,
    }));
  }, []);

  useEffect(() => {
    StorageService.getItem<ProfileVars>({
      key: StorageServiceKeys.PROFILE,
      isJSON: true,
    }).then((value) => {
      setProfile(value);
    });
  }, [data]);

  useEffect(() => {
    setCashbackInStore(getBoolean('cashback_in_store'));
  }, []);

  const getCustomer = async () => {
    if (profile) {
      setLoadingCredit(true);
      return cashbackService.getCustomer(profile.document).then((response) => {
        setIsAcceptConditions(response.data.Fidelizado);
        setCredit(response.data.SaldoMonetario);
        setLoadingCredit(false);
      });
    }
  };

  useEffect(() => {
    getCustomer();
  }, [profile]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton
        loading={loading || loadingCredit}
        showShadow
        backButtonPress={() => navigation.goBack()}
      />
      <Box mx={20} mt="sm">
        <Box mb="nano">
          <Typography variant="tituloSessoes">Meus créditos</Typography>
        </Box>
        <Typography fontFamily="nunitoRegular" fontSize={14}>
          Use o crédito na sua próxima compra. Ele aparecerá automaticamente no
          ato do pagamento.
        </Typography>
        <Box mt={20}>
          <Divider variant="fullWidth" />
          <Box py={20} flexDirection="row" justifyContent="space-between">
            <Typography variant="subtituloSessoes">
              Créditos e cashback
            </Typography>
            <PriceCustom
              fontFamily="nunitoBold"
              num={credit}
              sizeDecimal={13}
              sizeInterger={20}
            />
          </Box>
          <Divider variant="fullWidth" />
          {cashbackInStore && (
            <Box flexDirection="row" mt="xxs">
              <Button
                flexDirection="row"
                onPress={() => {
                  navigation.navigate('Cashback', { isAcceptedConditions });
                }}
              >
                <>
                  <IconLegacy name="Cashback" size={20} color="preto" mr="xxxs" />

                  <Typography fontFamily="nunitoBold" fontSize={16}>
                    Cashback em Lojas
                  </Typography>
                </>
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </SafeAreaView>
  );
};
