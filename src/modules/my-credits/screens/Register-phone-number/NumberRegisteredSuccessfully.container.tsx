import React, { Fragment } from 'react';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';

import { NumberRegisteredSuccessfullyView } from './NumberRegisteredSuccessfully.view';

interface NumberRegisteredSuccessfullyContainerProps {
  navigateBack: () => void;
  navigateToError: () => void;
  navigateToCashbackInStore: () => void;
}

export const NumberRegisteredSuccessfullyContainer = ({
  navigateBack,
  navigateToError,
  navigateToCashbackInStore,
}: NumberRegisteredSuccessfullyContainerProps) => {
  const handleNavigateToCashbackInStore = () => {
    navigateToCashbackInStore();
  };

  return (
    <>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      <NumberRegisteredSuccessfullyView
        navigateToCashbackInStore={handleNavigateToCashbackInStore}
      />
    </>
  );
};
