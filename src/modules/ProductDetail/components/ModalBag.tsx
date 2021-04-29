import {
  Box,
  Button,
  ProductHorizontalListCard,
  ProductHorizontalListCardProps,
  Typography,
} from 'reserva-ui';
import Modal from 'react-native-modal';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export interface ModalBagProps {
  isVisible: boolean;
  onBackdropPress: () => void;
}

export const ModalBag = ({ isVisible, onBackdropPress }: ModalBagProps) => {
  const [count, setCount] = useState(1);
  const bagProducts: ProductHorizontalListCardProps[] = [
    {
      currency: 'R$',
      discountTag: 18,
      itemColor: 'Branca',
      ItemSize: '41',
      productTitle: 'CAMISETA BÁSICA RESERVA',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      count: count,
      onClickAddCount: (count) => {
        setCount(count);
      },
      onClickSubCount: (count) => {
        setCount(count);
      },
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      currency: 'R$',
      discountTag: 18,
      itemColor: 'Branca',
      ItemSize: '41',
      productTitle: 'CAMISETA BÁSICA RESERVA',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      count: count,
      onClickAddCount: (count) => {
        setCount(count);
      },
      onClickSubCount: (count) => {
        setCount(count);
      },
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      currency: 'R$',
      discountTag: 18,
      itemColor: 'Branca',
      ItemSize: '41',
      productTitle: 'CAMISETA BÁSICA RESERVA',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      count: count,
      onClickAddCount: (count) => {
        setCount(count);
      },
      onClickSubCount: (count) => {
        setCount(count);
      },
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
    {
      currency: 'R$',
      discountTag: 18,
      itemColor: 'Branca',
      ItemSize: '41',
      productTitle: 'CAMISETA BÁSICA RESERVA',
      installmentsNumber: 3,
      installmentsPrice: 99.9,
      price: 345.0,
      priceWithDiscount: 297.0,
      count: count,
      onClickAddCount: (count) => {
        setCount(count);
      },
      onClickSubCount: (count) => {
        setCount(count);
      },
      imageSource:
        'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
    },
  ];

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      backdropColor='transparent'
      animationInTiming={300}
      animationIn='fadeInDown'
      animationOut='fadeOutRight'
    >
      <Box
        position='absolute'
        py='xxxs'
        pl='xxxs'
        top={25}
        right={0}
        width={321}
        height={363}
        backgroundColor='white'
        boxShadow='topBarShadow'
      >
        <Box marginBottom='micro'>
          <Typography variant='tituloSessoes'>Sacola (1)</Typography>
        </Box>
        <ScrollView>
          {bagProducts.map((product, key) => (
            <Box mt={key > 0 ? 'micro' : null} key={key}>
              <ProductHorizontalListCard {...product} />
            </Box>
          ))}
        </ScrollView>
        <Button
          title='FEACHAR PEDIDO'
          variant='primarioEstreito'
          inline
          mx='md'
          mt='xxxs'
        />
      </Box>
    </Modal>
  );
};
