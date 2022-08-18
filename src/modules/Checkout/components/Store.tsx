import React, { useState, useEffect, useCallback } from 'react';
import {
  Typography,
  Box,
  Button,
  Icon,
  Divider,
  Image,
} from '@danilomsou/reserva-ui';
import { images } from '../../../assets';
import Modal from 'react-native-modal';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface IStore {
  storeDetail: any[];
  data: {
    pickupDistance: number;
    pickupStoreInfo: {
      additionalInfo: string;
      address: {
        addressId: string;
        addressType: string;
        city: string;
        complement: string;
        country: string;
        geoCoordinates: number[];
        isDisposable: boolean;
        neighborhood: string;
        number: string;
        postalCode: string;
        receiverName: null;
        reference: null;
        state: string;
        street: string;
      };
      friendlyName: string;
    };
    shippingEstimate: string;
  };
  mapPermission?: boolean;
}

const Store = ({ storeDetail, data, mapPermission }: IStore) => {
  const [showModalStore, setShowModalStore] = useState(false);
  const [pickupPoints, setPickupPoints] = useState([]);
  const dayOfWeek = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];
  const navigation = useNavigation();
  return (
    <Box>
      {data ? (
        <Box mt="xxs" mb="quarck">
          <Typography
            fontFamily="reservaSerifRegular"
            fontSize={20}
            color="preto"
            lineHeight={28}
            letterSpacing={0.2}
          >
            Loja mais próxima selecionada:
          </Typography>
          <Box
            flex={1}
            backgroundColor={'white'}
            my={'micro'}
            boxShadow={Platform.OS == 'ios' ? 'bottomBarShadow' : null}
            pt="micro"
            pb="xxxs"
            px="nano"
            mt="xxxs"
            style={{
              elevation: Platform.OS == 'android' ? 10 : 0,
            }}
          >
            {pickupPoints ? (
              <Box borderColor={'backgroundMenuOpened'} mt="nano">
                <Box flexDirection="row">
                  <Box alignItems="center">
                    <Image
                      height={40}
                      source={images.localReserva}
                      resizeMode={'contain'}
                    />
                    <Box mt="quarck">
                      <Typography fontFamily="reservaSansMedium" fontSize={12}>
                        {+data.pickupDistance.toFixed(1)} km
                      </Typography>
                    </Box>
                  </Box>
                  <Box flex={1} ml="xxxs">
                    <Box mb={'quarck'}>
                      <Typography
                        fontFamily="reservaSansBold"
                        fontSize={14}
                        lineHeight={16}
                      >
                        {data.pickupStoreInfo.friendlyName}
                      </Typography>
                    </Box>
                    <Box mb="quarck">
                      <Typography
                        fontFamily="reservaSansRegular"
                        fontSize={13}
                        lineHeight={16}
                      >
                        {`${data.pickupStoreInfo.address.street}, ${data.pickupStoreInfo.address.complement}
${data.pickupStoreInfo.address.neighborhood} - ${data.pickupStoreInfo.address.city} - ${data.pickupStoreInfo.address.state}`}
                      </Typography>
                    </Box>
                    <Box flexDirection="row" mr="xxs">
                      {/* <Box mr="xxs">
                        <Typography
                          fontFamily="reservaSansMedium"
                          fontSize={12}
                          color="verdeSucesso"
                        >
                          Grátis
                        </Typography>
                      </Box> */}
                      <Typography
                        fontFamily="reservaSansMedium"
                        fontSize={12}
                        color="verdeSucesso"
                        lineHeight={16}
                      >
                        Pronto em até {data.shippingEstimate?.split('bd')[0]}{' '}
                        dias
                      </Typography>
                    </Box>
                    {storeDetail.length > 0 && (
                      <Box>
                        <Button
                          flex={1}
                          alignSelf="flex-start"
                          onPress={() => setShowModalStore(true)}
                        >
                          <Box flex={1} alignSelf="flex-start">
                            <Typography
                              style={{ textDecorationLine: 'underline' }}
                              fontFamily="nunitoRegular"
                              fontSize={12}
                              lineHeight={36}
                            >
                              Detalhes da loja
                            </Typography>
                          </Box>
                        </Button>
                      </Box>
                    )}
                  </Box>
                </Box>
              </Box>
            ) : null}
          </Box>
          <Modal
            isVisible={showModalStore}
            onBackdropPress={() => setShowModalStore(false)}
          >
            <Box bg="white" p="xxxs">
              <Box
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Box>
                  <Typography fontFamily="reservaSerifRegular" fontSize={20}>
                    Detalhes da Loja
                  </Typography>
                </Box>
                <Button
                  hitSlop={{
                    top: 30,
                    bottom: 30,
                    right: 30,
                    left: 30,
                  }}
                  onPress={() => setShowModalStore(false)}
                  variant="icone"
                  icon={<Icon size={12} name="Close" />}
                />
              </Box>
              <Box mt="xxs" mb="micro">
                <Typography fontFamily="reservaSansMedium" fontSize={14}>
                  Horários de funcionamento
                </Typography>
              </Box>
              {storeDetail &&
                storeDetail.map((item) => {
                  const [
                    hoursOpeningTime,
                    minuteOpeningTime,
                    secondsOpeningTime,
                  ] = item.OpeningTime.split(':');
                  const [
                    hoursClosingTime,
                    minuteClosingTime,
                    secondsClosingTime,
                  ] = item.ClosingTime.split(':');

                  return (
                    <>
                      <Box
                        py="nano"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Typography fontFamily="reservaSansLight" fontSize={14}>
                          {dayOfWeek[item.DayOfWeek]}
                        </Typography>
                        <Typography
                          fontFamily="reservaSansRegular"
                          fontSize={14}
                        >
                          {`${hoursOpeningTime}:${minuteOpeningTime}`} às{' '}
                          {`${hoursClosingTime}:${minuteClosingTime}`}
                        </Typography>
                      </Box>
                      <Divider variant="fullWidth" />
                    </>
                  );
                })}
            </Box>
          </Modal>
          <Box flex={1} pt="xxs">
            <Button
              onPress={() =>
                mapPermission
                  ? navigation.navigate('MapScreen', {
                      geolocation: '',
                      locationPermission: mapPermission,
                    })
                  : navigation.navigate('WithdrawInStore', { isCheckout: true })
              }
              inline
              title="VER MAIS LOJAS PRÓXIMAS"
              variant="primarioEstreitoOutline"
              fontFamily="nunitoRegular"
              fontSize={13}
              height={50}
            />
          </Box>
        </Box>
      ) : (
        <Box bg="white" alignItems="center" px="micro" mt="xxl">
          <Image source={images.noStoresFound} resizeMode={'contain'} />
          <Box mb="xxs" mt="md">
            <Typography fontFamily="reservaSerifRegular" fontSize={24}>
              Nenhuma loja encontrada
            </Typography>
          </Box>
          <Box mb="xs">
            <Typography
              textAlign="center"
              fontFamily="nunitoRegular"
              fontSize={14}
            >
              Desculpe, mas não encontramos lojas próximas a sua região.
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default Store;
