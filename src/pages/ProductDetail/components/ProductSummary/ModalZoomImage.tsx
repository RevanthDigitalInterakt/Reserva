import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import
{
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

import ImageComponent from '../../../../components/ImageComponent/ImageComponent';
import configDeviceSizes from '../../../../utils/configDeviceSizes';
import testProps from '../../../../utils/testProps';
import IconComponent from '../../../../components/IconComponent/IconComponent';
import { Box } from '../../../../components/Box/Box';
import { Typography } from '../../../../components/Typography/Typography';
import { Button } from '../../../../components/Button';
import { IconLegacy } from '../../../../components/IconLegacy/IconLegacy';

export interface ModalBagProps {
  isVisible: boolean;
  image: string[];
  setIsVisibleZoom(isVisible: boolean): void;
  setIndexOpenImage: number;
}

interface ModalTutorialProps {
  setOpenTutorial(openTutorial: boolean): void;
}

interface ImageSelectionProps {
  imagesArray: any[];
  currentImage: number;
}

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: configDeviceSizes.DEVICE_WIDTH,
    height: configDeviceSizes.DEVICE_HEIGHT,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: configDeviceSizes.DEVICE_WIDTH,
    height: configDeviceSizes.DEVICE_HEIGHT,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

function ImageSelection({
  imagesArray,
  currentImage,
}: ImageSelectionProps) {
  return (
    <Box
      position="absolute"
      bottom="6%"
      flexDirection="row"
      left="50%"
      marginLeft={-42}
      alignItems="center"
      justifyContent="space-around"
      width={84}
      px="quarck"
    >
      <IconComponent
        icon="selectRectangle"
        height={24}
        width={84}
        style={{
          position: 'absolute',
          left: 0,
        }}
      />

      {imagesArray.map((_, index) => (
        <Box
          key={`image-${index}`}
          width={8}
          height={8}
          backgroundColor={index === currentImage ? 'fullBlack' : 'divider'}
          borderRadius="xs"
        />
      ))}
    </Box>
  );
}

function ModalTutorial({
  setOpenTutorial,
}: ModalTutorialProps) {
  return (
    <TouchableOpacity
      {...testProps('com.usereserva:id/modal_zoom_button_open')}
      onPress={() => setOpenTutorial(false)}
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: configDeviceSizes.DEVICE_WIDTH,
        height: configDeviceSizes.DEVICE_HEIGHT,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      }}
    >
      <Box
        style={{
          position: 'absolute',
          right: '7%',
          top: '5%',
          alignItems: 'center',
        }}
      >
        <IconComponent
          icon="arrowInstruction"
          resizeMode="contain"
          style={{
            height: 75,
            width: 75,
            transform: [
              { scaleY: -1 },
              { rotate: '-20deg' },
            ],
            alignSelf: 'flex-end',
          }}
        />
        <Box
          alignItems="center"
          mt="xxxs"
        >
          <Typography fontFamily="nunitoBold" fontSize={14} color="white">
            Clique aqui para sair
          </Typography>
          <Typography fontFamily="nunitoBold" fontSize={14} color="white">
            do modo zoom.
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          position: 'absolute',
          right: '30%',
          top: '42%',
          alignItems: 'center',
        }}
      >
        <IconComponent
          icon="zoomHand"
          style={{
            height: 75,
            width: 75,
          }}
        />
        <Box
          alignItems="center"
          mt="xxxs"
        >
          <Typography fontFamily="nunitoBold" fontSize={14} color="white">
            Faça o movimento de pinça
          </Typography>
          <Typography fontFamily="nunitoBold" fontSize={14} color="white">
            para dar zoom na foto.
          </Typography>
        </Box>
      </Box>
      <Box
        style={{
          position: 'absolute',
          right: '25%',
          bottom: '10%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <IconComponent
          icon="arrowInstruction"
          style={{
            width: 75,
            height: 75,
            transform: [
              { scaleY: 1 },
            ],
          }}
        />
        <Box
          alignItems="center"
          bottom="18%"
          marginLeft="-8%"
        >
          <Typography fontFamily="nunitoBold" fontSize={14} color="white">
            Arraste pro lado
          </Typography>
          <Typography fontFamily="nunitoBold" fontSize={14} color="white">
            para ver as outras
          </Typography>
          <Typography fontFamily="nunitoBold" fontSize={14} color="white">
            fotos do produto.
          </Typography>
        </Box>
      </Box>
    </TouchableOpacity>
  );
}

export function ModalZoomImage({
  isVisible,
  image,
  setIsVisibleZoom,
  setIndexOpenImage,
}: ModalBagProps) {
  const [newArrayImages, setNewArrayImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [openTutorial, setOpenTutorial] = useState(false);

  useEffect(() => {
    async function checkIsFirstTime() {
      const isFirstTime = await AsyncStorage.getItem('@IsFisrtTime');

      if (isFirstTime == null) {
        await AsyncStorage.setItem('@IsFisrtTime', 'false');
        setOpenTutorial(true);
      }
    }

    checkIsFirstTime();
  }, []);

  useEffect(() => {
    const newArr = image.map((item: any) => ({ url: item }));
    setNewArrayImages(newArr);
  }, [image]);

  const closeModal = () => {
    if (setIsVisibleZoom) {
      setIsVisibleZoom(false);
    }
  };

  return (
    <Box>
      <Modal
        visible={isVisible}
        transparent
        style={styles.modal}
        onRequestClose={closeModal}
      >
        <ImageViewer
          renderIndicator={(currentIndex: number) => {
            setCurrentImage(currentIndex - 1);

            return null;
          }}
          renderImage={(props) => {
            if (!props?.source?.uri) {
              return <View />;
            }

            return (
              <ImageComponent
                {...props}
                style={styles.image}
              />
            );
          }}
          style={styles.modal}
          imageUrls={newArrayImages}
          onCancel={() => setIsVisibleZoom(false)}
          backgroundColor="#f3f2f0"
          index={setIndexOpenImage}
          onSwipeDown={() => closeModal}
          saveToLocalByLongPress={false}
          renderHeader={() => (
            <Box
              position="absolute"
              right="4%"
              top="5%"
              zIndex={2}
              height={20}
              width={20}
            >
              <Button
                testID="com.usereserva:id/modal_zoom_image-button"
                width={20}
                height={20}
                onPress={() => {
                  setIsVisibleZoom(false);
                }}
                variant="icone"
                icon={<IconLegacy size={13} name="Close" color="fullBlack" />}
                hitSlop={{
                  top: 15, bottom: 15, left: 15, right: 15,
                }}
              />
            </Box>
          )}
        />

        <ImageSelection imagesArray={newArrayImages} currentImage={currentImage} />

        {openTutorial && <ModalTutorial setOpenTutorial={setOpenTutorial} />}
      </Modal>
    </Box>
  );
}
