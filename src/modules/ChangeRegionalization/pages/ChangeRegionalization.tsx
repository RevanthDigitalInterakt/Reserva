import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Formik } from "formik"
import React, { useCallback, useEffect, useRef, useState } from "react"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { SafeAreaView } from "react-native-safe-area-context"
import { Box, Button, Icon, Picker, TextField, Typography } from "@danilomsou/reserva-ui"
import { FormikTextInput } from "../../../shared/components/FormikTextInput"
import * as Yup from "yup"
import { TopBarBackButtonWithoutLogo } from "../../Menu/components/TopBarBackButtonWithoutLogo"
import Sentry from '../../../config/sentryConfig';

export interface ChangeRegionalizationProps {

}

export const ChangeRegionalization = ({ ...props }) => {
  const {
    route: {
      params: {
        isCepAddress
      }
    }
  } = props
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

  const cepBlackList = [
    "00000000",
    "11111111",
    "22222222",
    "33333333",
    "44444444",
    "55555555",
    "66666666",
    "77777777",
    "88888888",
    "99999999",
  ]

  const [formState, setFormState] = useState({
    cep: "",
  })

  const formRef = useRef<any>(null)


  const validation = Yup.object().shape({
    cep: Yup.string().matches(/[0-9]{5}-[\d]{3}/g, { message: 'Insira um Cep valido' }).required("CEP é obrigatório").test(
      'black-list',
      'Insira um Cep valido',
      val => {
        if (val) {
          const parsedCep = val.replace(/(-)|(\.)/g, "")
          return !cepBlackList.includes(parsedCep)
        }
        return true
      }),
  })

  const handleSubmit = () => {
    formRef.current.submitForm()
  }

  useFocusEffect(
    useCallback(() => {
      formRef.current.resetForm();
    }, [formRef])
  );

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

  const fetchCepInfo = async (cep: string) => {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    return await response.json()
  }

  const fetchAddressInfo = async () => {
    const response = await fetch(`https://viacep.com.br/ws/${address?.uf}/${address?.city?.replace(/\s/g, '%20')}/${address?.street?.replace(/\s/g, '%20')}/json/`)
    return await response.json()
  }

  useEffect(() => {
    Sentry.configureScope((scope) => scope.setTransactionName('ChangeRegionalization'));
  }, []);

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
  }, [address?.uf])

  // return <CEPList />
  return <SafeAreaView style={{ flex: 1 }}>
    <TopBarBackButtonWithoutLogo
      loading={false}
      backButtonPress={() => {
        navigate.goBack()

      }}
    />
    <ScrollView >
      <Box flex={1}>
        <Formik
          innerRef={formRef}
          initialValues={formState}
          validationSchema={validation}
          validateOnBlur={true}
          validateOnChange={true}
          onSubmit={
            async (values) => {
              const data = await fetchCepInfo(values.cep)
              navigate.navigate('CEPList', { list: [data], searchTerm: cepInputText, isCepAddress: isCepAddress ? isCepAddress : false })
            }
          }
        >
          {({ values }) => (
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
              <FormikTextInput
                field="cep"
                maskType="zip-code"
                placeholder="Digite seu CEP"
                keyboardType="number-pad"
                maskOptions={{
                  mask: '99999-999',
                }}
              />

              <Button
                disabled={values.cep.length < 9}
                marginTop={40}
                width='100%'
                title="PESQUISAR"
                onPress={() => {
                  handleSubmit()
                }}
                variant='primarioEstreito'
              />
            </Box>
          )}
        </Formik>
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
                padding={2}
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
                padding={7}
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
                  padding={2}
                  flexGrow={1}
                  flex={1}
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
                  padding={7}
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
            marginBottom={40}
            width='100%'
            title="BUSCAR"
            disabled={address?.street && address?.city && address?.uf ? false : true}
            onPress={() => {
              fetchAddressInfo().then(data => {
                console.log('data123', data)
                navigate.navigate('CEPList', { list: data, searchTerm: `${address?.street}, ${address?.city} - ${address?.uf}`, isCepAddress: isCepAddress ? isCepAddress : false })
              })
            }}
            variant='primarioEstreito'
          />
          <Picker
            swipeDirection={false}
            isVisible={isVisibleStatePicker}
            onBackDropPress={() => setIsVisibleStatePicker(false)}
            onAndroidBackButtonPress={() => { }}
            onClose={() => setIsVisibleStatePicker(false)}
            onSelect={(selected) => {
              setAddress({
                uf: selected.text,
              })
              console.log('selected', selected)
            }}
            title="Selecione o estado"
            items={states}
          />
          <Picker
            swipeDirection={false}
            isVisible={isVisibleCityPicker}
            onBackDropPress={() => setIsVisibleCityPicker(false)}
            onAndroidBackButtonPress={() => { }}
            onClose={() => setIsVisibleCityPicker(false)}
            onSelect={(selected) => {
              setAddress({
                ...address,
                city: selected.text,
              })

            }}
            title="Selecione a cidade"
            items={cities}
          />
        </Box>
      </Box>
    </ScrollView>
  </SafeAreaView>
}