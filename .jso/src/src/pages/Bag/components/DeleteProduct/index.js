  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = DeleteProductModal;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[2]));
  var _EventProvider = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function DeleteProductModal() {
    var _useBagStore = (0, _$$_REQUIRE(_dependencyMap[4]).useBagStore)(['actions', 'loadingModal', 'deleteProductModal']),
      deleteProductModal = _useBagStore.deleteProductModal,
      loadingModal = _useBagStore.loadingModal,
      actions = _useBagStore.actions;
    var handleDeleteProduct = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var _deleteProductModal$d;
      if (!deleteProductModal.deleteInfo) return;
      _EventProvider.default.logEvent('remove_from_cart', {
        item_id: (_deleteProductModal$d = deleteProductModal.deleteInfo.product) == null ? undefined : _deleteProductModal$d.id,
        item_categories: 'product',
        item_brand: _$$_REQUIRE(_dependencyMap[5]).defaultBrand.reserva
      });
      yield actions.UPDATE_PRODUCT_COUNT(deleteProductModal.deleteInfo.index, deleteProductModal.deleteInfo.product, 0);
      actions.CLOSE_MODAL_DELETE_PRODUCT();
    }), [deleteProductModal, actions]);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_$$_REQUIRE(_dependencyMap[7]).Alert, {
      isVisible: deleteProductModal.show,
      title: "Excluir produto",
      subtitle: "Tem certeza que deseja excluir o produto salvo em sua sacola?",
      confirmText: "SIM",
      cancelText: "N\xC3O",
      disabled: loadingModal,
      onConfirm: handleDeleteProduct,
      onCancel: actions.CLOSE_MODAL_DELETE_PRODUCT,
      onClose: actions.CLOSE_MODAL_DELETE_PRODUCT
    });
  }
