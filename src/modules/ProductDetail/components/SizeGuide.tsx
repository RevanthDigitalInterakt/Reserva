import React, { useState } from 'react';
import { Dimensions, Modal } from 'react-native';
import { Box, Button, Icon, Image, Typography } from 'reserva-ui';
import { images } from '../../../assets/index'

const screen = Dimensions.get('window');

const DEVICE_WIDTH = screen.width;
const DEVICE_HEIGHT = screen.height;

export const SizeGuide = () => {
  const {
    GuideCamiseta
  } = images

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Box>
      <Button
        onPress={() => setIsVisible(true)}
      >
        <Box flexDirection="row" alignItems="center">
          <Icon name="Ruler" size={35} />
          <Typography fontFamily="nunitoRegular" fontSize={11}>
            Guia de medidas
          </Typography>
        </Box>
      </Button>
      <Modal
        visible={isVisible}
        transparent={true}
        style={{

          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'absolute',
          top: 0,
          left: 0,
          elevation: 5,
          zIndex: 5,
        }}
        onRequestClose={() => { }}
      >
        <Box
          style={{
            width: DEVICE_WIDTH,
            height: DEVICE_HEIGHT,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <Box>
            <Button
              style={{
                width: 40,
                height: 40,
                backgroundColor: 'rgba(256, 256, 256, 0.4)',
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 6,
              }}
              onPress={() => setIsVisible(false)}
            />
            <Image
              source={GuideCamiseta}
            />
          </Box>

        </Box>
      </Modal>
    </Box>)
}