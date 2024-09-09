import React, { useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Animated, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import IconComponent from '../../../IconComponent/IconComponent';
import styles from '../../styles';
import EventProvider from '../../../../utils/EventProvider';

export default function PersonalizeIcon({
  productReference,
  discountTag,
  testID,
}: {
  productReference: string,
  testID: string,
  discountTag: boolean
}) {
  const widthAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navigate = useNavigation();
  const TwoSeconds = 2 * 1000;
  const sevenSeconds = 7 * 1000;

  const animateTiming = (value: number) => Animated.timing(
    widthAnim,
    {
      toValue: value,
      duration: 1000,
      useNativeDriver: false,
    },
  ).start();

  const animateScale = () => {
    // Pulse size logo
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 600,
        useNativeDriver: true,
      }),
      // Open Personalize text
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => animateTiming(150));
  };

  useEffect(() => {
    setTimeout(animateScale, TwoSeconds);
    setTimeout(() => animateTiming(0), sevenSeconds);
  }, []);

  const redirectWebview = () => {
    EventProvider.logEvent('pdp_icon_fvc', {});
    navigate.navigate('FacaVc', { type: productReference });
  };

  return (
    <View style={styles(discountTag, true).personalizeWrapper}>
      <TouchableOpacity
        style={styles(discountTag, true).personalizeButton}
        testID={`${testID}_pdp_icon_fvc`}
        activeOpacity={1}
        onPress={() => redirectWebview()}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View style={styles(discountTag, true).personalizeIconBackground}>
            <IconComponent
              icon="personalize"
              style={styles(discountTag, true).personalizeIcon}
            />
          </View>
        </Animated.View>
        <Animated.View style={{
          ...styles(
            discountTag,
            true,
          ).personalizeAnimateTextContainer,
          width: widthAnim,
        }}
        >
          <Text style={styles(discountTag, true).personalizeAnimateTextStyle}>Personalize</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}
