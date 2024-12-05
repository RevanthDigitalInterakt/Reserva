import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { addMinutes, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import styles from './styles';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

interface CopiedCupomDescriptionProps {
  onPress: () => void;
}

export function BlockedRouletDescription({ onPress }: CopiedCupomDescriptionProps) {
  const { rouletCoupon } = useBagStore(['rouletCoupon']);
  const dateFromTimestamp = parseISO(rouletCoupon.timestamp!);
  const dateAfter30Minutes = addMinutes(dateFromTimestamp, 30);
  const nowUTC = utcToZonedTime(new Date(), 'America/Sao_Paulo');
  const timeToUnblockInMinutes = Math.floor(
    (dateAfter30Minutes.getTime() - nowUTC.getTime()) / 1000 / 30,
  );

  const timeToUnblockInSeconds = Math.floor(
    (dateAfter30Minutes.getTime() - nowUTC.getTime()) / 1000,
  ) % 30;

  return (
    <>
      <Text style={styles.normalDescription}>
        Quer outra rodada na roleta de benefícios da Reserva?
        Contagem regressiva:
        <Text style={styles.boldDescription}>
          {' '}
          {timeToUnblockInMinutes.toString().padStart(2, '0')}
          :
          {timeToUnblockInSeconds.toString().padStart(2, '0')}
          {' '}
          {timeToUnblockInMinutes < 1 ? 'segundos' : 'minutos'}
          !
        </Text>
        {' '}
        Depois disso, é só usar um novo e-mail e você estará pronto para girar novamente.
        A sorte está a caminho!
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonText}>CONTINUAR COMPRANDO</Text>
      </TouchableOpacity>
    </>
  );
}
