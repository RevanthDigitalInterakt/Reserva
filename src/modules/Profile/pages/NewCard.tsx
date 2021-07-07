import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Icon, TextField, Toggle, Typography } from "reserva-ui";
import CreditCardDisplay from "react-native-credit-card-display";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { images } from "../../../assets";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/core";
import Cardscan from "react-native-cardscan";
import { borderWidth } from "styled-system";
import { RootStackParamList } from "../../../routes/StackNavigator";
import { StackScreenProps } from "@react-navigation/stack";
import { CardCheckout } from "../Components/CardCheckout";
interface Card {
  holder: string;
  number: string;
  expiration: string;
  CVC: string;
}

type CardWriting = "manually" | "scanned";

type Props = StackScreenProps<RootStackParamList, "NewCard">;

export const NewCard = ({ navigation, route }: Props) => {
  const [card, setCard] = useState<Card>({} as Card);
  const [cardTwo, setCardTwo] = useState<Card>({} as Card);
  const [isFlipped, setIsFlipped] = React.useState(false);
  const [handleNewTwoCards, setHandleNewTwoCards] = React.useState(false);
  const [mainCard, setMainCard] = React.useState(false);

  const [compatible, setCompatible] = useState(null);
  const [cardWritingType, setCardWritingType] =
    React.useState<CardWriting>("manually");

  const { isCheckout } = route.params;

  const onChangeTextCard = (field: keyof Card, newValue: any) => {
    setCard((preview) => {
      return { ...preview, [field]: newValue };
    });
  };
  const checkCompatible = useCallback(async () => {
    const isCompatible = await Cardscan.isSupportedAsync();
    setCompatible(isCompatible);
  }, [setCompatible]);

  useEffect(() => {
    checkCompatible();
  }, []);

  const scanCard = useCallback(async () => {
    // TODO customizar ScanView
    const { action, scanId, payload, canceledReason } = await Cardscan.scan();

    if (action === "scanned") {
      setCardWritingType("scanned");
      let issuer = payload.issuer || "??";
      if (issuer === "MasterCard") {
        issuer = "master-card";
      } else if (issuer === "American Express") {
        issuer = "american-express";
      } else {
        issuer = issuer.toLowerCase();
      }
      setCard({
        CVC: payload.cvc ?? "",
        expiration:
          payload.expiryMonth && payload.expiryYear
            ? `${payload.expiryMonth}/${payload.expiryYear}`
            : "",
        holder: payload.cardholderName,
        number: payload.number,
      });
    }

    if (action === "canceled") {
      if (canceledReason === "enter_card_manually") {
        Alert.alert("Enter card manually");
      }

      if (canceledReason === "user_canceled") {
        Alert.alert("User canceled scan");
      }

      if (canceledReason === "camera_error") {
        Alert.alert("Camera error during scan");
      }

      if (canceledReason === "fatal_error") {
        Alert.alert("Processing error during scan");
      }

      if (canceledReason === "unknown") {
        Alert.alert("Unknown reason for scan cancellation");
      }
    }
  }, [setCard]);

  const canAddCard = useCallback((): boolean => {
    const { CVC, expiration, holder, number } = card;

    if (CVC?.length && expiration?.length && holder?.length && number?.length) {
      return true;
    }
    return false;
  }, [card]);

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <KeyboardAvoidingView
        flex={1}
        enabled
        keyboardVerticalOffset={15}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Box flex={1}>
          <TopBarBackButton showShadow />

          <ScrollView showsVerticalScrollIndicator={false}>
            {!isCheckout ? (
              <Box mb="nano">
                <Box mt={"md"} overflow={"hidden"} paddingHorizontal={20}>
                  <Box
                    mb={"xxs"}
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="tituloSessoes">
                      Adicionar cartão
                    </Typography>
                    {!handleNewTwoCards && compatible ? (
                      <Button onPress={scanCard}>
                        <Box flexDirection="row" alignItems="center">
                          <Box mr="nano">
                            <Icon name="Cam" size={16} />
                          </Box>
                          <Typography>Escanear Cartão</Typography>
                        </Box>
                      </Button>
                    ) : (
                      <Box />
                    )}
                  </Box>
                  <CreditCardDisplay
                    height={220}
                    flipped={isFlipped}
                    width={"100%" as unknown as number}
                    number={card.number}
                    cvc={card.CVC}
                    expiration={card.expiration}
                    name={card?.holder?.toUpperCase()}
                    backImage={images.cardVerso}
                    frontImage={images.cardFront}
                    fontColorCvc="white"
                    fontSize={16}
                    labelCvc="CVV"
                    numberContainerStyles={
                      card.number
                        ? {
                            borderWidth: 1,
                            borderColor: "red",
                            borderRadius: 6,
                            width: "60%",
                            alignItems: "center",
                            paddingVertical: 4,
                            marginLeft: 10,
                          }
                        : {}
                    }
                    nameContainerStyles={
                      card.holder
                        ? {
                            borderWidth: 1,
                            borderColor: "red",
                            borderRadius: 6,
                            alignItems: "center",
                            justifyContent: "center",
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                            marginLeft: 10,
                          }
                        : {}
                    }
                    expirationContainerStyles={{
                      borderWidth: 1,
                      borderColor: "red",
                      borderRadius: 3,
                      alignItems: "center",
                      paddingHorizontal: 4,
                      paddingVertical: 5,
                      marginTop: 9,
                      transform: [{ translateX: 5 }],
                    }}
                    cvcContainerStyles={{
                      borderWidth: 1,
                      borderColor: "red",
                      borderRadius: 6,
                      width: "45%",
                      alignItems: "center",
                      paddingVertical: 4,
                    }}
                  />
                  <Box mt={"xxxs"}>
                    <TextField
                      height={55}
                      placeholder="Nome do titular"
                      value={card.holder}
                      onChangeText={(val) => onChangeTextCard("holder", val)}
                      iconRight={
                        <Box ml="nano">
                          <Icon
                            marginX="micro"
                            color="neutroFrio2"
                            name="HelpCircle"
                            size={16}
                          />
                        </Box>
                      }
                    />
                  </Box>
                  <Box mt={"xxxs"}>
                    <TextField
                      maskType="credit-card"
                      height={55}
                      placeholder="Número do cartão"
                      value={card.number}
                      onChangeText={(val) => onChangeTextCard("number", val)}
                      iconRight={
                        <Box ml="nano">
                          <Icon
                            marginX="micro"
                            color="neutroFrio2"
                            name="HelpCircle"
                            size={16}
                          />
                        </Box>
                      }
                    />
                  </Box>

                  <Box mt={"xxxs"} flexDirection="row">
                    <Box flex={1} mr="xxxs">
                      <TextField
                        height={55}
                        maskType="custom"
                        maskOptions={{
                          mask: "99/99",
                        }}
                        keyboardType="numeric"
                        placeholder="Vencimento"
                        value={card.expiration}
                        onChangeText={(val) =>
                          onChangeTextCard("expiration", val)
                        }
                        iconRight={
                          <Box ml="nano">
                            <Icon
                              marginX="micro"
                              color="neutroFrio2"
                              name="HelpCircle"
                              size={16}
                            />
                          </Box>
                        }
                      />
                    </Box>
                    <Box flex={1}>
                      <TextField
                        height={55}
                        maxLength={3}
                        keyboardType="numeric"
                        placeholder="CVC"
                        value={card.CVC}
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                        onChangeText={(val) => onChangeTextCard("CVC", val)}
                        iconRight={
                          <Box ml="nano">
                            <Icon
                              marginX="micro"
                              color="neutroFrio2"
                              name="CreditCard"
                              size={16}
                            />
                          </Box>
                        }
                      />
                    </Box>
                  </Box>

                  <Box my="xs" alignItems="center" justifyContent="center">
                    <Toggle
                      onValueChange={(e) => setMainCard(!mainCard)}
                      value={mainCard}
                      label="Tornar esse meu cartão principal"
                      color="neutroFrio2"
                      thumbColor="vermelhoAlerta"
                    />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box pb="sm">
                <CardCheckout
                  cardOne={card}
                  onChangeCardOne={setCard}
                  cardTwo={cardTwo}
                  onChangeCardTwo={setCardTwo}
                  handleNewTwoCards={handleNewTwoCards}
                  setHandleNewTwoCards={setHandleNewTwoCards}
                />
              </Box>
            )}
          </ScrollView>
          <Box>
            <Button
              disabled={!canAddCard()}
              title={
                handleNewTwoCards ? "ADICIONAR CARTÕES" : "ADICIONAR CARTÃO"
              }
              variant="primarioEstreito"
              fontFamily="nunitoRegular"
              onPress={() => console.log("prin")}
              fontSize={13}
              inline
            />
          </Box>
        </Box>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
