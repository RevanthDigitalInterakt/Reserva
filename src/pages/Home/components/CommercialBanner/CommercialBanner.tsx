import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal, Animated, Easing,
} from 'react-native';
import { useHomeStore } from '../../../../zustand/useHomeStore';
import { styles } from './CommercialBanner.styles';
import IconNext from '../../../../../assets/icons/IconNext';
import IconPrevious from '../../../../../assets/icons/IconPrevious';
import IconClose from '../../../../../assets/icons/IconClose';
import { useRemoteConfig } from '../../../../hooks/useRemoteConfig';

function CommercialBanner() {
  const { commercialBannerCollection } = useHomeStore(['commercialBannerCollection']);
  const { getBoolean, getString } = useRemoteConfig();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const showBanner = useMemo(() => (
    getBoolean('show_home_commercial_banner')
  ), []);

  const fadeIn = new Animated.Value(0);
  const fadeOut = new Animated.Value(1);

  const currentItem = commercialBannerCollection?.[currentIndex] || {};

  const hasMultipleItems = commercialBannerCollection?.length > 1;

  const fadeInAnimation = () => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutAnimation = (callback) => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {
      if (callback) callback();
    });
  };

  const prevItem = useCallback(() => {
    fadeOutAnimation(() => {
      setCurrentIndex((prevIndex) => (
        prevIndex - 1 + commercialBannerCollection?.length) % (
        commercialBannerCollection?.length || 1));
      fadeInAnimation();
    });
  }, [currentItem]);

  const nextItem = useCallback(() => {
    fadeOutAnimation(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % (commercialBannerCollection?.length || 1));
      fadeInAnimation();
    });
  }, [currentItem]);

  const toggleModal = useCallback(() => {
    setIsModalVisible(!isModalVisible);
  }, [isModalVisible]);

  const onPress = useCallback(() => {
    const reference = currentItem?.modalButtonLink || '';
    const [categoryType, categoryData] = currentItem?.modalButtonLink ? reference.split(':') : [];
    const navigateParams: {
      referenceId?: string | null | undefined;
      productId?: string | null | undefined;
    } = {
      referenceId: reference,
      productId: categoryType === 'product' ? categoryData : undefined,
    };
    toggleModal();
    navigation.navigate(categoryType === 'product' ? 'ProductDetail' : 'ProductCatalog', navigateParams);
  }, [currentItem, toggleModal]);

  if (!commercialBannerCollection?.length || !showBanner) {
    return null;
  }

  return (
    <View>
      <Animated.View style={[styles.container, { opacity: fadeOut, marginBottom: getString('count_down_position') === 'B' || getString('count_down_position') === 'C' ? 10 : 0 }]}>
        {currentItem ? (
          <>
            {
              hasMultipleItems ? (
                <TouchableOpacity style={styles.iconContainer} onPress={prevItem}>
                  <IconPrevious style={styles.icons} onPress={prevItem} />
                </TouchableOpacity>
              ) : null
            }
            <Animated.View style={styles.innerContainer}>
              {currentItem.hasModal ? (
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.underlinedText}>
                    {currentItem.mainText}
                  </Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.text}>{currentItem.mainText}</Text>
              )}
            </Animated.View>
            {
              hasMultipleItems ? (
                <TouchableOpacity style={styles.iconContainer} onPress={prevItem}>
                  <IconNext style={styles.icons} onPress={nextItem} />
                </TouchableOpacity>
              ) : null
            }
          </>
        ) : (
          <Text style={styles.text}>{currentItem.mainText}</Text>
        )}
      </Animated.View>
      <Modal
        visible={isModalVisible}
        onRequestClose={toggleModal}
        transparent
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.titleContainer}>
              <Text style={styles.modalTitle}>{currentItem && currentItem.modalTitle}</Text>
              <TouchableOpacity onPress={toggleModal}>
                <IconClose />
              </TouchableOpacity>
            </View>
            <Text style={styles.modalDescription}>
              {currentItem && currentItem.modalDescription}
            </Text>
            <View>
              {currentItem && currentItem.modalButton && (
              <TouchableOpacity style={styles.modalButton} onPress={onPress}>
                <Text style={styles.modalButtonText}>{currentItem.modalButtonText}</Text>
              </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CommercialBanner;
