import React, { Fragment, useEffect, useState } from "react";

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { RegisterPhoneNumberView } from "./RegisterPhoneNumber.view";
import firestore from '@react-native-firebase/firestore';
import { CashbackHttpUrl, MyCashbackAPI } from "../../../my-cashback/api/MyCashbackAPI";

interface RegisterPhoneNumberContainerProps {
    profile: ProfileVars;
    isChangeNumber?: boolean;
    confirmPhone?: boolean;
    navigateBack: () => void;
    navigateToError: () => void;
    navigateToNumberRegisteredSuccessfully: () => void;
}

export const RegisterPhoneNumberContainer = (
    {
        profile,
        isChangeNumber,
        confirmPhone,
        navigateBack,
        navigateToError,
        navigateToNumberRegisteredSuccessfully,
    }: RegisterPhoneNumberContainerProps
) => {
    const [phone, setPhone] = useState('');
    const [token, setToken] = useState('');
    const [code, setCode] = useState('');
    const [openConfirmCodeSection, setOpenConfirmCodeSection] = React.useState(false);
    const [loadingToken, setLoadingToken] = React.useState(false);

    const handleRegisterPhoneNumber = async () => {
        const date = new Date();
        // add 5 minute to current date
        date.setMinutes(date.getMinutes() + 5);
        const tomorrow = date.toISOString();

        if (profile.document) {
            setLoadingToken(true);
            const { data } = await MyCashbackAPI.post(
                `${CashbackHttpUrl.GetToken}${profile.document}/authenticate`,
                {
                    type: "sms",
                    expire_date: tomorrow,
                    phone: `55${phone.replace(/[^\d\+]+/g, '')}`
                }
            );
            if (data) {
                setLoadingToken(false);
                setOpenConfirmCodeSection(true);

            }
        }
        setOpenConfirmCodeSection(true);
    }

    useEffect(() => {
        console.log('phone::>', `55${phone.replace(/[^\d\+]+/g, '')}`)
    }, [phone]);

    useEffect(() => {
        console.log('token::>', token)
    }, [token]);

    useEffect(() => {
        console.log('codee::>', code)
    }, [code]);

    const saveDataInFirestore = async () => {
        const virifyPhoneCollection = firestore().collection('verify-phone');
        const user = await virifyPhoneCollection.where('userId', '==', profile.userId).get();
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
    }
    const handleConfirmCodeSection = async () => {
        const response = await MyCashbackAPI.post(
            `${CashbackHttpUrl.GetToken}${profile.document}/validate_authentication`,
            {
                type: "sms_token",
                token: code
            }
        );
        if (response.status === 204) {
            saveDataInFirestore();
        }
    }

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
                registerPhoneNumber={handleRegisterPhoneNumber}
                confirmCodeSection={handleConfirmCodeSection}
                openConfirmCodeSection={openConfirmCodeSection}
            />
        </>
    );
};
