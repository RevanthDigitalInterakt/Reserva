import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import type { StackScreenProps } from '@react-navigation/stack';
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
import { Box } from '../../components/Box/Box';
import { Typography } from '../../components/Typography/Typography';
import { useIsTester } from '../../hooks/useIsTester';
import { ModalClientIsPrime } from '../../modules/Checkout/components/ModalClientIsPrime/ModalClientIsPrime';
import { usePrimeStore } from '../../zustand/usePrimeStore/usePrimeStore';
import { trackAccessBag } from '../../utils/trackAccessBag';
import { getBrands } from '../../utils/getBrands';

type TNewBagProps = StackScreenProps<RootStackParamList, 'BagScreen'>;

export default function NewBag({ navigation }: TNewBagProps): JSX.Element {
  const isTester = useIsTester();

  const { changeStateIsVisibleModalPrimeRemoved, isVisibleModalPrimeRemoved } = usePrimeStore([
    'changeStateIsVisibleModalPrimeRemoved',
    'isVisibleModalPrimeRemoved',
  ]);

  const {
    topBarLoading,
    items,
    initialLoad,
    initialized,
    productNotFound,
    appTotalizers,
    selectableGift,
    allItemsQuantity,
    clientProfileData,
    actions,
  } = useBagStore([
    'topBarLoading',
    'items',
    'initialLoad',
    'initialized',
    'productNotFound',
    'appTotalizers',
    'selectableGift',
    'allItemsQuantity',
    'clientProfileData',
    'actions',
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

  useEffect(() => {
    actions.REFETCH_ORDER_FORM();
  }, [actions]);

  useEffect(() => {
    trackAccessBag(allItemsQuantity, appTotalizers.total, getBrands(items), clientProfileData);
  }, []);

  return (
    <SafeAreaView style={bagStyles.safeArea} testID="com.usereserva:id/NewBag">
      {!items.length && (
        <Box flex={1} testID="com.usereserva:id/EmptyBag">
          <EmptyBag
            backButtonPress={handleBackTopBarButtonPress}
            loading={topBarLoading}
            onPress={handleNavigateToOffers}
          />
        </Box>
      )}

      {!!items.length && (
        <>
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
                    <Typography
                      variant="tituloSessoes"
                      onPress={() => {
                        if (isTester) {
                          actions.COPY_ORDERFORM();
                        }
                      }}
                    >
                      {`Sacola  (${allItemsQuantity})`}
                    </Typography>
                  </Box>

                  <ShippingBar loading={false} totalOrder={appTotalizers.total} />

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
        </>
      )}

      <ToastProvider />

      <ModalClientIsPrime
        isVisible={isVisibleModalPrimeRemoved}
        onBackdropPress={() => {
          changeStateIsVisibleModalPrimeRemoved(false);

          if (items.length) {
            navigation.navigate('DeliveryScreen', { comeFrom: 'Checkout' });
            return;
          }

          navigation.popToTop();
        }}
      />
    </SafeAreaView>
  );
}
