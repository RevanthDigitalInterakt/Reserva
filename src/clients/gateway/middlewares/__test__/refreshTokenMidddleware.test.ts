import type { ErrorResponse } from '@apollo/client/link/error';
import { INVALID_AUTHORIZATION_ERROR, refreshTokenMiddleware } from '../refreshTokenMidddleware';
import { trackApolloError } from '../../gatewayLink';
import { navigateUsingRef } from '../../../../utils/navigationRef';
import { onRefreshToken } from '../../../../zustand/useAuth/useAuthStore';

jest.mock('../../../../zustand/useAuth/useAuthStore', () => ({
  onRefreshToken: jest.fn(),
}));

jest.mock('../../../../utils/navigationRef', () => ({
  navigateUsingRef: jest.fn(),
}));

jest.mock('../../gatewayLink', () => ({
  trackApolloError: jest.fn(),
}));

describe('refreshTokenMidddleware', () => {
  it('should return "true" when there is no error', async () => {
    const input = {
      graphQLErrors: [],
      operation: {},
      response: {},
    } as unknown as ErrorResponse;

    const result = await refreshTokenMiddleware(input);

    expect(result).toBe(true);
  });

  it('should return "true" when there is no auth token error', async () => {
    const input = {
      graphQLErrors: [{ message: 'fake_error' }],
      operation: {},
      response: {},
    } as unknown as ErrorResponse;

    const result = await refreshTokenMiddleware(input);

    expect(result).toBe(true);
  });

  it('should return "true" when there is no auth token error', async () => {
    const input = {
      graphQLErrors: [{ message: 'fake_error' }],
      operation: {},
      response: {},
    } as unknown as ErrorResponse;

    const result = await refreshTokenMiddleware(input);

    expect(result).toBe(true);
  });

  it('should return "false" when there is auth token error on refreshToken request', async () => {
    const input = {
      graphQLErrors: [{ message: INVALID_AUTHORIZATION_ERROR }],
      operation: { operationName: 'refreshToken' },
      response: {},
    } as unknown as ErrorResponse;

    const result = await refreshTokenMiddleware(input);

    expect(result).toBe(false);
    expect(trackApolloError).toHaveBeenCalled();
    expect(navigateUsingRef).toHaveBeenCalled();
  });

  it('should return "true" when there is auth token error on a request', async () => {
    const input = {
      graphQLErrors: [{ message: INVALID_AUTHORIZATION_ERROR }],
      operation: { operationName: 'fake_operation' },
      response: {},
    } as unknown as ErrorResponse;

    const mockOnRefreshToken = onRefreshToken as jest.Mock<any, any>;
    mockOnRefreshToken.mockImplementationOnce(async () => true);

    const result = await refreshTokenMiddleware(input);

    expect(result).toBe(true);
    expect(onRefreshToken).toHaveBeenCalled();
  });

  it('should return "false" when OnRefreshToken fails', async () => {
    const input = {
      graphQLErrors: [{ message: INVALID_AUTHORIZATION_ERROR }],
      operation: { operationName: 'fake_operation' },
      response: {},
    } as unknown as ErrorResponse;

    const mockOnRefreshToken = onRefreshToken as jest.Mock<any, any>;
    mockOnRefreshToken.mockImplementationOnce(async () => false);

    const result = await refreshTokenMiddleware(input);

    expect(result).toBe(false);
    expect(onRefreshToken).toHaveBeenCalled();
  });
});
