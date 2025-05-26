import React, { useCallback } from 'react';
import { Dimensions, Platform } from 'react-native';

import { Box } from '../components/Box/Box';
import { Button } from '../components/Button';
import { IconLegacy } from '../components/IconLegacy/IconLegacy';
import { Typography } from '../components/Typography/Typography';
import IconComponent from '../components/IconComponent/IconComponent';
import Personalize from '../base/svgs/Personalize';

const screenWidth = Dimensions.get('window').width;

interface BottomBarButtonProps {
  onPress: () => void;
  iconName: string;
  isSlected?: boolean;
  label: string
  testID?: string;
  accessibilityLabel?: string;
  hidden?: boolean;
}

export function BottomBarButton({
  iconName,
  onPress,
  isSlected = false,
  label,
  testID,
  accessibilityLabel,
  hidden,
}: BottomBarButtonProps) {
  const renderIcon = useCallback((nameIcon: string, isSlected: boolean) => {
    if (nameIcon === 'FacaVc') {
      return <Personalize />;
    }

    if (nameIcon === 'Roulet') {
      return (
        <IconComponent icon="roulet" style={{ width: 25, height: 25, marginBottom: 4, tintColor: isSlected ? 'vermelhoAlerta' : 'preto' }} />
      );
    }

    return (
      <IconLegacy
        name={nameIcon}
        color={isSlected ? 'vermelhoAlerta' : 'preto'}
        size={25}
        mb={4}
      />
    );
  }, []);
  return (
    <Button
      mx="micro"
      width={screenWidth / 5}
      margin={0}
      style={{ display: hidden ? 'none' : 'flex' }}
      onPress={() => onPress()}
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      <>
        {renderIcon(iconName, isSlected)}
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
