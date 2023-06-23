const { I } = inject();

module.exports = {

  buttons: {
    btnCompras: ({ android: '#com.usereserva:id/button_going_shopping_empty_bag', ios: '' }),
  },

  fields: {
  },

  texts: {
    msgSacolaVazia: ({ android: '~com.usereserva:id/sacola_vazia', ios: '' }),
  },

  async checkEmptyBag() {
    await I.waitForElement(this.texts.msgSacolaVazia, 2);
    await I.seeElement(this.texts.msgSacolaVazia);
  },

  async clickGoShopping() {
    await I.click(this.buttons.btnCompras);
  },
};
