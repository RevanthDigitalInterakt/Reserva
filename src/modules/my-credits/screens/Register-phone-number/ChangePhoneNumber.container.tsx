import React, { Fragment, useEffect } from "react";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { ChangePhoneNumberView } from "./ChangePhoneNumber.view";

interface ChangePhoneNumberContainerProps {
    profile: ProfileVars;
    navigateBack: () => void;
    navigateToError: () => void;
    navigateToRegisterPhoneNumber: () => void;
    navigateToConfirmPhone: () => void;
}

export const ChangePhoneNumberContainer = (
    {
        profile,
        navigateBack,
        navigateToError,
        navigateToRegisterPhoneNumber,
        navigateToConfirmPhone
    }: ChangePhoneNumberContainerProps
) => {

    const handlenNavigateToRegisterPhoneNumber = () => {
        navigateToRegisterPhoneNumber();
    };

    const handleNavigateToConfirmPhone = () => {
        navigateToConfirmPhone();
    }
    return (
        <Fragment>
            <TopBarBackButton
                loading={false}
                showShadow
                backButtonPress={navigateBack}
            />
            <ChangePhoneNumberView
                profile={profile}
                navigateToRegisterPhoneNumber={handlenNavigateToRegisterPhoneNumber}
                navigateToConfirmPhone={handleNavigateToConfirmPhone}
            />
        </Fragment>
    );
};
