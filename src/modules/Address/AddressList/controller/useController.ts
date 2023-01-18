import { useMutation, useLazyQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import {
  useState, useEffect, useCallback,
} from 'react';
import { BackHandler } from 'react-native';
import { useAuth } from '../../../../context/AuthContext';
import { useCart } from '../../../../context/CartContext';
import { deleteAddress } from '../../../../graphql/address/addressMutations';
import { profileQuery } from '../../../../graphql/profile/profileQuery';
import EventProvider from '../../../../utils/EventProvider';
import formatString from '../../../../utils/formatString';
import type { IAddress, IEditAddress, IProfileData } from '../../interface';

interface IUseControler {
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

const useController = (): IUseControler => {
  const navigation = useNavigation();
  const { identifyCustomer } = useCart();
  const { cookie, email } = useAuth();

  const [loadingStatusBar, setLoadingStatusBar] = useState(false);

  const [isVisibleDeleteModal, setIsVisibleDeleteModal] = useState(false);
  const [isVisibleSuccessModal, setIsVisibleSuccessModal] = useState(false);

  const [addressId, setAddressId] = useState('');
  const [selectedAddress, setSelectedAddress] = useState<any>(null);

  const [addressDelete] = useMutation(deleteAddress);
  const [hasDeleteAddressError, setHasDeleteAddressError] = useState(false);

  const [profileData, setProfileData] = useState<IProfileData | null>(null);

  const [getProfile] = useLazyQuery(profileQuery, { fetchPolicy: 'no-cache' });

  const goBack = () => navigation.goBack();

  const requestAddressList = useCallback(async () => {
    setLoadingStatusBar(true);
    try {
      const { data } = await getProfile() as unknown as {
        data: { profile: IProfileData }
      };

      const { profile } = data;

      if (profile) {
        setProfileData(profile);
      }
    } catch (e) {
      EventProvider.captureException(e);
    } finally {
      setLoadingStatusBar(false);
    }
  }, []);

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
      const data = await addressDelete({
        variables: {
          id: addressId,
        },
      });
      closeDeleteModal();

      if (data) {
        if (email) {
          await identifyCustomer(email);
        }
      }
      await requestAddressList();
    } catch (e) {
      setHasDeleteAddressError(true);
    } finally {
      setLoadingStatusBar(false);
      openSuccessModal();
    }
  }, [addressId, email]);

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

    if (cookie) {
      if (selectedAddress) {
        selected = id === selectedAddress.id && !!item;
      }
    } else if (selectedAddress) {
      selected = id === selectedAddress.addressId && !!item;
    }
    return selected;
  };

  const navigateToNewAddress = useCallback(
    () => navigation.navigate('NewAddress'),
    [navigation.navigate],
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
    profileData,
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
