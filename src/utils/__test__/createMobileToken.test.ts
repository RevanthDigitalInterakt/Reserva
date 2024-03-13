import { ditoNotificationsApi } from '../Dito/src/config';
import createMobileToken from '../Dito/src/utils/sendTokenMobile';

const mockSuccess = {
  data: {
    token: 'TOKEN_ENVIADO',
  },
};

describe('sendUserDataToDito', () => {
  it.skip('WHEN sendMobileToken success SHOULD return registered token', async () => {
    jest.spyOn(ditoNotificationsApi, 'post').mockResolvedValueOnce(mockSuccess);

    const response = await createMobileToken({
      id: '63136178-6017-4880-8f5b-d51480467342@usereserva.com',
      token: 'dTZwAKU3aEFWv64ExC-qda:APA91bHLXlXx8OS5jOkeaixM_c2LDYdHxNuSoC9hOTgU_b1aMspv6UnGBHgxmz59HrxPBLdOCzUpw7g5ddiXwEdbOPXj2BFfuO_VxEmiQy_mtEkW48kdi4L05r7_kd-zCcrnQlZ984Q5',
      platform: 'Android',
    });

    expect(response).toEqual({ token: 'TOKEN_ENVIADO' });
  });
});
