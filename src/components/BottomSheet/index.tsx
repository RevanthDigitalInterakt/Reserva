import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import Modal from 'react-native-modal';
import type { BottomSheetProps } from './types';

export function BottomSheet({ children, isOpen = false, onBackdropPress } : BottomSheetProps) {
  return (
    <View>
      <Modal
        isVisible={isOpen}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          flex: 1,
        }}
        customBackdrop={(
          <TouchableWithoutFeedback onPress={onBackdropPress}>
            <View style={{
              flex: 1,
              backgroundColor: '#000000BF',
            }}
            />
          </TouchableWithoutFeedback>
          )}
      >
        <View style={{
          height: '50%',
          backgroundColor: 'white',
          borderTopEndRadius: 12,
          borderTopStartRadius: 12,
          paddingHorizontal: 24,
          paddingTop: 24,
        }}
        >
          {children}
        </View>
      </Modal>
    </View>
  );
}
