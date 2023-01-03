import React from 'react';
import {
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  Typography, Box, Image, Button,
} from '@usereservaapp/reserva-ui';
import { StackScreenProps } from '@react-navigation/stack';
import { images } from '../../../assets';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { RootStackParamList } from '../../../routes/StackNavigator';

type Props = StackScreenProps<RootStackParamList, 'NearbyStores'>;

export const NearbyStores = ({ route }: Props) => {
  const { UF } = route?.params;

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
    >
      <TopBarBackButton />

      <Box flex={1} pt="sm">
        <Box paddingX="xxxs" mb="xxs" alignSelf="flex-start">
          <Typography variant="tituloSessoes">
            Lojas próximas da sua região
          </Typography>
        </Box>

        {/* <Box paddingX={'xxxs'} bg="divider" flex={1}>
          <FlatList
            data={stores}
            renderItem={({ item }: { item: NearbyStoresProps }) => {
              return (
                <ItemStoresAddress
                  key={item.storeID}
                  storeName={item.storeName}
                  address1={`${item.address1}`}
                  address2={`${item.address2}`}
                  onPress={() => { navigation.navigate("PaymentMethodScreen") }}
                />
              );
            }}
          />
        </Box> */}
      </Box>
      {/* <Picker
        onAndroidBackButtonPress={() => setOpenState(false)}
        onClose={() => setOpenState(false)}
        onSelect={(item) => setState(item.text)}
        isVisible={openState}
        items={dataState.map((item) => {
          return {
            text: item.label,
          };
        })}
        title="Selecione um Estado"
      /> */}
    </SafeAreaView>
  );
};

interface IItemStoresAddress {
  address1: string;
  address2: string;
  storeName: string;
  onPress: () => void;
}
const ItemStoresAddress = ({
  address1,
  address2,
  storeName,
  onPress,
}: IItemStoresAddress) => (
  <Box
    boxShadow={Platform.OS === 'ios' ? 'topBarShadow' : null}
    width="100%"
    height={171}
    backgroundColor="white"
    style={{ elevation: 5 }}
    mt="xxs"
  >
    <Box
      height={160}
      borderColor="backgroundMenuOpened"
      paddingY="xxxs"
    >
      <Box mb="nano" flexDirection="row">
        <Box>
          <Image
            height={40}
            source={images.localReserva}
            resizeMode="contain"
          />
        </Box>
        <Box>
          <Box mb="quarck">
            <Typography fontFamily="reservaSerifRegular" fontSize={16}>
              {storeName}
            </Typography>
          </Box>
          <Typography fontFamily="nunitoRegular" fontSize={14}>
            {address1}
          </Typography>
          <Typography fontFamily="nunitoRegular" fontSize={14}>
            {address2}
          </Typography>
        </Box>
      </Box>

      <Button
        title="IR ATÉ A LOJA"
        onPress={onPress}
        variant="primarioEstreito"
        width="90%"
      />
    </Box>
  </Box>
);
