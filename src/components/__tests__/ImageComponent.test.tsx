/* eslint-disable global-require */
import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ImageComponent from '../ImageComponent/ImageComponent';

describe('ImageComponent', () => {
  it('should match with the snapshot', async () => {
    const Component = (
      <ImageComponent
        source={require('../../../assets/common/banner-login.png')}
      />
    );

    const { toJSON } = await waitFor(() => render(Component));
    expect(toJSON()).toMatchSnapshot();
  });
});
