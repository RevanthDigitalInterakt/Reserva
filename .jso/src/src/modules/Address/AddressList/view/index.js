  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[0]));
  var _reactNative = _$$_REQUIRE(_dependencyMap[1]);
  var _EventProvider = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[3]));
  var _AddressSelector = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[4]));
  var _useController = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[5]));
  var _testProps = _$$_REQUIRE(_dependencyMap[2])(_$$_REQUIRE(_dependencyMap[6]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function AddressList() {
    var _controller$profileDa;
    var controller = (0, _useController.default)();
    var renderModal = _react.default.useMemo(function () {
      if (controller.isVisibleDeleteModal) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Alert, {
          isVisible: controller.isVisibleDeleteModal,
          title: "Excluir endere\xE7o",
          subtitle: "Tem certeza que deseja excluir o endere\xE7o salvo?",
          confirmText: "SIM",
          cancelText: "N\xC3O",
          onConfirm: controller.doDeleteAddress,
          onCancel: controller.closeDeleteModal,
          onClose: controller.closeDeleteModal
        });
      }
      if (controller.isVisibleSuccessModal) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Alert, {
          isVisible: controller.isVisibleSuccessModal,
          title: "Seu endere\xE7o foi exclu\xEDdo com sucesso.",
          confirmText: "OK",
          onConfirm: controller.closeSuccessModal,
          onClose: function onClose() {
            controller.closeSuccessModal();
            controller.closeDeleteModal();
          }
        });
      }
      if (controller.hasDeleteAddressError) {
        return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[8]).Alert, {
          isVisible: controller.hasDeleteAddressError,
          title: "N\xE3o foi poss\xEDvel excluir o endere\xE7o",
          confirmText: "OK",
          onConfirm: controller.closeErrorModal,
          onClose: controller.closeErrorModal
        });
      }
      return null;
    }, [controller.hasDeleteAddressError, controller.isVisibleDeleteModal, controller.isVisibleSuccessModal]);
    (0, _react.useEffect)(function () {
      _EventProvider.default.logEvent('page_view', {
        item_brand: _$$_REQUIRE(_dependencyMap[9]).defaultBrand.picapau
      });
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[7]).Fragment, {
      children: [renderModal, /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_reactNative.SafeAreaView, {
        style: {
          flex: 1,
          backgroundColor: 'white'
        },
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[10]).TopBarBackButton, {
          loading: controller.loadingStatusBar,
          showShadow: true,
          backButtonPress: controller.goBack
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsxs)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          overflow: "hidden",
          paddingHorizontal: 20,
          flex: 1,
          justifyContent: "flex-start",
          pt: "md",
          children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
            alignSelf: "flex-start",
            mb: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, {
              variant: "tituloSessoes",
              children: "Meus endere\xE7os"
            })
          }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.FlatList, {
            style: {
              marginBottom: 20
            },
            showsVerticalScrollIndicator: false,
            data: controller == null ? undefined : (_controller$profileDa = controller.profileData) == null ? undefined : _controller$profileDa.addresses,
            keyExtractor: function keyExtractor(item, index) {
              return `${item == null ? undefined : item.id}-${index}`;
            },
            renderItem: function renderItem(_ref) {
              var item = _ref.item;
              var title = item.receiverName,
                zipcode = item.postalCode,
                id = item.id;
              var selected = controller.checkSelectedAddress(item);
              var address = controller.formatAddress(item);
              return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_AddressSelector.default, {
                addressData: {
                  address: address,
                  title: title,
                  zipcode: zipcode
                },
                deleteAddress: function deleteAddress() {
                  controller.openModalDeleteAddress(id);
                },
                editAndDelete: true,
                edit: function edit() {
                  controller.navigateToEditAddress(item);
                },
                selected: !!selected,
                select: function select() {
                  controller.onAddressChosen(item);
                }
              });
            },
            ListEmptyComponent: controller.loadingStatusBar ? /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_reactNative.ActivityIndicator, {}) : /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[12]).Typography, Object.assign({
              fontFamily: "reservaSerifRegular",
              fontSize: 16
            }, (0, _testProps.default)('com.usereserva:id/mensagemSemEndereco'), {
              children: "Voc\xEA ainda n\xE3o tem endere\xE7os cadastrados, clique em Novo Endere\xE7o e cadastre"
            }))
          })]
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[11]).Box, {
            marginX: "md",
            justifyContent: "flex-end",
            mb: "xxxs",
            children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[7]).jsx)(_$$_REQUIRE(_dependencyMap[13]).Button, {
              onPress: controller.navigateToNewAddress,
              title: "NOVO ENDERE\xC7O",
              variant: "primarioEstreitoOutline",
              padding: "xl"
            })
          })
        })]
      })]
    });
  }
  var _default = exports.default = AddressList;
