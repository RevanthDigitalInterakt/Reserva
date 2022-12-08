import * as Sentry from '@sentry/react-native';
import { checkoutInstance } from '../config/checkoutConfig';
import { OrderForm, Item } from "../context/CartContext";

type TActiveCheckoutGift = {
  id: string;
}

export const checkoutService = {
  setPaymentMethod: async (
    orderFormId: string,
    value: number,
    accountId: string,
    installments: number,
    interestRate: number
  ) => {
    try {
      const response = await checkoutInstance.post(
        `${orderFormId}/attachments/paymentData`,
        {
          payments: [
            {
              paymentSystem: '4',
              bin: '537435',
              accountId,
              tokenId: null,
              installments,
              referenceValue: value,
              value: value,
              merchantSellerPayments: [
                {
                  id: 'LOJAUSERESERVA',
                  installments,
                  referenceValue: value,
                  value: value,
                  interestRate,
                  installmentValue: value,
                },
              ],
            },
          ],
          giftCards: [],
        }
      );

      return response;
    } catch (error) {
      Sentry.captureException(error);
    }
  },

  transaction: async (
    orderFormId: string,
    value: number,
    interestValue: number,
    savePersonalData: boolean,
    optinNewsLetter: boolean
  ) => {
    try {
      const response = await checkoutInstance.post(
        `/transaction/${orderFormId}/transaction?sc=4`,
        {
          referenceId: orderFormId,
          value: value,
          referenceValue: value,
          savePersonalData,
          optinNewsLetter,
          interestValue,
        }
      );
      return response;
    } catch (error) {
      Sentry.captureException(error);
    }
  },

  paymentGetway: async (
    transactionId: string,
    orderGroup: string,
    value: string,
    interestRate: number,
    installments: number
  ) => {
    try {
      const response = await checkoutInstance.get(
        `https://lojausereserva.vtexpayments.com.br/api/pub/transactions/${transactionId}/payments?orderId=${value}&redirect=false&callbackUrl=https%3A%2F%2Fwww.usereserva.com%2Fcheckout%2FgatewayCallback%2F${orderGroup}%2F%7BmessageCode%7D&macId=f056cea2-e01b-4572-8c3d-2a58acbf0085&sessionId=a23041b6-c669-4494-8722-2aa8b9d07f22&deviceInfo=c3c9MjU2MCZzaD0xMDgwJmNkPTI0JnR6PTE4MCZsYW5nPXB0LUJSJmphdmE9ZmFsc2Umc291cmNlQXBwbGljYXRpb249dmNzLmNoZWNrb3V0LXVpQHY2LjQ5LjUmaW5zdGFsbGVkQXBwbGljYXRpb25zPVsicGl4LXBheW1lbnQiXQ==`,
        {
          data: [
            {
              paymentSystem: 125,
              paymentSystemName: 'Pix',
              group: 'instantPaymentPaymentGroup',
              installments,
              installmentsInterestRate: 0,
              installmentsValue: value,
              value: value,
              referenceValue: value,
              id: 'LOJAUSERESERVA',
              interestRate,
              installmentValue: value,
              transaction: {
                id: transactionId,
                merchantName: 'LOJAUSERESERVA',
              },
              currencyCode: 'BRL',
              originalPaymentIndex: 0,
            },
          ],
        }
      );

      return response;
    } catch (error) {
      Sentry.captureException(error);
    }
  },
  getPixCode: async (orderGroup: string) => {
    try {
      const response = await checkoutInstance.get(
        `https://www.usereserva.com/api/checkout/pub/gatewayCallback/${orderGroup}`
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  },

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
        }
      );
    } catch (error) {
      Sentry.captureException(error);
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
        }
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  },

  setGiftSize: async (
    uniqueId: string,
    giftId: string
  ) => {
    try {
      const response = await checkoutInstance.post(
        `/pub/orderForm/${uniqueId}/selectable-gifts/${giftId}`,
        {},
      );
    } catch (error) {
      Sentry.captureException(error);
    }
  },
};
