import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../../base/styles/colors';

const style = StyleSheet.create({
  listItemContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 2,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  listItemContent: {
    flexDirection: 'column',
    padding: 20,
  },

  listItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  listItemTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },

  listItemSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: COLORS.BLACK,
  },

  listItemActionsContainer: {
    backgroundColor: COLORS.ACTION_BUTTON_COLOR,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '13%',
  },

  listItemActionButton: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },

  listItemBody: {
    marginTop: 20,
  },
});

export default style;
