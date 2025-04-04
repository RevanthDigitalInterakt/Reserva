import React, { useMemo } from 'react';
import { View } from 'react-native';
import IconPrimeDiscount from '../Icons/IconPrimeDiscount';
import IconPrimeFreeShipping from '../Icons/IconPrimeFreeShipping';
import IconPrimeCashback from '../Icons/IconPrimeCashback';
import { styles } from './PrimeBenefits.styles';
import type { PrimeDetailOutput } from '../../../../base/graphql/generated';
import IconPrimePartners from '../Icons/IconPrimePartners';
import { Typography } from '../../../../components/Typography/Typography';

interface IPrimeBenefits {
  data: PrimeDetailOutput;
}

function PrimeBenefits({ data }: IPrimeBenefits) {
  const benefits = useMemo(() => ([
    {
      Icon: <IconPrimeDiscount style={styles.icon} />,
      title: 'Descontos Especiais',
      text: (
        <Typography variant="tituloSessao" style={styles.itemDescription}>
          <Typography variant="precoTotal" style={styles.itemDescriptionBold}>15% OFF* </Typography>
          em todas as peças das marcas Reserva.
        </Typography>
      ),
    },
    {
      Icon: <IconPrimeFreeShipping style={styles.icon} />,
      title: 'Frete Grátis',
      text: (
        <Typography variant="tituloSessao" style={styles.itemDescription}>
          Em toda compra*, sem valor mínimo e
          válido em todo o Brasil.
        </Typography>
      ),
    },
    {
      Icon: <IconPrimeCashback style={styles.icon} />,
      title: `R$ ${data.monthlyCashback} de Cashback Mensal`,
      text: (
        <Typography variant="tituloSessao" style={styles.itemDescription}>
          Todo mês, ganhe o valor da sua assinatura de volta.
        </Typography>
      ),
    },
    {
      Icon: <IconPrimePartners style={styles.icon} />,
      title: 'Programa de Parcerias',
      text: (
        <Typography variant="tituloSessao" style={styles.itemDescription}>
          <Typography variant="precoTotal" style={styles.itemDescriptionBold}>
            Acesso exclusivo
          </Typography>
          {' '}
          a benefícios com marcas parceiras de variados segmentos.
        </Typography>
      ),
    },
  ]), [data]);

  return (
    <View style={styles.wrapper} testID="com.usereserva:id/PrimeBenefits_wrapper">
      <Typography variant="tituloSessoes" style={styles.title}>
        Vantagens em ser
        <Typography variant="descontoTag2" style={styles.titleBold}>{' Prime'}</Typography>
      </Typography>

      <Typography variant="tituloSessao" style={styles.subtitle}>
        Ganhe um infinito de comodidades pra aproveitar no site, App,
        lojas físicas e até fora da Reserva. Além de acesso a
        pré-lançamentos e produtos exclusivos, você também garante:
      </Typography>

      <View style={styles.listWrapper}>
        {benefits.map((item) => (
          <View key={`prime-benefit-${item.title}`} style={styles.itemContainer}>
            {item.Icon}

            <Typography variant="descontoTag2" style={styles.itemTitle}>
              {item.title}
            </Typography>

            {item.text}
          </View>
        ))}
      </View>
    </View>
  );
}

export default PrimeBenefits;
