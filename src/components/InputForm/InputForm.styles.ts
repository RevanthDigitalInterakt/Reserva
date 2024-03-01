import { Platform, StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles/colors';
import { platformType } from '../../utils/platformType';
import { FONTS } from '../../base/styles';

const styles = StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: COLORS.TEXT_INPUT_CONTAINER,
    padding: Platform.OS === platformType.IOS ? 15 : 10,
  },

  inputText: {
    marginHorizontal: 10,
    fontFamily: FONTS.NUNITO_REGULAR,
    color: COLORS.TEXT_INPUT,
    fontWeight: 'bold',
    fontSize: 14,
    padding: 0,
  },

  borderErrorActive: {
    borderColor: COLORS.INPUT_ERROR_MESSAGE,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  errorIcon: {
    width: 13,
    height: 13,
  },
  errorMessage: {
    color: COLORS.INPUT_ERROR_MESSAGE,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  labelStyle: {
    top: 10,
    left: 10,
    position: 'absolute',
    zIndex: 10000,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 5,
  },

  inputPlaceholder: {
    fontFamily: FONTS.NUNITO_REGULAR,
    color: COLORS.TEXT_INPUT_PLACEHOLDER,
  },
});

export default styles;
