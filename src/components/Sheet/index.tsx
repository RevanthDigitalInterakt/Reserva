/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  useRef, useEffect, type ReactNode, useMemo,
} from 'react';
import {
  Modal,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
} from 'react-native';
import { COLORS } from '../../base/styles';
import IconClose from '../../../assets/icons/IconClose';

interface IProps {
  visible: boolean;
  onClose?: () => void;
  children: ReactNode
  variant: 'small' | 'middle' | 'big' | 'biggest'
}

function Sheet({
  visible, onClose, children, variant = 'small',
}: IProps) {
  const screenHeight = Dimensions.get('window').height;
  const translateY = useRef(new Animated.Value(screenHeight)).current;

  const newHeight = useMemo(() => {
    if (variant === 'small') return '30%';
    if (variant === 'middle') return '50%';
    if (variant === 'big') return '70%';
    if (variant === 'biggest') return '90%';
  }, [variant]);

  useEffect(() => {
    if (!visible) {
      return;
    }

    if (visible) {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal transparent visible={visible} animationType="fade">
      <Pressable
        style={[styles.backdrop,
          { backgroundColor: 'hsla(0, 0%, 2%, 0.7)' }]}
        onPress={onClose}
      />

      <Animated.View
        style={[
          styles.bottomSheetContainer,
          {
            height: newHeight,
            backgroundColor: COLORS.WHITE,
            transform: [{ translateY }],
          },
        ]}
      >

        <Pressable
          style={{ alignSelf: 'flex-start', paddingBottom: 16 }}
          onPress={onClose}
        >
          <IconClose />
        </Pressable>

        {children}

      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  bottomSheetContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
});

export default Sheet;
