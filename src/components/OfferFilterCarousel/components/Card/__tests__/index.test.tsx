import React from 'react';
import { render } from '@testing-library/react-native';
import { Card } from '..';
import testProps from '../../../../../utils/testProps';

jest.mock('../../../../../zustand/useBagStore/useBagStore', () => ({
  useBagStore: () => ({
    orderformId: '123',
  }),
}));

const offers = [
  {
    info: '56',
    imageUrl: 'https://google.com.br',
    collectionId: '123',
    title: 'test 1',
  },
  {
    info: '57',
    imageUrl: 'https://google.com.br',
    collectionId: '321',
    title: 'test 2',
  },
];

describe('Explore By Price - Card', () => {
  it.skip('should display price title', () => {
    const root = render(<Card prefix="" title={offers[0]?.title!} imageUrl={offers[0]?.imageUrl!} info={offers[0]?.info!} />);
    const title = root.getByText(offers[0]?.info!);
    expect(root).toBeDefined();
    expect(title).toBeDefined();
  });

  it('should use imageUrl', () => {
    const root = render(<Card prefix="" title={offers[1]?.title!} imageUrl={offers[1]?.imageUrl!} info={offers[1]?.info!} />);
    const imageBackgroundComponent = root.getByTestId(testProps('imageBackground').testID);
    expect(imageBackgroundComponent.props?.source.uri).toBe(offers[0]?.imageUrl!);
  });
});
