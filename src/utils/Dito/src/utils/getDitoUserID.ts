import AsyncStorage from '@react-native-community/async-storage';
import { getAsyncStorageItem } from '../../../../hooks/useAsyncStorageProvider';

export function getDitoUserID(email?: string) {
  return email ? getAsyncStorageItem('@Dito:userRef') : AsyncStorage.getItem('@Dito:anonymousID');
}
