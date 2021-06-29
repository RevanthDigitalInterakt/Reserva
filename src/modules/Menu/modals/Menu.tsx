import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  Box,
  Button,
  Divider,
  Icon,
  SearchBar,
  theme,
  Typography,
} from 'reserva-ui'
import * as Animatable from 'react-native-animatable'
import {
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationState } from '../../../store'
import { categoriesQuery, CategoryQuery } from '../../../store/ducks/categories/types'
import { TopBarMenu } from '../components/TopBarMenu'

interface IBreadCrumbs {
  title: string
}

interface IMenuSubItem {
  title: string
  onPress?: Function
  highlight?: boolean
}
interface IMenuItem {
  title: string
  subItemList: CategoryQuery[]
  opened?: boolean
  onPress?: Function
  index?: number
  highlight?: boolean
}

const Breadcrumbs: React.FC<IBreadCrumbs> = ({ title }) => {
  const navigation = useNavigation()
  return (
    <Button onPress={() => navigation.navigate('Home')} alignSelf='flex-start'>
      <Box
        alignSelf='flex-start'
        paddingX='micro'
        paddingTop='nano'
        alignItems='center'
        flexDirection='row'>
        <Icon name='MenuArrowBack' color='preto' size={22} />
        <Box paddingX='micro'>
          <Typography fontSize={12} fontFamily='nunitoRegular'>
            Pagina Inicial
          </Typography>
        </Box>
      </Box>
    </Button>
  )
}

const MenuSubItem: React.FC<IMenuSubItem> = ({ title, onPress, highlight }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress()
      }}>
      <Box
        bg='backgroundMenuOpened'
        justifyContent='space-between'
        paddingY='micro'
        flexDirection='row'
        paddingX='xxs'>
        <Typography
          fontSize={13}
          fontFamily={highlight ? 'nunitoBold' : 'nunitoRegular'}>
          {title}
        </Typography>
      </Box>
    </TouchableOpacity>
  )
}

const MenuItem: React.FC<IMenuItem> = ({
  title,
  opened,
  onPress,
  index,
  subItemList,
  highlight,
}) => {
  //console.log(subItemList)
  const navigation = useNavigation()
  return (
    <Box>
      <TouchableOpacity onPress={() => onPress(index)}>
        <Box
          justifyContent='space-between'
          marginY='micro'
          flexDirection='row'
          marginX='xxxs'>
          <Typography
            color={highlight ? 'vermelhoAlerta' : 'preto'}
            fontSize={13}
            fontFamily='nunitoBold'>
            {title.toUpperCase()}
          </Typography>
          <Box>
            <Icon
              style={{ transform: [{ rotate: opened ? '90deg' : '0deg' }] }}
              name='ChevronRight'
              color='preto'
              size={16}
            />
          </Box>
        </Box>
      </TouchableOpacity>
      {opened && (
        <>
          <Divider variant='fullWidth' marginTop='micro' />
          <Animatable.View animation='fadeIn'>
            {subItemList.map((item, index) => {
              return (
                <MenuSubItem
                  key={index}
                  highlight={item.highlight}
                  title={item.name}
                  onPress={() => {
                    let route = item.href.split('/')
                    //console.log(route[route.length - 1])
                    //console.log('asdasd')
                    navigation.navigate('ProductCatalog', {
                      categoryId: route[route.length - 1],
                    })
                  }}
                />
              )
            })}
          </Animatable.View>
        </>
      )}
    </Box>
  )
}

export const FixedMenuItem: React.FC<{
  iconName: string
  title: JSX.Element
  onPress: Function
  underline: boolean
}> = ({ iconName, title, onPress, underline }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Box
        justifyContent='flex-start'
        alignItems='flex-end'
        marginY='micro'
        flexDirection='row'
        marginX='xxxs'>
        <Icon mb='quarck' name={iconName} color='preto' size={18} />
        <Box marginX='micro'>{title}</Box>
      </Box>
    </TouchableOpacity>
  )
}

export const Menu: React.FC<{}> = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [categories, setCategories] = useState<CategoryQuery[]>([])

  const { loading, error, data } = useQuery(categoriesQuery);

  useEffect(() => {
    setCategories(
      data?.categories.map((item: CategoryQuery) => ({
        ...item,
        children: item.children.flat(),
        opened: false,
        highlight: false,
      }))
    )
  }, [data])


  const { authentication } = useSelector((state: ApplicationState) => state)

  const openMenuItem = (index: number) => {
    setCategories(
      categories.map((item, i) => ({
        ...item,
        opened: index === i && !item.opened,
      }))
    )
  }

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.white, flex: 1 }}>
      <Box flex={1} backgroundColor='backgroundApp'>
        <TopBarMenu loading={loading} />
        <ScrollView>
          <Box paddingX='nano' paddingTop='micro'>
            <SearchBar
              height={36}
              placeholder='Buscar'
              onClickIcon={() => {
                navigation.navigate('SearchScreen')
              }}
            />
          </Box>
          <Breadcrumbs title='Página Inicial' />
          <Divider variant='fullWidth' marginBottom='nano' marginTop='nano' />
          {categories && (
            <Animatable.View animation='fadeIn'>
              {categories.map((item, index) => {
                return (
                  <MenuItem
                    key={index}
                    highlight={item.highlight}
                    subItemList={item.children}
                    onPress={openMenuItem}
                    opened={item.opened}
                    index={index}
                    title={item.name}
                  />
                )
              })}
              <Divider
                variant='fullWidth'
                marginBottom='nano'
                marginTop='nano'
              />
              {!authentication.data?.access_token && (
                <FixedMenuItem
                  iconName='Profile'
                  title={
                    <Typography
                      alignSelf='flex-end'
                      color='preto'
                      fontSize={15}
                      fontFamily='nunitoBold'>
                      <Typography style={{ textDecorationLine: 'underline' }}>
                        Acessar Conta
                      </Typography>
                      {'  '}ou{'  '}
                      <Typography style={{ textDecorationLine: 'underline' }}>
                        Cadastre-se
                      </Typography>
                    </Typography>
                  }
                  onPress={() => {
                    navigation.navigate('Login', { comefrom: 'Menu' })
                  }}
                  underline></FixedMenuItem>
              )}
              <FixedMenuItem
                iconName='Heart'
                title={
                  <Typography
                    alignSelf='flex-end'
                    color='preto'
                    fontSize={15}
                    fontFamily='nunitoBold'>
                    Favoritos
                  </Typography>
                }
                onPress={() => {
                  navigation.navigate('WishList')
                }}></FixedMenuItem>
              <FixedMenuItem
                iconName='Message'
                title={
                  <Typography
                    alignSelf='flex-end'
                    color='preto'
                    fontSize={15}
                    fontFamily='nunitoBold'>
                    Central de Ajuda
                  </Typography>
                }
                onPress={() => {
                  navigation.navigate('HelpCenter')
                }}></FixedMenuItem>
              <FixedMenuItem
                iconName='Pin'
                title={
                  <Typography
                    alignSelf='flex-end'
                    color='preto'
                    fontSize={15}
                    fontFamily='nunitoBold'>
                    Lojas
                  </Typography>
                }
                onPress={() => {
                  navigation.navigate('NearbyStores')
                }}></FixedMenuItem>
            </Animatable.View>
          )}
        </ScrollView>
      </Box>
    </SafeAreaView>
  )
}
