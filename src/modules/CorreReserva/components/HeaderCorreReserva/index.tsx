import React, { useEffect, useState } from 'react';

import { useNavigation } from '@react-navigation/native';
import { BackHandler, Image } from 'react-native';
import { View } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Box, Icon } from '@danilomsou/reserva-ui';

import { useCorre } from '../../context';
import { images } from '../../images';
import { ModalGetOutCorre } from '../ModalGetOutCorre';

export interface HeaderCorreReservaProps {
  isFullPage?: boolean;
  showBackButton?: boolean;
}

export const HeaderCorreReserva: React.FC<HeaderCorreReservaProps> = ({
  showBackButton,
}) => {
  const { hasStarted, isLastPage } = useCorre();
  const navigation = useNavigation();
  const [isVisibleAlert, setIsVisibleAlert] = useState(false);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (hasStarted) {
        setIsVisibleAlert(true);
      } else {
        navigation.goBack();
      }
      return true;
    });
  }, [hasStarted]);

  return isLastPage ? (
    <></>
  ) : (
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
            <Image style={{ width: 134, height: 34 }} source={images.corre} />
          </Box>
          <Box alignItems="center" flexGrow={1}>
            <Image style={{ width: 29, height: 34 }} source={images.picaPau} />
          </Box>
        </Box>
      </View>
    </>
  );
};
