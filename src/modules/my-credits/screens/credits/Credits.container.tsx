import React, { Fragment, useEffect, useState } from 'react';
import { LoadingScreen } from '../../../../common/components/LoadingScreen';
import { ProfileVars } from '../../../../graphql/profile/profileQuery';
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
  CashbackHttpUrl, GetDigitalWalletResponse, MyCreditsAPI
} from '../../../../modules/my-credits/api/MyCreditsAPI';
import { RemoteConfigService } from '../../../../shared/services/RemoteConfigService';
import { StorageService, StorageServiceKeys } from '../../../../shared/services/StorageService';
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
  ] = useState<boolean>(false);

  // covert cents to real
  const convertCentsToReal = (cents: number) => {
    return cents / 10000;
  };

  const getIsScreenCashbackInStoreActive = async () => {
    const cashback_in_store = await RemoteConfigService.getValue<boolean>('FEATURE_CASHBACK_IN_STORE');
    setScreenCashbackInStoreActive(cashback_in_store);
  }

  const getCreditBalance = async ( cpf: string) => {
    const { data } = await MyCreditsAPI.get<GetDigitalWalletResponse>(
      `${CashbackHttpUrl.GetDigitalWallet}${cpf}`,
    );

    setCreditsBalance(
      convertCentsToReal(data.data.balance_in_cents)
    );
  };

  useEffect(() => {
    StorageService.getItem<ProfileVars>({
      key: StorageServiceKeys.PROFILE,
      isJSON: true,
    }).then((value) => {
      setProfile(value);
    });
    getIsScreenCashbackInStoreActive();
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
