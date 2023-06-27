import React, { useEffect } from 'react';
import type { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import type { RootStackParamList } from '../../routes/StackNavigator';
import { useCart } from '../../context/CartContext';
import useAsyncDeepLinkStore from '../../zustand/useAsyncDeepLinkStore/useAsyncDeepLinkStore';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import type { TActionType } from '../../zustand/useAsyncDeepLinkStore/types/asyncDeepLinkStore';
import { COLORS } from '../../base/styles/colors';

type TWebRedirectToCatalogProps = StackScreenProps<RootStackParamList, 'AsyncDeepLink'>;

function AsyncDeepLinkScreenLoading({ route, navigation }: TWebRedirectToCatalogProps) {
  const { reducerKey, ...restParams } = route.params;
  const { topBarLoading } = useCart();
  const { deepLinkLoading, fallBackRoute, dispatch } = useAsyncDeepLinkStore();
  useEffect(() => {
    if (fallBackRoute) {
      navigation.replace(fallBackRoute.routeName, { ...fallBackRoute.params });
    }
  }, [fallBackRoute]);

  useEffect(() => {
    if (reducerKey) {
      dispatch({
        actionType: reducerKey as TActionType,
        payload: { ...restParams },
      });
    }
  }, [reducerKey]);

  return (
    <SafeAreaView style={{ justifyContent: 'space-between', flex: 1, backgroundColor: COLORS.WHITE }}>
      <TopBarBackButton showShadow loading={topBarLoading} />

      {deepLinkLoading && <LoadingScreen />}
    </SafeAreaView>
  );
}

export { AsyncDeepLinkScreenLoading };
