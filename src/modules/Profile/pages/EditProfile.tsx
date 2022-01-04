import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';
import { useNavigation } from '@react-navigation/native';
import { addHours, format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import {
  BackHandler,
  KeyboardAvoidingView,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Modal from 'react-native-modal';
import OneSignal from 'react-native-onesignal';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Icon,
  TextField,
  Typography,
} from 'reserva-ui';
import { subscribeNewsLetter } from '../../../graphql/profile/newsLetter';
import {
  ProfileCustomFieldsInput,
  profileMutation,
  profileQuery,
  ProfileQuery,
} from '../../../graphql/profile/profileQuery';
import { FirebaseService } from '../../../shared/services/FirebaseService';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

export const EditProfile: React.FC<{
  title: string;
}> = ({ children, title }) => {
  const navigation = useNavigation();
  const [subscribed, setSubscribed] = useState(false);
  const [tokenOneSignal, setTokenOneSignal] = useState('');
  const [userData, setUserData] = useState<ProfileQuery>({
    userId: '',
    firstName: '',
    lastName: '',
    fullName: '',
    email: '',
    document: '',
    birthDate: '',
    homePhone: '',
  });
  const { loading, error, data, refetch } = useQuery(profileQuery);
  const [
    updateNewsLetter,
    { data: NewsLetterData, loading: newsLetterLoading },
  ] = useMutation(subscribeNewsLetter);

  const [updateUserdata, { data: updateData, loading: updateLoading }] =
    useMutation(profileMutation);

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const [profileImagePath, setProfileImagePath] = useState<any>();
  const firebaseRef = new FirebaseService();

  useEffect(() => {
    OneSignal.getDeviceState().then((deviceState: any) => {
      setTokenOneSignal(deviceState.userId);
    });
  }, []);

  useEffect(() => {
    if (data) {
      setUserData({
        userId: data?.profile?.userId,
        firstName: data?.profile?.firstName || '',
        lastName: data?.profile?.lastName || '',
        fullName: data?.profile?.firstName
          ? `${data?.profile?.firstName} ${data?.profile?.lastName}`
          : '',
        email: data?.profile?.email || '',
        document: data?.profile?.document || '',
        birthDate:
          data?.profile?.birthDate &&
          format(
            addHours(new Date(Date.parse(data.profile.birthDate)), 3),
            'dd/MM/yyyy'
          ),
        homePhone: data?.profile?.homePhone || '',
      });
      setSubscribed(
        data?.profile?.customFields.find(
          (x: any) => x.key == 'isNewsletterOptIn'
        ).value === 'true' || subscribed
      );
      setProfileImagePath(
        data?.profile?.customFields.find(
          (x: any) => x.key == 'profileImagePath'
        ).value || null
      );
    }
  }, [data]);

  useEffect(() => {
    console.log('DATA SALVA :::>>>', data?.profile);
  }, [data]);

  useEffect(() => {
    async function getToken() {
      await AsyncStorage.getItem('@RNAuth:cookie').then((value) => {
        console.log('Token: ', value);
      });
      await AsyncStorage.getItem('@RNAuth:typeLogin').then((value) => {
        console.log('typeLogin: ', value);
      });
      await AsyncStorage.getItem('@RNAuth:lastLogin').then((value) => {
        console.log('lastLogin: ', value);
      });
    }
    getToken();
  }, []);

  useEffect(() => {
    if (updateData) {
      refetch();

      if (!loading) navigation.goBack();
    }
  }, [updateData]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  const saveUserData = () => {
    const splittedBirthDate = userData.birthDate?.split('/');
    const [firstName, ...rest] = userData.fullName.trim().split(' ');
    const lastName = rest.join(' ');
    const newPhone = userData.homePhone;
    const user = {
      firstName,
      lastName,
      email: userData.email,
      document: userData.document.replace(/[^\d]+/g, ''),
      birthDate: splittedBirthDate?.reverse().join('-'),
      homePhone: newPhone.replace(/[^\d\+]+/g, ''),
    };

    const customField: ProfileCustomFieldsInput[] = [
      {
        key: 'isNewsletterOptIn',
        value: `${subscribed}`,
      },
      {
        key: 'documentType',
        value: 'cpf',
      },
      {
        key: 'profileImagePath',
        value: `${profileImagePath}`,
      },
    ];

    if (user.birthDate === '') {
      user.birthDate = null;
    }

    updateUserdata({
      variables: {
        fields: user,
        customFields: customField,
      },
    });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          }
        );

        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
      }
      return false;
    } else return true;
  };

  /**
   * Function delete image profile
   * @returns {any}
   */
  const deleteImageProfile = () => {
    firebaseRef.deleteFS(`${profileImagePath}`);
  };

  const handleChooseGallery = async () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 550,
    };

    await launchImageLibrary(options, async (response) => {
      let isCameraPermitted = await requestCameraPermission();
      let isStoragePermitted = await requestExternalWritePermission();
      if (isCameraPermitted && isStoragePermitted) {
        if (response) {
          if (response.didCancel) {
            console.log('Usuário cancelou a seleção');
          } else if (response.errorMessage) {
            console.log('Ocorreu um erro.', response.errorMessage);
          } else {
            const photoFile = {
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: 'image/jpeg',
            };

            if (file) {
              deleteImageProfile();
            }
            setFile(photoFile.uri);

            firebaseRef.createFS(photoFile).then((value) => {
              console.log('Foto salva', value);
              setProfileImagePath(value);
            });
          }
        }
      }
    });
    setShowModalProfile(false);
  };

  const handleChooseCamera = async () => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      const options = {
        mediaType: 'photo',
        saveToPhotos: true,
        includeExtra: true,
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
        cameraType: 'front',
        selectionLimit: 1,
      };

      await launchCamera(options, async (response) => {
        if (response) {
          if (response.didCancel) {
            console.log('Usuário cancelou a seleção');
          } else if (response.errorMessage) {
            console.log('Ocorreu um erro.', response.errorMessage);
          } else {
            const photoFile = {
              uri: response.assets[0].uri,
              name: response.assets[0].fileName,
              type: 'image/jpeg',
            };
            if (file) {
              deleteImageProfile();
            }

            setFile(photoFile.uri);

            firebaseRef.createFS(photoFile).then((value) => {
              console.log('Foto salva', value);
              setProfileImagePath(value);
            });
          }
        }
      });
    }
    setShowModalProfile(false);
  };

  const updateImageUrl = () => {
    firebaseRef.getUrlFS(`${profileImagePath}`).then((value) => {
      setFile(value);
    });
  };

  useEffect(() => {
    if (file !== null) {
      updateImageUrl();
    }
  }, []);

  useEffect(() => {
    updateImageUrl();
  }, [profileImagePath]);

  const handleCopyToken = () => {
    Clipboard.setString(tokenOneSignal);
  };

  const styles = StyleSheet.create({
    safeArea: {
      justifyContent: 'space-between',
      flex: 1,
      backgroundColor: 'white',
    },
    modalProfile: {
      flex: 1,
      position: 'absolute',
      alignSelf: 'flex-end',
      width: '100%',
      bottom: 0,
    },
    boxTouchable: {
      flexDirection: 'row',
      alignContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        enabled
        keyboardVerticalOffset={80}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TopBarBackButton
          loading={loading || updateLoading || newsLetterLoading}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ height: '100%' }}
        >
          <Box alignContent="flex-start" pt="xs" paddingX="xxxs" pb="xxl">
            <Modal
              onBackdropPress={() => setShowModalProfile(false)}
              isVisible={showModalProfile}
              style={styles.modalProfile}
            >
              <Box bg="white" p="xxxs">
                <Box
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography
                      fontFamily="reservaSerifRegular"
                      fontSize={20}
                    />
                  </Box>
                  <Button
                    hitSlop={{
                      top: 30,
                      bottom: 30,
                      right: 30,
                      left: 30,
                    }}
                    onPress={() => setShowModalProfile(false)}
                    variant="icone"
                    icon={<Icon size={12} name="Close" />}
                  />
                </Box>
                <Box mt="xxs" mb="micro">
                  <Typography fontFamily="reservaSansMedium" fontSize={14}>
                    Escolha uma das opções abaixo:
                  </Typography>
                </Box>

                <Box mt="xxs" mb="micro">
                  <TouchableOpacity onPress={handleChooseCamera}>
                    <Box style={styles.boxTouchable}>
                      <Icon name="Cam" size={20} mr="micro" />
                      <Typography fontFamily="reservaSansMedium" fontSize={14}>
                        Tirar uma foto
                      </Typography>
                    </Box>
                  </TouchableOpacity>
                </Box>

                <Divider variant="fullWidth" />

                <Box mt="micro" mb="micro">
                  <TouchableOpacity onPress={handleChooseGallery}>
                    <Box style={styles.boxTouchable}>
                      <Icon name="Image" size={20} mr="micro" />
                      <Typography fontFamily="reservaSansMedium" fontSize={14}>
                        Buscar na galeria
                      </Typography>
                    </Box>
                  </TouchableOpacity>
                </Box>

                <Divider variant="fullWidth" />

                <Box mt="micro" mb="micro">
                  <TouchableOpacity
                    onPress={() => {
                      deleteImageProfile();
                      setFile(null);
                      setShowModalProfile(false);
                    }}
                  >
                    <Box style={styles.boxTouchable}>
                      <Icon name="Trash" size={20} mr="micro" />
                      <Typography
                        style={{ color: '#EF1E1E' }}
                        fontFamily="reservaSansMedium"
                        fontSize={14}
                      >
                        Excluir foto atual
                      </Typography>
                    </Box>
                  </TouchableOpacity>
                </Box>
              </Box>
            </Modal>
            <Box alignItems="center">
              {file === null ? (
                <Avatar onPress={() => setShowModalProfile(true)} buttonEdit />
              ) : (
                <Avatar
                  imageSource={{ uri: file }}
                  onPress={() => setShowModalProfile(true)}
                  buttonEdit
                />
              )}
              <Box
                justifyContent="flex-start"
                alignItems="flex-start"
                marginTop="micro"
              >
                <Button
                  inline
                  onPress={() => {
                    navigation.navigate('EditPassword', {
                      email: userData.email,
                    });
                  }}
                  title="Alterar senha"
                >
                  <Typography
                    style={{ textDecorationLine: 'underline' }}
                    fontSize={13}
                    fontFamily="nunitoRegular"
                  >
                    Alterar senha
                  </Typography>
                </Button>
              </Box>
            </Box>

            <Box mt="xxxs">
              <Box mb="xxs">
                <TextField
                  label="Digite seu nome completo"
                  value={userData.fullName}
                  onChangeText={(text) => {
                    // const newFullName = (userData.fullName = text);
                    // const firstName = newFullName
                    //   .split(' ')
                    //   .slice(0, 1)
                    //   .join(' ');
                    // const lastName = newFullName.split(' ').slice(1).join(' ');
                    setUserData({
                      ...userData,
                      fullName: text,
                    });
                  }}
                  iconRight={
                    <Box ml="nano">
                      <Icon
                        color="preto"
                        name="Check"
                        size={18}
                        marginX="micro"
                      />
                    </Box>
                  }
                />
              </Box>

              <Box mb="xxs">
                <TextField
                  style={{ color: '#8A8C8E' }}
                  editable={false}
                  label="Digite seu e-mail"
                  value={userData.email}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ email: text } });
                  }}
                />
              </Box>

              <Box mb="xxs">
                <TextField
                  keyboardType="number-pad"
                  label="Digite seu CPF/CNPJ"
                  value={userData.document}
                  maskType="cpf"
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ document: text } });
                  }}
                  iconRight={
                    <Box ml="nano">
                      <Icon
                        color="preto"
                        name="Check"
                        size={18}
                        marginX="micro"
                      />
                    </Box>
                  }
                />
              </Box>

              <Box mb="xxs">
                <TextField
                  keyboardType="number-pad"
                  label="Digite sua data de nascimento (opcional)"
                  maskType="custom"
                  maskOptions={{
                    mask: '99/99/9999',
                  }}
                  value={userData.birthDate}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ birthDate: text } });
                  }}
                />
              </Box>

              <Box mb="nano">
                <TextField
                  maskType="custom"
                  maskOptions={{
                    mask: '+55 (99) 9 9999-9999',
                  }}
                  label="Telefone"
                  value={userData.homePhone}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ homePhone: text } });
                  }}
                />
              </Box>
              <Box mb="sm" mt="sm">
                <TouchableOpacity onPress={() => handleCopyToken()}>
                  <Typography>{tokenOneSignal}</Typography>
                </TouchableOpacity>
              </Box>

              <Box mb="xs" mt="micro" flexDirection="row">
                <Checkbox
                  color="dropDownBorderColor"
                  selectedColor="preto"
                  width="100%"
                  // checked={data?.receiveEmail === "yes"}
                  checked={subscribed}
                  onCheck={async () => {
                    const { data } = await updateNewsLetter({
                      variables: {
                        email: userData.email,
                        isNewsletterOptIn: !subscribed,
                      },
                    });
                    if (data.subscribeNewsletter) setSubscribed(!subscribed);
                  }}
                  optionName="Desejo receber e-mails com promoções das marcas Reserva."
                />
              </Box>

              <Box mb="nano" justifyContent="space-between" flexDirection="row">
                <Box width={1 / 2} paddingRight="nano">
                  <Button
                    title="CANCELAR"
                    variant="primarioEstreitoOutline"
                    inline
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                </Box>
                <Box paddingLeft="nano" width={1 / 2}>
                  <Button
                    title="SALVAR"
                    variant="primarioEstreito"
                    inline
                    onPress={saveUserData}
                    disabled={updateLoading}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
