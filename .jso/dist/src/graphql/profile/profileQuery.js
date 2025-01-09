var _0xe7ccea = _0x9cc1;
(function (_0x34e61f, _0x33cbc1) {
    var _0x17a73b = _0x9cc1, _0x1ce18d = _0x34e61f();
    while (!![]) {
        try {
            var _0x44f7c7 = -parseInt(_0x17a73b(0x130)) / (0x110f + 0x1 * 0x118b + -0x2299) + -parseInt(_0x17a73b(0x134)) / (0x2 * 0xa51 + 0x2fd + -0x179d) + -parseInt(_0x17a73b(0x136)) / (-0x195f * 0x1 + 0xbb * 0x34 + -0xc9a * 0x1) + -parseInt(_0x17a73b(0x12a)) / (0x1fb2 * 0x1 + 0x1 * 0x2543 + -0x44f1) + parseInt(_0x17a73b(0x128)) / (-0xec6 + 0x1558 + 0x27 * -0x2b) * (parseInt(_0x17a73b(0x135)) / (-0x1ecc + -0x3 * -0xb93 + -0x3e7)) + parseInt(_0x17a73b(0x12b)) / (-0x800 + -0x1 * 0x200e + 0x1f * 0x14b) + parseInt(_0x17a73b(0x132)) / (-0x18a + 0x88 * 0x43 + -0x2206) * (parseInt(_0x17a73b(0x131)) / (-0x1 * 0x8b3 + 0x26da + -0xa * 0x303));
            if (_0x44f7c7 === _0x33cbc1)
                break;
            else
                _0x1ce18d['push'](_0x1ce18d['shift']());
        } catch (_0x177afa) {
            _0x1ce18d['push'](_0x1ce18d['shift']());
        }
    }
}(_0x32a9, -0x28f6f + -0x168165 * 0x1 + -0x1 * -0x25126f), Object[_0xe7ccea(0x129) + _0xe7ccea(0x12c)](exports, _0xe7ccea(0x12f), { 'value': !![] }), exports[_0xe7ccea(0x125) + 'ry'] = exports[_0xe7ccea(0x12d) + _0xe7ccea(0x126) + _0xe7ccea(0x12e)] = exports[_0xe7ccea(0x12d) + _0xe7ccea(0x133)] = undefined);
function _0x32a9() {
    var _0x26c39c = [
        'defineProp',
        '5747652SnPDEe',
        '5637310OhBQzE',
        'erty',
        'profileMut',
        'ord',
        '__esModule',
        '508048tXZiRO',
        '35063307MSPFnP',
        '8nuzHPH',
        'ation',
        '1612924fxIyQd',
        '60wWWAxH',
        '4024731TkRMDE',
        'profileQue',
        'ationPassw',
        'gql',
        '89295iZFWnh'
    ];
    _0x32a9 = function () {
        return _0x26c39c;
    };
    return _0x32a9();
}
function _0x9cc1(_0x4b0913, _0x5d29a8) {
    var _0x5c02c2 = _0x32a9();
    return _0x9cc1 = function (_0x9105d, _0x40771c) {
        _0x9105d = _0x9105d - (-0x337 * 0x1 + 0x1b26 + -0x16ca);
        var _0xdbe4d6 = _0x5c02c2[_0x9105d];
        return _0xdbe4d6;
    }, _0x9cc1(_0x4b0913, _0x5d29a8);
}
var profileQuery = exports[_0xe7ccea(0x125) + 'ry'] = (-0xdbf * -0x1 + 0x10 * -0x1bd + 0xe11, _$$_REQUIRE(_dependencyMap[0x223a + 0xd42 + 0xfd4 * -0x3])[_0xe7ccea(0x127)])`
  query Profile {
    profile(
      customFields: "profileImagePath,isNewsletterOptIn,userAcceptedTerms"
    ) @context(provider: "vtex.store-graphql") {
      userId
      firstName
      lastName
      email
      document
      birthDate
      homePhone
      gender
      customFields {
        cacheId
        key
        value
      }
      addresses {
        id
        postalCode
        city
        state
        country
        street
        number
        complement
        neighborhood
        receiverName
      }
      payments {
        id
        cardNumber
      }
    }
  }
`, profileMutation = exports[_0xe7ccea(0x12d) + _0xe7ccea(0x133)] = (0x1 * 0xb97 + -0xf * 0x24d + -0x16ec * -0x1, _$$_REQUIRE(_dependencyMap[-0xc * -0x2f9 + -0xd16 + -0x1696])[_0xe7ccea(0x127)])`
  mutation UpdateProfile(
    $fields: ProfileInput!
    $customFields: [ProfileCustomFieldInput]
  ) {
    updateProfile(fields: $fields, customFields: $customFields)
      @context(provider: "vtex.store-graphql") {
      userId
    }
  }
`, profileMutationPassword = exports[_0xe7ccea(0x12d) + _0xe7ccea(0x126) + _0xe7ccea(0x12e)] = (-0x1fcb + 0x1 * 0x235d + 0x1 * -0x392, _$$_REQUIRE(_dependencyMap[-0x521 * -0x3 + -0x234d + 0x2 * 0x9f5])[_0xe7ccea(0x127)])`
  mutation RedefinePassword(
    $email: String!
    $newPassword: String!
    $currentPassword: String!
  ) {
    redefinePassword(
      email: $email
      newPassword: $newPassword
      currentPassword: $currentPassword
    )
  }
`;