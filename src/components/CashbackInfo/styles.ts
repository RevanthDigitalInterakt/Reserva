import { StyleSheet } from 'react-native';
import { COLORS } from '../../base/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
    paddingTop: 20,
    paddingLeft: 15,
    alignSelf: 'flex-start',
    zIndex: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.BORDER_GREEN,
    padding: 5,
    borderRadius: 8,
  },
  infoIcon: {
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    borderRadius: 10,
  },
  tooltipContainer: {
    marginTop: 10,
    backgroundColor: COLORS.WHITE,
    padding: 10,
    borderRadius: 8,
    width: 246,
    height: 83.27,
    top: 70,
    right: -95,
    position: 'absolute',
    zIndex: 100,
    elevation: 10,
    borderColor: COLORS.SHELF_LIGHT_GRAY,
    borderWidth: 1,

  },
  fadeAnim: {
    opacity: 0,
  },
  arrow: {
    position: 'absolute',
    backgroundColor: COLORS.WHITE,
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
    borderWidth: 1,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: COLORS.SHELF_LIGHT_GRAY,
    borderTopColor: COLORS.SHELF_LIGHT_GRAY,
    top: -10,
    left: '56%',
    zIndex: 101,
    marginLeft: -10,
  },
  tooltipTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    height: 25,
  },
  textTooltip: {
    fontSize: 11,
    fontWeight: '400',
    textAlign: 'center',
    color: COLORS.TEXT_GRAY,
    margin: 0,
  },
});
export default styles;
