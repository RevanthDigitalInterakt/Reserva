import { configs, ditoUsersApi } from '../../config';

export async function associateAccount({
  id,
  accounts,
}: AssociateAccountRequest): Promise<AssociateAccountResponse> {
  const response = await ditoUsersApi.post(`/users/${id}/link`, {
    ...configs,
    accounts: {
      ...accounts,
    },
  });

  return response.data;
}

export async function deassociateAccount({
  id,
  accounts,
}: DisassociateAccountRequest): Promise<AssociateAccountResponse> {
  const response = await ditoUsersApi.post(`/users/${id}/unlink`, {
    ...configs,
    accounts: {
      ...accounts,
    },
  });

  return response.data;
}
