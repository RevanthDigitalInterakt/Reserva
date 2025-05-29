import React, { useCallback, useState } from 'react';
import {
  Modal,
  FlatList,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import configDeviceSizes from '../../../../../../utils/configDeviceSizes';
import { Box } from '../../../../../../components/Box/Box';
import { Button } from '../../../../../../components/Button';
import ImageComponent from '../../../../../../components/ImageComponent/ImageComponent';
import EventProvider from '../../../../../../utils/EventProvider';
import IconComponent from '../../../../../../components/IconComponent/IconComponent';
import images from '../../../../../../base/styles/icons';
import styles from './styles';
import testProps from '../../../../../../utils/testProps';

interface ISizesGuidesCarrousel {
  images: any[],
  onClose: () => void
}

function SizesGuidesCarrousel({ images, onClose }: ISizesGuidesCarrousel) {
  const IMAGES_PROPORTION = 1.7;
  const CARD_WIDTH = configDeviceSizes.DEVICE_WIDTH * 0.92;
  const CARD_HEIGHT = CARD_WIDTH * IMAGES_PROPORTION;
  const CARD_PADDING = (configDeviceSizes.DEVICE_WIDTH - CARD_WIDTH) * 0.5;

  const [actualPosition, setActualPosition] = useState(0);

  const onViewRef = React.useRef(({ viewableItems }: any) => {
    if (!!viewableItems && !!viewableItems[0]) {
      setActualPosition(viewableItems[0].index);
    }
  });

  return (
    <>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={images}
        onViewableItemsChanged={onViewRef.current}
        contentContainerStyle={{
          margin: 0,
          padding: 0,
          alignItems: 'center',
        }}
        snapToInterval={configDeviceSizes.DEVICE_WIDTH}
        snapToAlignment="center"
        pagingEnabled
        bounces={false}
        disableIntervalMomentum
        testID="com.usereserva:id/size_guide_list"
        onScrollEndDrag={() => { }}
        renderItem={({ item }) => (
          <Box
            style={{
              paddingRight: CARD_PADDING,
              paddingLeft: CARD_PADDING,
              width: configDeviceSizes.DEVICE_WIDTH,
              height: configDeviceSizes.DEVICE_HEIGHT,
              justifyContent: 'center',
            }}
          >
            <Box>
              <Box
                height={40}
                width={40}
                position="absolute"
                right={0}
                top={0}
                zIndex={16}
              >
                <Button
                  testID="com.usereserva:id/size_guides_button_product_details"
                  style={{
                    width: 40,
                    height: 40,
                    zIndex: 16,
                  }}
                  onPress={onClose}
                />
              </Box>
              {item ? (
                <ImageComponent
                  source={item}
                  style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                  }}
                />
              ) : null}

            </Box>
          </Box>
        )}
      />
      {images.length > 1 && (
        <Box
          flexDirection="row"
          position="absolute"
          bottom={((configDeviceSizes.DEVICE_HEIGHT - (CARD_WIDTH * IMAGES_PROPORTION)) / 2) - 18}
        >
          {
            images.map((_image, index) => (
              <Box style={{
                width: 6,
                height: 6,
                marginRight: 8,
                backgroundColor: actualPosition === index ? '#fff' : 'transparent',
                borderColor: '#fff',
                borderRadius: 3,
                borderWidth: 1,
              }}
              />
            ))
          }
        </Box>
      )}
    </>
  );
}

export const SizeGuideImages = Object.freeze({
  camisas: [images.GuideMangaCurta, images.GuideMangaLonga],
  camisetas: [images.GuideCamiseta],
  polos: [images.GuidePolo],
  casacos: [images.GuideHoodie, images.GuideJaqueta, images.GuideSueter],
  calças: [images.GuideCalca],
  shorts: [images.GuideShort],
  bermudas: [images.GuideBermuda],
  sungas: [images.GuideSungaCueca],
});

interface ISizeGuideProps {
  categoryTree: { name: string }[]
  productId?: string;
  enabledBtnFullSizeGuide?: boolean;
}

function SizeGuide({
  categoryTree,
  productId,
  enabledBtnFullSizeGuide,
}: ISizeGuideProps) {
  const [isVisible, setIsVisible] = useState(false);

  const handleCategoryImage = () => {
    const categoryNames = categoryTree.map((category) => category.name);

    const categoryName = categoryNames.find(
      (category) => category in SizeGuideImages,
    ) as keyof typeof SizeGuideImages;

    return SizeGuideImages[categoryName];
  };

  const onShow = useCallback(() => {
    setIsVisible(true);

    if (productId) {
      EventProvider.logEvent('product_view_size_guide', {
        show: 1,
        product_id: productId,
      });
    }
  }, [productId]);

  return (
    <Box>
      <View>
        <TouchableOpacity
          {...testProps('size_guides_button_product_details')}
          onPress={onShow}
        >
          <View
            style={
              enabledBtnFullSizeGuide
                ? styles.containerBtnSizeGuideFull
                : styles.containerBtnSizeGuide
            }
          >
            <IconComponent icon="sizeGuideIcon" />
            <Text style={styles.txtSizeGuide}>
              guia de medidas
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isVisible}
        transparent
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          position: 'absolute',
          top: 0,
          left: 0,
          elevation: 5,
          zIndex: 5,
        }}
      >
        <Box
          style={{
            width: configDeviceSizes.DEVICE_WIDTH,
            height: configDeviceSizes.DEVICE_HEIGHT,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <SizesGuidesCarrousel
            images={handleCategoryImage()}
            onClose={() => setIsVisible(false)}
          />
        </Box>
      </Modal>
    </Box>
  );
}

export default SizeGuide;
