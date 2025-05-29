import { useCallback, useEffect } from 'react';
import { useBagStore } from '../useBagStore';
import { setAsyncStorageItem } from '../../../hooks/useAsyncStorageProvider';
import { ExceptionProvider } from '../../../base/providers/ExceptionProvider';
import { usePageLoadingStore } from '../../usePageLoadingStore/usePageLoadingStore';

const useInitialBag = () => {
  const { actions, topBarLoading, orderFormId } = useBagStore(['actions', 'topBarLoading', 'orderFormId']);
  const { onFinishLoad, startLoadingTime } = usePageLoadingStore(['onFinishLoad', 'startLoadingTime']);

  const handleInitializeBag = useCallback(async () => {
    if (!orderFormId) {
      ExceptionProvider.captureException(
        new Error('orderFormId not found'),
        "handleInitializeBag - useInitialBag.ts"
      );

      return;
    }

    await setAsyncStorageItem('orderFormId', orderFormId);

    actions.INITIAL_LOAD();
  }, [orderFormId, actions]);

  useEffect(() => {
    handleInitializeBag();
  }, [handleInitializeBag]);

  useEffect(() => {
    if (!topBarLoading && startLoadingTime > 0) {
      onFinishLoad();
    }
  }, [topBarLoading, onFinishLoad, startLoadingTime]);
};

export default useInitialBag;
