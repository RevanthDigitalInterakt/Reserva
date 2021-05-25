// In App.js in a new project
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import AddressList from '../modules/Address/pages/AddressList'
import NewAddress from '../modules/Address/pages/NewAddress'
import { BagScreen } from '../modules/Checkout/pages/Bag'
import { BarCodePayment } from '../modules/Checkout/pages/BarCodePayment'
import { DeliveryScreen } from '../modules/Checkout/pages/Delivery'
import { GiftVoucherScreen } from '../modules/Checkout/pages/GiftVoucher'
import { MapScreen } from '../modules/Checkout/pages/Map'
import { NearbyStores } from '../modules/Checkout/pages/NearbyStores'
import { PaymentMethodScreen } from '../modules/Checkout/pages/PaymentMethod'
import { PixScreen } from '../modules/Checkout/pages/Pix'
import { PurchaseConfirmationScreen } from '../modules/Checkout/pages/PurchaseConfirmation'
import { SummaryScreen } from '../modules/Checkout/pages/Summary'
import { VirtualDebitCardCaixaScreen } from '../modules/Checkout/pages/VirtualDebitCardCaixa'
import { WithdrawInStore } from '../modules/Checkout/pages/WithdrawInStore'
import { ExampleScreen } from '../modules/Example/pages/Example'
import { ForgotEmail } from '../modules/Forgot/pages/ForgotEmail'
import { ForgotEmailSuccess } from '../modules/Forgot/pages/ForgotEmailSuccess'
import { ForgotNewPassword } from '../modules/Forgot/pages/ForgotNewPassword'
import { ForgotPassword } from '../modules/Forgot/pages/ForgotPassword'
//--
import { HelpCenter } from '../modules/HelpCenter/pages/HelpCenter'
import { ClothingCare } from '../modules/HelpCenter/PagesHelp/ClothingCare'
import { ContactUs } from '../modules/HelpCenter/PagesHelp/ContactUs'
import { Exchanges } from '../modules/HelpCenter/PagesHelp/Exchanges'
import { SizeGuide } from '../modules/HelpCenter/PagesHelp/SizeGuide'
import { WhatsappsHelp } from '../modules/HelpCenter/PagesHelp/WhatsappsHelp'
import { LoginScreen } from '../modules/Login/pages/Login'
import { LoginAlternative } from '../modules/Login/pages/LoginAlternative'
import { Menu } from '../modules/Menu/modals/Menu'
import OrderCancel from '../modules/Order/pages/OrderCancel'
import OrderDetail from '../modules/Order/pages/OrderDetail'
import OrderList from '../modules/Order/pages/OrderList'
import { ProductCatalog } from '../modules/ProductCatalog/pages/ProductCatalog'
import { ProductDetail } from '../modules/ProductDetail/pages/ProductDetail'
import { EditPassword } from '../modules/Profile/pages/EditPassword'
//profile
import { EditProfile } from '../modules/Profile/pages/EditProfile'
import { ListCards } from '../modules/Profile/pages/ListCards'
import { NewCard } from '../modules/Profile/pages/NewCard'
import { NotificationProfile } from '../modules/Profile/pages/NotificationProfile'
import { Register } from '../modules/Register/pages/Register'
import { RegisterSuccess } from '../modules/Register/pages/RegisterSuccess'
import { SearchScreen } from '../modules/Search/pages/Search'
import { ShowListByCategory } from '../modules/WishList/pages/ShowListByCategory'
import { WishList } from '../modules/WishList/pages/WishList'
import { WishListCategory } from '../modules/WishList/pages/WishListCategory'
import { Tabs } from './BottomTabNavigator'
import { horizontalAnimationBackwards } from './utils/utils'

