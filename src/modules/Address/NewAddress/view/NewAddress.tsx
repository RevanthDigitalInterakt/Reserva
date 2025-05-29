import { useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { useCepLazyQuery, useProfileAddressMutation } from '../../../../base/graphql/generated';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { Picker } from '../../../../components/Picker/Picker';
import { Typography } from '../../../../components/Typography/Typography';
import type { RootStackParamList } from '../../../../routes/StackNavigator';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import InputOption from '../../Components/InputOption';
import type { IAddress } from '../../interface';

type Props = StackScreenProps<RootStackParamList, 'NewAddress'>;
type TAddressProps = Omit<IAddress, 'addressType'>;

export const NewAddress: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const edit = route?.params?.edit;
  const editAddress = route?.params?.editAddress;
  const executeCallback = route?.params?.executeCallback;
  const hasCep = route?.params?.hasCep;
  const [toggleActivated] = useState(false);

  const [profileAddress] = useProfileAddressMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });

  const [getCep] = useCepLazyQuery({
    context: { clientName: 'gateway' },
  });

  const [initialValues, setInitialValues] = useState<TAddressProps>({
    postalCode: editAddress?.postalCode || '',
    state: editAddress?.state || '',
    city: editAddress?.city || '',
    number: editAddress?.number || '',
    complement: editAddress?.complement || '',
    street: editAddress?.street || '',
    neighborhood: editAddress?.neighborhood || '',
    receiverName: editAddress?.receiverName || '',
    country: 'BRA',
  });

  const [loadingStatusBar, setLoadingStatusBar] = useState(false);
  const [loadingCity, setLoadingCity] = useState(false);

  const [isValidReceiverName, setIsValidReceiverName] = useState(true);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [isValidNeighborhood, setIsValidNeighborhood] = useState(true);
  const [isValidStreet, setIsValidStreet] = useState(true);
  const [isValidState, setIsValidState] = useState(true);
  const [isValidCity, setIsValidCity] = useState(true);

  const [disableButton, setDisableButton] = useState(true);

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [isVisibleStatePicker, setIsVisibleStatePicker] = useState(false);
  const [isVisibleCityPicker, setIsVisibleCityPicker] = useState(false);

  const handleSaveAddress = async () => {
    setLoadingStatusBar(true);

    try {
      if (edit) {
        await profileAddress({
          variables: {
            input: {
              addressId: editAddress?.id,
              ...initialValues,
            },
          },
        });
      } else {
        await profileAddress({
          variables: {
            input: {
              ...initialValues,
            },
          },
        });
      }
    } catch (error) {
      ExceptionProvider.captureException(error, "handleSaveAddress - NewAddress.tsx");
    }

    setLoadingStatusBar(false);
    navigation.goBack();
  };

  const validationReceiverName = (text: string) => {
    if (!text) {
      return;
    }

    const [, ...rest] = text?.trim()?.split(' ');
    const lastName = rest.join(' ');
    if (
      text.match(
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi,
      )
      && !lastName.match(
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú](\s{1,}){2,19}\b/gi,
      )
    ) {
      setIsValidReceiverName(true);
    } else {
      setIsValidReceiverName(false);
    }
  };

  const isValidField = {
    receiverName: (value: string) => validationReceiverName(value),
    street: (value: string) => (value ? setIsValidStreet(true) : setIsValidStreet(false)),
    state: (value: string) => (value ? setIsValidState(true) : setIsValidState(false)),
    city: (value: string) => (value ? setIsValidCity(true) : setIsValidCity(false)),
    number: (value?: string) => (value ? setIsValidNumber(true) : setIsValidNumber(false)),
    neighborhood: (value: string) => (value
      ? setIsValidNeighborhood(true) : setIsValidNeighborhood(false)),

  };

  useEffect(() => {
    if (!initialValues?.receiverName
       || !initialValues.postalCode
       || !initialValues.street
       || !initialValues.neighborhood
       || !initialValues.state
       || !initialValues.city
       || !initialValues.number
    ) {
      return setDisableButton(true);
    }

    return setDisableButton(false);
  }, [
    initialValues?.receiverName,
    initialValues.postalCode,
    initialValues.street,
    initialValues.neighborhood,
    initialValues.state,
    initialValues.city,
    initialValues.number,
  ]);

  useEffect(() => {
    fetch('https://brasilapi.com.br/api/ibge/uf/v1')
      .then(async (response) => {
        const parsedStates: any[] = await response.json();
        setStates(
          parsedStates.sort((a, b) => a.nome.localeCompare(b.nome))
            .map((state) => ({ text: state.sigla, subText: state.nome })),
        );
      });
  }, []);

  useEffect(() => {
    if (!initialValues.state) {
      return;
    }
    setLoadingCity(true);
    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${initialValues.state.toLowerCase()}`)
      .then(async (response) => {
        const parsedCities: any[] = await response.json();

        setCities(
          parsedCities.sort((a, b) => a.nome.localeCompare(b.nome))
            .map((city) => ({ text: city.nome })),
        );
      }).finally(() => {
        setLoadingCity(false);
      });
  }, [initialValues.state]);

  const cepHandler = async (postalCode: string) => {
    const isValidPostalCode = postalCode.length === 8;

    if (isValidPostalCode) {
      setLoadingStatusBar(true);

      try {
        const { data } = await getCep({
          variables: {
            input: { cep: postalCode },
          },
        });

        if (!data?.cep) {
          return;
        }

        const {
          street, neighborhood, city, state,
        } = data.cep;

        isValidField.street(street || '');
        isValidField.neighborhood(neighborhood || '');
        isValidField.city(city || '');
        isValidField.state(state || '');
        isValidField.number(initialValues.number);

        setInitialValues({
          ...initialValues,
          postalCode,
          street,
          neighborhood,
          city,
          state,
        });
      } catch (e) {
        ExceptionProvider.captureException(e, "cepHandler - NewAddress.tsx", {postalCode});
      } finally {
        setLoadingStatusBar(false);
      }
    }
  };

  useEffect(() => {
    if (hasCep) {
      setInitialValues({ ...initialValues, postalCode: hasCep });
      cepHandler(hasCep.replace('-', ''));
    }
  }, [hasCep]);

  return (
    <SafeAreaView
      style={{ backgroundColor: 'white', flex: 1, justifyContent: 'space-between' }}
    >
      <TopBarBackButton loading={loadingStatusBar} showShadow />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40, marginTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <Box paddingX="xxxs" justifyContent="flex-start">
            <Box alignSelf="flex-start" mb="nano">
              <Typography
                fontFamily="reservaSerifRegular"
                fontSize={28}
                lineHeight={32}
              >
                {edit ? 'Alterar endereço' : 'Adicionar endereço'}
              </Typography>
            </Box>
            <Box mt="micro">
              <Typography
                fontFamily="nunitoRegular"
                fontSize={15}
                lineHeight={18}
              >
                Insira o endereço do destinatário:
              </Typography>
            </Box>
            <InputOption
              label="Nome do destinatário"
              placeholder="Nome do destinatário"
              value={initialValues.receiverName}
              onChangeText={(text) => {
                setInitialValues({ ...initialValues, receiverName: text });
                isValidField.receiverName(text.trim());
              }}
              touched={!isValidReceiverName}
              error="Por favor, insira o nome completo do destinatário"
            />
            <InputOption
              label="CEP"
              placeholder="CEP"
              maskType="zip-code"
              value={initialValues.postalCode}
              onChangeText={(text) => {
                setInitialValues({ ...initialValues, postalCode: text });
                cepHandler(text.replace('-', ''));
              }}
            />
            <Button
              alignSelf="flex-start"
              marginTop="quarck"
              onPress={() => {
                navigation.navigate('ChangeRegionalization', {
                  isCepAddress: true,
                });
              }}
            >
              <Typography fontFamily="nunitoRegular" fontSize={14}>
                Não sei meu CEP
              </Typography>
            </Button>
            <InputOption
              label="Endereço"
              placeholder="Endereço"
              value={initialValues.street}
              onChangeText={(text) => {
                setInitialValues({ ...initialValues, street: text });
                isValidField.street(text.trim());
              }}
              touched={!isValidStreet}
              error="Por favor, insira o endereço."
            />
            <InputOption
              label="Bairro"
              placeholder="Bairro"
              value={initialValues.neighborhood}
              onChangeText={(text) => {
                setInitialValues({
                  ...initialValues,
                  neighborhood: text,
                });
                isValidField.neighborhood(text);
              }}
              touched={!isValidNeighborhood}
              error="Por favor, insira o bairro."
            />
            <Box flexDirection="row" justifyContent="space-between">
              <Box flex={1} marginRight="micro">
                <InputOption
                  maxLength={20}
                  label="Número"
                  placeholder="Número"
                  value={initialValues.number}
                  onChangeText={(text) => {
                    setInitialValues({ ...initialValues, number: text });
                    isValidField.number(text.trim());
                  }}
                  touched={!isValidNumber}
                  error="Por favor, insira o número."
                />
              </Box>
              <Box flex={1}>
                <InputOption
                  label="Complemento"
                  placeholder="Complemento"
                  value={initialValues.complement}
                  onChangeText={(text) => {
                    setInitialValues({
                      ...initialValues,
                      complement: text,
                    });
                  }}
                />
              </Box>
            </Box>
            <Pressable style={{ flex: 1 }} onPress={() => setIsVisibleStatePicker(true)}>
              <InputOption
                onTouchStart={() => setIsVisibleStatePicker(true)}
                editable={false}
                autoCapitalize="characters"
                maxLength={2}
                label="Estado"
                placeholder="Estado"
                value={initialValues.state}
                touched={!isValidState}
                error="Por favor, insira o Estado."
              />
              <Picker
                swipeDirection={false}
                isVisible={isVisibleStatePicker}
                onBackDropPress={() => setIsVisibleStatePicker(false)}
                onAndroidBackButtonPress={() => { }}
                onClose={() => setIsVisibleStatePicker(false)}
                onSelect={(selected) => {
                  setInitialValues({ ...initialValues, state: selected.text, city: '' });
                  isValidField.state(selected.text);
                }}
                title="Selecione o estado"
                items={states}
              />
            </Pressable>
            <Pressable style={{ flex: 1 }} onPress={() => setIsVisibleCityPicker(true)}>
              <InputOption
                isLoading={loadingCity}
                onTouchStart={
                  initialValues.state ? () => setIsVisibleCityPicker(true) : undefined
                }
                editable={false}
                label="Cidade"
                placeholder="Cidade"
                value={initialValues.city}
                touched={!isValidState}
                error="Por favor, insira a Cidade."
              />
              <Picker
                swipeDirection={false}
                isVisible={isVisibleCityPicker}
                onBackDropPress={() => setIsVisibleCityPicker(false)}
                onAndroidBackButtonPress={() => { }}
                onClose={() => setIsVisibleCityPicker(false)}
                onSelect={(selected) => {
                  setInitialValues({ ...initialValues, city: selected.text.toLowerCase() });
                  isValidField.city(selected.text.toLowerCase());
                }}
                title="Selecione a cidade"
                items={cities}
              />
            </Pressable>

            {toggleActivated && (
              <Box mb="sm">
                <InputOption placeholder="Nome do destinatário" />
                <InputOption
                  maskType="cel-phone"
                  placeholder="Telefone para contato"
                />
                <InputOption
                  height={135}
                  textAlignVertical="top"
                  placeholder="Deseja enviar algum recado junto?"
                />
              </Box>
            )}
            <Button
              mt="xxs"
              onPress={() => {
                if (!executeCallback) {
                  return handleSaveAddress();
                }

                setLoadingStatusBar(true);
                executeCallback(initialValues)
                  .then(() => {
                    setLoadingStatusBar(false);
                  })
                  .catch(err => ExceptionProvider.captureException(err, "Button - NewAddress"))
                  .finally(() => setLoadingStatusBar(false));
              }}
              title="INCLUIR ENDEREÇO"
              variant="primarioEstreito"
              inline
              disabled={loadingStatusBar || disableButton}
            />
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewAddress;
