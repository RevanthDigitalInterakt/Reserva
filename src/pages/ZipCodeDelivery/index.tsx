import type { StackScreenProps } from '@react-navigation/stack';
import { Formik, type FormikHelpers } from 'formik';
import React, {
  useCallback,
  useMemo,
  useRef, useState,
} from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import * as Yup from 'yup';

import { useShippingSimulationLazyQuery, type ShippingSimulationOutput, type ShippingSimulationInput } from '../../base/graphql/generated';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { getBehaviorValue } from '../../utils/getBehaviorValue';
import { mergeItemsPackage } from '../../utils/mergeItemsPackage';
import { platformType } from '../../utils/platformType';
import { postalCodeMask } from '../../utils/postalCodeMask';
import testProps from '../../utils/testProps';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import CustomInputForm from './components/CustomInputForm';
import type { TCheckPostalCodeFn } from '../../components/InputForm/interface/IInputForm';
import { postalCodeSchema } from '../Address/utils/inputValidations';
import ProductUnavailable from '../Bag/components/ProductUnavailable';
import { KEYBOARD_VERTICAL_OFFSET_VALUE } from '../EditProfile/static/editProfile.defaultValues';
import PickUpHeader from './components/PickUpHeader';
import PickUpItem from './components/PickUpItem';
import { zipCodeStyles } from './styles/zipCodeDelivery.styles';

const getDeliveryAddressSchema = Yup.object().shape({
  postalCode: postalCodeSchema,
});

type TZipCodeDeliveryProps = StackScreenProps<RootStackParamList, 'ZipCodeDelivery'>;

export default function ZipCodeDelivery({ navigation }: TZipCodeDeliveryProps): JSX.Element {
  const [hasPostalCode, setHasPostalCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addressDelivery, setAddressDelivery] = useState<ShippingSimulationOutput | null>(null);

  const inputCEPRef = useRef<TextInput>(null);

  const { packageItems, topBarLoading } = useBagStore(['packageItems', 'topBarLoading']);

  const mergeItems = useMemo(() => {
    const mergedItems = mergeItemsPackage(packageItems);

    return mergedItems.map((item) => ({
      id: item.id,
      quantity: String(item.quantity),
      seller: item.seller,
    }));
  }, [packageItems]);

  const [getShippingSimulation] = useShippingSimulationLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const handleTopBarGoBackButton = useCallback((): void => {
    navigation.goBack();
  }, []);

  const checkPostalCode = useCallback<TCheckPostalCodeFn>(async (value, setFieldValue) => {
    if (value.length < 8) return;

    const newValue = postalCodeMask(value) || value;

    setFieldValue('postalCode', newValue);
  }, []);

  const handleGetShippingSimulation = useCallback(async (
    ctx: FormikHelpers<{ postalCode: string }>,
    values: ShippingSimulationInput,
  ) => {
    const { postalCode, items } = values;

    if (postalCode.length !== 9) {
      ctx.setFieldError('postalCode', 'Insira um CEP');
      return;
    }

    Keyboard.dismiss();

    setLoading(true);

    try {
      const {
        data,
      } = await getShippingSimulation({
        variables: {
          input: {
            postalCode: postalCode.replace('-', ''),
            items,
          },
        },
      });

      if (data) {
        setAddressDelivery(data.shippingSimulation);
      }
    } catch (error) {
      ExceptionProvider.captureException(error, "handleGetShippingSimulation - ZipCodeDelivery");
    } finally {
      setLoading(false);
    }
  }, []);

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

  const renderHeader = (showHeader: boolean) => (
    addressDelivery
    && (
      <PickUpHeader
        showHeader={showHeader}
        addressDelivery={addressDelivery}
      />
    )
  );

  return (
    <SafeAreaView style={zipCodeStyles.safeArea}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET_VALUE}
        behavior={getBehaviorValue(Platform.OS)}
      >
        <TopBarBackButton
          backButtonPress={handleTopBarGoBackButton}
          loading={topBarLoading}
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
              onSubmit={({ postalCode }, ctx) => handleGetShippingSimulation(
                ctx,
                { postalCode, items: mergeItems },
              )}
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
                    maxLength={9}
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
          {!loading
            && (addressDelivery?.delivery?.address
              || !!addressDelivery?.storeList?.stores?.length)
            && (
              <FlatList
                contentContainerStyle={{
                  paddingBottom: 550,
                  marginBottom: 550,
                }}
                showsVerticalScrollIndicator={false}
                data={addressDelivery.storeList.stores}
                keyExtractor={(item) => item.friendlyName}
                ListHeaderComponent={renderHeader(!!addressDelivery?.delivery?.address)}
                renderItem={({ item }) => (
                  <PickUpItem
                    store={item}
                    deliveryOptions={addressDelivery.delivery.deliveryOptions}
                    deliveryOptionsStore={addressDelivery.storeList.deliveryOptions}
                  />
                )}
              />
            )}
          <ProductUnavailable
            type="ZIPCODE"
            showCard={(!loading
              && addressDelivery
              && (!addressDelivery?.delivery?.address
                && !addressDelivery?.storeList?.stores?.length))!}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
