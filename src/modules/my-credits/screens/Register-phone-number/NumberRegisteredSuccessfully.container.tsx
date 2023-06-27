import React from 'react';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';

import { NumberRegisteredSuccessfullyView } from './NumberRegisteredSuccessfully.view';

interface NumberRegisteredSuccessfullyContainerProps {
  navigateBack: () => void;
  navigateToCashbackInStore: () => void;
}

export const NumberRegisteredSuccessfullyContainer = ({
  navigateBack,
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
