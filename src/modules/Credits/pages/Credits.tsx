import { useLazyQuery } from '@apollo/client';
import { Box, Button, Divider, Icon, Typography } from '@danilomsou/reserva-ui';
import remoteConfig from '@react-native-firebase/remote-config';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  profileQuery,
  ProfileVars
} from '../../../graphql/profile/profileQuery';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { cashbackService } from '../../../services/cashbackService';
import {
  StorageService,
  StorageServiceKeys
} from '../../../shared/services/StorageService';
import { PriceCustom } from '../../Checkout/components/PriceCustom';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';



type Props = StackScreenProps<RootStackParamList, 'Credits'>;

export const Credits: React.FC<Props> = ({ navigation, route }) => {
  const [loadingCredit, setLoadingCredit] = useState(false);
  const [isAcceptedConditions, setIsAcceptConditions] = useState(false);
  const [cashbackInStore, setCashbackInStore] = useState(false);
  const [profile, setProfile] = useState<ProfileVars>();
  const [credit, setCredit] = useState(0);

  const [{
    data,
    loading,
  }, setProfileData] = useState({
    loading: true,
    data: {} as any
  })

  const [getProfile] = useLazyQuery(profileQuery);

  useEffect(() => {
    getProfile().then(response => setProfileData({
      loading: false,
      data: response.data
    }))
  }, [])

  useEffect(() => {
    StorageService.getItem<ProfileVars>({
      key: StorageServiceKeys.PROFILE,
      isJSON: true,
    }).then((value) => {
      setProfile(value);
    });
  }, [data]);

  useEffect(() => {
    remoteConfig().fetchAndActivate();
    const response = remoteConfig().getValue('cashback_in_store');

    setCashbackInStore(response.asBoolean());
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
    </SafeAreaView>
  );
};
