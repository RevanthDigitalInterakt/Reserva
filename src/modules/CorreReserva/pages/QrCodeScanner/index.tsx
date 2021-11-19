import React, { useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { Dimensions } from 'react-native';
import { BarCodeReadEvent } from 'react-native-camera';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backgroundApp, Box, theme, Typography } from 'reserva-ui';

import { CorreReservaStackParamList } from '../..';
import { useCorre } from '../../context';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

export interface QrCodeScannerProps {
  isFinalizingRace?: boolean;
}

type QrCodeScannerNavigator = StackNavigationProp<
  CorreReservaStackParamList,
  'QrCodeScanner'
>;

type QrCodeScannerNav = StackScreenProps<
  CorreReservaStackParamList,
  'QrCodeScanner'
>;

export const QrCodeScanner: React.FC<QrCodeScannerNav> = ({
  route: { params },
}) => {
  const navigation = useNavigation<QrCodeScannerNavigator>();
  const { ValidCodes, setSelectedKit, selectedModality } = useCorre();

  const isFinalizingRace = params?.isFinalizingRace;

  const qrSize = DEVICE_WIDTH - 2 * 70;

  const innerQrDetailSize = qrSize - 28 * 2;

  const edgesSize = innerQrDetailSize / 4.8;
  const edgesSpacing = edgesSize * (innerQrDetailSize / edgesSize - 2);

  const HandleOnPressBottom = () => {
    console.log('isFinalizingRace', isFinalizingRace);
    if (isFinalizingRace && selectedModality === 'presential') {
      navigation.navigate('RaceFinalized');
    } else {
      navigation.navigate('RaceDetail');
    }
  };

  const getStartValidQr = (code: string) =>
    ValidCodes.find(
      (validCode) => validCode.name !== 'finalizar' && validCode.code === code
    );
  const getFinalValidQr = (code: string) =>
    ValidCodes.find(
      (validCode) => validCode.name === 'finalizar' && validCode.code === code
    );

  const onSuccess = (qrEvent: BarCodeReadEvent) => {
    console.log(
      ValidCodes.find((validCode) => validCode.code === qrEvent.data.trim())
    );
    if (isFinalizingRace) {
      if (getFinalValidQr(qrEvent.data.trim()))
        setSelectedKit(getFinalValidQr(qrEvent.data.trim()));
      navigation.navigate('RaceFinalized');
    } else if (getStartValidQr(qrEvent.data.trim())) {
      setSelectedKit(getStartValidQr(qrEvent.data.trim()));
      navigation.navigate('RaceDetail');
    }
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        flex: 1,
      }}
    >
      <QRCodeScanner
        onRead={onSuccess}
        showMarker
        reactivate
        customMarker={<QrCodeMarker qrSize={qrSize} />}
        cameraType="back"
        cameraStyle={{
          height: '100%',
          width: DEVICE_WIDTH,
        }}
      />

      <Box
        position="absolute"
        bottom={49}
        paddingLeft={28}
        paddingRight={28}
        width="100%"
      >
        <TouchableOpacity onPress={HandleOnPressBottom}>
          {isFinalizingRace ? (
            <Box
              style={{
                // marginHorizontal: 28,
                height: 50,
                width: '100%',
                backgroundColor: '#555555',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                fontSize={13}
                fontFamily="nunitoSemiBold"
                lineHeight={24}
                color="white"
                letterSpacing={1.6}
                style={{ textTransform: 'uppercase' }}
              >
                Finalize sem LER o QR CODE
              </Typography>
            </Box>
          ) : (
            <Typography
              fontFamily="reservaSansRegular"
              fontSize={16}
              color="white"
              textAlign="center"
            >
              Não deu pra ler o QR Code?
              <Typography fontFamily="reservaSansBold">
                {'\nClique aqui'}{' '}
              </Typography>
              e inicie agora mesmo.
            </Typography>
          )}
        </TouchableOpacity>
      </Box>
    </SafeAreaView>
  );
};

interface QrCodeMarkerProps {
  qrSize: number;
}

const QrCodeMarker: React.FC<QrCodeMarkerProps> = ({ qrSize }) => {
  const innerQrDetailSize = qrSize - 28 * 2;

  const edgesSize = innerQrDetailSize / 4.8;
  const edgesSpacing = edgesSize * (innerQrDetailSize / edgesSize - 2);

  const sidingHeight = (DEVICE_HEIGHT - qrSize) / 2;
  const sidingWidth = (DEVICE_WIDTH - qrSize) / 2;

  return (
    <Box
      // backgroundColor='#000'
      width={DEVICE_WIDTH}
      justifyContent="center"
      alignItems="center"
      flex={1}
    >
      <Box backgroundColor="#000" height={sidingHeight} width={DEVICE_WIDTH} />
      <Box flexDirection="row">
        <Box width={sidingWidth} height={qrSize} backgroundColor="#000" />
        <Box
          width={qrSize}
          height={qrSize}
          borderWidth={1}
          borderColor="neutroQuente2"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            width={innerQrDetailSize}
            height={innerQrDetailSize}
            flexDirection="row"
            flexWrap="wrap"
          >
            <Box
              style={{
                borderTopLeftRadius: 10,
                borderTopWidth: 3,
                borderLeftWidth: 3,
                borderLeftColor: theme.colors.vermelhoAlerta,
                borderTopColor: theme.colors.vermelhoAlerta,
                width: edgesSize,
                height: edgesSize,
                marginRight: edgesSpacing,
                marginBottom: edgesSpacing,
              }}
            />
            <Box
              style={{
                borderTopRightRadius: 10,
                borderTopWidth: 3,
                borderRightWidth: 3,
                borderRightColor: theme.colors.vermelhoAlerta,
                borderTopColor: theme.colors.vermelhoAlerta,
                width: edgesSize,
                height: edgesSize,
              }}
            />
            <Box
              style={{
                borderBottomLeftRadius: 10,
                borderBottomWidth: 3,
                borderLeftWidth: 3,
                borderLeftColor: theme.colors.vermelhoAlerta,
                borderBottomColor: theme.colors.vermelhoAlerta,
                width: edgesSize,
                height: edgesSize,
              }}
            />
            <Box
              style={{
                borderBottomRightRadius: 10,
                borderBottomWidth: 3,
                borderRightWidth: 3,
                borderRightColor: theme.colors.vermelhoAlerta,
                borderBottomColor: theme.colors.vermelhoAlerta,
                width: edgesSize,
                height: edgesSize,
                marginLeft: edgesSpacing,
              }}
            />
          </Box>
        </Box>
        <Box width={sidingWidth} height={qrSize} backgroundColor="#000" />
      </Box>
      <Box backgroundColor="#000" height={sidingHeight} width={DEVICE_WIDTH} />
    </Box>
  );
};
