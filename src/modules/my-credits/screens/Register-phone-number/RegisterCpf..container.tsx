import React, { Fragment, useEffect } from "react";
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { RegisterCpfView } from "./RegisterCpf.view";
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
interface RegisterCpfContainerProps {
    profile: ProfileVars;
    navigateBack: () => void;
    navigateToError: () => void;
    navigateToVerifyNumber: () => void;
}

export const RegisterCpfContainer = (
    {
        profile,
        navigateBack,
        navigateToError,
        navigateToVerifyNumber
    }: RegisterCpfContainerProps
) => {

    const handleNavigateToVerifyNumber = () => {
        navigateToVerifyNumber();
    }
    return (
        <Fragment>
            <TopBarBackButton
                loading={false}
                showShadow
                backButtonPress={navigateBack}
            />
            <RegisterCpfView
                profile={profile}
                navigateToVerifyNumber={handleNavigateToVerifyNumber}
            />
        </Fragment>
    );
};
