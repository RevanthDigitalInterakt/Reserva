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

type Props = StackScreenProps<RootStackParamList, 'NewAddress'>;

export const NewAddress: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const { edit, editAddress, } = route?.params;
  const [addressId, setAddressId] = React.useState('');
  const [toggleActivated, setToggleActivated] = React.useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('ES');
  const [city, setCity] = useState('Vitoria');
  const [number, setNumber] = useState('123');
  const [complement, setComplement] = useState('Em frente a oficina');
  const [district, setDistrict] = useState('Camburi');
  const [street, setStreet] = useState('Camburi');
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sendMessage, setSendMessage] = useState('');
  const { isCheckout } = route.params;
  const {
    address: { data: addresses, loading, error, defaultAddress },

  } = useSelector((state: ApplicationState) => state);

  useEffect(() => {
    if (edit) {
      setAddressId(editAddress.id);
      setPostalCode(editAddress.postalCode);
      setState(editAddress.state);
      setCity(editAddress.city);
      setStreet(editAddress.street);
      setDistrict(editAddress.district);
      setNumber(editAddress.numberAndComplement[0]);
      setComplement(editAddress.numberAndComplement[1]);
    }
  }, [edit])

  const addNewAddress = () => {
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

              <InputOption
                placeholder={'Digite seu CEP'}
                maskType={'zip-code'}
                value={postalCode}
                onChangeText={(value) => { setPostalCode(value) }}
              />

              <Box flexDirection={'row'} justifyContent="space-between">
                <Box flex={1} marginRight={'micro'}>
                  <InputOption
                    placeholder={'Digite seu estado'}
                    value={state}
                    onChangeText={(value) => { setState(value) }}
                  />
                </Box>

                <Box flex={1}>
                  <InputOption
                    placeholder={'Digite sua cidade'}
                    value={city}
                    onChangeText={(value) => { setCity(value) }}
                  />
                </Box>
              </Box>

              <InputOption
                placeholder={'Endereço'}
                value={street}
                onChangeText={(value) => { setStreet(value) }}
              />

              <Box flexDirection={'row'} justifyContent="space-between">
                <Box flex={1} marginRight={'micro'}>
                  <InputOption
                    placeholder={'Digite seu bairro'}
                    value={district}
                    onChangeText={(value) => { setDistrict(value) }}
                  />
                </Box>

                <Box flex={1}>
                  <InputOption placeholder={'Número'}
                    value={number}
                    onChangeText={(value) => { setNumber(value) }}
                  />
                </Box>
              </Box>

              <InputOption
                placeholder={'Complemento'}
                value={complement}
                onChangeText={(value) => { setComplement(value) }}
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
                    value={recipientName}
                    onChangeText={(value) => { setRecipientName(value) }}
                  />

                  <InputOption
                    maskType={'cel-phone'}
                    placeholder={'Telefone para contato'}
                    value={phoneNumber}
                    onChangeText={(value) => { setPhoneNumber(value) }}
                  />

                  <InputOption
                    height={135}
                    textAlignVertical={'top'}
                    placeholder={'Deseja enviar algum recado junto?'}
                    value={sendMessage}
                    onChangeText={(value) => { setSendMessage(value) }}
                  />
                </Box>
              )}

              {!isCheckout && (
                <Button
                  disabled={loading}
                  width="200px"
                  mt={'xs'}
                  onPress={addNewAddress}
                  title={'SALVAR ALTERAÇÕES'}
                  variant="primarioEstreitoOutline"
                />
              )}
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
        />
      </Box>
    </>
  );
};
