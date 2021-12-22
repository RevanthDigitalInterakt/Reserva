
import { Linking, Platform } from 'react-native'
const StoreUpdatePush = () => {
    Linking.openURL(
        Platform.OS === 'ios' ?
            'itms-apps://itunes.apple.com/us/app/apple-store/com.globalsys.reserva?mt=8'
            :
            'market://details?id=com.usereserva')

}
export { StoreUpdatePush };