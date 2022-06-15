import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { Typography, Box, Button, Icon, Divider } from "@danilomsou/reserva-ui";
import { TopBarBackButton } from "../../Menu/components/TopBarBackButton";
import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../../routes/StackNavigator";

type Props = StackScreenProps<RootStackParamList, "BarCodePayment">;
export const BarCodePayment = ({ route }: Props) => {
  const { cashback } = route?.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView flex={1} backgroundColor={"white"}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={"xxxs"} paddingY={"sm"}>
          <Box>
            <Typography variant={"tituloSessoes"}>Boleto</Typography>
          </Box>
          <Information
            description={`Imprima o boleto e pague no banco`}
            showDivider
            iconName="Print"
          />
          <Information
            description={`Ou pague pela internet utilizando o \ncódigo de barras do boleto`}
            iconName="Barcode"
            showDivider
          />
          <Information
            description={`O prazo de validade do boleto \né de 2 dia úteis'.`}
            iconName="Clock"
          />
        </Box>
      </ScrollView>
      <Button
        onPress={() =>
          navigation.navigate("SummaryScreen", { paymentType: "Boleto", cashback: cashback })
        }
        title="RESUMO"
        variant="primarioEstreito"
        inline
      />
    </SafeAreaView>
  );
};

const Information = ({
  description,
  showDivider,
  iconName,
}: {
  description: string;
  showDivider?: boolean;
  iconName: string;
}) => {
  return (
    <Box>
      <Box paddingBottom="xxs" flexDirection="row" py="xxs">
        <Box mr="micro" justifyContent="center">
          <Icon name={iconName} size={20} />
        </Box>
        <Typography fontFamily="nunitoRegular" fontSize={15}>
          {description}
        </Typography>
      </Box>
      {showDivider && <Divider variant="fullWidth" />}
    </Box>
  );
};
