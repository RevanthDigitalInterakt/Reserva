import React, { useCallback, useState } from 'react';
import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';
import { useNavigation } from '@react-navigation/native';
import ModalDeleteAccount from '../../../../modules/Profile/Components/ModalDeleteAccount';
import { MyProfileAPI, ProfileHttpUrl } from '../../../../modules/Profile/pages/api/MyProfileAPI';

interface IDeleteAccountProps {
  userId: string
}
function DeleteAccountComponent({ userId }: IDeleteAccountProps): JSX.Element {
  const [showModalDeleteAccount, setShowModalDeleteAccount] = useState<boolean>(false);
  const navigation = useNavigation();

  const handleDeleteAccount = useCallback(async () => {
    if (userId) {
      const { status } = await MyProfileAPI.delete(
        `${ProfileHttpUrl.DELETE_CUSTOMER}CL-${userId}`,
      );

      if (status === 204) {
        setShowModalDeleteAccount(false);
        navigation.navigate('AccountDeletedSuccessfully');
      }
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
            <Icon
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
