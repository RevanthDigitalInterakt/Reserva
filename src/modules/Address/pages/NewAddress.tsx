import { useLazyQuery, useMutation } from '@apollo/client';
import { Box, Button, TextField, Typography } from '@danilomsou/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleProp,
  TextStyle,
} from 'react-native';
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from 'react-native-masked-text';
import { useAuth } from '../../../context/AuthContext';
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
  addressType?: string;
  country?: string;
}
type Props = StackScreenProps<RootStackParamList, 'NewAddress'>;

export const NewAddress: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const { edit, editAddress, isCheckout, onAddAddressCallBack, receiveHome } =
    route?.params;
  const [addressId, setAddressId] = useState(editAddress?.id);
  const [toggleActivated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveAddress] = useMutation(saveAddressMutation);
  const [addressUpdate] = useMutation(updateAddress);
  const { orderForm, orderform, addShippingData, identifyCustomer } = useCart();
  const [getProfile, {}] = useLazyQuery(profileQuery);

  const [{ profileData, loadingProfile }, setProfileData] = useState({
    profileData: null,
    loadingProfile: true,
  });

  const [profile, setProfile] = useState<ProfileVars>();
  const [initialValues, setInitialValues] = useState<IAddress>({
    postalCode: editAddress?.postalCode || '',
    state: editAddress?.state || '',
    city: editAddress?.city || '',
    number: editAddress?.number || '',
    complement: editAddress?.complement || '',
    street: editAddress?.street || '',
    neighborhood: editAddress?.neighborhood || '',
    receiverName: editAddress?.receiverName || '',
    addressType: 'residential',
    country: 'BRA',
  });
  const [buttonEnabled, setButtonEnabled] = useState(false);
  const [validateNeighborhood, setValidateNeighborhood] = useState(false);
  const [validateStreet, setValidateStreet] = useState(false);
  const [validateReceiverName, setValidateReceiverName] = useState(true);

  // State labels
  const [labelNeighborhood, setLabelNeighborhood] = useState(null);
  const [labelPostalCode, setLabelPostalCode] = useState(null);
  const [labelReceiverName, setLabelReceiverName] = useState(null);
  const [labelState, setLabelState] = useState(null);
  const [labelCity, setLabelCity] = useState(null);
  const [labelNumber, setLabelNumber] = useState(null);
  const [labelStreet, setLabelStreet] = useState(null);
  const [labelComplement, setLabelComplement] = useState(null);

  const [validateForm, setValidateForm] = useState(false);
  const [validateNumber, setValidateNumber] = useState(true);

  const { email } = useAuth();

  const handleSaveAddress = async () => {
    setLoading(true);

    edit
      ? await addressUpdate({
          variables: {
            id: editAddress?.id,
            fields: {
              ...initialValues,
              // receiverName: `${profile?.firstName} ${profile?.lastName}`,
            },
          },
        })
      : await saveAddress({
          variables: {
            fields: {
              ...initialValues,
            },
          },
        });

    onAddAddressCallBack && onAddAddressCallBack();
    await identifyCustomer(email);
    orderform();
    setLoading(false);
    navigation.goBack();
  };

  const handlePaymentMethodScreen = async () => {
    setLoading(true);

    const receiverName = initialValues?.receiverName
      ? initialValues.receiverName
      : `${profile?.firstName} ${profile?.lastName}`;

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
          receiverName: receiverName,
        },
      },
    });

    await identifyCustomer(email).then(() => setLoading(false));

    if (isAddressSaved) {
      onAddAddressCallBack && onAddAddressCallBack();
      navigation.goBack();
    }
  };

  const cepHandler = async (postalCode: string) => {
    setLoading(true);

    if (initialValues?.receiverName.length <= 0) {
      setValidateReceiverName(false);
    }

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

      if (!postalCode) {
        setLabelPostalCode(null);
      } else {
        setLabelPostalCode('CEP');
      }

      if (!street) {
        setValidateStreet(true);
        setLabelStreet(null);
      } else {
        setValidateStreet(false);
        setLabelStreet('Endereço');
      }

      if (!neighborhood) {
        setValidateNeighborhood(true);
        setLabelNeighborhood(null);
      } else {
        setValidateNeighborhood(false);
        setLabelNeighborhood('Bairro');
      }

      if (!city) {
        setLabelCity(null);
      } else {
        setLabelCity('Cidade');
      }

      if (!state) {
        setLabelState(null);
      } else {
        setLabelState('Estado');
      }

      if (postalCode && street && neighborhood && city && state) {
        setValidateForm(true);
      }

      setValidateNumber(false);

      setLoading(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    getProfile().then((response) => {
      setProfileData({
        profileData: response.data,
        loadingProfile: false,
      });
    });
  }, []);

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
      street,
      neighborhood,
      receiverName,
    } = initialValues;

    if (
      postalCode.length > 0 &&
      state?.length > 0 &&
      city?.length > 0 &&
      number.length > 0 &&
      street?.length > 0 &&
      neighborhood?.length > 0 &&
      receiverName?.length > 0
    ) {
      setButtonEnabled(true);
    } else {
      setButtonEnabled(false);
    }
  }, [initialValues]);

  useEffect(() => {
    if (edit && !!editAddress) {
      setAddressId(editAddress.id);
      setInitialValues({
        postalCode: editAddress.postalCode,
        state: editAddress.state,
        city: editAddress.city,
        number: editAddress.number,
        complement: editAddress.complement,
        street: editAddress.street,
        neighborhood: editAddress.neighborhood,
        receiverName: editAddress.receiverName,
      });
      setLabelNeighborhood('Bairro');
      setLabelCity('Cidade');
      setLabelComplement('Complemento');
      setLabelNumber('Número');
      setLabelState('Estado');
      setLabelPostalCode('CEP');
      setLabelStreet('Endereço');
      setLabelReceiverName('Nome do destinatário');
    }
  }, [edit]);

  const handlerValidationReceiverName = (text: string) => {
    const [firstName, ...rest] = text.trim().split(' ');
    const lastName = rest.join(' ');
    if (
      text.match(
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi
      ) &&
      !lastName.match(
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú](\s{1,}){2,19}\b/gi
      )
    ) {
      setLabelReceiverName('Nome do destinatário');
      setValidateReceiverName(true);
    } else {
      setLabelReceiverName(null);
      setValidateReceiverName(false);
    }
  };

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
            <Box pt="xxxs">
              <Box paddingX="xxxs" justifyContent="flex-start">
                <Box alignSelf="flex-start" mb="nano">
                  {edit ? (
                    <Typography
                      fontFamily="reservaSerifRegular"
                      fontSize={28}
                      lineHeight={32}
                    >
                      Alterar endereço
                    </Typography>
                  ) : (
                    <Typography
                      fontFamily="reservaSerifRegular"
                      fontSize={28}
                      lineHeight={32}
                    >
                      Adicionar endereço
                    </Typography>
                  )}
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
                  label={labelReceiverName}
                  placeholder="Nome do destinatário"
                  value={initialValues.receiverName}
                  onChangeText={(text) => {
                    setInitialValues({ ...initialValues, receiverName: text });

                    if (!text) {
                      setLabelReceiverName(null);
                      setValidateReceiverName(false);
                    } else {
                      handlerValidationReceiverName(text.trim());
                    }
                  }}
                  touched={!validateReceiverName}
                  error="Por favor, insira o nome completo do destinatário"
                />

                <InputOption
                  label={labelPostalCode}
                  placeholder="CEP"
                  maskType="zip-code"
                  value={initialValues.postalCode}
                  onChangeText={(text) => {
                    setInitialValues({ ...initialValues, postalCode: text });
                    cepHandler(text.replace('-', ''));

                    if (!text) {
                      setLabelPostalCode(null);
                    } else {
                      setLabelPostalCode('CEP');
                    }
                  }}
                />

                {/* {initialValues.street ? <Typography>teste</Typography> : null} */}
                <InputOption
                  label={labelStreet}
                  placeholder="Endereço"
                  value={initialValues.street}
                  // editable={initialValues.street.length <= 0}
                  onChangeText={(text) => {
                    setInitialValues({ ...initialValues, street: text });

                    if (!text) {
                      setValidateStreet(true);
                      setLabelStreet(null);
                    } else {
                      setValidateStreet(false);
                      setLabelStreet('Endereço');
                    }
                  }}
                  touched={validateStreet}
                  error="Por favor, insira o endereço."
                />

                <InputOption
                  label={labelNeighborhood}
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
                      setLabelNeighborhood(null);
                    } else {
                      setValidateNeighborhood(false);
                      setLabelNeighborhood('Bairro');
                    }
                  }}
                  touched={validateNeighborhood}
                  error="Por favor, insira o bairro."
                />

                <Box flexDirection="row" justifyContent="space-between">
                  <Box flex={1} marginRight="micro">
                    <InputOption
                      label={labelNumber}
                      placeholder="Número"
                      value={initialValues.number}
                      onChangeText={(text) => {
                        setInitialValues({ ...initialValues, number: text });

                        if (!text) {
                          setLabelNumber(null);
                          setValidateForm(false);
                          setValidateNumber(false);
                        } else {
                          setLabelNumber('Número');
                          setValidateForm(true);
                          setValidateNumber(true);
                        }
                      }}
                      touched={!validateNumber}
                      error="Por favor, insira o número."
                    />
                  </Box>

                  <Box flex={1}>
                    <InputOption
                      label={labelComplement}
                      placeholder="Complemento"
                      value={initialValues.complement}
                      onChangeText={(text) => {
                        setInitialValues({
                          ...initialValues,
                          complement: text,
                        });
                        if (!text) {
                          setLabelComplement(null);
                        } else {
                          setLabelComplement('Complemento');
                        }
                      }}
                    />
                  </Box>
                </Box>

                <Box flex={1}>
                  <InputOption
                    label={labelCity}
                    placeholder="Cidade"
                    value={initialValues.city}
                    // editable={initialValues.state.length <= 0}
                    onChangeText={(text) => {
                      setInitialValues({ ...initialValues, city: text });
                      if (!text) {
                        setLabelCity(null);
                      } else {
                        setLabelCity('Cidade');
                      }
                    }}
                    editable={false}
                  />
                </Box>

                <Box flex={1}>
                  <InputOption
                    label={labelState}
                    placeholder="Estado"
                    value={initialValues.state}
                    // editable={initialValues.state.length <= 0}
                    onChangeText={(text) => {
                      setInitialValues({ ...initialValues, state: text });
                      if (!text) {
                        setLabelState(null);
                      } else {
                        setLabelState('Estado');
                      }
                    }}
                    editable={false}
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

                {edit && !receiveHome ? (
                  <Button
                    disabled={loading || !buttonEnabled}
                    // width="240px"
                    mt="xxs"
                    onPress={handleSaveAddress}
                    title="SALVAR ALTERAÇÕES"
                    variant="primarioEstreitoOutline"
                  />
                ) : null}
              </Box>

              {edit && receiveHome ? (
                <Button
                  mt="xxs"
                  disabled={loading || !buttonEnabled}
                  // width="240px"
                  onPress={handleSaveAddress}
                  title="SALVAR"
                  variant="primarioEstreito"
                  inline
                  fontFamily="nunitoRegular"
                  fontSize={13}
                  lineHeight={24}
                  letterSpacing={1.6}
                />
              ) : null}

              {!edit && (
                <Button
                  mt="xxs"
                  onPress={
                    !isCheckout ? handleSaveAddress : handlePaymentMethodScreen
                  }
                  title={receiveHome ? 'IR PARA ENTREGA' : 'INCLUIR ENDEREÇO'}
                  variant="primarioEstreito"
                  inline
                  disabled={
                    !validateForm ||
                    !validateNumber ||
                    !validateReceiverName ||
                    loading
                  }
                />
              )}
            </Box>
          </KeyboardAvoidingView>
        </ScrollView>
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
