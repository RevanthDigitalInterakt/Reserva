import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  BackHandler,
  FlatList,
  SafeAreaView,
  View,
} from 'react-native';
import Order from '../Components/Order';
import EventProvider from '../../../utils/EventProvider';
import { defaultBrand } from '../../../utils/defaultWBrand';
import { useAuthStore } from '../../../zustand/useAuth/useAuthStore';

import { usePageLoadingStore } from '../../../zustand/usePageLoadingStore/usePageLoadingStore';
import { SearchNewOrders, type IVtexServiceRequestOrder } from '../../../services/vtexService';
import { useOrder } from '../../../hooks/useOrder';
import ListHeader from '../Components/ListHeader/ListHeader';
import { TopBarBackButton } from '../../../modules/Menu/components/TopBarBackButton';
import ListFooter from '../Components/ListFooter/ListFooter';
import ListEmpty from '../Components/ListEmpty/ListEmpty';

import styles from './styles';

function OrderList() {
  const [ordersList, setOrdersList] = useState<IVtexServiceRequestOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalOrders, setTotalOrders] = useState(0);
  const [page, setPage] = useState(1);
  const navigation = useNavigation();
  const [isLastPurchase, setIsLastPurchase] = useState<boolean>();
  const {
    verifyOrderLastPurchase,
    useOrderLoading,
  } = useOrder();

  const { profile } = useAuthStore(['profile']);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const fetchOrders = async () => {
    if (!profile?.email || !profile?.authCookie) return;

    setLoading(true);

    const { data } = await SearchNewOrders(page.toString(), profile.email, profile.authCookie);
    if (data) {
      setOrdersList([...ordersList, ...data.list]);
      setTotalOrders(data.paging.total);
      setPage(page + 1);
      setLoading(false);
    }
  };

  const fetchLastOrder = useCallback(async () => {
    const isOrderLastPurchase = await verifyOrderLastPurchase({ ordersList });
    setIsLastPurchase(isOrderLastPurchase);
  }, [ordersList]);

  const keyExtractor = (item: IVtexServiceRequestOrder) => item.orderId.toString();

  const renderItem = useCallback(({ item }) => (
    <View style={styles.orderListItem}>
      <Order data={item} />
    </View>
  ), []);

  useEffect(() => {
    EventProvider.logEvent('page_view', {
      item_brand: defaultBrand.picapau,
    });

    fetchOrders();
  }, []);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.goBack();
      return true;
    });
  }, []);

  useEffect(() => {
    if (!loading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [loading, onFinishLoad, startLoadingTime]);

  useEffect(() => {
    if (ordersList) {
      fetchLastOrder();
    }
  }, [ordersList]);

  return (
    <SafeAreaView style={styles.orderListSafeArea}>
      <TopBarBackButton loading={loading || useOrderLoading} showShadow />

      {ordersList && ordersList.length > 0 && (
        <FlatList
          onEndReached={() => {
            if (ordersList.length !== totalOrders) {
              fetchOrders();
            }
          }}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={<ListHeader isLastPurchase={isLastPurchase} />}
          ListFooterComponent={<ListFooter loading={loading} />}
          data={ordersList}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}

      {!loading && ordersList.length === 0 && (<ListEmpty />)}
    </SafeAreaView>
  );
}

export default OrderList;
