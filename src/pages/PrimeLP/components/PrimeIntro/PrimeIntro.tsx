import React from 'react';
import { View } from 'react-native';
import { styles } from './PrimeIntro.styles';
import type { PrimeDetailOutput } from '../../../../base/graphql/generated';
import testProps from '../../../../utils/testProps';
import { Typography } from '../../../../components/Typography/Typography';

interface IPrimeIntro {
  data: PrimeDetailOutput;
}

function PrimeIntro({ data }: IPrimeIntro) {
  return (
    <View style={styles.wrapper} {...testProps('PrimeIntro_wrapper')}>
      <View style={styles.elevatedBox}>
        <Typography variant="tituloSessoes" style={styles.title}>
          A experiência
          <Typography variant="descontoTag1" style={styles.titleStrong}>
            {' Reserva'}
          </Typography>
          {'\n'}
          em seu modo
          <Typography variant="descontoTag1" style={styles.titleStrong}>
            {' Premium'}
          </Typography>
        </Typography>

        <Typography variant="tituloSessao" style={styles.subtitle}>
          Faça parte do Prime, o clube de vantagens da Reserva, e tenha acesso
          a benefícios em todos os produtos da marca, além de experiências
          exclusivas em parceiros que já completam seu estilo de vida.
        </Typography>

        <Typography variant="tituloSessao" style={styles.subtitle}>
          Assine em até
          <Typography
            variant="precoTotal"
            style={styles.subtitleStrong}
          >
            {` ${data.installmentQty}x de R$ ${data.installmentPrice} `}
          </Typography>
          e comece a aproveitar agora! Depois que se tornar membro,
          você não vai se arrepender.
        </Typography>
      </View>
    </View>
  );
}

export default PrimeIntro;
