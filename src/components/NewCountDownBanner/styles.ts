import { Platform, StyleSheet } from 'react-native';
import { scale } from '../../utils/scale';
import { platformType } from '../../utils/platformType';
import { FONTS } from '../../base/styles';

const styles = StyleSheet.create({
  dropShadow: {
    shadowColor: '#00000026',
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowRadius: 4,
    shadowOpacity: Platform.OS === platformType.ANDROID ? 0.2 : 0.8, // Porque a opacidade já está definida na cor
    justifyContent: 'center',
  },

  container: {
    marginBottom: scale(4),
    minHeight: scale(90),
    paddingTop: scale(12),
    paddingBottom: scale(5),
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFF',
    width: '95%',
    borderRadius: scale(8),
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },

  contentWrapper: {
    width: '100%',
  },

  title: {
    fontFamily: FONTS.RESERVA_SANS_BOLD,
  },

  subtitle: {
    fontFamily: FONTS.RESERVA_SANS_REGULAR,
    fontSize: scale(20),
    color: '#333',
    marginBottom: scale(14),
    alignSelf: 'center',
  },

  cronometerAndButtonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: scale(18),
  },

  buttonsWrapper: {
    alignItems: 'center',
  },

  callToAction: {
    backgroundColor: '#333333',
    width: scale(120),
    height: scale(40),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scale(4),
  },

  callToActionText: {
    fontFamily: 'ReservaSans-Medium',
    fontSize: scale(14),
    color: '#FFF',
    textAlign: 'center',
  },

  rulesLinkButton: {
    color: '#333333',
    fontFamily: 'ReservaSerif-Regular',
    fontSize: scale(12),
    textDecorationLine: 'underline',
  },
});

export default styles;
