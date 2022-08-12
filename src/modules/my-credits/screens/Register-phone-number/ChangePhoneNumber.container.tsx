import React, { Fragment, useEffect, useState } from 'react';
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
  profileQuery,
  ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { ChangePhoneNumberView } from './ChangePhoneNumber.view';
import {
  CashbackHttpUrl,
  MyCashbackAPI,
} from '../../../my-cashback/api/MyCashbackAPI';
import { useLazyQuery } from '@apollo/client';

interface ChangePhoneNumberContainerProps {
  profile: ProfileVars;
  navigateBack: () => void;
  navigateToError: () => void;
  navigateToRegisterPhoneNumber: () => void;
  navigateToConfirmPhone: () => void;
}

export const ChangePhoneNumberContainer = ({
  profile,
  navigateBack,
  navigateToError,
  navigateToRegisterPhoneNumber,
  navigateToConfirmPhone,
}: ChangePhoneNumberContainerProps) => {
  const [phone, setPhone] = useState('');
  const [loadingToken, setLoadingToken] = React.useState(false);
  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });
  const [{ data: dataProfile, loadingProfile }, setDataProfile] = useState({
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

  const handleNavigateToConfirmPhone = async () => {
    const date = new Date();
    // add 5 minute to current date
    date.setMinutes(date.getMinutes() + 2);
    const tomorrow = date.toISOString();


    if (dataProfile?.profile?.document) {
      setLoadingToken(true);
      try {
        const { data } = await MyCashbackAPI.post(
          `${CashbackHttpUrl.GetToken}${dataProfile?.profile?.document}/authenticate`,
          {
            type: 'sms',
            expire_date: tomorrow,
            phone: profile.homePhone.split('+')[1],
          }
        );
        if (data) {
          setLoadingToken(false);
          navigateToConfirmPhone();
        }
      } catch (error) {
        console.log('err', error)
      }
    }
  };
  return (
    <Fragment>
      <TopBarBackButton
        loading={loadingToken}
        showShadow
        backButtonPress={navigateBack}
      />
      <ChangePhoneNumberView
        profile={profile}
        navigateToRegisterPhoneNumber={handleNavigateToRegisterPhoneNumber}
        navigateToConfirmPhone={handleNavigateToConfirmPhone}
      />
    </Fragment>
  );
};
