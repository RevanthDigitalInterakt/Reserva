import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Badge } from '../Badge/Badge';
import { Box } from '../Box/Box';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';
import { buttonVariants } from './constants';
import { ButtonStyle } from './styles';
import type { ButtonProps, ButtonStyleProps } from './types';

export const buttonVariantsOptions = Object.keys(
  buttonVariants.variants as Object,
);

export function Button({
  icon,
  title,
  inline,
  testID,
  loading,
  disabled,
  children,
  leftIcon,
  rightIcon,
  badgeCount,
  buttonBackgroundColor,
  ...props
}: ButtonProps) {
  const styleProps: ButtonStyleProps = props;
  const { variant } = styleProps;

  const fetchTextColor = () => {
    let { color } = styleProps;
    if (buttonVariants.variants && variant && !styleProps.color) {
      color = buttonVariants.variants[variant].color;
    }
    return color;
  };

  const fetchFontSize = () => {
    let { fontSize } = styleProps;
    if (buttonVariants.variants && variant && !styleProps.fontSize) {
      fontSize = buttonVariants.variants[variant].fontSize;
    }
    return fontSize;
  };

  const fetchFontFamily = () => {
    let { fontFamily } = styleProps;
    if (buttonVariants.variants && variant && !styleProps.fontFamily) {
      fontFamily = buttonVariants.variants[variant].fontFamily;
    }
    return fontFamily;
  };

  const handleIcon = (iconProps: typeof leftIcon) => {
    if (iconProps?.props.name) {
      const IconProps = { ...iconProps.props };

      return <IconLegacy {...IconProps} />;
    }

    return null;
  };

  const handleComponent = () => {
    if (variant === 'icone') {
      return (
        <Box flexGrow={0} justifyContent="flex-end">
          <Box
            top={-5}
            zIndex={1}
            right={-5}
            flexGrow={0}
            position="absolute"
            justifyContent="center"
          >
            {!!badgeCount && <Badge count={badgeCount} />}
          </Box>
          {handleIcon(icon)}
        </Box>
      );
    }

    if (!children) {
      return (
        <Box
          alignItems="center"
          flexDirection="row"
          width={variant === 'modal' ? '100%' : undefined}
          justifyContent={variant === 'modal' ? 'space-between' : 'center'}
        >
          {variant === 'modal' && leftIcon ? (
            <Box
              width={29}
              height={32}
              borderColor="preto"
              borderRadius="pico"
              alignItems="center"
              alignSelf="flex-end"
              borderWidth="hairline"
              justifyContent="center"
              borderLeftColor="transparente"
            >
              {handleIcon(leftIcon)}
            </Box>
          ) : (
            handleIcon(leftIcon)
          )}
          <Box
            justifyContent="center"
            height={styleProps.height}
            px={variant === 'modal' ? 'micro' : undefined}
          >
            <Typography
              letterSpacing={1.6}
              color={fetchTextColor()}
              fontSize={fetchFontSize()}
              fontFamily={fetchFontFamily()}
            >
              {title}
            </Typography>
          </Box>
          {variant === 'modal' && rightIcon ? (
            <Box
              width={29}
              height={32}
              borderColor="preto"
              borderRadius="pico"
              alignItems="center"
              alignSelf="flex-end"
              borderWidth="hairline"
              justifyContent="center"
              borderRightColor="transparente"
            >
              {handleIcon(rightIcon)}
            </Box>
          ) : (
            handleIcon(rightIcon)
          )}
        </Box>
      );
    }

    return children;
  };

  return (
    <Box height={styleProps.height} alignItems={inline ? 'stretch' : 'center'}>
      <ButtonStyle
        testID={testID}
        disabled={disabled}
        height={styleProps.height}
        style={{
          opacity: disabled || loading ? 0.35 : 1,
          ...(buttonBackgroundColor
            ? { backgroundColor: buttonBackgroundColor }
            : {}),
        }}
        {...styleProps}
      >
        {handleComponent()}
      </ButtonStyle>

      {loading && (
        <ActivityIndicator
          animating
          style={{ opacity: 1, position: 'absolute', right: 8 }}
        />
      )}
    </Box>
  );
}
