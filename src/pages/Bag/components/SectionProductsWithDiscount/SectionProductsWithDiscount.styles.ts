import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../base/styles/colors';
import { FONTS } from '../../../../base/styles';

const styles = StyleSheet.create({
  sectionContainer: {
    marginBottom: 20,
  },

  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  sectionTitle: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
  },

  sectionItemContainer: {
    borderWidth: 1,
    paddingHorizontal: 15,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  sectionItemContent: {
    width: 35,
    height: 35,
    borderRadius: 1,
  },

  sectionItemTitle: {
    color: COLORS.BLACK,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
    textTransform: 'uppercase',
    margin: 10,
    padding: 10,
  },

  sectionGradientContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 70,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },

  sectionActionButtonContainer: {
    marginTop: 20,
  },

  sectionActionButtonText: {
    textDecorationLine: 'underline',
    fontFamily: FONTS.NUNITO_SEMI_BOLD,
  },
});

export default styles;
