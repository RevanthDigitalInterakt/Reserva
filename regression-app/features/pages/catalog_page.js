const { I } = inject();

module.exports = {

  buttons: {
    btnFiltro: ({ android: '~com.usereserva:id/clear_filter_button_product_catalog', ios: '' }),
    btnProduto: ({ android: '//hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup[1]/android.widget.FrameLayout/android.view.ViewGroup/android.view.ViewGroup/android.view.ViewGroup/android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup[2]/android.view.ViewGroup[3]/android.widget.ImageView' }),
  },

  fields: {
  },

  async checkPromocoes() {
    await I.waitForElement(this.buttons.btnFiltro, 2);
    await I.seeElement(this.buttons.btnFiltro);
  },
};
