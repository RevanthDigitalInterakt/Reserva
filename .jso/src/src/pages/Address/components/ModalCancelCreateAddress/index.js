  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ModalCancelCreateAddress;
  var _react = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[2]);
  function ModalCancelCreateAddress(_ref) {
    var modalController = _ref.modalController,
      showModal = _ref.showModal;
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Modal, {
      animationType: "fade",
      transparent: true,
      visible: showModal,
      children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.View, {
        style: _$$_REQUIRE(_dependencyMap[4]).styles.modalContainer,
        children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_reactNative.View, {
          style: _$$_REQUIRE(_dependencyMap[4]).styles.modalContent,
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[4]).styles.modalTitle,
            children: "Cancelar cadastro de endere\xE7o"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
            style: _$$_REQUIRE(_dependencyMap[4]).styles.modalSubtitle,
            children: "Tem certeza que deseja cancelar o cadastro do endere\xE7o ?"
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsxs)(_reactNative.View, {
            style: _$$_REQUIRE(_dependencyMap[4]).styles.modalRow,
            children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.TouchableOpacity, {
              style: _$$_REQUIRE(_dependencyMap[4]).styles.modalButtonCancel,
              onPress: function onPress() {
                return modalController('cancel');
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[4]).styles.modalTextButtonCancel,
                children: "Cancelar"
              })
            }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.TouchableOpacity, {
              style: _$$_REQUIRE(_dependencyMap[4]).styles.modalButtonClose,
              onPress: function onPress() {
                return modalController();
              },
              children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[3]).jsx)(_reactNative.Text, {
                style: _$$_REQUIRE(_dependencyMap[4]).styles.modalTextButtonClose,
                children: "Fechar"
              })
            })]
          })]
        })
      })
    });
  }
