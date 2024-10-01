import React from 'react';
import { render } from '@testing-library/react-native';
import CashBackBalance from '../CashBackBalance';
import { mockResponseCashBack } from '../../../__mocks__/mockResponseCashBack';

jest.mock('../../base/graphql/generated', () => ({
  useCashbackLazyQuery: () => [
    jest.fn(() => ({
      data: mockResponseCashBack,
    })),
  ],
}));

describe('CashBackBalance', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('should return match snapshot', () => {
    const { toJSON } = render(<CashBackBalance />);
    expect(toJSON()).toMatchSnapshot();
  });
});
