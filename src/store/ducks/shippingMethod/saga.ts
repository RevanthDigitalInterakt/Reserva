import axios from 'axios';
import { call, put } from 'redux-saga/effects';
import { action } from 'typesafe-actions';

// import { api } from '../../../services/api';
import { loadSuccess, loadFailure } from './actions';
import { ShippingMethodTypes, ShippingMethod } from './types';

const apiShippingMethod =
  'https://www.usereserva.com/ccstorex/custom/v1/public/api-prd/occ-order-shipping/quote';

export function* loadShippingMethodsRequest({ payload }: any) {
  const { cep } = payload;

  const requestApiBody = {
    request: {
      secondaryCurrencyCode: null,
      address: {
        lastName: '',
        country: 'BR',
        firstName: '',
        address2: 'Jardim Marilândia',
        address1: 'Rua Bonfinópolis',
        postalCode: cep,
        state: 'ES',
      },
      appliedCoupons: [],
      exchangeRate: null,
      orderDiscount: 0,
      siteId: 'siteUS',
      locale: {
        country: 'BR',
        displayName: 'Portuguese (Brazil)',
        language: 'pt',
      },
      rawOrderTotal: 0,
      currencyCode: 'BRL',
      orderTotal: 0,
      order: null,
      items: [
        {
          amount: 79,
          product: { weight: 0.25, id: '0030617' },
          quantity: 1,
          catalogRefId: '003061704001',
        },
      ],
    },
    order: {
      shoppingCart: {
        items: [
          {
            productId: '0030617',
            dynamicProperties: [
              {
                id: 'rsvOnDemandTimeCD',
                label: 'rsvOnDemandTimeCD',
                value: null,
              },
              {
                id: 'rsvOnDemandTimeProduction',
                label: 'rsvOnDemandTimeProduction',
                value: null,
              },
              {
                id: 'rsv_DataPreVenda',
                label: 'rsv_DataPreVenda',
                value: null,
              },
            ],
          },
        ],
      },
      dynamicProperties: [
        { id: 'rsvOnDemandDays', label: 'rsvOnDemandDays', value: 1 },
        {
          id: 'down_admin',
          label: 'Tag para pedidos fechados durante queda do admin',
          value: false,
        },
      ],
    },
  };

  try {
    const { data } = yield call(axios.post, apiShippingMethod, requestApiBody);

    yield put(loadSuccess(data));
  } catch (err) {
    yield put(loadFailure());
  }
}
