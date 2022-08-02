import React, { Fragment, useEffect } from "react";

import { TopBarBackButton } from '../../../../modules/Menu/components/TopBarBackButton';
import {
    ProfileVars,
} from '../../../../graphql/profile/profileQuery';
import { RegisterPhoneNumberView } from "./RegisterPhoneNumber.view";
import firestore from '@react-native-firebase/firestore';

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

    const handleConfirmCodeSection = async () => {
        console.log('aquuiiiiiiii');
        navigateToNumberRegisteredSuccessfully();

        // const virifyPhoneCollection = firestore().collection('verify-phone');
        // const user = await virifyPhoneCollection.where('userId', '==', profile.userId).get();
        // if (user.size > 0) {
        //     virifyPhoneCollection
        //         .doc(user.docs[0].id)
        //         .update({
        //             date: firestore.Timestamp.now().toDate(),
        //         })
        //         .then((e) => {
        //             console.log('okkk1');
        //             navigateToNumberRegisteredSuccessfully();
        //         });
        // } else {
        //     const response = await virifyPhoneCollection.add({
        //         email: profile.email,
        //         userId: profile.userId,
        //         date: firestore.Timestamp.now().toDate(),
        //     });
        //     if (response) {
        //         console.log('okkk2');
        //         navigateToNumberRegisteredSuccessfully();
        //     }
        // }
    }

    return (
        <>
            <TopBarBackButton
                loading={false}
                showShadow
                backButtonPress={navigateBack}
            />
            <RegisterPhoneNumberView
                profile={profile}
                isChangeNumber={isChangeNumber}
                confirmPhone={confirmPhone}
                confirmCodeSection={handleConfirmCodeSection}
            />
        </>
    );
};
