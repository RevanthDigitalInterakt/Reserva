import React, { useState } from 'react';
import {
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Box, Button, Typography } from '@danilomsou/reserva-ui';
import { ProfileVars } from '../../../../graphql/profile/profileQuery';
import { TopBarBackButton } from '../../../Menu/components/TopBarBackButton';
export interface ChangePhoneNumberViewProps {
  profile: ProfileVars;
  navigateToRegisterPhoneNumber: () => void;
  navigateToConfirmPhone: () => void;
}

export const ChangePhoneNumberView = ({
  profile,
  navigateToRegisterPhoneNumber,
  navigateToConfirmPhone,
}: ChangePhoneNumberViewProps) => {
  const [phone, setPhone] = React.useState('');
  const [openConfirmCodeSection, setOpenConfirmCodeSection] =
    React.useState(false);
  const [code, setCode] = useState('');
  const [showError, setShowError] = useState(false);
  const [changePhoneNumber, setChangePhoneNumber] = useState(false);
  const [verifiedPhoneNumber, setVerifiedPhoneNumber] = useState(false);

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        enabled
        keyboardVerticalOffset={15}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView>
          <Box mx="xxs" mt="xxs">
            <Box>
              <Box mb="nano">
                <Typography
                  style={{ lineHeight: 28 }}
                  fontFamily="reservaSerifMedium"
                  fontSize={28}
                >
                  Confirme seu telefone
                </Typography>
              </Box>

              <Box mb="xxs" mr={22}>
                <Typography fontFamily="nunitoRegular" fontSize={14}>
                  Mantenha seu número de telefone sempre atualizado para
                  garantir seu cashback e ter acesso as nossas novidades.
                </Typography>
              </Box>
            </Box>

            <Box justifyContent="center" mb="xxs">
              <Box alignItems="center">
                <Typography
                  fontFamily="reservaSerifBold"
                  fontSize={22}
                  color="preto"
                  style={{ lineHeight: 18 }}
                >
                  {profile?.homePhone
                    ?.slice(3)
                    .replace(/(\d{2})(\d{5})(\d{4})/, '($1) *****-$3')}
                </Typography>
              </Box>
            </Box>
            <Box mb="xs">
              <Button
                onPress={navigateToConfirmPhone}
                height={50}
                inline
                bg="verdeSucesso"
              >
                <Typography
                  color="white"
                  fontFamily="nunitoSemiBold"
                  fontSize={13}
                  style={{ lineHeight: 24, letterSpacing: 1.6 }}
                >
                  CONFIRMAR
                </Typography>
              </Button>

              <Button
                mt={12}
                onPress={navigateToRegisterPhoneNumber}
                variant="primarioEstreitoOutline"
                inline
              >
                <Typography
                  color="preto"
                  fontFamily="nunitoSemiBold"
                  fontSize={13}
                  style={{ lineHeight: 24, letterSpacing: 1.6 }}
                >
                  ALTERAR NÚMERO
                </Typography>
              </Button>
            </Box>
          </Box>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
