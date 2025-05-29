import type { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { TrackPageTypeEnum } from '../../base/graphql/generated';
import { Box } from '../../components/Box/Box';
import OneP5P from '../../components/OneP5P/OneP5P';
import { Typography } from '../../components/Typography/Typography';
import { useIsTester } from '../../hooks/useIsTester';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import type { RootStackParamList } from '../../routes/StackNavigator';
import EventProvider from '../../utils/EventProvider';
import ToastProvider from '../../utils/Toast';
import WithAvoidingView from '../../utils/WithAvoidingView';
import { getSelectedDelivery } from '../../utils/getSelectedDelivery';
import { mergeItemsPackage } from '../../utils/mergeItemsPackage';
import { trackViewCart } from '../../utils/trackViewCart';
import { useBagStore } from '../../zustand/useBagStore/useBagStore';
import useInitialBag from '../../zustand/useBagStore/useInitialBagStore/useInitialBag';
import { trackPageViewStore } from '../../zustand/useTrackPageViewStore/useTrackPageViewStore';
import AddZipCodeDelivery from './components/AddZipCodeDelivery';
import BagFooter from './components/BagFooter';
import CouponComponent from './components/Coupon';
import DeleteProductModal from './components/DeleteProduct';
import { EmptyBag } from './components/EmptyBag';
import LoadingModal from './components/LoadingModal';
import NotFoundProduct from './components/NotFoundProduct';
import BagProductList from './components/ProductList';
import BagProductPackageList from './components/ProductPackageList';
import { UnavailableList } from './components/ProductUnavailableList/UnavailableList';
import { Recommendation } from './components/Recommendation';
import SelectableGifts from './components/SelectableGifts';
import { ShippingBar } from './components/ShippingBar';
import ShippingDataDetails from './components/ShippingDataDetails';
import BagSkeleton from './components/Skeleton';
import SkeletonBagFooter from './components/SkeletonBagFooter';
import { bagStyles } from './styles/bagStyles';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';

type TNewBagProps = StackScreenProps<RootStackParamList, 'BagScreen'>;

export default function NewBag({ navigation }: TNewBagProps) {
  const isTester = useIsTester();
  const { isPrime } = usePrimeInfo();
  const { getBoolean } = useRemoteConfig();
  const showShippingBar = getBoolean('show_shipping_bar');

  const showAddZipCodeDeliveryAB = useMemo(
    () => getBoolean(isTester ? 'show_add_zip_code_delivery_tester' : 'show_add_zip_code_delivery'),
    [getBoolean, isTester],
  );

  const {
    topBarLoading,
    packageItems,
    initialLoad,
    initialized,
    productNotFound,
    appTotalizers,
    selectableGift,
    allItemsQuantity,
    actions,
  } = useBagStore([
    'topBarLoading',
    'packageItems',
    'initialLoad',
    'initialized',
    'productNotFound',
    'appTotalizers',
    'selectableGift',
    'allItemsQuantity',
    'actions',
  ]);

  useInitialBag();

  const hasSelectedAddressDelivery = useMemo(
    () => packageItems.length >= 1 && !!packageItems[0]?.metadata?.availability,
    [packageItems],
  );

  const selectedDelivery = useMemo(() => getSelectedDelivery(packageItems), [packageItems]);

  const items = useMemo(() => mergeItemsPackage(packageItems), [packageItems]);

  const handleNavigateToCep = useCallback(() => {
    navigation.navigate('ZipCodeDelivery');
  }, [navigation]);

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

  const hasUnavailableItems = useMemo(
    () => items.some((item) => item.availability !== 'available'),
    [items],
  );

  const showOnep5p = useMemo(() => getBoolean('show_onep5p_bag'), []);

  useEffect(() => {
    if (initialized) {
      handleAbandonedCartTags();
      const type = items.length ? TrackPageTypeEnum.Cart : TrackPageTypeEnum.Emptycart;
      trackPageViewStore.getState().onTrackPageView('bag', type);
    }
  }, [initialized, items.length, handleAbandonedCartTags]);

  useEffect(() => {
    actions.REFETCH_ORDER_FORM();
  }, [actions]);

  useEffect(() => {
    trackViewCart({ items, price: appTotalizers.total });
  }, [appTotalizers.total, items]);

  useEffect(() => {
    EventProvider.logScreenViewEvent('/bag');
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
                        Sacola
                      </Typography>
                    </Box>

                    {showShippingBar && !isPrime && (
                      <ShippingBar loading={false} totalOrder={appTotalizers.total} />
                    )}

                    {isPrime && (
                      <ShippingBar loading={false} totalOrder={appTotalizers.total} />
                    )}

                    {showAddZipCodeDeliveryAB && (
                      <Box bg="white" marginTop="xxs">
                        {hasSelectedAddressDelivery ? (
                          <ShippingDataDetails
                            type={selectedDelivery.type}
                            store={selectedDelivery.store}
                            onPress={handleNavigateToCep}
                          />
                        )
                          : (
                            <AddZipCodeDelivery
                              label="Selecione uma opção de entrega"
                              onPress={handleNavigateToCep}
                            />
                          )}
                      </Box>
                    )}

                    {selectableGift?.availableGifts?.length && (
                      <SelectableGifts />
                    )}

                    {showAddZipCodeDeliveryAB ? <BagProductPackageList /> : <BagProductList />}

                    {/* {showOnep5p && (<OneP5P comingFrom="bag" itemQuantity={allItemsQuantity} />)} */}

                    {!showAddZipCodeDeliveryAB && hasUnavailableItems && <UnavailableList />}

                  </Box>

                  <Recommendation />

                  <CouponComponent />

                </ScrollView>
              </>

            )}

            <Box width="100%" height={isPrime ? 200 : 145} bg="white">
              {initialLoad && <SkeletonBagFooter />}

              {(!initialLoad && items?.length > 0) && <BagFooter />}
            </Box>
          </WithAvoidingView>
        </>
      )}

      <ToastProvider />

    </SafeAreaView>
  );
}
