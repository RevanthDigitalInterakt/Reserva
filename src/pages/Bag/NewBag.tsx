import React, { useCallback } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Box, Typography } from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { bagStyles } from './styles/bagStyles';
import { TopBarBackButton } from '../../modules/Menu/components/TopBarBackButton';
import useBagStore from '../../zustand/useBagStore/useBagStore';
import { EmptyBag } from '../../modules/Checkout/components/EmptyBag';
import WithAvoidingView from '../../utils/WithAvoidingView';
import ToastProvider from '../../utils/Toast';
import BagSkeleton from './components/Skeleton';
import LoadingModal from './components/LoadingModal';
import DeleteProductModal from './components/DeleteProduct';
import useInitialBag from '../../zustand/useBagStore/useInitialBagStore/useInitialBag';
import { ShippingBar } from '../../modules/Checkout/components/ShippingBar';
import { Recommendation } from '../../modules/Checkout/components/Recommendation';
import CouponComponent from './components/Coupon';
import SkeletonBagFooter from './components/SkeletonBagFooter';
import BagFooter from './components/BagFooter';
import { useCart } from '../../context/CartContext';
import BagProductList from './components/ProductList';
import NotFoundProduct from './components/NotFoundProduct';
import type { RootStackParamList } from '../../routes/StackNavigator';
import SelectableGifts from './components/SelectableGifts';

type BagProps = StackScreenProps<RootStackParamList, 'BagScreen'>;
export default function NewBag({ route }: BagProps): JSX.Element {
  const navigation = useNavigation();
  const { restoreCart } = useCart();

  const {
    topBarLoading,
    bagInfos,
    bagInitialLoad,
    currentBagItems,
    currentOrderForm,
    shippingBar,
    productNotFound,
    selectableGiftInfo,
    dispatch,
  } = useBagStore();

  useInitialBag();

  const handleNavigateToOffers = useCallback(
    async () => {
      navigation.navigate('Offers');

      if (currentOrderForm) {
        await restoreCart(currentOrderForm.orderFormId);
        dispatch({
          actionType: 'SET_INITIAL_LOAD',
          payload: {
            value: {
              bagInitialLoad: true,
            },
          },
        });
      }
    },
    [navigation, dispatch, currentOrderForm, restoreCart],
  );

  const handleBackTopBarButtonPress = useCallback(async () => {
    navigation.goBack();
    if (currentOrderForm) {
      await restoreCart(currentOrderForm.orderFormId);
    }
  }, [currentOrderForm, restoreCart, navigation]);

  if (!currentBagItems.length && !bagInitialLoad) {
    return (
      <Box flex={1}>
        <EmptyBag onPress={handleNavigateToOffers} />
      </Box>
    );
  }

  return (
    <SafeAreaView style={bagStyles.safeArea}>

      <TopBarBackButton
        showShadow
        backButtonPress={handleBackTopBarButtonPress}
        loading={topBarLoading}
      />

      <WithAvoidingView>
        {bagInitialLoad && <BagSkeleton />}

        {!bagInitialLoad && (
          <>
            {!!productNotFound.length && <NotFoundProduct />}

            <ScrollView>
              <LoadingModal />
              <DeleteProductModal />

              <Box paddingX="xxxs" paddingY="xxs">
                <Box bg="white" marginTop="xxs">
                  <Typography variant="tituloSessoes">
                    Sacola (
                    {bagInfos.totalBagItems}
                    )
                  </Typography>
                </Box>

                <ShippingBar
                  loading={shippingBar.loading}
                  sumPriceShipping={shippingBar.sumPriceShipping}
                  totalDelivery={shippingBar.totalDelivery}
                />

                {selectableGiftInfo.selectableGift?.availableGifts.length && (
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
          {bagInitialLoad && <SkeletonBagFooter />}
          {!bagInitialLoad
            && currentOrderForm
            && currentBagItems.length > 0 && (
              <BagFooter isProfileComplete={route.params.isProfileComplete} />
          )}
        </Box>
      </WithAvoidingView>

      <ToastProvider />
    </SafeAreaView>
  );
}
