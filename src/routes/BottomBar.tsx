import React from 'react';
import { Dimensions, Platform } from 'react-native';

import { Box } from '../components/Box/Box';
import { Button } from '../components/Button';
import { IconLegacy } from '../components/IconLegacy/IconLegacy';
import { Typography } from '../components/Typography/Typography';
import IconComponent from '../components/IconComponent/IconComponent';

const screenWidth = Dimensions.get('window').width;

interface BottomBarButtonProps {
  onPress: () => void;
  iconName: string;
  isSlected?: boolean;
  label: string
  testID?: string;
  accessibilityLabel?: string;
}

export function BottomBarButton({
  iconName,
  onPress,
  isSlected,
  label,
  testID,
  accessibilityLabel,
}: BottomBarButtonProps) {
  return (
    <Button
      mx="micro"
      width={screenWidth / 5}
      margin={0}
      onPress={() => onPress()}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <>
        {iconName === 'Roulet' ? (
          <IconComponent icon="roulet" style={{ width: 25, height: 25, marginBottom: 4 }} />
        ) : (
          <IconLegacy
            name={iconName}
            color={isSlected ? 'vermelhoAlerta' : 'preto'}
            size={25}
            mb={4}
          />
        )}
        <Typography fontSize="9px" fontFamily="nunitoRegular" color={isSlected ? 'vermelhoAlerta' : 'preto'}>{label}</Typography>
      </>
    </Button>
  );
}

interface BottomBarProps {
  children:
  | React.ReactElement<BottomBarButtonProps>
  | React.ReactElement<BottomBarButtonProps>[];
}

export function BottomBar({ children }: BottomBarProps) {
  return (
    <Box
      style={{ elevation: 10 }}
      boxShadow={Platform.OS === 'ios' ? 'bottomBarShadow' : null}
      flex={1}
      flexDirection="row"
      justifyContent="space-evenly"
      alignItems="center"
      height={57}
      bg="white"
    >
      {children}
    </Box>
  );
}
