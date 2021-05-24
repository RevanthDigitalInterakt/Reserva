export enum AuthenticationTypes {
  LOGIN_REQUEST = "@authentication/LOGIN_REQUEST",
  LOGIN_SUCCESS = "@authentication/LOGIN_SUCCESS",
  LOGIN_FAILURE = "@authentication/LOGIN_FAILURE",
  LOGOUT_REQUEST = "@authentication/LOGOUT_REQUEST",
  LOGOUT_SUCCESS = "@authentication/LOGOUT_SUCESS",
}

export interface Authentication {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthenticationState {
  readonly data?: Authentication;
  readonly loading: boolean;
  readonly error: boolean;
}
