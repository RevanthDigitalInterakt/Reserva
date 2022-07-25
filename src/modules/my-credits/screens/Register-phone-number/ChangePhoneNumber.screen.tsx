import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { BaseScreen } from "../../../../common/components/BaseScreen";
import { MyCreditsParamList, MyCreditsScreensRoutes } from "../../navigation/MyCreditsNavigator";

import { ChangePhoneNumberContainer } from "./ChangePhoneNumber.container";

type ChangePhoneNumberScreenProps = StackScreenProps<
    MyCreditsParamList,
    MyCreditsScreensRoutes.CHANGE_PHONE_NUMBER
>;

export const ChangePhoneNumberScreen = (
    {
        route,
        navigation: navigate
    }: ChangePhoneNumberScreenProps
) => {
    const navigation = useNavigation();

    const navigateBack = () => {
        navigation.goBack();
    }

    const navigateToError = () => {
        navigation.navigate(MyCreditsScreensRoutes.ERROR);
    }

    const navigateToRegisterPhoneNumber = () => {
        navigation.navigate(MyCreditsScreensRoutes.REGISTER_PHONE_NUMBER);
    };

    return (
        <BaseScreen testID='ChangePhoneNumberScreen'>
            <ChangePhoneNumberContainer
                homePhone={route.params.homePhone}
                navigateBack={navigateBack}
                navigateToError={navigateToError}
                navigateToRegisterPhoneNumber={navigateToRegisterPhoneNumber}
            />
        </BaseScreen>
    )
}
