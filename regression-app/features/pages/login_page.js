const { I } = inject();

module.exports = {

  buttons: {
    entrar: ({ android: '~com.usereserva:id/entrar_login_button', ios: '' }),
    reserva: ({ android: '~com.usereserva:id/brands_brand_container-0' }),
    cadastre: ({ android: '~com.usereserva:id/cadastre_se_login_button' }),
    esqueci_minha_senha: ({ android: '~com.usereserva:id/esqueci-minha-senha' }),
    send_email: ({ android: '~com.usereserva:id/send_email' }),
  },

  fields: {
    email: ({ android: '~com.usereserva:id/login_input_email' }),
    password: ({ android: '~com.usereserva:id/login_input_password' }),
    digite_seu_email: ({ android: '~com.usereserva:id/forgot_input_email' }),
  },

  texts: {
    msgErro: ({ android: '~com.usereserva:id/login-error', ios: '' }),
    msgAtualizeSenha: ({ android: '~com.usereserva:id/atualize_sua_senha' }),
  },

  async loginSuccces() {
    await I.fillField(this.fields.email, 'carlosbonfatti@frwk.com.br');
    await I.fillField(this.fields.password, '123Teste');
    await I.click(this.buttons.entrar);
  },

  async loginFail() {
    await I.fillField(this.fields.email, 'carlosbonfatti@frwk.com.br');
    await I.fillField(this.fields.password, 'Cae@1508');
    await I.click(this.buttons.entrar);
  },

  async checkLoginSucces() {
    await I.seeElement(this.buttons.reserva);
  },

  async checkLoginFail() {
    await I.waitForElement(this.texts.msgErro, 2);
    await I.seeElement(this.texts.msgErro);
  },

  async clickForgotPassword() {
    await I.waitForElement(this.buttons.esqueci_minha_senha, 2);
    await I.click(this.buttons.esqueci_minha_senha);
  },

  async inputEmail() {
    await I.fillField(this.fields.digite_seu_email, 'carlosbonfatti@frwk.com.br');
  },

  async clickSendEmail() {
    await I.click(this.buttons.send_email);
  },

  async checkUpdatePassword() {
    await I.waitForElement(this.texts.msgAtualizeSenha, 2);
    await I.seeElement(this.texts.msgAtualizeSenha);
  },
};
