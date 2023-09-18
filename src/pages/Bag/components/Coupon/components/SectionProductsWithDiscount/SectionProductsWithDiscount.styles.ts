import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../../base/styles/colors';

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
    fontFamily: 'ReservaSans-Regular',
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
    fontFamily: 'ReservaSans-Bold',
    textTransform: 'uppercase',
    margin: 10,
    padding: 10,
  },

  sectionGradientContainer: {
    position: 'absolute',
    backgroundColor: 'transparent',
    top: 115,
    width: '100%',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionActionButtonContainer: {
    marginTop: 20,
  },

  sectionActionButtonText: {
    textDecorationLine: 'underline',
    fontFamily: 'Nunito-SemiBold',
  },
});

export default styles;
