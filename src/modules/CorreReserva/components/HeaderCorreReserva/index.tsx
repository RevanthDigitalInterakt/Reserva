import React, { useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Icon, Image } from 'reserva-ui';

import { useCorre } from '../../context';
import { images } from '../../images';
import { ModalGetOutCorre } from '../ModalGetOutCorre';

export interface HeaderCorreReservaProps {
  isFullPage?: boolean;
  showBackButton?: boolean;
}

const DEVICE_HEIGHT = Dimensions.get('window').height;

export const HeaderCorreReserva: React.FC<HeaderCorreReservaProps> = ({
  isFullPage,
  showBackButton,
}) => {
  const { hasStarted } = useCorre();
  const navigation = useNavigation();
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);
  return (
    <>
      <ModalGetOutCorre
        isVisible={isVisibleAlert}
        onClickBackdrop={() => setIsVisibleAlert(false)}
        onCloseButtonPress={() => setIsVisibleAlert(false)}
        onCancelButtonPress={() => {
          setIsVisibleAlert(false);
          navigation.navigate('ModalitySelector');
        }}
        onConfirmButtonPress={() => setIsVisibleAlert(false)}
      />
      <View
        style={{
          width: '100%',
        }}
      >
        <Box marginTop={42} flexDirection="row" justifyContent="space-between">
          <Box paddingLeft={17} justifyContent="center" flexGrow={1}>
            <TouchableOpacity
              onPress={() => {
                if (hasStarted) {
                  setIsVisibleAlert(true);
                } else {
                  navigation.goBack();
                }
              }}
              disabled={!showBackButton}
            >
              <Icon
                size={25}
                name="ArrowBack"
                color={showBackButton ? 'white' : 'transparente'}
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
    </>
  );
};
