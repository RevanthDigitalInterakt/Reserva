import React, { type Dispatch, type SetStateAction } from 'react';
import Modal from 'react-native-modal';

import type { HomeCountdownQuery } from '../../base/graphql/generated';
import testProps from '../../utils/testProps';
import { Box } from '../Box/Box';
import { Button } from '../Button';
import { IconLegacy } from '../IconLegacy/IconLegacy';
import { Typography } from '../Typography/Typography';

interface ICountDownBannerModal {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  data: HomeCountdownQuery['homeCountdown'];
  goToPromotion?: () => void;
}

export function CountDownBannerModal({
  isVisible,
  setIsVisible,
  data,
  goToPromotion,
}: ICountDownBannerModal) {
  if (!data) return null;

  return (
    <Modal
      avoidKeyboard
      onBackdropPress={() => setIsVisible(false)}
      isVisible={isVisible}
    >
      <Box
        {...testProps('check_the_rules_container')}
        bg="white"
        minHeight={184}
        alignItems="center"
        justifyContent="center"
        px={34}
        py={45}
      >
        <Box position="absolute" top={16} right={20} zIndex={4}>
          <Button
            {...testProps('countDownLocal_checkTheRules_button_close')}
            onPress={() => setIsVisible(false)}
            variant="icone"
            icon={<IconLegacy size={17} name="Close" />}
          />
        </Box>
        <Box>
          <Typography
            {...testProps('check_the_rules_title_modal')}
            textAlign="center"
            fontFamily="reservaSerifBold"
            fontSize={34}
          >
            {data.titleModal || ''}
          </Typography>
        </Box>

        <Box mt={8}>
          <Typography lineHeight={23} fontFamily="reservaSansRegular" fontSize={18}>
            {data.descriptionModal || ''}
          </Typography>
        </Box>

        <Box width="100%" mt={38} mb={5}>
          <Button
            {...testProps('check_the_rules_button_promotion')}
            variant="primarioEstreito"
            width="100%"
            height={50}
            onPress={goToPromotion}
          >
            <Typography color="white" fontFamily="nunitoExtraBold" fontSize={13}>
              IR PARA A PROMO
            </Typography>
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
