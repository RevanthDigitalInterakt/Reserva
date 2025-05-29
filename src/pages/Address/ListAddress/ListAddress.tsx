/* eslint-disable no-param-reassign */
import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  View,
  TouchableOpacity,
  Animated,
  LayoutAnimation,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import { toggleAnimation } from './animations/toggleAnimation';

import styles from './ListAddress.styles';

import ListAddressItem from './components/ListAddressItem';
import ModalConfirmDelete from './components/ModalConfirmDelete';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import type { IAddressData } from './interface/IAddressData';
import testProps from '../../../utils/testProps';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';
import { useProfileAddressRemoveMutation } from '../../../base/graphql/generated';

type TAddressListProps = StackScreenProps<RootStackParamList, 'AddressList'>;

export default function ListAddress({
  navigation: {
    goBack,
    navigate,
    addListener,
  },
}: TAddressListProps): JSX.Element {
  const animationValue = useRef(new Animated.Value(0)).current;

  const { profile, onGetProfile } = useAuthStore(['profile', 'onGetProfile']);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const [showContent, setShowContent] = useState(false);
  const [addressData, setAddressData] = useState<IAddressData[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [addressID, setAddressID] = useState('');
  const [isLoadCompleted, setIsLoadCompleted] = useState<boolean>(false);
  const [mainAddress, setMainAddress] = useState<string | null | undefined>();

  const toggleListItem = useCallback(() => {
    Animated.timing(animationValue, {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    }).start();

    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  }, [animationValue, showContent]);

  const modalController = useCallback((idAddress?: string) => {
    if (idAddress) {
      setAddressID(idAddress);
      setModalVisible(!modalVisible);

      return;
    }

    setModalVisible(!modalVisible);
  }, [modalVisible]);

  const [removeAddress] = useProfileAddressRemoveMutation({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const dropdownController = useCallback((itemId: string) => {
    toggleListItem();

    const arr = addressData;

    arr.forEach((element: IAddressData) => {
      if (element.id === itemId) {
        element.selected = !element.selected;
      }

      if (element.id !== itemId) {
        element.selected = false;
      }
    });

    setAddressData([...arr]);
  }, [addressData, toggleListItem]);

  const onGoToEditAddress = useCallback((id: string) => {
    navigate('CreateAddress', {
      id,
    });
  }, [navigate]);

  const getAddresses = useCallback(() => {
    const mainAddressProfile = profile?.customFields?.find((item) => item?.cacheId === 'mainAddressId')?.value;

    setMainAddress(mainAddressProfile);

    const arr = profile?.addresses.slice().sort((itemA, itemB) => {
      if (itemA?.id === mainAddressProfile) {
        return 1;
      }

      if (itemB?.id === mainAddressProfile) {
        return 1;
      }

      return 0;
    });

    const newArr = arr?.map((element) => ({
      ...element,
      selected: false,
    })) as IAddressData[];

    setAddressData(newArr);
  }, [profile?.addresses, profile?.customFields]);

  useEffect(() => {
    getAddresses();
  }, [getAddresses]);

  const requestAddressList = useCallback(async () => {
    try {
      setLoading(true);

      await onGetProfile();
    } catch (e) {
      ExceptionProvider.captureException(e, "requestAddressList - ListAddress.tsx");
    } finally {
      setLoading(false);
      setIsLoadCompleted(true);
    }
  }, [onGetProfile]);

  useEffect(() => {
    if (isLoadCompleted && startLoadingTime > 0) onFinishLoad();
  }, [isLoadCompleted, onFinishLoad, startLoadingTime]);

  const onDeleteAddress = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await removeAddress({ variables: { input: { addressId: id } } });
    } catch (err) {
      ExceptionProvider.captureException(err, "onDeleteAddress - ListAddress.tsx");
    } finally {
      setLoading(false);
      modalController();
      requestAddressList();
    }
  }, [removeAddress, requestAddressList, modalController]);

  useEffect(() => {
    const unsubscribe = addListener('focus', async () => {
      await requestAddressList();
    });

    return unsubscribe;
  }, [addListener, requestAddressList]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      goBack();
      return true;
    });
  }, [goBack]);

  return (
    <SafeAreaView style={styles.container}>
      <TopBarBackButton
        loading={loading}
        showShadow
        backButtonPress={goBack}
      />

      <View style={styles.content}>
        <Text style={styles.title}>Meus endereços</Text>
      </View>

      <FlatList
        keyExtractor={(item) => String(item?.id)}
        data={addressData}
        renderItem={({ item }) => (
          <ListAddressItem
            mainAddress={mainAddress}
            item={item}
            animationListController={dropdownController}
            onNavigate={onGoToEditAddress}
            onShowModalConfirmDelete={modalController}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={loading ? <ActivityIndicator size="large" color="#333333" /> : (
          <Text testID="com.usereserva:id/empty_list_message" style={styles.emptyListAddressText}>
            Você ainda não tem endereços cadastrados, clique em Novo Endereço
            e cadastre um
          </Text>
        )}
      />

      <View style={styles.content}>
        <TouchableOpacity
          {...testProps('com.usereserva:id/action_button_navigate_create_address')}
          onPress={() => navigate('CreateAddress')}
          style={styles.actionButton}
        >
          <Text
            style={styles.actionButtonText}
          >
            novo endereço
          </Text>
        </TouchableOpacity>
      </View>

      {modalVisible && (
      <ModalConfirmDelete
        showModal={modalVisible}
        onCloseModal={modalController}
        onDeleteAddress={onDeleteAddress}
        addressID={addressID}
      />
      )}
    </SafeAreaView>
  );
}
