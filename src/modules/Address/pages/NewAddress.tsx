import React, { useRef, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { Typography, TextField, Box, Button, Toggle } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import {
  TextInputMaskTypeProp,
  TextInputMaskOptionProp,
} from 'react-native-masked-text';
import { loadAddress, createAddress, createDefaultAddress, updateAddress } from "../../../store/ducks/address/actions";
import { ApplicationState } from "../../../store";
import { useFormikContext } from 'formik';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface IAdress {
  postalCode: string;
  state: string;
  city: string;
  number: string;
  complement: string;
  district: string;
  street: string;
  recipientName?: string;
  phoneNumber?: string;
  sendMessage?: string;
}
type Props = StackScreenProps<RootStackParamList, 'NewAddress'>;

export const NewAddress: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const { edit, editAddress, } = route?.params;
  const [addressId, setAddressId] = React.useState(edit ? editAddress.id : '');
  const [toggleActivated, setToggleActivated] = React.useState(false);

  const { isCheckout } = route.params;
  const {
    address: { data: addresses, loading, error, defaultAddress },

  } = useSelector((state: ApplicationState) => state);

  const [initialValues, setInitialValues] = useState<IAdress>({
    postalCode: edit ? editAddress.postalCode : '11111',
    state: edit ? editAddress.state : 'ES',
    city: edit ? editAddress.city : 'VITORIA',
    number: edit ? editAddress.numberAndComplement[0] : '370',
    complement: edit ? editAddress.numberAndComplement[1] : 'Em frente a oficina',
    district: edit ? editAddress.district : 'Vista da Penha',
    street: edit ? editAddress.street : 'Rua Mercurio',
    recipientName: edit ? editAddress.firstName : '',
    phoneNumber: edit ? editAddress.phoneNumber : '',
    sendMessage: edit ? editAddress.jobTitle : '',
  })
  const validation = Yup.object().shape({
    postalCode: Yup.string().required('Informe um CEP')
      .matches(/^(?=.{9,})/, { message: 'CEP não é valido' }),
    state: Yup.string().required('Informe um Estado'),
    city: Yup.string().required('Informe uma Cidade'),
    number: Yup.string().required('Informe um número'),
    district: Yup.string().required('Informe um bairro'),
    street: Yup.string().required('Informe um endereço'),
    recipientName: Yup.string().when("toggleActivated", {
      is: () => {
        return toggleActivated;
      },
      then: Yup.string().required("Informe um nome")
    }),
    phoneNumber: Yup.string().when("toggleActivated", {
      is: () => {
        return toggleActivated;
      },
      then: Yup.string().required("Informe um telefone")
    }),

  })

  useEffect(() => {
    if (edit) {
      console.log('editAddress', editAddress)
      setAddressId(editAddress.id);
      setInitialValues({
        postalCode: editAddress.postalCode,
        state: editAddress.state,
        city: editAddress.city,
        number: editAddress.numberAndComplement[0],
        complement: editAddress.numberAndComplement[1],
        district: editAddress.district,
        street: editAddress.street,
        recipientName: editAddress.firstName,
        phoneNumber: editAddress.phoneNumber,
        sendMessage: editAddress.jobTitle,
      });
    }
  }, [edit])

  const addNewAddress = (
    city: string,
    complement: string,
    district: string,
    number: string,
    postalCode: string,
    state: string,
    street: string,
    phoneNumber: string,
    recipientName: string,
    sendMessage: string
  ) => {
    if (edit) {
      dispatch(updateAddress(
        {
          address: {
            country: "BR",
            address3: district,
            address2: `${number}|${complement}`,
            city: city,
            address1: street,
            postalCode: postalCode,
            state: state,
            firstName: recipientName,
            phoneNumber: phoneNumber,
            jobTitle: sendMessage,
            id: addressId
          },
        }
      ))
    } else {
      dispatch(createAddress(
        {
          address: {
            country: "BR",
            address3: district,
            address2: `${number}|${complement}`,
            city: city,
            address1: street,
            postalCode: postalCode,
            state: state,
            firstName: recipientName,
            phoneNumber: phoneNumber,
            jobTitle: sendMessage,
          },
        }))
    }
  }

  return (
    <>
      <SafeAreaView
        flex={1}
        style={{ justifyContent: 'space-between' }}
        backgroundColor="white"
      >
        <TopBarBackButton
          loading={loading}
          showShadow />
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <Box pb="sm">
            <Box paddingX={'xxxs'} justifyContent="flex-start" pt={'sm'}>
              <Box alignSelf={'flex-start'} mb={'nano'}>
                {edit ? (
                  <Typography variant="tituloSessoes">
                    Editar endereço
                  </Typography>
                ) : (
                  <Typography variant="tituloSessoes">Entrega</Typography>
                )}
              </Box>
              <Box>
                <Typography variant={'tituloSessao'}>
                  Receba em casa ou no endereço de sua preferência
                </Typography>
              </Box>
              <Formik
                initialValues={initialValues}
                validationSchema={validation}
                onSubmit={(values) => {
                  const { city, complement, district, number, postalCode, state, street, phoneNumber, recipientName, sendMessage } = values;
                  addNewAddress(city, complement, district, number, postalCode, state, street, phoneNumber, recipientName, sendMessage)
                  console.log('sucesso', values)
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <>
                    <InputOption
                      placeholder={'Digite seu CEP'}
                      maskType={'zip-code'}
                      value={values.postalCode}
                      onChangeText={handleChange('postalCode')}
                      touched={touched.postalCode}
                      error={errors.postalCode && touched.postalCode ? `${errors.postalCode}` : null}
                    />

                    <Box flexDirection={'row'} justifyContent="space-between">
                      <Box flex={1} marginRight={'micro'}>
                        <InputOption
                          placeholder={'Digite seu estado'}
                          value={values.state}
                          onChangeText={handleChange('state')}
                          touched={touched.state}
                          error={errors.state && touched.state ? `${errors.state}` : null}
                        />
                      </Box>

                      <Box flex={1}>
                        <InputOption
                          placeholder={'Digite sua cidade'}
                          value={values.city}
                          onChangeText={handleChange('city')}
                          touched={touched.city}
                          error={errors.city && touched.city ? `${errors.city}` : null}
                        />
                      </Box>
                    </Box>

                    <InputOption
                      placeholder={'Endereço'}
                      value={values.street}
                      onChangeText={handleChange('street')}
                      touched={touched.street}
                      error={errors.street && touched.street ? `${errors.street}` : null}
                    />

                    <Box flexDirection={'row'} justifyContent="space-between">
                      <Box flex={1} marginRight={'micro'}>
                        <InputOption
                          placeholder={'Digite seu bairro'}
                          value={values.district}
                          onChangeText={handleChange('district')}
                          touched={touched.district}
                          error={errors.district && touched.district ? `${errors.district}` : null}
                        />
                      </Box>

                      <Box flex={1}>
                        <InputOption placeholder={'Número'}
                          value={values.number}
                          onChangeText={handleChange('number')}
                          touched={touched.number}
                          error={errors.number && touched.number ? `${errors.number}` : null}
                        />
                      </Box>
                    </Box>

                    <InputOption
                      placeholder={'Complemento'}
                      value={values.complement}
                      onChangeText={handleChange('complement')}
                      touched={touched.complement}
                      error={errors.complement && touched.complement ? `${errors.complement}` : null}
                    />

                    <Box mt="xs" mb="xxxs">
                      <Toggle
                        label="A entrega é para presente"
                        color="preto"
                        thumbColor="vermelhoAlerta"
                        value={toggleActivated}
                        onValueChange={() => {
                          setToggleActivated(!toggleActivated);
                          scrollViewRef.current &&
                            scrollViewRef.current.scrollToEnd({ animated: true });
                        }}
                      />
                    </Box>

                    {toggleActivated && (
                      <Box mb={'sm'}>
                        <InputOption
                          placeholder={'Nome do destinatário'}
                          value={values.recipientName}
                          onChangeText={handleChange('recipientName')}
                          touched={touched.recipientName}
                          error={errors.recipientName && touched.recipientName ? `${errors.recipientName}` : null}
                        />

                        <InputOption
                          maskType={'cel-phone'}
                          placeholder={'Telefone para contato'}
                          value={values.phoneNumber}
                          onChangeText={handleChange('phoneNumber')}
                          touched={touched.phoneNumber}
                          error={errors.phoneNumber && touched.phoneNumber ? `${errors.phoneNumber}` : null}
                        />

                        <InputOption
                          height={135}
                          textAlignVertical={'top'}
                          placeholder={'Deseja enviar algum recado junto?'}
                          value={values.sendMessage}
                          onChangeText={handleChange('sendMessage')}
                          touched={touched.sendMessage}
                          error={errors.sendMessage && touched.sendMessage ? `${errors.sendMessage}` : null}
                        />
                      </Box>
                    )}

                    {!isCheckout && (
                      <Button
                        disabled={loading}
                        width="200px"
                        mt={'xs'}
                        onPress={handleSubmit}
                        title={'SALVAR ALTERAÇÕES'}
                        variant="primarioEstreitoOutline"
                      />
                    )}
                  </>
                )}
              </Formik>
            </Box>
          </Box>
        </ScrollView>
        {isCheckout && (
          <Button
            onPress={() => navigation.navigate('PaymentMethodScreen')}
            title="FORMA DE PAGAMENTO"
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
  error?: any;
  touched?: any;
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center' | undefined;
  onChangeText?: (value: string) => void;
}
const InputOption = ({
  label,
  placeholder,
  maskType,
  maskOptions,
  value,
  height,
  error,
  touched,
  textAlignVertical,
  onChangeText,
}: IInputOption) => {
  return (
    <>
      <Box mt={'xxxs'}>
        <TextField
          // label={"Nome do titular"}
          textAlignVertical={textAlignVertical}
          height={height}
          maskType={maskType}
          maskOptions={maskOptions}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          touched={touched}
          error={error}
        />
      </Box>
    </>
  );
};
