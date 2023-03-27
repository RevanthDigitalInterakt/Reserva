import EventProvider from './EventProvider';

const splitSellerName = (sellerName: string): string => {
  try {
    const [, sellerNameValue] = sellerName.split('=');
    const sellerFirstName = sellerNameValue ? sellerNameValue.split(' ')[0] : '';
    return sellerFirstName || '';
  } catch (error) {
    EventProvider.captureException(error);
    return sellerName;
  }
};

export { splitSellerName };
