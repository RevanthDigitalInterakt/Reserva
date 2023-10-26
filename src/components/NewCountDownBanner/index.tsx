import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropShadow from 'react-native-drop-shadow';
import type { HomeCountdownQuery } from '../../base/graphql/generated';
import { useCountDown } from '../../context/ChronometerContext';
import testProps from '../../utils/testProps';
import { NewCountDownBannerModal } from './components/NewCountDownBannerModal';
import { useChronometer } from '../../hooks/useChronometer';
import styles from './styles';
import { NewCountDownFlipNumber } from '../NewCountDownFlipNumber';

interface ICountDownBanner {
  data: HomeCountdownQuery['homeCountdown'];
}

export function NewCountDownBanner({ data }: ICountDownBanner) {
  const [showModal, setShowModal] = useState(false);
  const navigation = useNavigation();
  const { time = '00:00:00', setTime } = useCountDown();
  const { currentValue, start } = useChronometer({
    countDown: true,
    initial: data?.formattedValue || '00:00:00',
  });

  const onPress = useCallback(() => {
    navigation.navigate('ProductCatalog', { referenceId: data?.reference });
  }, [data]);

  const showClock = useMemo(() => {
    if (!data) return false;
    const nowIsAfterCountDownStart = Date.now() > new Date(data.countdownStart!).getTime();
    const timeIsOver = Date.now() > new Date(data.countdown!).getTime();
    const isTimeToShow = data.countdownStart ? nowIsAfterCountDownStart : true;
    return isTimeToShow && !timeIsOver;
  }, [data]);

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    if (setTime) {
      setTime(currentValue);
    }
  }, [currentValue]);

  if (!showClock || !data || time === '00:00:00') return null;

  return (
    <DropShadow style={styles.dropShadow}>
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <Text style={styles.title}>{data.title ?? ''}</Text>

          <View style={styles.cronometerAndButtonsWrapper}>
            <NewCountDownFlipNumber />
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                onPress={onPress}
                {...testProps('count_down_banner_button_promotion')}
              >
                <View style={styles.callToAction}>
                  <Text style={styles.callToActionText}>
                    {data?.titleButton}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowModal(true)}
                {...testProps('count_down_show_modal')}
              >
                <Text style={styles.rulesLinkButton}>Confira as regras.</Text>
              </TouchableOpacity>
            </View>
          </View>

          <NewCountDownBannerModal
            isVisible={showModal}
            setIsVisible={() => setShowModal(false)}
            data={data}
            goToPromotion={() => {
              setShowModal(false);
              onPress();
            }}
          />
        </View>
      </View>
    </DropShadow>
  );
}
