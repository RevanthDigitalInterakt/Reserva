import { StyleSheet } from 'react-native';
import { FONTS } from '../../../../../../base/styles';
import { scale } from '../../../../../../utils/scale';

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'flex-start',
    flex: 1,
  },
  btnShowDescription: {
    flexDirection: 'row',
    width: '95%',
    marginTop: scale(6),
  },
  containerIconSubtraction: {
    alignSelf: 'center',
    paddingLeft: 4,
    paddingRight: 4,
  },
  containerIconAdd: {
    alignSelf: 'center',
    paddingRight: 8,
  },
  expanseTitleItemContainer: {
    width: '95%',
    margin: 5,
  },
  txtTitle: {
    fontFamily: FONTS.NUNITO_BOLD,
    fontSize: scale(13),
  },
  expanseContentItem: {
    width: '95%',
    paddingHorizontal: 4,
    marginTop: scale(16),
    marginBottom: scale(16),
  },
  txtExpanseContentItem: {
    fontFamily: FONTS.NUNITO_REGULAR,
    fontSize: scale(11),
  },
});

export default styles;
