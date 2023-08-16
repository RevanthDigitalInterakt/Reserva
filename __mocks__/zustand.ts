import { act } from '@testing-library/react-native';
import type { StateCreator } from 'zustand';

const { create: actualCreate } = jest.requireActual('zustand');

const storeResetFns = new Set();

const createInternalFn = <S>(createState: StateCreator<S>) => {
  const store = actualCreate(createState);
  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

export const create = <S>(createState: StateCreator<S>) => (typeof createState === 'function'
  ? createInternalFn(createState)
  : createInternalFn);

beforeEach(() => {
  act(() => storeResetFns.forEach((resetFn: any) => {
    resetFn();
  }));
});
