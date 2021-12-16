import React, { Fragment, useEffect, useState } from 'react';

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import { createRequestGetCustomer } from '../../../../modules/my-credits/api/MyCreditsAPI';
import { StorageService, StorageServiceKeys } from '../../../../shared/services/StorageService';
import { ProfileVars } from '../../../../graphql/profile/profileQuery';
import { LoadingScreen } from '../../../../common/components/LoadingScreen';

import { CreditsView } from './Credits.view';

interface CreditsContainerProps {
  navigateBack: () => void;
  navigateToError: () => void;
  navigateToCashbackInStore: () => void;
}

export const CreditsContainer = (
  {
    navigateBack,
    navigateToError,
    navigateToCashbackInStore,
  }: CreditsContainerProps
) => {
  const [creditsBalance, setCreditsBalance] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileVars>();
  const [
    screenCashbackInStoreActive,
    setScreenCashbackInStoreActive
  ] = useState<boolean>(false);

  const getCreditBalance = async ( cpf: string) => {
    const customer = await createRequestGetCustomer(cpf);
    if(customer.data.SaldoMonetario) {
      setCreditsBalance(Number(customer.data.SaldoMonetario));
    }
  };

  useEffect(() => {
    StorageService.getItem<ProfileVars>({
      key: StorageServiceKeys.PROFILE,
      isJSON: true,
    }).then((value) => {
      setProfile(value);
    });
  }, []);

  useEffect(() => {
    if(profile && profile.document) {
      setLoading(true);
      getCreditBalance(profile.document);
      setLoading(false);
    }
  }, [profile]);

  return (
    <Fragment>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      { !loading && creditsBalance != -1 ? (
        <CreditsView
          creditsBalance={creditsBalance}
          navigateToCashbackInStore={navigateToCashbackInStore}
          screenCashbackInStoreActive={screenCashbackInStoreActive}
        />
      ) : (
        <LoadingScreen />
      )}
    </Fragment>
  );
};
