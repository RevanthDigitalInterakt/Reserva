import '@testing-library/jest-native/extend-expect';

import React from 'react';
import {
  render, screen, fireEvent, act,
} from '@testing-library/react-native';
import { ThemeProvider } from 'styled-components/native';

import { launchCamera } from 'react-native-image-picker';
import ChangeFileModal from '../ChangeFileModal';
import { theme } from '../../../../../base/usereservappLegacy/theme';

const launchImageLibraryMockResponse = {
  didCancel: false,
  errorCode: null,
  errorMessage: null,
  assets: [{
    base64: 'base64',
    uri: 'foo://example.com:8042/over/there?name=ferret#nose',
    width: 200,
    height: 300,
    fileSize: 12000,
    type: 'myType',
    fileName: 'testFileName',
    duration: 123,
    bitrate: 120000,
    timestamp: '',
    id: '123',
  }],
};

jest.mock('../helpers/permissions', () => ({
  requestCameraPermission: () => Promise.resolve(true),
  requestExternalWritePermission: () => Promise.resolve(true),
}));

jest.mock('react-native-image-picker', () => ({
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn((_file, callback) => callback(
    launchImageLibraryMockResponse,
  )),
}));

const onToggleModal = jest.fn();
const onHandleChangeFile = jest.fn();

const TestingComponent = (
  <ThemeProvider theme={theme}>
    <ChangeFileModal
      show
      toggleModal={onToggleModal}
      handleChangeFile={onHandleChangeFile}
      handleDeleteProfileImage={jest.fn()}
    />
  </ThemeProvider>
);

describe('ChangeFileModal', () => {
  beforeEach(() => {
    render(TestingComponent);
  });

  it.skip('renders without error and match snapshot', () => {
    expect(screen.getByTestId('com.usereserva:id/changefilemodal_container')).toBeVisible();
    expect(screen.toJSON()).toMatchSnapshot();
  });

  it.skip('should try to pick image from gallery and camera', async () => {
    await act(async () => {
      await fireEvent.press(screen.getByTestId('com.usereserva:id/changefilemodal_button_gallery'));
      await fireEvent.press(screen.getByTestId('com.usereserva:id/changefilemodal_button_camera'));
    });

    expect(onHandleChangeFile).toHaveBeenCalledWith({
      initialFilePath: undefined,
      name: 'testFileName',
      type: 'image/jpeg',
      uri: 'foo://example.com:8042/over/there?name=ferret#nose',
    });

    expect(launchCamera).toHaveBeenCalledTimes(1);
    expect(onToggleModal).toHaveBeenCalledTimes(2);
  });
});
