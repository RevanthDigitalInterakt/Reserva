import { TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { handleCopyTextToClipboard } from '../../../../utils/CopyToClipboard';
import useAsyncStorageProvider from '../../../../hooks/useAsyncStorageProvider';
import EventProvider from '../../../../utils/EventProvider';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { Toggle } from '../../../../components/Toggle/Toggle';
import { useBagStore } from '../../../../zustand/useBagStore/useBagStore';

interface ITesterAreaViewComponentProps {
  handleToggleModalTesting: () => void
}

function TesterAreaViewComponent({
  handleToggleModalTesting,
}: ITesterAreaViewComponentProps): JSX.Element {
  const [oneSignalToken, setOneSignalToken] = useState<string>('');
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const { getItem, setItem } = useAsyncStorageProvider();
  const { orderFormId } = useBagStore(['orderFormId']);

  const handleChangeTesting = useCallback(async (currentValue: boolean) => {
    handleToggleModalTesting();
    await setItem('isTesting', currentValue);
    setIsTesting(currentValue);
  }, []);

  const getTokenOneSignal = useCallback(async () => {
    const responseToken = await EventProvider.OneSignal.User.getOnesignalId();
    setOneSignalToken(responseToken || '');
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
        <TouchableOpacity testID="com.usereserva:id/testerAreaView_button_copy_orderform_id" onPress={() => handleCopyTextToClipboard(orderFormId || '')}>
          <Typography testID="com.usereserva:id/testerAreaView_orderform_id">{orderFormId || ''}</Typography>
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
