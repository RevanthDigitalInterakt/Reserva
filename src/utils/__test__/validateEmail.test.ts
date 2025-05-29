import { validateEmail } from '../validateEmail';

describe('validateEmail test', () => {
  it('should return false to an invalid email', () => {
    const invalidEmails = [
      'marcosouzafrwk.com.br',
      'marcosouza+reserva@frwkcom',
      'marco@devbr',
    ];

    invalidEmails.map((email) => (
      expect(validateEmail(email)).toBeFalsy()
    ));
  });

  it('should return true to some valid e-mails', () => {
    const validEmails = [
      'marcosouza@frwk.com.br',
      'marcosouza+reserva@frwk.com',
      'marco@dev.br',
      'marco@trip.io',
      'marco+teste@dev.br',
    ];

    validEmails.map((email) => (
      expect(validateEmail(email)).toBeTruthy()
    ));
  });
});
