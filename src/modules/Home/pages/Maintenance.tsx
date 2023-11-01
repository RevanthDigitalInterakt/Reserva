import React from 'react';
import { Dimensions, Linking, Modal } from 'react-native';

import testProps from '../../../utils/testProps';
import IconComponent from '../../../components/IconComponent/IconComponent';
import { Box } from '../../../components/Box/Box';
import { Typography } from '../../../components/Typography/Typography';
import { Button } from '../../../components/Button';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface MaintenanceProps {
  isVisible: boolean;
}

export const Maintenance: React.FC<MaintenanceProps> = ({ isVisible }) => (isVisible ? (
  <Modal
    {...testProps('com.usereserva:id/maintenance_modal')}
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    transparent
  >
    <Box
      testID="com.usereserva:id/maintenance_container"
      position="absolute"
      zIndex={10}
      flex={1}
      height={SCREEN_HEIGHT}
      width={SCREEN_WIDTH}
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
    >
      <Box width="100%" justifyContent="center" alignItems="center">
        <IconComponent height={120} width={120} icon="foraDoAr" />
        <Typography
          style={{
            marginTop: 42,
            paddingHorizontal: 60,
            lineHeight: 32,
          }}
          textAlign="center"
          fontFamily="reservaSerifMedium"
          fontSize={20}
        >
          Estamos preparando algo especial para você
        </Typography>
        <Typography
          testID="com.usereserva:id/maintenance_description"
          style={{
            marginTop: 37,
            paddingHorizontal: 40,
            lineHeight: 20,
          }}
          textAlign="center"
          fontFamily="nunitoRegular"
          fontSize={13}
        >
          O app entrou em manutenção e voltará em breve. Mas caso precise de
          ajuda, é só chamar.
        </Typography>
      </Box>

      <Box width="100%" px={22}>
        <Button
          testID="com.usereserva:id/maintenance_button"
          title="FALE CONOSCO"
          width="100%"
          onPress={() => {
            Linking.openURL('https://whts.co/reserva');
          }}
          variant="primarioEstreitoOutline"
          mt={49}
          inline
        />
      </Box>
    </Box>
  </Modal>
) : null);
