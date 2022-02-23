import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { BaseScreen } from "../../../../common/components/BaseScreen";
import { MyCashbackParamList, MyCashbackScreensRoutes } from "../../navigation/MyCashbackNavigator";
import { MyWalletContainer } from "./MyWallet.container";

type CashbackInStoreScreenProps = StackScreenProps<
  MyCashbackParamList,
  MyCashbackScreensRoutes.MY_WALLET
>;

export const CashbackInStoreScreen = (
  {
    route,
    navigation: navigate
  }: CashbackInStoreScreenProps
) => {
  const navigation = useNavigation();

  const navigateBack = () => {
    navigation.goBack();
  }

  const navigateToError = () => {
    navigation.navigate(MyCashbackScreensRoutes.ERROR);
  }

  return (
    <BaseScreen testID='CashbackInStoreScreen'>
      <MyWalletContainer
        navigateBack={navigateBack}
        navigateToError={navigateToError}
      />
    </BaseScreen>
  )
}
