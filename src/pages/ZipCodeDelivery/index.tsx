import React, {
  useCallback, useRef, useState,
} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
  TextInput,
  Text,
  FlatList,
} from 'react-native';

import type { StackScreenProps } from '@react-navigation/stack';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { KEYBOARD_VERTICAL_OFFSET_VALUE } from '../EditProfile/static/editProfile.defaultValues';
import { getBehaviorValue } from '../../utils/getBehaviorValue';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';

import { postalCodeSchema } from '../Address/utils/inputValidations';

import { zipCodeStyles } from './styles/zipCodeDelivery.styles';
import type { TCheckPostalCodeFn } from '../Address/components/InputForm/interface/IInputForm';
import { postalCodeMask } from '../../utils/postalCodeMask';
import testProps from '../../utils/testProps';

import CustomInputForm from '../Address/components/CustomInputForm';
import { useShippingSimulationLazyQuery, type ShippingSimulationOutput } from '../../base/graphql/generated';
import type { IGetShippingSimulation } from './interface/IGetShippingSimulation';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import PickUpHeader from './components/PickUpHeader';
import PickUpItem from './components/PickUpItem';
import { platformType } from '../../utils/platformType';

const getDeliveryAddressSchema = Yup.object().shape({
  postalCode: postalCodeSchema,
});

type TZipCodeDeliveryProps = StackScreenProps<RootStackParamList, 'ZipCodeDelivery'>;

export default function ZipCodeDelivery({ navigation }: TZipCodeDeliveryProps): JSX.Element {
  const [hasPostalCode, setHasPostalCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressDelivery, setAddressDelivery] = useState<ShippingSimulationOutput | null>(null);

  const inputCEPRef = useRef<TextInput>(null);

  const { items } = useBagStore(['items']);

  const [getShippingSimulation] = useShippingSimulationLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const handleTopBarGoBackButton = useCallback((): void => {
    navigation.goBack();
  }, []);

  const checkPostalCode = useCallback<TCheckPostalCodeFn>(async (value, setFieldValue) => {
    setHasPostalCode(!(value.length < 8));
    if (value.length < 8) return;

    const newValue = postalCodeMask(value);

    setFieldValue('postalCode', newValue);
  }, []);

  const handleGetShippingSimulation = useCallback(async (values: IGetShippingSimulation) => {
    const { postalCode } = values;

    const itensSend = items.map((item) => ({
      id: item.id,
      quantity: String(item.quantity),
      seller: item.seller,
    }));

    setLoading(true);

    try {
      const {
        data,
      } = await getShippingSimulation({
        variables: {
          input: {
            postalCode: postalCode.replace('-', ''),
            items: itensSend,
          },
        },
      });

      if (data) {
        setAddressDelivery(data.shippingSimulation);
      }
    } catch (error) {
      ExceptionProvider.captureException(error);
    } finally {
      setLoading(false);
    }
  }, [items]);

  const shadowColorStyle = useAnimatedStyle(() => {
    const isIOS = Platform.OS === platformType.IOS;
    if (isIOS) {
      return (
        {
          shadowColor: withTiming(hasPostalCode ? '#000' : 'transparent', { duration: 500 }), // Ajuste a duração conforme necessário
          shadowOffset: { width: 0, height: withTiming(hasPostalCode ? 2 : 0, { duration: 500 }) },
          shadowOpacity: withTiming(hasPostalCode ? 0.27 : 0, { duration: 500 }),
          borderRadius: withTiming(hasPostalCode ? 8 : 0, { duration: 500 }),
          shadowRadius: withTiming(hasPostalCode ? 3 : 0, { duration: 500 }),
          elevation: withTiming(hasPostalCode ? 5 : 0, { duration: 500 }),
        }
      );
    }
    return (
      {
        elevation: withTiming(hasPostalCode ? 5 : 0, { duration: 500 }),
        borderRadius: withTiming(hasPostalCode ? 8 : 0, { duration: 500 }),
      }
    );
  }, [hasPostalCode]);

  const renderHeader = () => (
    addressDelivery
      && <PickUpHeader addressDelivery={addressDelivery} />
  );

  return (
    <SafeAreaView style={zipCodeStyles.safeArea}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET_VALUE}
        behavior={getBehaviorValue(Platform.OS)}
      >
        <TopBarBackButton
          backButtonPress={handleTopBarGoBackButton}
        />
        <Animated.View style={[zipCodeStyles.boxContainer, shadowColorStyle]}>
          <View>
            <Text style={zipCodeStyles.titleCep}>
              Opções de entrega
            </Text>
          </View>
          <View style={zipCodeStyles.containerMarginTop}>
            <Text style={zipCodeStyles.descriptionText}>
              Digite seu
              {' '}
              <Text style={zipCodeStyles.descriptionTextCep}>
                CEP
                {' '}
              </Text>
              abaixo e escolha se prefere receber
              os produtos em casa ou
              retirar em uma das nossas lojas mais próximas de você.
            </Text>
          </View>
          <View style={zipCodeStyles.containerMarginTop}>
            <Formik
              initialValues={{
                postalCode: '',
              }}
              onSubmit={handleGetShippingSimulation}
              validationSchema={getDeliveryAddressSchema}
            >
              {({
                handleChange,
                handleSubmit,
                values,
                errors,
                touched,
                setFieldTouched,
                setFieldValue,
              }) => (
                <View>
                  <CustomInputForm
                    loading={loading}
                    placeholder="Digite seu CEP"
                    onTextChange={handleChange('postalCode')}
                    inputValue={values.postalCode}
                    inputRef={inputCEPRef}
                    inputName="postalCode"
                    fieldTouched={() => setFieldTouched('postalCode')}
                    error={errors.postalCode}
                    isEditable
                    textInputType="number-pad"
                    checkPostalCode={checkPostalCode}
                    setFieldValue={setFieldValue}
                    inputID={testProps('com.usereserva:id/shipping_simulation_input_postal_code')}
                    touched={touched.postalCode}
                    buttonLabel="OK"
                    testID="com.usereserva:id/shipping_simulation_button_submit"
                    onPress={() => handleSubmit()}
                  />
                </View>
              )}
            </Formik>
          </View>
        </Animated.View>
        <View style={zipCodeStyles.containerPaddingX}>
          {!loading && addressDelivery?.delivery?.address && (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={addressDelivery.storeList.stores}
            keyExtractor={(item) => item.friendlyName}
            ListHeaderComponent={renderHeader}
            renderItem={({ item }) => (
              <PickUpItem store={item} />
            )}
          />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
