import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Button, Divider, Icon, Typography, Image } from 'reserva-ui';
import { images } from '../../../assets';
import { RootStackParamList } from '../../../routes/StackNavigator';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';

type Props = StackScreenProps<RootStackParamList, 'PurchaseConfirmationScreen'>;

export const PurchaseConfirmationScreen = ({ navigation, route }: Props) => {
  const { paymentType } = route?.params;
  return (
    <SafeAreaView
      style={{
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <TopBarBackButton showShadow />

      <ScrollView>
        <Box paddingX={'xxxs'} paddingY={'xxs'}>
          <Box flexDirection="row">
            <Image source={images.purchaseConfirmation} />
            <Box width="80%" ml="xxs">
              <Typography variant="subtituloSessoes">
                Parabéns, seu pedido foi recebido.
              </Typography>
            </Box>
          </Box>
          <Box my="xxs">
            <Typography variant="tituloSessao">
              Confirmação de email enviada para
            </Typography>
            <Typography variant="precoPromocional2">
              email@emailc.com
            </Typography>
          </Box>
          <Divider variant="fullWidth" />
          <Box my="xxs">
            <Typography variant="precoPromocional2">
              Número do pedido
            </Typography>
            <Typography
              fontFamily="reservaDisplayRegular"
              fontSize={20}
              color="vermelhoRSV"
            >
              12-3456789
            </Typography>
          </Box>
          <Divider variant="fullWidth" />
          {paymentType === 'Boleto' && <BarCodeArea />}
          {paymentType === 'PIX' && <PixArea />}

          {paymentType !== 'PIX' && (
            <>
              <Box my="xxs">
                <Box mb="micro">
                  <Typography variant="precoPromocional2">
                    Sua entrega chegará no dia{' '}
                    <Typography style={{ textDecorationLine: 'underline' }}>
                      04 de Abril de 2021
                    </Typography>
                    .
                  </Typography>
                </Box>
                <Typography variant="tituloSessao">
                  Para maiores informações, consulte os detalhes do status da
                  entrega no botão abaixo.
                </Typography>
              </Box>
              <Divider variant="fullWidth" />

              <Box my="xxs">
                <Typography variant="precoPromocional2">
                  Esses produtos logo serão seus:
                </Typography>
              </Box>
              <ProductDescription
                title="Camiseta Básica Reserva"
                description={{
                  color: 'Branca',
                  size: 'M',
                }}
              />
              <ProductDescription
                title="Camiseta Básica Reserva"
                description={{
                  color: 'Branca',
                  size: 'M',
                }}
              />
            </>
          )}
        </Box>
        {paymentType !== 'PIX' && (
          <Button variant="primarioEstreito" title="RASTREAR ENTREGA" inline />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

interface IProductDescription {
  title: string;
  description: {
    size: string;
    color: string;
  };
}
const ProductDescription = ({ title, description }: IProductDescription) => {
  return (
    <Box my="micro" flexDirection="row">
      <Image variant="sm" source={images.shirt1} />
      <Box ml="micro">
        <Typography variant="precoPromocional2">{title}</Typography>
        <Box flexDirection="row">
          <Typography variant="descricaoCampoDePreenchimento">
            Tam: {description.size}
          </Typography>
          <Box ml="xxs">
            <Typography variant="descricaoCampoDePreenchimento">
              Cor: {description.color}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const BarCodeArea = () => {
  return (
    <Box>
      <Box my="xxs">
        <Typography variant="precoPromocional2">
          Agora é só pagar seu boleto.
        </Typography>

        <Typography variant="tituloSessao">
          Você pode copiar o código abaixo:
        </Typography>
      </Box>
      <Button
        justifyContent="center"
        alignItems="center"
        variant="primarioEstreitoOutline"
      >
        <Box>
          <Typography textAlign="center">
            00000.00000000.00000000000.0000000.0000000.0000000
          </Typography>
        </Box>
      </Button>

      <Button
        bg="verdeSucesso"
        width="100%"
        height={50}
        title="COPIAR CÓDIGO DE BARRAS"
        color="white"
        fontFamily="nunitoRegular"
        fontSize={13}
      />

      <Box my="xxxs">
        <Typography variant="tituloSessao">ou imprimir boleto</Typography>
      </Box>
      <Button
        bg="verdeSucesso"
        width="100%"
        height={50}
        title="COPIAR CÓDIGO DE BARRAS"
        color="white"
        fontFamily="nunitoRegular"
        fontSize={13}
      />
      <Box my="xxxs">
        <Typography variant="tituloSessao">
          Após a confirmação do pagamento, você poderá acompanhar o rastreamento
          da sua entrega pelo app ou pelo site.
        </Typography>
      </Box>
      <Divider variant="fullWidth" />
    </Box>
  );
};

const PixArea = () => {
  return (
    <Box>
      <Box my="xxs">
        <Box mb="micro">
          <Typography variant="precoPromocional2">PIX</Typography>
        </Box>

        <Typography variant="tituloSessao">
          Realize o pagamento e o seu pedido será liberado em nosso aplicativo.
        </Typography>
      </Box>
      <Information
        number={'1'}
        description={'Copie o código para pagamento:'}
      />
      <Button
        justifyContent="center"
        alignItems="center"
        variant="primarioEstreitoOutline"
        mt="xxxs"
      >
        <Box>
          <Typography textAlign="center">
            00000.00000000.00000000000.0000000.0000000.0000000
          </Typography>
        </Box>
      </Button>

      <Button
        bg="verdeSucesso"
        width="100%"
        height={50}
        title="COPIAR CÓDIGO PIX"
        color="white"
        fontFamily="nunitoRegular"
        fontSize={13}
      />

      <Box alignItems="center" my="micro">
        <Box>
          <Typography
            fontFamily="nunitoItalic"
            fontSize={13}
            color="neutroFrio2"
          >
            Esté código estará válido por{' '}
            <Typography fontFamily="nunitoBold" fontSize={13}>
              30 minutos
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Divider variant="fullWidth" />
      <Box mb="xxxs" />
      <Information
        number={'2'}
        description={
          'Copie o código e faça o pagamento no aplicativo da sua instituição financeira.'
        }
        divider
      />
      <Information
        number={'3'}
        description={
          'Quando realizado, o seu pedido será liberado em nosso aplicativo.'
        }
      />
    </Box>
  );
};

interface IInformation {
  number?: string;
  description?: string;
  divider?: boolean;
}

const Information = ({ number, description, divider }: IInformation) => {
  return (
    <>
      <Box flexDirection={'row'}>
        <Box
          height={40}
          width={40}
          bg={'neutroFrio2'}
          borderRadius={'infinity'}
          marginRight={'xxxs'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Typography
            fontFamily={'reservaSerifRegular'}
            fontSize={20}
            color={'white'}
          >
            {number}
          </Typography>
        </Box>
        <Box flex={1}>
          <Typography variant={'tituloSessao'}>{description}</Typography>
        </Box>
      </Box>
      {divider && <Divider marginY={'xxxs'} variant={'fullWidth'} />}
    </>
  );
};
