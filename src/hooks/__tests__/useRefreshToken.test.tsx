import { act, renderHook } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { MockedProvider } from '@apollo/client/testing';
import useRefreshToken from '../useRefreshToken';
import CartContextProvider from '../../context/CartContext';
import AuthContextProvider from '../../context/AuthContext';
import useAsyncStorageProvider from '../useAsyncStorageProvider';
import { RefreshTokenDocument as refreshTokenQuery } from '../../base/graphql/generated';

const mockResponseRefreshToken = {
  data: {
    refreshToken:
      {
        authCookie: 'VtexIdclientAutCookie_lojausereserva=eyJhbGciOiJFUzI1NiIsImtpZCI6Ijg5MTFCRjhBOTgwOTVDQkVDOUE5MERGRjdBNjY1MTcwQ0NCMTBBNkUiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJjbGVpYmVyLnJlaXNAZ2xvYmFsc3lzLmNvbS5iciIsImFjY291bnQiOiJsb2phdXNlcmVzZXJ2YXFhIiwiYXVkaWVuY2UiOiJ3ZWJzdG9yZSIsImV4cCI6MTY4MzkyNDIwMiwidXNlcklkIjoiMzE2NDM4ZTktZDgyNS00NGQyLThmMGEtOTRjZWVhNzY4ZWEzIiwiaWF0IjoxNjgzODM3ODAyLCJmbGFnIjoib2F1dGhfdnRleGRvbWFpbiIsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiJlMDAwOTZmNS1jNjk1LTQxZGMtOTMyYy1hNjc1NTgxMmQzZDAifQ.lnQcddBrwegSgNXZFcej0nOQ7dxRC4maNJtrdB3Y4aPl_BxyMOnHtTrG_FH3tRKDmPUiTVNMUnI6awGxNYekLQ',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY5MzIyYTEwLWQwZTUtNDc5MC04MTA0LTVlMTlmMjU3YzI5MyIsImVtYWlsIjoiY2xlaWJlci5yZWlzQGdsb2JhbHN5cy5jb20uYnIiLCJjb29raWVzIjpbIlZ0ZXhJZGNsaWVudEF1dENvb2tpZV9sb2phdXNlcmVzZXJ2YT1leUpoYkdjaU9pSkZVekkxTmlJc0ltdHBaQ0k2SWpnNU1URkNSamhCT1Rnd09UVkRRa1ZET1VFNU1FUkdSamRCTmpZMU1UY3dRME5DTVRCQk5rVWlMQ0owZVhBaU9pSnFkM1FpZlEuZXlKemRXSWlPaUpqYkdWcFltVnlMbkpsYVhOQVoyeHZZbUZzYzNsekxtTnZiUzVpY2lJc0ltRmpZMjkxYm5RaU9pSnNiMnBoZFhObGNtVnpaWEoyWVhGaElpd2lZWFZrYVdWdVkyVWlPaUozWldKemRHOXlaU0lzSW1WNGNDSTZNVFk0TXpreU5ESXdNaXdpZFhObGNrbGtJam9pTXpFMk5ETTRaVGt0WkRneU5TMDBOR1F5TFRobU1HRXRPVFJqWldWaE56WTRaV0V6SWl3aWFXRjBJam94Tmpnek9ETTNPREF5TENKbWJHRm5Jam9pYjJGMWRHaGZkblJsZUdSdmJXRnBiaUlzSW1semN5STZJblJ2YTJWdUxXVnRhWFIwWlhJaUxDSnFkR2tpT2lKbE1EQXdPVFptTlMxak5qazFMVFF4WkdNdE9UTXlZeTFoTmpjMU5UZ3hNbVF6WkRBaWZRLmxuUWNkZEJyd2VnU2dOWFpGY2VqMG5PUTdkeFJDNG1hTkp0cmRCM1k0YVBsX0J4eU1Pbkh0VHJHX0ZIM3RSS0RtUFVpVFZOTVVuSTZhd0d4Tllla0xRIiwicmVmcmVzaFRva2VuPTAxZDcxMGI5LTQ0NzktNGRlMC04ODcwLTNlODA0ZDM3YjVmYTtleHBpcmVzPVN1biwgMDUgTWF5IDIwMjQgMjA6NDM6MjIgR01UO3BhdGg9LyJdLCJzYyI6NCwiaWF0IjoxNjgzODM3ODAyLCJleHAiOjE3MTUzOTU0MDJ9.7oy0i2MzrB-Lyf1yv4htu9bB89WmDHQMc9IRfEiVL1Y',
      },
  },
};

