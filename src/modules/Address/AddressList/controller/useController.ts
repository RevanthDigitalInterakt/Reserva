import { useNavigation } from '@react-navigation/native';
import {
  useState, useEffect, useCallback,
} from 'react';
import { BackHandler } from 'react-native';
import formatString from '../../../../utils/formatString';
import type { IAddress, IEditAddress, IProfileData } from '../../interface';
import { useProfileAddressRemoveMutation } from '../../../../base/graphql/generated';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { usePageLoadingStore } from '../../../../zustand/usePageLoadingStore/usePageLoadingStore';

interface IUseController {
  goBack: () => void;
  navigateToNewAddress: () => void;
  navigateToEditAddress: (data: IEditAddress) => void;
  doDeleteAddress: () => void;
  onAddressChosen: (item: any) => void;
  profileData: IProfileData | null;
  openModalDeleteAddress: (id: string) => void;
  formatAddress: (data: IAddress) => string;
  checkSelectedAddress: (item: IEditAddress) => boolean;
  openSuccessModal: () => void;
  closeSuccessModal: () => void;
  isVisibleDeleteModal: boolean;
  isVisibleSuccessModal: boolean;
  closeDeleteModal: () => void;
  openErrorModal: () => void;
  closeErrorModal: () => void;
  hasDeleteAddressError: boolean;
  loadingStatusBar: boolean;
}

const useController = (): IUseController => {
  const navigation = useNavigation();
  const [loadingStatusBar, setLoadingStatusBar] = useState(false);
  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
  const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(false);
  const [addressId, setAddressId] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [hasDeleteAddressError, setHasDeleteAddressError] = useState(false);
  const { profile, onGetProfile } = useAuthStore(['profile', 'onGetProfile']);
  const [isLoadCompleted, setIsLoadCompleted] = useState<boolean>(false);
  const [profileAddressRemove] = useProfileAddressRemoveMutation({
    context: { clientName: 'gateway' }, fetchPolicy: 'no-cache',
  });
  const goBack = () => navigation.goBack();
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);
  const requestAddressList = useCallback(async () => {
    try {
      setLoadingStatusBar(true);

      await onGetProfile();
    } catch (e) {
      ExceptionProvider.captureException(e, "goBack - AddressList/controller");
    } finally {
      setLoadingStatusBar(false);
      setIsLoadCompleted(true);
    }
  }, []);

  useEffect(() => {
    if (isLoadCompleted && startLoadingTime > 0) onFinishLoad();
  }, [isLoadCompleted, onFinishLoad, startLoadingTime]);

  const openSuccessModal = useCallback(() => {
    setIsVisibleSuccessModal(true);
  }, []);

  const closeSuccessModal = useCallback(() => {
    setIsVisibleSuccessModal(false);
  }, []);

  const closeDeleteModal = useCallback(() => {
    setIsVisibleDeleteModal(false);
  }, []);

  const openModalDeleteAddress = useCallback((id: string) => {
    setIsVisibleDeleteModal(true);
    setAddressId(id);
  }, []);

  const openErrorModal = useCallback(() => {
    setHasDeleteAddressError(true);
  }, [setHasDeleteAddressError]);

  const closeErrorModal = useCallback(() => {
    setHasDeleteAddressError(false);
  }, [setHasDeleteAddressError]);

  const doDeleteAddress = useCallback(async () => {
    setLoadingStatusBar(true);
    try {
      await profileAddressRemove({
        variables: {
          input: { addressId },
        },
      });
      closeDeleteModal();

      await requestAddressList();
    } catch (e) {
      setHasDeleteAddressError(true);
    } finally {
      setLoadingStatusBar(false);
      openSuccessModal();
    }
  }, [addressId, profile?.email]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await requestAddressList();
    });
    return unsubscribe;
  }, [navigation, requestAddressList]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, [navigation]);

  const onAddressChosen = (item: IAddress) => {
    setSelectedAddress({ ...item, addressType: 'residential' });
  };

  const checkSelectedAddress = (item: IEditAddress): boolean => {
    let selected = false;

    const { id } = item;

    if (profile?.authCookie) {
      if (selectedAddress) {
        selected = id === selectedAddress.id && !!item;
      }
    } else if (selectedAddress) {
      selected = id === selectedAddress.addressId && !!item;
    }
    return selected;
  };

  const navigateToNewAddress = useCallback(
    () => navigation.navigate('CreateAddress'),
    [navigation],
  );

  const navigateToEditAddress = useCallback((data: IEditAddress) => {
    navigation.navigate('NewAddress', {
      edit: true,
      editAddress: { ...data },
    });
  }, [navigation.navigate]);

  const formatAddress = useCallback(({
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
  }: IAddress) => formatString.address({
    street,
    number,
    complement,
    neighborhood,
    city,
    state,
  }), []);

  return {
    loadingStatusBar,
    profileData: profile as unknown as IProfileData,
    goBack,
    navigateToNewAddress,
    navigateToEditAddress,
    formatAddress,
    doDeleteAddress,
    onAddressChosen,
    checkSelectedAddress,
    hasDeleteAddressError,
    openModalDeleteAddress,
    openSuccessModal,
    openErrorModal,
    closeErrorModal,
    isVisibleDeleteModal,
    isVisibleSuccessModal,
    closeDeleteModal,
    closeSuccessModal,

  };
};

export default useController;
