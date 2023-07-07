import { useCallback, useEffect } from 'react';
import { useBagStore } from '../useBagStore';
import { useCart } from '../../../context/CartContext';
import Sentry from '../../../config/sentryConfig';
import { setAsyncStorageItem } from '../../../hooks/useAsyncStorageProvider';

const useInitialBag = () => {
  const { orderForm } = useCart();
  const { actions } = useBagStore(['actions']);

  const handleInitializeBag = useCallback(async () => {
    if (!orderForm?.orderFormId) {
      Sentry.withScope((scope) => {
        const error = new Error('Bag invalid OrderForm');
        scope.setExtra('bag_orderForm', orderForm);
        Sentry.captureException(error);
      });

      return;
    }

    await setAsyncStorageItem('orderFormId', orderForm.orderFormId);

    actions.INITIAL_LOAD();
  }, [orderForm, actions]);

  useEffect(() => {
    handleInitializeBag();
  }, [handleInitializeBag]);
};

export default useInitialBag;
