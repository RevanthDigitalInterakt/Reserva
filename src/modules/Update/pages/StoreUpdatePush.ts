
import { Linking, Platform } from 'react-native'
const StoreUpdatePush = () => {
    Linking.openURL(
        Platform.OS === 'ios' ?
            'itms-apps://itunes.apple.com/app/apple-store/id1566861458'
            :
            'market://details?id=com.usereserva')

}
export { StoreUpdatePush };