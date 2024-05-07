import { useCallback, useState } from 'react';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';
import { useVerifyDorisProductLazyQuery } from '../base/graphql/generated';

export function useDorisVerify() {
  const [isValidProductDoris, setIsValidProductDoris] = useState<boolean>(false);
  const [verifyDoris] = useVerifyDorisProductLazyQuery({
    context: { clientName: 'gateway' },
    fetchPolicy: 'no-cache',
  });

  const verifyProductDoris = useCallback(async (ean: string) => {
    try {
      const { data } = await verifyDoris({ variables: { ean } });

      if (!data) return;

      const { verifyDorisProduct } = data;
      setIsValidProductDoris(verifyDorisProduct.valid);
    } catch (error) {
      ExceptionProvider.captureException(error);
    }
  }, []);

  return { verifyProductDoris, isValidProductDoris };
}
