import React, { Fragment } from "react";
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import { MyWalletView } from "./MyWallet.view";

interface MyWalletContainerProps {
  navigateBack: () => void;
  navigateToError: () => void;
}

export const MyWalletContainer = (
  {
    navigateBack,
  }: MyWalletContainerProps
) => {

  return(
    <Fragment>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      <MyWalletView />
    </Fragment>
  );
};
