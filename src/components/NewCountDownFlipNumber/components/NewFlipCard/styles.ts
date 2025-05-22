import { Dimensions, Platform, StyleSheet } from 'react-native';
import { platformType } from '../../../../utils/platformType';
import { COLORS, FONTS } from '../../../../base/styles';

const { width } = Dimensions.get('window');
const size = width / 8;

interface NewFlipCardStylesProps {
  isFront?: boolean;
}

const frontFlipCard = {
  top: 0,
  borderTopLeftRadius: size / 10,
  borderTopRightRadius: size / 10,
  borderBottomWidth: 0.5,
};

const backFlipCard = {
  top: '50%',
  borderBottomLeftRadius: size / 10,
  borderBottomRightRadius: size / 10,
  borderTopWidth: 0.5,
};

const styles = ({ isFront }: NewFlipCardStylesProps) => StyleSheet.create({
  container: {
    paddingLeft: 4,
    paddingRight: 4,
    position: 'absolute',
    left: 0,
    height: '50%',
    width: '100%',
    backgroundColor: COLORS.MEDIUM_BLACK,
    borderColor: COLORS.MEDIUM_BLACK_2,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    ...(isFront ? frontFlipCard : backFlipCard),
  },

  overflowContainer: {
    width: size,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  number: {
    transform: [
      isFront ? { translateY: size * 0.23 } : { translateY: -size * 0.23 },
    ],
    color: COLORS.WHITE,
    fontSize: size / 1.8,
    lineHeight:
        Platform.OS === platformType.ANDROID ? size / 1.85 : size / 1.65,
    fontFamily: FONTS.RESERVA_SANS_BOLD,
  },
});

export default styles;
