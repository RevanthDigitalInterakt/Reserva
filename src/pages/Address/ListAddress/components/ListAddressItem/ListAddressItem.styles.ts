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
    flex: 1,
  },

  listItemSubtitle: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: COLORS.BLACK,
  },

  listItemActionsContainer: {
    backgroundColor: COLORS.LIGHT_BLACK,
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
  },

  modalBody: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  modalText: {
    fontSize: 14,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButton: {
    backgroundColor: COLORS.LIGHT_BLACK,
    padding: 20,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 14,
  },
  closeButton: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemBodyContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 0,
    margin: 0,
  },
  tagMainAddressContainer: {
    backgroundColor: COLORS.SUCCESS,
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 5,
    marginLeft: 5,
  },
  tagMainAddressLabel: {
    fontFamily: 'ReservaSans-Regular',
    color: COLORS.WHITE,
  },
});

export default style;
