import { profileInstance } from '../../../../config/profileConfig';
import { HttpService } from '../../../../shared/services/HttpService';

export enum ProfileHttpUrl {
  DELETE_CUSTOMER = '/dataentities/CL/documents/',
}

export const MyProfileAPI = new HttpService(profileInstance);
