import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, Modal,
} from 'react-native';
import { useHomeStore } from '../../../../zustand/useHomeStore';
import { styles } from './CommercialBanner.styles';
import IconNext from '../../../../../assets/icons/IconNext';
import IconPrevious from '../../../../../assets/icons/IconPrevious';
import IconClose from '../../../../../assets/icons/IconClose';

function CommercialBanner() {
  const { commercialBannerCollection } = useHomeStore(['commercialBannerCollection']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevItem = () => {
    setCurrentIndex((prevIndex) => (
      prevIndex - 1 + commercialBannerCollection?.length) % (
      commercialBannerCollection?.length || 1));
  };

  const nextItem = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (commercialBannerCollection?.length || 1));
  };

  const currentItem = commercialBannerCollection?.[currentIndex] || {};

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  if (!commercialBannerCollection?.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      {currentItem ? (
        <>
          <IconPrevious style={styles.icons} onPress={prevItem} />
          <View style={styles.innerContainer}>
            {currentItem.hasModal ? (
              <TouchableOpacity onPress={toggleModal}>
                <Text style={styles.underlinedText}>
                  {currentItem.mainText}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.text}>{currentItem.mainText}</Text>
            )}
          </View>
          <IconNext style={styles.icons} onPress={nextItem} />
        </>
      ) : (
        <Text style={styles.text}>{currentItem && currentItem.mainText}</Text>
      )}
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
            {currentItem && currentItem.modalButton && (
              <TouchableOpacity style={styles.modalButton}>
                <Text style={styles.modalButtonText}>{currentItem.modalButtonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default CommercialBanner;
