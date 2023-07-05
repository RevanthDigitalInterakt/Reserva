import React from 'react';
import type {
  ColorProps,
  LayoutProps,
  ShadowProps,
  SpaceProps,
} from 'styled-system';
import ProgressBar from 'react-native-progress/Bar';
import {
  Button, Box, Icon, theme,
} from '@usereservaapp/reserva-ui';
import testProps from '../../utils/testProps';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import IconComponent from '../IconComponent/IconComponent';

export type IconTopBar = {
  name: string;
  size: number;
  onPress: () => void;
  badgeCount?: number;
  testID: string;
};

interface DefaultTopBarProps {
  showLogo?: boolean;
  leftButton?: IconTopBar;
  rightButton1?: IconTopBar;
  rightButton2?: IconTopBar;
  loading: Boolean;
}

export interface TopBarProps
  extends DefaultTopBarProps,
  SpaceProps<typeof theme>,
  ShadowProps<typeof theme>,
  LayoutProps<typeof theme>,
  ColorProps<typeof theme> {}

export const TopBar = ({
  showLogo = true,
  leftButton,
  rightButton1,
  rightButton2,
  loading = false,
  ...props
}: TopBarProps) => {
  const { isPrime, primeActive } = usePrimeInfo();

  return (
    <Box justifyContent="flex-end" {...props}>
      <Box
        flex={1}
        flexDirection="row"
        justifyContent="flex-end"
        paddingX="micro"
      >
        <Box
          width="25%"
          flexDirection="row"
          alignItems="flex-start"
          alignSelf="center"
        >
          {leftButton !== undefined && (
          <Button
            justifyContent="flex-end"
            hitSlop={{
              top: 20,
              left: 20,
              bottom: 20,
              right: 20,
            }}
            leftIcon={{
              type: 'icon',
              key: 'left-icon',
              props: {
                ...leftButton,
              },
            }}
            {...testProps(leftButton.testID)}
            onPress={leftButton.onPress}
          />
          )}
        </Box>

        {showLogo ? (
          <Box
            width="50%"
            justifyContent="flex-start"
            alignItems="center"
            alignSelf="center"
          >
            {isPrime && primeActive
              ? <IconComponent icon="logoPrime" />
              : <Icon name="Logo" color="vermelhoAlerta" size={24} />}
          </Box>
        ) : (
          <Box
            width="50%"
            justifyContent="flex-start"
            alignItems="center"
            alignSelf="flex-start"
          />
        )}

        <Box
          width="25%"
          flexDirection="row"
          justifyContent="flex-end"
          alignItems="flex-end"
          alignSelf="center"
        >
          {rightButton1 !== undefined && (
          <Button
            hitSlop={{
              top: 20,
              left: 20,
              bottom: 20,
              right: 20,
            }}
            leftIcon={{
              type: 'icon',
              key: 'right-icon',
              props: {
                ...rightButton1,
              },
            }}
            {...testProps(rightButton1.testID)}
            onPress={rightButton1.onPress}
            mr={rightButton2 ? 20 : 0}
          />
          )}

          {rightButton2 !== undefined && (
          <Button
            variant="icone"
            hitSlop={{
              top: 25,
              left: 25,
              bottom: 25,
              right: 25,
            }}
            icon={{
              props: {
                ...rightButton2,
              },
            }}
            {...testProps(rightButton2.testID)}
            onPress={rightButton2.onPress}
            badgeCount={rightButton2.badgeCount}
          />
          )}
        </Box>
      </Box>

      {loading && (
        <Box top={0} height={1} justifyContent="flex-end">
          <ProgressBar
            animated
            indeterminate
            color={theme.colors.vermelhoAlerta}
            height={2}
            borderWidth={0}
            width={null}
            borderRadius={0}
          />
        </Box>
      )}
    </Box>
  );
};
