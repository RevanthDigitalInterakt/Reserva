import React, { Fragment, useEffect } from "react";

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { RegisterPhoneNumberView } from "./RegisterPhoneNumber.view";
interface RegisterPhoneNumberContainerProps {
    profile: ProfileVars;
    isChangeNumber?: boolean;
    confirmPhone?: boolean;
    navigateBack: () => void;
    navigateToError: () => void;
}

export const RegisterPhoneNumberContainer = (
    {
        profile,
        isChangeNumber,
        confirmPhone,
        navigateBack,
        navigateToError,
    }: RegisterPhoneNumberContainerProps
) => {

    return (
        <>
            <TopBarBackButton
                loading={false}
                showShadow
                backButtonPress={navigateBack}
            />
            <RegisterPhoneNumberView
                profile={profile}
                isChangeNumber={isChangeNumber}
                confirmPhone={confirmPhone}
            />
        </>
    );
};
