import OneSignal from 'react-native-onesignal';
import EventProvider from '.';
import type { EventValueOptions } from './misc';
import { ExceptionProvider } from '../../base/providers/ExceptionProvider';

describe('Event Provider', () => {
  it('Should be able to transform analytics object into AppsFlyer object', () => {
    const expectedObject = {
      af_search_string: '',
      af_content_list: '',
    };
    const objectToTransform: EventValueOptions = {
      search_ids: '',
      search_string: '',
    } as EventValueOptions;

    const transformed = EventProvider.parseValues(objectToTransform);

    expect(transformed).toMatchObject(expectedObject);
  });

  it('Should be able to call logEvent method', () => {
    const logEventSpy = jest.spyOn(EventProvider, 'logEvent');

    EventProvider.logEvent('complete_registration', {
      method: 'email',
    } as EventValueOptions);

    expect(logEventSpy).toHaveBeenCalled();
  });

  it('Should be able to call captureException method', () => {
    const captureExceptionSpy = jest.spyOn(ExceptionProvider, 'captureException');

    ExceptionProvider.captureException(new Error('Somenthing exception'), "JsName");

    expect(captureExceptionSpy).toHaveBeenCalled();
  });

  it('Should be able to call sendPushTags method', () => {
    const timestamp = Math.floor(Date.now() / 1000);
    EventProvider.sendPushTags('sendLastOrderData', {
      last_purchase_date: timestamp.toString(),
      last_order_value: '100',
      total_orders_value: '150',
    });

    expect(OneSignal.sendTags).toHaveBeenCalledWith({ last_purchase_date: timestamp.toString(), last_order_value: '100', total_orders_value: '150' });
  });

  it('Should be able to call setPushExternalUserId method', () => {
    EventProvider.setPushExternalUserId('email');

    expect(OneSignal.setExternalUserId).toBeCalledWith('email');
  });

  it('Should be able to call getPushTags method', () => {
    const mockCallback = jest.fn();

    EventProvider.getPushTags(mockCallback);

    expect(mockCallback).toHaveBeenCalledWith({ tag: 'value' });
  });

  it('Should be able to call getPushDeviceState method', () => {
    EventProvider.getPushDeviceState();
    expect(OneSignal.getDeviceState).toHaveBeenCalledTimes(1);
  });
  it('Should be able to call removePushExternalUserId method', () => {
    EventProvider.removePushExternalUserId();
    expect(OneSignal.removeExternalUserId).toHaveBeenCalledTimes(1);
  });
});
