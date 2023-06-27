const { I } = inject();

module.exports = {

  buttons: {
    myAddress: ({ android: '~com.usereserva:id/generic_button_meus-enderecos', ios: '' }),
  },

  texts: {
    msgNoAddress: ({ android: '~com.usereserva:id/mensagem_sem_endereço', ios: '' }),
  },

  async clickMyAddresses() {
    await I.click(this.buttons.myAddress);
  },

  async checkNoAddress() {
    await I.check(this.texts.msgNoAddress);
  },
};
