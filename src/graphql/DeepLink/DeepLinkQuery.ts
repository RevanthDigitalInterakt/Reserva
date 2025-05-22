export interface IDeepLinkRoute {
  path: string;
  referenceId: string
  active: boolean
}
export interface IDeepLinkQuery {
  deeplinkPath: IDeepLinkRoute
}
