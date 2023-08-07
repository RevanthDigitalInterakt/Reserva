import { useCallback, useEffect } from 'react';
import { useBagStore } from '../useBagStore';
import { useCart } from '../../../context/CartContext';
import { setAsyncStorageItem } from '../../../hooks/useAsyncStorageProvider';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';

const useInitialBag = () => {
  const { orderForm } = useCart();
  const { actions } = useBagStore(['actions']);

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
};

export default useInitialBag;
