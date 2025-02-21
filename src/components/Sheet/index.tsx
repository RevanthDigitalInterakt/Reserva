/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  useRef, useEffect, type ReactNode, useMemo,
  useState,
} from 'react';
import {
  Modal,
  StyleSheet,
  Animated,
  Dimensions,
  Pressable,
  Keyboard,
  ScrollView,
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
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardHeight(0);
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      translateY.setValue(screenHeight);
      return;
    }

    // Calcula a nova posição baseada na altura do teclado
    Animated.timing(translateY, {
      toValue: -keyboardHeight,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [visible, keyboardHeight]);

  const maxHeight = useMemo(
    () => (keyboardHeight > 0
      ? screenHeight - keyboardHeight
      : screenHeight * 0.9),
    [keyboardHeight, screenHeight],
  );

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
            maxHeight,
            backgroundColor: COLORS.WHITE,
            transform: [{ translateY }],
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable
            style={{ alignSelf: 'flex-start', paddingBottom: 16 }}
            onPress={onClose}
          >
            <IconClose />
          </Pressable>

          {children}
        </ScrollView>
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
  content: {
    flexGrow: 1,
  },
});

export default Sheet;
