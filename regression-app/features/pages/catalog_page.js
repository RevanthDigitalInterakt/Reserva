const { I } = inject();

module.exports = {

  buttons: {
    btnFiltro: ({ android: '~com.usereserva:id/clear_filter_button_product_catalog', ios: '' }),
    btnProduct: ({ android: '#com.usereserva:id/productcard_vertical_34997' }),
    btnAddBag: ({ android: '~com.usereserva:id/button_add_to_bag' }),
    btnBag: ({ android: '#com.usereserva:id/top_bar_button_handbag', ios: '' }),
  },

  fields: {
  },

  async checkPromocoes() {
    await I.waitForElement(this.buttons.btnFiltro, 2);
    await I.seeElement(this.buttons.btnFiltro);
  },

  async clickProduct() {
    await I.click(this.buttons.btnProduct);
    await I.wait(5);
  },

  async clickAddToBag() {
    await I.click(this.buttons.btnAddBag);
  },

  async scrollScreen() {
    await I.touchPerform([
      {
        action: 'longPress',
        options: { x: 530, y: 2100 },
      },
      {
        action: 'moveTo',
        options: { x: 530, y: 400 },
      },
      { action: 'release' },
    ]);
  },

  async clickBag() {
    await I.click(this.buttons.btnBag);
  },

};
