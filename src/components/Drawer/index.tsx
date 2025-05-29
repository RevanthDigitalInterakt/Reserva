import React, {
  useEffect, useRef,
} from 'react';
import { Pressable, View } from 'react-native';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import styles from './styles';
import type { DrawerProps } from './types';
import { useProductDetailStore } from '../../zustand/useProductDetail/useProductDetail';

export function Drawer({ children, isOpen, snapPoints } : DrawerProps) {
  const { setDrawerIsOpen, drawerIsOpen } = useProductDetailStore(['setDrawerIsOpen', 'drawerIsOpen']);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  return (
    <BottomSheetModalProvider>
      {drawerIsOpen && (
        <Pressable
          onPress={() => setDrawerIsOpen(false)}
          style={styles.dismissOverlay}
        />
      )}
      <View style={styles.container}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          enableContentPanningGesture={false}
          enableDismissOnClose
          onDismiss={() => setDrawerIsOpen(false)}
        >
          <View style={styles.contentContainer}>
            {children}
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
}
