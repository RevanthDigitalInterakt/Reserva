import { TopBarDefaultBackButton } from "../../Menu/components/TopBarDefaultBackButton"
import React, { useEffect, useState } from "react"
import { View } from "react-native-animatable"
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Typography, TextField, OutlineInput, Box, Button, Picker, Icon } from "reserva-ui"
import UnderlineInput from "../../Login/components/UnderlineInput"
import { CEPList } from "./CEPList"
import { RootStackParamList } from "../../../routes/StackNavigator"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { borderWidth } from "styled-system"
import { SafeAreaView } from "react-native-safe-area-context"

export interface ChangeRegionalizationProps {

}

export const ChangeRegionalization = () => {

  const [cepInputText, setCepInputText] = useState("")
  const [streetInputText, setStreetInputText] = useState("")
  const [address, setAddress] = useState<{
    uf?: string,
    city?: string,
    street?: string,
  }>()
  const navigate = useNavigation()

  const [states, setStates] = useState<any[]>([])
  const [cities, setCities] = useState<any[]>([])
  const [isVisibleStatePicker, setIsVisibleStatePicker] = useState(false)
  const [isVisibleCityPicker, setIsVisibleCityPicker] = useState(false)



  const parseInput2Url = async (input: string) => {
    let url: string[] = input.split(/(,\s*)|(-\s*)|(\\\s*)/g)
    url = url.filter(item =>
      item != undefined && !item.match(/^((,\s*)|(-\s*)|(\\\s*))/g)
    )
    console.log('url00', url)
    url = url.map(param => param.replace(/\s/g, '%20'))
    let params = url.join('/')
    return params
  }

  const fetchCepInfo = async () => {
    const response = await fetch(`https://viacep.com.br/ws/${cepInputText}/json/`)
    return await response.json()
  }

  const fetchAddressInfo = async () => {
    const response = await fetch(`https://viacep.com.br/ws/${address?.uf}/${address?.city?.replace(/\s/g, '%20')}/${address?.street?.replace(/\s/g, '%20')}/json/`)
    return await response.json()
  }

  useEffect(() => {
    fetch('https://brasilapi.com.br/api/ibge/uf/v1')
      .then(async (response) => {
        const parsedStates: any[] = await response.json()
        setStates(parsedStates.sort((a, b) => a.nome.localeCompare(b.nome)).map(state => ({ text: state.sigla, subText: state.nome })))
      })
  }, [])

  useEffect(() => {
    fetch(`https://brasilapi.com.br/api/ibge/municipios/v1/${address?.uf}`)
      .then(async (response) => {
        const parsedCities: any[] = await response.json()
        console.log('parsedCities', parsedCities.sort((a, b) => a.nome.localeCompare(b.nome)).map(city => ({ text: city.nome, subText: '' })))
        setCities(parsedCities.sort((a, b) => a.nome.localeCompare(b.nome)).map(city => ({ text: city.nome })))
      })
  }, [address])

  // return <CEPList />
  return <SafeAreaView>
    <ScrollView contentContainerStyle={{ paddingBottom: 350 }} >
      <TopBarBackButtonWithoutLogo
        loading={false}
        backButtonPress={() => {
          navigate.goBack()

        }}
      />
      <Box
        paddingX={34}
        paddingTop={26}
        backgroundColor="white"
      >
        <Typography
          fontFamily="reservaSerifBold"
          fontSize={26}
        >Usar meu CEP</Typography>
        <Typography
          fontFamily="reservaSansLight"
          fontSize={18}
          style={{
            marginTop: 29,
            marginBottom: 12,
          }}
        >
          Digite seu CEP
        </Typography>
        <TextField
          value={cepInputText}
          onChangeText={setCepInputText}
          placeholder="Digite seu CEP"
        />

        <Button
          disabled={cepInputText.length < 8}
          marginTop={40}
          width='100%'
          title="PESQUISAR"
          onPress={() => {
            fetchCepInfo()
              .then(data => {
                navigate.navigate('CEPList', { list: [data] })
              })
          }}
          variant='primarioEstreito'
        />
      </Box>
      <Box
        paddingX={34}
        paddingTop={26}
        backgroundColor="white"
      >
        <Typography
          fontFamily="reservaSerifBold"
          fontSize={26}
        >
          Descobrir meu CEP
        </Typography>
        <Typography
          fontFamily="reservaSansLight"
          fontSize={18}
          style={{
            marginTop: 29,
            marginBottom: 12,
          }}
        >
          Selecione o estado e cidade
        </Typography>
        <Box
          flexDirection="row"
          flexGrow={1}
        >
          <TouchableOpacity
            onPress={() => setIsVisibleStatePicker(true)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 60,
              width: 99,
              borderWidth: 1,
              borderColor: '#000',
            }}
          >
            <Box
              height='100%'
              justifyContent='center'
              alignItems='center'
              pading={2}
              flexGrow={1}
            >
              <Typography
                fontFamily="reservaSansLight"
                fontSize={20}
                textAlign='center'
              >
                {!!address?.uf ? address.uf : 'UF'}
              </Typography>
            </Box>
            <Box
              height='100%'
              justifyContent='center'
              alignItems='center'
              pading={7}
            >
              <Box
                marginTop={11}
              >
                <Icon
                  name="ArrowDown"
                  size={22}
                  color="preto"
                />
              </Box>
            </Box>
          </TouchableOpacity>
          <Box
            flexGrow={1}
          >
            <TouchableOpacity
              disabled={!address?.uf && cities.length == 0}
              onPress={() => setIsVisibleCityPicker(true)}
              style={{
                flexDirection: 'row',
                height: 60,
                width: '100%',
                marginLeft: 9,
                borderWidth: 1,
                borderColor: '#000',
              }}
            >
              <Box
                height='100%'
                flexGrow={1}
                justifyContent='center'
                alignItems='center'
                pading={2}
                flexGrow={1}
              >
                <Typography
                  fontFamily="reservaSansLight"
                  fontSize={20}
                  textAlign='center'
                >
                  {!!address?.city ? address.city : 'Selecione a cidade...'}
                </Typography>
              </Box>
              <Box
                height='100%'
                justifyContent='center'
                alignItems='center'
                pading={7}
              >
                <Box
                  marginTop={11}
                >
                  <Icon
                    name="ArrowDown"
                    size={22}
                    color="preto"
                  />
                </Box>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
        <Typography
          fontFamily="reservaSansLight"
          fontSize={18}
          style={{
            marginTop: 29,
            marginBottom: 12,
          }}
        >
          Digite o nome da rua
        </Typography>
        <TextField
          value={address?.street}
          onChangeText={(text) => setAddress({ ...address, street: text })}
          placeholder="Rua da Luz"
        />
        <Typography
          fontFamily="reservaSansLight"
          fontSize={15}
          style={{
            marginTop: 14,
          }}
        >
          Não utilize número de casa, apartamento, lote, prédio
          ou abreviatura.
        </Typography>
        <Button
          marginTop={40}
          width='100%'
          title="BUSCAR"
          disabled={!address?.street && !address?.city && !address?.uf}
          onPress={() => {
            fetchAddressInfo().then(data => {
              console.log('data123', data)
              navigate.navigate('CEPList', { list: data })
            })
          }}
          variant='primarioEstreito'
        />
        <Picker
          isVisible={isVisibleStatePicker}
          onAndroidBackButtonPress={() => { }}
          onClose={() => setIsVisibleStatePicker(false)}
          onSelect={(selected) => {
            setAddress({
              uf: selected.text,
              ...address,
            })
            console.log('selected', selected)
          }}
          title="Selecione o estado"
          items={states}
        />
        <Picker
          isVisible={isVisibleCityPicker}
          onAndroidBackButtonPress={() => { }}
          onClose={() => setIsVisibleCityPicker(false)}
          onSelect={(selected) => {
            setAddress({
              city: selected.text,
              ...address,
            })
            console.log('selected', selected)
          }}
          title="Selecione a cidade"
          items={cities}
        />
      </Box>
    </ScrollView>
  </SafeAreaView>
}