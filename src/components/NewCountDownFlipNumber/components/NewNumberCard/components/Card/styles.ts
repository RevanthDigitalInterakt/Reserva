import { Dimensions, Platform, StyleSheet } from 'react-native';
import { platformType } from '../../../../../../utils/platformType';
import { COLORS, FONTS } from '../../../../../../base/styles';

const { width } = Dimensions.get('window');
const size = width / 8;

interface NumberCardStyleProps {
  upper?: boolean;
}

const styles = ({ upper }: NumberCardStyleProps) => StyleSheet.create({
  card: {
    margin: 0,
    padding: 0,
    flex: 0.5,
    paddingLeft: 4,
    paddingRight: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.MEDIUM_BLACK_2,
    borderBottomColor: COLORS.MEDIUM_BLACK_2,
    overflow: 'hidden',
    borderBottomWidth: upper ? 0.5 : 0,
    borderTopWidth: upper ? 0 : 0.5,
  },
  number: {
    color: COLORS.WHITE,
    transform: [
      upper ? { translateY: size * 0.23 } : { translateY: -size * 0.23 },
    ],
    fontSize: size / 1.8,
    lineHeight:
        Platform.OS === platformType.ANDROID ? size / 1.85 : size / 1.65,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
  },
});

export default styles;
