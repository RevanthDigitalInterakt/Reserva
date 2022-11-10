import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import React from "react";
import { BaseScreen } from "../../../../common/components/BaseScreen";
import { MyCashbackParamList, MyCashbackScreensRoutes } from "../../navigation/MyCashbackNavigator";
import { MyWalletContainer } from "./MyWallet.container";

type MyWalletScreenProps = StackScreenProps<
  MyCashbackParamList,
  MyCashbackScreensRoutes.MY_WALLET
>;

export const MyWalletScreen = (
  {
    route,
    navigation: navigate
  }: MyWalletScreenProps
) => {
  const navigation = useNavigation();

  const navigateBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();

      return;
    }

    navigation.dispatch(CommonActions.navigate({ name: 'HomeTabs' }));
  }

  const navigateToError = () => {
    navigation.navigate(MyCashbackScreensRoutes.ERROR);
  }

  return (
    <BaseScreen testID='MyWalletScreen'>
      <MyWalletContainer
        navigateBack={navigateBack}
        navigateToError={navigateToError}
      />
    </BaseScreen>
  )
}
