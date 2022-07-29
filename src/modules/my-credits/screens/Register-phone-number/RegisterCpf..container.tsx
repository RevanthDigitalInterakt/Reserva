import React, { Fragment, useEffect, useState } from "react";
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
    const [cpf, setCpf] = useState<string>('');

    const handleNavigateToVerifyNumber = () => {
        navigateToVerifyNumber();
    }

    useEffect(() => {
        console.log('cpff::>', cpf);
    }, [cpf]);

    return (
        <Fragment>
            <TopBarBackButton
                loading={false}
                showShadow
                backButtonPress={navigateBack}
            />
            <RegisterCpfView
                valueCpf={cpf}
                onChangeText={(cpf) => setCpf(cpf)}
                profile={profile}
                navigateToVerifyNumber={handleNavigateToVerifyNumber}
            />
        </Fragment>
    );
};
