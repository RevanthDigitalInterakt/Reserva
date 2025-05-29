import React, { useCallback } from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import {
  type ImageLibraryOptions,
  type ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import { ChangeFileModalStyles as Styles } from './styles/changeFileModal.styles';
import { requestCameraPermission, requestExternalWritePermission } from './helpers/permissions';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';
import { Divider } from '../../../../components/Divider/Divider';

const launchImageLibraryOptions: ImageLibraryOptions = {
  selectionLimit: 1,
  mediaType: 'photo',
  maxWidth: 300,
  maxHeight: 550,
} as const;

const launchCameraOptions = {
  mediaType: 'photo',
  saveToPhotos: true,
  includeExtra: true,
  maxWidth: 300,
  maxHeight: 550,
  quality: 1,
  cameraType: 'front',
  selectionLimit: 1,
} as const;

interface IChangeFileModalProps {
  show: boolean,
  toggleModal: () => void
  handleChangeFile: (file: IFile) => void

  handleDeleteProfileImage: () => void
}

export interface IFile {
  uri: string | undefined
  name: string
  type: string
  initialFilePath: string | undefined
}

function ChangeFileModal({
  show,
  toggleModal,
  handleChangeFile,
  handleDeleteProfileImage,
}: IChangeFileModalProps): JSX.Element {
  const handleChooseGallery = useCallback(async (): Promise<void> => {
    const isCameraPermitted = await requestCameraPermission();
    const isStoragePermitted = await requestExternalWritePermission();

    if (!isCameraPermitted || !isStoragePermitted) return;

    await launchImageLibrary(launchImageLibraryOptions, async (response: ImagePickerResponse) => {
      if (!response) return;

      if (response.didCancel || response.errorMessage) return;

      if (response.assets?.length) {
        handleChangeFile({
          uri: response.assets[0]?.uri!,
          name: response.assets[0]?.fileName!,
          type: 'image/jpeg',
          initialFilePath: undefined,
        });
      }
    });

    toggleModal();
  }, [handleChangeFile]);

  const handleChooseCamera = useCallback(async (): Promise<void> => {
    const isCameraPermitted = await requestCameraPermission();
    const isStoragePermitted = await requestExternalWritePermission();

    if (!isCameraPermitted || !isStoragePermitted) return;

    await launchCamera(launchCameraOptions, async (response) => {
      if (!response) return;

      if (response.didCancel || response.errorMessage) return;

      if (response.assets?.length) {
        handleChangeFile({
          uri: response.assets[0]?.uri!,
          name: response.assets[0]?.fileName!,
          type: 'image/jpeg',
          initialFilePath: undefined,
        });
      }
    });

    toggleModal();
  }, [handleChangeFile]);

  return (
    <Modal
      onBackdropPress={toggleModal}
      isVisible={show}
      testID="com.usereserva:id/changefilemodal_container"
      style={Styles.modalProfile}
    >
      <Box bg="white" p="xxxs">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Typography fontFamily="reservaSerifRegular" fontSize={20} />
          </Box>
          <Button
            hitSlop={{
              top: 30,
              bottom: 30,
              right: 30,
              left: 30,
            }}
            onPress={toggleModal}
            variant="icone"
            icon={<IconLegacy size={12} name="Close" />}
          />
        </Box>
        <Box mt="xxs" mb="micro">
          <Typography fontFamily="reservaSansMedium" fontSize={14}>
            Escolha uma das opções abaixo:
          </Typography>
        </Box>

        <Box mt="xxs" mb="micro">
          <TouchableOpacity onPress={handleChooseCamera} testID="com.usereserva:id/changefilemodal_button_camera">
            <Box style={Styles.boxTouchable}>
              <IconLegacy name="Cam" size={20} mr="micro" />
              <Typography fontFamily="reservaSansMedium" fontSize={14}>
                Tirar uma foto
              </Typography>
            </Box>
          </TouchableOpacity>
        </Box>

        <Divider variant="fullWidth" />

        <Box mt="micro" mb="micro">
          <TouchableOpacity onPress={handleChooseGallery} testID="com.usereserva:id/changefilemodal_button_gallery">
            <Box style={Styles.boxTouchable}>
              <IconLegacy name="Image" size={20} mr="micro" />
              <Typography fontFamily="reservaSansMedium" fontSize={14}>
                Buscar na galeria
              </Typography>
            </Box>
          </TouchableOpacity>
        </Box>

        <Divider variant="fullWidth" />

        <Box mt="micro" mb="micro">
          <TouchableOpacity
            onPress={handleDeleteProfileImage}
            testID="com.usereserva:id/changefilemodal_button_clear"
          >
            <Box style={Styles.boxTouchable}>
              <IconLegacy name="Trash" size={20} mr="micro" />
              <Typography
                style={{ color: '#EF1E1E' }}
                fontFamily="reservaSansMedium"
                fontSize={14}
              >
                Excluir foto atual
              </Typography>
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    </Modal>
  );
}

export default ChangeFileModal;
