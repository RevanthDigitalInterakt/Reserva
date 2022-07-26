import React, { Fragment, useEffect } from "react";

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { RegisterPhoneNumberView } from "./RegisterPhoneNumber.view";
interface RegisterPhoneNumberContainerProps {
    profile: ProfileVars;
    isChangeNumber?: boolean;
    navigateBack: () => void;
    navigateToError: () => void;
}

export const RegisterPhoneNumberContainer = (
    {
        profile,
        isChangeNumber,
        navigateBack,
        navigateToError,
    }: RegisterPhoneNumberContainerProps
) => {

    return (
        <Fragment>
            <RegisterPhoneNumberView
                profile={profile}
                isChangeNumber={isChangeNumber}
            />
        </Fragment>
    );
};
