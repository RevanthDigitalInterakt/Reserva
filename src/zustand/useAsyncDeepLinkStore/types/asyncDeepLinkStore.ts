import type { RootStackParamList } from '../../../routes/StackNavigator';

export type TExcludedValues = 'dispatch';

export type TOmitAsyncDeepLinkStore = Omit<IAsyncDeepLinkStore, TExcludedValues>;

export type TActionType = 'CATALOG';
export interface IPayloadDispatch {
  actionType: TActionType,
  payload: Object
}

export interface IFacetInput {
  key: string,
  value: string
}
// TODO deixar o objeto params dinamico
export interface IFallBackRoute {
  routeName: keyof RootStackParamList,
  params?: Object,
}
export interface IAsyncDeepLinkStore {
  deepLinkLoading: boolean,
  fallBackRoute: IFallBackRoute | null,
  dispatch: (payload: IPayloadDispatch) => void
}
