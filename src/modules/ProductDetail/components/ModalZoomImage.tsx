import React, { useEffect, useState } from 'react';
import {
  Dimensions, StyleSheet, Modal, Image, TouchableOpacity,
} from 'react-native';

import {
  Box, Button, Icon, Typography,
} from '@usereservaapp/reserva-ui';

import ImageViewer from 'react-native-image-zoom-viewer';

import AsyncStorage from '@react-native-community/async-storage';

import { images } from '../../../assets/index';

const screen = Dimensions.get('window');

const DEVICE_WIDTH = screen.width;
const DEVICE_HEIGHT = screen.height;

export interface ModalBagProps {
  isVisible: boolean;
  image: any;
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
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_HEIGHT,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

const ImageSelection = ({
  imagesArray,
  currentImage,
}: ImageSelectionProps) => (
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
    <Image source={images.selectRectangle} height={24} width={84} style={{ position: 'absolute', left: 0 }} />

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

const ModalTutorial = ({
  setOpenTutorial,
}: ModalTutorialProps) => (
  <TouchableOpacity
    onPress={() => setOpenTutorial(false)}
    style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: DEVICE_WIDTH,
      height: DEVICE_HEIGHT,
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    }}
  >
    <Box
      style={{
        position: 'absolute',
        right: '7%',
        top: '9%',
        alignItems: 'center',
      }}
    >
      <Image
        source={images.arrowInstruction}
        height={200}
        width={200}
        style={{
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
      <Image
        source={images.zoomHand}
        height={200}
        width={200}
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
      <Image
        source={images.arrowInstruction}
        height={200}
        width={200}
        style={{
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

export const ModalZoomImage = ({
  isVisible,
  image,
  setIsVisibleZoom,
  setIndexOpenImage,
}: ModalBagProps) => {
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
    <>
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
            // renderArrowLeft={() => null}
            // renderArrowRight={() => null}
            renderImage={(props) => (
              <Image
                {...props}
                style={styles.image}
              />
            )}
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
                  width={20}
                  height={20}
                  onPress={() => {
                    setIsVisibleZoom(false);
                  }}
                  variant="icone"
                  icon={<Icon size={13} name="Close" color="fullBlack" />}
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
    </>
  );
};
