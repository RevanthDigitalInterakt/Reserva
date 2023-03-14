import { configs, ditoUsersApi } from '../../config';

type UserData = {
  name?: string;
  email?: string;
  gender?: string;
  location?: string;
  birthday?: string | null;
  created_at?: Date | string;
  data: string | object
};

 type RegisterUserRequest = {
   id: string; // id do dispositivo ?
   payload: UserData
 };

 type RegisterUserResponse = {
   data : {
     reference : string
   }
 };

 type GetUserRequest = {
   id: string; // id do dispositivo ?
   params?: {
     sha1_signature?: string;
     encoding?: string;
   }
 };

 type GetUserResponse = {
   data: {
     removed_permissions: Array<string>;
     reference: string;
     networks: {
       portal: {
         social_id: string;
         gender:string;
         name: string;
         email: string;
         age: number;
         location: string;
       }
     },
     data: any;
   };
 };

 type UpdateUserRequest = {
   id: string; // id do dispositivo ?
   payload: UserData
 };

 type UpdateUserResponse = {
   data: {
     user: UserData & {
       id: string;
       location: { id: string; name: string }
     };
   }
 };

export async function registerDitoUser({
  id,
  payload,
}: RegisterUserRequest): Promise<RegisterUserResponse> {
  const extraFields = typeof payload.data === 'string'
    ? payload.data : JSON.stringify(payload.data);

  const response = await ditoUsersApi.post(`/users/portal/${id}/signup`, {
    ...configs,
    user_data: {
      ...payload,
      data: extraFields,
    },
  });

  return response.data;
}

export async function getDitoUser({
  id,
  params,
}: GetUserRequest): Promise<GetUserResponse | null> {
  try {
    const response = await ditoUsersApi.get(`/users/${id}`, {
      params: {
        ...configs,
        ...params,
      },
    });

    return response.data;
  } catch {
    return null;
  }
}

export async function updateDitoUser({
  id,
  payload,
}: UpdateUserRequest): Promise<UpdateUserResponse> {
  const extraFields = typeof payload.data === 'string'
    ? payload.data : JSON.stringify(payload.data);

  const response = await ditoUsersApi.put(`/users/${id}`, {
    ...configs,
    user_data: {
      ...payload,
      data: extraFields,
    },
  });

  return response.data;
}
