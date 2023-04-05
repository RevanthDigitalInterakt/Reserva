import React from 'react';
import { Dimensions, Linking, Modal } from 'react-native';
import {
  Box, Button, Image, Typography,
} from '@usereservaapp/reserva-ui';
import { images } from '../../../assets/index';
import testProps from '../../../utils/testProps';

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
        <Image
          source={images.foraDoAr}
            // width={250}
            // height={160}
            // resizeMode="contain"
          autoHeight
        />
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
