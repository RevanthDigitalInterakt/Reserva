import { ExceptionProvider } from '../base/providers/ExceptionProvider';

const splitSellerName = (sellerName: string): string => {
  try {
    const [, sellerNameValue] = sellerName.split('=');
    const sellerFirstName = sellerNameValue ? sellerNameValue.split(' ')[0] : '';
    return sellerFirstName || '';
  } catch (error) {
    ExceptionProvider.captureException(error, "splitSellerName - splitSellerName.ts");
    return sellerName;
  }
};

export { splitSellerName };
