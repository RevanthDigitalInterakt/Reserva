export enum AuthenticationTypes {
  LOGIN = '@authentication/LOGIN',
  LOGIN_SUCCESS = '@authentication/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@authentication/LOGIN_FAILURE',
}

export interface Authentication {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthenticationState {
  readonly data?: Authentication[];
  readonly loading: boolean;
  readonly error: boolean;
}
