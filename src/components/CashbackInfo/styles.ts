import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom:0,
    paddingTop:20,
    paddingLeft:15,
    alignSelf: 'flex-start',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#38AB6B',
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
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  tooltipContainer: {
    marginTop: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    width: 246,
    height: 83.27,
    top:70,
    right:-95,
    position: 'absolute',
    zIndex: 100,
    elevation: 10,
    borderColor:'#DDE0E8',
    borderWidth:1,

  },
  fadeAnim: {
    opacity: 0,
  },
  arrow: {
    position: 'absolute',
    backgroundColor:'white',
    width: 20,
    height: 20,
    transform: [{ rotate: '45deg' }],
    borderWidth:1,
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#DDE0E8',
    borderTopColor:'#DDE0E8',
    top: -10,
    left: '56%',
    zIndex: 101,
    marginLeft: -10,
  },
  tooltipTitle: {
  fontSize: 14,
  fontWeight: '600',
  textAlign: 'center',
  },
  textTooltip: {
  fontSize: 11,
  fontWeight: '400',
  textAlign: 'center',
  color:'#848A9D'
  }
});
export default styles;
