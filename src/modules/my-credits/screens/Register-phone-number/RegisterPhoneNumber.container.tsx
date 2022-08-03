import React, { Fragment, useEffect, useState, useRef } from 'react';

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import { ProfileVars } from '../../../../graphql/profile/profileQuery';
import { RegisterPhoneNumberView } from './RegisterPhoneNumber.view';
import firestore from '@react-native-firebase/firestore';
import {
  CashbackHttpUrl,
  MyCashbackAPI,
} from '../../../my-cashback/api/MyCashbackAPI';
import {
  profileQuery,
  profileMutation,
} from '../../../../graphql/profile/profileQuery';
import { useLazyQuery, useMutation } from '@apollo/client';

interface RegisterPhoneNumberContainerProps {
  profile: ProfileVars;
  isChangeNumber?: boolean;
  confirmPhone?: boolean;
  navigateBack: () => void;
  navigateToError: () => void;
  navigateToNumberRegisteredSuccessfully: () => void;
}

export const RegisterPhoneNumberContainer = ({
  profile,
  isChangeNumber,
  confirmPhone,
  navigateBack,
  navigateToError,
  navigateToNumberRegisteredSuccessfully,
}: RegisterPhoneNumberContainerProps) => {
  const [phone, setPhone] = useState('');
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');
  const [openConfirmCodeSection, setOpenConfirmCodeSection] = useState(false);
  const [loadingToken, setLoadingToken] = useState(false);
  const [showCodeError, setShowCodeError] = useState(false);
  const [timerCode, setTimerCode] = useState(60);
  const [startChronometer, setStartChronometer] = useState(false);
  const [phoneInvalid, setPhoneInvalid] = useState<boolean>(false);
  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });
  const [{ data: dataProfile, loadingProfile }, setDataProfile] = useState({
    data: null,
    loadingProfile: true,
  });
  const [updateUserData] = useMutation(profileMutation);

  useEffect(() => {
    getProfile().then((response) => {
      setDataProfile({
        data: response.data,
        loadingProfile: false,
      });
    });
  }, []);

  const countRef = useRef(null);

  useEffect(() => {
    if (startChronometer) {
      if (timerCode > 0) {
        countRef.current = setInterval(() => {
          setTimerCode((timerPix) => timerPix - 1);
        }, 1000);
        return () => clearInterval(countRef.current);
      }
    }
  }, [startChronometer === true, timerCode]);

  useEffect(() => {
    if (confirmPhone) {
      setStartChronometer(true);
    }
  }, [confirmPhone]);

  const formatTime = () => {
    const getSeconds = `0${timerCode % 60}`.slice(-2);
    const minutes = `${Math.floor(timerCode / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    return `${getMinutes}:${getSeconds}`;
  };

  const handleRegisterPhoneNumber = async () => {
    const date = new Date();
    // add 5 minute to current date
    date.setMinutes(date.getMinutes() + 1);
    const tomorrow = date.toISOString();
    const newPhone = confirmPhone
      ? profile?.homePhone.split('+')[1]
      : `55${phone.replace(/[^\d\+]+/g, '')}`;

    if (dataProfile?.profile?.document) {
      setLoadingToken(true);
      const { data } = await MyCashbackAPI.post(
        `${CashbackHttpUrl.GetToken}${dataProfile?.profile?.document}/authenticate`,
        {
          type: 'sms',
          expire_date: tomorrow,
          phone: newPhone,
        }
      );
      if (data) {
        setLoadingToken(false);
        setOpenConfirmCodeSection(true);
      }
    }
    setTimerCode(60);
    setStartChronometer(true);
    setOpenConfirmCodeSection(true);
  };

  const handleSavePhone = async () => {
    if (!phoneInvalid) {
      const user = {
        firstName: dataProfile?.profile?.firstName,
        lastName: dataProfile?.profile?.lastName,
        email: dataProfile?.profile?.email,
        document: dataProfile?.profile?.document,
        birthDate: dataProfile?.profile?.birthDate,
        homePhone: `+55${phone.replace(/[^\d\+]+/g, '')}`,
        gender: dataProfile?.profile?.gender,
      };
      await updateUserData({
        variables: {
          fields: user,
        },
      });
    }
  };

  useEffect(() => {
    let validatePhone =
      /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/;
    if (phone.length === 15) {
      phone.match(validatePhone)
        ? (setPhoneInvalid(false), handleSavePhone())
        : setPhoneInvalid(true);
    } else if (phone.length < 15) {
      setPhoneInvalid(false);
    }
  }, [phone]);

  const saveDataInFirestore = async () => {
    const virifyPhoneCollection = firestore().collection('verify-phone');
    const user = await virifyPhoneCollection
      .where('userId', '==', profile.userId)
      .get();
    if (user.size > 0) {
      virifyPhoneCollection
        .doc(user.docs[0].id)
        .update({
          date: firestore.Timestamp.now().toDate(),
        })
        .then((e) => {
          navigateToNumberRegisteredSuccessfully();
        });
    } else {
      const response = await virifyPhoneCollection.add({
        email: profile.email,
        userId: profile.userId,
        date: firestore.Timestamp.now().toDate(),
      });
      if (response) {
        navigateToNumberRegisteredSuccessfully();
      }
    }
  };

  const handleConfirmCodeSection = async () => {
    try {
      const response = await MyCashbackAPI.post(
        `${CashbackHttpUrl.GetToken}${dataProfile?.profile?.document}/validate_authentication`,
        {
          type: 'sms_token',
          token: code,
        }
      );
      if (response.status === 204) {
        saveDataInFirestore();
        setShowCodeError(false);
      }
    } catch (error) {
      setShowCodeError(true);
    }
  };

  const resendNewCode = () => {
    handleRegisterPhoneNumber();
  };

  return (
    <>
      <TopBarBackButton
        loading={loadingToken}
        showShadow
        backButtonPress={navigateBack}
      />
      <RegisterPhoneNumberView
        profile={profile}
        isChangeNumber={isChangeNumber}
        confirmPhone={confirmPhone}
        valuePhone={phone}
        valueCode={code}
        onChageCode={(code) => setCode(code)}
        onChangeText={(phone) => setPhone(phone)}
        timerCode={formatTime()}
        showCodeError={showCodeError}
        registerPhoneNumber={handleRegisterPhoneNumber}
        confirmCodeSection={handleConfirmCodeSection}
        resendNewCode={resendNewCode}
        openConfirmCodeSection={openConfirmCodeSection}
        phoneInvalid={phoneInvalid}
      />
    </>
  );
};
