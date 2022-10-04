import { useLazyQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import {
  profileQuery,
  ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import React, { Fragment, useEffect, useState } from 'react';
import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import { MyCashbackAPI } from '../../../../modules/my-cashback/api/MyCashbackAPI';
import {
  CashbackHttpUrl,
  GetTokenResponse,
} from '../../../my-credits/api/MyCreditsAPI';
import { CashbackInStoreView } from './CashbackInStore.view';
import { useAuth } from '../../../../context/AuthContext';
interface CashbackInStoreContainerProps {
  costumerDocument: string;
  navigateBack: () => void;
  navigateToError: () => void;
}

export const CashbackInStoreContainer = ({
  costumerDocument,
  navigateBack,
  navigateToError,
}: CashbackInStoreContainerProps) => {
  const { getProfile } = useAuth();
  const [token, setToken] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [termsIsAccepted, setTermsIsAccepted] = useState<boolean>(false);
  const [dataProfile, setDataProfile] = useState<ProfileVars>();

  useEffect(() => {
    getProfile().then((x: ProfileVars) => setDataProfile(x));
  }, []);

  const termAndConditionsIsAccepted = async () => {
    const isAccepted = await AsyncStorage.getItem('@RNAuth:terms');
    console.log('isAccepted', isAccepted);
    setTermsIsAccepted(isAccepted === 'true');
  };

  const acceptTermsAndConditions = async () => {
    await AsyncStorage.setItem('@RNAuth:terms', 'true');

    if (modalVisible) {
      setTermsIsAccepted(true);
    } else {
      setTermsIsAccepted(!termsIsAccepted);
    }
    setModalVisible(false);
  };

  useEffect(() => {
    // termAndConditionsIsAccepted();
  }, []);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const generateToken = async () => {
    const date = new Date();
    // add 5 minute to current date
    date.setMinutes(date.getMinutes() + 5);
    const tomorrow = date.toISOString();

    if (dataProfile?.document) {
      const { data } = await MyCashbackAPI.post<GetTokenResponse>(
        `${CashbackHttpUrl.GetToken}${dataProfile?.document}/authenticate`,
        {
          type: 'qrcode',
          expire_date: tomorrow,
        }
      );
      setToken(data.data.token);
    }
  };

  return (
    <Fragment>
      <TopBarBackButton
        loading={false}
        showShadow
        backButtonPress={navigateBack}
      />
      <CashbackInStoreView
        token={token}
        toggleModal={toggleModal}
        modalVisible={modalVisible}
        generateToken={generateToken}
        termsIsAccepted={termsIsAccepted}
        acceptTermsAndConditions={acceptTermsAndConditions}
      />
    </Fragment>
  );
};
