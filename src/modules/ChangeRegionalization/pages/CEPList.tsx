import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo"
import React, { useEffect } from "react"
import { View } from "react-native"
import { Box, Button, Typography } from "@danilomsou/reserva-ui"
import { FlatList, TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { instance } from "../../../config/vtexConfig"
import { useRegionalSearch } from "../../../context/RegionalSearchContext"
import AsyncStorage from "@react-native-community/async-storage"
import Sentry from '../../../config/sentryConfig';

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
}[]

export type SearchBy = 'cep' | 'address'

export const CEPList = ({ ...props }) => {

  const {
    route: {
      params: {
        list,
        searchTerm,
        isCepAddress
      }
    }
  } = props

  const navigation = useNavigation()
  const { setSegmentToken, setRegionId, setCep } = useRegionalSearch()

  const [ceps, setCeps] = React.useState<CepsInfo[]>([])

  const selectCep = async (cep: string) => {
    if (isCepAddress) {
      navigation.navigate('NewAddress', {
        hasCep: cep
      })
    } else {
      const { data } = await instance.post('/sessions', {
        public: {
          country: {
            value: "BRA"
          },
          postalCode: {
            value: cep
          }
        }
      })
      const { data: response } = await instance.get(`/segments/${data.segmentToken}`);
      const value = await AsyncStorage.setItem('RegionalSearch:cep', cep)//.then(value => console.log('valeu2222a', value))
      console.log('value2222a', cep)
      console.log('response.regionId', response.regionId)
      setRegionId(response.regionId)
      setSegmentToken(data.segmentToken)
      // setCep(cep)
      navigation.navigate('Home')
    }
  }

  useEffect(() => {
    Sentry.configureScope((scope) => scope.setTransactionName('CEPList'));
  }, []);

  useEffect(() => {
    setCeps(list)
  }, [])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF'
      }}
    >
      <TopBarBackButtonWithoutLogo
        loading={false}
        backButtonPress={() => {
          navigation.goBack()
        }}
      />
      <Box
        paddingX={22}
        paddingTop={26}
        bg='white'
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
          backgroundColor: "white",
        }}
        data={ceps}
        contentContainerStyle={{
        }}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => {
          return (
            < TouchableOpacity
              onPress={() => selectCep(item.cep)}
              containerStyle={{
                width: "100%",
              }}
            >
              <Box
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 23,
                  marginHorizontal: 22,
                  marginTop: 3,
                  paddingTop: 20,
                  paddingBottom: 14,
                  marginBottom: 22,
                  borderRadius: 8,
                  backgroundColor: "#FFF",
                  shadowColor: "#000",
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
                    {item.bairro}, {item.localidade}/{item.uf}
                  </Typography>
                </Box>
                <Typography
                  fontFamily="reservaSansRegular"
                  fontSize={18}
                  style={{
                    textDecorationLine: "underline",
                  }}
                >
                  Usar CEP
                </Typography>
              </Box>
            </TouchableOpacity>
          )
        }}
        ListFooterComponent={() => (
          <Button
            onPress={() => {
              navigation.navigate('ChangeRegionalization')
            }}
          >
            <Typography
              fontFamily="reservaSansRegular"
              fontSize={18}
              style={{
                textDecorationLine: "underline",
                marginBottom: 230
              }}
            >
              Buscar outro CEP
            </Typography>
          </Button>
        )}
      />
    </SafeAreaView>
  )
}