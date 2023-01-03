import AsyncStorage from '@react-native-community/async-storage';
import React, { Fragment, useEffect, useState } from 'react';
import {
  ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import { MyCashbackAPI } from '../../../my-cashback/api/MyCashbackAPI';
import {
  CashbackHttpUrl,
  GetTokenResponse,
} from '../../api/MyCreditsAPI';
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
        },
      );
      setToken(data.data.token);
    }
  };

  return (
    <>
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
    </>
  );
};
