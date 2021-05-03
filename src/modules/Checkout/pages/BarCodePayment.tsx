import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { Typography, Box, Button, Icon, Divider } from 'reserva-ui';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import { useNavigation } from '@react-navigation/native';

export const BarCodePayment = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView flex={1} backgroundColor={'white'}>
      <TopBarBackButton showShadow />
      <ScrollView>
        <Box paddingX={'xxxs'} paddingY={'sm'}>
          <Box>
            <Typography variant={'tituloSessoes'}>Boleto</Typography>
          </Box>
          <Information
            description={`Imprima o boleto e pague no banco`}
            showDivider
            iconName="Barcode"
          />
          <Information
            description={`Ou pague pela internet utilizando o \ncódigo de barras do boleto`}
            iconName="Barcode"
            showDivider
          />
          <Information
            description={`O prazo de validade do boleto \né de 1 dia útil.`}
            iconName="Barcode"
          />
        </Box>
      </ScrollView>
      <Button
        onPress={() =>
          navigation.navigate('SummaryScreen', { paymentType: 'Boleto' })
        }
        title="RESUMO"
        variant="primarioEstreito"
        inline
      />
    </SafeAreaView>
  );
};

const Information = ({
  description,
  showDivider,
  iconName,
}: {
  description: string;
  showDivider?: boolean;
  iconName: string;
}) => {
  return (
    <Box>
      <Box paddingBottom="xxs" flexDirection="row" py="xxs">
        <Box mr="micro" justifyContent="center">
          <Icon name={iconName} size={20} />
        </Box>
        <Typography fontFamily="nunitoRegular" fontSize={15}>
          {description}
        </Typography>
      </Box>
      {showDivider && <Divider variant="fullWidth" />}
    </Box>
  );
};
