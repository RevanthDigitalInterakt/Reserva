import React, { Fragment, useEffect } from "react";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';

import { NumberRegisteredSuccessfullyView } from "./NumberRegisteredSuccessfully.view";

interface NumberRegisteredSuccessfullyContainerProps {
    navigateBack: () => void;
    navigateToError: () => void;
    navigateToCashbackInStore: () => void;
}

export const NumberRegisteredSuccessfullyContainer = (
    {
        navigateBack,
        navigateToError,
        navigateToCashbackInStore,
    }: NumberRegisteredSuccessfullyContainerProps
) => {

    const handleNavigateToCashbackInStore = () => {
        console.log('oxe')
        navigateToCashbackInStore();
    }

    return (
        <Fragment>
            <TopBarBackButton
                loading={false}
                showShadow
                backButtonPress={navigateBack}
            />
            <NumberRegisteredSuccessfullyView
                navigateToCashbackInStore={handleNavigateToCashbackInStore}
            />
        </Fragment>
    );
};
