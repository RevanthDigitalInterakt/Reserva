import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { BaseScreen } from "../../../../common/components/BaseScreen";
import { MyCreditsParamList, MyCreditsScreensRoutes } from "../../navigation/MyCreditsNavigator";

import { CashbackInStoreContainer } from "./CashbackInStore.container";

type CashbackInStoreScreenProps = StackScreenProps<
  MyCreditsParamList,
  MyCreditsScreensRoutes.CASHBACK_IN_STORE
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
    navigation.navigate(MyCreditsScreensRoutes.ERROR);
  }

  return (
    <BaseScreen testID='CashbackInStoreScreen'>
      <CashbackInStoreContainer
        isLoyal={route.params.isLoyal}
        costumerDocument={route.params.costumerDocument}
        navigateBack={navigateBack}
        navigateToError={navigateToError}
      />
    </BaseScreen>
  )
}
