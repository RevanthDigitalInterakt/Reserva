import React, {
  useCallback, useEffect, useState,
} from 'react';
import { useFormik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import FullNameIcon from './Icons/FullNameIcon';
import EmailIcon from './Icons/EmailIcon';
import CPFIcon from './Icons/CPFIcon';
import GenderInput, { type TGender } from './components/GenderInput/GenderInput';
import BirthDateIcon from './Icons/BirthDateIcon';
import PhoneNumberIcon from './Icons/PhoneNumberIcon';
import UserProfilePictureComponent from '../UserProfilePicture/UserProfilePictureComponent';
import { FormEditProfileInitialValues } from './static/formEditProfile.initialValues';
import ChangeFileModal, { IFile } from '../ModalChangeFile/ChangeFileModal';
import type { TModalStateKeys } from '../../interfaces/editProfile';
import TesterAreaViewComponent from '../TesterAreaView/TesterAreaViewComponent';
import NewsLetterComponent from '../Newsletter/NewsLetterComponent';
import DeleteAccountComponent from '../DeleteAccount/DeleteAccountComponent';
import SubmitingContentComponent from '../SubmitingContent/SubmitingContentComponent';
import EditProfileSchema from './yup/schema/editProfile.schema';
import
{
  formatAndSearcFieldValue,
  formatDate,
} from '../../../../utils/GenericFormats';
import { genderEngToPt, type TGenderEngKeys } from './static/GenderTranslate';
import
{
  generateCustonFieldsToPayloadUserData,
  generatePayloadToUploadUserData,
  type IUserDataUpload,
} from '../../../../utils/updateUserData';
import { FirebaseService } from '../../../../shared/services/FirebaseService';
import type { IFormEditProfileSchema } from './interfaces/formEditProfile';
import { useProfileLazyQuery, useProfileUpdateMutation } from '../../../../base/graphql/generated';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { Box } from '../../../../components/Box/Box';
import { TextField } from '../../../../components/TextField/TextField';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { useNavigationToDelivery } from '../../../../hooks/useNavigationToDelivery';

interface IFormEditProfileComponentProps {
  isRegister: boolean;
  handleModal: (key: TModalStateKeys) => void;
  showChangeFileModal: boolean;
  handleToogleLoading: (newLoadingValue?: boolean) => void;
}

function FormEditProfileComponent({
  isRegister,
  handleModal,
  showChangeFileModal,
  handleToogleLoading,
}: IFormEditProfileComponentProps): JSX.Element {
  const [isUserTest, setIsUserTest] = useState<boolean>(false);
  const { deleteFS, createFS } = new FirebaseService();
  const navigation = useNavigation();
  const { getObject } = useRemoteConfig();
  const { profile, onGetProfile } = useAuthStore(['profile', 'onGetProfile']);

  const [getProfileUserData] = useProfileLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: 'cache-and-network',
  });

  const [updateUserdata] = useProfileUpdateMutation({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const { handleNavigateToDelivery } = useNavigationToDelivery();

  const handleSubmitForm = useCallback(async (formValues: IFormEditProfileSchema): Promise<void> => {
    handleToogleLoading(true);

    const userDateUpload: IUserDataUpload = generatePayloadToUploadUserData(formValues);
    let imageRef = formValues.profileImage.initialFilePath || 'null';

    const isUpdateProfileImage = typeof formValues.profileImage.uri !== 'undefined' && formValues.profileImage.uri !== formValues.profileImage.initialFilePath;

    if (isUpdateProfileImage) {
      imageRef = await createFS({
        uri: formValues.profileImage.uri,
      });

      if (formValues.profileImage.initialFilePath) {
        await deleteFS(`${formValues.profileImage.initialFilePath}`);
      }
    }

    const userAcceptTerms = await AsyncStorage.getItem('@user:accepted');

    const customFields = generateCustonFieldsToPayloadUserData({
      userAcceptTerms: userAcceptTerms ? JSON.parse(userAcceptTerms) : false,
      profileImage: imageRef,
      subscribed: formValues.newsLetter,
    });

    await updateUserdata({
      variables: {
        input: {
          ...userDateUpload,
          customFields,
        },
      },
    });

    const profileData = await onGetProfile();

    if (isRegister) {
      handleNavigateToDelivery(profileData);
      return;
    }

    handleToogleLoading(false);
    navigation.goBack();
  }, []);

  const editProfileForm = useFormik<IFormEditProfileSchema>({
    initialValues: FormEditProfileInitialValues,
    validationSchema: EditProfileSchema,
    onSubmit: async (values: IFormEditProfileSchema) => {
      await handleSubmitForm(values);
    },
  });

  const handleChangeFormValue = useCallback(
    <T extends unknown>(
      field: keyof IFormEditProfileSchema,
      value: T,
    ): void => {
      editProfileForm.setFieldValue(field, value);
    },
    [editProfileForm],
  );

  const handleChangeProfileImage = useCallback(
    (file: IFile, resetInitialFilePath: boolean = false): void => {
      editProfileForm.setFieldValue('profileImage', {
        ...file,
        initialFilePath: resetInitialFilePath
          ? undefined : editProfileForm.values.profileImage.initialFilePath,
      });
    },
    [editProfileForm],
  );

  const getIsTesterUser = useCallback(async (userEmail: string) => {
    const emails = getObject('EMAIL_TESTERS');

    setIsUserTest(emails.includes(userEmail));
  }, [getObject]);

  const handleUserDataInitializer = useCallback(async () => {
    try {
      const { data, loading } = await getProfileUserData();
      if (!data) return;

      const {
        profile: {
          id,
          firstName,
          lastName,
          document,
          birthDate,
          gender,
          homePhone,
          customFields,
          email,
        },
      } = data;

      if (!loading) {
        await getIsTesterUser(email || '');

        // Pega o path da imagem no firebase - user/profile/joao.jpg | undefined
        const profileUserField = formatAndSearcFieldValue<undefined>(
          customFields,
          'profileImagePath',
          undefined,
        );

        const newsLetterUser = formatAndSearcFieldValue<boolean>(
          customFields,
          'isNewsletterOptIn',
          false,
        );

        await editProfileForm.setValues({
          id,
          name: firstName ? `${firstName} ${lastName || ''}` : '',
          document: document || '',
          birthDate: birthDate ? formatDate(birthDate) : '',
          gender: gender ? genderEngToPt[gender as TGenderEngKeys] : null,
          cellPhone: homePhone || '',
          profileImage: {
            uri: profileUserField,
            name: '',
            type: '',
            initialFilePath: profileUserField,
          },
          newsLetter: newsLetterUser === 'true',
        });

        handleToogleLoading(false);
      }
    } catch (error) {
      ExceptionProvider.captureException(error, "handleUserDataInitializer - FormEditProfileComponent");
    }
  }, []);

  const handleDeleteProfileImage = useCallback(async () => {
    const isValidInitialFilePath = typeof editProfileForm.values.profileImage.initialFilePath === 'string' && editProfileForm.values.profileImage.initialFilePath.length;
    if (isValidInitialFilePath) {
      await deleteFS(`${editProfileForm.values.profileImage.initialFilePath}`);
    }

    handleChangeProfileImage({
      name: '',
      type: '',
      uri: undefined,
      initialFilePath: undefined,
    }, true);

    handleModal('changeFileModal');
  }, [editProfileForm, handleChangeProfileImage]);

  useEffect(() => {
    (async () => {
      await handleUserDataInitializer();
    })();
  }, []);

  return (
    <>

      <ChangeFileModal
        show={showChangeFileModal}
        handleDeleteProfileImage={handleDeleteProfileImage}
        handleChangeFile={(file: IFile) => handleChangeProfileImage(file)}
        toggleModal={() => handleModal('changeFileModal')}
      />

      {!isRegister && (
        <UserProfilePictureComponent
          toogleModalChangeFile={() => handleModal('changeFileModal')}
          userEmail={profile?.email || ''}
          file={editProfileForm.values.profileImage}
        />
      )}

      <Box mt="xxxs">
        <Box mb="xxs">
          <TextField
            label={editProfileForm.values.name.length ? 'Nome completo' : null}
            accessibilityLabel="formeditprofile_input_name"
            value={editProfileForm.values.name}
            onChangeText={(currentTextValue: string) => handleChangeFormValue<string>('name', currentTextValue)}
            iconRight={
              <FullNameIcon isEmpty={!editProfileForm.values.name.length} />
            }
            placeholder="Digite seu nome completo."
            error={editProfileForm.errors.name}
            touched={!!editProfileForm.errors.name?.length}
          />
        </Box>

        <Box mb="xxs">
          <TextField
            style={{ color: '#8A8C8E' }}
            editable={false}
            accessibilityLabel="formeditprofile_input_email"
            label={profile?.email?.length ? 'E-mail' : null}
            value={profile?.email || ''}
            iconRight={
              <EmailIcon isEmpty={!profile?.email?.length} />
            }
          />
        </Box>

        <Box mb="xxs">
          <TextField
            keyboardType="number-pad"
            label={editProfileForm.values.document.length ? 'CPF' : null}
            value={editProfileForm.values.document}
            accessibilityLabel="formeditprofile_input_document"
            maskType="cpf"
            onChangeText={(currentTextValue: string) => handleChangeFormValue<string>('document', currentTextValue)}
            iconRight={(
              <CPFIcon
                isValid={!editProfileForm.errors.document?.length}
                isEmpty={!editProfileForm.values.document}
              />
            )}
            placeholder="Digite seu CPF"
            error={editProfileForm.errors.document}
            touched={!!editProfileForm.errors.document?.length}
          />
        </Box>

        <GenderInput
          handleSelectGender={
            (currentTextValue: TGender) => handleChangeFormValue<TGender>('gender', currentTextValue)
          }
          currentGender={editProfileForm.values.gender}
        />

        <Box mb="xxs">
          <TextField
            keyboardType="number-pad"
            label={
              editProfileForm.values.birthDate.length
                ? 'Data de nascimento'
                : null
            }
            maskType="custom"
            maskOptions={{
              mask: '99/99/9999',
            }}
            accessibilityLabel="formeditprofile_input_birthDate"
            value={editProfileForm.values.birthDate}
            onChangeText={(currentTextValue: string) => handleChangeFormValue<string>('birthDate', currentTextValue)}
            iconRight={(
              <BirthDateIcon
                isEmpty={!editProfileForm.values.birthDate.length}
              />
            )}
            placeholder="Digite sua data de nascimento"
            error={editProfileForm.errors.birthDate}
            touched={!!editProfileForm.errors.birthDate?.length}
          />
        </Box>

        <Box mb="nano">
          <TextField
            keyboardType="number-pad"
            maskType="custom"
            maskOptions={{
              mask: '+55 (99) 9 9999-9999',
            }}
            accessibilityLabel="formeditprofile_input_cellPhone"
            label={editProfileForm.values.cellPhone ? 'Telefone' : null}
            value={editProfileForm.values.cellPhone}
            onChangeText={(currentTextValue: string) => handleChangeFormValue<string>('cellPhone', currentTextValue)}
            iconRight={(
              <PhoneNumberIcon
                isEmpty={!editProfileForm.values.cellPhone.length}
              />
            )}
            placeholder="Digite seu telefone"
            error={editProfileForm.errors.cellPhone}
            touched={!!editProfileForm.errors.cellPhone?.length}
          />
        </Box>
      </Box>

      {isUserTest && <TesterAreaViewComponent handleToggleModalTesting={() => handleModal('testingModal')} />}

      {!isRegister && (
        <NewsLetterComponent
          value={editProfileForm.values.newsLetter}
          handleToogleNewsLetterState={(currentTextValue: boolean) => handleChangeFormValue<boolean>('newsLetter', currentTextValue)}
          userEmail={profile?.email || ''}
        />
      )}

      {!isRegister && (
        <DeleteAccountComponent userId={editProfileForm.values.id} />
      )}

      <SubmitingContentComponent
        formEditIsValid={!editProfileForm.isValid}
        handleSubmitForm={editProfileForm.handleSubmit}
        isRegister={isRegister}
      />
    </>
  );
}

export default FormEditProfileComponent;
