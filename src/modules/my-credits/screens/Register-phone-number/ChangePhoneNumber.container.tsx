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
}

export const ChangePhoneNumberContainer = (
    {
        profile,
        navigateBack,
        navigateToError,
        navigateToRegisterPhoneNumber
    }: ChangePhoneNumberContainerProps
) => {

    const handlenNavigateToRegisterPhoneNumber = () => {
        navigateToRegisterPhoneNumber();
    };

    return (
        <Fragment>
            <ChangePhoneNumberView
                profile={profile}
                navigateToRegisterPhoneNumber={handlenNavigateToRegisterPhoneNumber}
            />
        </Fragment>
    );
};
