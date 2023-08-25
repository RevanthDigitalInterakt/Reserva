import React, { useCallback, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import IsTestingModal from '../../modules/Profile/Components/IsTestingModal';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { KEYBOARD_VERTICAL_OFFSET_VALUE } from './static/editProfile.defaultValues';
import { editProfileStyles as Styles } from './styles/editProfile.styles';
import { getBehaviorValue } from '../../utils/getBehaviorValue';
import type {
  IModalStateSchema,
  TEditProfileProps,
  TModalStateKeys,
} from './interfaces/editProfile';
import ReviewYourDataComponent from './components/ReviewYourData/ReviewYourDataComponent';
import FormEditProfileComponent from './components/FormEditProfile/FormEditProfileComponent';
import { Box } from '../../components/Box/Box';
import { usePageLoadingStore } from '../../zustand/usePageLoadingStore/usePageLoadingStore';

function EditProfileRefactor({ route }: TEditProfileProps) {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState<boolean>(true);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const [modalsState, setModalsState] = useState<IModalStateSchema>({
    testingModal: {
      show: false,
      parans: {},
    },
    changeFileModal: {
      show: false,
      parans: {},
    },
  });

  const handleToggleModalState = useCallback((key: TModalStateKeys): void => {
    setModalsState((oldValue: IModalStateSchema) => ({
      ...oldValue,
      [key]: {
        ...oldValue[key],
        show: !oldValue[key].show,
      },
    }));
  }, []);

  const handleTopBarGoBackButton = useCallback((): void => {
    if (route.params?.isRegister) {
      navigation.navigate('Home');
      return;
    }
    navigation.goBack();
  }, [route.params?.isRegister]);

  const handleToogleLoading = useCallback((newLoadingValue: boolean = false): void => {
    setLoading(newLoadingValue);
  }, []);

  useEffect(() => {
    if (!isLoading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [isLoading, onFinishLoad, startLoadingTime]);

  return (
    <SafeAreaView style={Styles.safeArea}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET_VALUE}
        behavior={getBehaviorValue(Platform.OS)}
      >
        <TopBarBackButton
          loading={isLoading}
          backButtonPress={handleTopBarGoBackButton}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={Styles.fullHeight}
        >
          <Box alignContent="flex-start" pt="xs" paddingX="xxxs" pb="xxl">
            <IsTestingModal
              isVisible={modalsState.testingModal.show}
              setIsVisible={() => handleToggleModalState('testingModal')}
            />

            {route.params?.isRegister && <ReviewYourDataComponent />}

            <FormEditProfileComponent
              showChangeFileModal={modalsState.changeFileModal.show}
              handleModal={(key) => handleToggleModalState(key)}
              isRegister={route.params?.isRegister}
              handleToogleLoading={handleToogleLoading}
            />
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default EditProfileRefactor;
