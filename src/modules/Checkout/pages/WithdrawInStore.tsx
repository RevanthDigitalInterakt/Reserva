import React, { useState, useEffect, useCallback } from 'react';
import { Platform, SafeAreaView, ScrollView } from 'react-native';
import {
  Typography,
  Box,
  Button,
  TextField,
  DropDown,
  OutlineInput,
  Icon,
  Picker,
} from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

import { useFocusEffect } from '@react-navigation/native';

export const WithdrawInStore = () => {
  const navigation = useNavigation();
  const [openState, setOpenState] = useState(false);
  const [opencity, setOpenCity] = useState(false);
  const [selectedValue, setSelectedValue] = useState('java');
  const [state, setState] = useState('UF');
  const [cep, setCep] = useState('');
  const [city, setCity] = useState('Cidade');
  const hairline = Platform.OS == 'android' ? 'hairline' : null;

  // limpar o state e city quando focar na tela
  useFocusEffect(
    useCallback(() => {
      setState('UF')
      setCity('Cidade')
    }, [])
  );

  const activateMapButton = useCallback((): boolean => {
    if (cep?.length && cep?.match(/^(?=.{9,})/)) {
      return true;
    }
    return false;
  }, [cep]);

  const activateContinueButton = useCallback((): boolean => {
    if (state != "UF" && city != "Cidade") {
      return true;
    }
    return false;
  }, [state, city]);

  return (
    <SafeAreaView flex={1} backgroundColor={'white'}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={'xxxs'} paddingY={'sm'}>
          <Box marginBottom={'xxs'}>
            <Typography fontFamily={'reservaSerifRegular'} fontSize={20}>
              Retirar na loja
            </Typography>
          </Box>

          <Box marginBottom="xxxs">
            <Typography variant={'tituloSessao'}>
              Digite o seu CEP para localizarmos as lojas mais próximas de você.
            </Typography>
          </Box>

          <Box flexDirection={'row'}>
            <Box flex={1} marginRight={'micro'}>
              <TextField
                maskType={'zip-code'}
                value={cep}
                onChangeText={(cep) => {
                  setCep(cep);
                }}
                placeholder={'Digite aqui o seu CEP'}
              />
            </Box>
            <Box>
              <Button
                height={60}
                disabled={!activateMapButton()}
                onPress={() => navigation.navigate('MapScreen', { geolocation: cep })}
                title="MAPA"
                variant="primarioEstreito"
              />
            </Box>
          </Box>

          {/* <Box mt="sm">
            <Typography variant={'tituloSessao'}>
              Ou selecione seu estado e cidade:
            </Typography>

            <Box flexDirection={'row'} mt={'micro'} height={40}>
              <Box flex={1}>
                <Button flexDirection="row" onPress={() => setOpenState(true)}>
                  <Box
                    borderTopWidth={'hairline'}
                    height={32}
                    borderBottomWidth={'hairline'}
                    borderLeftWidth={'hairline'}
                    borderRightWidth={'hairline'}
                    borderRadius="nano"
                    alignItems={'center'}
                    paddingLeft="nano"
                    flexDirection={'row'}
                    borderColor="preto"
                  >
                    <Typography variant="precoAntigo3">{state}</Typography>
                    <Box
                      marginLeft="xxs"
                      borderLeftWidth={'hairline'}
                      height={32}
                      width={30}
                      alignItems="center"
                      justifyContent="center"
                      borderColor="preto"
                    >
                      <Box marginTop="micro">
                        <Icon name={'ArrowDown'} size={20} />
                      </Box>
                    </Box>
                  </Box>
                </Button>
              </Box>
              <Box flex={3} marginLeft="xxs">
                <Button
                  flexDirection="row"
                  onPress={() => setOpenCity(!opencity)}
                >
                  <Box
                    flex={1}
                    borderTopWidth={'hairline'}
                    height={32}
                    borderBottomWidth={'hairline'}
                    borderLeftWidth={'hairline'}
                    borderRightWidth={'hairline'}
                    borderRadius="nano"
                    alignItems={'center'}
                    paddingLeft="nano"
                    flexDirection={'row'}
                    borderColor="preto"
                  >
                    <Typography>{city}</Typography>
                    <Box alignItems="flex-end" flex={1}>
                      <Box
                        marginLeft="md"
                        borderLeftWidth={'hairline'}
                        height={32}
                        width={30}
                        alignItems="center"
                        justifyContent="center"
                        borderColor="preto"
                      >
                        <Box marginTop="micro">
                          <Icon name={'ArrowDown'} size={20} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Button>
              </Box>
            </Box>
          </Box> */}
        </Box>
      </ScrollView>

      {/* <Button
        onPress={() => navigation.navigate('NearbyStores', { UF: state })}
        title="CONTINUAR"
        variant="primarioEstreito"
        disabled={!activateContinueButton()}
        inline
      />
      <Picker
        onAndroidBackButtonPress={() => setOpenState(false)}
        onClose={() => setOpenState(false)}
        onSelect={(item) => {
          setState(item.text);
          dispatch(loadCountyResquest(item.text))
        }}
        isVisible={openState}
        items={states ? states.map((item) => {
          return {
            text: item.sigla,
          };
        }) : []}
        onBackDropPress={() => setOpenState(false)}
        title="Selecione um Estado"
      />
      <Picker
        onAndroidBackButtonPress={() => setOpenCity(false)}
        onClose={() => setOpenCity(false)}
        onSelect={(item) => setCity(item.text)}
        isVisible={opencity}
        items={dataCounty ? dataCounty.map((item) => {
          return {
            text: item.nome,
          };
        }) : []}
        onBackDropPress={() => setOpenCity(false)}
        title="Selecione a cidade"
      /> */}
    </SafeAreaView>
  );
};
