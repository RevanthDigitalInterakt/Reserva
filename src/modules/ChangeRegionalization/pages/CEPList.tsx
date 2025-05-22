import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box } from '../../../components/Box/Box';
import { Button } from '../../../components/Button';
import { Typography } from '../../../components/Typography/Typography';
import { instance } from '../../../config/vtexConfig';
import { useRegionalSearch } from '../../../context/RegionalSearchContext';
import { TopBarBackButtonWithoutLogo } from '../../Menu/components/TopBarBackButtonWithoutLogo';

export interface CepsInfo {
  cep: string,
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
}[];

export type SearchBy = 'cep' | 'address';

export function CEPList({ ...props }) {
  const {
    route: {
      params: {
        list,
        searchTerm,
        isCepAddress,
        isCepProductDetail,
      },
    },
  } = props;

  const navigation = useNavigation();
  const { setSegmentToken, setRegionId, setCep } = useRegionalSearch();

  const [ceps, setCeps] = React.useState<CepsInfo[]>([]);

  const selectCep = async (cep: string) => {
    if (isCepAddress) {
      navigation.navigate('NewAddress', {
        hasCep: cep,
      });
    } else if (isCepProductDetail) {
      navigation.navigate('ProductDetail', {
        hasCep: cep,
      });
    } else {
      const { data } = await instance.post('/sessions', {
        public: {
          country: {
            value: 'BRA',
          },
          postalCode: {
            value: cep,
          },
        },
      });
      const { data: response } = await instance.get(`/segments/${data.segmentToken}`);

      setRegionId(response.regionId);
      setSegmentToken(data.segmentToken);
      navigation.navigate('Home');
    }
  };

  useEffect(() => {
    setCeps(list);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <TopBarBackButtonWithoutLogo
        loading={false}
        backButtonPress={() => {
          navigation.goBack();
        }}
      />
      <Box
        paddingX={22}
        paddingTop={26}
        bg="white"
      >
        <Typography
          fontFamily="reservaSerifBold"
          fontSize={26}
        >
          Resultados encontrados para
        </Typography>
        <Typography
          fontFamily="reservaSansRegular"
          fontSize={21}
        >
          {searchTerm}
        </Typography>
      </Box>
      <FlatList
        style={{
          marginTop: 30,
          backgroundColor: 'white',
        }}
        data={ceps}
        contentContainerStyle={{
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => selectCep(item.cep)}
            containerStyle={{
              width: '100%',
            }}
          >
            <Box
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 23,
                marginHorizontal: 22,
                marginTop: 3,
                paddingTop: 20,
                paddingBottom: 14,
                marginBottom: 22,
                borderRadius: 8,
                backgroundColor: '#FFF',
                shadowColor: '#000',
                shadowOffset: {
                  width: 2,
                  height: 6,
                },
                shadowOpacity: 0.39,
                shadowRadius: 8.30,
                elevation: 6,
              }}
            >
              <Box flex={1}>
                <Typography
                  fontFamily="reservaSansMedium"
                  fontSize={19}
                >
                  {item.cep}
                </Typography>
                <Typography
                  fontFamily="reservaSansBold"
                  fontSize={18}
                >
                  {item.logradouro}
                </Typography>
                <Typography
                  fontFamily="reservaSansRegular"
                  fontSize={18}
                >
                  {item.bairro}
                  ,
                  {item.localidade}
                  /
                  {item.uf}
                </Typography>
              </Box>
              <Typography
                fontFamily="reservaSansRegular"
                fontSize={18}
                style={{
                  textDecorationLine: 'underline',
                }}
              >
                Usar CEP
              </Typography>
            </Box>
          </TouchableOpacity>
        )}
        ListFooterComponent={() => (
          <Button
            onPress={() => {
              navigation.navigate('ChangeRegionalization');
            }}
          >
            <Typography
              fontFamily="reservaSansRegular"
              fontSize={18}
              style={{
                textDecorationLine: 'underline',
                marginBottom: 230,
              }}
            >
              Buscar outro CEP
            </Typography>
          </Button>
        )}
      />
    </SafeAreaView>
  );
}
