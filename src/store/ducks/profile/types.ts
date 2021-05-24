export enum ProfileTypes {
  REGISTER_REQUEST = "@profile/REGISTER_REQUEST",
  REQUEST_SUCCESS = "@profile/REQUEST_SUCCESS",
  REQUEST_FAILURE = "@profile/REQUEST_FAILURE",
  PROFILE_UPDATE = "@profile/PROFILE_UPDATE",
  PROFILE_LOAD = "@profile/PROFILE_LOAD",
  PROFILE_DELETE = "@profile/PROFILE_DELETE",
}

export interface Profile {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  receiveEmail?: string; //yes
  gender?: string; //male
  fullName?: string;
  phone?: string;
  ddd?: string;
  rsvCPF?: string; //"74634434008",
  rsvBirthDate?: string; //"1953-02-12T00?:00?:00.000Z",
  rsvPhoneNumber?: string; //"34524562456"
}

export interface ProfileState {
  readonly data?: Profile;
  readonly loading: boolean;
  readonly error: boolean;
}
