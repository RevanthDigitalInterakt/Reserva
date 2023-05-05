import { useCallback, useEffect } from 'react';
import useBagStore from '../useBagStore';
import { useCart } from '../../../context/CartContext';
import Sentry from '../../../config/sentryConfig';

const useInitialBag = () => {
  const { orderForm } = useCart();
  const { dispatch } = useBagStore();

  const handleInitializeBag = useCallback(() => {
    if (!orderForm) {
      Sentry.withScope((scope) => {
        const error = new Error('Bag invalid OrderForm');
        scope.setExtra('bag_orderForm', orderForm);
        Sentry.captureException(error);
      });

      return;
    }

    dispatch({
      actionType: 'INITIAL_SET_ORDER_FORM',
      payload: {
        value: {
          orderForm,
        },
      },
    });
  }, [orderForm, dispatch]);

  useEffect(() => {
    handleInitializeBag();
  }, [handleInitializeBag]);
};

export default useInitialBag;
