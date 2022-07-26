import React, { useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import { BaseScreen } from "../../../../common/components/BaseScreen";
import { MyCreditsParamList, MyCreditsScreensRoutes } from "../../navigation/MyCreditsNavigator";

import { RegisterPhoneNumberContainer } from "./RegisterPhoneNumber.container";

type RegisterPhoneNumberScreenProps = StackScreenProps<
    MyCreditsParamList,
    MyCreditsScreensRoutes.REGISTER_PHONE_NUMBER
>;

export const RegisterPhoneNumberScreen = (
    {
        route,
        navigation: navigate
    }: RegisterPhoneNumberScreenProps
) => {
    const navigation = useNavigation();

    const navigateBack = () => {
        navigation.goBack();
    }

    const navigateToError = () => {
        navigation.navigate(MyCreditsScreensRoutes.ERROR);
    }

    return (
        <BaseScreen testID='ChangePhoneNumberScreen'>
            <RegisterPhoneNumberContainer
                profile={route?.params.profile}
                isChangeNumber={route?.params.isChangeNumber}
                navigateBack={navigateBack}
                navigateToError={navigateToError}
            />
        </BaseScreen>
    )
}
