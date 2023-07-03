import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Box, Typography } from '@usereservaapp/reserva-ui';
import type { StackScreenProps } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { bagStyles } from './styles/bagStyles';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import { EmptyBag } from '../../modules/Checkout/components/EmptyBag';
import WithAvoidingView from '../../utils/WithAvoidingView';
import ToastProvider from '../../utils/Toast';
import BagSkeleton from './components/Skeleton';
import useInitialBag from '../../zustand/useBagStore/useInitialBagStore/useInitialBag';
import SkeletonBagFooter from './components/SkeletonBagFooter';
import BagFooter from './components/BagFooter';
import NotFoundProduct from './components/NotFoundProduct';
import type { RootStackParamList } from '../../routes/StackNavigator';
import EventProvider from '../../utils/EventProvider';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import { Recommendation } from '../../modules/Checkout/components/Recommendation';
import { ShippingBar } from '../../modules/Checkout/components/ShippingBar';
import CouponComponent from './components/Coupon';
import LoadingModal from './components/LoadingModal';
import DeleteProductModal from './components/DeleteProduct';
import BagProductList from './components/ProductList';
import SelectableGifts from './components/SelectableGifts';

type TNewBagProps = StackScreenProps<RootStackParamList, 'BagScreen'>;

export default function NewBag(_: TNewBagProps): JSX.Element {
  const navigation = useNavigation();

  const {
    topBarLoading,
    items,
    initialLoad,
    initialized,
    productNotFound,
    appTotalizers,
    selectableGift,
    allItemsQuantity,
  } = useBagStore([
    'topBarLoading',
    'items',
    'initialLoad',
    'initialized',
    'productNotFound',
    'appTotalizers',
    'selectableGift',
    'allItemsQuantity',
  ]);

  useInitialBag();

  const handleNavigateToOffers = useCallback(() => {
    navigation.navigate('Offers');
  }, [navigation]);

  const handleBackTopBarButtonPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleAbandonedCartTags = useCallback(() => {
    // Caso o cliente ainda tenha produtos no carrinho, envia os dados para o OneSignal
    if (items.length) {
      const [item] = items;

      if (!item) return;

      EventProvider.sendPushTags('sendAbandonedCartTags', {
        cart_update: `${Math.floor(Date.now() / 1000)}`,
        product_name: item.name,
        product_image: item.imageSource,
      });

      return;
    }

    // Caso o cliente tenha removido todos os produtos, remove os dados do OneSignal
    EventProvider.sendPushTags('sendAbandonedCartTags', {
      cart_update: '',
      product_name: '',
      product_image: '',
    });
  }, [items]);

  useEffect(() => {
    if (initialized) {
      handleAbandonedCartTags();
    }
  }, [initialized, items.length, handleAbandonedCartTags]);

  if (!items.length && !initialLoad) {
    return (
      <Box flex={1} testID="com.usereserva:id/EmptyBag">
        <EmptyBag
          backButtonPress={handleBackTopBarButtonPress}
          loading={topBarLoading}
          onPress={handleNavigateToOffers}
        />
      </Box>
    );
  }

  return (
    <SafeAreaView style={bagStyles.safeArea} testID="com.usereserva:id/NewBag">
      <ToastProvider />

      <TopBarBackButton
        showShadow
        backButtonPress={handleBackTopBarButtonPress}
        loading={topBarLoading}
      />

      <WithAvoidingView>
        {initialLoad && <BagSkeleton />}

        {!initialLoad && (
          <>
            {!!productNotFound.length && <NotFoundProduct />}

            <ScrollView testID="com.usereserva:id/BagItensDetails">
              <LoadingModal />

              <DeleteProductModal />

              <Box paddingX="xxxs" paddingY="xxs">
                <Box bg="white" marginTop="xxs">
                  <Typography variant="tituloSessoes">
                    {`Sacola  (${allItemsQuantity})`}
                  </Typography>
                </Box>

                <ShippingBar
                  loading={false}
                  totalOrder={appTotalizers.total}
                />

                {selectableGift?.availableGifts?.length && (
                  <SelectableGifts />
                )}

                <BagProductList />
              </Box>

              <Recommendation />

              <CouponComponent />
            </ScrollView>
          </>
        )}

        <Box width="100%" height={145} bg="white">
          {initialLoad && <SkeletonBagFooter />}

          {(!initialLoad && items?.length > 0) && <BagFooter />}
        </Box>
      </WithAvoidingView>

      <ToastProvider />
    </SafeAreaView>
  );
}
