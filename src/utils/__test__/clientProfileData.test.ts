import { isValidMinimalProfileData } from '../clientProfileData';

describe('clientProfileData test', () => {
  it('should verify if profile is invalid', () => {
    const res = isValidMinimalProfileData({
      document: 'document',
      email: 'email@email.com',
      firstName: 'name',
      lastName: 'lastName',
      phone: null,
    });

    expect(res).toBeFalsy();
    expect(isValidMinimalProfileData({})).toBeFalsy();
  });

  it('should verify if profile is valid', () => {
    const res = isValidMinimalProfileData({
      document: 'document',
      email: 'email@email.com',
      firstName: 'name',
      lastName: 'lastName',
      phone: '11955905195',
    });

    expect(res).toBeTruthy();
  });
});
