import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { Box, Button, Icon, Typography } from '@danilomsou/reserva-ui';
import { margin, marginBottom, marginLeft } from 'styled-system';

const { width, height } = Dimensions.get('window');

const contentfulMock = [
  {
    id: '1',
    title: `Boas-vindas
ao App da
Reserva`,
    subTitle: `Aqui, você terá acesso a pré-lançamentos, coleções exclusivas e sempre rola um cupom de desconto… Ative as notificações pra receber tudo em 1ª mão.

Aliás, separamos um cupom pra você:
Use RSV50APP e ganhe R$ 50 na sua 1ª compra*.`,
    image: require('../images/foto-01.png'),
    description:
      '*Válido apenas para 1ª compra acima de R$ 150, exceto para assinaturas, máscara, cartão-presente e bebidas. Restrito a 1 uso por CPF, de uso exclusivo no App e não cumulativo com outras promoções.',
    buttonTitle: 'PERMITIR NOTIFICAÇÕES',
    opacity: 1,
    imageHeader: '',
  },
  {
    id: '2',
    title: 'Compre aqui, retire na loja mais próxima',
    subTitle:
      'Encontre a melhor loja pra receber seus pedidos num piscar de olhos. Basta permitir sua localização.',
    image: require('../images/foto-02.png'),
    description: '',
    buttonTitle: 'PERMITIR LOCALIZAÇÃO',
    opacity: 0,
    imageHeader: '',
  },
  {
    id: '3',
    title: 'Receba as melhores sugestões',
    subTitle:
      'Pra receber recomendações personalizadas e ter uma experiência completa do nosso App, permita o acesso a suas atividades e informações.',
    image: require('../images/foto-03.png'),
    description: '',
    buttonTitle: 'PERMITIR ACESSO',
    opacity: 0,
    imageHeader: '',
  },
  {
    id: '4',
    title: '',
    subTitle: `A gente ainda nem falou a melhor parte: a cada 1 peça comprada por aqui, 5 pratos de comida são viabilizados pra quem tem fome.

Tudo pronto. Você está prestes a ter a Reserva todinha na palma da mão. Aproveite!`,
    image: require('../images/foto-04.png'),
    description: '',
    buttonTitle: 'ENTRAR NO APP',
    opacity: 0,
    imageHeader: require('../images/ImagemHeader.png'),
  },
];

const Slide = ({ item, goNextSlide, currentSlideShow, lengthArray }) => {
  const ButtonNext = () => {
    return (
      <TouchableOpacity
        onPress={goNextSlide}
        style={{
          alignContent: 'center',
          width: width,
          flex: 1,
          marginTop: 20,
          alignItems: 'center',
        }}
      >
        <Typography color={'white'} fontFamily="nunitoBold">
          PULAR
        </Typography>
      </TouchableOpacity>
    );
  };

  const Indicators = () => {
    return (
      <View
        style={{
          height: height * 0.25,
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          position: 'absolute',
          marginLeft: width * 0.05,
          marginTop: height * 0.03,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
          }}
        >
          {contentfulMock.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentSlideShow === index && {
                  backgroundColor: '#FFFFFF',
                },
              ]}
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <View>
      <ImageBackground
        source={item?.image}
        resizeMode={'cover'}
        style={{
          height: height,
          width: width,
        }}
      >
        <Box position={'absolute'}>
          <Box
            flex={1}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 1)',
              opacity: item.opacity === 1 ? 0.1 : 0.6,
              width: width,
              height: height,
              position: 'absolute',
            }}
          ></Box>

          <Box
            style={{
              flexDirection: 'row',
              backgroundColor: 'red',
              position: 'absolute',
              flex: 1,
              width: width,
            }}
          >
            <Indicators />

            <Box
              position={'absolute'}
              top={height * 0.03}
              right={width * 0.06}
              zIndex={4}
              style={{ marginTop: height * 0.03 }}
            >
              <Button
                hitSlop={{
                  top: 30,
                  bottom: 30,
                  right: 30,
                  left: 30,
                }}
                onPress={() => {}}
                variant="icone"
                icon={<Icon size={13} name="Close" color="white" />}
              />
            </Box>
          </Box>

          {item.imageHeader ? (
            <Box
              style={{
                marginTop: height * 0.09,
                marginLeft: width * 0.1,
                marginRight: width * 0.1,
              }}
            >
              <Image source={item?.imageHeader} />
            </Box>
          ) : null}

          {item.title ? (
            <Typography
              fontFamily={'reservaSerifBold'}
              fontSize={46}
              color={'white'}
              style={{
                marginTop: height * 0.09,
                marginLeft: width * 0.1,
                marginRight: width * 0.1,
              }}
            >
              {item?.title}
            </Typography>
          ) : null}

          <Typography
            fontFamily={'reservaSansRegular'}
            fontSize={16}
            color={'white'}
            style={{
              marginLeft: width * 0.1,
              marginRight: width * 0.05,
              marginTop: height * 0.01,
            }}
          >
            {item?.subTitle}
          </Typography>

          <Typography
            fontFamily={'reservaSansRegular'}
            fontSize={14}
            color={'white'}
            style={{
              marginLeft: width * 0.1,
              marginRight: width * 0.05,
              paddingTop: '50%',
            }}
          >
            {item.description}
          </Typography>

          {/* Button */}
          <Box
            width="100%"
            style={{
              marginTop: height * 0.85,
              position: 'absolute',
            }}
            flex={1}
          >
            <Button
              title={item?.buttonTitle}
              onPress={() => {}}
              marginX="md"
              inline
              backgroundColor={'white'}
              style={{ alignItems: 'flex-start', paddingLeft: 10 }}
              fontFamily={'nunitoRegular'}
              fontSize={13}
              height={50}
              borderRadius={'xxxs'}
            >
              <Box flexDirection={'row'}>
                <Box flex={1} marginLeft={'xxxs'}>
                  <Typography variant={'tituloSessao'}>
                    {item.buttonTitle}
                  </Typography>
                </Box>

                <Icon
                  name={'MenuArrowBack'}
                  color={'preto'}
                  size={'25'}
                  style={{ transform: [{ rotate: '180deg' }] }}
                  marginRight={'xxxs'}
                />
              </Box>
            </Button>

            {currentSlideShow < lengthArray - 1 ? <ButtonNext /> : null}
          </Box>
        </Box>
      </ImageBackground>
    </View>
  );
};

export const OnboardingScreen = ({}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = React.useRef();

  const updateCurrentSlideIndex = (e) => {
    const contentOfsetx = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOfsetx / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != contentfulMock.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box>
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          data={contentfulMock}
          contentContainerStyle={{ height: height }}
          showsHorizontalScrollIndicator={false}
          horizontal
          pagingEnabled
          renderItem={({ item }) => (
            <Slide
              item={item}
              goNextSlide={goNextSlide}
              currentSlideShow={currentSlideIndex}
              lengthArray={contentfulMock.length}
            />
          )}
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  indicator: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    marginHorizontal: 6,
    borderWidth: 1,
  },
});
