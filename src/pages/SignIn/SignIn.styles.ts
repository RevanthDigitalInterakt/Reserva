import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  content: {
    padding: 20,
  },

  title: {
    fontFamily: 'ReservaSerif-Regular',
    fontSize: 22,
  },

  subTitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    marginTop: 20,
  },

  contentForm: {
    marginVertical: 20,
  },

  inputContainer: {
    borderBottomWidth: 1,
  },

  inputContent: {
    padding: 0,
    margin: 0,
  },

  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 3,
  },

  errorMessage: {
    color: COLORS.INPUT_ERROR_MESSAGE,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },

  linkContainer: {
    marginTop: 5,
  },

  linkText: {
    textDecorationLine: 'underline',
    fontFamily: 'Nunito-Regular',
  },

  actionButton: {
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textActionButton: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    letterSpacing: 1,
  },

  dividerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 70,
    marginBottom: 20,
  },

  divider: {
    borderWidth: 1,
    borderColor: COLORS.INPUT_BORDER,
    width: '20%',
  },

  infoText: {
    alignContent: 'center',
    fontFamily: 'Nunito-SemiBold',
  },
});

export default styles;
