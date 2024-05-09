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

const Component = (
  <CashBackBalance />
);

describe('CashBackBalance', () => {
  it('should return match snapshot', () => {
    const { toJSON } = render(Component);

    expect(toJSON()).toMatchSnapshot();
  });
  // TODO more test cases
});
