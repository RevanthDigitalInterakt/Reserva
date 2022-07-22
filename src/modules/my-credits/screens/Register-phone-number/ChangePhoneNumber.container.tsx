import React, { Fragment } from "react";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { ChangePhoneNumber } from "./ChangePhoneNumber";
interface ChangePhoneNumberContainerProps {
    homePhone: ProfileVars;
    navigateBack: () => void;
    navigateToError: () => void;
}

export const ChangePhoneNumberContainer = (
    {
        homePhone,
        navigateBack,
        navigateToError
    }: ChangePhoneNumberContainerProps
) => {

    return (
        <Fragment>
            <RegisterPhoneNumberView
                profile={profile}
            />
        </Fragment>
    );
};
