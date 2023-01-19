import { Box, Toggle, Typography } from '@usereservaapp/reserva-ui';
import { TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import handleCopyTextToClipboard from '../../../../utils/CopyToClipboard';
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
  const [onboardingView, setOnboardingView] = useState<boolean>(false);

  const { getItem, setItem } = useAsyncStorageProvider();

  const { orderForm } = useCart();

  const handleChangeTesting = useCallback(async (currentValue: boolean) => {
    handleToggleModalTesting();
    await setItem('isTesting', currentValue);
    setIsTesting(currentValue);
  }, []);

  const handleViewOnboarding = useCallback(async (currentValue: boolean) => {
    await setItem('isAppFirstLaunched', currentValue);
    setOnboardingView(currentValue);
  }, []);

  const getTokenOneSignal = useCallback(async () => {
    const responseToken = await EventProvider.OneSignal.getDeviceState();
    setOneSignalToken(responseToken?.userId || '');
  }, []);

  const handleInitStateToggles = useCallback(async () => {
    const isTesterUser = await getItem('isTesting') || false;
    setIsTesting(isTesterUser);

    const onboarding = await getItem('isAppFirstLaunched') || false;
    setOnboardingView(onboarding);
  }, []);

  useEffect(() => {
    (async () => {
      await getTokenOneSignal();
      await handleInitStateToggles();
    })();
  }, []);

  return (
    <Box mb="sm" mt="sm">
      <Box mb="nano" mt="nano">
        <TouchableOpacity testID="testerAreaView_button_copy_onesignal_token" onPress={() => handleCopyTextToClipboard(oneSignalToken)}>
          <Typography testID="testerAreaView_onesignal_token">{oneSignalToken}</Typography>
        </TouchableOpacity>
      </Box>
      <Box mb="nano" mt="nano">
        <TouchableOpacity testID="testerAreaView_button_copy_orderform_id" onPress={() => handleCopyTextToClipboard(orderForm?.orderFormId || '')}>
          <Typography testID="testerAreaView_orderform_id">{orderForm?.orderFormId || ''}</Typography>
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
            testID="testerAreaView_button_toogle_tester_user"
            onValueChange={handleChangeTesting}
            thumbColor="vermelhoAlerta"
            color="preto"
            value={isTesting}
          />
        </Box>
      </Box>
      <Box flexDirection="row" marginY="micro" alignItems="center">
        <Box flex={1}>
          <Typography variant="subtituloSessoes">
            Ativar Onboarding
          </Typography>
        </Box>
        <Box marginLeft="xxxs">
          <Toggle
            testID="testerAreaView_button_toogle_onboarding_view"
            onValueChange={handleViewOnboarding}
            thumbColor="vermelhoAlerta"
            color="preto"
            value={onboardingView}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TesterAreaViewComponent;
