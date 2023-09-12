import type { ErrorResponse } from '@apollo/client/link/error';
import { refreshTokenMiddleware } from '../refreshTokenMiddleware';
import { navigateUsingRef } from '../../../../utils/navigationRef';
import { INVALID_AUTHORIZATION_ERROR } from '../../../utils/constants';
import { trackApolloError } from '../../../utils/trackApolloError';
import { onRefreshToken } from '../../../../zustand/useAuth/onRefreshToken';

jest.mock('../../../../zustand/useAuth/onRefreshToken', () => ({
  onRefreshToken: jest.fn(),
}));

jest.mock('../../../../utils/navigationRef', () => ({
  navigateUsingRef: jest.fn(),
}));

jest.mock('../../../utils/trackApolloError', () => ({
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
