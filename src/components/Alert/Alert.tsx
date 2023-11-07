import React from 'react';
import {
  Platform,
} from 'react-native';
import Modal, { type ModalProps } from 'react-native-modal';
import { Box } from '../Box/Box';
import { theme } from '../../base/usereservappLegacy/theme';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';

export interface AlertProps extends Partial<ModalProps> {
  isVisible?: boolean;
  title?: string;
  subtitle?: string;
  confirmText?: string;
  cancelText?: string;
  disabled?: boolean;
  colorBackdrop?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onBackDropPress?: () => void;
  onClose?: () => void;
  onAndroidBackButtonPress?: () => void;
}

export function Alert({
  isVisible,
  title = 'Titulo',
  subtitle,
  disabled,
  confirmText = 'OK',
  cancelText = 'CANCELAR',
  colorBackdrop,
  onConfirm,
  onCancel,
  onBackDropPress,
  onClose,
  onAndroidBackButtonPress,
  ...props
}: AlertProps) {
  const androidCloseButton = () => {
    if (Platform.OS !== 'android') return;
    if (onAndroidBackButtonPress) {
      onAndroidBackButtonPress();
      return;
    }

    if (!onAndroidBackButtonPress && onClose) {
      onClose();
      return;
    }

    if (!onAndroidBackButtonPress && !onClose && onCancel) {
      onCancel();
    }
  };
  return (
    <Box>
      <Modal
        {...props}
        onBackButtonPress={() => {
          androidCloseButton();
        }}
        avoidKeyboard
        onBackdropPress={() => {
          if (onBackDropPress) {
            onBackDropPress();
          }
        }}
        backdropColor={colorBackdrop || theme.colors.modalBackDropColor}
        isVisible={isVisible}
      >
        <Box bg="white">
          {onClose && (
            <Box alignSelf="flex-end" paddingRight="micro" paddingTop="micro">
              <Button
                hitSlop={{
                  top: 30, left: 30, bottom: 30, right: 30,
                }}
                onPress={() => onClose()}
                variant="icone"
                icon={<IconLegacy name="Close" size={12} />}
              />
            </Box>
          )}
          <Box
            paddingX="micro"
            paddingY={subtitle ? 'micro' : 'xxs'}
            flexDirection="row"
            justifyContent="space-between"
          >
            <Typography fontFamily="reservaSerifRegular" fontSize={20}>
              {title}
            </Typography>
          </Box>
          {subtitle && (
            <Box paddingX="micro" paddingY="micro">
              <Typography fontFamily="nunitoRegular" fontSize={15}>
                {subtitle}
              </Typography>
            </Box>
          )}
          <Box
            paddingX="micro"
            paddingY="xxxs"
            paddingTop="micro"
            justifyContent="center"
            flexDirection="row"
          />

          <Box flexDirection="row" mb="micro" justifyContent="center">
            <Box width={1 / 2}>
              <Button
                onPress={() => onConfirm()}
                marginLeft="micro"
                marginRight="nano"
                title={confirmText.toUpperCase()}
                variant="primarioEstreitoOutline"
                inline
                disabled={disabled}
              />
            </Box>

            {!!onCancel && (
              <Box width={1 / 2}>
                <Button
                  onPress={() => onCancel()}
                  marginRight="micro"
                  marginLeft="nano"
                  title={cancelText.toUpperCase()}
                  variant="primarioEstreitoOutline"
                  inline
                  disabled={disabled}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