export type RootStackParamList = {
  Register: {
    reset: Boolean
    comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite'
  }
  RegisterSuccess: { comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' }
  LoginAlternative: { comeFrom: 'Profile' | 'Menu' | 'Checkout' | 'Favorite' }
  ProductCatalog: { safeArea: boolean; search: boolean; categoryId?: string }
  ProductDetail: { productId: string }
  NewAddress: { id?: number; isCheckout: boolean; edit?: boolean }
  AddressList: { isCheckout: boolean }
  ListCards: { isCheckout: boolean }
  NewCard: { isCheckout: boolean }
  SummaryScreen: {
    paymentType: 'PIX' | 'Credit' | 'Debit' | 'Boleto' | 'GiftCard'
  }
  PurchaseConfirmationScreen: {
    paymentType: 'PIX' | 'Credit' | 'Debit' | 'Boleto' | 'GiftCard'
  }
}

const MainStack = createStackNavigator()
const RootStack = createStackNavigator()

const MainStackScreen = () => {
  // Here you put normal navigation
  return (
    <MainStack.Navigator
      detachInactiveScreens
      screenOptions={{ headerShown: false }}>
      <MainStack.Screen name='HomeTabs' component={Tabs} />
      <MainStack.Screen name='Example' component={ExampleScreen} />
      <MainStack.Screen name='SearchMenu' component={SearchScreen} />
      <MainStack.Screen
        name='AddressList'
        component={AddressList}
        initialParams={{ isCheckout: false }}
      />
      <MainStack.Screen
        name='NewAddress'
        component={NewAddress}
        initialParams={{
          isCheckout: false,
        }}
      />
      <MainStack.Screen name='WishList' component={WishList} />
      <MainStack.Screen name='WishListCategory' component={WishListCategory} />
      <MainStack.Screen
        name='ShowListByCategory'
        component={ShowListByCategory}
      />

      <MainStack.Screen name='BagScreen' component={BagScreen} />
      <MainStack.Screen
        name='SummaryScreen'
        component={SummaryScreen}
        initialParams={{
          paymentType: 'CreditCard',
        }}
      />
      <MainStack.Screen name='DeliveryScreen' component={DeliveryScreen} />
      <MainStack.Screen name='WithdrawInStore' component={WithdrawInStore} />
      <MainStack.Screen name='NearbyStores' component={NearbyStores} />
      <MainStack.Screen name='MapScreen' component={MapScreen} />
      <MainStack.Screen
        name='PaymentMethodScreen'
        component={PaymentMethodScreen}
      />
      <MainStack.Screen
        name='PurchaseConfirmationScreen'
        component={PurchaseConfirmationScreen}
      />
      <MainStack.Screen
        name='VirtualDebitCardCaixaScreen'
        component={VirtualDebitCardCaixaScreen}
      />
      <MainStack.Screen name='PixScreen' component={PixScreen} />
      <MainStack.Screen
        name='GiftVoucherScreen'
        component={GiftVoucherScreen}
      />
      <MainStack.Screen name='BarCodePayment' component={BarCodePayment} />
      <MainStack.Screen name='Login' component={LoginScreen} />
      <MainStack.Screen
        name='Register'
        component={Register}
        initialParams={{ reset: false }}
      />
      <MainStack.Screen
        name='RegisterSuccess'
        component={RegisterSuccess}
        initialParams={{ comefrom: 'Profile' }}
      />
      <MainStack.Screen name='ForgotEmail' component={ForgotEmail} />
      <MainStack.Screen
        name='ForgotEmailSuccess'
        component={ForgotEmailSuccess}
      />
      <MainStack.Screen name='ForgotPassword' component={ForgotPassword} />
      <MainStack.Screen
        name='ForgotNewPassword'
        component={ForgotNewPassword}
      />
      <MainStack.Screen
        name='ProductCatalog'
        initialParams={{ safeArea: true, search: false }}
        component={ProductCatalog}
      />

      <MainStack.Screen name='ProductDetail' component={ProductDetail} />
      <MainStack.Screen name='OrderList' component={OrderList} />
      <MainStack.Screen name='OrderDetail' component={OrderDetail} />
      <MainStack.Screen name='OrderCancel' component={OrderCancel} />

      <MainStack.Screen name='HelpCenter' component={HelpCenter} />
      <MainStack.Screen name='SizeGuide' component={SizeGuide} />
      <MainStack.Screen name='ClothingCare' component={ClothingCare} />
      <MainStack.Screen name='ContactUs' component={ContactUs} />
      <MainStack.Screen name='Exchanges' component={Exchanges} />
      <MainStack.Screen name='WhatsappsHelp' component={WhatsappsHelp} />

      <MainStack.Screen name='EditProfile' component={EditProfile} />
      <MainStack.Screen name='EditPassword' component={EditPassword} />
      <MainStack.Screen
        name='NotificationProfile'
        component={NotificationProfile}
      />

      <MainStack.Screen
        name='ListCards'
        component={ListCards}
        initialParams={{ isCheckout: false }}
      />
      <MainStack.Screen
        name='NewCard'
        component={NewCard}
        initialParams={{ isCheckout: false }}
      />
    </MainStack.Navigator>
  )
}

const AppRouting = () => {
  return (
    <RootStack.Navigator
      mode='modal'
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}>
      <RootStack.Screen
        name='Main'
        component={MainStackScreen}
        options={{ headerShown: false }}
      />
      {/* After that you put modal Screens */}
      <RootStack.Screen
        name='Menu'
        options={horizontalAnimationBackwards}
        component={Menu}
      />
      <RootStack.Screen name='Login' component={LoginScreen} />
      <RootStack.Screen
        name='LoginAlternative'
        component={LoginAlternative}
        initialParams={{ comeFrom: 'Profile' }}
      />
    </RootStack.Navigator>
  )
}

export default AppRouting
