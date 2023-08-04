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
} from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';
import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import { toggleAnimation } from './animations/toggleAnimation';

import styles from './ListAddress.styles';

import ListAddressItem from './components/ListAddressItem';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import type { IAddressData } from './interface/IAddressData';
import EventProvider from '../../../utils/EventProvider';

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

  const [showContent, setShowContent] = useState(false);
  const [addressData, setAddressData] = useState<IAddressData[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleListItem = useCallback(() => {
    Animated.timing(animationValue, {
      duration: 300,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    }).start();

    LayoutAnimation.configureNext(toggleAnimation);
    setShowContent(!showContent);
  }, [animationValue, showContent]);

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

  const onGoToEditAddress = useCallback(() => {
    navigate('CreateAddress');
  }, [navigate]);

  useEffect(() => {
    const newArr = profile?.addresses.map((element) => ({
      ...element,
      selected: false,
    })) as IAddressData[];

    setAddressData(newArr);
  }, [profile?.addresses]);

  const requestAddressList = useCallback(async () => {
    try {
      setLoading(true);

      await onGetProfile();
    } catch (e) {
      EventProvider.captureException(e);
    } finally {
      setLoading(false);
    }
  }, [onGetProfile]);

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
            item={item}
            animationListController={dropdownController}
            onNavigate={onGoToEditAddress}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />

      <View style={styles.content}>
        <TouchableOpacity
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
    </SafeAreaView>
  );
}
