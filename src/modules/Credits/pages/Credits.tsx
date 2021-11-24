import React, { useState, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import remoteConfig from '@react-native-firebase/remote-config';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Divider, Typography, Icon, Button } from 'reserva-ui';

import {
  profileQuery,
  ProfileVars,
} from '../../../graphql/profile/profileQuery';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { cashbackService } from '../../../services/cashbackService';
import { StorageService } from '../../../services/storageService';
import { FetchCredit } from '../../../services/unicoService';
import { PriceCustom } from '../../Checkout/components/PriceCustom';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

type Props = StackScreenProps<RootStackParamList, 'Credits'>;

export const Credits: React.FC<Props> = ({ navigation, route }) => {
  const { loading, error, data, refetch } = useQuery(profileQuery);
  const [loadingCredit, setLoadingCredit] = useState(false);
  const [isAcceptedConditions, setIsAcceptConditions] = useState(false);
  const [cashbackInStore, setCashbackInStore] = useState(false);
  const [profile, setProfile] = useState<ProfileVars>();
  const [credit, setCredit] = useState(0);

  useEffect(() => {
    StorageService.getJSON(StorageService.storageKeys.PROFILE).then((value) => {
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
        </Box>
      </Box>
    </SafeAreaView>
  );
};
