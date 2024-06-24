import { useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { Box } from '../../components/Box/Box';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { Typography } from '../../components/Typography/Typography';
import type { RootStackParamList } from '../../routes/StackNavigator';
import testProps from '../../utils/testProps';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { useHelpCenterStore } from '../../zustand/useHelpCenterStore/useHelpCenterStore';
import { Divider } from '../../components/Divider/Divider';
import type { ContentItemsHelpCenterCollectionOutput, Maybe, SessionBodyCollectionOutput } from '../../base/graphql/generated';

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

  const handleButton = useCallback((
    title: ContentItemsHelpCenterCollectionOutput['sessionTitle'],
    data: SessionBodyCollectionOutput['items'],
    url: ContentItemsHelpCenterCollectionOutput['linkUrl'],
  ) => {
    if (url) {
      navigation.navigate('Exchange', { url });
    } else {
      if (!title || !data) return;
      navigation.navigate('PageHelpCenter', {
        title,
        data,
      });
    }
  }, []);

  return (
    <SafeAreaView
      style={{ justifyContent: 'space-between', backgroundColor: 'white', flex: 1 }}
      {...testProps('com.usereserva:id/help_center_container')}
    >
      <TopBarBackButton
        loading={loading}
        backButtonPress={() => navigateGoBack()}
      />

      <Box flex={1} alignContent="flex-start" pt="xs" paddingX="xxxs">
        <Box mb="nano" alignSelf="flex-start">
          <Typography variant="tituloSessoes">{titleHelpCenter}</Typography>
        </Box>

        <Box mb="micro" mt="xxxs">
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
        </Box>

        <ScrollView>
          <View>
            {filter?.map((item, index) => (
              <View key={`item-list-container-${item.sessionTitle}`}>
                <TouchableOpacity
                  key={`item-list-${item.sessionTitle}`}
                  {...testProps('com.usereserva:id/item_list_help_center')}
                  onPress={() => handleButton(
                    item.sessionTitle,
                    item.sessionBodyCollection?.items,
                    item.linkUrl,
                  )}
                >
                  <View style={{ flexDirection: 'row', marginTop: 24, marginBottom: 24 }}>
                    <View>
                      <Typography fontSize={14} fontFamily="nunitoBold">{item.sessionTitle}</Typography>
                    </View>
                  </View>
                </TouchableOpacity>
                {index !== filter.length - 1 && <Divider variant="fullWidth" />}
              </View>
            ))}
          </View>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
