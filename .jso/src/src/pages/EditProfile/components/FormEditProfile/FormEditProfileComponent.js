  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;
  var _asyncToGenerator2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var _slicedToArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[2]));
  var _react = _interopRequireWildcard(_$$_REQUIRE(_dependencyMap[3]));
  var _asyncStorage = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[4]));
  var _FullNameIcon = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[5]));
  var _EmailIcon = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[6]));
  var _CPFIcon = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[7]));
  var _GenderInput = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[8]));
  var _BirthDateIcon = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[9]));
  var _PhoneNumberIcon = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[10]));
  var _UserProfilePictureComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[11]));
  var _ChangeFileModal = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[12]));
  var _TesterAreaViewComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[13]));
  var _NewsLetterComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[14]));
  var _DeleteAccountComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[15]));
  var _SubmitingContentComponent = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[16]));
  var _editProfile = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[17]));
  function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
  function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
  function FormEditProfileComponent(_ref) {
    var _editProfileForm$erro, _profile$email, _profile$email2, _editProfileForm$erro2, _editProfileForm$erro3, _editProfileForm$erro4, _editProfileForm$erro5;
    var isRegister = _ref.isRegister,
      handleModal = _ref.handleModal,
      showChangeFileModal = _ref.showChangeFileModal,
      handleToogleLoading = _ref.handleToogleLoading;
    var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isUserTest = _useState2[0],
      setIsUserTest = _useState2[1];
    var _FirebaseService = new (_$$_REQUIRE(_dependencyMap[18]).FirebaseService)(),
      deleteFS = _FirebaseService.deleteFS,
      createFS = _FirebaseService.createFS;
    var navigation = (0, _$$_REQUIRE(_dependencyMap[19]).useNavigation)();
    var _useRemoteConfig = (0, _$$_REQUIRE(_dependencyMap[20]).useRemoteConfig)(),
      getObject = _useRemoteConfig.getObject;
    var _useAuthStore = (0, _$$_REQUIRE(_dependencyMap[21]).useAuthStore)(['profile', 'onGetProfile']),
      profile = _useAuthStore.profile,
      onGetProfile = _useAuthStore.onGetProfile;
    var _useProfileLazyQuery = (0, _$$_REQUIRE(_dependencyMap[22]).useProfileLazyQuery)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'cache-and-network'
      }),
      _useProfileLazyQuery2 = (0, _slicedToArray2.default)(_useProfileLazyQuery, 1),
      getProfileUserData = _useProfileLazyQuery2[0];
    var _useProfileUpdateMuta = (0, _$$_REQUIRE(_dependencyMap[22]).useProfileUpdateMutation)({
        context: {
          clientName: 'gateway'
        },
        fetchPolicy: 'no-cache'
      }),
      _useProfileUpdateMuta2 = (0, _slicedToArray2.default)(_useProfileUpdateMuta, 1),
      updateUserdata = _useProfileUpdateMuta2[0];
    var _useNavigationToDeliv = (0, _$$_REQUIRE(_dependencyMap[23]).useNavigationToDelivery)(),
      handleNavigateToDelivery = _useNavigationToDeliv.handleNavigateToDelivery;
    var handleSubmitForm = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref2 = (0, _asyncToGenerator2.default)(function* (formValues) {
        handleToogleLoading(true);
        var userDateUpload = (0, _$$_REQUIRE(_dependencyMap[24]).generatePayloadToUploadUserData)(formValues);
        var imageRef = formValues.profileImage.initialFilePath || 'null';
        var isUpdateProfileImage = typeof formValues.profileImage.uri !== 'undefined' && formValues.profileImage.uri !== formValues.profileImage.initialFilePath;
        if (isUpdateProfileImage) {
          imageRef = yield createFS({
            uri: formValues.profileImage.uri
          });
          if (formValues.profileImage.initialFilePath) {
            yield deleteFS(`${formValues.profileImage.initialFilePath}`);
          }
        }
        var userAcceptTerms = yield _asyncStorage.default.getItem('@user:accepted');
        var customFields = (0, _$$_REQUIRE(_dependencyMap[24]).generateCustonFieldsToPayloadUserData)({
          userAcceptTerms: userAcceptTerms ? JSON.parse(userAcceptTerms) : false,
          profileImage: imageRef,
          subscribed: formValues.newsLetter
        });
        yield updateUserdata({
          variables: {
            input: Object.assign({}, userDateUpload, {
              customFields: customFields
            })
          }
        });
        var profileData = yield onGetProfile();
        if (isRegister) {
          handleNavigateToDelivery(profileData);
          return;
        }
        handleToogleLoading(false);
        navigation.goBack();
      });
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), []);
    var editProfileForm = (0, _$$_REQUIRE(_dependencyMap[25]).useFormik)({
      initialValues: _$$_REQUIRE(_dependencyMap[26]).FormEditProfileInitialValues,
      validationSchema: _editProfile.default,
      onSubmit: function () {
        var _onSubmit = (0, _asyncToGenerator2.default)(function* (values) {
          yield handleSubmitForm(values);
        });
        function onSubmit(_x2) {
          return _onSubmit.apply(this, arguments);
        }
        return onSubmit;
      }()
    });
    var handleChangeFormValue = (0, _react.useCallback)(function (field, value) {
      editProfileForm.setFieldValue(field, value);
    }, [editProfileForm]);
    var handleChangeProfileImage = (0, _react.useCallback)(function (file) {
      var resetInitialFilePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      editProfileForm.setFieldValue('profileImage', Object.assign({}, file, {
        initialFilePath: resetInitialFilePath ? undefined : editProfileForm.values.profileImage.initialFilePath
      }));
    }, [editProfileForm]);
    var getIsTesterUser = (0, _react.useCallback)(/*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)(function* (userEmail) {
        var emails = getObject('EMAIL_TESTERS');
        setIsUserTest(emails.includes(userEmail));
      });
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }(), [getObject]);
    var handleUserDataInitializer = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      try {
        var _yield$getProfileUser = yield getProfileUserData(),
          data = _yield$getProfileUser.data,
          loading = _yield$getProfileUser.loading;
        if (!data) return;
        var _data$profile = data.profile,
          id = _data$profile.id,
          firstName = _data$profile.firstName,
          lastName = _data$profile.lastName,
          document = _data$profile.document,
          birthDate = _data$profile.birthDate,
          gender = _data$profile.gender,
          homePhone = _data$profile.homePhone,
          customFields = _data$profile.customFields,
          email = _data$profile.email;
        if (!loading) {
          yield getIsTesterUser(email || '');

          // Pega o path da imagem no firebase - user/profile/joao.jpg | undefined
          var profileUserField = (0, _$$_REQUIRE(_dependencyMap[27]).formatAndSearcFieldValue)(customFields, 'profileImagePath', undefined);
          var newsLetterUser = (0, _$$_REQUIRE(_dependencyMap[27]).formatAndSearcFieldValue)(customFields, 'isNewsletterOptIn', false);
          yield editProfileForm.setValues({
            id: id,
            name: firstName ? `${firstName} ${lastName || ''}` : '',
            document: document || '',
            birthDate: birthDate ? (0, _$$_REQUIRE(_dependencyMap[27]).formatDate)(birthDate) : '',
            gender: gender ? _$$_REQUIRE(_dependencyMap[28]).genderEngToPt[gender] : null,
            cellPhone: homePhone || '',
            profileImage: {
              uri: profileUserField,
              name: '',
              type: '',
              initialFilePath: profileUserField
            },
            newsLetter: newsLetterUser === 'true'
          });
          handleToogleLoading(false);
        }
      } catch (error) {
        _$$_REQUIRE(_dependencyMap[29]).ExceptionProvider.captureException(error);
      }
    }), []);
    var handleDeleteProfileImage = (0, _react.useCallback)(/*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
      var isValidInitialFilePath = typeof editProfileForm.values.profileImage.initialFilePath === 'string' && editProfileForm.values.profileImage.initialFilePath.length;
      if (isValidInitialFilePath) {
        yield deleteFS(`${editProfileForm.values.profileImage.initialFilePath}`);
      }
      handleChangeProfileImage({
        name: '',
        type: '',
        uri: undefined,
        initialFilePath: undefined
      }, true);
      handleModal('changeFileModal');
    }), [editProfileForm, handleChangeProfileImage]);
    (0, _react.useEffect)(function () {
      (0, _asyncToGenerator2.default)(function* () {
        yield handleUserDataInitializer();
      })();
    }, []);
    return /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsxs)(_$$_REQUIRE(_dependencyMap[30]).Fragment, {
      children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_ChangeFileModal.default, {
        show: showChangeFileModal,
        handleDeleteProfileImage: handleDeleteProfileImage,
        handleChangeFile: function handleChangeFile(file) {
          return handleChangeProfileImage(file);
        },
        toggleModal: function toggleModal() {
          return handleModal('changeFileModal');
        }
      }), !isRegister && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_UserProfilePictureComponent.default, {
        toogleModalChangeFile: function toogleModalChangeFile() {
          return handleModal('changeFileModal');
        },
        userEmail: (profile == null ? undefined : profile.email) || '',
        file: editProfileForm.values.profileImage
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsxs)(_$$_REQUIRE(_dependencyMap[31]).Box, {
        mt: "xxxs",
        children: [/*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[31]).Box, {
          mb: "xxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[32]).TextField, {
            label: editProfileForm.values.name.length ? 'Nome completo' : null,
            accessibilityLabel: "formeditprofile_input_name",
            value: editProfileForm.values.name,
            onChangeText: function onChangeText(currentTextValue) {
              return handleChangeFormValue('name', currentTextValue);
            },
            iconRight: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_FullNameIcon.default, {
              isEmpty: !editProfileForm.values.name.length
            }),
            placeholder: "Digite seu nome completo.",
            error: editProfileForm.errors.name,
            touched: !!((_editProfileForm$erro = editProfileForm.errors.name) != null && _editProfileForm$erro.length)
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[31]).Box, {
          mb: "xxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[32]).TextField, {
            style: {
              color: '#8A8C8E'
            },
            editable: false,
            accessibilityLabel: "formeditprofile_input_email",
            label: profile != null && (_profile$email = profile.email) != null && _profile$email.length ? 'E-mail' : null,
            value: (profile == null ? undefined : profile.email) || '',
            iconRight: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_EmailIcon.default, {
              isEmpty: !(profile != null && (_profile$email2 = profile.email) != null && _profile$email2.length)
            })
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[31]).Box, {
          mb: "xxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[32]).TextField, {
            keyboardType: "number-pad",
            label: editProfileForm.values.document.length ? 'CPF' : null,
            value: editProfileForm.values.document,
            accessibilityLabel: "formeditprofile_input_document",
            maskType: "cpf",
            onChangeText: function onChangeText(currentTextValue) {
              return handleChangeFormValue('document', currentTextValue);
            },
            iconRight: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_CPFIcon.default, {
              isValid: !((_editProfileForm$erro2 = editProfileForm.errors.document) != null && _editProfileForm$erro2.length),
              isEmpty: !editProfileForm.values.document
            }),
            placeholder: "Digite seu CPF",
            error: editProfileForm.errors.document,
            touched: !!((_editProfileForm$erro3 = editProfileForm.errors.document) != null && _editProfileForm$erro3.length)
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_GenderInput.default, {
          handleSelectGender: function handleSelectGender(currentTextValue) {
            return handleChangeFormValue('gender', currentTextValue);
          },
          currentGender: editProfileForm.values.gender
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[31]).Box, {
          mb: "xxs",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[32]).TextField, {
            keyboardType: "number-pad",
            label: editProfileForm.values.birthDate.length ? 'Data de nascimento' : null,
            maskType: "custom",
            maskOptions: {
              mask: '99/99/9999'
            },
            accessibilityLabel: "formeditprofile_input_birthDate",
            value: editProfileForm.values.birthDate,
            onChangeText: function onChangeText(currentTextValue) {
              return handleChangeFormValue('birthDate', currentTextValue);
            },
            iconRight: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_BirthDateIcon.default, {
              isEmpty: !editProfileForm.values.birthDate.length
            }),
            placeholder: "Digite sua data de nascimento",
            error: editProfileForm.errors.birthDate,
            touched: !!((_editProfileForm$erro4 = editProfileForm.errors.birthDate) != null && _editProfileForm$erro4.length)
          })
        }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[31]).Box, {
          mb: "nano",
          children: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_$$_REQUIRE(_dependencyMap[32]).TextField, {
            keyboardType: "number-pad",
            maskType: "custom",
            maskOptions: {
              mask: '+55 (99) 9 9999-9999'
            },
            accessibilityLabel: "formeditprofile_input_cellPhone",
            label: editProfileForm.values.cellPhone ? 'Telefone' : null,
            value: editProfileForm.values.cellPhone,
            onChangeText: function onChangeText(currentTextValue) {
              return handleChangeFormValue('cellPhone', currentTextValue);
            },
            iconRight: /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_PhoneNumberIcon.default, {
              isEmpty: !editProfileForm.values.cellPhone.length
            }),
            placeholder: "Digite seu telefone",
            error: editProfileForm.errors.cellPhone,
            touched: !!((_editProfileForm$erro5 = editProfileForm.errors.cellPhone) != null && _editProfileForm$erro5.length)
          })
        })]
      }), isUserTest && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_TesterAreaViewComponent.default, {
        handleToggleModalTesting: function handleToggleModalTesting() {
          return handleModal('testingModal');
        }
      }), !isRegister && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_NewsLetterComponent.default, {
        value: editProfileForm.values.newsLetter,
        handleToogleNewsLetterState: function handleToogleNewsLetterState(currentTextValue) {
          return handleChangeFormValue('newsLetter', currentTextValue);
        },
        userEmail: (profile == null ? undefined : profile.email) || ''
      }), !isRegister && /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_DeleteAccountComponent.default, {
        userId: editProfileForm.values.id
      }), /*#__PURE__*/(0, _$$_REQUIRE(_dependencyMap[30]).jsx)(_SubmitingContentComponent.default, {
        formEditIsValid: !editProfileForm.isValid,
        handleSubmitForm: editProfileForm.handleSubmit,
        isRegister: isRegister
      })]
    });
  }
  var _default = exports.default = FormEditProfileComponent;
