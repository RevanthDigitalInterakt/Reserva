import React, { useCallback, useRef, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Carousel, { type ICarouselInstance } from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { useSharedValue } from 'react-native-reanimated';
import ImageComponent from '../../../ImageComponent/ImageComponent';
import { styles } from './styles';
import { PriceCustom } from '../../../PriceCustom/PriceCustom';
import { COLORS, FONTS } from '../../../../base/styles';
import type { OrderformPackageItemsOutput } from '../../../../base/graphql/generated';
import BulletsAnimatedStick from '../BulletsAnimatedStick';
import MoreProductsOnBag from '../MoreProductsOnBag/MoreProductsOnBag';
import testProps from '../../../../utils/testProps';
import EventProvider from '../../../../utils/EventProvider';
import { ExceptionProvider } from '../../../../base/providers/ExceptionProvider';
import { Actions } from '../../../../utils/EventProvider/Event';

const { width } = Dimensions.get('window');

function ItemAbandonedCart({ items }: Partial<OrderformPackageItemsOutput>[]) {
  const navigation = useNavigation();

  const [currIndex, setCurrIndex] = useState(0);
  const progressValue = useSharedValue<number>(0);
  const $carousel = useRef<ICarouselInstance>();

  const itemsSliced = items?.slice(0, 5);

  if (items?.length > 5) {
    itemsSliced.push({
      index: 6,
    });
  }

  const onTouchOpacity = useCallback((action: Actions, index: number) => {
    try {
      EventProvider.logEvent('abandoned_cart', { action, index });
      navigation.navigate('BagScreen');
    } catch (error) {
      ExceptionProvider.captureException(error, "ItemAbandonedCart.ts - onTouchOpacity");
    }
  }, []);

  return (
    <>
      <Carousel
        {...testProps('abandoned_cart_carrousel_content')}
        width={width}
        height={264}
        ref={(carousel) => {
          if (carousel) $carousel.current = carousel;
        }}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 1,
          parallaxScrollingOffset: -20,
        }}
        enabled={itemsSliced.length > 1}
        pagingEnabled
        onProgressChange={(_, absoluteProgress) => {
          progressValue.value = absoluteProgress;
        }}
        panGestureHandlerProps={{ activeOffsetX: [-10, 10] }}
        data={itemsSliced}
        onSnapToItem={setCurrIndex}
        style={styles.carousel}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <View key={item?.index} style={styles.childContainer}>
              {item?.index <= 5 && (
                <>
                  <TouchableOpacity
                    onPress={() => onTouchOpacity(Actions.click_on_image, item?.index)}
                    style={styles.btnImageStyle}
                  >
                    <ImageComponent
                      source={{ uri: item?.imageSource?.toString() }}
                      width={130}
                      height={180}
                      resizeMode="contain"
                      style={styles.image}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => onTouchOpacity(Actions.click_on_text, item?.index)}
                    style={styles.btnDescriptionStyle}
                  >
                    <View style={styles.descriptionContainer}>
                      <Text
                        numberOfLines={2}
                        style={styles.txtTitleItem}
                      >
                        {item?.productTitle}
                      </Text>
                      <View style={styles.pricesContainer}>
                        <View style={styles.txtOldPriceContainer}>
                          <Text style={styles.txtOldPrice}>De </Text>
                          <PriceCustom
                            color={COLORS.TEXT_GRAY}
                            fontFamily={FONTS.RESERVA_SANS_BOLD}
                            sizeInteger={16}
                            sizeDecimal={11}
                            num={item?.listPrice / 100 || 0}
                            lineThroughInteger
                            lineHeight={22.4}
                          />
                        </View>
                        <PriceCustom
                          color={COLORS.ENABLED_GREEN}
                          fontFamily={FONTS.RESERVA_SANS_BOLD}
                          sizeInteger={16}
                          sizeDecimal={11}
                          lineHeight={22.4}
                          num={item?.priceWithDiscount || 0}
                        />

                        {/* TODO Create in backend return for installments */}
                        {/* <View style={styles.txtOfferContainer}>
                        <Text style={styles.txtOffer}>ou 6x </Text>
                        <PriceCustom
                          color={COLORS.GRAY62}
                          fontFamily={FONTS.ARIAL}
                          sizeInteger={14}
                          sizeDecimal={14}
                          num={item?.sellingPrice / 100 || 0}
                        />
                      </View> */}
                      </View>

                      <View style={styles.infoContainer}>
                        <View style={styles.txtItemSizeContainer}>
                          <Text style={styles.txtBold}>
                            Tamanho:
                            {' '}
                          </Text>
                          <Text style={styles.txtGray}>
                            {item?.itemSize?.toUpperCase()}
                          </Text>
                        </View>
                        <View style={styles.txtItemColorContainer}>
                          <Text style={styles.txtBold}>
                            Cor:
                            {' '}
                          </Text>
                          <Text style={styles.txtGray}>
                            {item?.itemColor}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </>
              )}
              {item.index === 6 && <MoreProductsOnBag />}
            </View>
          </View>
        )}
      />

      <View
        style={[styles.bulletsWrapper, { width: itemsSliced.length * 20 }]}
      >
        {
          itemsSliced.map((item, i) => (
            <BulletsAnimatedStick
              backgroundColor={COLORS.DIM_GRAY}
              animValue={progressValue}
              index={i}
              key={`bullets-${item.index}`}
              actualPosition={currIndex}
              length={itemsSliced.length}
            />
          ))
        }
      </View>
    </>
  );
}

export default ItemAbandonedCart;
