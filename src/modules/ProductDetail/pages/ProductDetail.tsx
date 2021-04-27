import React, { useState } from 'react';
import { Alert, Dimensions, PickerItemProps } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {
  Box,
  Button,
  Divider,
  Icon,
  Picker,
  PickerItem,
  ProductDetailCard,
  SelectColor,
  Typography,
  OutlineInput,
} from 'reserva-ui';
import { Input } from 'reserva-ui/src/components/TextField/TextField.styles';

const screenWidth = Dimensions.get('window').width;

interface ProductDetailProps {}

export const ProductDetail: React.FC<ProductDetailProps> = ({}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [sizeSelectorIsVisible, setSizeSelectorIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PickerItem>();
  const colors = [
    '#F9F9ED',
    '#7494A5',
    '#2D4452',
    '#484C51',
    '#070707',
    '#484C51',
    '#BE6ED5',
    '#4A56A7',
    '#1ECB58',
  ];
  const [selectedColor, setSelectedColor] = useState('#F9F9ED');
  return (
    <>
      <ScrollView>
        <ProductDetailCard
          installmentsNumber={3}
          installmentsPrice={99.9}
          title='CAMISETA BÁSICA RESERVA'
          discountTag={18}
          price={345}
          priceWithDiscount={297}
          imagesWidth={screenWidth}
          //imagesHeight={504}
          images={[
            'https://media.discordapp.net/attachments/488087473348542486/834798298182189087/unknown.png',
            'https://media.discordapp.net/attachments/488087473348542486/834835471582363719/unknown.png',
            'https://media.discordapp.net/attachments/488087473348542486/831612180508049408/Imagem_332x.png',
          ]}
          isFavorited={isFavorited}
          onClickFavorite={(favoriteState: any) => {
            setIsFavorited(favoriteState);
          }}
          onClickShare={() => {
            Alert.alert('compartilhar!!');
          }}
        />
        <Box px='xs'>
          <Box flexDirection='row'>
            <Button
              title='selecionar tamanho'
              mt='xxxs'
              variant='modal'
              onPress={(color: any) => {
                setSizeSelectorIsVisible(true);
              }}
              rightIcon={<Icon name='ChevronRight' size={16} color='preto' />}
            />
            <Picker
              onAndroidBackButtonPress={() => setSizeSelectorIsVisible(false)}
              onSelect={(pickerItem: any) => {
                setSelectedItem(pickerItem);
              }}
              isVisible={sizeSelectorIsVisible}
              items={[
                {
                  text: '35',
                  subText: '(últimas peças)',
                },
                {
                  text: '36',
                },
                {
                  text: '37',
                },
                {
                  text: '38',
                  subText: '(últimas peças)',
                },
                {
                  text: '39',
                },
                {
                  text: '40',
                },
                {
                  text: '41',
                },
                {
                  text: '42',
                  subText: '(últimas peças)',
                },
                {
                  text: '43',
                },
                {
                  text: '44',
                },
                {
                  text: '45',
                  subText: '(últimas peças)',
                },
                {
                  text: '46',
                },
              ]}
              onClose={() => setSizeSelectorIsVisible(false)}
              title='Escolha o seu tamanho'
            />
          </Box>
          <Box pt='nano' flexDirection='row'>
            <Button
              title='Guia de medidas'
              fontFamily='nunitoRegular'
              fontSize={11}
              py='nano'
              fontWeight='normal'
              leftIcon={<Icon name='Ruler' size={28} />}
            />
          </Box>
          <Box mt='micro'>
            <Typography
              fontFamily='reservaSerifRegular'
              fontWeight='normal'
              fontSize={22}
            >
              Cor: Branco
            </Typography>
            <ScrollView horizontal>
              <SelectColor
                onPress={(color: any) => setSelectedColor(color)}
                size={39}
                listColors={colors}
                selectedColor={selectedColor}
              />
            </ScrollView>
          </Box>
          <Divider variant='fullWidth' my='xs' />
          <Typography variant='subtituloSessoes'>
            Consultar prazo e valor do frete
          </Typography>
          <Box flexDirection='row'>
            <Button
              title='Inserir seu CEP'
              mt='xxxs'
              variant='modal'
              rightIcon={<Icon name='Search' size={16} color='preto' />}
            />
          </Box>
          <Divider variant='fullWidth' my='xs' />
          <Typography>
            <Button>
              <Box flexDirection='row' alignItems='center'>
                <Icon name='Add' size={15} color='preto' />
                <Typography variant='tituloSessoes'>
                  Sobre este produto
                </Typography>
              </Box>
            </Button>
          </Typography>
          <Divider variant='fullWidth' my='xs' />
          <Typography variant='subtituloSessoes'>
            Receba novidades e promoções
          </Typography>
          <Box flexDirection='column' mb='xl'>
            <OutlineInput
              placeholder='Digite seu e-mail'
              iconName='ChevronRight'
            />
          </Box>
        </Box>
      </ScrollView>
      <Box>
        <Button title='ADICIONAR À SACOLA' inline variant='primarioEstreito' />
      </Box>
    </>
  );
};
