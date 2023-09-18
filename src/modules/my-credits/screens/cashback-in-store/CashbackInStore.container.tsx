import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
import { MyCashbackAPI } from '../../../my-cashback/api/MyCashbackAPI';
import
{
  CashbackHttpUrl,
  type GetTokenResponse,
} from '../../api/MyCreditsAPI';
import { CashbackInStoreView } from './CashbackInStore.view';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';

interface CashbackInStoreContainerProps {
  navigateBack: () => void;
}

export function CashbackInStoreContainer({ navigateBack }: CashbackInStoreContainerProps) {
  const { profile } = useAuthStore(['profile']);
  const [token, setToken] = useState<string>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [termsIsAccepted, setTermsIsAccepted] = useState<boolean>(false);

  const acceptTermsAndConditions = async () => {
    await AsyncStorage.setItem('@RNAuth:terms', 'true');

    if (modalVisible) {
      setTermsIsAccepted(true);
    } else {
      setTermsIsAccepted(!termsIsAccepted);
    }
    setModalVisible(false);
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const generateToken = async () => {
    const date = new Date();
    // add 5 minute to current date
    date.setMinutes(date.getMinutes() + 5);
    const tomorrow = date.toISOString();

    if (profile?.document) {
      const { data } = await MyCashbackAPI.post<GetTokenResponse>(
        `${CashbackHttpUrl.GetToken}${profile?.document}/authenticate`,
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
}
