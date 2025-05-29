import React, { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import {
  profileQuery,
  ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { ChangePhoneNumberView } from './ChangePhoneNumber.view';
import {
  CashbackHttpUrl,
  MyCashbackAPI,
} from '../../../my-cashback/api/MyCashbackAPI';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

interface ChangePhoneNumberContainerProps {
  profile: ProfileVars;
  navigateBack: () => void;
  navigateToRegisterPhoneNumber: () => void;
  navigateToConfirmPhone: () => void;
}

export function ChangePhoneNumberContainer({
  profile,
  navigateBack,
  navigateToRegisterPhoneNumber,
  navigateToConfirmPhone,
}: ChangePhoneNumberContainerProps) {
  const [loadingToken, setLoadingToken] = React.useState(false);
  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });
  const [{ data: dataProfile }, setDataProfile] = useState({
    data: null,
    loadingProfile: true,
  });

  useEffect(() => {
    getProfile().then((response) => {
      setDataProfile({
        data: response.data,
        loadingProfile: false,
      });
    });
  }, []);

  const handleNavigateToRegisterPhoneNumber = () => {
    navigateToRegisterPhoneNumber();
  };

  function toIsoString(date) {
    const tzo = -date.getTimezoneOffset();
    const dif = tzo >= 0 ? '+' : '-';
    const pad = function (num) {
      return (num < 10 ? '0' : '') + num;
    };

    // Adiciona 10 minutos
    date.setMinutes(date.getMinutes() + 10);

    return `${date.getFullYear()
    }-${pad(date.getMonth() + 1)
    }-${pad(date.getDate())
    }T${pad(date.getHours())
    }:${pad(date.getMinutes())
    }:${pad(date.getSeconds())
    }${dif}${pad(Math.floor(Math.abs(tzo) / 60))
    }:${pad(Math.abs(tzo) % 60)}`;
  }

  const handleNavigateToConfirmPhone = async () => {
    const expiredDate = toIsoString(new Date());

    if (dataProfile?.profile?.document) {
      setLoadingToken(true);
      try {
        const { data } = await MyCashbackAPI.post(
          `${CashbackHttpUrl.GetToken}${dataProfile?.profile?.document}/authenticate`,
          {
            type: 'sms',
            expire_date: expiredDate,
            phone: profile?.homePhone?.split('+')[1],
          },
        );
        if (data) {
          setLoadingToken(false);
          navigateToConfirmPhone();
        }
      } catch (error) {
        ExceptionProvider.captureException(error, "handleNavigateToConfirmPhone - ChangePhoneNumberContainer");
      }
    }
  };
  return (
    <>
      <TopBarBackButton
        loading={loadingToken}
        showShadow
        backButtonPress={navigateBack}
      />
      <ChangePhoneNumberView
        profile={profile}
        navigateToRegisterPhoneNumber={handleNavigateToRegisterPhoneNumber}
        navigateToConfirmPhone={handleNavigateToConfirmPhone}
        disableButton={loadingToken}
      />
    </>
  );
}
