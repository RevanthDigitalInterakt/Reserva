const { I } = inject();

module.exports = {

  buttons: {
    btnPemitir: ({ android: '#com.android.permissioncontroller:id/permission_allow_button', ios: '' }),
    btnCentral: ({ android: '#com.usereserva:id/bottom-tab-central', ios: '' }),
    btnPerfil: ({ android: '~com.usereserva:id/bottom-tab-perfilperfil', ios: '' }),
    btnFavoritos: ({ android: '#com.usereserva:id/bottom-tab-favoritos', ios: '' }),
    btnPromocoes: ({ android: '~com.usereserva:id/bottom-tab-perfilpromoces', ios: '' }),
    btnInicio: ({ android: '#com.usereserva:id/bottom-tab-inicio', ios: '' }),
    btnBag: ({ android: '~com.usereserva:id/button_bag', ios: '' }),
    btnSearch: ({ android: '#com.usereserva:id/header_button_search', ios: '' }),
    btnMenu: ({ android: '#com.usereserva:id/header_button_menu', ios: '' }),
    btnPrimeiraCompra: ({ android: '#com.usereserva:id/discout_code_modal_title', ios: '' }),
    btnAdicionarSacola: ({ android: '#com.usereserva:id/productdetail_button_add_cart', ios: '' }),
    btnBagAposAdicionarProduto: ({ android: '#com.usereserva:id/top_bar_button_handbag', ios: '' }),
    fecharModal: ({ android: '//hierarchy/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.webkit.WebView/android.webkit.WebView/android.view.View[2]/android.widget.Image', ios: '' }),

  },

  fields: {
  },

  toAllow() {
    I.click(this.buttons.btnPemitir);
  },

  async closeBanner() {
    await I.seeElement(this.buttons.fecharModal);
    await I.click(this.buttons.fecharModal);
  },

  async doLogin() {
    await I.click(this.buttons.btnPerfil);
  },

  async clickBag() {
    await I.click(this.buttons.btnBag);
  },

  async clickPromocoes() {
    await I.click(this.buttons.btnPromocoes);
  },
};
