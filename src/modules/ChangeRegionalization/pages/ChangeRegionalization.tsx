import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import * as Yup from 'yup';
import type { StackScreenProps } from '@react-navigation/stack/lib/typescript/src/types';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TopBarBackButtonWithoutLogo } from '../../Menu/components/TopBarBackButtonWithoutLogo';
import { FormikTextInput } from '../../../components/FormikTextInput/FormikTextInput';
import { platformType } from '../../../utils/platformType';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';
import { IconLegacy } from '../../../components/IconLegacy/IconLegacy';
import { TextField } from '../../../components/TextField/TextField';
import { Picker } from '../../../components/Picker/Picker';

type Props = StackScreenProps<RootStackParamList, 'ChangeRegionalization'>;

export function ChangeRegionalization({ route }:Props) {
  const [cepInputText, setCepInputText] = useState('');
  const [isCepAddress, setIsCepAddress] = useState<boolean | undefined>(false);
  const [isCepProductDetail, setIsCepProductDetail] = useState<boolean | undefined>(false);
  const [address, setAddress] = useState<{
    uf?: string,
    city?: string,
    street?: string,
  }>();
  const navigate = useNavigation();

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [isVisibleStatePicker, setIsVisibleStatePicker] = useState(false);
  const [isVisibleCityPicker, setIsVisibleCityPicker] = useState(false);
  const scrollViewRef = React.useRef<ScrollView>(null);

  const cepBlackList = [
    '00000000',
    '11111111',
    '22222222',
    '33333333',
    '44444444',
    '55555555',
    '66666666',
    '77777777',
    '88888888',
    '99999999',
  ];

  useEffect(() => {
    if (route) {
      if (route?.params?.isCepAddress || route?.params?.isCepProductDetail) {
        const { isCepAddress, isCepProductDetail } = route?.params;
        setIsCepAddress(isCepAddress);
        setIsCepProductDetail(isCepProductDetail);
      }
    }
  }, [route]);

  const [formState, setFormState] = useState({
    cep: '',
  });

  const formRef = useRef<any>(null);

  const validation = Yup.object().shape({
    cep: Yup.string().matches(/[0-9]{5}-[\d]{3}/g, { message: 'Insira um Cep valido' }).required('CEP é obrigatório').test(
      'black-list',
      'Insira um Cep valido',
      (val) => {
        if (val) {
          const parsedCep = val.replace(/(-)|(\.)/g, '');
          return !cepBlackList.includes(parsedCep);
        }
        return true;
      },
    ),
  });

  const handleSubmit = () => {
    formRef.current.submitForm();
  };

  useFocusEffect(
    useCallback(() => {
      formRef.current.resetForm();
    }, [formRef]),
  );

  const fetchCepInfo = async (cep: string) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    return response.json();
  };

  const fetchAddressInfo = async () => {
    const response = await fetch(`https://viacep.com.br/ws/${address?.uf}/${address?.city?.replace(/\s/g, '%20')}/${address?.street?.replace(/\s/g, '%20')}/json/`);
    return response.json();
  };

  useEffect(() => {
    fetch('https://brasilapi.com.br/api/ibge/uf/v1')
      .then(async (response) => {
        const parsedStates: any[] = await response.json();
        setStates(
          parsedStates.sort(
            (a, b) => a.nome.localeCompare(b.nome),
          ).map((state) => ({ text: state.sigla, subText: state.nome })),
        );
      });
  }, []);

  useEffect(() => {
    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${address?.uf}`)
      .then(async (response) => {
        const parsedCities: any[] = await response.json();

        setCities(
          parsedCities.sort(
            (a, b) => a.nome.localeCompare(b.nome),
          ).map((city) => ({ text: city.nome })),
        );
      });
  }, [address?.uf]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
      <TopBarBackButtonWithoutLogo
        loading={false}
        backButtonPress={() => {
          navigate.goBack();
        }}
      />
      <ScrollView
        ref={scrollViewRef}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          enableAutomaticScroll={(Platform.OS === platformType.IOS)}
        >
          <Box flex={1}>
            <Formik
              innerRef={formRef}
              initialValues={formState}
              validationSchema={validation}
              validateOnBlur
              validateOnChange
              onSubmit={
                async (values) => {
                  const data = await fetchCepInfo(values.cep);
                  navigate.navigate('CEPList', {
                    list: [data],
                    searchTerm: cepInputText,
                    isCepAddress: isCepAddress || false,
                    isCepProductDetail: isCepProductDetail || false,
                  });
                }
              }
            >
              {({ values }) => (
                <Box
                  paddingX={34}
                  paddingTop={26}
                  backgroundColor="white"
                >
                  <Typography
                    fontFamily="reservaSerifBold"
                    fontSize={26}
                  >
                    Usar meu CEP
                  </Typography>
                  <Typography
                    fontFamily="reservaSansLight"
                    fontSize={18}
                    style={{
                      marginTop: 29,
                      marginBottom: 12,
                    }}
                  >
                    Digite seu CEP
                  </Typography>
                  <FormikTextInput
                    field="cep"
                    maskType="zip-code"
                    placeholder="Digite seu CEP"
                    keyboardType="number-pad"
                    maskOptions={{
                      mask: '99999-999',
                    }}
                  />

                  <Button
                    disabled={values.cep.length < 9}
                    marginTop={40}
                    width="100%"
                    title="PESQUISAR"
                    onPress={() => {
                      handleSubmit();
                    }}
                    variant="primarioEstreito"
                  />
                </Box>
              )}
            </Formik>
            <Box
              paddingX={34}
              paddingTop={26}
              backgroundColor="white"
            >
              <Typography
                fontFamily="reservaSerifBold"
                fontSize={26}
              >
                Descobrir meu CEP
              </Typography>
              <Typography
                fontFamily="reservaSansLight"
                fontSize={18}
                style={{
                  marginTop: 29,
                  marginBottom: 12,
                }}
              >
                Selecione o estado e cidade
              </Typography>
              <Box
                flexDirection="row"
                flexGrow={1}
              >
                <TouchableOpacity
                  onPress={() => setIsVisibleStatePicker(true)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    height: 60,
                    width: 99,
                    borderWidth: 1,
                    borderColor: '#000',
                  }}
                >
                  <Box
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    padding={2}
                    flexGrow={1}
                  >
                    <Typography
                      fontFamily="reservaSansLight"
                      fontSize={20}
                      textAlign="center"
                    >
                      {address?.uf ? address.uf : 'UF'}
                    </Typography>
                  </Box>
                  <Box
                    height="100%"
                    justifyContent="center"
                    alignItems="center"
                    padding={7}
                  >
                    <Box
                      marginTop={11}
                    >
                      <IconLegacy
                        name="ArrowDown"
                        size={22}
                        color="preto"
                      />
                    </Box>
                  </Box>
                </TouchableOpacity>
                <Box
                  flexGrow={1}
                >
                  <TouchableOpacity
                    disabled={!address?.uf && cities.length == 0}
                    onPress={() => setIsVisibleCityPicker(true)}
                    style={{
                      flexDirection: 'row',
                      height: 60,
                      width: '100%',
                      marginLeft: 9,
                      borderWidth: 1,
                      borderColor: '#000',
                    }}
                  >
                    <Box
                      height="100%"
                      flexGrow={1}
                      justifyContent="center"
                      alignItems="center"
                      padding={2}
                      flexGrow={1}
                      flex={1}
                    >
                      <Typography
                        fontFamily="reservaSansLight"
                        fontSize={20}
                        textAlign="center"
                      >
                        {address?.city ? address.city : 'Selecione a cidade...'}
                      </Typography>
                    </Box>
                    <Box
                      height="100%"
                      justifyContent="center"
                      alignItems="center"
                      padding={7}
                    >
                      <Box
                        marginTop={11}
                      >
                        <IconLegacy
                          name="ArrowDown"
                          size={22}
                          color="preto"
                        />
                      </Box>
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
              <Typography
                fontFamily="reservaSansLight"
                fontSize={18}
                style={{
                  marginTop: 29,
                  marginBottom: 12,
                }}
              >
                Digite o nome da rua
              </Typography>
              <TextField
                onFocus={(event) => (Platform.OS === platformType.ANDROID
                  ? scrollViewRef.current?.scrollToEnd()
                  : null)}
                value={address?.street}
                onChangeText={(text) => setAddress({ ...address, street: text })}
                placeholder="Rua da Luz"
              />
              <Typography
                fontFamily="reservaSansLight"
                fontSize={15}
                style={{
                  marginTop: 14,
                }}
              >
                Não utilize número de casa, apartamento, lote, prédio
                ou abreviatura.
              </Typography>
              <Button
                marginTop={40}
                marginBottom={40}
                width="100%"
                title="BUSCAR"
                disabled={!(address?.street && address?.city && address?.uf)}
                onPress={() => {
                  fetchAddressInfo().then((data) => {
                    navigate.navigate('CEPList', {
                      list: data,
                      searchTerm: `${address?.street}, ${address?.city} - ${address?.uf}`,
                      isCepAddress: isCepAddress || false,
                      isCepProductDetail: isCepProductDetail || false,
                    });
                  });
                }}
                variant="primarioEstreito"
              />
              <Picker
                swipeDirection={false}
                isVisible={isVisibleStatePicker}
                onBackDropPress={() => setIsVisibleStatePicker(false)}
                onAndroidBackButtonPress={() => { }}
                onClose={() => setIsVisibleStatePicker(false)}
                onSelect={(selected) => {
                  setAddress({
                    uf: selected.text,
                  });
                }}
                title="Selecione o estado"
                items={states}
              />
              <Picker
                swipeDirection={false}
                isVisible={isVisibleCityPicker}
                onBackDropPress={() => setIsVisibleCityPicker(false)}
                onAndroidBackButtonPress={() => { }}
                onClose={() => setIsVisibleCityPicker(false)}
                onSelect={(selected) => {
                  setAddress({
                    ...address,
                    city: selected.text,
                  });
                }}
                title="Selecione a cidade"
                items={cities}
              />
            </Box>
          </Box>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
