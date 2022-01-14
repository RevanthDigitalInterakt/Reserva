import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, Modal } from 'react-native';

import { Box, Button, Icon } from 'reserva-ui';

import ImageViewer from 'react-native-image-zoom-viewer';

import { useState } from 'react';

const screen = Dimensions.get('window');

const DEVICE_WIDTH = screen.width;
const DEVICE_HEIGHT = screen.height;

export interface ModalBagProps {
  isVisible: boolean;
  image: any;
  setIsVisibleZoom(isVisible: boolean): void;
  setIndexOpenImage: number;
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: DEVICE_WIDTH,
    height: DEVICE_WIDTH,
  },
  focalPoint: {
    ...StyleSheet.absoluteFillObject,
    width: 20,
    height: 20,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
});

export const ModalZoomImage = ({
  isVisible,
  image,
  setIsVisibleZoom,
  setIndexOpenImage,
}: ModalBagProps) => {
  const [newArrayImages, setNewArrayImages] = useState();

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
        transparent={true}
        style={styles.modal}
        onRequestClose={closeModal}
      >
        <ImageViewer
          style={styles.modal}
          imageUrls={newArrayImages}
          onCancel={() => setIsVisibleZoom(false)}
          backgroundColor="black"
          index={setIndexOpenImage}
          onSwipeDown={() => closeModal}
          saveToLocalByLongPress={false}
          renderHeader={() => (
            <Box
              position="absolute"
              right={'3%'}
              top={'4%'}
              zIndex={2}
              height={20}
              width={20}
            >
              <Button
                width={20}
                height={20}
                onPress={() => setIsVisibleZoom(false)}
                variant="icone"
                icon={<Icon size={14} name="Close" color="white" />}
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              />
            </Box>
          )}
        />
      </Modal>
    </Box>
  );
};
