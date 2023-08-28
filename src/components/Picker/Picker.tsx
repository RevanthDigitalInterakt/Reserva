import React from 'react';
import { Platform, ScrollView } from 'react-native';
import Modal from 'react-native-modal';
import { theme } from '../../base/usereservappLegacy/theme';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';

export interface PickerItem {
  text: string;
  subText?: string;
}

export interface PickerProps {
  isVisible: boolean;
  title: string;
  swipeDirection?: boolean;
  items: PickerItem[];
  onSelect?: (item: PickerItem) => void;
  onBackDropPress?: () => void;
  onClose: () => void;
  onAndroidBackButtonPress: () => void;
}

export function Picker({
  isVisible,
  title = 'Picker',
  swipeDirection = true,
  items,
  onSelect,
  onBackDropPress,
  onClose,
  onAndroidBackButtonPress,
}: PickerProps) {
  const androidCloseButton = () => {
    if (Platform.OS !== 'android') return;
    if (onAndroidBackButtonPress) {
      onAndroidBackButtonPress();
      return;
    }

    if (!onAndroidBackButtonPress && onClose) {
      onClose();
    }
  };
  return (
    <Modal
      style={{ justifyContent: 'flex-end', margin: 0 }}
      swipeDirection={swipeDirection ? ['down'] : null}
      onBackButtonPress={() => {
        androidCloseButton();
      }}
      avoidKeyboard
      onBackdropPress={() => {
        if (onBackDropPress) {
          onBackDropPress();
        }
      }}
      backdropColor={theme.colors.modalBackDropColor}
      isVisible={isVisible}
    >
      <Box pt="nano" bg="white" height="80%">
        <Box
          paddingX="micro"
          paddingY="micro"
          flexDirection="row"
          justifyContent="space-between"
        >
          <Button onPress={() => onClose()}>
            <Box flexDirection="row">
              <Typography fontFamily="reservaSerifRegular" fontSize={20}>
                {title}
              </Typography>
            </Box>
          </Button>
          {onClose && (
            <Box paddingRight="micro">
              <Button
                hitSlop={{
                  top: 20, bottom: 20, left: 30, right: 50,
                }}
                onPress={() => onClose()}
                variant="icone"
                icon={(
                  <IconLegacy
                    name="ArrowBack"
                    style={{ transform: [{ rotate: '270deg' }] }}
                    size={16}
                  />
                )}
              />
            </Box>
          )}
        </Box>
        <ScrollView>
          <Box
            flexWrap="wrap"
            flexDirection="row"
            mb="micro"
            justifyContent="center"
          >
            {items.map((item, index) => {
              const fullWidth = items.length % 2 == 1 && index == items.length - 1;
              return (
                <Box
                  key={`picker-${item.text}`}
                  py="nano"
                  width={fullWidth ? 1 / 1 : 1 / 2}
                  alignItems="flex-start"
                  alignContent="flex-start"
                  flexWrap="wrap"
                >
                  <Button
                    onPress={() => {
                      onSelect(item);
                      onClose();
                    }}
                    marginLeft="micro"
                    marginRight="nano"
                    inline
                    hitSlop={{
                      top: 10, bottom: 10, left: 30, right: 30,
                    }}
                  >
                    <Box
                      alignSelf="flex-start"
                      alignContent="flex-start"
                      flexDirection="row"
                    >
                      <Typography
                        color="preto"
                        fontFamily="nunitoRegular"
                        fontSize={15}
                        textAlign="left"
                      >
                        {item.text}
                      </Typography>
                      {item.subText && (
                        <Box px="quarck" alignSelf="center">
                          <Typography
                            color="modalBackDropColor"
                            fontFamily="nunitoRegular"
                            fontSize={11}
                            textAlign="left"
                          >
                            {item.subText}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Button>
                </Box>
              );
            })}
          </Box>
        </ScrollView>
      </Box>
    </Modal>
  );
}
