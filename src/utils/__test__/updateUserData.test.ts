import { generatePayloadToUploadUserData, generateCustonFieldsToPayloadUserData } from '../updateUserData';

describe('generatePayloadToUploadUserData', () => {
  it('should generate the payload for uploading user data', () => {
    const userData: any = {
      id: '123',
      profileImage: 'photo.png',
      newsLetter: false,
      name: 'Jose Silva',
      document: '123.456.789-00',
      birthDate: '01/01/1990',
      cellPhone: '(123) 456-7890',
      gender: 'Homem',
    };

    const expected = {
      firstName: 'Jose',
      lastName: 'Silva',
      document: '12345678900',
      birthDate: '1990-01-01',
      homePhone: '1234567890',
      gender: 'male',
    };

    const result = generatePayloadToUploadUserData(userData);
    expect(result).toEqual(expected);
  });

  it('should handle undefined or empty values in the userData object', () => {
    const userData = {
      name: 'Jane',
      document: undefined,
      birthDate: '',
      cellPhone: '',
      gender: undefined,
    };

    const expected = {
      firstName: 'Jane',
      lastName: '',
      document: '',
      birthDate: '',
      homePhone: '',
      gender: '',
    };

    const result = generatePayloadToUploadUserData(userData);
    expect(result).toEqual(expected);
  });
});

describe('generateCustonFieldsToPayloadUserData', () => {
  it('should generate an array of custom fields for the payload', () => {
    const params = {
      userAcceptTerms: true,
      profileImage: 'profile.jpg',
      subscribed: false,
    };

    const expected = [
      {
        key: 'isNewsletterOptIn',
        value: 'false',
      },
      {
        key: 'documentType',
        value: 'cpf',
      },
      {
        key: 'profileImagePath',
        value: 'profile.jpg',
      },
      {
        key: 'userAcceptedTerms',
        value: 'true',
      },
    ];

    const result = generateCustonFieldsToPayloadUserData(params);
    expect(result).toEqual(expected);
  });

  it('should handle different parameter values', () => {
    const params = {
      userAcceptTerms: false,
      profileImage: '',
      subscribed: true,
    };

    const expected = [
      {
        key: 'isNewsletterOptIn',
        value: 'true',
      },
      {
        key: 'documentType',
        value: 'cpf',
      },
      {
        key: 'profileImagePath',
        value: '',
      },
      {
        key: 'userAcceptedTerms',
        value: 'false',
      },
    ];

    const result = generateCustonFieldsToPayloadUserData(params);
    expect(result).toEqual(expected);
  });
});
