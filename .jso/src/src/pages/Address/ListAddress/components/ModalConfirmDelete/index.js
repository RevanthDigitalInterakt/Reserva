  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ModalConfirmDelete;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  var _ModalConfirmDelete = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[3]));
  var _IconClose = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _testProps = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  function ModalConfirmDelete(_ref) {
    var showModal = _ref.showModal,
      onCloseModal = _ref.onCloseModal,
      onDeleteAddress = _ref.onDeleteAddress,
      addressID = _ref.addressID;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Modal, {
      transparent: true,
      visible: showModal,
      testID: "com.usereserva:id/modal_delete",
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
        style: _ModalConfirmDelete.default.modalContainer,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
          style: _ModalConfirmDelete.default.modalContent,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.View, {
            style: _ModalConfirmDelete.default.modalCloseButton,
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, {
              onPress: onCloseModal,
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_IconClose.default, {})
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
            style: _ModalConfirmDelete.default.modalTextContainer,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
              style: _ModalConfirmDelete.default.modalTitle,
              children: "Excluir endere\xE7o"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
              style: _ModalConfirmDelete.default.modalText,
              children: "Tem certeza que deseja excluir este endere\xE7o?"
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.Text, {
              style: _ModalConfirmDelete.default.modalText,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
                style: _ModalConfirmDelete.default.modalTextObs,
                children: "Observa\xE7\xE3o:"
              }), ' ', "Essa a\xE7\xE3o n\xE3o afetar\xE1 pedidos que j\xE1 est\xE3o pendentes ou em rota de entrega."]
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsxs)(_reactNative.View, {
              style: _ModalConfirmDelete.default.modalButtonsContainer,
              children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, Object.assign({}, (0, _testProps.default)('com.usereserva:id/com.usereserva:id/delete_address_button'), {
                style: _ModalConfirmDelete.default.modalButton,
                onPress: function onPress() {
                  return onDeleteAddress(addressID);
                },
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
                  style: _ModalConfirmDelete.default.modalButtonText,
                  children: "SIM"
                })
              })), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.TouchableOpacity, {
                style: _ModalConfirmDelete.default.modalButton,
                onPress: onCloseModal,
                children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[6]).jsx)(_reactNative.Text, {
                  style: _ModalConfirmDelete.default.modalButtonText,
                  children: "N\xC3O"
                })
              })]
            })]
          })]
        })
      })
    });
  }
