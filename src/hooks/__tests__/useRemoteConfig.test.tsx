import { renderHook } from '@testing-library/react-hooks';
import remoteConfig from '@react-native-firebase/remote-config';
import { defaults, useRemoteConfig } from '../useRemoteConfig';

describe('useRemoteConfig test', () => {
  it('should successfully fetch initial data', async () => {
    const { result } = renderHook(() => useRemoteConfig());

    const instance = remoteConfig();
    await result.current.fetchInitialData(instance);

    expect(instance.setDefaults).toHaveBeenCalledWith(defaults);
    expect(instance.setConfigSettings).toHaveBeenCalled();
    expect(instance.fetchAndActivate).toHaveBeenCalled();
  });

  it('should get boolean value', async () => {
    const { result } = renderHook(() => useRemoteConfig());

    const instance = remoteConfig();
    await result.current.fetchInitialData(instance);

    const res = result.current.getBoolean('balance_cashback_in_app');

    expect(instance.getBoolean).toHaveBeenCalledWith('balance_cashback_in_app');
    expect(typeof res).toBe('boolean');
  });

  it('should get an standard boolean value', async () => {
    const { result } = renderHook(() => useRemoteConfig());

    const instance = remoteConfig();
    const res = result.current.getBoolean('balance_cashback_in_app');

    expect(instance.getBoolean).toHaveBeenCalledTimes(0);
    expect(typeof res).toBe('boolean');
    expect(res).toBe(defaults.balance_cashback_in_app);
  });

  it('should get string value', async () => {
    const { result } = renderHook(() => useRemoteConfig());

    const instance = remoteConfig();
    await result.current.fetchInitialData(instance);

    const res = result.current.getString('pdp_button_add_bag');

    expect(instance.getString).toHaveBeenCalledWith('pdp_button_add_bag');
    expect(typeof res).toBe('string');
  });

  it('should get an standard string value', async () => {
    const { result } = renderHook(() => useRemoteConfig());

    const instance = remoteConfig();
    const res = result.current.getString('pdp_button_add_bag');

    expect(instance.getString).toHaveBeenCalledTimes(0);
    expect(typeof res).toBe('string');
    expect(res).toBe(defaults.pdp_button_add_bag);
  });
});
