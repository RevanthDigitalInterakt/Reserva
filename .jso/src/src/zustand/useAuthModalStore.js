  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var useAuthModalStore = (0, _$$_REQUIRE(_dependencyMap[0]).create)(function (set) {
    return {
      showModalSignUpComplete: false,
      showModalCheckConnection: false,
      setModalSignUpComplete: function setModalSignUpComplete(value) {
        return set(function () {
          return {
            showModalSignUpComplete: value
          };
        });
      },
      setModalCheckConnection: function setModalCheckConnection(value) {
        return set(function () {
          return {
            showModalCheckConnection: value
          };
        });
      }
    };
  });
  var _default = exports.default = (0, _$$_REQUIRE(_dependencyMap[1]).createZustandStoreWithSelectors)(useAuthModalStore);
