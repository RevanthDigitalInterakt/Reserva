import Sentry from '../../config/sentryConfig';
import { ditoUsersApi } from '../Dito/src/config';
import sendUserDataToDito from '../Dito/src/utils/sendUserDataToDito';

const mockSuccessGetUser = {
  data: {
    removed_permissions: [],
    reference: '123456789',
    networks: {
      portal: {
        social_id: '123456',
        gender: 'male',
        name: 'Marcos Nogueira',
        email: 'marcos@example.com',
        age: 24,
        location: 'Belo Horizonte',
      },
    },
    data: {
      dispositivo: 'ios',
    },
  },
};

const mockSuccessGetUserUndefined = {
  message: 'Seu app não foi autorizado ainda ou não possui o modulo. false, false',
  error: {
    message: 'Seu app não foi autorizado ainda ou não possui o modulo. false, false',
  },
};

const mockSuccessPutUser = {
  data: {
    user: {
      location: {
        id: '106280439410017',
        name: 'Belo Horizonte, Brazil',
      },
      gender: 'male',
      verified: 'true',
      id: '123456789',
      name: 'Marcos Nogueira',
      email: 'marcos@example.com',
      birthday: '02/03/1990',
    },
  },
};
const mockSuccessPostUser = {
  data: {
    reference: '123456789',
  },
};

describe('sendUserDataToDito', () => {
  it.skip('WHEN getDitoUser return undefined SHOULD return registerDitoUser', async () => {
    jest.spyOn(ditoUsersApi, 'get').mockResolvedValueOnce(mockSuccessGetUserUndefined);
    jest.spyOn(ditoUsersApi, 'post').mockResolvedValueOnce(mockSuccessPostUser);

    const response = await sendUserDataToDito({
      id: '63136178-6017-4880-8f5b-d51480467342@usereserva.com',
      user: {
        email: '63136178-6017-4880-8f5b-d51480467342@usereserva.com',
        data: {
          dispositivo: 'ios',
        },
      },
    });

    expect(response).toEqual({
      reference: '123456789',
    });
  });

  it.skip('WHEN getDitoUser success SHOULD return updateDitoUser', async () => {
    jest.spyOn(ditoUsersApi, 'get').mockResolvedValueOnce(mockSuccessGetUser);
    jest.spyOn(ditoUsersApi, 'put').mockResolvedValueOnce(mockSuccessPutUser);

    const response = await sendUserDataToDito({
      id: '63136178-6017-4880-8f5b-d51480467342@usereserva.com',
      user: {
        email: '63136178-6017-4880-8f5b-d51480467342@usereserva.com',
        data: {
          dispositivo: 'ios',
        },
      },
    });

    expect(response).toEqual({
      user: {
        location: { id: '106280439410017', name: 'Belo Horizonte, Brazil' },
        gender: 'male',
        verified: 'true',
        id: '123456789',
        name: 'Marcos Nogueira',
        email: 'marcos@example.com',
        birthday: '02/03/1990',
      },
    });
  });

  it.skip('WHEN sendUserDataToDito return error SHOULD return Erro ao cadastrar', async () => {
    jest.spyOn(ditoUsersApi, 'get').mockRejectedValueOnce(new Error());
    jest.spyOn(ditoUsersApi, 'put').mockRejectedValueOnce(new Error());
    jest.spyOn(ditoUsersApi, 'post').mockRejectedValueOnce(new Error());

    await sendUserDataToDito({
      id: '63136178-6017-4880-8f5b-d51480467342@usereserva.com',
      user: {
        data: {
          dispositivo: 'ios',
        },
      },
    });
    expect(Sentry.captureException).toBeCalled();
  });
});
