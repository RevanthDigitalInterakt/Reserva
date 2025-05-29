import React, { useMemo } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import type {
  ColorProps,
  LayoutProps,
  ShadowProps,
  SpaceProps,
} from 'styled-system';
import { theme } from '../../base/usereservappLegacy/theme';
import { usePrimeInfo } from '../../hooks/usePrimeInfo';
import testProps from '../../utils/testProps';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import IconComponent from '../IconComponent/IconComponent';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import IconLocation from '../../../assets/icons/IconLocation';
import { useRemoteConfig } from '../../hooks/useRemoteConfig';

export type IconTopBar = {
  name: string;
  size: number;
  onPress: () => void;
  badgeCount?: number;
  color?: string;
  testID: string;
};

interface DefaultTopBarProps {
  showLogo?: boolean;
  leftButton?: IconTopBar;
  rightButton1?: IconTopBar;
  rightButton2?: IconTopBar;
  locationButton?: {
    iconColor: string;
    showButton?: boolean;
    onPress: (value: boolean) => void;
  };
  loading: Boolean;
}

export interface TopBarProps
  extends DefaultTopBarProps,
  SpaceProps<typeof theme>,
  ShadowProps<typeof theme>,
  LayoutProps<typeof theme>,
  ColorProps<typeof theme> {}

export function TopBar({
  showLogo = true,
  leftButton,
  rightButton1,
  rightButton2,
  locationButton,
  loading = false,
  ...props
}: TopBarProps) {
  const { getBoolean } = useRemoteConfig();
  const showGeolocationButton = useMemo(() => getBoolean('show_geolocation'), []);

  const { isPrime, primeActive } = usePrimeInfo();
  return (
    <SafeAreaView>
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
                ? <IconLegacy name="Logo" color="vermelhoAlerta" size={24} />
                : <IconLegacy name="Logo" color="vermelhoAlerta" size={24} />}
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
            {locationButton !== undefined && locationButton.showButton && showGeolocationButton && (
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => locationButton.onPress(true)}
              >
                <IconLocation color={locationButton.iconColor} />
              </TouchableOpacity>
            )}

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
    </SafeAreaView>
  );
}
