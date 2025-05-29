import React, { useCallback, useEffect, useState } from 'react';

import EventProvider from '../../../../utils/EventProvider';
import { defaultBrand } from '../../../../utils/defaultWBrand';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import {
  CashbackHttpUrl,
  MyCreditsAPI,
  type GetCustomerResponse,
} from '../../api/MyCreditsAPI';
import { CreditsView } from './Credits.view';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

interface CreditsContainerProps {
  navigateBack: () => void;
}

export function CreditsContainer({ navigateBack }: CreditsContainerProps) {
  const [creditsBalance, setCreditsBalance] = useState<number>(0);
  const { profile } = useAuthStore(['profile']);

  const convertCentsToReal = (cents: number) => cents / 100;

  const getCreditBalance = useCallback(async () => {
    if (!profile?.document) {
      return;
    }
    try {
      const customer = await MyCreditsAPI.get<GetCustomerResponse>(
        CashbackHttpUrl.GetCustomer,
        { cpf: profile?.document },
      );

      if (customer.data.SaldoMonetario) {
        setCreditsBalance(
          convertCentsToReal(Number(customer.data.SaldoMonetario)),
        );
      }
    } catch (error) {
      ExceptionProvider.captureException(error, "getCreditBalance - CreditsContainer");
    }
  }, [profile]);

  useEffect(() => {
    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });
  }, []);

  useEffect(() => {
    getCreditBalance();
  }, [getCreditBalance]);

  return (
    <>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      <CreditsView creditsBalance={creditsBalance} />
    </>
  );
}
