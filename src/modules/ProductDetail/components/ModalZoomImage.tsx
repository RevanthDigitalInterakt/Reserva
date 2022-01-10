import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';

import {
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { Box, Button, Icon, theme } from 'reserva-ui';

import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import ImageViewer from 'react-native-image-zoom-viewer';
import ImageZoom from 'react-native-image-pan-zoom';
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
        <Box position="absolute" top={25} right={20} zIndex={2}>
          <Button
            hitSlop={{
              top: 50,
              bottom: 50,
              right: 50,
              left: 50,
            }}
            onPress={() => setIsVisibleZoom(false)}
            variant="icone"
            icon={<Icon size={14} name="Close" color={'neutroFrio2'} />}
          />
        </Box>
        <ImageViewer
          style={styles.modal}
          imageUrls={newArrayImages}
          onCancel={() => setIsVisibleZoom(false)}
          backgroundColor="black"
          index={setIndexOpenImage}
          onSwipeDown={() => closeModal}
          saveToLocalByLongPress={false}
        />
      </Modal>
    </Box>
  );
};
