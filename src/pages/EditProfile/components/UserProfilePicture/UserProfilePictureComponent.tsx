import {
  Avatar, Box, Button, Typography,
} from '@usereservaapp/reserva-ui';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { IFile } from '../ModalChangeFile/ChangeFileModal';
import { FirebaseService } from '../../../../shared/services/FirebaseService';

interface IUserProfilePictureComponentProps {
  file: IFile;
  toogleModalChangeFile: () => void,
  userEmail: string
}

function UserProfilePictureComponent({
  file,
  toogleModalChangeFile, userEmail,
}: IUserProfilePictureComponentProps): JSX.Element {
  const [currentPath, setCurrentPath] = useState<string>();
  const navigation = useNavigation();
  const { getUrlFS } = new FirebaseService();

  const handleNavigationEditPassword = useCallback(() => {
    navigation.navigate('EditPassword', {
      email: userEmail,
    });
  }, [userEmail]);

  const handleSetCurrentPathImage = useCallback(async (uri?: string) => {
    if (uri) {
      if (!uri.includes('https://') && !uri.includes('file://')) {
        setCurrentPath(await getUrlFS(uri));
        return;
      }
      setCurrentPath(uri);

      return;
    }

    setCurrentPath(undefined);
  }, []);

  useEffect(() => {
    (async () => {
      await handleSetCurrentPathImage(file.uri);
    })();
  }, [file]);

  return (
    <Box alignItems="center">
      {!!currentPath && (
      <Avatar
        imageSource={{ uri: currentPath }}
        onPress={toogleModalChangeFile}
        buttonEdit
        imageStyle={{ width: 60, height: 60 }}
      />
      )}

      {!(currentPath) && (
      <Avatar
        onPress={toogleModalChangeFile}
        imageStyle={{ width: 60, height: 60 }}
        buttonEdit
      />
      )}

      <Box
        justifyContent="flex-start"
        alignItems="flex-start"
        marginTop="micro"
      >
        <Button
          inline
          onPress={handleNavigationEditPassword}
          title="Alterar senha"
          testID="userprofilepicture_button_edit_password"
        >
          <Typography
            style={{ textDecorationLine: 'underline' }}
            fontSize={13}
            fontFamily="nunitoRegular"
          >
            Alterar senha
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}

export default UserProfilePictureComponent;
