import { navigationRef } from './navigationRef';

const TAB_TO_RESET = 'Offers';

export const resetStackOnTabPress = ({ navigation, route }) => ({
  tabPress: () => {
    const routeName = route.name;

    if (routeName === TAB_TO_RESET) {
      navigationRef.current.navigate(routeName);
    }
  },

});
