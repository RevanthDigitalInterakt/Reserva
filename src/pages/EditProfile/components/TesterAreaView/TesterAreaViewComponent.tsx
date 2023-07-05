import {
  Box, Toggle, Typography,
} from '@usereservaapp/reserva-ui';
import { TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { handleCopyTextToClipboard } from '../../../../utils/CopyToClipboard';
import { useCart } from '../../../../context/CartContext';
import useAsyncStorageProvider from '../../../../hooks/useAsyncStorageProvider';
import EventProvider from '../../../../utils/EventProvider';

interface ITesterAreaViewComponentProps {
  handleToggleModalTesting: () => void
}

function TesterAreaViewComponent({
  handleToggleModalTesting,
}: ITesterAreaViewComponentProps): JSX.Element {
  const [oneSignalToken, setOneSignalToken] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const { getItem, setItem } = useAsyncStorageProvider();
  const { orderForm } = useCart();

  const handleChangeTesting = useCallback(async (currentValue: boolean) => {
    handleToggleModalTesting();
    await setItem('isTesting', currentValue);
    setIsTesting(currentValue);
  }, []);

  const getTokenOneSignal = useCallback(async () => {
    const responseToken = await EventProvider.OneSignal.getDeviceState();
    setOneSignalToken(responseToken?.userId || '');
  }, []);

  const handleInitStateToggles = useCallback(async () => {
    const isTesterUser = await getItem('isTesting') || false;
    setIsTesting(isTesterUser);
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await getTokenOneSignal();
        await handleInitStateToggles();
      })();
    }, []),
  );

  return (
    <Box mb="sm" mt="sm">
      <Box mb="nano" mt="nano">
        <TouchableOpacity testID="com.usereserva:id/testerAreaView_button_copy_onesignal_token" onPress={() => handleCopyTextToClipboard(oneSignalToken)}>
          <Typography testID="com.usereserva:id/testerAreaView_onesignal_token">{oneSignalToken}</Typography>
        </TouchableOpacity>
      </Box>
      <Box mb="nano" mt="nano">
        <TouchableOpacity testID="com.usereserva:id/testerAreaView_button_copy_orderform_id" onPress={() => handleCopyTextToClipboard(orderForm?.orderFormId || '')}>
          <Typography testID="com.usereserva:id/testerAreaView_orderform_id">{orderForm?.orderFormId || ''}</Typography>
        </TouchableOpacity>
      </Box>
      <Box flexDirection="row" marginY="micro" alignItems="center">
        <Box flex={1}>
          <Typography variant="subtituloSessoes">
            Ambiente de testes
          </Typography>
        </Box>
        <Box marginLeft="micro">
          <Toggle
            testID="com.usereserva:id/testerAreaView_button_toogle_tester_user"
            onValueChange={handleChangeTesting}
            thumbColor="vermelhoAlerta"
            color="preto"
            value={isTesting}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TesterAreaViewComponent;
