import React, { Fragment, useEffect, useState } from 'react';

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
  MyCreditsAPI,
  CashbackHttpUrl,
  GetCustomerResponse
} from '../../../../modules/my-credits/api/MyCreditsAPI';
import { StorageService, StorageServiceKeys } from '../../../../shared/services/StorageService';
import { ProfileVars } from '../../../../graphql/profile/profileQuery';
import { LoadingScreen } from '../../../../common/components/LoadingScreen';

import { CreditsView } from './Credits.view';

interface CreditsContainerProps {
  navigateBack: () => void;
  navigateToError: () => void;
  navigateToCashbackInStore: (isLoyal: boolean, costumerDocument: string) => void;
}

export const CreditsContainer = (
  {
    navigateBack,
    navigateToError,
    navigateToCashbackInStore,
  }: CreditsContainerProps
) => {
  const [creditsBalance, setCreditsBalance] = useState<number>(0);
  const [isLoyal, setIsLoyal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<ProfileVars>();
  const [
    screenCashbackInStoreActive,
    setScreenCashbackInStoreActive
  ] = useState<boolean>(true);

  const getCreditBalance = async ( cpf: string) => {
    const customer = await MyCreditsAPI.get<GetCustomerResponse>(
      CashbackHttpUrl.GetCustomer,
      { cpf }
    );

    if(customer.data.SaldoMonetario) {
      setCreditsBalance(Number(customer.data.SaldoMonetario));
    }
    if(customer.data.Fidelizado) {
      setIsLoyal(true);
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

  const handleNavigateToCashbackInStore = () => {
    if(profile) {
      navigateToCashbackInStore(isLoyal, profile.document);
    }
  };

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
      { !loading ? (
        <CreditsView
          creditsBalance={creditsBalance}
          handleNavigateToCashbackInStore={handleNavigateToCashbackInStore}
          screenCashbackInStoreActive={screenCashbackInStoreActive}
        />
      ) : (
        <LoadingScreen />
      )}
    </Fragment>
  );
};