const mocks = [
  {
    request: {
      query: refreshTokenQuery,
    },
    result: {
      data: {
        refreshToken:
          {
            authCookie: 'VtexIdclientAutCookie_lojausereserva=eyJhbGciOiJFUzI1NiIsImtpZCI6Ijg5MTFCRjhBOTgwOTVDQkVDOUE5MERGRjdBNjY1MTcwQ0NCMTBBNkUiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJjbGVpYmVyLnJlaXNAZ2xvYmFsc3lzLmNvbS5iciIsImFjY291bnQiOiJsb2phdXNlcmVzZXJ2YXFhIiwiYXVkaWVuY2UiOiJ3ZWJzdG9yZSIsImV4cCI6MTY4MzkyNDIwMiwidXNlcklkIjoiMzE2NDM4ZTktZDgyNS00NGQyLThmMGEtOTRjZWVhNzY4ZWEzIiwiaWF0IjoxNjgzODM3ODAyLCJmbGFnIjoib2F1dGhfdnRleGRvbWFpbiIsImlzcyI6InRva2VuLWVtaXR0ZXIiLCJqdGkiOiJlMDAwOTZmNS1jNjk1LTQxZGMtOTMyYy1hNjc1NTgxMmQzZDAifQ.lnQcddBrwegSgNXZFcej0nOQ7dxRC4maNJtrdB3Y4aPl_BxyMOnHtTrG_FH3tRKDmPUiTVNMUnI6awGxNYekLQ',
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY5MzIyYTEwLWQwZTUtNDc5MC04MTA0LTVlMTlmMjU3YzI5MyIsImVtYWlsIjoiY2xlaWJlci5yZWlzQGdsb2JhbHN5cy5jb20uYnIiLCJjb29raWVzIjpbIlZ0ZXhJZGNsaWVudEF1dENvb2tpZV9sb2phdXNlcmVzZXJ2YT1leUpoYkdjaU9pSkZVekkxTmlJc0ltdHBaQ0k2SWpnNU1URkNSamhCT1Rnd09UVkRRa1ZET1VFNU1FUkdSamRCTmpZMU1UY3dRME5DTVRCQk5rVWlMQ0owZVhBaU9pSnFkM1FpZlEuZXlKemRXSWlPaUpqYkdWcFltVnlMbkpsYVhOQVoyeHZZbUZzYzNsekxtTnZiUzVpY2lJc0ltRmpZMjkxYm5RaU9pSnNiMnBoZFhObGNtVnpaWEoyWVhGaElpd2lZWFZrYVdWdVkyVWlPaUozWldKemRHOXlaU0lzSW1WNGNDSTZNVFk0TXpreU5ESXdNaXdpZFhObGNrbGtJam9pTXpFMk5ETTRaVGt0WkRneU5TMDBOR1F5TFRobU1HRXRPVFJqWldWaE56WTRaV0V6SWl3aWFXRjBJam94Tmpnek9ETTNPREF5TENKbWJHRm5Jam9pYjJGMWRHaGZkblJsZUdSdmJXRnBiaUlzSW1semN5STZJblJ2YTJWdUxXVnRhWFIwWlhJaUxDSnFkR2tpT2lKbE1EQXdPVFptTlMxak5qazFMVFF4WkdNdE9UTXlZeTFoTmpjMU5UZ3hNbVF6WkRBaWZRLmxuUWNkZEJyd2VnU2dOWFpGY2VqMG5PUTdkeFJDNG1hTkp0cmRCM1k0YVBsX0J4eU1Pbkh0VHJHX0ZIM3RSS0RtUFVpVFZOTVVuSTZhd0d4Tllla0xRIiwicmVmcmVzaFRva2VuPTAxZDcxMGI5LTQ0NzktNGRlMC04ODcwLTNlODA0ZDM3YjVmYTtleHBpcmVzPVN1biwgMDUgTWF5IDIwMjQgMjA6NDM6MjIgR01UO3BhdGg9LyJdLCJzYyI6NCwiaWF0IjoxNjgzODM3ODAyLCJleHAiOjE3MTUzOTU0MDJ9.7oy0i2MzrB-Lyf1yv4htu9bB89WmDHQMc9IRfEiVL1Y',
          },
      },
    },
  },
];

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <MockedProvider mocks={mocks}>
    <CartContextProvider>
      <AuthContextProvider>
        {children}
      </AuthContextProvider>
    </CartContextProvider>
  </MockedProvider>
);

describe('useRefreshToken test', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should start hook called and check token', async () => {
    const { result } = renderHook(() => useRefreshToken(), { wrapper });

    let token;
    await act(async () => {
      await AsyncStorage.getItem('@RNAuth:Token');
      token = await result.current.refreshToken();
    });

    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(1, '@RNAuth:Token');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(2, '@RNAuth:RSAKey');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(3, '@RNAuth:cookie');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(4, '@RNAuth:cookie');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(5, '@RNAuth:email');
    expect(AsyncStorage.getItem).toHaveBeenNthCalledWith(6, '@RNAuth:Token');

    expect(token).toEqual(mockResponseRefreshToken);
  });

  it('should check verifyRefreshTime function when need to call refresh token function', async () => {
    const { result } = renderHook(() => useRefreshToken(), { wrapper });
    const { setItem } = useAsyncStorageProvider();
    const nextRefreshTime = 1684183722115;
    let token;

    await act(async () => {
      await setItem('@RNAuth:NextRefreshTime', nextRefreshTime);
      token = await result.current.refreshToken();
    });
    const response = await result.current.verifyRefreshTime();

    const err = result.error?.message;

    expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(1, '@RNAuth:NextRefreshTime', `${nextRefreshTime}`);
    expect(token).toEqual(mockResponseRefreshToken);
    expect(response).toEqual(false);
    expect(err).toBeUndefined();
  });

  it('should check verifyRefreshTime function when not need to call refresh token function', async () => {
    const { result } = renderHook(() => useRefreshToken(), { wrapper });
    const { setItem } = useAsyncStorageProvider();

    const date = new Date();
    date.setDate(date.getDate() + 1);
    const timeNow = date.getTime();
    await act(async () => {
      await setItem('@RNAuth:NextRefreshTime', timeNow);
    });

    const response = await result.current.verifyRefreshTime();
    expect(AsyncStorage.setItem).toHaveBeenNthCalledWith(1, '@RNAuth:NextRefreshTime', `${timeNow}`);
    expect(AsyncStorage.setItem).toHaveBeenCalledTimes(1);
    expect(response).toEqual(false);
  });
});
