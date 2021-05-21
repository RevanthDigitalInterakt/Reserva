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
import { loadAddress, createAddress } from "../../../store/ducks/address/actions";

type Props = StackScreenProps<RootStackParamList, 'NewAddress'>;

export const NewAddress: React.FC<Props> = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const { edit } = route?.params;
  const [toggleActivated, setToggleActivated] = React.useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const { isCheckout } = route.params;


  const addNewAddress = () => {
    dispatch(createAddress(
      {
        address: {
          isDefaultBillingAddress: false,
          country: "BR",
          address3: "Camburi",
          address2: "123|ASDASD",
          city: "Vitoria",
          address1: "Camburi",
          postalCode: "29226680",
          state: "ES",
        },
      }))
  }
  return (
    <>
      <SafeAreaView
        flex={1}
        style={{ justifyContent: 'space-between' }}
        backgroundColor="white"
      >
        <TopBarBackButton showShadow />
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
                onChangeText={(text) => { setPostalCode(text) }}
              />

              <Box flexDirection={'row'} justifyContent="space-between">
                <Box flex={1} marginRight={'micro'}>
                  <InputOption
                    placeholder={'Digite seu estado'}
                    onChangeText={() => { }}
                  />
                </Box>

                <Box flex={1}>
                  <InputOption
                    placeholder={'Digite sua cidade'}
                    onChangeText={() => { }}
                  />
                </Box>
              </Box>

              <InputOption placeholder={'Endereço'} onChangeText={() => { }} />

              <Box flexDirection={'row'} justifyContent="space-between">
                <Box flex={1} marginRight={'micro'}>
                  <InputOption
                    placeholder={'Digite seu bairro'}
                    onChangeText={() => { }}
                  />
                </Box>

                <Box flex={1}>
                  <InputOption placeholder={'Número'} onChangeText={() => { }} />
                </Box>
              </Box>

              <InputOption
                placeholder={'Complemento'}
                onChangeText={() => { }}
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
                    onChangeText={() => { }}
                  />

                  <InputOption
                    placeholder={'Telefone para contato'}
                    onChangeText={() => { }}
                  />

                  <InputOption
                    height={135}
                    textAlignVertical={'top'}
                    placeholder={'Deseja enviar algum recado junto?'}
                    onChangeText={() => { }}
                  />
                </Box>
              )}

              {!isCheckout && (
                <Button

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
