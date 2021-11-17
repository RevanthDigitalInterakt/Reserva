import React from 'react';

import { Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Icon, Image } from 'reserva-ui';

import { images } from '../../images';

export interface HeaderCorreReservaProps {
  isFullPage?: boolean;
  onClickBackButton?: () => void;
}

const DEVICE_HEIGHT = Dimensions.get('window').height;

export const HeaderCorreReserva: React.FC<HeaderCorreReservaProps> = ({
  isFullPage,
  onClickBackButton,
}) => (
  <View
    style={{
      width: '100%',
    }}
  >
    <Box marginTop={42} flexDirection="row" justifyContent="space-between">
      <Box paddingLeft={17} justifyContent="center" flexGrow={1}>
        <TouchableOpacity
          onPress={onClickBackButton}
          disabled={!onClickBackButton}
        >
          <Icon
            size={25}
            name="ArrowBack"
            color={onClickBackButton ? 'white' : 'transparente'}
          />
        </TouchableOpacity>
      </Box>
      <Box alignItems="center" flexGrow={1}>
        <Image width={134} height={34.2} source={images.corre} />
      </Box>
      <Box alignItems="center" flexGrow={1}>
        <Image width={29} height={34.2} source={images.picaPau} />
      </Box>
    </Box>
  </View>
);
