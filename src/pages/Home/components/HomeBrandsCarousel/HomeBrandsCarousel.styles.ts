import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

interface IBrandContainerProps {
  index: number;
  lastIndex: number;
  deviceWidth: number;
}

const styles = StyleSheet.create({
  contentContainerCarousel: {
    paddingHorizontal: 10,
    paddingVertical: 2,
  },

  carousel: {
    marginVertical: 13,
  },

  brandShadowContainer: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
});

const BrandContainer = styled.TouchableOpacity<IBrandContainerProps>`
  width: ${({ deviceWidth, lastIndex }) => (lastIndex <= 4
    ? `${(deviceWidth - (10 * lastIndex - 1) - 10) / lastIndex}px`
    : '78px')};
  height: 48px;
  max-width: ${({ deviceWidth, lastIndex }) => (lastIndex <= 4
    ? `${(deviceWidth - (10 * lastIndex - 1) - 10) / lastIndex}px`
    : '78px')};
  max-height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: #ffffff;
  margin-right: ${({ index, lastIndex }) => (index === lastIndex ? '0px' : '10px')};
  margin-top: 10px;
`;

export { BrandContainer, styles };
