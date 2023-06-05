import { Platform } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { Box, Button, Typography } from '@usereservaapp/reserva-ui';
import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import appsFlyer from 'react-native-appsflyer';
import analytics from '@react-native-firebase/analytics';
import { platformType } from '../../../../utils/platformType';
import { PriceCustom } from '../../../../modules/Checkout/components/PriceCustom';
import useBagStore from '../../../../zustand/useBagStore/useBagStore';
import {
  getAFContent,
  getAFContentId,
  getAFContentType,
  sumQuantity,
} from '../../../../utils/checkoutInitiatedEvents';
import EventProvider from '../../../../utils/EventProvider';
import { useOrderFormRefreshDataMutation } from '../../../../base/graphql/generated';
import { useCart } from '../../../../context/CartContext';
import { getBrands } from '../../../../utils/getBrands';
import { useAuthStore } from '../../../../zustand/useAuth/useAuthStore';

interface BagFooterParams {
  isProfileComplete: boolean
}
export default function BagFooter({ isProfileComplete }: BagFooterParams) {
  const {
    bagInfos,
    currentOrderForm,
    topBarLoading,
    installmentInfo,
    dispatch,
    getPriceWithDiscount,
  } = useBagStore();

  const { restoreCart } = useCart();

  const navigation = useNavigation();

  const [navigateToDeliveryDisable, setNavigateToDeliveryDisable] = useState<boolean>(false);
  const { profile } = useAuthStore(['profile']);

  const [refreshOrderForm, { loading: loadingRefresh }] = useOrderFormRefreshDataMutation({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const validateFieldsProfile = useCallback(() => {
    if (!profile) return false;

    if (
      profile?.firstName?.length === 0
      || profile?.firstName === null
      || profile?.lastName?.length === 0
      || profile?.lastName === null
      || profile?.birthDate?.length === 0
      || profile?.birthDate === null
      || profile?.homePhone?.length === 0
      || profile?.homePhone === null
      || profile?.document?.length === 0
      || profile?.document === null
      || profile?.gender?.length === 0
      || profile?.gender === null
    ) {
      return true;
    }
    return false;
  }, [profile]);

  const handleNavigateToDelivery = useCallback(async () => {
    setNavigateToDeliveryDisable(true);

    const { unavailableItems } = await dispatch({
      actionType: 'HANDLE_REMOVE_UNAVAILABLE_ITEMS',
      payload: { value: {} },
    });

    if (unavailableItems.error) {
      setNavigateToDeliveryDisable(false);
      return;
    }

    if (currentOrderForm?.items?.length) {
      try {
        const { items } = currentOrderForm;
        const { totalBagItemsPrice, totalBagDiscountPrice, totalBagDeliveryPrice } = bagInfos;

        if (items.length) {
          const newItems = items.map((item) => ({
            price: (item.price / 100) || 0,
            item_id: item.productId,
            quantity: item.quantity,
            item_name: item.name,
            item_variant: item.skuName,
            item_category: 'product',
          }));

          EventProvider.logEvent('begin_checkout', {
            coupon: '',
            currency: 'BRL',
            items: newItems,
            value: totalBagItemsPrice + totalBagDiscountPrice + totalBagDeliveryPrice,
            wbrand: getBrands(currentOrderForm.items),
          });
        }

        appsFlyer.logEvent('af_initiated_checkout', {
          af_content_type: 'product',
          af_price: totalBagItemsPrice + totalBagDiscountPrice + totalBagDeliveryPrice,
          af_currency: 'BRL',
          af_content_id: getAFContentId(currentOrderForm.items),
          af_quantity: sumQuantity(currentOrderForm.items),
          af_content: getAFContent(currentOrderForm.items),
        });

        const contentTypeItems = getAFContentType(currentOrderForm.items);
        const contentIdsItems = getAFContentId(currentOrderForm.items);

        await analytics().logEvent('checkout_initiated', {
          price: totalBagItemsPrice + totalBagDiscountPrice + totalBagDeliveryPrice,
          content_type: JSON.stringify(contentTypeItems),
          content_ids: JSON.stringify(contentIdsItems),
          currency: 'BRL',
          quantity: getAFContent(currentOrderForm.items),
        });
      } catch (error) {
        EventProvider.captureException(error);
      }

      if (!profile?.email) {
        await restoreCart(currentOrderForm.orderFormId);
        setNavigateToDeliveryDisable(false);
        navigation.navigate('Login', { comeFrom: 'Checkout', previousPage: 'BagScreen' });
        return;
      }

      const isEmptyProfile = validateFieldsProfile();

      if (isEmptyProfile && !isProfileComplete) {
        await restoreCart(currentOrderForm.orderFormId);
        setNavigateToDeliveryDisable(false);

        EventProvider.logEvent('complete_registration', {
          registration_method: 'email',
          custumer_email: profile?.email,
        });

        navigation.navigate('EditProfile', { isRegister: true });
      } else {
        try {
          const { data: refreshResponse } = await refreshOrderForm({
            variables: {
              input: { orderFormId: currentOrderForm.orderFormId },
            },
          });

          if (refreshResponse?.orderFormRefreshData.orderFormId) {
            await restoreCart(currentOrderForm.orderFormId);
            setNavigateToDeliveryDisable(false);
            navigation.navigate('DeliveryScreen', {});
            return;
          }

          throw new Error('Error on orderFormRefreshData [handleNavigateToDelivery]');
        } catch (error) {
          Sentry.withScope((scope) => {
            scope.setExtra('currentOrderForm', currentOrderForm);
            scope.addBreadcrumb({ message: 'Error [handleNavigateToDelivery]' });
            Sentry.captureException(error);
          });

          setNavigateToDeliveryDisable(false);
        }
      }
    }
  }, [
    navigation,
    profile?.email,
    isProfileComplete,
    currentOrderForm,
    bagInfos,
    dispatch,
    restoreCart,
    validateFieldsProfile,
    refreshOrderForm,
  ]);

  return (
    <Box
      width="100%"
      bg="white"
      height={145}
      px="xxs"
      style={{ elevation: Platform.OS === platformType.ANDROID ? 10 : 0 }}
      boxShadow={Platform.OS === platformType.ANDROID ? null : 'bottomBarShadow'}
    >
      <Box
        flexDirection="row"
        justifyContent="space-between"
        py="xxs"
      >
        <Box>
          <Typography fontFamily="nunitoRegular" fontSize={13}>
            Total:
          </Typography>

          <PriceCustom
            fontFamily="nunitoBold"
            sizeInterger={15}
            sizeDecimal={11}
            num={bagInfos.totalBagItemsPrice + bagInfos.totalBagDiscountPrice}
          />
        </Box>

        {bagInfos.totalBagItemsPrice > 0 && (
          <Box alignItems="flex-end">
            <Typography fontFamily="nunitoRegular" fontSize={13}>
              em até
            </Typography>
            <Box flexDirection="row">
              <Typography
                fontFamily="nunitoBold"
                fontSize={15}
                color="vermelhoRSV"
              >
                {installmentInfo.installmentsNumber}
                x de
                {' '}
              </Typography>

              <PriceCustom
                fontFamily="nunitoBold"
                color="vermelhoRSV"
                sizeInterger={15}
                sizeDecimal={11}
                num={getPriceWithDiscount({ calculateInstallments: true })}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Button
        disabled={
            !!(currentOrderForm && currentOrderForm?.items?.length === 0)
            || topBarLoading
            || navigateToDeliveryDisable
            || loadingRefresh
        }
        onPress={handleNavigateToDelivery}
        title="IR PARA ENTREGA"
        variant="primarioEstreito"
        inline
        testID="com.usereserva:id/bag_button_go_to_delivery"
      />
    </Box>
  );
}
