import React, { useEffect, useState } from 'react';
import type { ProfileVars } from '../../../../graphql/profile/profileQuery';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import {
  CashbackHttpUrl, GetCustomerResponse, MyCreditsAPI,
} from '../../api/MyCreditsAPI';
import { StorageService, StorageServiceKeys } from '../../../../shared/services/StorageService';
import { CreditsView } from './Credits.view';
import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import LoadingScreen from '../../../../components/LoadingScreen/LoadingScreen';

interface CreditsContainerProps {
  navigateBack: () => void;
}

export const CreditsContainer = ({ navigateBack }: CreditsContainerProps) => {
  const [creditsBalance, setCreditsBalance] = useState<number>(0);
  const [isLoyal, setIsLoyal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<ProfileVars>();

  const convertCentsToReal = (cents: number) => cents / 100;

  const getCreditBalance = async (cpf: string) => {
    const customer = await MyCreditsAPI.get<GetCustomerResponse>(
      CashbackHttpUrl.GetCustomer,
      { cpf },
    );

    if (customer.data.SaldoMonetario) {
      setCreditsBalance(
        convertCentsToReal(Number(customer.data.SaldoMonetario)),
      );
    }
    if (customer.data.Fidelizado) {
      setIsLoyal(true);
    }
  };

  useEffect(() => {
    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });
    StorageService.getItem<ProfileVars>({
      key: StorageServiceKeys.PROFILE,
      isJSON: true,
    }).then((value) => {
      setProfile(value);
    });
  }, []);

  useEffect(() => {
    if (profile && profile.document) {
      setLoading(true);
      getCreditBalance(profile.document);
      setLoading(false);
    }
  }, [profile]);

  return (
    <>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      { !loading ? (
        <CreditsView creditsBalance={creditsBalance} />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
};
