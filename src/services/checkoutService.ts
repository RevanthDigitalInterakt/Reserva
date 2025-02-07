import { checkoutInstance } from '../config/checkoutConfig';
import { ExceptionProvider } from '../base/providers/ExceptionProvider';

type TActiveCheckoutGift = {
  id: string;
};

// TODO usado apenas pela bag antiga, remover isso quando limpar código na antiga bag
export const checkoutService = {
  activeGiftWrapping: async (
    orderID: string,
    indexDoItems: number,
    payload: TActiveCheckoutGift,
    cookie?: string,
  ) => {
    try {
      await checkoutInstance.post(
        `https://app-vtex.usereserva.com/api/checkout/pub/orderForm/${orderID}/items/${indexDoItems}/offerings`,
        payload,
        {
          headers: {
            Cookie: cookie,
          },
        },
      );
    } catch (error) {
      ExceptionProvider.captureException(error, "activeGiftWrapping - checkoutService.ts");
    }
  },

  removeGiftWrapping: async (
    orderID: string,
    indexDoItems: number,
    idDoItem: string,
    cookie?: string,
  ) => {
    try {
      await checkoutInstance.post(
        `https://app-vtex.usereserva.com/api/checkout/pub/orderForm/${orderID}/items/${indexDoItems}/offerings/${idDoItem}/remove`,
        {
          headers: {
            Cookie: cookie,
          },
        },
      );
    } catch (error) {
      ExceptionProvider.captureException(error, "removeGiftWrapping - checkoutService.ts");
    }
  },
};
