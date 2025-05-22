import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';

import { useRemoveUserMutationMutation } from '../../../../base/graphql/generated';
import { Box } from '../../../../components/Box/Box';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Typography } from '../../../../components/Typography/Typography';
import ModalDeleteAccount from '../../../../modules/Profile/Components/ModalDeleteAccount';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';

interface IDeleteAccountProps {
  userId: string
}
function DeleteAccountComponent({ userId }: IDeleteAccountProps): JSX.Element {
  const [showModalDeleteAccount, setShowModalDeleteAccount] = useState<boolean>(false);
  const navigation = useNavigation();

  const [removeUserMutation] = useRemoveUserMutationMutation({
    context: { clientName: 'gateway' },
  });

  const handleDeleteAccount = useCallback(async () => {
    try {
      const { data } = await removeUserMutation({
        variables: {
          customerId: userId,
        },
      });

      if (data?.removeCustomer) {
        setShowModalDeleteAccount(false);
        navigation.navigate('AccountDeletedSuccessfully');
      }
    } catch (error) {
      ExceptionProvider.captureException(error, "handleDeleteAccount - DeleteAccountComponent.tsx", { userId });
    }
  }, [userId]);

  return (
    <>
      <Box flexDirection="row" mb={84} bg="white" marginX={-1}>
        <Button
          flexDirection="row"
          onPress={() => setShowModalDeleteAccount(true)}
          testID="com.usereserva:id/deleteaccount_button_remove"
        >
          <>
            <IconLegacy
              name="Trash"
              color="vermelhoAlerta"
              size={24}
              marginRight="quarck"
            />

            <Typography
              fontFamily="nunitoRegular"
              fontSize={15}
              color="vermelhoAlerta"
            >
              Deletar minha conta
            </Typography>
          </>
        </Button>
      </Box>

      <ModalDeleteAccount
        isVisible={showModalDeleteAccount}
        handleDeleteAccount={handleDeleteAccount}
        setIsVisible={() => setShowModalDeleteAccount(false)}
      />
    </>
  );
}

export default DeleteAccountComponent;
