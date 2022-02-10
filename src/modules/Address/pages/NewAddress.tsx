import React, { useEffect, useRef, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import {
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { Box, Button, TextField, theme, Typography } from 'reserva-ui';

import { useCart } from '../../../context/CartContext';
import {
  saveAddressMutation,
  updateAddress,
} from '../../../graphql/address/addressMutations';
import {
  profileQuery,
  ProfileVars,
} from '../../../graphql/profile/profileQuery';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { CepVerify } from '../../../services/vtexService';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

interface IAddress {
  postalCode: string;
  state: string;
  city: string;
  number: string;
  complement: string;
  street: string;
  neighborhood: string;
  receiverName: string;
  addressType: string;
  country: string;
}
type Props = StackScreenProps<RootStackParamList, 'NewAddress'>;

export const NewAddress: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const { edit, editAddress } = route?.params;
  const [addressId, setAddressId] = useState(edit ? editAddress.id : '');
  const [toggleActivated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveAddress] = useMutation(saveAddressMutation);
  const [addressUpdate] = useMutation(updateAddress);
  const { addShippingData } = useCart();
  const { isCheckout } = route.params;
  const {
    loading: loadingProfile,
    error,
    data: profileData,
    refetch,
  } = useQuery(profileQuery);

  const [profile, setProfile] = useState<ProfileVars>();
  const [initialValues, setInitialValues] = useState<IAddress>({
    postalCode: edit ? editAddress.postalCode : '',
    state: edit ? editAddress.state : '',
    city: edit ? editAddress.city : '',
    number: edit ? editAddress.number : '',
    complement: edit ? editAddress.complement : '',
    street: edit ? editAddress.street : '',
    neighborhood: edit ? editAddress.neighborhood : '',
    receiverName: '',
    addressType: 'residential',
    country: 'BRA',
  });
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [validateNeighborhood, setValidateNeighborhood] = useState(false);
  const [validateStreet, setValidateStreet] = useState(false);

  const handleSaveAddress = async () => {
    setLoading(true);

    edit
      ? await addressUpdate({
          variables: {
            id: addressId,
            fields: {
              ...initialValues,
              receiverName: `${profile?.firstName} ${profile?.lastName}`,
            },
          },
        })
      : await saveAddress({
          variables: {
            fields: {
              ...initialValues,
              receiverName: `${profile?.firstName} ${profile?.lastName}`,
            },
          },
        });

    setLoading(false);
    navigation.goBack();
  };

  const handlePaymentMethodScreen = async () => {
    setLoading(true);
    const receiverName = `${profile?.firstName} ${profile?.lastName}`;
    const {
      postalCode,
      state,
      number,
      neighborhood,
      complement,
      city,
      street,
    } = initialValues;

    // salvar endereço do usuário no orderform
    const isAddressSaved = await addShippingData({
      postalCode,
      state,
      number,
      receiverName,
      neighborhood,
      addressType: 'residential',
      country: 'BRA',
      complement,
      city,
      street,
    });

    // salvar endereço se estiver logado
    await saveAddress({
      variables: {
        fields: {
          ...initialValues,
          receiverName,
        },
      },
    });
    setLoading(false);
    if (isAddressSaved) {
      navigation.goBack();
    }
  };

  const cepHandler = async (postalCode: string) => {
    setLoading(true);
    const isValidPostalCode = postalCode.length == 8;

    if (isValidPostalCode) {
      const { street, neighborhood, city, state, cep, errors } =
        await CepVerify(postalCode);

      setInitialValues({
        ...initialValues,
        postalCode,
        street,
        neighborhood,
        city,
        state,
      });

      if (!neighborhood) {
        setValidateNeighborhood(true);
      } else {
        setValidateNeighborhood(false);
      }

      if (!street) {
        setValidateStreet(true);
      } else {
        setValidateStreet(false);
      }

      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (profileData) {
      const { profile } = profileData;
      if (profile) {
        const { profile } = profileData;
        setProfile(profile);
      }
    }
  }, [profileData]);

  // form validation effect
  useEffect(() => {
    const {
      postalCode,
      state,
      city,
      number,
      complement,
      street,
      neighborhood,
    } = initialValues;

    if (
      postalCode.length > 0 &&
      state?.length > 0 &&
      city?.length > 0 &&
      number.length > 0 &&
      street.length > 0 &&
      neighborhood.length > 0
    ) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [initialValues]);

  useEffect(() => {
    if (edit) {
      setAddressId(editAddress.id);
      setInitialValues({
        postalCode: editAddress.postalCode,
        state: editAddress.state,
        city: editAddress.city,
        number: editAddress.number,
        complement: editAddress.complement,
        street: editAddress.street,
        neighborhood: editAddress.neighborhood,
      });
    }
  }, [edit]);

  return (
    <>
      <SafeAreaView
        flex={1}
        style={{ justifyContent: 'space-between' }}
        backgroundColor="white"
      >
        <TopBarBackButton loading={loading} showShadow />
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          style={{ marginBottom: 30 }}
        >
          <KeyboardAvoidingView>
            <Box pb="sm">
              <Box paddingX="xxxs" justifyContent="flex-start" pt="sm">
                <Box alignSelf="flex-start" mb="nano">
                  {edit ? (
                    <Typography variant="tituloSessoes">
                      Editar endereço
                    </Typography>
                  ) : (
                    <Typography variant="tituloSessoes" fontSize={20}>
                      Adicionar endereço
                    </Typography>
                  )}
                </Box>

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

                {/* {initialValues.street ? <Typography>teste</Typography> : null} */}
                <InputOption
                  label="Endereço"
                  placeholder="Endereço"
                  value={initialValues.street}
                  // editable={initialValues.street.length <= 0}
                  onChangeText={(text) => {
                    setInitialValues({ ...initialValues, street: text });

                    if (!text) {
                      setValidateStreet(true);
                    } else {
                      setValidateStreet(false);
                    }
                  }}
                  touched={validateStreet}
                  error="Por favor, insira o endereço."
                />

                <InputOption
                  label="Bairro"
                  placeholder="Bairro"
                  value={initialValues.neighborhood}
                  // editable={initialValues.neighborhood.length <= 0}
                  onChangeText={(text) => {
                    setInitialValues({
                      ...initialValues,
                      neighborhood: text,
                    });

                    if (!text) {
                      setValidateNeighborhood(true);
                    } else {
                      setValidateNeighborhood(false);
                    }
                  }}
                  touched={validateNeighborhood}
                  error="Por favor, insira o bairro."
                />

                <Box flexDirection="row" justifyContent="space-between">
                  <Box flex={1} marginRight="micro">
                    <InputOption
                      label="Número"
                      placeholder="Número"
                      value={initialValues.number}
                      onChangeText={(text) =>
                        setInitialValues({ ...initialValues, number: text })
                      }
                    />
                  </Box>

                  <Box flex={1}>
                    <InputOption
                      label="Complemento"
                      placeholder="Complemento"
                      value={initialValues.complement}
                      onChangeText={(text) =>
                        setInitialValues({ ...initialValues, complement: text })
                      }
                    />
                  </Box>
                </Box>

                <Box flex={1}>
                  <InputOption
                    label="Cidade"
                    placeholder="Cidade"
                    value={initialValues.city}
                    // editable={initialValues.state.length <= 0}
                    onChangeText={(text) =>
                      setInitialValues({ ...initialValues, city: text })
                    }
                  />
                </Box>

                <Box flex={1}>
                  <InputOption
                    label="Estado"
                    placeholder="Estado"
                    value={initialValues.state}
                    // editable={initialValues.state.length <= 0}
                    onChangeText={(text) =>
                      setInitialValues({ ...initialValues, state: text })
                    }
                  />
                </Box>

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

                {edit && (
                  <Button
                    disabled={loading || !buttonEnabled}
                    // width="240px"
                    mt="xs"
                    onPress={handleSaveAddress}
                    title="SALVAR ALTERAÇÕES"
                    variant="primarioEstreitoOutline"
                  />
                )}
              </Box>
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
        {!edit && (
          <Button
            onPress={
              !isCheckout ? handleSaveAddress : handlePaymentMethodScreen
            }
            title="INCLUIR ENDEREÇO"
            variant="primarioEstreito"
            inline
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default NewAddress;

interface IInputOption {
  label?: string;
  placeholder?: string;
  maskType?: TextInputMaskTypeProp;
  maskOptions?: TextInputMaskOptionProp;
  value?: string;
  height?: number;
  error?: string;
  touch?: string;
  touched?: boolean;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center' | undefined;
  editable?: boolean;
  onChangeText?: (value: string) => void;
  style?: StyleProp<TextStyle>;
}
const InputOption = ({
  label,
  placeholder,
  maskType,
  maskOptions,
  value,
  height,
  error,
  touch,
  touched,
  textAlignVertical,
  onChangeText,
  editable = true,
  style,
  ...rest
}: IInputOption) => (
  <>
    <Box mt="xxxs">
      <TextField
        {...rest}
        label={label}
        textAlignVertical={textAlignVertical}
        height={height}
        maskType={maskType}
        maskOptions={maskOptions}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        editable={editable}
        style={style}
        touched={touched}
        error={error && touched ? `${error}` : null}
      />
    </Box>
  </>
);
