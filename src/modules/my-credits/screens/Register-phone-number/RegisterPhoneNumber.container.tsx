import React, { Fragment, useEffect } from "react";

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { ChangePhoneNumber } from "./ChangePhoneNumber";
import { RegisterPhoneNumber } from "./RegisterPhoneNumber";
interface RegisterPhoneNumberContainerProps {
    costumerDocument: string;
    isChangeNumber?: boolean;
    navigateBack: () => void;
    navigateToError: () => void;
}

export const RegisterPhoneNumberContainer = (
    {
        costumerDocument,
        isChangeNumber,
        navigateBack,
        navigateToError,
    }: RegisterPhoneNumberContainerProps
) => {

    useEffect(() => {
        console.log('costumerDocument2::>', costumerDocument);
    }, [costumerDocument]);

    return (
        <Fragment>
            <RegisterPhoneNumber
                costumerDocument={costumerDocument}
                isChangeNumber={isChangeNumber}
            />
        </Fragment>
    );
};
