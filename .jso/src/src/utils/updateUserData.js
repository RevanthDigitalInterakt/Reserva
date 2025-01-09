  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.generatePayloadToUploadUserData = exports.generateCustonFieldsToPayloadUserData = undefined;
  var _toArray2 = _$$_REQUIRE(_dependencyMap[0])(_$$_REQUIRE(_dependencyMap[1]));
  var generatePayloadToUploadUserData = exports.generatePayloadToUploadUserData = function generatePayloadToUploadUserData(userData) {
    var _userData$birthDate, _userData$name, _userData$name$trim, _userData$document, _splittedBirthDate$re, _userData$cellPhone;
    var splittedBirthDate = (_userData$birthDate = userData.birthDate) == null ? undefined : _userData$birthDate.split('/');
    var _userData$name$trim$s = (_userData$name = userData.name) == null ? undefined : (_userData$name$trim = _userData$name.trim()) == null ? undefined : _userData$name$trim.split(' '),
      _userData$name$trim$s2 = (0, _toArray2.default)(_userData$name$trim$s),
      firstName = _userData$name$trim$s2[0],
      rest = _userData$name$trim$s2.slice(1);
    return {
      firstName: firstName,
      lastName: rest == null ? undefined : rest.join(' '),
      document: (userData == null ? undefined : (_userData$document = userData.document) == null ? undefined : _userData$document.replace(/[^\d]+/g, '')) || '',
      birthDate: splittedBirthDate == null ? undefined : (_splittedBirthDate$re = splittedBirthDate.reverse()) == null ? undefined : _splittedBirthDate$re.join('-'),
      homePhone: userData == null ? undefined : (_userData$cellPhone = userData.cellPhone) == null ? undefined : _userData$cellPhone.replace(/[^\d+]+/g, ''),
      gender: _$$_REQUIRE(_dependencyMap[2]).genderPtToEng[userData == null ? undefined : userData.gender] || ''
    };
  };
  var generateCustonFieldsToPayloadUserData = exports.generateCustonFieldsToPayloadUserData = function generateCustonFieldsToPayloadUserData(_ref) {
    var userAcceptTerms = _ref.userAcceptTerms,
      profileImage = _ref.profileImage,
      subscribed = _ref.subscribed;
    return [{
      key: 'isNewsletterOptIn',
      value: `${subscribed}`
    }, {
      key: 'documentType',
      value: 'cpf'
    }, {
      key: 'profileImagePath',
      value: `${profileImage}`
    }, {
      key: 'userAcceptedTerms',
      value: `${userAcceptTerms}`
    }];
  };
