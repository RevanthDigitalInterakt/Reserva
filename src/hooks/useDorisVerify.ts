import { useCallback, useState } from 'react';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { useVerifyDorisProductLazyQuery } from '../base/graphql/generated';
// import { useRemoteConfig } from './useRemoteConfig';

export function useDorisVerify() {
  // const { getBoolean } = useRemoteConfig();
  const [isValidProductDoris, setIsValidProductDoris] = useState<boolean>(false);
  // const showDorisButton = useMemo(() => getBoolean('show_doris_button'), []);
  const [verifyDoris] = useVerifyDorisProductLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const verifyProductDoris = useCallback(async (ean: string) => {
    try {
      // if (!showDorisButton) return;
      const { data } = await verifyDoris({ variables: { ean } });
      if (!data) return;

      const { verifyDorisProduct } = data;
      setIsValidProductDoris(verifyDorisProduct.valid);
    } catch (error) {
      ExceptionProvider.captureException(error, "verifyProductDoris - useDorisVerify.ts", { ean });
    }
  }, []);

  return { verifyProductDoris, isValidProductDoris };
}
