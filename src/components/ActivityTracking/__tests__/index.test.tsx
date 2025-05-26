// ... imports ...
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';
import React from 'react';
import { ActivityTracking } from '..';

jest.mock('react-native-tracking-transparency', () => ({
  getTrackingStatus: jest.fn(),
  requestTrackingPermission: jest.fn(),
}));

const mockGetTrackingStatus = getTrackingStatus as jest.Mock;
const mockRequestTrackingPermission = requestTrackingPermission as jest.Mock;

describe('ActivityTracking', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    mockGetTrackingStatus.mockResolvedValue('not-determined');
    mockRequestTrackingPermission.mockResolvedValue('not-determined');
    const root = render(<ActivityTracking />);
    await waitFor(() => {
      expect(root.queryByTestId('com.usereserva:id/activityTracking')).toBeTruthy();
    });
  });

  it('should not render if tracking status is denied', async () => {
    mockGetTrackingStatus.mockResolvedValue('denied');
    mockRequestTrackingPermission.mockResolvedValue('denied');
    const root = render(<ActivityTracking />);
    await waitFor(() => {
      expect(root.queryByTestId('com.usereserva:id/activityTracking')).toBeNull();
    });
  });

  it('should not render if tracking status is authorized', async () => {
    mockGetTrackingStatus.mockResolvedValue('authorized');
    mockRequestTrackingPermission.mockResolvedValue('authorized');
    const root = render(<ActivityTracking />);
    await waitFor(() => {
      expect(root.queryByTestId('com.usereserva:id/activityTracking')).toBeNull();
    });
  });

  it('should render ios privacy infos if tracking status is not-determined', async () => {
    mockGetTrackingStatus.mockResolvedValue('not-determined');
    mockRequestTrackingPermission.mockResolvedValue('not-determined');
    const root = render(<ActivityTracking />);
    await waitFor(() => {
      expect(root.queryByTestId('com.usereserva:id/activityTracking')).toBeTruthy();
      expect(root.queryByTestId('com.usereserva:id/info-1')).toBeTruthy();
      expect(root.queryByTestId('com.usereserva:id/info-2')).toBeTruthy();
    });
  });

  it('should close ios privacy infos on continue button click', async () => {
    mockGetTrackingStatus.mockResolvedValue('not-determined');
    mockRequestTrackingPermission.mockResolvedValue('not-determined');

    const root = render(<ActivityTracking />);
    const continueButton = await root.findByTestId('com.usereserva:id/continueButton');
    fireEvent.press(continueButton);
    await waitFor(() => {
      expect(root.queryByTestId('com.usereserva:id/activityTracking')).toBeNull();
    });
  });
});
