import { useMutation } from "@apollo/client";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import {
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
} from "react-native-masked-text";
import { useFormikContext } from "formik";
import { Formik } from "formik";
import { useCart } from "../../../context/CartContext";
import { Box, Button, TextField, Typography } from "reserva-ui";
import {
  saveAddressMutation,
  updateAddress,
} from "../../../graphql/address/addressMutations";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { CepVerify } from "../../../services/vtexService";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";

interface IAddress {
  postalCode: string;
  state: string;
  city: string;
  number: string;
  complement: string;
  street: string;
  neighborhood: string;
  addressType: string;
  country: string;
}
type Props = StackScreenProps<RootStackParamList, "NewAddress">;

type SaveAddressDTO = {
  postalCode: string;
  state: string;
  city: string;
  street: string;
  neighborhood: string;
  number: string;
  complement: string;
};

export const NewAddress: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const { edit, editAddress } = route?.params;
  const [addressId, setAddressId] = useState(edit ? editAddress.id : "");
  const [toggleActivated, setToggleActivated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saveAddress] = useMutation(saveAddressMutation);
  const [addressUpdate] = useMutation(updateAddress);
  const { addShippingData, orderForm } = useCart();
  const { isCheckout } = route.params;
  const [initialValues, setInitialValues] = useState<IAddress>({
    postalCode: edit ? editAddress.postalCode : "",
    state: edit ? editAddress.state : "",
    city: edit ? editAddress.city : "",
    number: edit ? editAddress.number : "",
    complement: edit ? editAddress.complement : "",
    street: edit ? editAddress.street : "",
    neighborhood: edit ? editAddress.neighborhood : "",
    addressType: "residential",
    country: "BRA",
  });
  const [buttonEnabled, setButtonEnabled] = useState(false);

  const handleSaveAddress = async () => {
    setLoading(true);

    edit
      ? await addressUpdate({
        variables: {
          id: addressId,
          fields: initialValues,
        },
      })
      : await saveAddress({
        variables: {
          fields: initialValues,
        },
      });

    setLoading(false);
    navigation.goBack();
  };

  const handlePaymentMethodScreen = async () => {
    setLoading(true);
    const {
      postalCode,
      state,
      number,
      neighborhood,
      complement,
      city,
      street,
    } = initialValues;
    const isAddressSaved = await addShippingData({
      postalCode,
      state,
      receiverName: orderForm?.clientProfileData?.firstName,
      number,
      neighborhood,
      addressType: "residential",
      country: "BRA",
      complement,
      city,
      street,
    });
    setLoading(false);
    if (isAddressSaved) {
      navigation.navigate("Checkout");
    }
  }

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

      setLoading(false);
    }

    setLoading(false);
  };

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
      city.length > 0 &&
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
        style={{ justifyContent: "space-between" }}
        backgroundColor="white"
      >
        <TopBarBackButton loading={loading} showShadow />
        <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <Box pb="sm">
            <Box paddingX={"xxxs"} justifyContent="flex-start" pt={"sm"}>
              <Box alignSelf={"flex-start"} mb={"nano"}>
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
                placeholder={"Digite seu CEP"}
                maskType={"zip-code"}
                value={initialValues.postalCode}
                onChangeText={(text) => {
                  setInitialValues({ ...initialValues, postalCode: text });
                  cepHandler(text.replace("-", ""));
                }}
              />

              <InputOption
                placeholder={"Endereço"}
                value={initialValues.street}
                // editable={initialValues.street.length <= 0}
                onChangeText={(text) =>
                  setInitialValues({ ...initialValues, street: text })
                }
              />

              <Box flexDirection={"row"} justifyContent="space-between">
                <Box flex={1} marginRight={"micro"}>
                  <InputOption
                    placeholder={"Digite seu bairro"}
                    value={initialValues.neighborhood}
                    // editable={initialValues.neighborhood.length <= 0}
                    onChangeText={(text) =>
                      setInitialValues({ ...initialValues, neighborhood: text })
                    }
                  />
                </Box>

                <Box flex={1}>
                  <InputOption
                    placeholder={"Digite seu estado"}
                    value={initialValues.state}
                    // editable={initialValues.state.length <= 0}
                    onChangeText={(text) =>
                      setInitialValues({ ...initialValues, state: text })
                    }
                  />
                </Box>
              </Box>

              <Box flex={1}>
                <InputOption
                  placeholder={"Número"}
                  value={initialValues.number}
                  onChangeText={(text) =>
                    setInitialValues({ ...initialValues, number: text })
                  }
                />
              </Box>
              <InputOption
                placeholder={"Complemento"}
                value={initialValues.complement}
                onChangeText={(text) =>
                  setInitialValues({ ...initialValues, complement: text })
                }
              />

              {toggleActivated && (
                <Box mb={"sm"}>
                  <InputOption
                    placeholder={"Nome do destinatário"}
                  />

                  <InputOption
                    maskType={"cel-phone"}
                    placeholder={"Telefone para contato"}
                  />

                  <InputOption
                    height={135}
                    textAlignVertical={"top"}
                    placeholder={"Deseja enviar algum recado junto?"}
                  />
                </Box>
              )}

              {!isCheckout && (
                <Button
                  disabled={loading || !buttonEnabled}
                  width="240px"
                  mt={"xs"}
                  onPress={handleSaveAddress}
                  title={"INCLUIR NOVO ENDEREÇO"}
                  variant="primarioEstreitoOutline"
                />
              )}
            </Box>
          </Box>
        </ScrollView>
        {isCheckout && (
          <Button
            onPress={handlePaymentMethodScreen}
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
  touch?: string;
  touched?: any;
  textAlignVertical?: "auto" | "top" | "bottom" | "center" | undefined;
  editable?: boolean;
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
  touch,
  textAlignVertical,
  onChangeText,
  editable = true,
}: IInputOption) => {
  return (
    <>
      <Box mt={"xxxs"}>
        <TextField
          // label={"Nome do titular"}
          textAlignVertical={textAlignVertical}
          height={height}
          maskType={maskType}
          maskOptions={maskOptions}
          onChangeText={onChangeText}
          placeholder={placeholder}
          value={value}
          editable={editable}
        // touched={touched[field]}
        // error={errors[field] && touched[field] ? `${errors[field]}` : null}
        />
      </Box>
    </>
  );
};
