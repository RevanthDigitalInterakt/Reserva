import { useCallback } from 'react';
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';

const useOpenLink = () => {
  const openLink = useCallback(async (url:string) => {
    const searchUrl = url === 'urlWhatsapp'
      ? 'https://api.whatsapp.com/send/?phone=552136092555&text&type=phone_number&app_absent=0'
      : 'https://usereserva.zendesk.com/hc/pt-br/requests/new';

    try {
      const supported = await Linking.canOpenURL(searchUrl);
      if (supported) {
        await Linking.openURL(searchUrl);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Não é possível abrir o link',
          text2: 'O formato do link não é suportado',
        });
      }
    } catch (error) {
      console.error('Error opening link: ', error);
      Toast.show({
        type: 'error',
        text1: 'Algo deu errado',
        text2: 'Tente novamente',
      });
    }
  }, []);

  return openLink;
};

export default useOpenLink;
