import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import {
  Typography, Box, Button, Icon, Divider,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import testProps from '../../../utils/testProps';

type Props = StackScreenProps<RootStackParamList, 'BarCodePayment'>;

const Information = ({
  description,
  showDivider,
  iconName,
}: {
  description: string;
  showDivider?: boolean;
  iconName: string;
}) => (
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

export const BarCodePayment = ({ route }: Props) => {
  const { cashback } = route?.params;
  const navigation = useNavigation();

  return (
    <SafeAreaView flex={1} backgroundColor="white">
      <TopBarBackButton showShadow />
      <ScrollView {...testProps('com.usereserva:id/tickets_section')}>
        <Box paddingX="xxxs" paddingY="sm">
          <Box>
            <Typography variant="tituloSessoes">Boleto</Typography>
          </Box>
          <Information
            description="Imprima o boleto e pague no banco"
            showDivider
            iconName="Print"
          />
          <Information
            description={'Ou pague pela internet utilizando o \ncódigo de barras do boleto'}
            iconName="Barcode"
            showDivider
          />
          <Information
            description={'O prazo de validade do boleto \né de 2 dia úteis\'.'}
            iconName="Clock"
          />
        </Box>
      </ScrollView>
      <Button
        testID="com.usereserva:id/sumary_screen_button"
        onPress={() => navigation.navigate('SummaryScreen', { paymentType: 'Boleto', cashback })}
        title="RESUMO"
        variant="primarioEstreito"
        inline
      />
    </SafeAreaView>
  );
};
