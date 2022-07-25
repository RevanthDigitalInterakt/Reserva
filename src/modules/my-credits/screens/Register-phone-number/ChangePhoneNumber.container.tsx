import React, { Fragment, useEffect } from "react";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { ChangePhoneNumber } from "./ChangePhoneNumber";
interface ChangePhoneNumberContainerProps {
    homePhone: string;
    navigateBack: () => void;
    navigateToError: () => void;
    navigateToRegisterPhoneNumber: () => void;
}

export const ChangePhoneNumberContainer = (
    {
        homePhone,
        navigateBack,
        navigateToError,
        navigateToRegisterPhoneNumber
    }: ChangePhoneNumberContainerProps
) => {
    useEffect(() => {
        console.log('homePhone2::>', homePhone)
    }, [homePhone])

    return (
        <Fragment>
            <ChangePhoneNumber
                homePhone={homePhone}
                navigateToRegisterPhoneNumber={navigateToRegisterPhoneNumber}
            />
        </Fragment>
    );
};
