import { useMutation, useQuery } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';
import Clipboard from '@react-native-community/clipboard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { addHours, format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
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
import remoteConfig from '@react-native-firebase/remote-config';
import OneSignal from 'react-native-onesignal';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Icon,
  TextField,
  Toggle,
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
import { TopBarCheckoutCompleted } from '../../Menu/components/TopBarCheckoutCompleted';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import { useContentfull } from '../../../context/ContentfullContext';

type Props = StackScreenProps<RootStackParamList, 'EditProfile'>;

export const EditProfile = ({ route }: Props) => {
  const navigation = useNavigation();
  const { isTesting, toggleIsTesting } = useContentfull();
  const { email } = useAuth();
  const { isRegister } = route?.params || false;
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
  const [imageProfile, setImageProfile] = useState<any>(null);
  const [deletePhoto, setDeletePhoto] = useState<boolean>(false);
  const [profileImagePath, setProfileImagePath] = useState<any>();
  const [isTester, setIsTester] = useState<boolean>(false);
  const firebaseRef = new FirebaseService();
  const [loadingProfilePhoto, setLoadingProfilePhoto] =
    useState<boolean>(false);
  useEffect(() => {
    OneSignal.getDeviceState().then((deviceState: any) => {
      setTokenOneSignal(deviceState.userId);
    });
  }, []);
  const [loadingScreen, setLoadingScreen] = useState(false);

  const { addCustomer, orderForm, identifyCustomer } = useCart();

  const [cpfInvalid, setCpfInvalid] = useState(false);

  const [isEmptyFullName, setIsEmptyFullName] = useState(false);
  const [isEmptyBirthDate, setIsEmptyBirthDate] = useState(false);
  const [isEmptyHomePhone, setIsEmptyHomePhone] = useState(false);

  const [labelFullName, setLabelFullName] = useState(null);
  const [labelDocument, setLabelDocument] = useState(null);
  const [labelBirthDate, setLabelBirthDate] = useState(null);
  const [labelPhone, setLabelPhone] = useState(null);

  const getTesters = async () => {
    const testers = await remoteConfig().getValue('EMAIL_TESTERS');
    if (JSON.parse(testers.asString()).includes(data?.profile?.email)) {
      setIsTester(true);
    }
  };

  useEffect(() => {
    setUserData(userData);
    refetch();
  }, []);

  useEffect(() => {
    if (data) {
      setLoadingScreen(true);
      getTesters();
      if (!loading) {
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

        if (isRegister) refetch();

        if (!data?.profile?.lastName) {
          setIsEmptyFullName(true);
          setLabelFullName(null);
        } else {
          setIsEmptyFullName(false);
          setLabelFullName('Nome completo');
        }

        if (!data?.profile?.document) {
          setLabelDocument(null);
          setCpfInvalid(true);
        } else {
          setLabelDocument('CPF');
          setCpfInvalid(false);
        }

        if (!data?.profile?.birthDate) {
          setIsEmptyBirthDate(true);
          setLabelBirthDate(null);
        } else {
          setIsEmptyBirthDate(false);
          setLabelBirthDate('Data de nascimento');
        }

        if (!data?.profile?.homePhone) {
          setIsEmptyHomePhone(true);
          setLabelPhone(null);
        } else {
          setIsEmptyHomePhone(false);
          setLabelPhone('Telefone');
        }
      }
      setLoadingScreen(false);
    }
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
      if (!isRegister) {
        refetch();
        if (!loading) navigation.goBack();
      } else {
        if (!loading) navigation.goBack();
      }
    }
  }, [updateData]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoadingScreen(false);
    }, [])
  );

  const cpfValidate = async (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf == '') return setCpfInvalid(true);

    if (
      cpf.length != 11 ||
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999'
    )
      return setCpfInvalid(true);
    let add = 0;
    let i = 0;
    let rev = 0;
    for (i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return setCpfInvalid(true);

    add = 0;
    for (i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);

    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return setCpfInvalid(true);

    return setCpfInvalid(false);
  };

  const saveUserData = async () => {
    setLoadingScreen(true);
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

    let profileImage = profileImagePath;

    //Deleta a foto antiga do usuário no firebase
    if (imageProfile !== null && profileImagePath !== null) {
      const isDifferent = imageProfile.includes(profileImagePath.split('/')[3]);
      if (!isDifferent) {
        await firebaseRef.deleteFS(`${profileImagePath}`);
      }
    }

    //Deleta a foto antiga do usuário no firebase
    if (deletePhoto && profileImagePath !== null) {
      await firebaseRef.deleteFS(`${profileImagePath}`);
      profileImage = null;
    }

    //Salva uma nova foto do usuário no firebase
    if (imageProfile !== null) {
      if (file !== null) {
        setLoadingProfilePhoto(true);
        profileImage = await firebaseRef.createFS(file);
        setLoadingProfilePhoto(false);
        setProfileImagePath(profileImage);
      }
    }

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
        value: `${profileImage}`,
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

    if (isRegister) {
      if (orderForm) {
        const { clientProfileData, shippingData } = orderForm;
        const hasCustomer =
          clientProfileData &&
          clientProfileData.email &&
          clientProfileData.firstName;

        const hasAddress =
          shippingData && shippingData.availableAddresses.length > 0;

        const addCustomerData = await addCustomer({
          firstName: user?.firstName,
          lastName: user?.lastName,
          document: user?.document,
          documentType: 'cpf',
          phone: user?.homePhone,
        })
          .then(async () => await identifyCustomer(email))
          .then(() => setLoadingScreen(false))
          .then(() => navigation.navigate('DeliveryScreen'));
      }
    }
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

            setFile(photoFile);
            setImageProfile(photoFile.uri);
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

            setFile(photoFile);
            setImageProfile(photoFile.uri);
          }
        }
      });
    }
    setShowModalProfile(false);
  };

  const updateImageUrl = () => {
    if (profileImagePath != null) {
      firebaseRef.getUrlFS(`${profileImagePath}`).then(
        (value) => {
          setImageProfile(value);
        },
        (error) => {
          setProfileImagePath(null);
        }
      );
    }
  };

  const handlerValidationFullName = (text: string) => {
    const [firstName, ...rest] = text.trim().split(' ');
    const lastName = rest.join(' ');
    if (
      text.match(
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi
      ) &&
      !lastName.match(
        /\b[A-Za-zÀ-ú][A-Za-zÀ-ú]+,?\s[A-Za-zÀ-ú][A-Za-zÀ-ú]{2,19}\b/gi
      )
    ) {
      console.log('TRUE ::::::::::::::::::::');
      setIsEmptyFullName(false);
      setLabelFullName('Nome completo');
    } else {
      console.log('false ::::::::::::::::::::');
      setIsEmptyFullName(true);
      setLabelFullName(null);
    }
  };

  const handlerValidationBirthDate = (text: string) => {
    if (
      text.match(
        /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
      )
    ) {
      setIsEmptyBirthDate(false);
      setLabelBirthDate('Data de nascimento');
    } else {
      setIsEmptyBirthDate(true);
      setLabelBirthDate(null);
    }
  };

  const handlerValidationHomePhone = (text: string) => {
    if (
      text.match(
        /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9 \d|[2-9])\d{3})\-?(\d{4}))$/
      )
    ) {
      setIsEmptyHomePhone(false);
      setLabelPhone('Telefone');
    } else {
      setIsEmptyHomePhone(true);
      setLabelPhone(null);
    }
  };

  useEffect(() => {
    if (imageProfile !== null) {
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
          loading={
            loading ||
            loadingProfilePhoto ||
            updateLoading ||
            newsLetterLoading ||
            loadingScreen
          }
          backButtonPress={() => {
            isRegister ? navigation.navigate('Home') : navigation.goBack();
          }}
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
                      setDeletePhoto(true);
                      setFile(null);
                      setImageProfile(null);
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
            {isRegister ? (
              <>
                <Box alignSelf="flex-start" mb="xxxs">
                  <Typography variant="tituloSessoes">
                    Revise seus dados
                  </Typography>
                </Box>

                <Box alignSelf="flex-start" mb="xxxs">
                  <Typography fontFamily="reservaSerifRegular" fontSize={16}>
                    Para continuar, todos os dados devem ser inseridos por
                    completo.
                  </Typography>
                </Box>
              </>
            ) : (
              <Box alignItems="center">
                {imageProfile === null ? (
                  <Avatar
                    onPress={() => setShowModalProfile(true)}
                    buttonEdit
                  />
                ) : (
                  <Avatar
                    imageSource={{ uri: imageProfile }}
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
            )}

            {/* down */}
            <Box mt="xxxs">
              <Box mb="xxs">
                <TextField
                  label={labelFullName}
                  value={userData.fullName}
                  onChangeText={(text) => {
                    setUserData({
                      ...userData,
                      fullName: text,
                    });

                    handlerValidationFullName(text.trim());
                  }}
                  iconRight={
                    !isEmptyFullName ? (
                      <Box ml="nano">
                        <Icon
                          color="preto"
                          name="Check"
                          size={18}
                          marginX="micro"
                        />
                      </Box>
                    ) : (
                      <Box ml="nano"></Box>
                    )
                  }
                  placeholder="Digite seu nome completo."
                  error="Preencha seu nome completo. (Apenas alfabetos são permitidos para este campo.)"
                  touched={isEmptyFullName}
                />
              </Box>

              <Box mb="xxs">
                <TextField
                  style={{ color: '#8A8C8E' }}
                  editable={false}
                  label="E-mail"
                  value={userData.email}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ email: text } });
                  }}
                  iconRight={
                    userData.email.length ? (
                      <Box ml="nano">
                        <Icon
                          color="preto"
                          name="Check"
                          size={18}
                          marginX="micro"
                        />
                      </Box>
                    ) : (
                      <Box ml="nano"></Box>
                    )
                  }
                />
              </Box>

              <Box mb="xxs">
                <TextField
                  keyboardType="number-pad"
                  label={labelDocument}
                  value={userData.document}
                  maskType="cpf"
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ document: text } });
                    cpfValidate(text);

                    if (!text || !cpfInvalid) {
                      setLabelDocument(null);
                    } else {
                      setLabelDocument('CPF');
                    }
                  }}
                  iconRight={
                    userData.document.length && !cpfInvalid ? (
                      <Box ml="nano">
                        <Icon
                          color="preto"
                          name="Check"
                          size={18}
                          marginX="micro"
                        />
                      </Box>
                    ) : (
                      <Box ml="nano"></Box>
                    )
                  }
                  placeholder="Digite seu CPF"
                  error="Verifique o CPF digitado."
                  touched={cpfInvalid}
                />
              </Box>

              <Box mb="xxs">
                <TextField
                  keyboardType="number-pad"
                  label={labelBirthDate}
                  maskType="custom"
                  maskOptions={{
                    mask: '99/99/9999',
                  }}
                  value={userData.birthDate}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ birthDate: text } });

                    handlerValidationBirthDate(text.trim());
                  }}
                  iconRight={
                    !isEmptyBirthDate ? (
                      <Box ml="nano">
                        <Icon
                          color="preto"
                          name="Check"
                          size={18}
                          marginX="micro"
                        />
                      </Box>
                    ) : (
                      <Box ml="nano"></Box>
                    )
                  }
                  placeholder="Digite sua data de nascimento"
                  error="Preencha sua data de nascimento"
                  touched={isEmptyBirthDate}
                />
              </Box>

              <Box mb="nano">
                <TextField
                  keyboardType="number-pad"
                  maskType="custom"
                  maskOptions={{
                    mask: '+55 (99) 9 9999-9999',
                  }}
                  label={labelPhone}
                  value={userData.homePhone}
                  onChangeText={(text) => {
                    setUserData({ ...userData, ...{ homePhone: text } });

                    handlerValidationHomePhone(text.trim());
                  }}
                  iconRight={
                    !isEmptyHomePhone ? (
                      <Box ml="nano">
                        <Icon
                          color="preto"
                          name="Check"
                          size={18}
                          marginX="micro"
                        />
                      </Box>
                    ) : (
                      <Box ml="nano"></Box>
                    )
                  }
                  placeholder="Digite seu telefone"
                  error="Preencha seu telefone."
                  touched={isEmptyHomePhone}
                />
              </Box>
              {isTester && (
                <Box mb="sm" mt="sm">
                  <Box mb="nano" mt="nano">
                    <TouchableOpacity onPress={() => handleCopyToken()}>
                      <Typography>{tokenOneSignal}</Typography>
                    </TouchableOpacity>
                  </Box>
                  <Box flexDirection="row" marginY="xxs" alignItems="center">
                    <Box flex={1}>
                      <Typography variant="subtituloSessoes">
                        Ambiente de testes
                      </Typography>
                    </Box>
                    <Box marginLeft="micro">
                      <Toggle
                        onValueChange={(value: boolean) =>
                          toggleIsTesting(value)
                        }
                        thumbColor="vermelhoAlerta"
                        color="preto"
                        value={isTesting}
                      />
                    </Box>
                  </Box>
                </Box>
              )}

              {!isRegister && (
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
              )}

              <Box mb="nano" justifyContent="space-between" flexDirection="row">
                {isRegister ? (
                  <Box paddingLeft="nano" mt="sm" width={'100%'}>
                    <Button
                      title="SALVAR"
                      variant="primarioEstreito"
                      inline
                      onPress={saveUserData}
                      disabled={
                        updateLoading ||
                        loadingProfilePhoto ||
                        isEmptyFullName ||
                        cpfInvalid ||
                        isEmptyHomePhone ||
                        isEmptyBirthDate
                      }
                    />
                  </Box>
                ) : (
                  <>
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
                        disabled={
                          updateLoading ||
                          loadingProfilePhoto ||
                          loadingScreen ||
                          isEmptyFullName ||
                          cpfInvalid ||
                          isEmptyHomePhone ||
                          isEmptyBirthDate
                        }
                      />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
