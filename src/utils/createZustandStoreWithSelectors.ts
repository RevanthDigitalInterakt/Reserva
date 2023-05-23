import type { StoreApi, UseBoundStore } from 'zustand';
import { shallow } from 'zustand/esm/shallow';

type GenericState = Record<string, any>;

export const createZustandStoreWithSelectors = <T extends GenericState>(
  store: UseBoundStore<StoreApi<T>>,
): (<K extends keyof T>(keys: K[]) => Pick<T, K>) => <K extends keyof T>(keys: K[]) => (
    store((state) => {
      const x = keys.reduce((acc, cur) => {
        acc[cur] = state[cur];
        return acc;
      }, {} as T);

      return x as Pick<T, K>;
    }, shallow)
  );
