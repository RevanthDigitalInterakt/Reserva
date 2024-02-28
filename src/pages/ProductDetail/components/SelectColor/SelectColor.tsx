import React from 'react';
import { type ColorProps } from 'styled-system';
import { ImageBackground } from 'react-native';
import type { theme } from '../../../../base/usereservappLegacy/theme';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';

interface SelectColorsProps extends ColorProps<typeof theme> {
  listColors: { id: string, url: string }[];
  disabledColors: string[];
  selectedColors?: string | string[];
  onPress: (item: string) => void;
  size?: number;
}

export function SelectColor({
  listColors,
  selectedColors,
  disabledColors,
  onPress,
  size = 25,
}: SelectColorsProps) {
  const renderOptions = () => {
    const listItems = listColors.map((item) => (
      <Box key={`color-option-${item.id}`}>
        <Button disabled={disabledColors.includes(item.id)} onPress={() => onPress(item.id)}>
          <Box
            height={size + 5}
            width={size + 5}
            bg={
                selectedColors?.includes(item.id) || selectedColors === item.id
                  ? 'white'
                  : null
              }
            borderRadius="infinity"
            borderWidth={
                selectedColors?.includes(item.id) || selectedColors === item.id
                  ? 'hairline'
                  : 'hairline'
              }
            borderColor={
                selectedColors?.includes(item.id) || selectedColors === item.id
                  ? 'neutroFrio2'
                  : 'neutroFrio1'
              }
            justifyContent="center"
            alignItems="center"
            marginLeft="nano"
            marginRight="nano"
            marginBottom="nano"
          >
            <ImageBackground
              resizeMode="cover"
              style={{
                width: size, height: size, borderRadius: 99999, overflow: 'hidden',
              }}
              source={{ uri: item.url }}
            />
            <Box
              height={size}
              width={size}
              style={{ zIndex: -1, position: 'absolute' }}
              borderRadius="infinity"
              bg="offWhite"
            />
          </Box>
        </Button>
      </Box>
    ));
    return listItems;
  };

  return (
    <Box flexWrap="wrap" flexDirection="row">
      {renderOptions()}
    </Box>
  );
}
