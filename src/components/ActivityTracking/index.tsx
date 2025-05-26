import {
  Image, ImageBackground, Platform, ScrollView, Text, View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { getTrackingStatus, requestTrackingPermission } from 'react-native-tracking-transparency';
import { styles } from './styles';
import { commons } from '../../base/styles';
import { DarkButton } from '../DarkButton';
import testProps from '../../utils/testProps';
import { useHomeStore } from '../../zustand/useHomeStore';
import { platformType } from '../../utils/platformType';

const infos = [
  {
    icon: commons.greenCheck,
    info: 'Se você clicar em permitir na próxima tela, você irá continuar recebendo sua experiência personalizada Reserva que já tem hoje.',
  },
  {
    icon: commons.config,
    info: 'Você sempre pode mudar de ideia e mudar futuramente nas configurações do iOS.',
  },
];

function Infos() {
  return (
    <View style={styles.infosWrapper}>
      {infos.map((item, index) => (
        <View {...testProps(`info-${index + 1}`)} key={item.info} style={styles.infosContentWrapper}>
          <Image
            style={styles.infoIcon}
            source={item.icon}
          />
          <Text style={styles.infoText}>{item.info}</Text>
        </View>
      ))}
    </View>
  );
}

export function ActivityTracking() {
  const [isOpen, setIsOpen] = useState(Platform.OS === 'ios');
  const { setHasTabBar } = useHomeStore(['setHasTabBar']);
  const handleTrackingPermission = async () => {
    const isIOS = Platform.OS === platformType.IOS;
    if (!isIOS) {
      setIsOpen(false);
      return;
    }
    const trackingStatus = await getTrackingStatus();
    if (trackingStatus !== 'not-determined') setIsOpen(false);
    if (trackingStatus === 'not-determined') {
      setHasTabBar(false);
      setIsOpen(true);
    }
  };

  const handleSelectTrackingPermission = async () => {
    await requestTrackingPermission();
    setIsOpen(false);
    setHasTabBar(true);
  };

  useEffect(() => {
    handleTrackingPermission();
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <ScrollView {...testProps('activityTracking')} style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.bannerWrapper}>
            <ImageBackground
              source={commons.ios14}
              style={styles.imageBackground}
              resizeMode="stretch"
            >
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.37)', 'rgba(0, 0, 0, 0.2)']}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.linearGradientWrapper}
              >
                <Image source={commons.reservaIcon} />
                <View style={styles.bannerInfoWrapper}>
                  <Text
                    style={styles.bannerInfoText}
                  >
                    Você está usando o
                    {' '}
                    {'\n'}
                    {' '}
                    App Reserva no iOS 14+
                  </Text>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View style={{
            paddingHorizontal: 24,
          }}
          >
            <Text style={styles.iosInfoText}>
              Esta versão do iOS requer que solicitemos
              {'\n'}
              permissão para rastrear as atividades
              {'\n'}
              provenientes
              de
              aplicativos e sites que você visita.
            </Text>
            <Text style={styles.trackingAgreementText}>
              Permitir que a Reserva aprimore minha experiência de compra no App?
            </Text>

            <Infos />

            <Text style={styles.trackingDeniedText}>
              Se optar por não permitir na próxima tela,
              o aplicativo Reserva deixará de utilizar seus dados para
              aprimorar sua experiência exclusiva no app.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.darkButtonWrapper}>
        <DarkButton
          {...testProps('continueButton')}
          onPress={handleSelectTrackingPermission}
          title="Continuar"
        />
      </View>
    </>
  );
}
