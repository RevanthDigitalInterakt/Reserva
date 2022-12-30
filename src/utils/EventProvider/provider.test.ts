import React from 'react';

import EventProvider from '.';
import { EventValueOptions, eventsValue } from './misc';

// const spyLogEvent = spyOn(EventProvider, 'logEvent');

jest.mock('react-native-onesignal', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  inFocusDisplaying: jest.fn()
}));

jest.mock('react-native-appsflyer', () => ({
  logEvent: jest.fn(),
}));

jest.mock('@react-native-firebase/analytics', () => () => ({
  logEvent: jest.fn(),
}));

describe('Event Provider', () => {
  it('Should be able to transform analytics object into AppsFlyer object', () => {
    const expectedObject = {
      af_search_string: "",
      af_content_list: "",
    };
    const objectToTransform: EventValueOptions = {
      search_ids: "",
      search_string: "",
    } as EventValueOptions;

    const transformed = EventProvider.parseValues(objectToTransform);

    expect(transformed).toMatchObject(expectedObject);
  });

  it('Should be able to call logEvent method', () => {
    const logEventSpy = spyOn(EventProvider, 'logEvent');

    EventProvider.logEvent('complete_registration', {
      registration_method: 'email',
    } as EventValueOptions);

    expect(logEventSpy).toHaveBeenCalled();
  });

  it('Should be able to call captureException method', () => {
    const captureExceptionSpy = spyOn(EventProvider, 'captureException');

    EventProvider.captureException(new Error('Somenthing exception'));

    expect(captureExceptionSpy).toHaveBeenCalled();
  });
});
