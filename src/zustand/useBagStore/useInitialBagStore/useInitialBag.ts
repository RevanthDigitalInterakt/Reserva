import { useCallback, useEffect } from 'react';
import { useBagStore } from '../useBagStore';
import { useCart } from '../../../context/CartContext';
import { setAsyncStorageItem } from '../../../hooks/useAsyncStorageProvider';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { usePageLoadingStore } from '../../usePageLoadingStore/usePageLoadingStore';

const useInitialBag = () => {
  const { orderForm } = useCart();
  const { actions, topBarLoading } = useBagStore(['actions', 'topBarLoading']);
  const { onFinishLoad } = usePageLoadingStore(['onFinishLoad']);

  const handleInitializeBag = useCallback(async () => {
    if (!orderForm?.orderFormId) {
      ExceptionProvider.captureException(
        new Error('Bag invalid OrderForm'),
        { orderForm },
      );

      return;
    }

    await setAsyncStorageItem('orderFormId', orderForm.orderFormId);

    actions.INITIAL_LOAD();
  }, [orderForm, actions]);

  useEffect(() => {
    handleInitializeBag();
  }, [handleInitializeBag]);

  useEffect(() => {
    if (!topBarLoading) {
      onFinishLoad();
    }
  }, [topBarLoading, onFinishLoad]);
};

export default useInitialBag;
