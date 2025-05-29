import styled from 'styled-components/native';
import { TextInput, type TextInputProps } from 'react-native';
import {
  type BorderProps,
  type BorderBottomProps,
  type HeightProps,
  type WidthProps,
  type MarginProps,
  type FlexboxProps,
  type TypographyProps,
  type TextColorProps,
  type PaddingProps,
  type SpaceProps,
  borderBottom,
  border,
  height,
  width,
  margin,
  flexbox,
  variant,
  typography,
  color,
  padding,
  space,
} from 'styled-system';
import {
  TextInputMask,
} from 'react-native-masked-text';
import type { theme } from '../../base/usereservappLegacy/theme';

type InputVariantsType = 'paragraphSmall';
export interface InputProps
  extends FlexboxProps<typeof theme>,
  TextInputProps,
  Omit<TypographyProps<typeof theme>, 'textAlign'>,
  BorderProps<typeof theme>,
  TextColorProps<typeof theme>,
  BorderBottomProps<typeof theme>,
  HeightProps<typeof theme>,
  WidthProps<typeof theme>,
  MarginProps<typeof theme>,
  PaddingProps<typeof theme>,
  SpaceProps<typeof theme> {
  fontFamily?: keyof typeof theme.fonts
  variant?: InputVariantsType
}

const inputVariant = variant<InputProps, InputVariantsType, 'variant'>({
  prop: 'variant',
  variants: {
    paragraphSmall: {
      fontFamily: 'nunitoRegular',
      fontSize: 15,
      color: 'preto',

      textAlign: 'left',
    },
  },
});

export const Input = styled(TextInput) <InputProps>`
  ${height}
  ${width}
  ${margin}
  ${border}
  ${borderBottom}
  ${flexbox}
  ${typography}
  ${color}
  ${space}
  ${padding}
  ${inputVariant}
`;
export const InputMask = styled(TextInputMask) <InputProps>`
  ${height}
  ${width}
  ${margin}
  ${border}
  ${borderBottom}
  ${flexbox}
  ${typography}
  ${color}
  ${space}
  ${padding}
  ${inputVariant}
`;
