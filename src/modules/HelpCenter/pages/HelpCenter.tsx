import { useNavigation } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Box } from '../../../components/Box/Box';
import { SearchBar } from '../../../components/SearchBar/SearchBar';
import { Typography } from '../../../components/Typography/Typography';
import type { RootStackParamList } from '../../../routes/StackNavigator';
import testProps from '../../../utils/testProps';
import { TopBarBackButton } from '../../Menu/components/TopBarBackButton';
import ItemListHelp from '../Components/ItemListHelp';

type Props = StackScreenProps<RootStackParamList, 'HelpCenter'>;

export function HelpCenter({ route }: Props) {
  const navigation = useNavigation();

  const [, setSearch] = useState('');
  const data = [
    { title: 'Cuidados com a roupa', navigate: 'ClothingCare' },
    { title: 'PRIME', navigate: 'PrimeHelpInfo' },
    { title: 'Cashback', navigate: 'CashbackHelpInfo' },
    { title: 'Cadastro', navigate: 'SignupHelpInfo' },
    { title: 'Compra', navigate: 'PurchaseHelpInfo' },
    { title: 'Pagamento', navigate: 'PaymentHelpInfo' },
    { title: 'Troca e devolução', navigate: 'ExchangeHelpInfo' },
    { title: 'FAÇA VC', navigate: 'FacaVcHelpInfo' },
    { title: 'Pedido', navigate: 'RequestHelpInfo' },
    { title: 'Entrega', navigate: 'ShippingHelpInfo' },
    {
      title: 'Política de privacidade e Termos de Uso',
      navigate: 'PrivacyPolicy',
    },
    { title: 'Dúvidas Frequentes', navigate: 'FrequentDoubts' },
  ];

  const [filter, setFilter] = useState(data);

  useEffect(() => {}, []);

  const navigateGoBack = () => {
    navigation.goBack();
    if (route?.params?.comeFrom === 'Menu') {
      navigation.navigate('Menu');
    }
  };

  return (
    <SafeAreaView
      flex={1}
      style={{ justifyContent: 'space-between' }}
      backgroundColor="white"
      {...testProps('com.usereserva:id/help_center_container')}
    >
      <TopBarBackButton backButtonPress={() => navigateGoBack()} />

      <Box flex={1} alignContent="flex-start" pt="xs" paddingX="xxxs">
        <Box mb="nano" alignSelf="flex-start">
          <Typography variant="tituloSessoes">Central de ajuda</Typography>
        </Box>

        <Box mb="micro" mt="xxxs">
          <SearchBar
            testID="com.usereserva:id/help_center_input"
            height={36}
            placeholder="Buscar"
            onValueChange={(text) => {
              setSearch(text);
              const newFilter = data.filter((item) => {
                const regex = new RegExp(text, 'gi');
                return item.title.match(regex) != null;
              });

              setFilter(newFilter);
            }}
          />
        </Box>

        <ScrollView>
          <Box mb="micro" flex={1}>
            {filter.map((item, key) => (
              <ItemListHelp
                key={item.title}
                title={item.title}
                onPress={() => {
                  navigation.navigate(item.navigate);
                }}
              />
            ))}
          </Box>
        </ScrollView>
      </Box>
    </SafeAreaView>
  );
}
