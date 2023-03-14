 type UserData = {
   name: string;
   email: string;
   gender: string;
   location: string;
   birthday: string;
   created_at: Date | string;
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
