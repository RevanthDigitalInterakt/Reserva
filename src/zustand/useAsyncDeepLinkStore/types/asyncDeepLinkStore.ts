import type { RootStackParamList } from '../../../routes/StackNavigator';

export type TActionType = 'CATALOG' | 'PRODUCT';
export interface IPayloadDispatch {
  actionType: TActionType,
  payload: Object
}
export interface IFallBackRoute {
  routeName: keyof RootStackParamList,
  params?: Object,
}
export interface IAsyncDeepLinkStore {
  deepLinkLoading: boolean,
  fallBackRoute: IFallBackRoute | null,
  dispatch: (payload: IPayloadDispatch) => void
}
