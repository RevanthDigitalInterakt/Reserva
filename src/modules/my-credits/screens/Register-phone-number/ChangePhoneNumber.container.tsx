import React, { Fragment, useEffect, useState } from 'react';
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import { ProfileVars } from '../../../../graphql/profile/profileQuery';
import { ChangePhoneNumberView } from './ChangePhoneNumber.view';
import {
  CashbackHttpUrl,
  MyCashbackAPI,
} from '../../../my-cashback/api/MyCashbackAPI';

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

  const handleNavigateToRegisterPhoneNumber = () => {
    navigateToRegisterPhoneNumber();
  };

  const handleNavigateToConfirmPhone = async () => {
    const date = new Date();
    // add 5 minute to current date
    date.setMinutes(date.getMinutes() + 2);
    const tomorrow = date.toISOString();

    if (profile.document) {
      setLoadingToken(true);
      const { data } = await MyCashbackAPI.post(
        `${CashbackHttpUrl.GetToken}${profile.document}/authenticate`,
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
