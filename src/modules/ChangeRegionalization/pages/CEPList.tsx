import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo"
import React, { useEffect } from "react"
import { View } from "react-native"
import { Box, Button, Typography } from "reserva-ui"
import { FlatList, ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { instance } from "../../../config/vtexConfig"
import { useRegionalSearch } from "../../../context/RegionalSearchContext"

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

export const CEPList = ({ ...props }) => {

  const {
    route: {
      params: {
        list
      }
    }
  } = props

  const navigation = useNavigation()
  const { setSegmentToken, setRegionId } = useRegionalSearch()

  const [ceps, setCeps] = React.useState<CepsInfo[]>([])

  const selectCep = async (cep: string) => {
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
    console.log('response.regionId', response.regionId)
    setRegionId(response.regionId.split('.')[1])
    setSegmentToken(data.segmentToken)
    navigation.navigate('Home')
  }

  useEffect(() => {
    setCeps(list)
  }, [])

  return (
    <SafeAreaView>
      <TopBarBackButtonWithoutLogo
        loading={false}
        backButtonPress={() => {
          navigation.goBack()
        }}
      />
      <ScrollView
        style={{
          backgroundColor: "white",
        }}
      >
        <Box
          paddingX={22}
          paddingTop={26}
        >
          <Typography
            fontFamily="reservaSerifBold"
            fontSize={26}
          >
            Resultados encontrados para
          </Typography>
          <Typography
            fontFamily="reservaSansReglar"
            fontSize={21}
          >
            Rua da Luz, Braga - Cabo Frio
          </Typography>
        </Box>
        <FlatList
          style={{
            marginTop: 30,
          }}
          data={ceps}
          contentContainerStyle={{
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => selectCep(item.cep)}
              containerStyle={{
                width: "100%",
                paddingHorizontal: 22,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 23,
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
                <View>
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
                </View>
                <Typography
                  fontFamily="reservaSansRegular"
                  fontSize={18}
                  style={{
                    textDecorationLine: "underline",
                  }}
                >
                  Usar CEP
                </Typography>
              </View>
            </TouchableOpacity>
          )}
        />
        <Button
          onPress={() => {
            navigation.goBack()
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
      </ScrollView>
    </SafeAreaView>
  )
}