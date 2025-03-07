import { useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import testProps from '../../utils/testProps';
import useAsyncStorageProvider from '../../hooks/useAsyncStorageProvider';
import EventProvider from '../../utils/EventProvider';
import { useAuthStore } from '../../zustand/useAuth/useAuthStore';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { useHelpCenterStore } from '../../zustand/useHelpCenterStore/useHelpCenterStore';
import { Divider } from '../../components/Divider/Divider';
import type {
  ContentItemsHelpCenterCollectionOutput,
  Maybe,
  SessionBodyCollectionOutput,
} from '../../base/graphql/generated';
import styles from './styles';

type Props = StackScreenProps<RootStackParamList, 'HelpCenter'>;

export default function HelpCenter({ route }: Props) {
  const navigation = useNavigation();
  const {
    actions,
    titleHelpCenter,
    loading,
    itemsHelpCenter,
  } = useHelpCenterStore([
    'actions',
    'titleHelpCenter',
    'loading',
    'itemsHelpCenter',
  ]);
  const { getItem } = useAsyncStorageProvider();

  const { profile } = useAuthStore(['profile']);
  const [
    filter,
    setFilter] = useState<Maybe<ContentItemsHelpCenterCollectionOutput[]> | undefined>();

  const loadingData = useCallback(async () => {
    await actions.INITIAL_LOADING();
  }, [actions]);

  useEffect(() => { loadingData(); }, []);
  useEffect(() => {
    setFilter(itemsHelpCenter);
  }, [itemsHelpCenter]);

  const navigateGoBack = () => {
    navigation.goBack();
    if (route?.params?.comeFrom === 'Menu') {
      navigation.navigate('Menu');
    }
  };

  interface IHandleClickSession {
    title: ContentItemsHelpCenterCollectionOutput['sessionTitle'];
    data: SessionBodyCollectionOutput['items'];
    url: ContentItemsHelpCenterCollectionOutput['linkUrl'];
  }

  const handleClickSession = useCallback(async ({
    title,
    data,
    url,
  }: IHandleClickSession) => {
    if (url) {
      navigation.navigate('Exchange', { url });
    } else {
      if (!title || !data) return;
      navigation.navigate('PageHelpCenter', { title, data });
    }
  }, []);

  return (
    <SafeAreaView
      style={styles.safeContainer}
      {...testProps('com.usereserva:id/help_center_container')}
    >
      <TopBarBackButton
        loading={loading}
        backButtonPress={() => navigateGoBack()}
      />

      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.txtTitle}>{titleHelpCenter}</Text>
        </View>

        <View style={styles.searchContainer}>
          <SearchBar
            testID="com.usereserva:id/help_center_input"
            height={36}
            placeholder="Buscar"
            onValueChange={(text) => {
              const newFilter = itemsHelpCenter?.filter((item) => {
                const regex = new RegExp(text, 'gi');
                return item?.sessionTitle?.match(regex) != null;
              });
              setFilter(newFilter);
            }}
          />
        </View>

        <ScrollView>
          <View>
            {filter?.map((item, index) => (
              <View key={`item-list-container-${item.sessionTitle}`}>
                <TouchableOpacity
                  key={`item-list-${item.sessionTitle}`}
                  {...testProps('com.usereserva:id/item_list_help_center')}
                  onPress={() => handleClickSession({
                    title: item.sessionTitle,
                    data: item.sessionBodyCollection?.items,
                    url: item.linkUrl,
                  })}
                >
                  <View style={styles.sessionTitleContainer}>
                    <View>
                      <Text style={styles.txtSessionTitle}>{item.sessionTitle}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {index !== filter.length - 1 && <Divider variant="fullWidth" />}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
